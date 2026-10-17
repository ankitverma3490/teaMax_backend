import prisma from '../utils/prisma';

export class DashboardService {
  static async getStats() {
    const [
      categoryCount,
      menuItemCount,
      centreCount,
      reviewCount,
      publishedBlogCount,
      activeOfferCount,
      enquiryCount,
      newEnquiryCount,
      averageRatingAggregate,
    ] = await Promise.all([
      prisma.category.count(),
      prisma.menuItem.count(),
      prisma.centre.count({ where: { status: 'active' } }),
      prisma.review.count({ where: { status: 'published' } }),
      prisma.blog.count({ where: { status: 'published' } }),
      prisma.offer.count({ where: { status: 'active' } }),
      prisma.franchiseEnquiry.count(),
      prisma.franchiseEnquiry.count({ where: { status: 'new' } }),
      prisma.review.aggregate({
        _avg: { starRating: true },
        where: { status: 'published' },
      }),
    ]);

    return {
      totals: {
        categories: categoryCount,
        menuItems: menuItemCount,
        activeCentres: centreCount,
        publishedReviews: reviewCount,
        averageRating: Number((averageRatingAggregate._avg.starRating || 4.8).toFixed(1)),
        publishedBlogs: publishedBlogCount,
        activeOffers: activeOfferCount,
        franchiseEnquiries: enquiryCount,
        pendingEnquiries: newEnquiryCount,
      },
    };
  }

  static async getRecentActivity() {
    const [recentEnquiries, recentReviews, notifications] = await Promise.all([
      prisma.franchiseEnquiry.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.review.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.notification.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      recentEnquiries,
      recentReviews,
      notifications,
    };
  }
}
