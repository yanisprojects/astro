import { Language, Program, Translation, Testimonial } from './types';

export const TRANSLATIONS: Record<Language, Translation> = {
  fr: {
    nav_home: "Accueil",
    nav_programs: "Nos Offres",
    nav_about: "À propos",
    nav_contact: "Contact",
    hero_title: "L'Excellence Académique en Europe à Votre Portée",
    hero_subtitle: "Un accompagnement premium de l'orientation jusqu'à l'obtention du visa.",
    cta_explore: "Découvrir les offres",
    cta_whatsapp: "Contact WhatsApp",
    stats_students: "Étudiants accompagnés",
    stats_visas: "Taux de réussite",
    stats_satisfaction: "Satisfaction Client",
    why_title: "L'Expérience AstroVisa",
    why_mentoring: "Coaching Personnalisé",
    why_strategy: "Stratégie d'Admission",
    why_files: "Dossiers en Béton",
    why_visa: "Expertise Visa",
    programs_title: "Nos Destinations Exclusives",
    form_title: "Concrétisez votre projet",
    form_name: "Nom complet",
    form_email: "Email professionnel",
    form_phone: "Numéro de téléphone",
    form_country: "Pays de résidence",
    form_program: "Programme souhaité",
    form_message: "Votre projet en quelques mots",
    form_submit: "Demander une consultation gratuite",
    form_success: "Demande reçue. Un consultant vous contactera sous 24h.",
    footer_rights: "Tous droits réservés.",
    apply_now: "Postuler maintenant",
    requirements: "Pré-requis",
    eligibility: "Critères d'éligibilité",
    timeline: "Chronologie de la procédure",
    admin_login: "Accès Consultant",
    admin_password: "Mot de passe",
    admin_dashboard: "Tableau de bord",
    admin_no_leads: "Aucun prospect en attente.",
    admin_export: "Exporter les données",
    process_title: "Votre Parcours vers la Réussite",
    process_step1: "Audit & Stratégie",
    process_step1_desc: "Analyse approfondie de votre profil académique et définition des objectifs.",
    process_step2: "Optimisation & Candidature",
    process_step2_desc: "Constitution rigoureuse du dossier et soumission aux universités cibles.",
    process_step3: "Finalisation & Visa",
    process_step3_desc: "Accompagnement complet pour les démarches consulaires et l'installation.",
    faq_title: "Questions Fréquentes",
    testimonials_title: "La réussite de nos étudiants",
    program_benefits: "Avantages Clés",
    program_cost: "Frais de scolarité",
    program_deadline: "Date limite",
    program_specialties: "Filières Disponibles",
    view_details: "Voir les détails"
  },
  en: {
    nav_home: "Home",
    nav_programs: "Our Offers",
    nav_about: "About",
    nav_contact: "Contact",
    hero_title: "Academic Excellence in Europe Within Reach",
    hero_subtitle: "Premium guidance from career counseling to visa approval.",
    cta_explore: "Discover Offers",
    cta_whatsapp: "WhatsApp Support",
    stats_students: "Students Guided",
    stats_visas: "Success Rate",
    stats_satisfaction: "Client Satisfaction",
    why_title: "The AstroVisa Experience",
    why_mentoring: "Personalized Coaching",
    why_strategy: "Admission Strategy",
    why_files: "Solid Applications",
    why_visa: "Visa Expertise",
    programs_title: "Our Exclusive Destinations",
    form_title: "Make it happen",
    form_name: "Full Name",
    form_email: "Email Address",
    form_phone: "Phone Number",
    form_country: "Country of Residence",
    form_program: "Preferred Program",
    form_message: "Briefly describe your project",
    form_submit: "Request Free Consultation",
    form_success: "Request received. A consultant will contact you within 24h.",
    footer_rights: "All rights reserved.",
    apply_now: "Apply Now",
    requirements: "Prerequisites",
    eligibility: "Eligibility Criteria",
    timeline: "Application Timeline",
    admin_login: "Consultant Access",
    admin_password: "Password",
    admin_dashboard: "Dashboard",
    admin_no_leads: "No pending leads.",
    admin_export: "Export Data",
    process_title: "Your Path to Success",
    process_step1: "Audit & Strategy",
    process_step1_desc: "In-depth analysis of your academic profile and goal setting.",
    process_step2: "Optimization & Application",
    process_step2_desc: "Rigorous file preparation and submission to target universities.",
    process_step3: "Finalization & Visa",
    process_step3_desc: "Complete support for consular procedures and relocation.",
    faq_title: "Frequently Asked Questions",
    testimonials_title: "Student Success Stories",
    program_benefits: "Key Benefits",
    program_cost: "Tuition Fees",
    program_deadline: "Deadline",
    program_specialties: "Available Majors",
    view_details: "View Details"
  },
  ar: {
    nav_home: "الرئيسية",
    nav_programs: "الوجهات الدراسية",
    nav_about: "من نحن",
    nav_contact: "اتصل بنا",
    hero_title: "بوابتك نحو التميز الأكاديمي في أوروبا",
    hero_subtitle: "خدمات استشارية للنخبة. نرافقك خطوة بخطوة من التوجيه الأكاديمي حتى الحصول على التأشيرة.",
    cta_explore: "تصفح البرامج",
    cta_whatsapp: "تواصل عبر واتساب",
    stats_students: "طالب تم توجيههم",
    stats_visas: "نسبة قبول الملفات",
    stats_satisfaction: "نسبة رضا العملاء",
    why_title: "لماذا تختار AstroVisa؟",
    why_mentoring: "توجيه أكاديمي متخصص",
    why_strategy: "استراتيجيات قبول مضمونة",
    why_files: "معالجة احترافية للملفات",
    why_visa: "خبرة قانونية في التأشيرات",
    programs_title: "وجهاتنا الحصرية",
    form_title: "ابدأ رحلة النجاح",
    form_name: "الاسم الكامل",
    form_email: "البريد الإلكتروني",
    form_phone: "رقم الهاتف (مع الرمز)",
    form_country: "دولة الإقامة",
    form_program: "البرنامج الأكاديمي",
    form_message: "نبذة عن مؤهلاتك وطموحك",
    form_submit: "طلب استشارة مجانية",
    form_success: "تم استلام طلبك. سيتواصل معك مستشار أكاديمي خلال 24 ساعة.",
    footer_rights: "جميع الحقوق محفوظة.",
    apply_now: "قدّم طلبك الآن",
    requirements: "شروط التقديم",
    eligibility: "معايير القبول",
    timeline: "الجدول الزمني",
    admin_login: "دخول المستشارين",
    admin_password: "كلمة المرور",
    admin_dashboard: "لوحة التحكم",
    admin_no_leads: "لا توجد طلبات جديدة.",
    admin_export: "تصدير البيانات",
    process_title: "خارطة طريقك نحو القبول",
    process_step1: "التقييم والتخطيط الاستراتيجي",
    process_step1_desc: "تحليل دقيق للملف الأكاديمي وبناء خطة تقديم مخصصة تضمن أعلى فرص القبول.",
    process_step2: "إعداد الملف والتقديم",
    process_step2_desc: "صياغة احترافية للملفات ورسائل التحفيز ومراسلة الجامعات المرموقة.",
    process_step3: "التأشيرة وإجراءات السفر",
    process_step3_desc: "مرافقة شاملة في الإجراءات القنصلية لضمان الحصول على التأشيرة بسلاسة.",
    faq_title: "الأسئلة الشائعة",
    testimonials_title: "قصص نجاح طلابنا",
    program_benefits: "مزايا البرنامج",
    program_cost: "الرسوم الدراسية",
    program_deadline: "الموعد النهائي",
    program_specialties: "التخصصات المتاحة",
    view_details: "عرض التفاصيل الكاملة"
  },
};

export const TESTIMONIALS: Testimonial[] = [
    {
        id: '1',
        name: 'Amine Benali',
        role: { fr: 'Master à Paris', en: 'Master in Paris', ar: 'ماجستير - باريس' },
        content: {
            fr: "L'équipe AstroVisa a transformé mon projet flou en une admission concrète. Leur expertise sur Parcoursup est indéniable.",
            en: "The AstroVisa team turned my vague plan into a concrete admission. Their expertise on Parcoursup is undeniable.",
            ar: "حول فريق AstroVisa طموحي الدراسي إلى واقع ملموس. خبرتهم العميقة في إجراءات القبول الفرنسية كانت العامل الحاسم في نجاحي."
        },
        image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        id: '2',
        name: 'Sarah Khelif',
        role: { fr: 'Boursière en Roumanie', en: 'Scholar in Romania', ar: 'منحة دراسية - رومانيا' },
        content: {
            fr: "Je pensais que les bourses étaient inaccessibles. Ils ont monté un dossier si solide que j'ai été acceptée du premier coup.",
            en: "I thought scholarships were out of reach. They built such a strong file that I was accepted on the first try.",
            ar: "كنت أعتقد أن الحصول على منحة أمر مستحيل، لكن بفضل دقة تجهيزهم للملف وقوة رسالة التغطية، تم قبولي من المحاولة الأولى."
        },
        image: "https://randomuser.me/api/portraits/women/44.jpg"
    }
];

export const PROGRAMS: Program[] = [
  {
    id: '1',
    slug: 'paris-saclay',
    flag: 'https://flagcdn.com/w320/fr.png',
    country: { fr: 'France', en: 'France', ar: 'فرنسا' },
    title: {
      fr: 'Université Paris-Saclay',
      en: 'Paris-Saclay University',
      ar: 'جامعة باريس ساكلي'
    },
    shortDescription: {
      fr: 'Rejoignez le Top 15 mondial (Classement Shanghai).',
      en: 'Join the World Top 15 (Shanghai Ranking).',
      ar: 'فرصة استثنائية للالتحاق بواحدة من أفضل 15 جامعة عالمياً (تصنيف شنغهاي).'
    },
    longDescription: {
        fr: "L'Université Paris-Saclay est une référence mondiale d'excellence académique. C'est l'opportunité d'étudier dans un environnement de recherche de pointe.",
        en: "Paris-Saclay University is a global reference for academic excellence. It is an opportunity to study in a cutting-edge research environment.",
        ar: "تُعد جامعة باريس ساكلي منارة عالمية للتميز الأكاديمي والبحثي. إنها بوابتك للدراسة في بيئة علمية متطورة تفتح لك آفاقاً مهنية عالمية."
    },
    image: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&w=800&q=80',
    deadline: '16/03/2026',
    cost: {
        fr: "250€ / an (Frais universitaires)",
        en: "250€ / year (University fees)",
        ar: "250 يورو سنوياً (رسوم حكومية مدعمة)"
    },
    ageRequirement: {
        fr: "Pas de condition d'âge",
        en: "No age limit",
        ar: "لا يوجد شرط للسن"
    },
    languageRequirement: {
        fr: "TCF requis après acceptation",
        en: "TCF needed after acceptance",
        ar: "شهادة اللغة (TCF) مطلوبة بعد القبول المبدئي"
    },
    importantNote: {
        icon: "⚠️",
        variant: "warning",
        text: {
            fr: "Obligatoire : Deux (2) lettres de recommandation de professeurs référents.",
            en: "Mandatory: Two (2) recommendation letters from reference professors.",
            ar: "متطلب أساسي: يجب توفر رسالتي (2) توصية أكاديمية من أساتذة مراجع لتعزيز الملف."
        }
    },
    timeline: [
        { title: { fr: "Recherche de formation", en: "Program Research", ar: "دراسة الخيارات المتاحة" } },
        { title: { fr: "Préparation et envoi du dossier", en: "Prep & Submission", ar: "إعداد الملف والتقديم" }, date: "16 March" },
        { title: { fr: "Attente réponse université", en: "Wait for Response", ar: "مرحلة المعالجة والرد" } },
        { title: { fr: "Entretien Campus France", en: "Campus France Interview", ar: "مقابلة كامبوس فرانس" } },
        { title: { fr: "Procédure Visa", en: "Visa Procedure", ar: "إجراءات التأشيرة" } },
        { title: { fr: "Départ en France", en: "Departure", ar: "السفر والاستقرار" } }
    ],
    benefits: {
        fr: ["Frais réduits (250€/an)", "Université prestigieuse", "Pas de TCF pour postuler"],
        en: ["Low fees (250€/yr)", "Prestigious University", "No TCF to apply"],
        ar: ["رسوم دراسية رمزية (250 يورو)", "جامعة مصنفة عالمياً", "التقديم متاح دون شرط اللغة المسبق"]
    },
    details: {
      overview: {
        fr: "Paris-Saclay offre un accès exceptionnel aux laboratoires de recherche et aux entreprises partenaires.",
        en: "Paris-Saclay offers exceptional access to research laboratories and partner companies.",
        ar: "توفر الجامعة وصولاً حصرياً لمختبرات بحثية متطورة وشبكة علاقات واسعة مع كبرى الشركات الأوروبية."
      },
      eligibility: {
        fr: ["Baccalauréat ou Licence", "Relevés de notes excellents", "2 Lettres de recommandation"],
        en: ["High School or Bachelor", "Excellent transcripts", "2 Reference Letters"],
        ar: ["شهادة البكالوريا أو الليسانس", "سجل أكاديمي متميز", "رسالتي توصية أكاديمية"]
      },
      documents: {
        fr: ["Passeport", "CV & Lettre de motivation", "Diplômes traduits"],
        en: ["Passport", "CV & Motivation Letter", "Translated Diplomas"],
        ar: ["جواز السفر الساري", "السيرة الذاتية ورسالة التحفيز", "الشهادات وكشوف النقاط المترجمة"]
      }
    },
    faqs: [
        {
            question: { fr: "Le logement est-il garanti ?", en: "Is housing guaranteed?", ar: "هل السكن الجامعي مضمون؟" },
            answer: { fr: "Non, mais l'université aide.", en: "No, but the uni assists.", ar: "الجامعة تقدم دعماً كبيراً في البحث عن سكن، لكنه ليس مضموناً تلقائياً." }
        }
    ]
  },
  {
    id: '2',
    slug: 'parcoursup',
    flag: 'https://flagcdn.com/w320/fr.png',
    country: { fr: 'France', en: 'France', ar: 'فرنسا' },
    title: {
      fr: 'Parcoursup (BTS & CPGE)',
      en: 'Parcoursup (BTS & CPGE)',
      ar: 'منصة باركور سوب (BTS)'
    },
    shortDescription: {
      fr: 'Formations courtes et professionnalisantes. Idéal nouveaux bacheliers.',
      en: 'Short vocational training. Ideal for new graduates.',
      ar: 'مسارات مهنية تطبيقية قصيرة المدى. الخيار الأمثل لحديثي التخرج من الثانوية.'
    },
    longDescription: {
        fr: "Parcoursup est la voie royale pour intégrer des BTS et des formations courtes en France. C'est un système compétitif mais très ouvert aux étudiants sérieux.",
        en: "Parcoursup is the main route for BTS and short courses in France. A competitive but open system for serious students.",
        ar: "تُعد منصة باركور سوب البوابة الرسمية للالتحاق بتخصصات BTS والتكوينات المهنية في فرنسا. نظام تنافسي يفتح آفاقاً واسعة للطلاب الجادين الباحثين عن الاندماج المهني السريع."
    },
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    deadline: '12/03/2026',
    cost: {
        fr: "Gratuit (Établissements publics)",
        en: "Free (Public institutions)",
        ar: "مجانية (في المؤسسات الحكومية)"
    },
    ageRequirement: {
        fr: "Pas de limite (Préférence nouveaux bacheliers)",
        en: "No limit (New grads preferred)",
        ar: "مفتوح (الأفضلية لحاملي البكالوريا الجدد)"
    },
    timeline: [
        { title: { fr: "Préparation et envoi dossier", en: "Prep & Submission", ar: "تجهيز وتقديم الملف" }, date: "12 March" },
        { title: { fr: "Réponse des instituts", en: "Institutes Response", ar: "مرحلة القبول والردود" }, date: "Juin / June" },
        { title: { fr: "Entretien Campus France", en: "Campus France Interview", ar: "مقابلة كامبوس فرانس" } },
        { title: { fr: "Procédure Visa", en: "Visa Procedure", ar: "إجراءات التأشيرة" } },
        { title: { fr: "Départ en France", en: "Departure", ar: "السفر إلى فرنسا" } }
    ],
    benefits: {
        fr: ["Formation Gratuite", "Diplôme d'État", "Insertion pro rapide"],
        en: ["Free Training", "State Diploma", "Quick job insertion"],
        ar: ["دراسة مجانية بالكامل", "شهادة دولة معتمدة", "فرص توظيف عالية وسريعة"]
    },
    specialties: [
        {
            name: { fr: "Industrie & Génie", en: "Industry & Engineering", ar: "الصناعة والهندسة" },
            icon: "🔧",
            items: {
                fr: [
                    "BTS Architectures en Métal",
                    "BTS Assistance technique d'ingénieur",
                    "BTS Aéronautique",
                    "BTS Bâtiment",
                    "BTS Conception de produits industriels",
                    "BTS Conception et Réalisation de Systèmes Automatiques",
                    "BTS Conception et industrialisation en microtechniques",
                    "BTS Construction et aménagement de véhicules",
                    "BTS Contrôle industriel et régulation automatique",
                    "BTS Fonderie",
                    "BTS Forge",
                    "BTS Industries céramiques",
                    "BTS Maintenance des systèmes (Production)",
                    "BTS Maintenance des systèmes (Energétique)",
                    "BTS Maintenance des véhicules",
                    "BTS Motorisations toutes énergies",
                    "BTS Traitement des matériaux",
                    "BTS Travaux publics",
                    "BTS Systèmes constructifs bois et habitat"
                ],
                en: [
                    "BTS Metal Architecture",
                    "BTS Engineering Assistance",
                    "BTS Aeronautics",
                    "BTS Building",
                    "BTS Industrial Product Design",
                    "BTS Auto Systems Design",
                    "BTS Microtechniques",
                    "BTS Vehicle Construction",
                    "BTS Industrial Control",
                    "BTS Foundry",
                    "BTS Forge",
                    "BTS Ceramic Industries",
                    "BTS Systems Maintenance (Production)",
                    "BTS Systems Maintenance (Energy)",
                    "BTS Vehicle Maintenance",
                    "BTS Motorization",
                    "BTS Material Treatment",
                    "BTS Public Works",
                    "BTS Wood Construction"
                ],
                ar: [
                    "BTS عمارة وهياكل معدنية",
                    "BTS مساعدة تقنية للمهندس",
                    "BTS الطيران وتكنولوجيا الفضاء",
                    "BTS البناء والتشييد",
                    "BTS تصميم المنتجات الصناعية",
                    "BTS تصميم وإنجاز الأنظمة الآلية",
                    "BTS التقنيات الدقيقة",
                    "BTS تصنيع وتجهيز المركبات",
                    "BTS التحكم الصناعي والتنظيم الآلي",
                    "BTS السباكة الصناعية",
                    "BTS الحدادة الصناعية",
                    "BTS الصناعات الخزفية",
                    "BTS صيانة أنظمة الإنتاج",
                    "BTS صيانة أنظمة الطاقة",
                    "BTS صيانة المركبات",
                    "BTS المحركات وأنظمة الطاقة",
                    "BTS معالجة المواد",
                    "BTS الأشغال العمومية",
                    "BTS أنظمة البناء الخشبي"
                ]
            }
        },
        {
            name: { fr: "Électricité & Énergie", en: "Electricity & Energy", ar: "الكهرباء والطاقة" },
            icon: "⚡",
            items: {
                fr: [
                    "BTS Electrotechnique",
                    "BTS Fluide, énergie, domotique (Génie climatique)",
                    "BTS Fluide, énergie, domotique (Froid)",
                    "BTS Fluide, énergie, domotique (Domotique)",
                    "BTS Environnement nucléaire",
                    "BTS Photonique"
                ],
                en: [
                    "BTS Electrotechnics",
                    "BTS Fluid Energy (Climate)",
                    "BTS Fluid Energy (Cold)",
                    "BTS Fluid Energy (Domotics)",
                    "BTS Nuclear Environment",
                    "BTS Photonics"
                ],
                ar: [
                    "BTS الهندسة الكهربائية",
                    "BTS هندسة التكييف والطاقة",
                    "BTS التبريد والتكييف الصناعي",
                    "BTS الأتمتة والمباني الذكية",
                    "BTS البيئة النووية",
                    "BTS الفوتونيات والضوئيات"
                ]
            }
        },
        {
            name: { fr: "Informatique & Cybersécurité", en: "IT & Cybersecurity", ar: "المعلوماتية والأمن السيبراني" },
            icon: "💻",
            items: {
                fr: [
                    "BTS Cybersécurité (Informatique et réseaux)",
                    "BTS Cybersécurité (Electronique et réseaux)",
                    "BTS Services informatiques aux organisations"
                ],
                en: [
                    "BTS Cybersecurity (IT & Networks)",
                    "BTS Cybersecurity (Electronics & Networks)",
                    "BTS IT Services for Organizations"
                ],
                ar: [
                    "BTS الأمن السيبراني (نظم وشبكات)",
                    "BTS الأمن السيبراني (إلكترونيات)",
                    "BTS الخدمات المعلوماتية للمؤسسات (SIO)"
                ]
            }
        },
        {
            name: { fr: "Laboratoire & Biologie", en: "Lab & Biology", ar: "المختبرات والعلوم الحيوية" },
            icon: "🧪",
            items: {
                fr: [
                    "BTS Bioanalyses en laboratoire de contrôle",
                    "BTS Biologie médicale",
                    "BTS Bioqualité",
                    "BTS Biotechnologie",
                    "BTS Diététique et nutrition",
                    "BTS Métiers de la chimie",
                    "BTS Métiers de l'eau",
                    "BTS Pilotage des procédés",
                    "BTS Services à l'environnement"
                ],
                en: [
                    "BTS Bioanalysis",
                    "BTS Medical Biology",
                    "BTS Bioquality",
                    "BTS Biotechnology",
                    "BTS Dietetics",
                    "BTS Chemistry Trades",
                    "BTS Water Trades",
                    "BTS Process Piloting",
                    "BTS Environmental Services"
                ],
                ar: [
                    "BTS التحاليل البيولوجية والمخبرية",
                    "BTS البيولوجيا الطبية",
                    "BTS الجودة الحيوية",
                    "BTS التكنولوجيا الحيوية",
                    "BTS التغذية والحمية",
                    "BTS مهن الكيمياء",
                    "BTS مهن ومعالجة المياه",
                    "BTS قيادة العمليات الصناعية",
                    "BTS الخدمات البيئية"
                ]
            }
        },
        {
            name: { fr: "Commerce, Gestion & Droit", en: "Business, Management & Law", ar: "الأعمال، الإدارة والقانون" },
            icon: "🏢",
            items: {
                fr: [
                    "BTS Assurance",
                    "BTS Banque",
                    "BTS Collaborateur juriste notarial",
                    "BTS Commerce International",
                    "BTS Comptabilité et gestion",
                    "BTS Conseil et commercialisation de solutions techniques",
                    "BTS Gestion de la PME",
                    "BTS Gestion transports et logistique",
                    "BTS Management Commercial Opérationnel",
                    "BTS Négociation et digitalisation client",
                    "BTS Professions immobilières",
                    "BTS Support à l'action managériale",
                    "BTS Technico-commercial"
                ],
                en: [
                    "BTS Insurance",
                    "BTS Banking",
                    "BTS Notarial Legal Assistant",
                    "BTS International Trade",
                    "BTS Accounting and Management",
                    "BTS Technical Solutions Sales",
                    "BTS SME Management",
                    "BTS Transport & Logistics",
                    "BTS Operational Commercial Management",
                    "BTS Negotiation & Client Digitalization",
                    "BTS Real Estate Professions",
                    "BTS Managerial Support",
                    "BTS Technical Sales"
                ],
                ar: [
                    "BTS التأمين وإدارة المخاطر",
                    "BTS الخدمات المصرفية",
                    "BTS المساعد القانوني",
                    "BTS التجارة الدولية",
                    "BTS المحاسبة والتسيير المالي",
                    "BTS تسويق الحلول التقنية",
                    "BTS إدارة المؤسسات الصغيرة والمتوسطة",
                    "BTS النقل والخدمات اللوجستية",
                    "BTS الإدارة التجارية التشغيلية",
                    "BTS التفاوض والرقمنة التجارية",
                    "BTS المهن العقارية",
                    "BTS الدعم الإداري",
                    "BTS التقني التجاري"
                ]
            }
        },
        {
            name: { fr: "Communication & Audiovisuel", en: "Communication & Audiovisual", ar: "الإعلام والسمعي البصري" },
            icon: "🎨",
            items: {
                fr: [
                    "BTS Communication",
                    "BTS Edition",
                    "BTS Projet de communication",
                    "BTS Métiers de l’audiovisuel (Production)",
                    "BTS Métiers de l’audiovisuel (Montage)",
                    "BTS Métiers de l’audiovisuel (Image)",
                    "BTS Métiers de l’audiovisuel (Son)",
                    "BTS Métiers de l’audiovisuel (Equipements)",
                    "BTS Photographie"
                ],
                en: [
                    "BTS Communication",
                    "BTS Publishing",
                    "BTS Communication Project",
                    "BTS Audiovisual (Production)",
                    "BTS Audiovisual (Editing)",
                    "BTS Audiovisual (Image)",
                    "BTS Audiovisual (Sound)",
                    "BTS Audiovisual (Equipment)",
                    "BTS Photography"
                ],
                ar: [
                    "BTS الاتصال والإعلام",
                    "BTS النشر والطباعة",
                    "BTS مشاريع الاتصال",
                    "BTS الإنتاج السمعي البصري",
                    "BTS المونتاج",
                    "BTS التصوير",
                    "BTS هندسة الصوت",
                    "BTS التجهيزات السمعية البصرية",
                    "BTS التصوير الفوتوغرافي"
                ]
            }
        },
        {
            name: { fr: "Services, Social & Tourisme", en: "Services, Social & Tourism", ar: "الخدمات، المجتمع والسياحة" },
            icon: "🏨",
            items: {
                fr: [
                    "BTS Economie sociale familiale",
                    "BTS Hôtellerie restauration",
                    "BTS Sécurité",
                    "BTS Services sanitaires et sociaux",
                    "BTS Tourisme"
                ],
                en: [
                    "BTS Social Family Economy",
                    "BTS Hotel & Catering",
                    "BTS Security",
                    "BTS Health & Social Services",
                    "BTS Tourism"
                ],
                ar: [
                    "BTS الاقتصاد الاجتماعي والأسري",
                    "BTS الفندقة والمطاعم",
                    "BTS الأمن والسلامة",
                    "BTS الخدمات الصحية والاجتماعية",
                    "BTS السياحة والسفر"
                ]
            }
        },
        {
            name: { fr: "Santé & Esthétique", en: "Health & Aesthetics", ar: "الصحة والتجميل" },
            icon: "💄",
            items: {
                fr: [
                    "BTS Esthétique cosmétique",
                    "BTS Coiffure",
                    "BTS Opticien",
                    "BTS Orthoprothésiste",
                    "BTS Podo-orthésiste",
                    "BTS Prothésiste dentaire"
                ],
                en: [
                    "BTS Cosmetic Aesthetics",
                    "BTS Hairdressing",
                    "BTS Optician",
                    "BTS Orthoprosthetist",
                    "BTS Pedorthist",
                    "BTS Dental Prosthetist"
                ],
                ar: [
                    "BTS التجميل ومستحضرات التجميل",
                    "BTS فنون الحلاقة",
                    "BTS البصريات والنظارات",
                    "BTS الأطراف الصناعية",
                    "BTS تقويم العظام",
                    "BTS صناعة الأسنان"
                ]
            }
        }
    ],
    details: {
      overview: {
        fr: "Plus de 40 spécialités disponibles. Les BTS sont très appréciés par les recruteurs.",
        en: "Over 40 specialties available. BTS degrees are highly valued by recruiters.",
        ar: "أكثر من 40 تخصص دقيق متاح. شهادات BTS تحظى بطلب مرتفع جداً في سوق العمل الأوروبي."
      },
      eligibility: {
        fr: ["Baccalauréat (Nouveau ou Ancien)", "Bulletin scolaire correct", "Motivation"],
        en: ["High School Diploma", "Decent grades", "Motivation"],
        ar: ["شهادة البكالوريا (حديثة أو قديمة)", "سجل دراسي مقبول", "دافعية قوية للتعلم"]
      },
      documents: {
        fr: ["Relevés de notes", "Passeport", "CV & Lettre de motivation"],
        en: ["Transcripts", "Passport", "CV & Motivation Letter"],
        ar: ["كشوف النقاط", "جواز السفر", "السيرة الذاتية والرسالة التحفيزية"]
      }
    },
    faqs: [
        {
            question: { fr: "Peut-on travailler après ?", en: "Can we work after?", ar: "هل يمكن العمل مباشرة بعد التخرج؟" },
            answer: { fr: "Oui, ou continuer en Licence Pro.", en: "Yes, or continue to Pro License.", ar: "نعم، الشهادة مؤهلة للعمل المباشر، أو يمكن إكمال سنة إضافية (ليسانس مهني)." }
        }
    ]
  },
  {
    id: '3',
    slug: 'romania-scholarship',
    flag: 'https://flagcdn.com/w320/ro.png',
    country: { fr: 'Roumanie', en: 'Romania', ar: 'رومانيا' },
    title: {
      fr: 'Bourse Gouvernementale Roumanie',
      en: 'Romanian Govt Scholarship',
      ar: 'منحة الحكومة الرومانية الممولة'
    },
    shortDescription: {
      fr: 'Bourse complète (Frais + Logement + Argent de poche).',
      en: 'Full Scholarship (Tuition + Housing + Stipend).',
      ar: 'منحة شاملة تغطي كافة المصاريف: الدراسة، السكن، وراتب شهري.'
    },
    longDescription: {
        fr: "Le programme de bourses offert par l'État roumain est l'un des plus généreux en Europe pour les étudiants étrangers.",
        en: "The scholarship program offered by the Romanian state is one of the most generous in Europe for foreign students.",
        ar: "يعد برنامج المنح الحكومية الرومانية واحداً من أكثر البرامج سخاءً وتميزاً في أوروبا للطلاب الدوليين، حيث يضمن استقراراً مادياً وأكاديمياً."
    },
    image: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=800&q=80',
    deadline: '31/03/2026',
    cost: {
        fr: "100% Pris en charge",
        en: "100% Covered",
        ar: "تمويل كامل (0 تكاليف دراسية)"
    },
    languageRequirement: {
        fr: "Année préparatoire de langue incluse",
        en: "Preparatory language year included",
        ar: "سنة تحضيرية لدراسة اللغة متضمنة ومجانية"
    },
    timeline: [
        { title: { fr: "Préparation dossier", en: "File Prep", ar: "تجهيز المستندات" } },
        { title: { fr: "Soumission candidature", en: "Submission", ar: "تقديم الطلب رسمياً" }, date: "31 March" },
        { title: { fr: "Analyse Ministère AE", en: "MFA Analysis", ar: "مراجعة وزارة الخارجية" } },
        { title: { fr: "Analyse Ministère Education", en: "Min. Edu Analysis", ar: "مراجعة وزارة التعليم" } },
        { title: { fr: "Annonce résultats", en: "Results", ar: "إعلان النتائج النهائية" }, date: "Juillet / July" },
        { title: { fr: "Procédure Visa", en: "Visa", ar: "إصدار التأشيرة" } }
    ],
    benefits: {
        fr: ["Frais scolarité offerts", "Logement gratuit (Cité U)", "Allocation mensuelle (65€-85€)"],
        en: ["Free Tuition", "Free Housing (Dorms)", "Monthly Stipend (65€-85€)"],
        ar: ["إعفاء كامل من الرسوم", "سكن جامعي مجاني", "منحة شهرية للمعيشة (65-85 يورو)"]
    },
    importantNote: {
        icon: "🗣️",
        variant: "info",
        text: {
            fr: "Langue : Licence/Master en Roumain (Année prépa offerte). Doctorat possible en Anglais.",
            en: "Language: Bachelor/Master in Romanian (Prep year free). PhD possible in English.",
            ar: "لغة الدراسة: الرومانية لليسانس والماستر (سنة تحضيرية مجانية). الدكتوراه متاحة باللغة الإنجليزية."
        }
    },
    details: {
      overview: {
        fr: "La bourse finance les frais de scolarité, l'hébergement et offre une aide financière mensuelle.",
        en: "The scholarship finances tuition fees, accommodation, and provides monthly financial aid.",
        ar: "تغطي المنحة كافة نفقات التسجيل، توفر السكن في الإقامات الجامعية، وتمنح راتباً شهرياً للمساعدة في المعيشة."
      },
      eligibility: {
        fr: ["Citoyen hors-UE", "Excellents résultats", "Dossier complet"],
        en: ["Non-EU Citizen", "Excellent grades", "Complete file"],
        ar: ["جنسية من خارج الاتحاد الأوروبي", "نتائج دراسية متميزة", "ملف إداري متكامل"]
      },
      documents: {
        fr: ["Actes état civil traduits", "Diplômes certifiés", "Formulaire MAE"],
        en: ["Translated Civil Acts", "Certified Diplomas", "MFA Form"],
        ar: ["وثائق الحالة المدنية المترجمة", "الشهادات المصدقة", "استمارة وزارة الخارجية"]
      }
    },
    faqs: [
        {
            question: { fr: "Le billet d'avion est-il inclus ?", en: "Is flight included?", ar: "هل تذكرة السفر مشمولة؟" },
            answer: { fr: "Non, le transport est à votre charge.", en: "No, transport is on you.", ar: "لا، مصاريف تذكرة السفر يتحملها الطالب." }
        }
    ]
  },
];