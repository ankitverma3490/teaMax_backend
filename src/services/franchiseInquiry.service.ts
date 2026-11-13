import { config } from '../config/env';
import { AppError } from '../middleware/error.middleware';
import { ValidatedFranchiseInquiry } from '../schemas/franchiseInquiry.schema';

export class FranchiseInquiryService {
  /**
   * Forwards validated franchise inquiry data directly to Pabbly Hook.
   * NOTE: No PostgreSQL persistence as explicitly specified.
   */
  static async forwardToPabbly(data: ValidatedFranchiseInquiry) {
    const webhookUrl = config.pabblyHookUrl;

    if (!webhookUrl) {
      console.error('[Pabbly Integration Error] PABBLY_HOOK_URL environment variable is missing.');
      throw new AppError('Franchise webhook service is not configured on the server.', 500);
    }

    const payload = {
      event: 'franchise_inquiry',
      name: data.name,
      email: data.email,
      whatsapp_number: data.whatsapp_number,
      city: data.city,
      state: data.state,
      start_date: data.start_date,
      has_space: data.has_space,
      source: data.source || 'teamex_franchise_website',
      submitted_at: new Date().toISOString(),
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'TeaMax-Backend/1.0',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        console.error(
          `[Pabbly Webhook Error] HTTP ${response.status} ${response.statusText}:`,
          errorText
        );
        throw new AppError(
          `Pabbly Hook rejected the request with HTTP ${response.status}. Please try again.`,
          502
        );
      }

      // Check if response contains JSON or text
      let responseBody: any = null;
      try {
        responseBody = await response.json();
      } catch {
        responseBody = { status: 'ok' };
      }

      return {
        success: true,
        payload,
        pabblyResponse: responseBody,
      };
    } catch (err: any) {
      clearTimeout(timeoutId);

      if (err.name === 'AbortError') {
        console.error('[Pabbly Webhook Timeout] Request to Pabbly Hook timed out after 10s.');
        throw new AppError('Unable to connect to the enquiry service (timeout). Please try again.', 504);
      }

      if (err instanceof AppError) {
        throw err;
      }

      console.error('[Pabbly Webhook Network Error]:', err.message);
      throw new AppError(`Network error while communicating with enquiry service: ${err.message}`, 502);
    }
  }
}

