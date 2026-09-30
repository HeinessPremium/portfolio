// Edit this file only. Leave `image` empty ("") to use a generated placeholder screen.
// The first project is the centre phone; the rest orbit it.
export const projects = [
  {
    title: 'AIShift',
    description: 'I designed and built AIShift, a SaaS that turns a short business questionnaire into a personalised AI strategy report for business owners.',
    role: 'Designer & Developer (solo build)',
    image: '/projects/aishift.jpg', accent: '#3b4cff',
    technologies: ['JavaScript', 'Paystack', 'AI Generation', 'Vercel'],
    highlights: [
      'Built the landing page, free AI Opportunity Score quiz, accounts and report flow',
      'Integrated Paystack for one-time ₦2,000 payments (cards, transfer, USSD)',
      'Generates reports with use cases, a hiring guide, DIY tasks and 20+ prompts',
    ],
    year: '2026', url: 'https://aishift-ashy.vercel.app/',
  },
  {
    title: 'Heinesscloset',
    description: 'I built the online store for Heinesscloset, a Nigerian fashion brand selling silk scarves and detachable collars, with product browsing and ordering.',
    role: 'Designer & Developer (solo build)',
    image: '/projects/heinesscloset.jpg', accent: '#b5179e',
    technologies: ['HTML & CSS', 'Vanilla JavaScript', 'Netlify Forms', 'WhatsApp Ordering', 'JSON-LD SEO', 'Google Analytics 4'],
    highlights: [
      'Built a dark, brand-led storefront with product cards and Naira pricing',
      'Added "Place an order" and live WhatsApp chat so customers can buy in a tap',
      'Live on its own .com.ng domain with SEO schema, social previews and analytics',
    ],
    year: '2026', url: 'https://heinesscloset.com.ng',
  },
  {
    title: 'FitTrack',
    description: 'I built FitTrack, a live two-sided platform: coaches sign up, publish their available hours and pay to list, while trainees register, book a coach, pay, and their session goes live.',
    role: 'Designer & Developer (solo build)',
    image: '/projects/fittrack.jpg', accent: '#1f7a5c',
    technologies: ['Vanilla JavaScript (ES Modules)', 'HTML & CSS', 'Supabase Auth', 'Supabase (PostgreSQL)', 'Scheduling & Booking', 'Paystack Payments', 'Netlify'],
    highlights: [
      'Coach onboarding: sign-up, availability hours and payment',
      'Trainee onboarding: register, browse coaches, book a slot and pay',
      'Session goes live once payment is confirmed, plus workout logging',
    ],
    year: '2026', url: 'https://fit2track.netlify.app/',
  },
  {
    title: 'Heiness Foods',
    description: 'I built Heiness Foods, a food-delivery app: users tap a dish to add it to their cart, totals are calculated automatically, then they pay with an OPay demo integration and check out.',
    role: 'Designer & Developer (solo build)',
    image: '/projects/heiness-foods.jpg', accent: '#f97316',
    technologies: ['Next.js', 'React', 'Cart State Management', 'OPay (demo integration)', 'Order Tracking', 'Optimised Images', 'Vercel'],
    highlights: [
      'Tap-to-add menu with a live cart and automatic price totals',
      'Checkout with delivery details and an OPay demo payment flow',
      'Order-tracking steps; payments are simulated, no real charges',
    ],
    year: '2026', url: 'https://heiness-foods.vercel.app/',
  },
  {
    title: 'HeinessPremium SalesBot',
    description: "I built the smart AI SalesBot live on the HeinessPremium website. It uses RAG to pull information from the live site and answers visitors' questions based on what is actually published there.",
    role: 'Designer & Developer (solo build)',
    image: '/projects/heinesspremium.jpg', accent: '#c9a93f',
    technologies: ['Groq API', 'RAG', 'Website Content Retrieval', 'Vanilla JavaScript', 'HTML & CSS', 'Netlify'],
    highlights: [
      'RAG pipeline retrieves content from the live site, so answers match what is published',
      'Powered by the Groq API for fast, natural replies',
      'Quick-reply chips guide visitors, and the bot connects them with the team',
    ],
    year: '2026', url: 'https://heinesspremium.netlify.app/',
  },
]
