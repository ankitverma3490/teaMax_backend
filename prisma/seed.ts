import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting TeaMax database seeding...');

  // 1. Seed / Update Admin User
  const adminEmail = 'admin@teamaxcafe.com';
  const passwordHash = await bcrypt.hash('TeaMax@2025', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash,
      name: 'Krishnakant Sharma',
      role: Role.SUPER_ADMIN,
      phone: '+91 98765 43210',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      department: 'Operations & Digital Content Head',
      timezone: 'Asia/Kolkata (IST +5:30)',
      currency: '₹ INR',
      status: 'active',
    },
    create: {
      name: 'Krishnakant Sharma',
      email: adminEmail,
      passwordHash,
      role: Role.SUPER_ADMIN,
      phone: '+91 98765 43210',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      department: 'Operations & Digital Content Head',
      timezone: 'Asia/Kolkata (IST +5:30)',
      currency: '₹ INR',
      status: 'active',
    },
  });
  console.log('✅ Admin user configured:', adminEmail);

  // 2. Seed Categories
  const categoriesData = [
    {
      id: 'cat-1',
      name: 'Classic Chai',
      slug: 'classic-chai',
      icon: 'Coffee',
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
      description: 'Traditional slow-brewed Indian teas crafted with premium CTC leaves, fresh ginger, and whole aromatic spices.',
      displayOrder: 1,
      status: 'active',
    },
    {
      id: 'cat-2',
      name: 'Artisanal Teas',
      slug: 'artisanal-teas',
      icon: 'Feather',
      image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=600&auto=format&fit=crop&q=80',
      description: 'Single-estate loose leaf teas from Darjeeling, Assam, and Kangra Valley infused with floral and herbal notes.',
      displayOrder: 2,
      status: 'active',
    },
    {
      id: 'cat-3',
      name: 'Kulhad Specials',
      slug: 'kulhad-specials',
      icon: 'Flame',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop&q=80',
      description: 'Served piping hot in authentic earthy clay cups (kulhads) for an unforgettable smoky rustic aroma.',
      displayOrder: 3,
      status: 'active',
    },
    {
      id: 'cat-4',
      name: 'Cold Brews & Iced Teas',
      slug: 'cold-brews-iced-teas',
      icon: 'Sparkles',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80',
      description: 'Crisp, refreshing iced teas infused with fresh lemons, peach, passionfruit, and wild mint.',
      displayOrder: 4,
      status: 'active',
    },
    {
      id: 'cat-5',
      name: 'Quick Bites & Samosas',
      slug: 'quick-bites-samosas',
      icon: 'Utensils',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
      description: 'Crunchy golden cocktail samosas, bun maska, and hot savory snacks made to pair seamlessly with your cup.',
      displayOrder: 5,
      status: 'active',
    },
    {
      id: 'cat-6',
      name: 'Signature Sandwiches',
      slug: 'signature-sandwiches',
      icon: 'Sandwich',
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=80',
      description: 'Toasted gourmet sourdough sandwiches stuffed with melted cheese, paneer, and rich fillings.',
      displayOrder: 6,
      status: 'active',
    },
  ];

  for (const cat of categoriesData) {
    await prisma.category.upsert({
      where: { id: cat.id },
      update: cat,
      create: cat,
    });
  }
  console.log(`✅ Seeded ${categoriesData.length} categories`);

  // 3. Seed Menu Items (with at least 6 marked as isFeatured: true)
  const menuItemsData = [
    {
      id: 'menu-1',
      name: 'TeaMax Signature Masala Chai',
      categoryId: 'cat-1',
      price: 25,
      description: 'Our award-winning house blend with freshly crushed green cardamom, cinnamon, clove, ginger, and full-cream milk.',
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
      isFeatured: true,
      isPopular: true,
      availability: 'in_stock',
      dietary: 'veg',
      displayOrder: 1,
      rating: 4.9,
    },
    {
      id: 'menu-2',
      name: 'Smoky Kulhad Ginger Chai',
      categoryId: 'cat-3',
      price: 35,
      description: 'Poured steaming hot into preheated clay kulhad cups imparting an authentic smoky earthy flavor.',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop&q=80',
      isFeatured: true,
      isPopular: true,
      availability: 'in_stock',
      dietary: 'veg',
      displayOrder: 2,
      rating: 4.8,
    },
    {
      id: 'menu-3',
      name: 'Royal Saffron Cardamom Chai',
      categoryId: 'cat-1',
      price: 119,
      description: 'Infused with premium Kashmiri saffron strands (kesar) and aromatic green elaichi, topped with crushed pistachios.',
      image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&auto=format&fit=crop&q=80',
      isFeatured: true,
      isPopular: false,
      availability: 'in_stock',
      dietary: 'veg',
      displayOrder: 3,
      rating: 4.9,
    },
    {
      id: 'menu-4',
      name: 'Darjeeling First Flush Muskatel',
      categoryId: 'cat-2',
      price: 149,
      description: 'Light golden spring liquor with subtle muscatel grape and delicate floral notes, served without milk.',
      image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=600&auto=format&fit=crop&q=80',
      isFeatured: true,
      isPopular: false,
      availability: 'in_stock',
      dietary: 'vegan',
      displayOrder: 4,
      rating: 4.7,
    },
    {
      id: 'menu-5',
      name: 'Fresh Mint & Peach Iced Tea',
      categoryId: 'cat-4',
      price: 99,
      description: 'Chilled Assam black tea shaken with sweet peach syrup, garden fresh mint, and cracked ice.',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80',
      isFeatured: true,
      isPopular: true,
      availability: 'in_stock',
      dietary: 'vegan',
      displayOrder: 5,
      rating: 4.6,
    },
    {
      id: 'menu-6',
      name: 'Crispy Cocktail Samosa Platter (4 pcs)',
      categoryId: 'cat-5',
      price: 89,
      description: 'Golden spiced potato and pea samosas served with sweet tamarind and spicy mint chutneys.',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
      isFeatured: true,
      isPopular: true,
      availability: 'in_stock',
      dietary: 'veg',
      displayOrder: 6,
      rating: 4.8,
    },
    {
      id: 'menu-7',
      name: 'Classic Grilled Paneer Burger',
      categoryId: 'cat-6',
      price: 149,
      description: 'Handcrafted seasoned paneer patty topped with fresh iceberg lettuce, tomatoes, and house chipotle sauce.',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
      isFeatured: true,
      isPopular: true,
      availability: 'in_stock',
      dietary: 'veg',
      displayOrder: 7,
      rating: 4.8,
    },
    {
      id: 'menu-8',
      name: 'Frosted Belgian Chocolate Thickshake',
      categoryId: 'cat-4',
      price: 129,
      description: 'Rich dark chocolate gelato blended with creamy whole milk and shaved chocolate flakes.',
      image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80',
      isFeatured: false,
      isPopular: true,
      availability: 'in_stock',
      dietary: 'veg',
      displayOrder: 8,
      rating: 4.9,
    },
    {
      id: 'menu-9',
      name: 'Irani Bun Maska with Chai Dip',
      categoryId: 'cat-5',
      price: 65,
      description: 'Warm fluffy sweet bun slathered with wholesome Amul white butter and a touch of mixed fruit jam.',
      image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=600&auto=format&fit=crop&q=80',
      isFeatured: false,
      isPopular: true,
      availability: 'in_stock',
      dietary: 'veg',
      displayOrder: 9,
      rating: 4.7,
    },
    {
      id: 'menu-10',
      name: 'Tandoori Paneer Tikka Panini',
      categoryId: 'cat-6',
      price: 169,
      description: 'Char-grilled cottage cheese cubes tossed in spicy tandoori marinade, bell peppers, melted mozzarella on sourdough.',
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=80',
      isFeatured: false,
      isPopular: true,
      availability: 'in_stock',
      dietary: 'veg',
      displayOrder: 10,
      rating: 4.8,
    },
  ];

  for (const item of menuItemsData) {
    await prisma.menuItem.upsert({
      where: { id: item.id },
      update: item,
      create: item,
    });
  }
  console.log(`✅ Seeded ${menuItemsData.length} menu items`);

  // 4. Seed Centres (Centres / Franchises)
  const centresData = [
    {
      id: 'centre-kompally',
      name: 'TeaMax Cafe – Kompally',
      slug: 'kompally',
      coverImage: 'https://teamaax-remake-showcase.lovable.app/assets/cafe-exterior-CdvnH_rb.jpg',
      galleryImages: [
        'https://teamaax-remake-showcase.lovable.app/assets/cafe-exterior-CdvnH_rb.jpg',
        'https://teamaax-remake-showcase.lovable.app/assets/cafe-interior-BqO44HIC.jpg',
        'https://teamaax-remake-showcase.lovable.app/assets/coffee-CVqt-QHj.jpg',
        'https://teamaax-remake-showcase.lovable.app/assets/burger-BJddoAQv.jpg',
        'https://teamaax-remake-showcase.lovable.app/assets/chai-BiiVcbvM.jpg',
      ],
      shortDescription: 'Your neighborhood spot for good tea, fresh snacks, and good food in Kompally.',
      detailedDescription: 'Located on Kompally Main Road, this flagship Hyderabad franchise outlet features warm wooden cafe interiors, high-speed Wi-Fi, and signature kulhad teas.',
      status: 'active',
      isFeatured: true,
      country: 'India',
      state: 'Telangana',
      city: 'Hyderabad',
      locality: 'Kompally',
      address: 'Plot No. 12, Kompally Main Road, Kompally, Hyderabad, Telangana 500014',
      postalCode: '500014',
      latitude: 17.5385,
      longitude: 78.4862,
      contactNumber: '+91 98765 43210',
      email: 'kompally@teamaxcafe.com',
      whatsappNumber: '+91 98765 43210',
      websiteUrl: 'https://teamaxcafe.in/ourcentres/stores',
      timings: {
        monday: { open: '07:00', close: '23:00', isClosed: false },
        tuesday: { open: '07:00', close: '23:00', isClosed: false },
        wednesday: { open: '07:00', close: '23:00', isClosed: false },
        thursday: { open: '07:00', close: '23:00', isClosed: false },
        friday: { open: '07:00', close: '23:00', isClosed: false },
        saturday: { open: '07:00', close: '23:00', isClosed: false },
        sunday: { open: '07:00', close: '23:00', isClosed: false },
      },
      holidayHours: 'Open 7:00 AM – 11:00 PM on national holidays.',
      averageRating: 4.6,
      reviewCount: 230,
      facilities: ['Dine-in', 'Takeaway', 'Home Delivery', 'Ample Parking', 'Family Friendly', 'Pet Friendly (Outdoor)', 'Wheelchair Accessible'],
      faqs: [
        {
          q: 'What are TeaMax Kompally opening hours?',
          a: 'The listed hours are 7:00 AM to 11:00 PM Monday through Sunday.',
        },
        {
          q: 'Does the cafe offer takeaway and delivery?',
          a: 'Takeaway and doorstep delivery are fully available.',
        },
        {
          q: 'Is parking available at the cafe?',
          a: 'Yes, ample 2-wheeler and car parking is available.',
        },
      ],
    },
    {
      id: 'centre-1',
      name: 'TeaMax Indiranagar Flagship',
      slug: 'indiranagar-bangalore',
      coverImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1000&auto=format&fit=crop&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=600&auto=format&fit=crop&q=80',
      ],
      shortDescription: 'Our flagship 2-storey experiential café with outdoor garden seating and artisanal tea brew bar.',
      detailedDescription: 'Located in the lively heart of Indiranagar 100ft Road, this flagship TeaMax Café combines warm Scandinavian wood aesthetics with traditional Indian tea brewing.',
      status: 'active',
      isFeatured: true,
      country: 'India',
      state: 'Karnataka',
      city: 'Bengaluru',
      locality: 'Indiranagar',
      address: 'Plot 402, 100ft Road, HAL 2nd Stage, Indiranagar',
      postalCode: '560038',
      latitude: 12.9716,
      longitude: 77.6412,
      contactNumber: '+91 80 4123 4567',
      email: 'indiranagar@teamaxcafe.com',
      whatsappNumber: '+91 98450 12345',
      websiteUrl: 'https://teamaxcafe.com/centres/indiranagar',
      timings: {
        monday: { open: '08:00', close: '23:30', isClosed: false },
        sunday: { open: '07:30', close: '23:30', isClosed: false },
      },
      holidayHours: 'Open with extended timings on national holidays.',
      averageRating: 4.9,
      reviewCount: 1420,
      facilities: ['Dine-in', 'Takeaway', 'Home Delivery', 'Free Wi-Fi', 'Air Conditioned'],
      faqs: [
        {
          q: 'Is valet parking available?',
          a: 'Yes, complimentary valet parking is provided.',
        },
      ],
    },
    {
      id: 'centre-gachibowli',
      name: 'TeaMax Cafe – Gachibowli',
      slug: 'gachibowli',
      coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&auto=format&fit=crop&q=80',
      galleryImages: [],
      shortDescription: 'Fast-paced tech-park café near DLF CyberCity serving quick bites and signature chai.',
      detailedDescription: 'Conveniently situated near DLF Cybercity, tailored for quick business lunches and late-evening tea breaks.',
      status: 'active',
      isFeatured: false,
      country: 'India',
      state: 'Telangana',
      city: 'Hyderabad',
      locality: 'Gachibowli',
      address: 'Sy No. 45, Near DLF, Gachibowli, Hyderabad, Telangana 500032',
      postalCode: '500032',
      latitude: 17.4401,
      longitude: 78.3489,
      contactNumber: '+91 40 4567 8901',
      email: 'gachibowli@teamaxcafe.com',
      whatsappNumber: '+91 98765 43211',
      websiteUrl: '',
      mapUrl: 'https://maps.google.com/?q=17.4401,78.3489',
      googleMapUrl: 'https://maps.google.com/?q=17.4401,78.3489',
      swiggyUrl: 'https://www.swiggy.com/city/hyderabad/teamax-cafe-gachibowli',
      zomatoUrl: 'https://www.zomato.com/hyderabad/teamax-cafe-gachibowli',
      timings: {
        monday: { open: '07:00', close: '23:00', isClosed: false },
        sunday: { open: '07:00', close: '23:00', isClosed: false },
      },
      holidayHours: '',
      averageRating: 4.5,
      reviewCount: 180,
      facilities: ['Dine-in', 'Takeaway', 'Home Delivery', 'High-speed Wi-Fi', 'Air Conditioned'],
      faqs: [],
    },
  ];

  for (const c of centresData) {
    await prisma.centre.upsert({
      where: { id: c.id },
      update: c,
      create: c,
    });
  }
  console.log(`✅ Seeded ${centresData.length} centres/franchises`);

  // 5. Seed Common Central Offers
  // Note: Franchise pages will display ONLY ONE centrally managed active offer!
  const offersData = [
    {
      id: 'offer-1',
      title: 'Buy 2 Chai Get 1 Free',
      bannerImage: 'https://teamaax-remake-showcase.lovable.app/assets/chai-BiiVcbvM.jpg',
      shortDescription: 'Enjoy our special slow-brewed chai. Buy any 2 chai and get 1 free across all participating outlets.',
      detailedDescription: 'Available for dine-in and counter takeaway. Buy any 2 cups of our signature or kulhad chai and get 1 complimentary cup.',
      applicableCategory: 'Classic Chai',
      discountType: 'percentage',
      discountValue: 33.3,
      startDate: new Date('2025-01-01'),
      endDate: new Date('2027-12-31'),
      promoCode: 'BUY2GET1',
      applicableCentres: 'all',
      isFeatured: true, // Primary common offer!
      displayOrder: 1,
      status: 'active',
    },
    {
      id: 'offer-2',
      title: 'Flat 20% Off on Burgers',
      bannerImage: 'https://teamaax-remake-showcase.lovable.app/assets/burger-BJddoAQv.jpg',
      shortDescription: 'Get 20% discount on all gourmet burgers on weekdays between 11:00 AM and 5:00 PM.',
      detailedDescription: 'Valid Monday through Friday across all locations.',
      applicableCategory: 'Signature Sandwiches',
      discountType: 'percentage',
      discountValue: 20,
      startDate: new Date('2025-01-01'),
      endDate: new Date('2027-12-31'),
      promoCode: 'BURGER20',
      applicableCentres: 'all',
      isFeatured: false,
      displayOrder: 2,
      status: 'active',
    },
    {
      id: 'offer-3',
      title: 'Burger + Fries + Cold Coffee @ ₹149 Only',
      bannerImage: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=1000&auto=format&fit=crop&q=80',
      shortDescription: 'Enjoy our executive meal combo at just ₹149. Limited time offer across all TeaMax cafés.',
      detailedDescription: 'Executive combo lunch meal with crispy seasoned fries and cold coffee.',
      applicableCategory: 'Combos',
      discountType: 'fixed',
      discountValue: 149,
      startDate: new Date('2025-01-01'),
      endDate: new Date('2027-12-31'),
      promoCode: 'COMBO149',
      applicableCentres: 'all',
      isFeatured: false,
      displayOrder: 3,
      status: 'active',
    },
  ];

  for (const o of offersData) {
    await prisma.offer.upsert({
      where: { id: o.id },
      update: o,
      create: o,
    });
  }
  console.log(`✅ Seeded ${offersData.length} central offers`);

  // 6. Seed Reviews
  const reviewsData = [
    {
      id: 'rev-1',
      reviewerName: 'Aarav Kumar',
      reviewerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      reviewText: 'Lovely place to relax with friends. The chai is excellent and the cafe has a warm atmosphere.',
      starRating: 5,
      reviewerRole: 'Regular Customer',
      relatedCentreId: 'centre-kompally',
      relatedCentreName: 'TeaMax Cafe – Kompally',
      reviewType: 'customer',
      displayOn: ['homepage', 'centre_page'],
      isFeatured: true,
      displayOrder: 1,
      status: 'published',
    },
    {
      id: 'rev-2',
      reviewerName: 'Sneha Patel',
      reviewerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      reviewText: 'Good snacks, friendly staff and a comfortable seating area. Will definitely visit again.',
      starRating: 5,
      reviewerRole: 'Food Enthusiast',
      relatedCentreId: 'centre-kompally',
      relatedCentreName: 'TeaMax Cafe – Kompally',
      reviewType: 'customer',
      displayOn: ['homepage', 'centre_page'],
      isFeatured: true,
      displayOrder: 2,
      status: 'published',
    },
    {
      id: 'rev-3',
      reviewerName: 'Mr. Ravi Kabra',
      reviewerAvatar: 'https://static.wixstatic.com/media/ac5a6b_f13fed47a8734bf682366547e7e065a6~mv2.webp/v1/fill/w_420,h_402,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/2.webp',
      reviewText: 'The support from the TeaMax team has been excellent. It made the entire setup and launch process smooth and stress-free.',
      starRating: 5,
      reviewerRole: 'Franchise Partner, Lucknow',
      relatedCentreId: 'centre-1',
      relatedCentreName: 'TeaMax Indiranagar Flagship',
      reviewType: 'franchise',
      displayOn: ['homepage', 'franchise_page'],
      isFeatured: true,
      displayOrder: 3,
      status: 'published',
    },
  ];

  for (const r of reviewsData) {
    await prisma.review.upsert({
      where: { id: r.id },
      update: r,
      create: r,
    });
  }
  console.log(`✅ Seeded ${reviewsData.length} reviews`);

  console.log('\n🎉 TeaMax database seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
