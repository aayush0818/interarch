import { realImages, realPool } from "@/data/realImages";

// Real project imagery used for sector pages
import emerald1 from "@/assets/emerald-024-2.jpeg.asset.json";
import emerald2 from "@/assets/emerald-014.jpeg.asset.json";
import onyx1 from "@/assets/onyx-008.jpeg.asset.json";
import onyx2 from "@/assets/onyx-021.jpeg.asset.json";
import saffron1 from "@/assets/saffron-84.jpeg.asset.json";
import saffron2 from "@/assets/saffron-59.jpeg.asset.json";
import serene1 from "@/assets/serene-pab3226-hdr.jpg.asset.json";
import serene2 from "@/assets/serene-pab2833-hdr.jpg.asset.json";
import noir1 from "@/assets/noir-residence-66.jpeg.asset.json";
import noir2 from "@/assets/noir-residence-2.jpeg.asset.json";

import solitaa1 from "@/assets/solitaa-8818.jpg.asset.json";
import solitaa2 from "@/assets/solitaa-8828.jpg.asset.json";
import gcb1 from "@/assets/gold-cornet-boutique-7957.jpg.asset.json";
import gcb2 from "@/assets/gold-cornet-boutique-7959.jpg.asset.json";
import biguine1 from "@/assets/biguine-3-3.jpg.asset.json";
import jadepink1 from "@/assets/jadepink-3386.jpg.asset.json";
import monster1 from "@/assets/monster-001.jpg.asset.json";
import palak1 from "@/assets/palak-jewellers-1.jpg.asset.json";
import ratanshi1 from "@/assets/ratanshi-2-2.jpg.asset.json";

import merilAcad1 from "@/assets/meril-academy-vapi-1.jpg.asset.json";
import merilAcad2 from "@/assets/meril-academy-vapi-2.jpg.asset.json";
import merilAcad3 from "@/assets/meril-academy-vapi-5.jpg.asset.json";
import dcp1 from "@/assets/d-cp-office-belapur-1.jpg.asset.json";
import dcp2 from "@/assets/d-cp-office-belapur-2.jpg.asset.json";
import apj1 from "@/assets/apj-auditorium-1.jpg.asset.json";
import apj2 from "@/assets/apj-auditorium-3.jpg.asset.json";

import energize1 from "@/assets/energize-resort-nashik-2.jpg.asset.json";
import energize2 from "@/assets/energize-resort-nashik-4.jpg.asset.json";
import energize3 from "@/assets/energize-resort-nashik-6.jpg.asset.json";
import divya1 from "@/assets/divya-enclave-1.jpg.asset.json";
import divya2 from "@/assets/divya-enclave-3.jpeg.asset.json";
import avm1 from "@/assets/adarsh-vidya-mandir-rajasthan-1.jpg.asset.json";
import meril1 from "@/assets/meril-1.jpg.asset.json";
import meril2 from "@/assets/meril-3.jpg.asset.json";

import mb56_1 from "@/assets/meril-bld-5-6-1.png.asset.json";
import mb56_2 from "@/assets/meril-bld-5-6-2.png.asset.json";
import pidilite1 from "@/assets/pidilite-rd-taloja-1.jpg.asset.json";
import pidilite2 from "@/assets/pidilite-rd-taloja-2.jpg.asset.json";
import pidilite3 from "@/assets/pidilite-rd-taloja-3.jpg.asset.json";
import pidilite4 from "@/assets/pidilite-rd-taloja-4.jpg.asset.json";

const { institutional: inst, residential: res, commercial: com, team } = realImages;

const studioHero = inst.aerial;
const teamHero = res.exterior;
const studioCulture = res.stair;

// File names of portraits don't match the actual face in each file.
// Map each director name to the file that actually contains their photo.
const partner1 = team.dipak;     // Dipak — correct
const partner2 = team.hussain;   // Murtaza's face lives in the "hussain" file
const partner3 = team.rohit;     // Hussain's face lives in the "rohit" file
const partner4 = team.murtaza;   // Rohit's face lives in the "murtaza" file

export const pageImages = {
  studioHero,
  teamHero,
  studioCulture,
  works: realPool,
};


/* =================================================================
   ABOUT / STUDIO
   ================================================================= */
export const aboutCopy = {
  eyebrow: "— About",
  headline: "A multidisciplinary practice, shaped by four decades of intent.",
  intro:
    "Interarch Design Labs is a multidisciplinary architecture and interior design practice shaped by over four decades of experience in the built environment. Formed through the coming together of Interarch and Kala Design Studio, the practice brings together decades of experience across architecture, interiors, planning, and design strategy.",
  body:
    "We believe meaningful design emerges from understanding. Understanding people, understanding context, and understanding the purpose a space is meant to serve. Our process is thoughtful and deliberate. Ideas are questioned, refined, and challenged until they arrive at their clearest expression. Every line, material, and detail is considered through the lens of longevity, functionality, and human experience.",
  signoff:
    "Because great design is not measured by how it appears on day one, but by how it continues to perform, inspire, and endure over time.",
  legacy:
    "Whether designing a private residence, a workplace, a hospitality destination, or an institutional campus, our goal remains the same: to create spaces that feel relevant today and remain valuable for years to come.",
};

export const mission = {
  eyebrow: "— Mission",
  text:
    "To deliver architecture and interior design solutions that balance creativity, functionality, technical excellence, and long-term value. We work closely with clients, consultants, and stakeholders to transform ideas into spaces that are thoughtfully designed, efficiently executed, and built to perform beyond expectations.",
};

export const vision = {
  eyebrow: "— Vision",
  text:
    "To be a practice that shapes the built environment through design that remains relevant, responsible, and valuable for generations. We envision a future where architecture and interiors are judged not only by how they look, but by how effectively they serve people, communities, businesses, and the changing needs of society.",
};

export const values = [
  { n: "01", title: "Understanding Before Designing", body: "Every project begins with listening, learning, and understanding the people, context, and purpose behind it." },
  { n: "02", title: "Purpose In Every Decision", body: "From concept to execution, every detail is intentional and contributes to a larger vision." },
  { n: "03", title: "Built To Endure", body: "We create spaces that remain relevant, functional, and valuable long after they are completed." },
];

export const idlStudioNarrative = {
  eyebrow: "— Life at IDL",
  headline: "A studio defined by the people who create it.",
  body: [
    "At IDL, we have built a culture that values curiosity, collaboration, and continuous learning. Our studio brings together architects, interior designers, thinkers, makers, and problem-solvers who share a common passion for creating meaningful design.",
    "We believe the best ideas emerge through dialogue. Every project becomes an opportunity to challenge assumptions, explore possibilities, and push creative boundaries while remaining grounded in practical realities.",
  ],
};

export const rangeOfExperience = {
  eyebrow: "— Range of Experience",
  intro:
    "IDL's portfolio spans large-scale developments to boutique interiors — unified by cultural sensitivity, material intelligence, and responsible design.",
  partners: [
    { y: "40+", note: "years of architectural experience — Ar. Dipak Thaker" },
    { y: "30+", note: "years of interior expertise — Ar. Murtuza Rangwala" },
    { y: "—", note: "Contemporary, detail-led design sensibilities — Ar. Hussain Rangwala & Ar. Rohit Gojia" },
  ],
  fields: [
    "Residential villas, retreats, and apartments",
    "Hospitality and leisure environments",
    "Corporate workplaces and retail",
    "Institutional and public spaces",
    "Master planning and integrated developments",
  ],
};

export const recognitionList = [
  { year: "2001", award: "A+D Spectrum Architecture Awards", note: "Excellence in Architecture." },
  { year: "2008", award: "Association of Real Estate Agents Award", note: "Architectural contribution." },
  { year: "2010", award: "Chief Minister of Maharashtra Award", note: "Babasaheb Ambedkar Bhavan." },
  { year: "2014–15", award: "AICA Asia Fest", note: "Commendation for architectural design." },
  { year: "2015", award: "Rachana Sansad Diamond Jubilee Felicitation", note: "Recognition for service to architecture." },
  { year: "25 yrs", award: "Service to DRDO, Ministry of Defence", note: "A testament to trust and long-standing partnerships." },
  { year: "—", award: "IGBC Gold Certification", note: "For pioneering sustainable development." },
];

export const cultureBlocks = [
  {
    eyebrow: "— Design Process",
    title: "Collaborative, transparent, detail-driven.",
    body:
      "From research and concept development to execution and delivery, every stage is approached with equal attention and rigor. We believe thoughtful outcomes are achieved through careful listening, strategic thinking, and disciplined execution.",
  },
  {
    eyebrow: "— Design Mentorship",
    title: "Knowledge is our most valuable resource.",
    body:
      "Through active mentorship and hands-on learning, young designers work alongside experienced professionals, gaining exposure to real projects, real challenges, and meaningful opportunities for growth.",
  },
  {
    eyebrow: "— Internships",
    title: "More than a learning experience.",
    body:
      "Internships at IDL are an opportunity to become part of a design culture that values curiosity, initiative, and experimentation. Interns are encouraged to contribute, ask questions, and participate in the creative process from day one.",
  },
  {
    eyebrow: "— Careers at IDL",
    title: "A team that believes in collective growth.",
    body:
      "Working at IDL means being part of a team where ideas are welcomed, contributions are valued, and learning never stops. We celebrate creativity, encourage ownership, and strive to create an environment where talented individuals can do their best work — because great spaces are created by great teams.",
  },
];

/* =================================================================
   TEAM
   ================================================================= */
export const teamCopy = {
  eyebrow: "— Our Team",
  headline: "Heritage and reinvention. Independent voices, one vision.",
  intro:
    "Interarch Design Labs is led by four partners whose individual expertise forms a unified approach to architecture and interiors. Their perspectives, spanning decades of practice, shape the studio's commitment to clarity, context, and purposeful design.",
  collective:
    "They are supported by a multidisciplinary team of architects, interior designers, visualisers, project managers, and delivery specialists. Together, the studio brings technical depth, material sensitivity, and thoughtful execution to every project.",
};

export const partners = [
  {
    name: "Dipak Thaker",
    role: "Director · IDL",
    image: partner1,
    years: "40+ years",
    line: "Structure, process, and buildability held together with long-view precision.",
    bio:
      "Dipak Thaker brings over four decades of experience in architecture and interior design, having led projects across residential, commercial, institutional, and industrial sectors. His work is defined by strong planning logic, technical depth, and execution precision, particularly on large-scale and complex developments. Dipak has been instrumental in shaping projects from concept to completion, ensuring design intent is carried through every stage of construction. At IDL, he anchors the practice with structure, process, and a deep understanding of buildability.",
  },
  {
    name: "Murtaza Rangwala",
    role: "Director · IDL",
    image: partner2,
    years: "30+ years",
    line: "Calm leadership, operational rigour, and dependable delivery across every stage.",
    bio:
      "Murtaza Rangwala has spent decades building a practice rooted in consistency, discipline, and long-term client trust. His experience spans a wide range of architectural and interior projects, where he has played a critical role in project coordination, detailing, and on-site execution. Known for his calm leadership and hands-on involvement, Murtaza ensures that every project is delivered with clarity and control. At IDL, he strengthens the firm's foundation through operational rigour and dependable project delivery.",
  },
  {
    name: "Hussain Rangwala",
    role: "Director · IDL",
    image: partner3,
    years: "Contemporary practice",
    line: "A modern design voice shaped by proportion, context, and spatial clarity.",
    bio:
      "Hussain Rangwala represents a contemporary design voice shaped by strong architectural fundamentals and evolving spatial sensibilities. His work focuses on residential and commercial projects where context, proportion, and detailing define the outcome. Hussain brings a refined approach to layouts, material selection, and spatial flow, ensuring each project feels both thoughtful and relevant. At IDL, he contributes design direction that bridges legacy expertise with modern architectural expression.",
  },
  {
    name: "Rohit Gojia",
    role: "Director · IDL",
    image: partner4,
    years: "Contemporary practice",
    line: "Modern living translated into clear, material-led interior narratives.",
    bio:
      "Rohit Gojia is driven by a strong understanding of modern living and interior environments. His work spans residential and interior-focused projects, with a sharp eye for materials, finishes, and user experience. Known for translating client aspirations into clear design narratives, Rohit brings creativity grounded in practicality. At IDL, he adds a contemporary interior perspective, shaping spaces that are functional, expressive, and deeply liveable.",
  },
];

/* =================================================================
   EXPERTISE / SECTORS
   ================================================================= */
export const sectors = [
  {
    slug: "residential",
    name: "Residential",
    image: emerald1.url,
    gallery: [emerald1.url, onyx1.url, saffron1.url, serene1.url, noir1.url, emerald2.url, onyx2.url],
    short: "Apartments, bungalows and villas — composed around light, view, and movement.",
    statement:
      "Homes that prioritise daylight, proportion and an intuitive flow. Every decision — from plan to finish — supports daily life with calm precision.",
    sub: [
      {
        title: "Apartments",
        image: saffron2.url,
        body:
          "Homes that prioritise daylight, proportion and an intuitive flow. Every decision — from plan to finish — supports daily life with calm precision.",
      },
      {
        title: "Bungalows & Villas",
        image: noir2.url,
        body:
          "Independent houses conceived for privacy, openness and a seamless connection to the outdoors. The architecture is composed around light, view and movement.",
      },
    ],
  },
  {
    slug: "commercial",
    name: "Commercial",
    image: solitaa1.url,
    gallery: [solitaa1.url, gcb1.url, biguine1.url, jadepink1.url, monster1.url, palak1.url, ratanshi1.url, solitaa2.url, gcb2.url],
    short: "Workplaces and retail that translate brand identity into spatial performance.",
    statement:
      "Workplaces and retail environments that translate brand identity into spatial performance. Our interiors support productivity, culture and adaptability — designed for now and future growth.",
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    image: energize1.url,
    gallery: [energize1.url, energize2.url, energize3.url, divya1.url, divya2.url, avm1.url, meril1.url, meril2.url],
    short: "Hotels and retreats choreographed through warmth, sequence and view.",
    statement:
      "Bespoke hospitality interiors that elevate lifestyle — choreographed through warmth, sequence, tactility and view. Arrival, pause and aftertaste, shaped as a single architectural experience.",
  },
  {
    slug: "industrial",
    name: "Industrial",
    image: pidilite1.url,
    gallery: [pidilite1.url, pidilite2.url, pidilite3.url, pidilite4.url, mb56_1.url, mb56_2.url],
    short: "Factories and R&D campuses shaped with rigour, light and material intelligence.",
    statement:
      "Industrial buildings — R&D centres, factories and process-led campuses — designed with the same discipline and material care as our finest interiors. Performance and presence, unified.",
  },
  {
    slug: "institutional",
    name: "Institutional",
    image: merilAcad1.url,
    gallery: [merilAcad1.url, merilAcad2.url, merilAcad3.url, dcp1.url, dcp2.url, apj1.url, apj2.url],
    short: "Civic buildings designed for long life, accessibility and quiet presence.",
    statement:
      "Buildings that serve public life with clarity and durability. We design institutional projects for long-term performance, with efficiency, accessibility and civic presence as guiding principles.",
  },
  {
    slug: "workplace",
    name: "Workplace",
    image: dcp1.url,
    gallery: [dcp1.url, dcp2.url, monster1.url, palak1.url, solitaa1.url, gcb1.url],
    short: "Offices and workspaces where culture, focus and collaboration are made spatial.",
    statement:
      "Workplaces that balance the needs of individuals and teams — culture made visible through architecture, light and material. Considered, calm interiors that scale with how a company actually works.",
  },
];

/* =================================================================
   HISTORY / TIMELINE
   ================================================================= */
export const milestones = [
  {
    year: "1989",
    title: "Interarch is founded",
    image: inst.aerial,
    text:
      "Founded by architect Dipak Thaker, Interarch (with its twin firm DID Consultants) was established with the guiding principle of \"modern architecture drawn from traditional guidelines.\" The practice began with a vision to blend innovation, technology, and timeless design sensibilities.",
  },
  {
    year: "2001",
    title: "A+D Spectrum Architecture Awards",
    image: res.gallery,
    text:
      "Recognition came early when IDL participated in the A+D & Spectrum Paints Architecture Awards, with the jury praising the firm's creative approach and contribution to the contemporary design dialogue.",
  },
  {
    year: "2008",
    title: "AREA Acknowledgement",
    image: com.lounge,
    text:
      "IDL's growing reputation extended beyond architecture to its collaborative work with the real estate sector. The Association of Real Estate Agents (AREA) acknowledged the firm's support and commitment during their 3rd Real Estate Conference.",
  },
  {
    year: "2009",
    title: "DRDO Silver Jubilee Honour",
    image: inst.tower,
    text:
      "Marking a strong institutional partnership, IDL was honoured by the Defence Research & Development Organisation (DRDO) during its Silver Jubilee celebrations, recognising the firm's role in supporting key projects.",
  },
  {
    year: "2010",
    title: "Civic Recognition",
    image: inst.pool,
    text:
      "A proud cultural and civic recognition was received for contributions to architecture and the built environment, felicitated by government and civic leaders for design impact.",
  },
  {
    year: "2014–15",
    title: "AICA Asia Fest Commendation",
    image: res.warm,
    text:
      "At the Artists in Concrete Awards (AICA), Asia Fest, IDL's work on large-scale institutional projects — including the Educational Big and Medical Academy — received a Commendation Award, endorsed by an international panel of architects and designers.",
  },
  {
    year: "2015",
    title: "Rachana Sansad Diamond Jubilee",
    image: com.reception,
    text:
      "The Academy of Architecture, Rachana Sansad (Mumbai), felicitated Ar. Dipak Thaker during their Diamond Jubilee celebrations, recognising his significant contributions to the profession and his role as an inspiring alumnus.",
  },
  {
    year: "Today",
    title: "Interarch Design Labs",
    image: inst.palm,
    text:
      "With over three decades of practice, IDL has grown into a multidisciplinary studio delivering across architecture, interiors, engineering, and master planning. From bungalows and corporate campuses to large institutional projects, the firm continues to uphold its founding philosophy, innovative design rooted in tradition, delivered with sensitivity to clients and context.",
  },
];

/* =================================================================
   PROCESS
   ================================================================= */
export const processPhases = [
  {
    n: "01",
    title: "Listening First",
    body:
      "Every project begins with listening — to people, to context, to the story the site already carries. We work to understand aspirations, constraints and the quiet habits drawings often miss.",
  },
  {
    n: "02",
    title: "Concept & Strategy",
    body:
      "Ideas are sketched and tested until the project finds its order. Climate, culture, craft and approval pathways inform a clear strategic direction rooted in clarity and intent.",
  },
  {
    n: "03",
    title: "Design Development",
    body:
      "Concepts come to life through proportion, materiality and detail. Drawings, schedules, mockups and consultant input bring rigour to every decision.",
  },
  {
    n: "04",
    title: "Execution",
    body:
      "We coordinate with engineers, consultants and craftspeople to deliver seamlessly. Site review protects intent as decisions become permanent.",
  },
  {
    n: "05",
    title: "Beyond Delivery",
    body:
      "A building is sustainable when it adapts and ages well. We stay involved so spaces continue to grow, adapt and live alongside you.",
  },
];

/* =================================================================
   DESIGN APPROACH
   ================================================================= */
export const designApproach = [
  { title: "Clarity", body: "Clarity is not minimalism, it is intention. Removing what doesn't matter so the essential can define the space. This is how we create environments that feel calm, intuitive, and timeless." },
  { title: "Intent", body: "Good design is deliberate. Every material, proportion, and gesture exists for a reason, shaped by how people will live, move, and experience the space." },
  { title: "People & Place", body: "We start with listening, to the site, the client, and the cultural pulse of a place. Architecture, for us, is not imposed but uncovered through conversation and context. Our work spans cities and landscapes across India and beyond, yet each project returns to the same question: What does this place need to become its best self?" },
  { title: "Sustainability", body: "For us, sustainability is a form of respect, for land, material, and time. A building is truly sustainable when it adapts, ages well, and remains meaningful for decades. We combine traditional wisdom with modern engineering to create spaces that breathe with their surroundings rather than resist them. We don't chase trends. We design for longevity." },
  { title: "Craft & Collaboration", body: "Design at IDL is a collective act. Four partners, one team, many hands, united by curiosity and respect for material craft. Whether we are co-creating with artisans or coordinating with consultants, every project carries the imprint of the people who built it. We embrace authenticity, the grain of wood, the honesty of joinery, the human mark of craft." },
];

/* =================================================================
   CONTACT
   ================================================================= */
export const contactCopy = {
  eyebrow: "— Contact",
  headline: "Wherever you are, we design for you.",
  subline:
    "With projects across India and around the world, we'd love to shape your next space with care, clarity, and intent.",
  studios: [
    { city: "Mumbai", address: "Interarch Design Labs\nMumbai, Maharashtra, India" },
    { city: "Ahmedabad", address: "Interarch Design Labs\nAhmedabad, Gujarat, India" },
  ],
  email: "hello@interarchlabs.com",
  regions: "Projects across India, the Middle East & Africa.",
};

/* =================================================================
   JOURNAL
   ================================================================= */
export const journalPosts = [
  {
    slug: "design-with-depth",
    category: "Essay",
    date: "12.04.26",
    title: "Design with depth, spaces with purpose",
    dek: "Why every IDL project begins with meaning before form — and how that discipline shapes a building.",
  },
  {
    slug: "clarity-is-not-minimalism",
    category: "Notes",
    date: "28.03.26",
    title: "Clarity is not minimalism — it is intention",
    dek: "Removing what doesn't matter so the essential can define the space.",
  },
  {
    slug: "drawing-before-render",
    category: "Studio",
    date: "06.02.26",
    title: "Why we still sketch before we render",
    dek: "The hand drawing remains the way the studio thinks, edits and tests a building's first instinct.",
  },
];
