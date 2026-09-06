import yoga from "../../assets/gallery/yoga.webp";
import chairmanImg from "../../assets/gallery/alpha.webp";
import principalImg from "../../assets/gallery/beta.webp";

//Hero Section
import heroImg from "../../assets/gallery/slide.webp";

import logo from "../../assets/gallery/vvm-logo.svg";

//Teacher section
import teacher1 from "../../assets/teachers/1.webp";
import teacher2 from "../../assets/teachers/2.webp";
import teacher3 from "../../assets/teachers/3.webp";
import teacher4 from "../../assets/teachers/4.webp";
import teacher5 from "../../assets/teachers/5.webp";
import teacher6 from "../../assets/teachers/6.webp";
import teacher7 from "../../assets/teachers/7.webp";

//Toppers section
import topper1 from "../../assets/toppers/04eb8f00ac3d3d8c368a891062004c1c.webp";
import topper2 from "../../assets/toppers/0a291fc509b80fe9a1ce6548d60ee391.webp";
import topper3 from "../../assets/toppers/22a4b486f9d4646052d871d7a5fca57b.webp";
import topper4 from "../../assets/toppers/2897b167ceda1759fdb3b17c145c3754.webp";
import topper5 from "../../assets/toppers/66a0f886c40b0fbc406f3da78b428163.webp";
import topper6 from "../../assets/toppers/7cbe85191493a2fc4a33dfad4ae19494.webp";
import topper7 from "../../assets/toppers/8e6af1d7701f3429e45301f18e7849ea.webp";
import topper8 from "../../assets/toppers/91635ddec3814ea7fb97b1eca755a804.webp";

const galleryAssets = import.meta.glob(
  "../../assets/gallery/*.{webp,png,jpg,jpeg,avif}",
  {
    eager: true,
    import: "default",
  },
);

const galleryImage = (fileName) =>
  galleryAssets[`../../assets/gallery/${fileName}`];

const schoolPhotoAssets = import.meta.glob(
  "../../assets/school-photos/*.{webp,png,jpg,jpeg,avif}",
  {
    eager: true,
    import: "default",
  },
);

const schoolPhoto = (fileName) =>
  schoolPhotoAssets[`../../assets/school-photos/${fileName}`];

export const schoolInfo = {
  name: "Vani Vidya Mandir School",
  shortName: "VVM Gamharia",
  established: "1988",
  tagline: "High School at Gamharia, Jamshedpur — In operation since the 1980s",
  logo: logo,
  email: "info@vanividyamandir.edu.in",
  phones: [],
  address:
    "School Road, Ward No. 7, Chota Gamharia, Zila Saraykela Kharsawan, Jamshedpur, Jharkhand 832108",
  landmark: "Near Julumtand Play Ground, Chota Gamharia",
  mapplsUrl: "https://www.mappls.com/f7773d",
  mapplsPin: "f7773d",
  facebookUrl: "https://www.facebook.com/gamhariavvm/",
  justdialUrl:
    "https://www.justdial.com/Jamshedpur/Vani-Vidya-Mandir-School-Gamharia/9999P6597-6597-200929224422-L1T2_BZDET",
  tourUrl: "https://www.mappls.com/f7773d",
  spotlightImage: schoolPhoto("photos1.jpg"),
  spotlightUrl: schoolPhoto("photos1.jpg"),
  headmaster: "Mr. Paritosh Mahato",
  ratings: {
    justdial: "4.6 / 5",
    reviewsCount: "20+ verified reviews",
  },
  timings: "Monday – Saturday: 9:00 AM – 5:00 PM (Sunday Closed)",
};

export const footerInfo = {
  name: "Vani Vidya Mandir School",
  shortName: "VVM Gamharia",
  address:
    "School Road, Ward No. 7, Chota Gamharia, Zila Saraykela Kharsawan, Jamshedpur, Jharkhand 832108",
  landmark: "Near Julumtand Play Ground",
  phone: "Available at School Office",
  email: "info@vanividyamandir.edu.in",
  about:
    "Established in 1988, Vani Vidya Mandir is a trusted high school in Gamharia, Jamshedpur. Dedicated to character-building, disciplined learning, sports, and cultural development for over 35+ years.",
};

export const navItems = [
  {
    label: "About Us",
    items: [
      ["About School", "/about"],
      ["Vision & Mission", "/about#mission"],
      ["Leadership Messages", "/leadership"],
      ["Our Faculty", "/about#faculty"],
      ["Mandatory Disclosure", "/about#disclosure"],
    ],
  },
  {
    label: "Academics",
    items: [
      ["Academic Programs", "/academic-programs"],
      ["Clubs & Societies", "/clubs-societies"],
      ["Sports Activities", "/sports-activities"],
      ["Facilities", "/facilities"],
    ],
  },
  { label: "Admissions", path: "/admissions" },
  {
    label: "Gallery",
    items: [
      ["Photo Gallery", "/gallery"],
      ["Events Gallery", "/events-gallery"],
      ["Events & News", "/events"],
    ],
  },
  { label: "Notices", path: "/notices" },
  { label: "Contact", path: "/contact" },
];

export const quickActions = [
  ["Get Directions", "https://www.mappls.com/f7773d", true],
  ["Facebook", "https://www.facebook.com/gamhariavvm/", true],
  [
    "Justdial (4.6★)",
    "https://www.justdial.com/Jamshedpur/Vani-Vidya-Mandir-School-Gamharia/9999P6597-6597-200929224422-L1T2_BZDET",
    true,
  ],
  ["Admissions", "/admissions", false],
];

export const heroSlides = [
  schoolPhoto("photos1.jpg"),
  schoolPhoto("photos2.jpg"),
  schoolPhoto("5.avif"),
];

export const missionCards = [
  {
    icon: "target",
    title: "Our Mission",
    text: "To build confident, disciplined, and morally grounded learners through structured academics, co-curricular skills, and active community participation in Gamharia.",
  },
  {
    icon: "eye",
    title: "Our Vision",
    text: "To be Gamharia's premier high school, fostering academic excellence, moral integrity, physical fitness, and holistic development since 1988.",
  },
  {
    icon: "handshake",
    title: "Our Values",
    text: "Integrity, humility, dedication, respect, and perseverance guide every classroom lesson, assembly, sports activity, and parent partnership.",
  },
];

export const leaders = [
  {
    id: "management",
    name: "School Managing Committee",
    role: "Managing Committee",
    image: chairmanImg,
    quote: "Education should shape character, discipline, and community purpose.",
    greeting: "Dear Parents and Students,",
    message:
      "Since 1988, Vani Vidya Mandir School has served the families of Gamharia and Jamshedpur with accessible, value-driven education that empowers every child to succeed.",
    followUp:
      "We continue to strengthen classroom facilities, digital learning tools, sports grounds, and teacher development to ensure our students achieve excellence in academics and life.",
    fullMessage: [
      "Since 1988, Vani Vidya Mandir School has served the families of Gamharia and Jamshedpur with accessible, value-driven education that empowers every child to succeed.",
      "Our priority is the balanced development of each student: punctuality, honesty, clear communication, moral responsibility, and hard work in their studies.",
      "Our campus in Chota Gamharia provides a safe, disciplined, and supportive environment where teachers and parents work hand-in-hand.",
      "We warmly welcome new students to join our rich heritage and build a promising future.",
    ],
  },
  {
    id: "headmaster",
    name: "Mr. Paritosh Mahato",
    role: "Headmaster",
    image: principalImg,
    quote:
      "Learning becomes meaningful when discipline, curiosity, and values grow together.",
    greeting: "Dear School Community,",
    message:
      "At Vani Vidya Mandir, every student is encouraged to discover their potential through structured lessons, active participation, and consistent encouragement from teachers.",
    followUp:
      "Through regular classroom teaching, morning assemblies, sports, cultural programmes, and personal mentorship, we prepare our learners to be capable and conscientious individuals.",
    fullMessage: [
      "At Vani Vidya Mandir, every student is encouraged to discover their potential through structured lessons, active participation, and consistent encouragement from teachers.",
      "Teachers deliver concepts with patience and clarity, emphasizing written practice, foundational math, science experiments, languages, and general knowledge.",
      "Beyond textbooks, our students learn team spirit on the playground, cultural expression in school events, and civic responsibility in the community.",
      "I invite our parents to maintain open communication with our faculty so together we can ensure the best outcomes for every child.",
    ],
  },
];

export const teachers = [
  ["Vikram Singh", "Mathematics Teacher", teacher1],
  ["Priya Sharma", "Science Teacher", teacher2],
  ["Rajesh Kumar Mahato", "English Teacher", teacher3],
  ["Sunita Kumari", "Computer Science", teacher4],
  ["Manisha Das", "Social Studies", teacher5],
  ["Meenakshi Mishra", "Hindi Teacher", teacher6],
  ["Deepak Soren", "Physical Education", teacher7],
];

export const notices = [
  [
    "Admissions Open for Session 2026-27",
    "Admissions are open from Nursery to Class X. Parents can collect the admission form from the school office in Chota Gamharia on working days between 9:00 AM and 5:00 PM.",
    "View Details",
  ],
  [
    "Parent-Teacher Meeting (PTM) Notice",
    "The upcoming quarterly Parent-Teacher Interaction will be conducted in the school hall on Saturday from 9:30 AM to 1:00 PM to review academic progress.",
    "Read Details",
  ],
  [
    "Annual Sports & PT Demonstration",
    "Students are preparing for the upcoming Annual Sports Meet and physical fitness events at the school ground. Practice sessions will be held during activity hours.",
    "Sports Schedule",
  ],
  [
    "Science & Art Exhibition 2026",
    "Classes VI to X will present working science models, art displays, and eco-friendly projects on 22 August 2026.",
    "Download Guidelines",
  ],
];

export const newsItems = [
  [
    "Independence Day Celebrations at Vani Vidya Mandir",
    "15 Aug 2026",
    schoolPhoto("3.jpg"),
    "Students and faculty gathered for the flag hoisting ceremony, national anthem, patriotic songs, and cultural performances showcasing unity and heritage.",
  ],
  [
    "Class X Students Achieve 100% Board Results",
    "28 Jun 2026",
    schoolPhoto("4.jpg"),
    "The school community proudly celebrated outstanding secondary examination results, with students excelling in Mathematics, Science, and Social Studies.",
  ],
  [
    "Campus & Classroom Infrastructure Upgrades",
    "18 Jun 2026",
    schoolPhoto("5.avif"),
    "New learning aids, library collections, and classroom enhancements have been completed to support interactive and practical learning.",
  ],
  [
    "Tree Plantation & Campus Cleanliness Drive",
    "08 Jun 2026",
    schoolPhoto("unnamed.webp"),
    "Students and teachers planted native saplings around the school campus and participated in a cleanliness awareness rally in Chota Gamharia.",
  ],
].map(([title, date, image, text]) => ({ title, date, image, text }));

export const upcomingEvents = [
  ["03", "Aug", "Admission Interactions", "Reception Block - 9:00 AM"],
  ["10", "Aug", "Parent Orientation", "Main Hall - 9:30 AM"],
  ["15", "Aug", "Independence Day Ceremony", "School Ground - 8:00 AM"],
  [
    "22",
    "Aug",
    "Science & Art Exhibition",
    "Junior and Senior Labs - 10:00 AM",
  ],
  ["29", "Aug", "Inter-House Football Finals", "Sports Ground - 2:00 PM"],
];

export const toppers = {
  class10: [
    [
      "Aditya Kumar",
      "98.6%",
      "Consistent revision and the guidance of our teachers at VVM helped me score top marks.",
      topper1,
    ],
    [
      "Ankit Mahato",
      "97.8%",
      "Daily practice and regular problem-solving made a huge difference in board exams.",
      topper2,
    ],
    [
      "Harshita Singh",
      "97.2%",
      "I am deeply grateful to my teachers and parents for their continuous encouragement.",
      topper3,
    ],
    [
      "Ananya Das",
      "96.9%",
      "Discipline and focus during class hours prepared me thoroughly for the exams.",
      topper4,
    ],
  ],
  class12: [
    [
      "Archita Kumari",
      "99.2%",
      "Vani Vidya Mandir provided the right academic atmosphere and study guidance.",
      topper5,
    ],
    [
      "Naveen Mahato",
      "98.7%",
      "Clarifying concepts early with teachers helped me stay confident throughout the year.",
      topper6,
    ],
    [
      "Karan Sharma",
      "98.1%",
      "The test series and teacher feedback helped me identify and strengthen weak areas.",
      topper7,
    ],
    [
      "Nisha Soren",
      "97.5%",
      "A disciplined study routine and supportive mentors made this achievement possible.",
      topper8,
    ],
  ],
};

export const facilities = [
  {
    title: "Smart Classrooms",
    image: schoolPhoto("photos1.jpg"),
    description:
      "Interactive classrooms with modern teaching aids, digital content, and visual tools that make lessons more engaging and easier to understand.",
  },
  {
    title: "Science Laboratories",
    image: schoolPhoto("photos2.jpg"),
    description:
      "Well-equipped laboratories encourage students to explore physics, chemistry, and biology through practical experiments and demonstrations.",
  },
  {
    title: "Modern Library",
    image: schoolPhoto("6.jpg"),
    description:
      "A calm and resourceful library with curriculum books, reference material, and reading spaces that build curiosity and self-study habits.",
  },
  {
    title: "Computer Lab",
    image: schoolPhoto("7.jpg"),
    description:
      "A computer lab where students learn digital literacy, computer fundamentals, office tools, and safe internet practices.",
  },
  {
    title: "Sports & Play Ground",
    image: schoolPhoto("unnamed (1).webp"),
    description:
      "Spacious grounds supporting football, cricket, volleyball, kabaddi, athletics, and daily morning PT exercises.",
  },
];

export const testimonials = [
  [
    "Sunita Sharma",
    "Parent",
    "https://ui-avatars.com/api/?name=Sunita+Sharma&background=F3EFE6&color=014E4E&bold=true&size=200&font-size=0.40",
    "Vani Vidya Mandir has been a beacon of learning in Gamharia for decades. The teachers give individual attention to each child, ensuring both strong academic basics and good discipline.",
  ],
  [
    "Ananya Kumari",
    "Student",
    "https://ui-avatars.com/api/?name=Ananya+Kumari&background=E8F5E9&color=1B5E20&bold=true&size=200&font-size=0.40",
    "I really enjoy studying here. Our teachers make lessons interesting and easy to understand, and we have lots of sports and cultural events throughout the year.",
  ],
  [
    "Manoj Mahato",
    "Parent",
    "https://ui-avatars.com/api/?name=Manoj+Mahato&background=E3F2FD&color=0D47A1&bold=true&size=200&font-size=0.40",
    "The faculty is approachable and attentive. We have seen significant improvement in our son's confidence, speaking skills, and examination scores.",
  ],
  [
    "Kavita Singh",
    "Alumni",
    "https://ui-avatars.com/api/?name=Kavita+Singh&background=FFF3E0&color=E65100&bold=true&size=200&font-size=0.40",
    "Studying at Vani Vidya Mandir gave me the confidence and moral grounding that still guide me today. Proud to be an alumnus of this school.",
  ],
  [
    "Ramesh Das",
    "Parent",
    "https://ui-avatars.com/api/?name=Ramesh+Das&background=FCE4EC&color=880E4F&bold=true&size=200&font-size=0.40",
    "The school combines good values with quality teaching. It is easily accessible on School Road, and the administrative staff is always helpful.",
  ],
].map(([name, role, image, text]) => ({ name, role, image, text }));

export const achievements = [
  [
    "5,000+",
    "Students & Alumni",
    "users",
    galleryImage("g9.webp"),
    "md:col-span-2 md:row-span-2",
  ],
  ["35+", "Years of Legacy", "school", heroImg, ""],
  ["100%", "Board Results", "trend", galleryImage("g3.webp"), ""],
  ["4.6★", "Justdial Rating", "award", yoga, ""],
  ["20+", "Dedicated Teachers", "teacher", chairmanImg, "md:col-span-2"],
];

export const programs = [
  ["Pre-Primary", "Nursery, LKG & UKG foundational learning program.", "child"],
  [
    "Primary School",
    "Classes I - V focusing on core academic skills.",
    "school",
  ],
  [
    "Middle School",
    "Classes VI - VIII conceptual & practical learning.",
    "book",
  ],
  ["Secondary", "Classes IX - X board exam preparation.", "graduate"],
  ["Senior Secondary", "Science, Commerce & Arts streams available.", "cap"],
  [
    "Co-Curricular",
    "Sports, arts & personality development programs.",
    "medal",
  ],
];

export const galleryImages = [
  [schoolPhoto("photos1.jpg"), "md:col-span-2 md:row-span-2", "Campus", "A bright first look at school life in Gamharia"],
  [schoolPhoto("photos2.jpg"), "md:row-span-2", "Activities", "Students taking part in a school activity session"],
  [schoolPhoto("3.jpg"), "", "Events", "Daily campus moments captured at Vani Vidya Mandir"],
  [schoolPhoto("4.jpg"), "", "Campus", "Students gathered during a school programme"],
  [schoolPhoto("5.avif"), "md:col-span-2", "Classroom", "Learning and discussion inside the classroom"],
  [schoolPhoto("6.jpg"), "", "Events", "Event coverage from a recent school gathering"],
  [schoolPhoto("7.jpg"), "", "Sports", "Outdoor games and physical activity on campus"],
  [schoolPhoto("unnamed.webp"), "md:row-span-2", "Activities", "A candid moment from the school grounds"],
  [schoolPhoto("unnamed (1).webp"), "", "Campus", "Students moving between activities on campus"],
  [schoolPhoto("unnamed (2).webp"), "md:col-span-2", "Activities", "Hands-on learning and participation"],
  [schoolPhoto("unnamed (3).webp"), "", "Events", "School function and celebration coverage"],
  [schoolPhoto("unnamed (4).webp"), "", "Sports", "Students engaged in sports practice"],
  [schoolPhoto("unnamed (5).webp"), "md:col-span-2", "Classroom", "Academic discussion and classroom engagement"],
  [schoolPhoto("unnamed (6).webp"), "", "Campus", "Campus life in and around the school"],
  [schoolPhoto("unnamed (7).webp"), "", "Events", "Cultural performance from a school event"],
  [schoolPhoto("unnamed (8).webp"), "md:row-span-2", "Activities", "Creative classroom activity and interaction"],
  [schoolPhoto("unnamed (9).webp"), "", "Sports", "Teamwork and sports on the field"],
  [schoolPhoto("unnamed.webp"), "md:col-span-2", "Campus", "A wider look at the school campus"],
];

export const faqs = [
  [
    "What is the admission process?",
    "Fill enquiry form, schedule interaction, submit documents, and confirm admission based on seat availability.",
  ],
  [
    "What curriculum does the school follow?",
    "We follow a structured curriculum aligned with national education standards and board guidelines.",
  ],
  [
    "Are transport facilities available?",
    "Yes, safe GPS-enabled transport facilities are available across major routes.",
  ],
  [
    "What are school timings?",
    "School timings vary by class level, generally between 8:00 AM to 2:00 PM.",
  ],
  [
    "Is there a school uniform?",
    "Yes, students are required to follow the prescribed school uniform.",
  ],
  [
    "Do you offer scholarships?",
    "Merit-based scholarships are available for outstanding academic performers.",
  ],
  [
    "How can parents track student progress?",
    "Through PTMs, report cards, and direct communication with teachers.",
  ],
  [
    "Are extracurricular activities available?",
    "Yes, sports, arts, music, dance, and leadership programs are offered.",
  ],
  [
    "Do you have smart classrooms?",
    "Yes, modern smart classrooms are equipped with digital learning tools.",
  ],
  [
    "Is the campus secure?",
    "Yes, CCTV surveillance and trained staff ensure campus safety.",
  ],
  [
    "How can I schedule a school visit?",
    "You can contact the administration office or submit an online enquiry form.",
  ],
  [
    "What documents are required for admission?",
    "Birth certificate, previous academic records, ID proof, and passport-sized photographs.",
  ],
];

export const footerGroups = [
  [
    "Quick Links",
    [
      ["Home", "/"],
      ["About Us", "/about"],
      ["Admissions", "/admissions"],
      ["Leadership", "/leadership"],
      ["Contact Us", "/contact"],
    ],
  ],
  [
    "Explore",
    [
      ["Notice Board", "/notices"],
      ["Events & News", "/events"],
      ["Photo Gallery", "/gallery"],
      ["Events Gallery", "/events-gallery"],
      ["Academic Programs", "/academic-programs"],
      ["Clubs & Societies", "/clubs-societies"],
      ["Sports Activities", "/sports-activities"],
      ["Facilities", "/facilities"],
    ],
  ],
];
