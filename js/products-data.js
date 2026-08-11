/* ==========================================================================
   MegaStore FazleVai — Product Database
   Single source of truth for every product shown on the homepage grid
   and on each dedicated /products/*.html page. Add new products here.
   ========================================================================== */
/* ==========================================
   PRODUCT DATABASE (Updated Data Based on Constraints)
   ========================================== */
const productsData = [
  {
    id: 1, slug: "spotify-premium", name: "Spotify Premium", category: "music", ribbon: "Hot",
    desc: "Ad-free music streaming, unlimited skips, offline downloads.",
    features: ["Personal Email", "Full Warranty", "High Quality Audio"],
    icon: `<svg viewBox="0 0 24 24" fill="#1DB954" class="product-icon-svg"><path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-.1.2-1.38-.42-.18-.6.42-1.2.6-1.38 4.26-1.26 11.28-1.02 15.72 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.439.3z"/></svg>`,
    accountTypes: [
      { name: "US Region", plans: [{ duration: "3 Month", price: 299, originalPrice: 900 }, { duration: "6 Month", price: 549, originalPrice: 1600 }, { duration: "12 Month", price: 899, originalPrice: 3200 }] },
      { name: "BD Region", plans: [{ duration: "3 Month", price: 299, originalPrice: 900 }, { duration: "6 Month", price: 549, originalPrice: 1600 }, { duration: "12 Month", price: 899, originalPrice: 3200 }] }
    ]
  },
  {
    id: 2, slug: "netflix-premium", name: "Netflix Premium", category: "streaming", ribbon: "Top Seller",
    desc: "4K Ultra HD + HDR stream, works on TV, Laptop, & Mobile.",
    features: ["Shared Profile", "Full Warranty", "4K Ultra HD"],
    icon: `<svg viewBox="0 0 24 24" fill="#E50914" class="product-icon-svg"><path d="M5.398 0v24l4.582-1.583v-8.62L14.6 24h4.002V0h-4.586v8.63L9.4 0H5.398z"/></svg>`,
    accountTypes: [
      { name: "5 Profile", plans: [{ duration: "37 Days", price: 899, originalPrice: 1299 }] }
    ]
  },
  {
    id: 3, slug: "amazon-prime-video", name: "Amazon Prime Video", category: "streaming", ribbon: "Popular",
    desc: "Access thousands of Prime exclusive movies, web series, and anime.",
    features: ["Private Account", "Full Warranty", "Instant Delivery"],
    icon: `<img src="https://i.postimg.cc/8PshH9vS/images.jpg" alt="Amazon Prime Video" class="product-icon-img">`,
    accountTypes: [
      { name: "BD Region", plans: [{ duration: "1 Month", price: 150, originalPrice: 300 }, { duration: "3 Month", price: null, soldOut: true }, { duration: "6 Month", price: 280, originalPrice: 600 }, { duration: "12 Month", price: 599, originalPrice: 1200 }] }
    ]
  },
  {
    id: 4, slug: "gemini-ai", name: "Gemini AI", category: "ai", ribbon: "New",
    desc: "Advanced AI by Google, integrated tools for writing, planning, learning and more.",
    features: ["Personal Account", "Instant Access"],
    icon: `<img src="https://i.ibb.co.com/j9w6TRvt/images.jpg" alt="Gemini AI" class="product-icon-img" style="border-radius: 8px;">`,
    accountTypes: [
      { name: "Personal", plans: [{ duration: "1 Year", price: 1250, originalPrice: 6000 }] }
    ]
  },
  {
    id: 5, slug: "apple-music", name: "Apple Music", category: "music", ribbon: "Premium",
    desc: "Millions of songs ad-free. Lossless audio and spatial audio support.",
    features: ["Personal Profile", "High Quality"],
    icon: `<img src="https://i.ibb.co.com/ynLPTHZq/images.png" alt="Apple Music" class="product-icon-img" style="border-radius: 8px;">`,
    accountTypes: [
      { name: "Personal", plans: [{ duration: "1 Month", price: 299, originalPrice: 500 }, { duration: "1 Year", price: 3599, originalPrice: 4500 }] }
    ]
  },
  {
    id: 6, slug: "google-one", name: "Google One", category: "office", ribbon: "Storage",
    desc: "Expanded cloud storage for Google Drive, Gmail, & Google Photos.",
    features: ["Personal Email", "Secure Storage"],
    icon: `<img src="https://i.ibb.co.com/DHB5YP4f/images.png" alt="Google One" class="product-icon-img" style="border-radius: 8px;">`,
    accountTypes: [
      { name: "Personal", plans: [{ duration: "1 Year", price: 800, originalPrice: 500 }] }
    ]
  },
  {
    id: 7, slug: "youtube-premium", name: "YouTube Premium", category: "music", ribbon: "Popular",
    desc: "Ad-free YouTube, background playback, and YouTube Music included.",
    features: ["Personal Email", "Full Warranty", "No Ads"],
    icon: `<svg viewBox="0 0 24 24" fill="#FF0000" class="product-icon-svg"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    accountTypes: [
      { name: "Bangladesh", plans: [{ duration: "1 Month", price: 149, originalPrice: 300 }] },
      { name: "International", plans: [{ duration: "1 Month", price: 250, originalPrice: 500 }] },
      { name: "Gift Card", plans: [{ duration: "3 Month", price: 1300, originalPrice: 2500 }] }
    ]
  },
  {
    id: 8, slug: "linkedin-premium", name: "LinkedIn Premium", category: "office", ribbon: "Career Boost",
    desc: "Stand out to recruiters, InMail credits, and LinkedIn Learning.",
    features: ["Personal Profile Upgrade", "Full Warranty", "Instant Delivery"],
    icon: `<svg viewBox="0 0 24 24" fill="#0A66C2" class="product-icon-svg"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>`,
    accountTypes: [
      { name: "Carrier", plans: [{ duration: "12 Month", price: 4500, originalPrice: 8500 }] },
      { name: "Business", plans: [{ duration: "12 Month", price: 11999, originalPrice: 24000 }] },
      { name: "Gift Card", plans: [{ duration: "12 Month", price: 10500, originalPrice: 21000 }] }
    ]
  },
  {
    id: 9, slug: "chatgpt-go", name: "ChatGPT Go Plan", category: "ai", ribbon: "AI Power",
    desc: "Fast response speeds, priority access to GPT intelligence, custom GPTs.",
    features: ["Personal Email", "Full Warranty", "Priority Access"],
    icon: `<svg viewBox="0 0 24 24" fill="#10A37F" class="product-icon-svg"><path d="M22.281 9.821a5.984 5.984 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.984 5.984 0 0 0-3.99 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.748-7.073z"/></svg>`,
    accountTypes: [{ name: "Personal", plans: [{ duration: "3 Months", price: 399, originalPrice: 899 }] }]
  },
  {
    id: 10, slug: "adobe-creative-cloud", name: "Adobe Creative Cloud", category: "office", ribbon: "Pro Choice",
    desc: "Access 20+ desktop & mobile apps including Photoshop, Illustrator, Premiere Pro & Firefly AI.",
    features: ["Personal Email", "Full Warranty", "Instant Delivery"],
    icon: `<svg viewBox="0 0 24 24" fill="#FF0000" class="product-icon-svg"><path d="M13.966 22h3.003L24 2H18.27zm-3.932 0h2.97L7.037 2H1.306zm3.303-10.23L9.67 3.328 3.666 18.006h3.425l1.32-3.411h4.088z"/></svg>`,
    accountTypes: [
      { name: "Personal", plans: [{ duration: "3 Month", price: 2999, originalPrice: 15000 }, { duration: "1 Year", price: 7500, originalPrice: 15000 }] }
    ]
  },
  {
    id: 11, slug: "neon-nz", name: "Neon NZ Subscription", category: "streaming", ribbon: "New",
    desc: "Exclusive New Zealand premium streaming platform featuring blockbuster movies & series.",
    features: ["Full HD Playback", "Full Warranty", "Multi-Device"],
    icon: `<img src="https://i.postimg.cc/HLtcH9M2/images.jpg" alt="Neon NZ" class="product-icon-img">`,
    accountTypes: [{ name: "Personal", plans: [{ duration: "1 Month", price: 399, originalPrice: 750 }] }]
  },
  {
    id: 12, slug: "capcut-pro", name: "CapCut Pro", category: "office",
    desc: "Unlock premium video effects, auto-captions, 4K export.",
    features: ["Private Profile", "No Watermark"],
    icon: `<img src="https://i.postimg.cc/k5PK75hH/images.jpg" alt="CapCut Pro" class="product-icon-img">`,
    accountTypes: [{ name: "Personal", plans: [{ duration: "1 Month", price: 599, originalPrice: 999 }] }]
  },
  {
    id: 13, slug: "canva-pro", name: "Canva Pro", category: "office",
    desc: "Unlock 100M+ premium templates, brand kit, background remover.",
    features: ["Personal Email Invite", "100+ Million Assets"],
    icon: `<img src="https://i.postimg.cc/kGHRzMSP/images.jpg" alt="Canva Pro" class="product-icon-img">`,
    accountTypes: [{ name: "Personal", plans: [{ duration: "1 Year", price: 3999, originalPrice: 6500 }] }]
  },
  {
    id: 14, slug: "chatgpt-plus", name: "ChatGPT Plus", category: "ai",
    desc: "Advanced AI capabilities, priority access, custom GPTs.",
    features: ["Personal Email", "Full Warranty", "GPT-4 Access"],
    icon: `<img src="https://i.postimg.cc/L8Kn1b3d/images.jpg" alt="ChatGPT Plus" class="product-icon-img" style="border-radius: 50%;">`,
    accountTypes: [
      { name: "Personal", plans: [{ duration: "1 Month", price: 1499, originalPrice: 2500 }] }
    ]
  },
  {
    id: 15, slug: "nordvpn", name: "Nord VPN", category: "vpn", ribbon: "New",
    desc: "Stay secure and access restricted content globally with top VPN service.",
    features: ["Fast Servers", "No Logs Policy", "Instant Delivery"],
    icon: `<img src="https://i.ibb.co.com/RTrXPY6t/images.jpg" alt="Nord VPN" class="product-icon-img" style="border-radius: 8px;">`,
    accountTypes: [
      { name: "Shared", plans: [{ duration: "1 Month", price: 150, originalPrice: 200 }] },
      { name: "Personal", plans: [{ duration: "1 Month", price: 299, originalPrice: 600 }, { duration: "12 Month", price: 3000, originalPrice: 6000 }] }
    ]
  },
  {
    id: 16, slug: "expressvpn", name: "Express VPN", category: "vpn", ribbon: "Premium",
    desc: "Lightning fast servers worldwide. Keep your connection secure.",
    features: ["Ultra Fast", "Full Warranty", "Instant Delivery"],
    icon: `<img src="https://i.ibb.co.com/mrQKFZGG/images.jpg" alt="Express VPN" class="product-icon-img" style="border-radius: 8px;">`,
    accountTypes: [
      { name: "Personal", plans: [{ duration: "1 Month", price: 299, originalPrice: 600 }, { duration: "12 Month", price: 3100, originalPrice: 6200 }] }
    ]
  },
  {
    id: 17, slug: "crave", name: "Crave Subscription", category: "streaming", ribbon: "Exclusive",
    desc: "Stream HBO, Max Originals, Showtime, and hit movies on-demand with ultra-HD quality.",
    features: ["High Quality Stream", "Full Warranty", "Private Profile"],
    icon: `<img src="https://i.postimg.cc/wTSskvHT/images.jpg" alt="Crave" class="product-icon-img">`,
    accountTypes: [{ name: "Personal", plans: [{ duration: "1 Month", price: 399, originalPrice: 799 }] }]
  },
  {
    id: 18, slug: "tidal-music", name: "Tidal Music", category: "music", ribbon: "Hi-Fi",
    desc: "High-fidelity music streaming for audiophiles with millions of tracks.",
    features: ["Lossless Audio", "Full Warranty", "Personal Profile"],
    icon: `<img src="https://i.ibb.co.com/QLx8tWm/images.jpg" alt="Tidal Music" class="product-icon-img" style="border-radius: 8px;">`,
    accountTypes: [{ name: "Personal", plans: [{ duration: "1 Year", price: 1499, originalPrice: 3500 }] }]
  },
  {
    id: 19, slug: "hbo-max", name: "HBO Max", category: "streaming", ribbon: "Hot",
    desc: "Stream all of HBO, blockbuster movies, and exclusive Max Originals.",
    features: ["4K Ultra HD", "Private Profile", "Full Warranty"],
    icon: `<img src="https://i.ibb.co.com/kTYzbXK/images.png" alt="HBO Max" class="product-icon-img" style="border-radius: 8px;">`,
    accountTypes: [{ name: "Personal", plans: [{ duration: "1 Month", price: 249, originalPrice: 2500 }] }]
  },
  {
    id: 20, slug: "crunchyroll", name: "Crunchyroll", category: "streaming", ribbon: "Anime",
    desc: "The ultimate anime destination. Stream ad-free episodes right after Japan.",
    features: ["Mega Fan Plan", "Ad-Free", "Offline Viewing"],
    icon: `<img src="https://i.ibb.co.com/TM5xbDrm/images.png" alt="Crunchyroll" class="product-icon-img" style="border-radius: 8px;">`,
    accountTypes: [
      { name: "Personal", plans: [{ duration: "1 Month", price: 250, originalPrice: 500 }, { duration: "1 Year", price: 1200, originalPrice: 4500 }] }
    ]
  }
];
