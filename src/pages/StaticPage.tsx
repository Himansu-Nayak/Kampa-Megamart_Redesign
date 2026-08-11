import { useApp } from '@/context/AppContext'

const contentMap: Record<string, { title: string, content: React.ReactNode }> = {
  'about-us': {
    title: 'About Us',
    content: (
      <div className="space-y-4 text-slate-600 leading-relaxed">
        <p>Welcome to <strong>Kampa Megamart</strong>, India's most trusted online hypermarket. Founded in 2025, our mission is to deliver everything you need—from electronics and home care to fashion and health products—right to your doorstep.</p>
        <p>We believe in quality, affordability, and exceptional customer service. Every product on our platform is sourced directly from authorized distributors to ensure 100% authenticity.</p>
        <p>Thank you for choosing Kampa Megamart. We look forward to serving you!</p>
      </div>
    )
  },
  'careers': {
    title: 'Careers',
    content: (
      <div className="space-y-4 text-slate-600 leading-relaxed">
        <p>Join the Kampa Megamart team and help us build the future of e-commerce in India.</p>
        <p>We are currently looking for passionate individuals in Engineering, Marketing, Supply Chain, and Customer Support. If you thrive in a fast-paced environment and want to make an impact, we want to hear from you!</p>
        <p className="font-semibold text-teal-700">Please send your resume to careers@kampamegamart.com</p>
      </div>
    )
  },
  'press-media': {
    title: 'Press & Media',
    content: (
      <div className="space-y-4 text-slate-600 leading-relaxed">
        <p>For all media inquiries, interview requests, and press materials, please contact our PR team.</p>
        <p className="font-semibold text-teal-700">Email: press@kampamegamart.com</p>
        <p>Download our official brand assets, logos, and executive bios from our Media Kit (Available soon).</p>
      </div>
    )
  },
  'investor-relations': {
    title: 'Investor Relations',
    content: (
      <div className="space-y-4 text-slate-600 leading-relaxed">
        <p>Kampa Megamart is a privately held company focused on long-term growth and sustainable business practices.</p>
        <p>For investor inquiries, quarterly reports, and financial disclosures, please reach out to our investor relations department.</p>
        <p className="font-semibold text-teal-700">Email: investors@kampamegamart.com</p>
      </div>
    )
  },
  'sustainability': {
    title: 'Sustainability',
    content: (
      <div className="space-y-4 text-slate-600 leading-relaxed">
        <p>At Kampa Megamart, we are committed to reducing our environmental footprint. We use eco-friendly packaging for 80% of our deliveries and are working towards a 100% electric delivery fleet by 2030.</p>
        <p>Our commitment to sustainability extends to our supply chain, where we prioritize ethical sourcing and fair trade practices.</p>
      </div>
    )
  },
  'track-order': {
    title: 'Track My Order',
    content: (
      <div className="space-y-4 text-slate-600 leading-relaxed max-w-md">
        <p>Enter your tracking ID or Order ID below to see the real-time status of your delivery.</p>
        <input type="text" placeholder="e.g. KMM12345678" className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-teal-500" />
        <button className="w-full bg-teal-700 text-white font-bold py-3 rounded-lg hover:bg-teal-800 transition-colors">Track Package</button>
      </div>
    )
  },
  'return-refund': {
    title: 'Return & Refund',
    content: (
      <div className="space-y-4 text-slate-600 leading-relaxed">
        <p>We offer a 7-day hassle-free return and refund policy on most items.</p>
        <p>To initiate a return, go to your Account &gt; Orders, select the item, and click "Return". The refund will be processed to your original payment method within 5-7 business days after the item is picked up.</p>
      </div>
    )
  },
  'cancel-order': {
    title: 'Cancel an Order',
    content: (
      <div className="space-y-4 text-slate-600 leading-relaxed">
        <p>You can cancel your order anytime before it is dispatched from our warehouse.</p>
        <p>To cancel, navigate to your Account &gt; Orders, select the order you wish to cancel, and click "Cancel Order". If the order has already been shipped, you can refuse the delivery at the doorstep.</p>
      </div>
    )
  },
  'faqs': {
    title: 'FAQs',
    content: (
      <div className="space-y-6 text-slate-600 leading-relaxed">
        <div>
          <h3 className="font-bold text-slate-800 mb-2">How long does delivery take?</h3>
          <p>Most orders are delivered within 1-3 business days depending on your location.</p>
        </div>
        <div>
          <h3 className="font-bold text-slate-800 mb-2">Do you offer Cash on Delivery (COD)?</h3>
          <p>Yes, COD is available for orders under ₹10,000. A nominal fee of ₹29 applies to all COD orders.</p>
        </div>
        <div>
          <h3 className="font-bold text-slate-800 mb-2">Are your products genuine?</h3>
          <p>Absolutely. We source 100% of our inventory directly from brands or their authorized distributors.</p>
        </div>
      </div>
    )
  },
  'report-problem': {
    title: 'Report a Problem',
    content: (
      <div className="space-y-4 text-slate-600 leading-relaxed max-w-md">
        <p>We apologize for any inconvenience. Please let us know what went wrong.</p>
        <select className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-teal-500 bg-white">
          <option>Issue with a recent order</option>
          <option>App / Website bug</option>
          <option>Payment failure</option>
          <option>Other</option>
        </select>
        <textarea rows={4} placeholder="Describe the issue in detail..." className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-teal-500"></textarea>
        <button className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-black transition-colors">Submit Report</button>
      </div>
    )
  },
  'privacy-policy': {
    title: 'Privacy Policy',
    content: (
      <div className="space-y-4 text-slate-600 leading-relaxed">
        <p>Your privacy is important to us. This policy outlines how we collect, use, and protect your personal data.</p>
        <p><strong>1. Data Collection:</strong> We collect information you provide during checkout and account creation (name, address, email, phone).</p>
        <p><strong>2. Data Usage:</strong> Your data is used strictly for order fulfillment, customer support, and personalized recommendations.</p>
        <p><strong>3. Data Protection:</strong> We use industry-standard 256-bit SSL encryption to secure your transactions and personal data. We do not sell your data to third parties.</p>
      </div>
    )
  },
  'terms-conditions': {
    title: 'Terms & Conditions',
    content: (
      <div className="space-y-4 text-slate-600 leading-relaxed">
        <p>By using Kampa Megamart, you agree to these Terms & Conditions.</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>You must be at least 18 years old to make a purchase.</li>
          <li>All prices are subject to change without notice.</li>
          <li>We reserve the right to cancel any order due to pricing errors or inventory issues.</li>
          <li>User accounts may be suspended for fraudulent activities.</li>
        </ul>
      </div>
    )
  },
  'shipping-policy': {
    title: 'Shipping Policy',
    content: (
      <div className="space-y-4 text-slate-600 leading-relaxed">
        <p>We ship to over 15,000 PIN codes across India.</p>
        <p><strong>Standard Shipping:</strong> Free on orders over ₹499. For orders below ₹499, a flat fee of ₹49 applies.</p>
        <p><strong>Delivery Timelines:</strong> Metro cities (1-2 days), Tier 2/3 cities (3-5 days), Remote locations (5-7 days).</p>
      </div>
    )
  },
  'return-policy': {
    title: 'Return Policy',
    content: (
      <div className="space-y-4 text-slate-600 leading-relaxed">
        <p>Items can be returned within 7 days of delivery if they are unused, in their original packaging, and have all tags attached.</p>
        <p><strong>Non-returnable items:</strong> Personal hygiene products, opened electronics software, and perishable goods.</p>
        <p>In case of a defective product, a replacement will be provided free of charge.</p>
      </div>
    )
  },
  'cookie-policy': {
    title: 'Cookie Policy',
    content: (
      <div className="space-y-4 text-slate-600 leading-relaxed">
        <p>We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic.</p>
        <p>By clicking "Accept All", you consent to our use of cookies. You can manage your cookie preferences in your browser settings.</p>
      </div>
    )
  }
}

export default function StaticPage() {
  const { staticPageId, navigate } = useApp()

  const data = contentMap[staticPageId || ''] || {
    title: 'Page Not Found',
    content: <p>The page you are looking for does not exist.</p>
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16 min-h-[60vh]">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8">
        <button onClick={() => navigate('home')} className="hover:text-teal-700">Home</button>
        <span>›</span>
        <span className="text-slate-800 font-medium">{data.title}</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
        {data.title}
      </h1>
      
      <div className="bg-white rounded-2xl p-6 md:p-10 border border-slate-100 shadow-sm">
        {data.content}
      </div>
    </div>
  )
}
