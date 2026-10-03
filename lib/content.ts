export type IconName =
  | "link"
  | "chart"
  | "bolt"
  | "qr"
  | "folder"
  | "code"
  | "check"
  | "plus"
  | "menu"
  | "x"
  | "arrow"
  | "copy";

export const brand = {
  name: "Shortly",
};

export const nav = [
  { href: "#features", label: "Features" },
  { href: "#analytics", label: "Analytics" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export const hero = {
  placeholder: "https://example.com/very/long-url",
  button: "Shorten URL",
  loading: "Shortening...",
  perks: [
    "Custom short links",
    "Click tracking built in",
    "Fast, reliable redirects",
  ],
  titleTop: "Short links that",
  titleBottom: "feel like a product, not a patch.",
  text:
    "Turn long URLs into polished links, understand what drives clicks, and put every campaign in one clean dashboard.",
};

export const heroSamples = [
  { host: "shop.example.com", path: "/collections/limited-run-summer", slug: "/LSM-42" },
  { host: "learn.example.com", path: "/courses/product-design/launch-kit", slug: "/PD-118" },
  { host: "events.example.com", path: "/local/august-creator-summit", slug: "/EVT-93" },
];

export const stats = [
  { label: "Links created", value: 84000, suffix: "+" },
  { label: "Clicks tracked", value: 2.8, decimals: 1, prefix: "~", suffix: "M" },
  { label: "Avg. conversion", value: 12, suffix: "%" },
  { label: "Uptime", text: "99.9%" },
];

export const features = [
  {
    icon: "link" as const,
    title: "Clean URLs for every channel",
    text: "Share short links that look trustworthy in social posts, emails, and marketing campaigns.",
  },
  {
    icon: "chart" as const,
    title: "Live click insights",
    text: "See traffic trends in real time and understand which links are driving the most attention.",
  },
  {
    icon: "bolt" as const,
    title: "Fast redirect performance",
    text: "Every click routes instantly, keeping user experience smooth across every device.",
  },
  {
    icon: "qr" as const,
    title: "QR-ready links",
    text: "Create quick mobile entry points with links that are ready for packaging, posters, and print.",
  },
];

export const analytics: {
  text: string;
  points: string[];
  topLinks: { short: string; dest: string; clicks: number }[];
  ranges: Record<
    string,
    {
      label: string;
      total: number;
      change: string;
      series: number[];
      ticks: string[];
    }
  >;
} = {
  text:
    "Track where traffic comes from and what happens after the click, without extra setup or complex dashboards.",
  points: [
    "See where people click from each link",
    "Compare campaign performance over time",
    "Spot your winning channels in seconds",
  ],
  topLinks: [
    { short: "/launch", dest: "https://example.com/launch/season-2", clicks: 12430 },
    { short: "/shop", dest: "https://example.com/store/great-deals", clicks: 10560 },
    { short: "/invite", dest: "https://example.com/community/get-started", clicks: 9240 },
  ],
  ranges: {
    "7d": {
      label: "7d",
      total: 18240,
      change: "+18%",
      series: [14, 28, 19, 42, 33, 58, 47],
      ticks: ["M", "T", "W", "T", "F", "S", "S"],
    },
    "30d": {
      label: "30d",
      total: 76120,
      change: "+27%",
      series: [18, 26, 24, 41, 38, 52, 63, 58],
      ticks: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"],
    },
    "90d": {
      label: "90d",
      total: 224860,
      change: "+41%",
      series: [12, 20, 29, 17, 36, 42, 51, 63, 58, 72, 78, 85],
      ticks: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
  },
};

export const steps = [
  {
    title: "Paste a long URL",
    text: "Drop in any destination you want to share, whether it is a campaign page or a product listing.",
  },
  {
    title: "Create a short link",
    text: "Generate a branded short URL in one click and keep everything tidy across every channel.",
  },
  {
    title: "Track engagement",
    text: "See which links perform best, how often they are clicked, and where the traffic is coming from.",
  },
  {
    title: "Iterate and scale",
    text: "Adjust campaigns faster, test new formats, and build trust with links your audience remembers.",
  },
];

export const api = {
  title: "Build on top of a cleaner link API.",
  text:
    "Integrate short-link creation, tracking, and redirect logic into your own product or workflow with a simple, predictable API.",
  cta: "Read the docs",
  snippets: [
    {
      label: "curl",
      code: `curl -X POST https://api.shortly.com/v1/links \\
  -H "Authorization: Bearer $SHORTLY_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://example.com/launch/offer",
    "slug": "launch-offer"
  }'`,
    },
    {
      label: "node",
      code: `const response = await fetch("https://api.shortly.com/v1/links", {
  method: "POST",
  headers: {
    Authorization: "Bearer $SHORTLY_KEY",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    url: "https://example.com/launch/offer",
    slug: "launch-offer",
  }),
});`,
    },
    {
      label: "python",
      code: `import requests

response = requests.post(
    "https://api.shortly.com/v1/links",
    headers={"Authorization": "Bearer $SHORTLY_KEY"},
    json={"url": "https://example.com/launch/offer", "slug": "launch-offer"},
)
print(response.json())`,
    },
  ],
};

export const pricing = {
  title: "Pricing that scales with your momentum.",
  text: "Simple plans for early experiments, growing teams, and always-on campaigns.",
  currency: "$",
  plans: [
    {
      name: "Starter",
      monthly: 12,
      yearly: 10,
      text: "A clean starting point for personal projects and early launches.",
      cta: "Start free",
      featured: false,
      features: [
        "Up to 3,000 branded links",
        "Basic click analytics",
        "Custom slugs",
      ],
    },
    {
      name: "Growth",
      monthly: 29,
      yearly: 24,
      text: "Built for teams that need analytics, higher volume, and better reporting.",
      cta: "Choose Growth",
      featured: true,
      features: [
        "Unlimited short links",
        "Advanced click breakdowns",
        "Campaign-level reporting",
        "API access",
      ],
    },
  ],
};

export const faq = [
  {
    q: "Can I use my own domain?",
    a: "Yes. You can map your branded domain to Shortly and keep every redirect consistent with your brand.",
  },
  {
    q: "Do you support QR codes?",
    a: "Every link can be turned into a QR-friendly destination with one click, making offline sharing simple.",
  },
  {
    q: "Is the API production-ready?",
    a: "The API is designed for real workflows, including link generation, tracking, and custom URL creation.",
  },
  {
    q: "Can I share links securely?",
    a: "Yes. Links are protected with secure redirect handling, audience controls, and application-level access patterns.",
  },
];

export const cta = {
  title: "Turn every click into a moment of momentum.",
  text: "Create a cleaner URL experience and keep your traffic measurable from the first click onward.",
  button: "Get started",
};

export const footer = {
  text: "Shortly gives modern teams the speed of short links with the clarity of real performance data.",
  columns: [
    {
      title: "Product",
      links: [
        { label: "Link management", href: "#features" },
        { label: "Analytics", href: "#analytics" },
        { label: "Pricing", href: "#pricing" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Customers", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Docs", href: "#api" },
        { label: "Help center", href: "#faq" },
        { label: "Status", href: "#" },
      ],
    },
  ],
};
