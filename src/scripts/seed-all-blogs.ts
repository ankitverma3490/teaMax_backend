import prisma from '../utils/prisma';

const BLOGS_TO_SEED = [
  {
    id: 'blog-guide-1',
    slug: 'cost-to-open-tea-cafe-franchise-in-india-2026',
    title: 'How Much Does It Cost to Open a Tea Café Franchise in India? (2026 Complete Guide)',
    excerpt: 'Explore the real financial roadmap to launching a profitable Indian tea cafe franchise in 2026. From low-investment kiosk formats starting at ₹3.5 Lakhs to flagship lounge spaces.',
    category: 'Franchise Guide',
    readingTime: '6 min read',
    publishDate: new Date('2026-03-15'),
    author: 'TeaMax F&B Advisory',
    authorDesignation: 'Franchise Development & Operations',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    coverImage: '/images/cafe-interior.jpg',
    seoTitle: 'How Much Does It Cost to Open a Tea Café Franchise in India? | TeaMax',
    metaDescription: 'Detailed 2026 guide to tea cafe franchise costs in India. Learn capital expenditure, equipment fees, profit margins (50-65%), and payback timelines for TeaMax Cafe.',
    seoKeywords: 'tea cafe franchise cost India, cost to open tea shop India, TeaMax franchise cost, low cost cafe franchise, best franchise under 5 lakhs',
    isFeatured: true,
    status: 'published',
    content: `
      <h2>The Branded Tea Café Surge in India</h2>
      <p>With over 1.2 billion cups of tea consumed daily across India, chai is no longer restricted to informal street-side stalls. Modern consumers actively seek hygienic, aesthetic, and welcoming environments to enjoy their daily brew.</p>
      <blockquote>Starting a branded tea cafe franchise like TeaMax in India requires an initial capital investment between ₹3.5 Lakhs to ₹10 Lakhs depending on the footprint, with gross profit margins ranging from 50% to 65% and an average breakeven of 6 to 12 months.</blockquote>
      <h3>1. The Three Capital Pillars of Opening a Café</h3>
      <p>When budgeting for your franchise journey, costs generally fall into three operational buckets: upfront franchise fees, interior store fabrication, and commercial kitchen machinery.</p>
      <ul>
        <li><strong>Franchise Brand Fee & License:</strong> Grants proprietary operating rights, billing systems, standardized SOPs, and marketing access.</li>
        <li><strong>Kitchen & Commercial Equipment:</strong> Heavy-duty tea brewing machines, induction burners, commercial blenders, refrigeration, deep freezers, and point-of-sale terminals.</li>
        <li><strong>Interior Fabrication & Signage:</strong> 2D/3D store layouts, LED 3D glow-sign boards, display counters, ambient warm lighting, and acoustic finishes.</li>
      </ul>
      <h3>2. Cost Comparison: Express Kiosk vs. Dine-In Café</h3>
      <p>Depending on your available commercial area and financial budget, franchise brands offer tiered operating formats:</p>
      <table border="1" cellpadding="8" style="border-collapse:collapse;width:100%;margin:16px 0;">
        <thead>
          <tr style="background:#f4f4f4;"><th>Parameters</th><th>Express Kiosk Model</th><th>Dine-In Lounge Model</th></tr>
        </thead>
        <tbody>
          <tr><td>Recommended Area</td><td>100 – 250 sq.ft</td><td>400 – 1000+ sq.ft</td></tr>
          <tr><td>Turnkey Investment</td><td>₹3.5 Lakhs – ₹5.5 Lakhs</td><td>₹7.5 Lakhs – ₹14 Lakhs</td></tr>
          <tr><td>Staff Requirement</td><td>2 – 3 Baristas</td><td>4 – 6 Staff Members</td></tr>
          <tr><td>Expected Payback</td><td>6 – 9 Months</td><td>9 – 14 Months</td></tr>
          <tr><td>Gross Profit Margin</td><td>55% – 65%</td><td>50% – 60%</td></tr>
        </tbody>
      </table>
      <h3>Conclusion</h3>
      <p>Entering the Indian café industry through an established brand like TeaMax minimizes operational risk while providing a clear timeline to profitability. With starting capex as accessible as ₹3.5 Lakhs, the opportunity has never been more viable.</p>
    `,
  },
  {
    id: 'blog-guide-2',
    slug: 'why-3-in-1-cafe-model-is-revolutionizing-indian-f-and-b',
    title: 'Why the 3-in-1 Café Model (Chai + Juices + Ice Cream) Outperforms Single-Item Outlets',
    excerpt: 'Learn how the innovative 3-in-1 hybrid cafe concept eliminates seasonal dips, boosts average order value, and solves the single-product footfall trap.',
    category: 'Café Business',
    readingTime: '5 min read',
    publishDate: new Date('2026-02-28'),
    author: 'TeaMax Culinary & Research',
    authorDesignation: 'Product Strategy & Menu Architecture',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    coverImage: '/images/chai.webp',
    seoTitle: 'Why the 3-in-1 Café Model Outperforms Traditional Tea Stalls | TeaMax',
    metaDescription: 'Why the 3-in-1 cafe model (Chai, Fresh Fruit Juices, Ice Creams) delivers higher profitability and year-round footfalls compared to single-category tea stalls.',
    seoKeywords: '3 in 1 cafe model, tea cafe business model, hybrid cafe franchise India, tea juices and ice cream cafe',
    isFeatured: true,
    status: 'published',
    content: `
      <h2>The Day-Part Dilemma in Indian F&B</h2>
      <p>Traditional food and beverage outlets in India frequently suffer from the 'day-part limitation.' A dedicated tea stall experiences peak traffic between 7:00 AM to 10:30 AM and 4:30 PM to 7:30 PM, leaving long midday and late-night valleys where overheads continue ticking while revenue stalls.</p>
      <blockquote>By housing a specialty Tea & Coffee bar, a cold-pressed 0% added sugar Fresh Juice counter, and an Artisanal Ice Cream & Thick Shake parlour under one roof, TeaMax outlets maintain consistent foot traffic from 8:00 AM to 11:00 PM, driving 2.8x higher Average Order Value.</blockquote>
      <h3>All-Day Traffic Schedule</h3>
      <ul>
        <li><strong>Morning (8 AM – 11 AM):</strong> Hot Kadak Chai, Ginger Lemon Tea, Filter Coffee, and breakfast snacks.</li>
        <li><strong>Afternoon (12 PM – 4 PM):</strong> 17 varieties of 100% natural cold-pressed fruit juices (zero water, zero sugar added).</li>
        <li><strong>Evening (4 PM – 7 PM):</strong> Signature Bellam Chai, Herbal Infusions, and hot savory accompaniments.</li>
        <li><strong>Night (7 PM – 11 PM):</strong> 31+ flavours of artisanal ice creams, sundaes, and thick milkshakes.</li>
      </ul>
      <p>When your menu respects diverse dietary preferences, nobody walks out because there was not something for them.</p>
    `,
  },
  {
    id: 'blog-guide-3',
    slug: 'top-high-roi-small-town-franchise-opportunities-india',
    title: 'Top High-ROI Business Ideas for Tier 2 and Tier 3 Indian Cities in 2026',
    excerpt: 'Discover why aspirational consumers in cities like Vijayawada, Guntur, Warangal, and Salem make Tier 2/3 markets the most lucrative café locations.',
    category: 'Franchise Guide',
    readingTime: '5 min read',
    publishDate: new Date('2026-02-18'),
    author: 'TeaMax Growth Analytics',
    authorDesignation: 'Regional Market Research',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    coverImage: '/images/tea-valley.webp',
    seoTitle: 'High-ROI Business Ideas for Tier 2 and 3 Cities | TeaMax Café',
    metaDescription: 'Explore why Tier 2 and Tier 3 Indian cities offer higher ROI for tea cafe franchises. Lower commercial rentals, minimal competition, and strong aspirational demand.',
    seoKeywords: 'tier 2 city business ideas, cafe franchise tier 3 towns, best business in small town India',
    isFeatured: false,
    status: 'published',
    content: `
      <h2>The Non-Metro Advantage in Indian F&B</h2>
      <p>While major metros carry astronomical commercial rents and high employee turnover, Tier 2, Tier 3, and district headquarters across Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, and West Bengal have emerged as the real growth engines of modern India.</p>
      <h3>The Unit Economics</h3>
      <p>A prime 300 sq.ft retail frontage in Indiranagar, Bengaluru or Jubilee Hills, Hyderabad might easily demand ₹80,000 to ₹1,50,000 per month. That same high-visibility corner facing a bustling college in Rajahmundry, Tirupati, or Kurnool leases for ₹18,000 to ₹35,000.</p>
      <ul>
        <li><strong>Rental Savings:</strong> 60% – 75% lower fixed monthly real estate overhead.</li>
        <li><strong>Staff Retention:</strong> Greater community stability and lower employee turnover compared to Tier-1 gig markets.</li>
        <li><strong>Hyper-Localized Word-of-Mouth:</strong> When a stylish, hygienic cafe opens in a Tier-2 town, it immediately becomes the primary social destination.</li>
      </ul>
    `,
  },
  {
    id: 'blog-guide-4',
    slug: 'secret-behind-perfect-kadak-chai-teamax-way',
    title: 'The Science and Craft Behind the Perfect Cup of Indian Kadak Chai',
    excerpt: 'A deep dive into how TeaMax standardizes aroma, strength, and velvety mouthfeel across 250+ outlets without losing artisanal soul.',
    category: 'Chai Culture',
    readingTime: '4 min read',
    publishDate: new Date('2026-01-24'),
    author: 'TeaMax Master Tea Taster',
    authorDesignation: 'Sourcing & Blend Formulation',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    coverImage: '/images/chai.webp',
    seoTitle: 'The Science of Kadak Chai | TeaMax Café',
    metaDescription: 'Learn the secrets of brewing authentic Indian Kadak Chai the TeaMax way. Leaf grading, milk fat ratios, whole spice decoction, and boiling science.',
    seoKeywords: 'how to brew kadak chai, best Indian chai recipe, Assam CTC tea grading, TeaMax secret chai recipe',
    isFeatured: false,
    status: 'published',
    content: `
      <h2>The Anatomy of CTC Tea Leaves</h2>
      <p>CTC stands for "Crush, Tear, Curl" — a mechanical processing method pioneered to rupture tea leaf cell walls, accelerating enzymatic oxidation and yielding rich, reddish liquor with assertive tannins.</p>
      <p>TeaMax sources directly from selected gardens in the Brahmaputra valley of Assam, blending Broken Orange Pekoe (BOP) for brisk aroma with Broken Pekoe (BP) for deep color and rich body.</p>
      <h3>Decoction Timing</h3>
      <p>Crushed green cardamom pods, fresh ginger with intact rhizome oils, and a hint of clove simmer in water prior to milk addition. Water is polar and extracts water-soluble terpenes; milk fats dissolve lipid-soluble spice components.</p>
    `,
  },
  {
    id: 'blog-guide-5',
    slug: 'how-to-choose-the-best-location-for-your-cafe-franchise',
    title: 'How to Choose the Best Commercial Location for Your New Café: The 7-Point Checklist',
    excerpt: 'Avoid costly retail location mistakes with our proven commercial real estate checklist developed across 250+ operating franchise stores.',
    category: 'Café Business',
    readingTime: '6 min read',
    publishDate: new Date('2026-01-12'),
    author: 'TeaMax Operations Team',
    authorDesignation: 'Site Feasibility & Commercial Real Estate',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    coverImage: '/images/cafe-interior.jpg',
    seoTitle: 'How to Choose the Best Commercial Location for a Cafe | TeaMax',
    metaDescription: 'Essential checklist for selecting a profitable cafe franchise location in India. Footfall analysis, road frontage, electrical load, and lease negotiation tips.',
    seoKeywords: 'how to select cafe location, best location for tea cafe, retail site selection checklist',
    isFeatured: false,
    status: 'published',
    content: `
      <h2>The 7-Point Site Selection Checklist</h2>
      <ol>
        <li><strong>Clear Street Frontage:</strong> Minimum 10 to 15 feet of unblocked glass or counter visibility directly facing pedestrian traffic.</li>
        <li><strong>Pedestrian Velocity:</strong> Slow-moving or lingering pedestrians (students, office commuters) rather than vehicles speeding past at 50 km/h.</li>
        <li><strong>Orientation:</strong> Avoid spaces with harsh west-facing afternoon glare.</li>
        <li><strong>Three-Phase Electrical Connection:</strong> Minimum 8 kW to 15 kW commercial electricity load capacity.</li>
        <li><strong>Plumbing & Drainage:</strong> Dedicated water inlet with grease-trap compliant sewage drainage.</li>
        <li><strong>Two-Wheeler Parking:</strong> Convenient parking for scooters and motorbikes.</li>
        <li><strong>Anchor Stores:</strong> Proximity to coaching centers, colleges, clinics, or diagnostic labs that naturally draw all-day foot traffic.</li>
      </ol>
    `,
  },
  {
    id: 'blog-guide-6',
    slug: 'healthy-beverages-trends-india-fresh-juices-immunity-drinks',
    title: "The Rise of Zero-Sugar Juices and Herbal Teas in India's Quick-Service Cafés",
    excerpt: 'Explore why unadulterated fruit juices, blue pea infusions, and aloe vera immunity shots are the fastest-growing categories in modern cafes.',
    category: 'Wellness & Drinks',
    readingTime: '5 min read',
    publishDate: new Date('2025-12-29'),
    author: 'TeaMax Beverage Lab',
    authorDesignation: 'Wellness Innovation & Nutritional Design',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    coverImage: '/images/juice.webp',
    seoTitle: 'Zero-Sugar Juices and Herbal Teas in India | TeaMax Café',
    metaDescription: 'Understand the explosion of health-conscious drink trends in India. Why 100% natural, no-water, no-sugar juices and herbal teas are essential for modern cafe revenue.',
    seoKeywords: 'healthy drinks cafe India, zero sugar fresh fruit juice, blue pea herbal tea benefits',
    isFeatured: false,
    status: 'published',
    content: `
      <h2>The Zero-Added-Water Philosophy</h2>
      <p>In conventional roadside juice stalls, fruit juices are frequently watered down with ice and overloaded with white sugar syrups. TeaMax disrupted this by adopting 17 fresh fruit juices extracted using slow-masticating and cold-press techniques with 0% added water and 0% refined sugar.</p>
      <h3>The Botanical Boom</h3>
      <ul>
        <li><strong>Blue Pea (Clitoria ternatea):</strong> Packed with anthocyanin antioxidants that support skin vitality.</li>
        <li><strong>Hibiscus Blossom:</strong> Brisk tart berry profile known for supporting healthy blood pressure.</li>
        <li><strong>Chamomile & Lavender:</strong> Calming nighttime elixirs popular among students and professionals unwinding after work.</li>
      </ul>
    `,
  },
  {
    id: 'blog-guide-7',
    slug: 'guide-to-fssai-gst-and-cafe-licensing-in-india',
    title: 'A Step-by-Step Guide to FSSAI, GST, Trade License, and Fire NOC for Indian Cafés',
    excerpt: 'Demystifying food business operator regulations in India. A clear legal compliance roadmap for prospective cafe franchise owners.',
    category: 'Franchise Guide',
    readingTime: '7 min read',
    publishDate: new Date('2025-12-14'),
    author: 'TeaMax Legal & Corporate Affairs',
    authorDesignation: 'Compliance & Government Relations',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    coverImage: '/images/cafe-interior.jpg',
    seoTitle: 'Step-by-Step Guide to FSSAI, GST, and Cafe Licensing | TeaMax',
    metaDescription: 'Step-by-step regulatory guide for opening an Indian cafe. FSSAI food licenses, GST thresholds, municipal health trade license, and MSME benefits explained.',
    seoKeywords: 'FSSAI license for cafe India, GST registration for food stall, documents required to open cafe in India',
    isFeatured: false,
    status: 'published',
    content: `
      <h2>Four Non-Negotiable Registrations</h2>
      <p>To legally open a commercial cafe in India, four core registrations are essential: FSSAI Food Business Operator License, GST Registration, Shop & Establishment Act Certificate, and the Local Municipal Health Trade License.</p>
      <h3>1. FSSAI Registration vs. State License</h3>
      <ul>
        <li><strong>Basic Registration (Form A):</strong> For annual turnover up to ₹12 Lakhs.</li>
        <li><strong>State License (Form B):</strong> For turnover between ₹12 Lakhs to ₹20 Crores. Most franchised cafes fall under this category.</li>
      </ul>
      <h3>2. GST Registration</h3>
      <p>Restaurants and standalone cafes fall under the 5% GST composition scheme with no input tax credit. Obtaining a GSTIN is mandatory if your aggregate annual turnover exceeds ₹20 Lakhs.</p>
    `,
  },
  {
    id: 'blog-guide-8',
    slug: 'from-daily-chai-to-community-hub-the-modern-indian-cafe',
    title: 'How the Modern Indian Café Became the Third Living Room for Gen Z and Families',
    excerpt: 'Explore how clean seating, ambient lighting, multi-generational menus, and social connection transformed daily tea into India\'s preferred social ritual.',
    category: 'Chai Culture',
    readingTime: '5 min read',
    publishDate: new Date('2025-11-20'),
    author: 'TeaMax Brand & Heritage',
    authorDesignation: 'Culture & Consumer Anthropology',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    coverImage: '/images/tea-valley.webp',
    seoTitle: 'How the Modern Indian Café Became the Third Living Room | TeaMax',
    metaDescription: 'How the Indian tea cafe evolved from roadside tapris into the "third place" community living room for youth, freelancers, and multi-generational families.',
    seoKeywords: 'third place cafe India, evolution of chai tapri, community cafe concept India, TeaMax cafe experience',
    isFeatured: false,
    status: 'published',
    content: `
      <h2>The Third Place in Urban India</h2>
      <p>Sociologist Ray Oldenburg coined "The Third Place" to describe anchors of community life beyond home and the workplace. In traditional India, the corner tapri filled this role for decades — a quick glass of cutting chai enjoyed standing on the sidewalk.</p>
      <h3>Designed for Connection</h3>
      <p>Step into a TeaMax café and the sensory cues are unmistakable: soothing warm cream walls, grounding forest teal accents, soft butter yellow typography, and the gentle fragrance of crushed cardamom and freshly brewed filter coffee.</p>
      <p>With multi-generational menus, grandparents enjoy Bellam Tea, parents sip fresh juices, and students study over iced shakes.</p>
    `,
  },
];

async function seedAllBlogs() {
  console.log(`Starting to seed ${BLOGS_TO_SEED.length} blogs into PostgreSQL...`);

  for (const b of BLOGS_TO_SEED) {
    const upserted = await prisma.blog.upsert({
      where: { slug: b.slug },
      update: {
        title: b.title,
        excerpt: b.excerpt,
        category: b.category,
        readingTime: b.readingTime,
        publishDate: b.publishDate,
        author: b.author,
        authorDesignation: b.authorDesignation,
        authorAvatar: b.authorAvatar,
        coverImage: b.coverImage,
        seoTitle: b.seoTitle,
        metaDescription: b.metaDescription,
        seoKeywords: b.seoKeywords,
        isFeatured: b.isFeatured,
        status: b.status,
        content: b.content.trim(),
      },
      create: {
        id: b.id,
        slug: b.slug,
        title: b.title,
        excerpt: b.excerpt,
        category: b.category,
        readingTime: b.readingTime,
        publishDate: b.publishDate,
        author: b.author,
        authorDesignation: b.authorDesignation,
        authorAvatar: b.authorAvatar,
        coverImage: b.coverImage,
        seoTitle: b.seoTitle,
        metaDescription: b.metaDescription,
        seoKeywords: b.seoKeywords,
        isFeatured: b.isFeatured,
        status: b.status,
        content: b.content.trim(),
      },
    });
    console.log(`✅ Seeded blog: [${upserted.id}] ${upserted.title}`);
  }

  const count = await prisma.blog.count();
  console.log(`🎉 Total blogs now in PostgreSQL database: ${count}`);
}

seedAllBlogs()
  .catch((e) => {
    console.error('Error seeding blogs:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
