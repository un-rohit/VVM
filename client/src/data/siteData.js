import yoga from "../../assets/gallery/yoga.webp";
import chairmanImg from "../../assets/gallery/alpha.webp";
import principalImg from "../../assets/gallery/beta.webp";

//Hero Section
import heroImg from "../../assets/gallery/slide.webp";

import logo from "../../assets/gallery/logo.png";

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
  logo: logo,
  email: "",
  phones: [],
  address:
    "School Road, Chota Gamharia, Zila Saraykela, Kharsava, Jamshedpur, Jharkhand 832108",
  mapplsUrl: "https://www.mappls.com/f7773d",
  facebookUrl: "https://www.facebook.com/gamhariavvm/",
  tourUrl: "https://www.mappls.com/f7773d",
  spotlightImage: schoolPhoto("photos1.jpg"),
  spotlightUrl: schoolPhoto("photos1.jpg"),
};

export const footerInfo = {
  name: "Vani Vidya Mandir School",
  address:
    "School Road, Chota Gamharia, Zila Saraykela, Kharsava, Jamshedpur, Jharkhand 832108",
  phone: "",
  email: "",
  about:
    "A school rooted in the Gamharia community, nurturing disciplined learners through strong academics, arts, sports, and service-minded leadership.",
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
    text: "To build confident, compassionate learners through rigorous academics, disciplined habits, creative exploration, and a strong sense of community.",
  },
  {
    icon: "eye",
    title: "Our Vision",
    text: "To be a trusted school in Gamharia for future-ready education rooted in Indian values, global awareness, and responsible citizenship.",
  },
  {
    icon: "handshake",
    title: "Our Values",
    text: "Integrity, humility, service, perseverance, and excellence guide every classroom, assembly, activity, and parent partnership.",
  },
];

export const leaders = [
  {
    id: "chairman",
    name: "Mr. Rajeev Sharma",
    role: "Chairman",
    image: chairmanImg,
    quote: "Education should shape character, confidence, and purpose.",
    greeting: "Dear Parents and Students,",
    message:
      "At Vani Vidya Mandir School, we see education as a partnership between home, school, and society. Our campus in Gamharia gives children the advantage of focused learning in a calm, inspiring environment.",
    followUp:
      "We continue to invest in capable teachers, safe infrastructure, digital classrooms, reading culture, sports, and life skills so every student grows with discipline and purpose.",
    fullMessage: [
      "At Vani Vidya Mandir School, we see education as a partnership between home, school, and society. Our campus in Gamharia gives children the advantage of focused learning in a calm, inspiring environment.",
      "Our priority is not only board performance, but also the formation of habits that stay with a child for life: punctuality, honesty, respect, clear communication, and the courage to take responsibility.",
      "In the coming session, we are strengthening laboratory work, reading programs, sports coaching, environmental projects, and career guidance so our students are prepared for higher studies and meaningful service.",
      "I thank our parents for their trust and invite every student to use the opportunities of the school with sincerity, humility, and ambition.",
    ],
  },
  {
    id: "principal",
    name: "Dr. Meera Joshi",
    role: "Headmaster / Principal",
    image: principalImg,
    quote:
      "Learning becomes meaningful when discipline and curiosity grow together.",
    greeting: "Dear School Community,",
    message:
      "Our classrooms are designed to help children think, ask, practice, and present. We keep academic expectations high while giving each learner the guidance needed to improve steadily.",
    followUp:
      "Through assemblies, clubs, sports, assessments, counselling, and regular parent communication, we help students become confident, courteous, and ready for the next stage of life.",
    fullMessage: [
      "Our classrooms are designed to help children think, ask, practice, and present. We keep academic expectations high while giving each learner the guidance needed to improve steadily.",
      "Teachers plan lessons around clear concepts, written practice, projects, reading, and reflection. Regular assessments are used to guide improvement, not merely to record marks.",
      "Equally important are co-curricular experiences: morning assemblies, debate, music, visual art, yoga, games, community outreach, and leadership duties that build confidence and empathy.",
      "I encourage every child to attend school with preparation, speak truthfully, treat others with kindness, and take pride in doing ordinary things well every day.",
    ],
  },
];

export const teachers = [
  ["Vikram Singh Negi", "Mathematics Teacher", teacher1],
  ["Priya Semwal", "Science Teacher", teacher2],
  ["Rajesh Chamoli", "English Teacher", teacher3],
  ["Sunita Dobhal", "Computer Science", teacher4],
  ["Manisha Raturi", "Social Studies", teacher5],
  ["Meenakshi Bhatt", "Hindi Teacher", teacher6],
  ["Deepak Kandwal", "Physical Education", teacher7],
];

export const notices = [
  [
    "Admission Interaction Schedule for 2026-27",
    "Nursery to Class IX admission interactions will be held from 3 to 8 August 2026. Parents are requested to carry the birth certificate, previous report card, and two photographs.",
    "View Schedule",
  ],
  [
    "Parent Orientation and Academic Briefing",
    "The first parent orientation for the new term will be conducted in the school auditorium on 10 August 2026 from 9:30 AM onwards.",
    "Read Details",
  ],
  [
    "Monsoon Safety Advisory",
    "Students using school transport should report five minutes early during heavy rain. Raincoats are preferred over umbrellas for campus movement.",
    "Read Advisory",
  ],
  [
    "Inter-House Science and Heritage Exhibition",
    "Classes VI to XII will present models and research displays on Himalayan ecology, clean energy, river conservation, and local heritage on 22 August 2026.",
    "Download Guidelines",
  ],
];

export const newsItems = [
  [
    "Students Lead Ganga Cleanliness Awareness Drive",
    "12 Jul 2026",
    schoolPhoto("3.jpg"),
    "Senior students conducted a community awareness campaign focused on waste segregation, civic responsibility, and respect for the local environment.",
  ],
  [
    "Class X Records 100% Board Result",
    "28 Jun 2026",
    schoolPhoto("4.jpg"),
    "The school community celebrated a strong Class X result, with students performing especially well in Mathematics, Science, English, and Social Science.",
  ],
  [
    "Smart Classroom Upgrade Completed",
    "18 Jun 2026",
    schoolPhoto("5.avif"),
    "Interactive panels, improved audio, and curated digital resources have been added to support clearer explanations and better classroom participation.",
  ],
  [
    "Yoga and Wellness Week Concludes",
    "08 Jun 2026",
    schoolPhoto("unnamed.webp"),
    "Students participated in yoga, mindfulness, nutrition talks, and fitness sessions designed around healthy routines and emotional balance.",
  ],
].map(([title, date, image, text]) => ({ title, date, image, text }));

export const upcomingEvents = [
  ["03", "Aug", "Admission Interactions", "Reception Block - 9:00 AM"],
  ["10", "Aug", "Parent Orientation", "Main Auditorium - 9:30 AM"],
  ["15", "Aug", "Independence Day Ceremony", "School Quadrangle - 8:00 AM"],
  [
    "22",
    "Aug",
    "Science & Heritage Exhibition",
    "Junior and Senior Labs - 10:00 AM",
  ],
  ["29", "Aug", "Inter-House Football Finals", "Sports Ground - 2:00 PM"],
];

export const toppers = {
  class10: [
    [
      "Aditya Semwal",
      "98.6%",
      "Hard work and focus always pay off! Thanks to my teachers for their constant support.",
      topper1,
    ],
    [
      "Ankit Negi",
      "97.8%",
      "Consistency is the key to success. Daily study and practice made all the difference.",
      topper2,
    ],
    [
      "Harshita Raturi",
      "97.2%",
      "Dream big, work hard, stay humble. Vani Vidya Mandir School shaped my journey.",
      topper3,
    ],
    [
      "Ananya Bhatt",
      "96.9%",
      "Dedication leads to achievement. I am grateful to my parents and teachers.",
      topper4,
    ],
  ],
  class12: [
    [
      "Archita Dobhal",
      "99.2%",
      "Excellence through dedication. The faculty at Vani Vidya Mandir made this possible.",
      topper5,
    ],
    [
      "Naveen Kandwal",
      "98.7%",
      "Stay focused and believe in yourself. The support system here is incredible.",
      topper6,
    ],
    [
      "Karan Chamoli",
      "98.1%",
      "Success is built on discipline. Every small effort counts in the long run.",
      topper7,
    ],
    [
      "Nisha Rawat",
      "97.5%",
      "Learning never stops. This school taught me to love the process of studying.",
      topper8,
    ],
  ],
};

export const facilities = [
  {
    title: "Smart Classrooms",
    image: schoolPhoto("photos1.jpg"),
    description:
      "Interactive classrooms with smart boards, digital content, and visual learning tools that make lessons more engaging and easier to understand.",
  },
  {
    title: "Science Laboratories",
    image: schoolPhoto("photos2.jpg"),
    description:
      "Modern laboratories encourage students to explore science through experiments, observation, practical demonstrations, and hands-on learning.",
  },
  {
    title: "Modern Library",
    image: schoolPhoto("6.jpg"),
    description:
      "A calm and resourceful library with books, reference material, and reading spaces that build curiosity, research skills, and imagination.",
  },
  {
    title: "Computer Lab",
    image: schoolPhoto("7.jpg"),
    description:
      "A technology-enabled lab where students learn computer basics, digital literacy, research skills, coding foundations, and safe internet practices.",
  },
  {
    title: "Sports Ground",
    image: schoolPhoto("unnamed (1).webp"),
    description:
      "Open sports spaces support fitness, discipline, teamwork, confidence, and participation in athletics, games, and outdoor activities.",
  },
];

export const testimonials = [
  [
    "Sunita Sharma",
    "Parent",
    "https://ui-avatars.com/api/?name=Sunita+Sharma&background=F3EFE6&color=014E4E&bold=true&size=200&font-size=0.40",
    "The school provides excellent academic guidance along with equal focus on values and activities. Teachers give personal attention, encourage confidence, and help students develop discipline, leadership, and a positive attitude toward learning.",
  ],
  [
    "Ananya Badoni",
    "Student",
    "https://ui-avatars.com/api/?name=Ananya+Badoni&background=E8F5E9&color=1B5E20&bold=true&size=200&font-size=0.40",
    "I enjoy the friendly learning environment and the way teachers explain every concept with patience. The activities, competitions, and classroom discussions have helped me become more confident and active in school life.",
  ],
  [
    "Manoj Bisht",
    "Parent",
    "https://ui-avatars.com/api/?name=Manoj+Bisht&background=E3F2FD&color=0D47A1&bold=true&size=200&font-size=0.40",
    "The faculty members are experienced, approachable, and supportive. They understand each child's potential and guide them carefully. We have seen strong improvement in our child's confidence, communication, discipline, and academic performance.",
  ],
  [
    "Kavita Rawat",
    "Alumni",
    "https://ui-avatars.com/api/?name=Kavita+Rawat&background=FFF3E0&color=E65100&bold=true&size=200&font-size=0.40",
    "The school gave me a strong foundation through academics, activities, and mentoring. Smart classrooms, supportive teachers, and a culture of curiosity helped me build independent thinking and prepare for future challenges.",
  ],
  [
    "Ramesh Pant",
    "Parent",
    "https://ui-avatars.com/api/?name=Ramesh+Pant&background=FCE4EC&color=880E4F&bold=true&size=200&font-size=0.40",
    "My daughter has grown tremendously in confidence and academic performance since joining Vani Vidya Mandir School. The teachers truly care about each student's progress and overall development.",
  ],
].map(([name, role, image, text]) => ({ name, role, image, text }));

export const achievements = [
  [
    "5,000+",
    "Students Enrolled",
    "users",
    galleryImage("g9.webp"),
    "md:col-span-2 md:row-span-2",
  ],
  ["25+", "Years Experience", "school", heroImg, ""],
  ["100%", "Board Results", "trend", galleryImage("g3.webp"), ""],
  ["200+", "Qualified Faculty", "teacher", chairmanImg, ""],
  ["50+", "National & State Awards", "award", yoga, "md:col-span-2"],
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
