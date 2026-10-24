import prisma from '../utils/prisma';

export class SettingService {
  /** Get a setting by key; returns null if not found */
  static async get(key: string): Promise<any> {
    const row = await prisma.siteSetting.findUnique({ where: { key } });
    return row ? row.value : null;
  }

  /** Upsert a setting value by key */
  static async set(key: string, value: any): Promise<any> {
    const row = await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
    return row.value;
  }
}
