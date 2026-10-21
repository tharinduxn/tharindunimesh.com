export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  role: string;
  stack: string[];
  url: string;
  linkLabel: string;
  visual: "everlife" | "gosurf" | "internly";
  chapters: { title: string; heading: string; body: string }[];
};

export const projects: Project[] = [
  {
    slug: "everlife-weddings",
    number: "01",
    title: "Everlife Weddings",
    category: "Brand experience / Web development",
    tagline: "A digital home for once-in-a-lifetime stories.",
    description:
      "A photography-led website that brings a wedding studio’s work into focus, with a considered path from first impression to enquiry.",
    role: "Web development & interaction",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Resend"],
    url: "https://www.everlifeweddings.com/",
    linkLabel: "Visit live website",
    visual: "everlife",
    chapters: [
      {
        title: "Problem",
        heading: "The photographs need room to speak.",
        body: "A wedding photographer’s website has two jobs: convey the feeling of the work and help a couple take the next step. Dense layouts or a slow mobile experience can get in the way of both.",
      },
      {
        title: "Goal",
        heading: "Let the work lead. Make the next step clear.",
        body: "Build a responsive home for the studio’s photography, services, and enquiries. Keep the browsing experience comfortable on a phone, where a first impression can happen in just a few moments.",
      },
      {
        title: "Process",
        heading: "Connect presentation with practical delivery.",
        body: "The implementation combines Next.js and Tailwind CSS for responsive layouts, Framer Motion for interface transitions, and Resend for automated email delivery. SEO and loading performance were part of the development scope.",
      },
      {
        title: "Solution",
        heading: "A portfolio that opens a conversation.",
        body: "Large photography, a dedicated work collection, service information, and clear booking links create a coherent browsing journey. Automated email handling connects a visitor’s interest to the studio’s enquiry workflow.",
      },
      {
        title: "Outcome",
        heading: "A complete, public-facing studio website.",
        body: "Everlife Weddings has a live, mobile-friendly presence for presenting its portfolio and receiving enquiries. The result is a working website that brings visual presentation and day-to-day business needs together.",
      },
    ],
  },
  {
    slug: "go-surf-sri-lanka",
    number: "02",
    title: "Go Surf Sri Lanka",
    category: "Booking platform / Full-stack development",
    tagline: "Less planning. More time in the water.",
    description:
      "Connecting the discovery of Sri Lanka’s surf spots with a practical booking experience for lessons in Ahangama.",
    role: "Full-stack development",
    stack: ["Next.js", "TypeScript", "Supabase", "PayHere", "Resend"],
    url: "https://gosurfsrilanka.com/",
    linkLabel: "Visit live website",
    visual: "gosurf",
    chapters: [
      {
        title: "Problem",
        heading: "A great experience starts before the beach.",
        body: "For someone planning a surf lesson, choosing a location and arranging a booking are connected decisions. A business needs a clear way to bring discovery, availability, payment, and confirmation into one experience.",
      },
      {
        title: "Goal",
        heading: "Bring the booking journey together.",
        body: "Create a full-stack platform for a coastal business in Ahangama, Sri Lanka. Give visitors a way to explore surf spots and book lessons, while connecting the interface to the services needed behind the scenes.",
      },
      {
        title: "Process",
        heading: "Build around the full transaction.",
        body: "The project uses Next.js and TypeScript for the application, Leaflet for interactive exploration, and Supabase for data storage with Row Level Security. PayHere and Resend support the payment and confirmation parts of the flow.",
      },
      {
        title: "Solution",
        heading: "From discovery to a confirmed plan.",
        body: "An integrated booking platform connects location discovery, lesson selection, payment processing, and automated email confirmations. Responsive layouts make the experience usable while travelling or planning from home.",
      },
      {
        title: "Outcome",
        heading: "A live platform for a local business.",
        body: "The website is deployed on Vercel and connects a customer-facing booking experience to database, payment, and email services. It is an example of delivering a complete workflow beyond the interface alone.",
      },
    ],
  },
  {
    slug: "internly",
    number: "03",
    title: "Internly",
    category: "Mobile product / Flutter development",
    tagline: "A little more direction for the next big step.",
    description:
      "An AI-powered career companion bringing internship discovery, CV creation, and application tracking into one mobile experience.",
    role: "Cross-platform app development",
    stack: ["Flutter", "Dart", "Firebase", "Gemini AI", "Riverpod"],
    url: "https://github.com/tharinduxn/internly",
    linkLabel: "Explore the source",
    visual: "internly",
    chapters: [
      {
        title: "Problem",
        heading: "The first career step has a lot of moving parts.",
        body: "Students searching for internships juggle opportunities, CV preparation, and the status of their applications. Those tasks belong to the same journey, but often live in separate tools.",
      },
      {
        title: "Goal",
        heading: "Give that journey a single home.",
        body: "Create a cross-platform career companion for Android and iOS that helps students discover internships, prepare application materials, and keep track of what comes next.",
      },
      {
        title: "Process",
        heading: "Connect the pieces around the student.",
        body: "The project brings together a Flutter and Dart interface, Riverpod state management, and AI-assisted career features. The project overview supplied for this portfolio lists Firebase and Gemini AI alongside Google OAuth authentication.",
      },
      {
        title: "Solution",
        heading: "Discover. Prepare. Keep moving.",
        body: "Internly combines internship discovery and match scoring with an AI chat assistant, CV creation with PDF export, and application tracking. The focus is a connected mobile workflow rather than a collection of disconnected utilities.",
      },
      {
        title: "Outcome",
        heading: "A product built around an everyday need.",
        body: "The project demonstrates cross-platform product development across discovery, assistance, and organisation. Its source is available on GitHub. The visual shown here is an interface study created for this portfolio; it is not a screenshot of the application.",
      },
    ],
  },
];
