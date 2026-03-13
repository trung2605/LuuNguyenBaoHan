// ============================================================
// data.js — All portfolio content for Luu Nguyen Bao Han
// ============================================================

export const personalInfo = {
  name: "Luu Nguyen Bao Han",
  nameVi: "Lưu Nguyễn Bảo Hân",
  roles: ["Media Specialist", "Photographer", "Content Creator"],
  tagline: "Capturing stories through the lens of creativity.",
  bio: "A passionate media professional and photographer based in Vietnam with a keen eye for visual storytelling. I blend technical expertise with artistic vision to create compelling content that resonates and inspires audiences across platforms.",
  email: "lunguyenbaohan@email.com",
  phone: "+84 xxx xxx xxxx",
  location: "Ho Chi Minh City, Vietnam",
  linkedin: "https://linkedin.com/in/lunguyenbaohan",
  instagram: "https://instagram.com/lunguyenbaohan",
  avatarUrl: "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/baohan_portfolio/avatar",
  avatarAlt: "Luu Nguyen Bao Han — Media & Photography Professional",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "50+", label: "Projects Completed" },
  { value: "15+", label: "Happy Clients" },
  { value: "1K+", label: "Photos Taken" },
];

export const experiences = [
  {
    id: 1,
    role: "Media Coordinator",
    company: "Creative Vision Agency",
    type: "Full-time",
    period: "Jan 2023 – Present",
    location: "Ho Chi Minh City",
    description:
      "Lead multimedia production for brand campaigns, managing a team of content creators. Oversee photo/video shoots, edit final deliverables, and maintain brand consistency across all channels.",
    achievements: [
      "Increased social media engagement by 45% through strategic content planning",
      "Produced 20+ brand campaigns for major clients in fashion and F&B sectors",
      "Implemented a new content workflow reducing production time by 30%",
    ],
    color: "blue",
  },
  {
    id: 2,
    role: "Freelance Photographer",
    company: "Self-employed",
    type: "Freelance",
    period: "Jun 2021 – Present",
    location: "Vietnam",
    description:
      "Provide professional photography services for events, portraits, products, and editorial shoots. Deliver polished, publication-ready images with expert post-processing.",
    achievements: [
      "Shot 30+ weddings and private events with consistent 5-star reviews",
      "Built a diverse portfolio spanning fashion, portrait, and commercial photography",
      "Developed signature editing style recognized by local publications",
    ],
    color: "pink",
  },
  {
    id: 3,
    role: "Content Creator & Social Media Executive",
    company: "Bloom Digital Studio",
    type: "Full-time",
    period: "Mar 2020 – Dec 2022",
    location: "Ho Chi Minh City",
    description:
      "Produced engaging video and photo content for brand social media channels. Handled scriptwriting, filming, editing, and publishing across Instagram, TikTok, and YouTube.",
    achievements: [
      "Grew a brand Instagram account from 2K to 25K followers in 12 months",
      "Created viral content pieces achieving 500K+ combined views",
      "Collaborated with 10+ influencers on integrated campaigns",
    ],
    color: "blue",
  },
  {
    id: 4,
    role: "Photography Intern",
    company: "The Frame Studio",
    type: "Internship",
    period: "Sep 2019 – Feb 2020",
    location: "Ho Chi Minh City",
    description:
      "Assisted senior photographers on commercial shoots, learned studio lighting techniques, and supported post-production workflows.",
    achievements: [
      "Assisted in 15+ commercial studio shoots",
      "Mastered lighting setups: softbox, ring light, and three-point lighting",
      "Handled photo culling and basic retouching in Lightroom",
    ],
    color: "pink",
  },
];

export const skillCategories = [
  {
    title: "Photography",
    icon: "Camera",
    skills: [
      "Portrait Photography",
      "Event Photography",
      "Product Photography",
      "Editorial Shoots",
      "Studio Lighting",
      "Outdoor & Natural Light",
      "Wedding Photography",
    ],
    palette: "blue",
  },
  {
    title: "Media & Content",
    icon: "Film",
    skills: [
      "Video Production",
      "Script Writing",
      "Content Strategy",
      "Social Media Management",
      "Brand Storytelling",
      "Reel Editing",
      "Visual Direction",
    ],
    palette: "pink",
  },
  {
    title: "Software & Tools",
    icon: "Monitor",
    skills: [
      "Adobe Lightroom",
      "Adobe Photoshop",
      "Adobe Premiere Pro",
      "DaVinci Resolve",
      "Canva Pro",
      "CapCut",
      "Google Analytics",
    ],
    palette: "blue",
  },
  {
    title: "Soft Skills",
    icon: "Star",
    skills: [
      "Creative Direction",
      "Client Communication",
      "Team Leadership",
      "Time Management",
      "Attention to Detail",
      "Problem Solving",
      "Bilingual (EN/VI)",
    ],
    palette: "pink",
  },
];

export const portfolioItems = [
  {
    id: 1,
    title: "Soft Light Portrait Series",
    category: "Photography",
    description: "A studio portrait series exploring soft, cinematic lighting for fashion editorials.",
    tags: ["Portrait", "Studio", "Editorial"],
    color: "blue",
  },
  {
    id: 2,
    title: "Golden Hour Outdoor Shoot",
    category: "Photography",
    description: "Natural light outdoor sessions capturing genuine emotions and beautiful bokeh.",
    tags: ["Outdoor", "Natural Light", "Lifestyle"],
    color: "pink",
  },
  {
    id: 3,
    title: "Brand Campaign — Bloom Café",
    category: "Media",
    description: "Complete visual identity content production for a boutique café brand launch.",
    tags: ["Branding", "F&B", "Campaign"],
    color: "blue",
  },
  {
    id: 4,
    title: "Wedding Documentary Film",
    category: "Photography & Video",
    description: "Cinematic wedding documentation blending still photography with short film storytelling.",
    tags: ["Wedding", "Film", "Cinematic"],
    color: "pink",
  },
  {
    id: 5,
    title: "TikTok Growth Campaign",
    category: "Social Media",
    description: "Conceptualized and executed a viral TikTok series for a lifestyle brand, reaching 1M+ views.",
    tags: ["TikTok", "Viral", "Short-form"],
    color: "blue",
  },
  {
    id: 6,
    title: "Product Photography Collection",
    category: "Photography",
    description: "Minimalist, high-conversion product photography for e-commerce brands.",
    tags: ["Product", "E-commerce", "Minimalist"],
    color: "pink",
  },
];

export const education = [
  {
    id: 1,
    degree: "Bachelor of Communications & Media Studies",
    institution: "Ho Chi Minh City University of Social Sciences and Humanities",
    period: "2016 – 2020",
    grade: "GPA: 3.4 / 4.0",
    description:
      "Specialized in Journalism & Mass Communication, with elective focus on visual media and digital marketing.",
    highlights: [
      "Graduated with Distinction",
      "Led the student Media Club for 2 years",
      "Thesis on 'Visual Storytelling in Digital Branding'",
    ],
  },
  {
    id: 2,
    degree: "Professional Photography Certificate",
    institution: "RMIT Vietnam — Creative Arts Faculty",
    period: "2021",
    grade: "Distinction",
    description:
      "Intensive professional photography program covering technical skills, studio practice, and commercial photography.",
    highlights: [
      "Studio lighting mastery",
      "Commercial and editorial workflows",
      "Best Portfolio Award — graduating cohort",
    ],
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Minh Tran",
    role: "Brand Manager, Bloom Café",
    quote:
      "Bao Han captured our brand's soul perfectly. The photos were stunning and she delivered everything ahead of schedule. Truly a professional!",
    avatar: "MT",
  },
  {
    id: 2,
    name: "Linh Pham",
    role: "Bride & Client",
    quote:
      "Our wedding photos are absolutely breathtaking. Bao Han made us feel so comfortable and the results brought us to tears. Couldn't recommend her more.",
    avatar: "LP",
  },
  {
    id: 3,
    name: "David Nguyen",
    role: "Creative Director, Creative Vision Agency",
    quote:
      "One of the most talented and reliable media professionals I've worked with. Her eye for detail and creative instinct elevate every project she touches.",
    avatar: "DN",
  },
];
