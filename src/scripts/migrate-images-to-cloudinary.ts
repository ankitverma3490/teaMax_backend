import prisma from '../utils/prisma';
import { CloudinaryService } from '../services/cloudinary.service';

/**
 * Migration Script: Safely migrate existing database image URLs (e.g. Unsplash, Lovable)
 * to Cloudinary storage, update the records, and preserve all data.
 */
async function migrateImages() {
  console.log('🚀 Starting TeaMax Image Migration to Cloudinary...\n');

  if (!CloudinaryService.isConfigured()) {
    console.error('❌ Cloudinary is not configured. Please ensure CLOUDINARY_API_SECRET is set in your .env file.');
    process.exit(1);
  }

  let totalMigrated = 0;
  let totalSkipped = 0;
  let totalFailed = 0;

  // Helper to migrate a single image URL
  async function migrateUrl(
    url: string | null | undefined,
    folder: string,
    context: string
  ): Promise<string | null> {
    if (!url) return null;
    if (url.includes('res.cloudinary.com') || url.includes('cloudinary.com')) {
      console.log(`⏩ [Skipped] Already on Cloudinary: ${context}`);
      totalSkipped++;
      return url;
    }
    if (url.startsWith('blob:') || !url.startsWith('http')) {
      console.log(`⏩ [Skipped] Local/Blob path, cannot fetch remotely: ${context} (${url})`);
      totalSkipped++;
      return url;
    }

    try {
      console.log(`⏳ Uploading to Cloudinary (${folder}): ${context}...`);
      const uploadResult = await CloudinaryService.uploadFromRemoteUrl(url, { folder });
      console.log(`✅ [Migrated] ${context} -> ${uploadResult.secure_url}`);
      totalMigrated++;
      return uploadResult.secure_url;
    } catch (err: any) {
      console.error(`❌ [Failed] ${context}: ${err.message}`);
      totalFailed++;
      return url; // Keep original URL on failure
    }
  }

  try {
    // 1. Centres
    console.log('\n--- Migrating Centre Images ---');
    const centres = await prisma.centre.findMany();
    for (const centre of centres) {
      let updatedCover = centre.coverImage;
      if (centre.coverImage) {
        const res = await migrateUrl(centre.coverImage, 'centres', `Centre "${centre.name}" Cover`);
        if (res && res !== centre.coverImage) updatedCover = res;
      }

      let updatedGallery = [...centre.galleryImages];
      for (let i = 0; i < centre.galleryImages.length; i++) {
        const img = centre.galleryImages[i];
        const res = await migrateUrl(img, 'centres', `Centre "${centre.name}" Gallery #${i + 1}`);
        if (res) updatedGallery[i] = res;
      }

      if (updatedCover !== centre.coverImage || JSON.stringify(updatedGallery) !== JSON.stringify(centre.galleryImages)) {
        await prisma.centre.update({
          where: { id: centre.id },
          data: {
            coverImage: updatedCover,
            galleryImages: updatedGallery,
          },
        });
      }
    }

    // 2. Categories
    console.log('\n--- Migrating Category Images ---');
    const categories = await prisma.category.findMany();
    for (const cat of categories) {
      if (cat.image) {
        const res = await migrateUrl(cat.image, 'categories', `Category "${cat.name}"`);
        if (res && res !== cat.image) {
          await prisma.category.update({
            where: { id: cat.id },
            data: { image: res },
          });
        }
      }
    }

    // 3. Menu Items
    console.log('\n--- Migrating Menu Item Images ---');
    const menuItems = await prisma.menuItem.findMany();
    for (const item of menuItems) {
      if (item.image) {
        const res = await migrateUrl(item.image, 'menu', `MenuItem "${item.name}"`);
        if (res && res !== item.image) {
          await prisma.menuItem.update({
            where: { id: item.id },
            data: { image: res },
          });
        }
      }
    }

    // 4. Offers
    console.log('\n--- Migrating Offer Banners ---');
    const offers = await prisma.offer.findMany();
    for (const offer of offers) {
      if (offer.bannerImage) {
        const res = await migrateUrl(offer.bannerImage, 'offers', `Offer "${offer.title}"`);
        if (res && res !== offer.bannerImage) {
          await prisma.offer.update({
            where: { id: offer.id },
            data: { bannerImage: res },
          });
        }
      }
    }

    // 5. Blogs
    console.log('\n--- Migrating Blog Images ---');
    const blogs = await prisma.blog.findMany();
    for (const blog of blogs) {
      let updatedCover = blog.coverImage;
      let updatedAvatar = blog.authorAvatar;

      if (blog.coverImage) {
        const res = await migrateUrl(blog.coverImage, 'blogs', `Blog "${blog.title}" Cover`);
        if (res && res !== blog.coverImage) updatedCover = res;
      }
      if (blog.authorAvatar) {
        const res = await migrateUrl(blog.authorAvatar, 'blogs', `Blog "${blog.title}" Author`);
        if (res && res !== blog.authorAvatar) updatedAvatar = res;
      }

      if (updatedCover !== blog.coverImage || updatedAvatar !== blog.authorAvatar) {
        await prisma.blog.update({
          where: { id: blog.id },
          data: {
            coverImage: updatedCover,
            authorAvatar: updatedAvatar,
          },
        });
      }
    }

    // 6. Reviews
    console.log('\n--- Migrating Reviewer Avatars ---');
    const reviews = await prisma.review.findMany();
    for (const review of reviews) {
      if (review.reviewerAvatar) {
        const res = await migrateUrl(review.reviewerAvatar, 'reviews', `Review from "${review.reviewerName}"`);
        if (res && res !== review.reviewerAvatar) {
          await prisma.review.update({
            where: { id: review.id },
            data: { reviewerAvatar: res },
          });
        }
      }
    }

    console.log('\n========================================');
    console.log('🎉 Migration Completed!');
    console.log(`Total Migrated to Cloudinary: ${totalMigrated}`);
    console.log(`Total Skipped: ${totalSkipped}`);
    console.log(`Total Failed: ${totalFailed}`);
    console.log('========================================\n');
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

migrateImages().catch(console.error);
