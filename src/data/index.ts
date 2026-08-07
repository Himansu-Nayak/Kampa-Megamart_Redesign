export interface Product {
  id: string
  name: string
  brand: string
  price: number
  mrp: number
  rating: number
  reviews: number
  image: string
  category: string
  description: string
  badge?: string
  inStock: boolean
  specs?: Record<string, string>
}

export interface Category {
  id: string
  name: string
  emoji: string
  color: string
  bgColor: string
  image: string
  count: number
}

export const categories: Category[] = [
  { id: 'electronics', name: 'Electronics', emoji: '📱', color: '#1d4ed8', bgColor: '#eff6ff', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop&auto=format', count: 245 },
  { id: 'home-care', name: 'Home Care', emoji: '🏠', color: '#0f766e', bgColor: '#f0fdfa', image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=300&fit=crop&auto=format', count: 189 },
  { id: 'personal-care', name: 'Personal Care', emoji: '✨', color: '#9333ea', bgColor: '#faf5ff', image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=300&fit=crop&auto=format', count: 312 },
  { id: 'health', name: 'Health & Nutrition', emoji: '💊', color: '#16a34a', bgColor: '#f0fdf4', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop&auto=format', count: 156 },
  { id: 'herbal', name: 'Herbal Products', emoji: '🌿', color: '#854d0e', bgColor: '#fefce8', image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&h=300&fit=crop&auto=format', count: 98 },
  { id: 'garments', name: 'Garments', emoji: '👕', color: '#dc2626', bgColor: '#fff1f2', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=300&fit=crop&auto=format', count: 421 },
  { id: 'food', name: 'Food & Beverage', emoji: '🛒', color: '#ea580c', bgColor: '#fff7ed', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop&auto=format', count: 534 },
  { id: 'lifestyle', name: 'Lifestyle', emoji: '🌟', color: '#b45309', bgColor: '#fffbeb', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=300&fit=crop&auto=format', count: 267 },
  { id: 'educational', name: 'Educational', emoji: '📚', color: '#0369a1', bgColor: '#e0f2fe', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop&auto=format', count: 120 },
  { id: 'office-stationery', name: 'Stationery', emoji: '✏️', color: '#be185d', bgColor: '#fff1f2', image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&h=300&fit=crop&auto=format', count: 340 },
  { id: 'mobile-accessories', name: 'Accessories', emoji: '🎧', color: '#4338ca', bgColor: '#f3e8ff', image: 'https://images.unsplash.com/photo-1606220588913-b3aec89155a0?w=400&h=300&fit=crop&auto=format', count: 521 },
  { id: 'ev-scooty', name: 'EV Scooties', emoji: '🛵', color: '#0369a1', bgColor: '#e0f2fe', image: 'https://images.unsplash.com/photo-1593529467220-9d721ceb9a78?w=400&h=300&fit=crop&auto=format', count: 2 },
]

export const products: Product[] = [
  {
    id: 'p1', name: 'Redmi Note 13 Pro+ 5G (12GB+256GB)', brand: 'Xiaomi', price: 26999, mrp: 32999, rating: 4.5, reviews: 2847, category: 'electronics',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&auto=format',
    description: 'The Redmi Note 13 Pro+ 5G features a stunning 200MP camera with OIS, a 1.5K curved AMOLED display, and blazing-fast 120W HyperCharge technology that juices your phone in under 20 minutes. Built with Corning Gorilla Glass for extra durability.',
    badge: 'bestseller', inStock: true,
    specs: { Display: '6.67" 1.5K AMOLED 120Hz', Processor: 'Dimensity 7200 Ultra', RAM: '12GB LPDDR5', Storage: '256GB UFS 2.2', Battery: '5000mAh', Camera: '200MP + 8MP + 2MP', 'Charging': '120W HyperCharge' }
  },
  {
    id: 'p2', name: 'boAt Airdopes 141 TWS Earbuds', brand: 'boAt', price: 899, mrp: 3499, rating: 4.3, reviews: 18654, category: 'electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&auto=format',
    description: 'True wireless earbuds with 42H total playback, BEAST mode for ultra-low latency gaming, and IPX4 water resistance. Equipped with quad-mic ENx technology for crystal-clear calls even in noisy environments.',
    badge: 'sale', inStock: true,
    specs: { 'Driver Size': '8mm', Connectivity: 'Bluetooth 5.3', 'Playback Time': '6H + 36H (case)', Charging: 'Type-C', 'Water Resistance': 'IPX4', Latency: '40ms (BEAST Mode)' }
  },
  {
    id: 'p3', name: 'Lenovo IdeaPad Slim 3 (2024)', brand: 'Lenovo', price: 42990, mrp: 52990, rating: 4.2, reviews: 1203, category: 'electronics',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&auto=format',
    description: 'Powered by AMD Ryzen 5 7520U with 16GB DDR5 RAM, 512GB NVMe SSD, and Full HD IPS display. Perfect for students, professionals, and creators. Slim and portable at just 1.7kg.',
    badge: 'new', inStock: true,
    specs: { Processor: 'AMD Ryzen 5 7520U', RAM: '16GB DDR5', Storage: '512GB NVMe SSD', Display: '15.6" Full HD IPS', OS: 'Windows 11 Home', Weight: '1.7kg' }
  },
  {
    id: 'p4', name: 'Noise ColorFit Pro 5 Smartwatch', brand: 'Noise', price: 3499, mrp: 6999, rating: 4.1, reviews: 9423, category: 'electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&auto=format',
    description: 'Advanced smartwatch with a vibrant 1.85" AMOLED display, Bluetooth calling, 100+ sports modes, and comprehensive health tracking including SpO2, heart rate, and stress monitoring.',
    badge: 'sale', inStock: true,
    specs: { Display: '1.85" AMOLED', 'Battery Life': '7 days', Calling: 'Bluetooth', 'Water Resistance': 'IP68', Sensors: 'SpO2, Heart Rate, Stress', 'Sports Modes': '100+' }
  },
  {
    id: 'p5', name: 'Dove Intense Repair Shampoo 1L', brand: 'Dove', price: 349, mrp: 399, rating: 4.4, reviews: 5621, category: 'personal-care',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop&auto=format',
    description: 'Formulated with Keratin Actives and Nutritive Serum, Dove Intense Repair Shampoo repairs damage from root to tip. Leaves hair visibly stronger, silky smooth, and frizz-free after every wash.',
    badge: undefined, inStock: true,
    specs: { Volume: '1 Litre', 'Hair Type': 'Damaged / Frizzy', 'Key Ingredient': 'Keratin Actives', Fragrance: 'Fresh Floral', Paraben: 'Paraben-free' }
  },
  {
    id: 'p6', name: 'Himalaya Purifying Neem Face Wash', brand: 'Himalaya', price: 89, mrp: 100, rating: 4.5, reviews: 12847, category: 'personal-care',
    image: 'https://images.unsplash.com/photo-1556228720-da4a7e10c6b9?w=400&h=400&fit=crop&auto=format',
    description: 'Enriched with neem and turmeric extracts, this face wash deeply cleanses pores, removes excess oil, and helps prevent breakouts. Gentle enough for daily use on all skin types.',
    badge: 'bestseller', inStock: true,
    specs: { Volume: '100ml', 'Skin Type': 'All Skin Types', 'Key Ingredients': 'Neem, Turmeric', Formulation: 'Gel-based', SLS: 'SLS-free' }
  },
  {
    id: 'p7', name: 'MuscleBlaze Biozyme Whey Protein 1kg', brand: 'MuscleBlaze', price: 2249, mrp: 3499, rating: 4.6, reviews: 7823, category: 'health',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop&auto=format',
    description: 'With 25g of high-quality protein per serving and an enhanced absorption formula validated by a third-party NABL lab. Rich Chocolate flavor with zero added sugar — ideal for muscle recovery and growth.',
    badge: 'sale', inStock: true,
    specs: { 'Protein/Serving': '25g', Flavor: 'Rich Chocolate', Servings: '30', Weight: '1kg', Certification: 'Informed Choice', BCAA: '5.5g/serving' }
  },
  {
    id: 'p8', name: 'Omron HEM-7124 Blood Pressure Monitor', brand: 'Omron', price: 1649, mrp: 2199, rating: 4.7, reviews: 4521, category: 'health',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&auto=format',
    description: 'Fully automatic upper arm blood pressure monitor with Omron IntelliSense technology for clinically accurate readings. Stores up to 60 readings with date and time.',
    badge: undefined, inStock: true,
    specs: { Type: 'Upper Arm', Memory: '60 readings', 'Cuff Size': '22–32cm', Power: 'AAA × 4 / Adapter', Display: 'Large LCD', Warranty: '5 Years' }
  },
  {
    id: 'p9', name: 'Patanjali Ashwagandha Tablets 60s', brand: 'Patanjali', price: 149, mrp: 200, rating: 4.3, reviews: 8923, category: 'herbal',
    image: 'https://images.unsplash.com/photo-1574009583023-ba4bba42ddb8?w=400&h=400&fit=crop&auto=format',
    description: 'Pure Ashwagandha extract tablets prepared by expert Ayurvedic practitioners. Helps reduce stress and anxiety, boosts energy levels, supports immunity, and improves sleep quality naturally.',
    badge: undefined, inStock: true,
    specs: { Quantity: '60 Tablets', Dosage: '1–2 tablets, twice daily', Form: 'Tablet', 'Key Ingredient': 'Ashwagandha Root Extract', Certification: 'FSSAI Certified' }
  },
  {
    id: 'p10', name: 'India Gate Premium Basmati Rice 5kg', brand: 'India Gate', price: 549, mrp: 650, rating: 4.6, reviews: 14523, category: 'food',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop&auto=format',
    description: 'Premium extra-long grain basmati rice sourced from the foothills of the Himalayas. Aged for superior aroma, elongates perfectly on cooking, and delivers an authentic, fluffy texture every time.',
    badge: 'bestseller', inStock: true,
    specs: { Weight: '5kg', 'Grain Type': 'Extra Long', Aged: 'Yes', Origin: 'Dehradun, Uttarakhand', 'Cook Time': '20 minutes' }
  },
  {
    id: 'p11', name: 'Tata Tea Gold 500g', brand: 'Tata Tea', price: 229, mrp: 270, rating: 4.5, reviews: 9234, category: 'food',
    image: 'https://images.unsplash.com/photo-1556909172-8c2f041fca1e?w=400&h=400&fit=crop&auto=format',
    description: 'A refreshing, rich blend of whole leaf Assam tea and fine tea dust that gives you a bold, full-bodied cup every morning. The gold standard of Indian chai — perfectly balanced and aromatic.',
    badge: undefined, inStock: true,
    specs: { Weight: '500g', Type: 'Assam CTC Blend', Form: 'Loose Leaf', Cups: 'Approx. 250 cups', Packaging: 'Resealable Pack' }
  },
  {
    id: 'p12', name: "Levi's 511 Slim Fit Jeans", brand: "Levi's", price: 2299, mrp: 3999, rating: 4.4, reviews: 3241, category: 'garments',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&auto=format',
    description: "The iconic 511 slim fit — sits below the waist, slim through the seat and thigh, tapered to the ankle. Crafted from premium stretch denim for a modern silhouette with all-day comfort.",
    badge: 'sale', inStock: true,
    specs: { Fit: 'Slim', Material: '99% Cotton, 1% Elastane', Wash: 'Dark Indigo', Rise: 'Mid Rise', Closure: 'Zip Fly', Care: 'Machine Wash Cold' }
  },
  {
    id: 'p13', name: "US Polo Assn. Men's Polo T-Shirt", brand: 'US Polo Assn.', price: 699, mrp: 1299, rating: 4.2, reviews: 6123, category: 'garments',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop&auto=format',
    description: "Crafted from soft, breathable 100% cotton piqué fabric with an embroidered USPA logo. Regular fit with a ribbed collar and contrast placket — ideal for casual and smart-casual occasions.",
    badge: 'sale', inStock: true,
    specs: { Material: '100% Cotton Piqué', Fit: 'Regular', Collar: 'Polo', Care: 'Machine Washable', 'Colors Available': '8', Sizes: 'S to 3XL' }
  },
  {
    id: 'p14', name: 'Surf Excel Matic Liquid 1L', brand: 'Surf Excel', price: 299, mrp: 349, rating: 4.5, reviews: 11234, category: 'home-care',
    image: 'https://images.unsplash.com/photo-1585687433141-432a2a8f3ae2?w=400&h=400&fit=crop&auto=format',
    description: 'Specially formulated for front-load automatic washing machines. Surf Excel Matic penetrates deep into fabric fibres and removes even the toughest stains in a single wash — no pre-soaking needed.',
    badge: undefined, inStock: true,
    specs: { Volume: '1 Litre', Type: 'Liquid Detergent', 'Machine Type': 'Front Load', Fragrance: 'Fresh', Washes: 'Approx. 20 washes', Phosphate: 'Phosphate-free' }
  },
  {
    id: 'p15', name: 'Police Matte Black Polarized Sunglasses', brand: 'Police', price: 1299, mrp: 2499, rating: 4.3, reviews: 2341, category: 'lifestyle',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&auto=format',
    description: 'UV400 protected polarized sunglasses with a sleek matte black metal frame. Reduces glare from reflective surfaces for enhanced visual clarity. Comes with a hard case and microfiber cleaning cloth.',
    badge: 'sale', inStock: true,
    specs: { Lens: 'Polarized UV400', Frame: 'Metal', Color: 'Matte Black', Includes: 'Hard case + cleaning cloth', Gender: 'Unisex', 'Frame Width': '140mm' }
  },
  {
    id: 'p16', name: 'Wildcraft Trident 45L Backpack', brand: 'Wildcraft', price: 1799, mrp: 2999, rating: 4.4, reviews: 4521, category: 'lifestyle',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&auto=format',
    description: 'Designed for weekend treks and daily commutes alike. Water-resistant 600D nylon construction with an ergonomic back panel, padded shoulder straps, laptop sleeve (up to 17"), and a detachable rain cover.',
    badge: undefined, inStock: true,
    specs: { Volume: '45 Litres', Material: '600D Nylon', 'Laptop Sleeve': 'Up to 17"', 'Rain Cover': 'Included', Weight: '0.95kg', Colors: 'Navy, Black, Olive' }
  },
  {
    id: 'p19', name: 'HEROINE-EV Electric Scooter (White)', brand: 'HEROINE-EV', price: 89000, mrp: 99000, rating: 4.9, reviews: 89, category: 'ev-scooty',
    image: '/Heroine-EV(White).jpeg',
    description: 'The elegant white edition of the HEROINE-EV. Features a minimalist design, advanced LED headlamp with DRL, anti-theft alarm, reverse mode, and premium Lithium-ion performance.',
    badge: 'new', inStock: true,
    specs: { Range: '100km', 'Battery Type': 'Lithium-ion', Color: 'White', 'Charge Time': '3-4 Hours', Payload: '150 kg', 'Ground Clearance': '180mm', Warranty: '3 Years' }
  },
  {
    id: 'p20', name: 'Complete CBSE Class 10 Study Guide', brand: 'EduPress', price: 1200, mrp: 1500, rating: 4.7, reviews: 342, category: 'educational',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop&auto=format',
    description: 'Comprehensive study materials for Class 10 covering Science, Math, and English. Includes past 10 years solved papers and mind maps.',
    badge: 'bestseller', inStock: true,
    specs: { Subject: 'All', Board: 'CBSE', Format: 'Paperback' }
  },
  {
    id: 'p21', name: 'Premium Office Desk Organizer', brand: 'Kampa', price: 499, mrp: 799, rating: 4.5, reviews: 156, category: 'office-stationery',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&h=400&fit=crop&auto=format',
    description: 'Keep your workspace tidy with this wooden desk organizer featuring multiple compartments for pens, notebooks, and mobile phones.',
    badge: undefined, inStock: true,
    specs: { Material: 'Wood', Dimensions: '20x15x10 cm' }
  },
  {
    id: 'p22', name: '20W Fast Charging Adapter + Cable', brand: 'Kampa Basics', price: 399, mrp: 999, rating: 4.6, reviews: 892, category: 'mobile-accessories',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&h=400&fit=crop&auto=format',
    description: 'Universal 20W fast charging brick with a heavy-duty braided Type-C cable. Protects against over-voltage and overheating.',
    badge: 'sale', inStock: true,
    specs: { Power: '20W', Port: 'USB-C', Cable: '1.5m Braided' }
  },
]

export const deals = products.filter(p => p.badge === 'sale' || getDiscount(p.price, p.mrp) >= 30)

export function getDiscount(price: number, mrp: number): number {
  return Math.round(((mrp - price) / mrp) * 100)
}

export function formatPrice(n: number): string {
  return '₹' + n.toLocaleString('en-IN')
}
