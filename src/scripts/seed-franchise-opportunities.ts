import prisma from '../utils/prisma';

export const INITIAL_FRANCHISE_OPPORTUNITIES = [
  {
    franchiseName: 'TeaMax Cafe – Kompally',
    slug: 'teamax-kompally',
    country: 'India',
    state: 'Telangana',
    city: 'Hyderabad',
    status: 'active',
    isFeatured: true,
    minBudget: '₹3.69 Lakhs*',
    spaceRequired: '100 – 200 sq.ft',
    timelineDays: '25 – 30 Days',
    royalty: 'Zero Royalty (100% Profits to You)',
    margins: '55% – 65% Gross Margins',
    primaryImage: 'https://responsive-cafe-showcase.lovable.app/assets/cafe-1-2S3WQYFE.jpg',
    shortDescription: 'Bring the TeaMax café experience to Kompally, Hyderabad.',
    description: '<p>Become a part of the <strong>TeaMax</strong> franchise network and build a memorable café experience.</p>',
    editorialLead: 'The tea and café culture in Hyderabad is booming, backed by a youthful population looking for cozy spaces and great beverages. With rising disposable incomes and strong consumer affinity for hygienic café settings, Hyderabad offers tremendous potential for modern quick-service tea cafés with high repeat footfalls.',
    editorialBody: 'From morning commuters grabbing freshly brewed masala chai to evening gatherings over burgers, shakes, and kulhad tea, TeaMax creates an energetic community hub in Hyderabad with robust margins (55%–65%) and predictable day-to-day cash flows.',
    primeLocations: [
      { name: 'Kompally High Street', desc: 'Rapidly expanding residential, highway connectivity & college corridor' },
      { name: 'Medchal Highway Junction', desc: 'Continuous commuter and university transit footfall' },
      { name: 'Suchitra Circle', desc: 'Buzzing commercial retail hub and food junction' }
    ],
    faqs: [
      { q: 'What is the TeaMax franchise investment in Hyderabad?', a: 'The core TeaMax franchise package in Hyderabad starts at ₹3,69,999 (+ applicable taxes). Modular shop interior setup (approx ₹60,000–₹70,000 for 100 sq.ft) and initial inventory give an illustrative setup budget of approximately ₹4.39 Lakhs.' },
      { q: 'Is there any ongoing royalty or monthly commission?', a: 'No! TeaMax operates on a 100% Zero Royalty model. All revenues and daily profits from beverage and snack sales in Hyderabad belong entirely to you.' },
      { q: 'Do I need prior food or restaurant experience?', a: 'No prior experience is necessary. Our chef-less operating model, standardized recipes, automated machinery, and comprehensive on-site training ensure seamless daily operations.' },
      { q: 'How do I check location availability in Hyderabad?', a: 'Fill out the consultation form below. Our expansion team analyzes your proposed location in Hyderabad, verifies territorial exclusivity, and connects with you within 24 hours.' }
    ],
    seoTitle: 'Tea Franchise Opportunity in Hyderabad | TeaMax Cafe',
    metaDescription: 'Start a modern, high-return tea café franchise in Hyderabad, Telangana. Low investment, zero royalty, chef-less operations and pan-India brand trust.',
    seoKeywords: 'tea franchise hyderabad, cafe franchise kompally, low cost food franchise telangana, teamax cafe hyderabad',
    applicantCount: 19,
    inquiries: [
      { id: 'inq-1', name: 'Suresh Reddy', phone: '+91 98490 23412', email: 'suresh.reddy@example.com', preferredLocality: 'Kompally', budget: '₹5 - 8 Lakhs', experience: 'Commercial property owner', status: 'contacted', date: '2025-02-14' },
      { id: 'inq-2', name: 'Pooja Rao', phone: '+91 99890 87654', email: 'pooja.rao@example.com', preferredLocality: 'Suchitra Circle', budget: '₹4 - 6 Lakhs', experience: 'Retail store franchisee', status: 'meeting_scheduled', date: '2025-02-12' },
      { id: 'inq-3', name: 'Mohammed Farhan', phone: '+91 90001 54321', email: 'm.farhan@example.com', preferredLocality: 'Medchal Highway', budget: '₹5 Lakhs', experience: 'First-time entrepreneur', status: 'new', date: '2025-02-10' }
    ],
    displayOrder: 1
  },
  {
    franchiseName: 'TeaMax Cafe – Gachibowli',
    slug: 'teamax-gachibowli',
    country: 'India',
    state: 'Telangana',
    city: 'Hyderabad',
    status: 'active',
    isFeatured: true,
    minBudget: '₹3.69 Lakhs*',
    spaceRequired: '100 – 200 sq.ft',
    timelineDays: '25 – 30 Days',
    royalty: 'Zero Royalty (100% Profits to You)',
    margins: '55% – 65% Gross Margins',
    primaryImage: 'https://responsive-cafe-showcase.lovable.app/assets/cafe-1-2S3WQYFE.jpg',
    shortDescription: 'Explore a TeaMax franchise opportunity in Gachibowli.',
    description: '<p>Partner with TeaMax and create a welcoming destination for tea lovers in the heart of Hyderabad\'s financial and IT hub.</p>',
    editorialLead: 'Gachibowli is home to multinational IT campuses, financial corporations, and upscale residential high-rises. Young corporate employees seek clean, hygienic, artisanal beverage hubs for quick meetings and evening unwinding.',
    editorialBody: 'With high disposable incomes and round-the-clock shift timings, a TeaMax outlet in Gachibowli generates non-stop ticket sales from breakfast chai to late-night cold brews and burgers.',
    primeLocations: [
      { name: 'Financial District High Street', desc: 'Corporate campuses, Cyber Towers & high evening youth footfall' },
      { name: 'DLF Cyber City Road', desc: 'Non-stop tech crowd and street food commerce' },
      { name: 'Telecom Nagar', desc: 'Dense residential tech community with high evening walk-ins' }
    ],
    faqs: [
      { q: 'What is the TeaMax franchise investment in Gachibowli?', a: 'The core TeaMax franchise package starts at ₹3,69,999 (+ applicable taxes) with zero ongoing royalty.' },
      { q: 'Can we operate 24/7 in Gachibowli?', a: 'Yes, subject to local commercial licensing. Many IT hub locations run extended hours to capture night shifts.' },
      { q: 'Is there full staff training provided?', a: 'Yes, full barista and staff training along with recipe standard operating procedures are provided before launch.' },
      { q: 'How soon can we launch in Gachibowli?', a: 'With an approved commercial premise, turnkey store fit-out takes approximately 25 to 30 days.' }
    ],
    seoTitle: 'TeaMax Cafe Franchise Opportunity in Gachibowli Hyderabad',
    metaDescription: 'Launch a high-traffic tea cafe in Gachibowli Hyderabad. Chef-less kitchen, zero royalty, high margin returns.',
    seoKeywords: 'tea cafe gachibowli, franchise opportunity hyderabad, teamax it corridor',
    applicantCount: 24,
    inquiries: [
      { id: 'inq-4', name: 'Venkat Raman', phone: '+91 97000 66789', email: 'venkat.r@example.com', preferredLocality: 'DLF Cyber City Road', budget: '₹6 - 10 Lakhs', experience: 'IT manager & investor', status: 'approved', date: '2025-02-15' },
      { id: 'inq-5', name: 'Kavita Nair', phone: '+91 98850 11229', email: 'kavita.n@example.com', preferredLocality: 'Financial District', budget: '₹8 Lakhs', experience: 'Bakery owner', status: 'meeting_scheduled', date: '2025-02-13' }
    ],
    displayOrder: 2
  },
  {
    franchiseName: 'TeaMax Cafe – Indore',
    slug: 'teamax-indore',
    country: 'India',
    state: 'Madhya Pradesh',
    city: 'Indore',
    status: 'active',
    isFeatured: true,
    minBudget: '₹3.69 Lakhs*',
    spaceRequired: '100 – 200 sq.ft',
    timelineDays: '25 – 30 Days',
    royalty: 'Zero Royalty (100% Profits to You)',
    margins: '55% – 65% Gross Margins',
    primaryImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1000&auto=format&fit=crop&q=80',
    shortDescription: 'Build your TeaMax franchise in the vibrant city of Indore.',
    description: '<p>Join the TeaMax franchise family and bring quality tea, coffee and food to your city.</p>',
    editorialLead: 'Indore is famous throughout India for its food passion and street culinary culture. With cleanest city accolades, prestigious institutes (IIM, IIT), and expanding commercial corridors like Vijay Nagar and Super Corridor, Indore is ideal for rapid cafe expansion.',
    editorialBody: 'TeaMax brings hygienic, standardized slow-brewed kulhad chai, ginger-cardamom brews, and artisan sandwiches that resonate deeply with Indore\'s food-loving youth and families.',
    primeLocations: [
      { name: 'Vijay Nagar', desc: 'Premier commercial hub, corporate offices & vibrant youth crowd' },
      { name: 'Palasia & New Palasia', desc: 'Central business district, premium cafes & shopping hubs' },
      { name: 'Bhawar Kuan', desc: 'Massive student and coaching hub with non-stop daily footfall' },
      { name: 'Chappan Dukan & MG Road', desc: 'Iconic high-street food culture & heavy shopping footfalls' },
      { name: 'Super Corridor & Rau', desc: 'Fast-developing IT corridor, university zone & tech parks' }
    ],
    faqs: [
      { q: 'What is the investment required for TeaMax in Indore?', a: 'Setup starts at ₹3,69,999 with zero royalty. Turnkey interior package starts around ₹60,000 for 100 sq.ft.' },
      { q: 'Does Indore have territory exclusivity for TeaMax?', a: 'Yes! We allocate exclusive radius protection for each franchisee to prevent cannibalization.' }
    ],
    seoTitle: 'Tea Franchise Opportunity in Indore | TeaMax Cafe',
    metaDescription: 'Start a high-margin tea cafe in Indore. Low investment, zero royalty, chef-less model and complete training.',
    seoKeywords: 'tea franchise indore, cafe vijay nagar, teamax madhya pradesh',
    applicantCount: 15,
    inquiries: [
      { id: 'inq-6', name: 'Amit Sharma', phone: '+91 94250 88991', email: 'amit.sharma@example.com', preferredLocality: 'Vijay Nagar', budget: '₹5 - 7 Lakhs', experience: 'Food stall owner', status: 'contacted', date: '2025-02-11' }
    ],
    displayOrder: 3
  },
  {
    franchiseName: 'TeaMax Cafe – Bhopal',
    slug: 'teamax-bhopal',
    country: 'India',
    state: 'Madhya Pradesh',
    city: 'Bhopal',
    status: 'active',
    isFeatured: true,
    minBudget: '₹3.69 Lakhs*',
    spaceRequired: '100 – 200 sq.ft',
    timelineDays: '25 – 30 Days',
    royalty: 'Zero Royalty (100% Profits to You)',
    margins: '55% – 65% Gross Margins',
    primaryImage: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1000&auto=format&fit=crop&q=80',
    shortDescription: 'Discover the TeaMax franchise opportunity in Bhopal.',
    description: '<p>Create a warm café destination for tea and coffee lovers with TeaMax.</p>',
    editorialLead: 'Bhopal, the City of Lakes, is experiencing rapid commercial development and an expanding cafe culture centered around student zones like MP Nagar and residential hotspots like Arera Colony.',
    editorialBody: 'TeaMax provides the perfect meeting ground with authentic kulhad chai, bubble teas, coffee classics, and freshly baked bites.',
    primeLocations: [
      { name: 'MP Nagar (Zones 1 & 2)', desc: 'City\'s foremost commercial & business center with office crowd' },
      { name: 'Arera Colony', desc: 'Upscale residential neighborhood with trendy youth & family crowd' },
      { name: 'Kolar Road', desc: 'Fastest growing residential and retail corridor with high demand' },
      { name: 'TT Nagar & New Market', desc: 'Bustling central retail market & vibrant street commerce' }
    ],
    faqs: [
      { q: 'What is the TeaMax setup cost in Bhopal?', a: 'Standard setup begins at ₹3,69,999 with zero ongoing royalties.' },
      { q: 'What support does TeaMax provide for Bhopal franchisees?', a: 'Location evaluation, 3D store interior layouts, commercial equipment, raw ingredient supply chain, and staff training.' }
    ],
    seoTitle: 'Tea Franchise Opportunity in Bhopal | TeaMax Cafe',
    metaDescription: 'Start a modern TeaMax cafe in Bhopal. Zero royalty, chef-less model, full setup support.',
    seoKeywords: 'tea franchise bhopal, cafe mp nagar, teamax bhopal',
    applicantCount: 12,
    inquiries: [
      { id: 'inq-7', name: 'Ritu Sen', phone: '+91 97555 43210', email: 'ritu.sen@example.com', preferredLocality: 'MP Nagar Zone 2', budget: '₹4 - 6 Lakhs', experience: 'First-time entrepreneur', status: 'new', date: '2025-02-09' }
    ],
    displayOrder: 4
  }
];

async function seed() {
  console.log('Seeding initial franchise opportunities...');
  for (const item of INITIAL_FRANCHISE_OPPORTUNITIES) {
    const existing = await prisma.franchiseOpportunity.findUnique({
      where: { slug: item.slug }
    });

    if (!existing) {
      const created = await prisma.franchiseOpportunity.create({
        data: item as any
      });
      console.log(`Created: ${created.franchiseName} (${created.slug})`);
    } else {
      console.log(`Already exists: ${item.slug}`);
    }
  }
  console.log('Seeding completed!');
}

seed()
  .catch((e) => {
    console.error('Error seeding franchise opportunities:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

