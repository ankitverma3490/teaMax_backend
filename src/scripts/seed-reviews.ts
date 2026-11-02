import prisma from '../utils/prisma';

export const INITIAL_REVIEW_CATEGORIES = [
  { id: 'franchise', name: 'Franchise Partner Reviews', slug: 'franchise', icon: 'franchise', displayOrder: 1, status: 'active' },
  { id: 'staff', name: 'Staff Reviews', slug: 'staff', icon: 'staff', displayOrder: 2, status: 'active' },
  { id: 'customer', name: 'Customer Reviews', slug: 'customer', icon: 'customer', displayOrder: 3, status: 'active' },
];

export const INITIAL_REVIEWS_SEED = [
  {
    reviewerName: 'Mr. Ravi Kabra',
    reviewerRole: 'TeaMax Cafe Krishi Road, Lucknow',
    reviewerAvatar: 'https://static.wixstatic.com/media/ac5a6b_f13fed47a8734bf682366547e7e065a6~mv2.webp/v1/fill/w_420,h_402,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/2.webp',
    reviewText: 'The support from the TeaMax team has been excellent. It made the entire setup and launch process smooth and stress-free.',
    starRating: 5,
    reviewType: 'franchise',
    categoryId: 'franchise',
    viewMoreLink: 'https://www.instagram.com/reel/C4pexddSzPJ/?utm_source=ig_web_button_share_sheet',
    viewMoreLinkName: 'Watch their story',
    displayOn: ['homepage', 'reviews_page', 'franchise_page'],
    isFeatured: true,
    displayOrder: 1,
    status: 'published',
  },
  {
    reviewerName: 'Ms. Neeta Parmar',
    reviewerRole: 'TeaMax Cafe Vadodara, Gujarat',
    reviewerAvatar: 'https://static.wixstatic.com/media/ead547_213d1e08ebc54f4e974ccf352efaf843~mv2.jpg/v1/crop/x_71,y_149,w_928,h_890/fill/w_420,h_402,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/4.jpg',
    reviewText: "The team's guidance and regular support have been very helpful. The business setup was well-organized, and everything moved smoothly.",
    starRating: 5,
    reviewType: 'franchise',
    categoryId: 'franchise',
    viewMoreLink: 'https://www.instagram.com/reel/C57kDhoSj8p/?utm_source=ig_web_button_share_sheet',
    viewMoreLinkName: 'Watch their story',
    displayOn: ['homepage', 'reviews_page', 'franchise_page'],
    isFeatured: true,
    displayOrder: 2,
    status: 'published',
  },
  {
    reviewerName: 'Mr. Hemal',
    reviewerRole: 'TeaMax Cafe Gurgaon, Haryana',
    reviewerAvatar: 'https://static.wixstatic.com/media/ac5a6b_f68faa97814d47d9874669b3457c5ebe~mv2.webp/v1/fill/w_420,h_402,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3.webp',
    reviewText: "The support and transparency from the franchise team have been outstanding. It's a well-structured model with real business potential.",
    starRating: 5,
    reviewType: 'franchise',
    categoryId: 'franchise',
    viewMoreLink: 'https://www.instagram.com/reel/C5sjVIySylq/?utm_source=ig_web_button_share_sheet',
    viewMoreLinkName: 'Watch their story',
    displayOn: ['homepage', 'reviews_page', 'franchise_page'],
    isFeatured: true,
    displayOrder: 3,
    status: 'published',
  },
  {
    reviewerName: 'Aarav Sharma',
    reviewerRole: 'TeaMax Café, Indore',
    reviewerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    reviewText: 'The team environment is welcoming, and everyone works together to give customers a great café experience.',
    starRating: 5,
    reviewType: 'staff',
    categoryId: 'staff',
    viewMoreLink: '',
    viewMoreLinkName: 'Read more',
    displayOn: ['homepage', 'reviews_page'],
    isFeatured: true,
    displayOrder: 4,
    status: 'published',
  },
  {
    reviewerName: 'Priya Verma',
    reviewerRole: 'TeaMax Café, Bhopal',
    reviewerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    reviewText: 'I have learned a lot while working with the team. The focus on service quality and teamwork makes every day rewarding.',
    starRating: 4,
    reviewType: 'staff',
    categoryId: 'staff',
    viewMoreLink: '',
    viewMoreLinkName: 'Read more',
    displayOn: ['homepage', 'reviews_page'],
    isFeatured: false,
    displayOrder: 5,
    status: 'published',
  },
  {
    reviewerName: 'Ananya Mehta',
    reviewerRole: 'TeaMax Café, Hyderabad',
    reviewerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    reviewText: 'Loved the chai and the cosy café atmosphere. A great place to catch up with friends over a cup of tea.',
    starRating: 5,
    reviewType: 'customer',
    categoryId: 'customer',
    viewMoreLink: '',
    viewMoreLinkName: 'Read more',
    displayOn: ['homepage', 'reviews_page'],
    isFeatured: true,
    displayOrder: 6,
    status: 'published',
  },
  {
    reviewerName: 'Rahul Jain',
    reviewerRole: 'TeaMax Café, Lucknow',
    reviewerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    reviewText: 'The drinks were fresh, the service was friendly, and the menu had something for everyone. Will visit again!',
    starRating: 5,
    reviewType: 'customer',
    categoryId: 'customer',
    viewMoreLink: '',
    viewMoreLinkName: 'Read more',
    displayOn: ['homepage', 'reviews_page'],
    isFeatured: false,
    displayOrder: 7,
    status: 'published',
  },
  {
    reviewerName: 'Simran Patel',
    reviewerRole: 'TeaMax Café, Vadodara',
    reviewerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    reviewText: 'A lovely place with tasty beverages and a relaxed vibe. The iced tea was especially refreshing.',
    starRating: 4,
    reviewType: 'customer',
    categoryId: 'customer',
    viewMoreLink: '',
    viewMoreLinkName: 'Read more',
    displayOn: ['homepage', 'reviews_page'],
    isFeatured: false,
    displayOrder: 8,
    status: 'published',
  },
];

async function seedReviews() {
  console.log('Seeding review categories into site settings...');
  await prisma.siteSetting.upsert({
    where: { key: 'review_categories' },
    update: { value: INITIAL_REVIEW_CATEGORIES as any },
    create: { key: 'review_categories', value: INITIAL_REVIEW_CATEGORIES as any },
  });

  console.log('Seeding reviews...');
  for (const item of INITIAL_REVIEWS_SEED) {
    const existing = await prisma.review.findFirst({
      where: { reviewerName: item.reviewerName },
    });

    if (!existing) {
      const created = await prisma.review.create({
        data: item as any,
      });
      console.log(`Created review by: ${created.reviewerName} (${created.reviewType})`);
    } else {
      // Update with full info if existing
      await prisma.review.update({
        where: { id: existing.id },
        data: {
          categoryId: item.categoryId,
          viewMoreLink: item.viewMoreLink,
          viewMoreLinkName: item.viewMoreLinkName,
          reviewerRole: existing.reviewerRole || item.reviewerRole,
          reviewerAvatar: existing.reviewerAvatar || item.reviewerAvatar,
        },
      });
      console.log(`Updated existing review: ${existing.reviewerName}`);
    }
  }

  console.log('Reviews seeding completed successfully!');
}

seedReviews()
  .catch((e) => {
    console.error('Error seeding reviews:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

