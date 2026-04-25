import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Mail, Phone, Linkedin, Github, ExternalLink,
  GraduationCap, Code2, Database, Brain,
  MapPin, Award, Terminal, Cpu, Star, Zap,
  ArrowRight, Menu, X, ChevronDown, Briefcase,
} from 'lucide-react';
import {
  FaBrain, FaDatabase, FaMicrochip, FaBolt, FaCode, FaTerminal, FaGraduationCap, FaBriefcase, FaAward, FaEnvelope, FaPhone, FaLocationDot, FaLinkedin, FaGithub
} from 'react-icons/fa6';
import ChatBot from './components/ChatBot';
import HexBackground from './components/HexBackground';


/* ═══════════════════════════════════════════════════════════════
   TILT HOVER WRAPPER (3D EFFECT)
═══════════════════════════════════════════════════════════════ */

export const TiltWrapper = ({ children, perspective = 1000, scale = 1.02, tiltStrength = 15, className = '' }) => {
  return (
    <motion.div
      className={className}
      style={{
        perspective,
      }}
      whileHover={{ scale }}
    >
      <div className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};


/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */

const NAV_LINKS = ['About', 'Education', 'Projects', 'Skills', 'Contact'];

const ROLES = ['RAG Systems', 'LLM Agents', 'AI Pipelines', 'Full-Stack Apps'];

const TECH_STACK = [
  'Python', 'LangChain', 'FastAPI', 'RAG', 'LLMs',
  'AWS', 'PyTorch', 'Docker', 'PostgreSQL', 'Pinecone', 'Redis',
  'GPT-4', 'Claude', 'MCP', 'Elasticsearch', 'Node.js', 'Databricks',
];

const GITHUB = 'https://github.com/gnanadeepgudapati';
const LINKEDIN = 'https://www.linkedin.com/in/gnanadeepgudapati';
const EMAIL = 'gnanadeepgudapati@gmail.com';
const PHONE = '(405) 589-4911';

const PROJECTS = [
  {
    id: 1,
    title: 'Enterprise Agent Governance',
    subtitle: 'Multi-Agent Orchestration Platform',
    description:
      'Needed a way to govern 50+ enterprise AI agents across regulated industries. Built a production-grade platform with policy enforcement, audit trails, role-based access control, and intelligent LLM routing — delivering full observability over every agent action.',
    tags: ['FastAPI', 'LangChain', 'GPT-4', 'MCP', 'Docker', 'PostgreSQL', 'Python'],
    accentColor: '#FB923C',
    icon: FaBrain,
    highlight: '50+ agents governed',
    github: 'https://github.com/gnanadeepgudapati/Enterprise-Agent-Governance-Platform',
  },
  {
    id: 2,
    title: 'RAG Knowledge Assistant',
    subtitle: 'Enterprise Knowledge Retrieval System',
    description:
      'Enterprise teams struggled with slow, inaccurate document retrieval across large corpora. Designed a hybrid RAG platform using dense vector + BM25 search with Pinecone & Elasticsearch, achieving sub-100ms retrieval across millions of documents via a React conversational UI.',
    tags: ['Python', 'Pinecone', 'Elasticsearch', 'GPT-4', 'FastAPI', 'React'],
    accentColor: '#FB923C',
    icon: FaDatabase,
    highlight: '10x faster retrieval',
    github: 'https://github.com/gnanadeepgudapati/enterprise-knowledge-assistant',
  },
  {
    id: 3,
    title: 'AI Agent Framework',
    subtitle: 'Model Context Protocol Framework',
    description:
      'Existing agent frameworks lacked plug-and-play flexibility for enterprise routing. Built a modular MCP-based framework with dynamic tool registration, multi-turn context management, and Claude API integration — routing queries to HR, IT, and Facilities services automatically with GPT-4 as a fallback model.',
    tags: ['Python', 'MCP', 'Claude API', 'LangChain', 'FastAPI', 'Redis'],
    accentColor: '#FB923C',
    icon: FaMicrochip,
    highlight: 'Plug-and-play agents',
    github: 'https://github.com/gnanadeepgudapati/AI-Agent-Framework',
  },
];

const MORE_PROJECTS = [
  {
    id: 4,
    title: 'AI Evaluation Dashboard',
    subtitle: 'LLM-as-Judge Evaluation Pipeline',
    description:
      'Manual review of LLM outputs didn\'t scale. Built an evaluation pipeline using Groq\'s Llama 3.3 70B as a judge — scoring AI responses on groundedness, relevance, safety, and completeness. Results stored in SQLite and visualized on an interactive Chart.js dashboard.',
    tags: ['Python', 'FastAPI', 'Groq API', 'Llama 3.3', 'SQLite', 'Chart.js'],
    accentColor: '#FB923C',
    icon: FaBolt,
    highlight: '4-metric scoring',
    github: 'https://github.com/gnanadeepgudapati/AI-Evaluation-Dashboard',
  },
  {
    id: 5,
    title: 'RAG Journey',
    subtitle: 'From-Scratch RAG Implementation',
    description:
      'Wanted a ground-up understanding of retrieval-augmented generation beyond library abstractions. Implemented a basic RAG pipeline from scratch — document ingestion, embedding generation, vector search, and LLM-powered answer synthesis — as a learning-oriented reference project.',
    tags: ['Python', 'Embeddings', 'Vector Search', 'LLM', 'RAG'],
    accentColor: '#FB923C',
    icon: FaCode,
    highlight: 'From scratch',
    github: 'https://github.com/gnanadeepgudapati/rag-journey',
  },
  {
    id: 6,
    title: 'Developer Workflow Analytics',
    subtitle: 'Human-AI Interaction Research Platform',
    description:
      'Needed a reproducible research infrastructure to study how developers interact with LLM tools like Cursor, GitHub Copilot, and Claude. Built Flask REST APIs and React dashboards from scratch for real-time data collection and visualization across 200+ developer sessions.',
    tags: ['Python', 'Flask', 'React', 'REST APIs', 'NLP', 'Prompt Engineering'],
    accentColor: '#FB923C',
    icon: FaTerminal,
    highlight: '200+ sessions analyzed',
  },
  {
    id: 7,
    title: 'Research Data Pipeline',
    subtitle: 'Automated Session Analysis Pipeline',
    description:
      'Manual extraction from 50+ hours of developer session recordings was unsustainable. Built Python-based data pipelines that automated ~70% of the research workflow — transforming raw session recordings into structured, analyzable datasets for behavioral and productivity analysis.',
    tags: ['Python', 'Data Pipelines', 'NLP', 'Automation', 'Pandas'],
    accentColor: '#FB923C',
    icon: FaDatabase,
    highlight: '70% automation',
  },
  {
    id: 8,
    title: 'Adversarial Robust Safeguard',
    subtitle: 'Deep Facial Manipulation Detection',
    description:
      'Existing deepfake detection models failed under real-world noise conditions. Engineered a defense system using PyTorch and OpenCV that maintains high accuracy against Gaussian blurring and pixel perturbations — validated through rigorous adversarial testing with significant improvements over baseline models.',
    tags: ['PyTorch', 'TensorFlow', 'OpenCV', 'NumPy', 'Pandas', 'Matplotlib'],
    accentColor: '#FB923C',
    icon: FaMicrochip,
    highlight: 'Adversarial defense',
  },
  {
    id: 9,
    title: 'Financial Sentiment Analysis',
    subtitle: 'NLP-Powered Market Insight System',
    description:
      'Financial teams needed automated sentiment signals from news data. Built an end-to-end pipeline — fetching articles via News API, preprocessing with NLTK and TF-IDF, scoring sentiment with TextBlob, and classifying with RandomForest at 75% accuracy. Visualized trends with Seaborn for actionable market insights.',
    tags: ['Python', 'NLTK', 'TextBlob', 'Scikit-learn', 'Pandas', 'Seaborn', 'News API'],
    accentColor: '#FB923C',
    icon: FaBolt,
    highlight: '75% accuracy',
  },
  {
    id: 10,
    title: 'WebAtlas Data Explorer',
    subtitle: 'Full-Stack Global Data Visualization',
    description:
      'Needed a dynamic tool for managing and visualizing global country data. Built a full-stack app with real-time validation, partial-name search, and interactive bar/pie charts grouped by continent — using PHP/MySQL backend with AJAX for seamless asynchronous updates.',
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'AJAX'],
    accentColor: '#FB923C',
    icon: FaCode,
    highlight: 'Full-stack app',
  },
];

const SKILL_CATEGORIES = [
  {
    category: 'AI & GenAI',
    icon: FaBrain,
    accent: '#FB923C',
    skills: [
      'LLM Integration (GPT-4, Claude)',
      'RAG Systems',
      'LangChain',
      'Model Context Protocol (MCP)',
      'Prompt Engineering',
      'Pinecone / Milvus',
      'Hugging Face Transformers',
      'spaCy / NLP',
    ],
  },
  {
    category: 'Backend Development',
    icon: FaTerminal,
    accent: '#FB923C',
    skills: [
      'Python (FastAPI, Flask)',
      'RESTful Microservices',
      'Node.js',
      'API Design & Docs',
      'PostgreSQL / MongoDB',
      'Redis / Cassandra',
      'Elasticsearch',
      'WebSockets',
    ],
  },
  {
    category: 'Data & DevOps',
    icon: FaDatabase,
    accent: '#FB923C',
    skills: [
      'Databricks / Apache Spark',
      'Docker & Kubernetes',
      'CI/CD (GitHub Actions)',
      'AWS Cloud',
      'XGBoost / Random Forest',
      'Pandas / NumPy',
      'Tableau / Power BI',
      'MLOps / MLflow',
    ],
  },
];

const CERTS = [
  'AWS Certified Cloud Practitioner',
  'Python for Data Science',
  'Data Visualization in Power BI',
  'Business Analytics and Data Science',
  'Satellite Systems Engineering',
];

/* ═══════════════════════════════════════════════════════════════
   ANIMATION VARIANTS
═══════════════════════════════════════════════════════════════ */

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

/* ═══════════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════════ */

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [showName, setShowName] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Track hero name visibility
      const heroName = document.getElementById('hero-name');
      if (heroName) {
        const rect = heroName.getBoundingClientRect();
        setShowName(rect.bottom < 80);
      }

      const sections = NAV_LINKS.map((l) => l.toLowerCase());
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[rgba(37,37,37,0.25)] backdrop-blur-xl border-b border-white/40 shadow-lg shadow-[#545454]/5'
          : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => scrollTo('about')}
            className="flex items-center gap-3"
            aria-label="Go to top"
          >
            <img
              src="/gg-logo-purple.png"
              alt="GG"
              className="w-14 h-14 object-contain"
            />
            <AnimatePresence mode="wait">
              {showName && (
                <motion.span
                  key="nav-name"
                  initial={{ opacity: 0, x: -20, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: 'auto' }}
                  exit={{ opacity: 0, x: -20, width: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden whitespace-nowrap font-bold text-lg tracking-tight"
                  style={{
                    color: '#CFCFCF',
                  }}
                >
                  Gnanadeep Gudapati
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const id = link.toLowerCase();
              const isActive = activeSection === id;
              return (
                <button
                  key={link}
                  onClick={() => scrollTo(id)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 ${
                    isActive 
                      ? 'text-[#CFCFCF] bg-[rgba(37,37,37,0.50)] border border-[#7D7D7D] shadow-[0_4px_15px_rgba(0,0,0,0.3)]' 
                      : 'text-[#CFCFCF]/60 hover:text-[#CFCFCF] border border-transparent hover:border-[rgba(37,37,37,0.50)] hover:bg-[rgba(37,37,37,0.25)]'
                  }`}
                >
                  {link}
                </button>
              );
            })}
          </div>

          <a
            href={`mailto:${EMAIL}`}
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-[#CFCFCF] bg-transparent border border-[#545454] shadow-sm transition-all hover:bg-[#FB923C] hover:text-[#141413] hover:border-[#FB923C] hover:shadow-[0_8px_20px_rgba(251,146,60,0.4)] hover:scale-105"
          >
            <FaEnvelope size={15} /> Get in Touch
          </a>

          <button
            className="md:hidden p-2 text-[#7D7D7D]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[rgba(37,37,37,0.25)] backdrop-blur-xl border-t border-white/40 px-6 pb-6 pt-2"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              className="block w-full text-left py-3 text-[#CFCFCF]/60 hover:text-[#CFCFCF] text-sm font-medium"
            >
              {link}
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SECTION HEADER
═══════════════════════════════════════════════════════════════ */

const SectionHeader = ({ label, title, subtitle }) => (
  <motion.div variants={fadeInUp} className="mb-16 text-center">
    <span className="inline-block px-4 py-1.5 rounded-full bg-[#252525]/50 text-[#CFCFCF]/80 border border-[#545454]/50 text-xs font-semibold tracking-wider uppercase mb-4">
      {label}
    </span>
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#CFCFCF] font-[Poppins] leading-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-4 text-[#7D7D7D] max-w-xl mx-auto text-base">{subtitle}</p>
    )}
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════ */

const Hero = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timeout;
    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    } else {
      timeout = setTimeout(
        () => setDisplayText(currentRole.substring(0, isDeleting ? displayText.length - 1 : displayText.length + 1)),
        isDeleting ? 40 : 80,
      );
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  const firstName = 'Gnanadeep';
  const lastName = 'Gudapati.';

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden"
    >
      {/* Desktop image — absolutely positioned, right half of viewport */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="hidden lg:flex absolute right-0 top-0 bottom-0 w-1/2 items-center justify-center"
      >
        <TiltWrapper tiltStrength={20} perspective={1000} scale={1.05}>
          <img
            src="/profile.png"
            alt="Gnanadeep Gudapati"
            className="w-full h-auto max-h-[85vh] object-cover"
            style={{
              mixBlendMode: 'multiply',
              maskImage: 'linear-gradient(to bottom, black 60%, transparent 82%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 82%)',
            }}
          />
        </TiltWrapper>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={stagger}
            className="relative z-10"
          >
            {/* Available badge */}
            <motion.div variants={fadeInUp} className="mb-5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#252525]/80 border border-[#252525]/60 text-sm text-[#CFCFCF] font-medium">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FB923C] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FB923C]" />
                </span>
                Open for Full-Time & Intern Positions
              </span>
            </motion.div>

            {/* Name — outlined first name, solid last name, staggered per letter */}
            <motion.h1
              id="hero-name"
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight flex flex-wrap"
            >
              <span className="inline-block hero-name-outlined mr-4">
                {firstName.split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
              <span className="inline-block text-[#CFCFCF]">
                {lastName.split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + (firstName.length + i) * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            <motion.div
              variants={fadeInUp}
              className="mt-3 h-1 w-20 rounded-full"
              style={{ background: '#252525' }}
            />

            {/* Typewriter role switcher */}
            <motion.div variants={fadeInUp} className="mt-5 text-lg sm:text-xl text-[#7D7D7D] font-medium">
              <span>I build </span>
              <span className="text-[#FB923C] font-semibold">{displayText}</span>
              <span className="animate-blink text-[#545454] font-light ml-0.5">|</span>
            </motion.div>

            {/* Stat pills */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 mt-5">
              {[
                { emoji: '\u26A1', label: 'RAG & LLM' },
                { emoji: '\uD83D\uDD27', label: 'Python Full Stack' },
                { emoji: '\uD83D\uDCCD', label: 'Missouri S&T' },
              ].map(({ emoji, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[rgba(37,37,37,0.25)] backdrop-blur-sm border border-[#545454] text-sm font-medium text-[#7D7D7D]"
                >
                  <span>{emoji}</span> {label}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 mt-7">
              <TiltWrapper tiltStrength={25} scale={1.05}>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#141413] px-6 py-3 rounded-full bg-[#FB923C] border border-[#FB923C] transition-all shadow-[0_10px_25px_rgba(251,146,60,0.25)] hover:shadow-[0_15px_35px_rgba(251,146,60,0.45)] hover:-translate-y-0.5"
                >
                  View My Work <ArrowRight size={15} />
                </a>
              </TiltWrapper>
              <TiltWrapper tiltStrength={25} scale={1.05}>
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#7D7D7D] px-6 py-3 rounded-full bg-[rgba(37,37,37,0.30)] border border-[#545454] backdrop-blur-md shadow-[0_8px_20px_rgba(0,0,0,0.2)] hover:border-[#7D7D7D] hover:text-[#CFCFCF] hover:bg-[rgba(255,255,255,0.07)] hover:shadow-[0_15px_30px_rgba(37,37,37,0.15)] transition-all"
                >
                  Download Resume
                </a>
              </TiltWrapper>
            </motion.div>

            {/* Smaller social icons */}
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mt-5">
              {[
                { icon: FaGithub, href: GITHUB },
                { icon: FaLinkedin, href: LINKEDIN },
                { icon: FaEnvelope, href: `mailto:${EMAIL}` },
                { icon: FaPhone, href: `tel:${PHONE}` },
              ].map(({ icon: Icon, href }, i) => (
                <TiltWrapper key={i} tiltStrength={30} scale={1.15}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[rgba(37,37,37,0.25)] backdrop-blur-sm border border-[#545454] flex items-center justify-center text-[#7D7D7D] shadow-[0_5px_15px_rgba(0,0,0,0.08)] hover:text-[#FB923C] hover:border-[rgba(251,146,60,0.5)] hover:bg-[rgba(37,37,37,0.30)] hover:shadow-[0_10px_25px_rgba(251,146,60,0.4)] transition-all duration-300"
                  >
                    <Icon size={16} />
                  </a>
                </TiltWrapper>
              ))}
            </motion.div>
          </motion.div>

          {/* Mobile image only */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative flex justify-center lg:hidden"
          >
            <TiltWrapper className="relative w-80 sm:w-96" tiltStrength={15} scale={1.02}>
              <img
                src="/profile.png"
                alt="Gnanadeep Gudapati"
                className="w-full rounded-4xl object-cover"
                style={{
                  mixBlendMode: 'multiply',
                  maskImage: 'linear-gradient(to bottom, black 60%, transparent 82%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 82%)',
                }}
              />
            </TiltWrapper>
          </motion.div>
        </div>
      </div>
    </section>
  );
};



/* ═══════════════════════════════════════════════════════════════
   EDUCATION
═══════════════════════════════════════════════════════════════ */

const Education = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="education" ref={ref} className="py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger}>
          <SectionHeader label="Education" title="Academic Background" subtitle="My educational journey and certifications" />

          {/* Top row — MS + GRA side by side */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Master's Degree */}
            <motion.div variants={fadeInUp} className="h-full">
              <TiltWrapper tiltStrength={12} scale={1.02} className="h-full">
                <div className="group h-full p-6 rounded-2xl bg-[rgba(37,37,37,0.25)] backdrop-blur-sm border border-[#545454] shadow-[0_5px_15px_rgba(0,0,0,0.05)] hover:bg-[rgba(37,37,37,0.25)] hover:shadow-[0_20px_40px_rgba(37,37,37,0.15)] transition-all duration-300 transform-style-3d cursor-default">
                  <div className="flex items-center gap-4 mb-4" style={{ transform: 'translateZ(20px)' }}>
                    <div className="w-12 h-12 rounded-xl bg-[#FB923C]/10 flex items-center justify-center group-hover:bg-[#FB923C]/20 transition-colors">
                      <FaGraduationCap size={22} className="text-[#FB923C]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#CFCFCF]">Master's in Information Technology</h3>
                      <p className="text-sm text-[#FB923C] font-medium">Missouri University of Science and Technology</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#7D7D7D] mb-3" style={{ transform: 'translateZ(10px)' }}>
                    <span className="flex items-center gap-1"><MapPin size={12} /> Rolla, Missouri</span>
                    <span>Aug 2023 — May 2025</span>
                  </div>
                  <ul className="space-y-2 text-sm text-[#7D7D7D] leading-relaxed" style={{ transform: 'translateZ(15px)' }}>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0 mt-1.5" />
                      Focused on AI/ML, RAG systems, and scalable backend architectures
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0 mt-1.5" />
                      Coursework in NLP, distributed systems, and cloud computing
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0 mt-1.5" />
                      Built production-grade LLM and RAG pipeline projects
                    </li>
                  </ul>
                </div>
              </TiltWrapper>
            </motion.div>

            {/* Graduate Research Assistant */}
            <motion.div variants={fadeInUp} className="h-full">
              <TiltWrapper tiltStrength={12} scale={1.02} className="h-full">
                <div className="group h-full p-6 rounded-2xl bg-[rgba(37,37,37,0.25)] backdrop-blur-sm border border-[#545454] shadow-[0_5px_15px_rgba(0,0,0,0.05)] hover:bg-[rgba(37,37,37,0.25)] hover:shadow-[0_20px_40px_rgba(37,37,37,0.15)] transition-all duration-300 transform-style-3d cursor-default">
                  <div className="flex items-center gap-4 mb-4" style={{ transform: 'translateZ(20px)' }}>
                    <div className="w-12 h-12 rounded-xl bg-[#FB923C]/10 flex items-center justify-center group-hover:bg-[#FB923C]/20 transition-colors">
                      <FaBriefcase size={22} className="text-[#FB923C]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#CFCFCF]">Graduate Research Assistant</h3>
                      <p className="text-sm text-[#FB923C] font-medium">Missouri S&T — Human-AI Interaction</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#7D7D7D] mb-3" style={{ transform: 'translateZ(10px)' }}>
                    <span className="flex items-center gap-1"><MapPin size={12} /> Rolla, Missouri</span>
                    <span>Dec 2025 — Present</span>
                  </div>
                  <ul className="space-y-2 text-sm text-[#7D7D7D] leading-relaxed" style={{ transform: 'translateZ(15px)' }}>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0 mt-1.5" />
                      Researching how developers interact with LLM-powered tools (Cursor, GitHub Copilot, Claude)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0 mt-1.5" />
                      Extracted data from 200+ developer sessions, capturing behavioral and productivity signals
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0 mt-1.5" />
                      Built Python pipelines automating ~70% of the research workflow across 50+ hours of recordings
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0 mt-1.5" />
                      Developed Flask REST APIs for real-time data collection, storage, and visualization
                    </li>
                  </ul>
                </div>
              </TiltWrapper>
            </motion.div>
          </div>

          {/* Bottom row — Certifications (full width) */}
          <motion.div variants={fadeInUp} className="mt-6">
            <TiltWrapper tiltStrength={8} scale={1.01}>
              <div className="p-6 rounded-2xl bg-[rgba(37,37,37,0.25)] backdrop-blur-sm border border-[#545454] shadow-[0_5px_15px_rgba(0,0,0,0.05)] hover:bg-[rgba(37,37,37,0.25)] hover:shadow-[0_15px_30px_rgba(37,37,37,0.15)] transition-all duration-300 transform-style-3d">
                <div className="flex items-center gap-3 mb-4" style={{ transform: 'translateZ(15px)' }}>
                  <div className="w-10 h-10 rounded-xl bg-[#FB923C]/10 flex items-center justify-center">
                    <FaAward size={20} className="text-[#FB923C]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#CFCFCF]">Certifications</h3>
                </div>
                <div className="flex flex-wrap gap-3" style={{ transform: 'translateZ(20px)' }}>
                  {CERTS.map((c) => (
                    <span
                      key={c}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#252525]/80 text-sm text-[#7D7D7D] border border-[#252525]/50"
                    >
                      <Star size={12} className="text-amber-400 flex-shrink-0" />
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </TiltWrapper>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════
   PROJECT CARD
═══════════════════════════════════════════════════════════════ */

const ProjectCard = ({ project }) => {
  const { title, subtitle, description, tags, accentColor, icon: Icon, highlight, github } = project;

  return (
    <motion.div variants={fadeInUp} className="h-full">
      <TiltWrapper tiltStrength={8} scale={1.02} className="h-full">
        <div className="group relative h-full flex flex-col p-6 rounded-2xl bg-[rgba(37,37,37,0.25)] backdrop-blur-sm border border-[#545454] shadow-[0_5px_15px_rgba(0,0,0,0.05)] hover:bg-[rgba(37,37,37,0.25)] hover:shadow-[0_20px_40px_rgba(37,37,37,0.15)] transition-all duration-300 transform-style-3d text-left cursor-default">
          <div className="h-1 w-12 rounded-full mb-5 transition-all duration-300" style={{ background: accentColor, transform: 'translateZ(10px)' }} />

          <div className="flex items-center justify-between mb-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-300"
              style={{ background: `${accentColor}18`, transform: 'translateZ(20px)' }}
            >
              <Icon size={20} style={{ color: accentColor }} />
            </div>
            {highlight && (
              <span
                className="text-[11px] font-semibold px-3 py-1 rounded-full"
                style={{ background: `${accentColor}15`, color: accentColor, transform: 'translateZ(25px)' }}
              >
                {highlight}
              </span>
            )}
          </div>

          <h3 className="text-lg font-bold text-[#CFCFCF]" style={{ transform: 'translateZ(30px)' }}>{title}</h3>
          <p className="text-sm font-medium mt-0.5" style={{ color: accentColor, transform: 'translateZ(25px)' }}>
            {subtitle}
          </p>
          <p className="text-sm text-[#7D7D7D] leading-relaxed mt-3 flex-grow" style={{ transform: 'translateZ(10px)' }}>{description}</p>

          <div className="flex flex-wrap gap-2 mt-4" style={{ transform: 'translateZ(20px)' }}>
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-[rgba(37,37,37,0.25)] text-[#7D7D7D] border border-[#545454]"
              >
                {tag}
              </span>
            ))}
          </div>

          {github && (
            <div className="mt-5 relative z-20">
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#CFCFCF] px-5 py-2.5 rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.1)] transition-all duration-200 hover:scale-105 hover:shadow-[0_10px_25px_rgba(124,58,237,0.3)] hover:brightness-110"
                style={{ background: `linear-gradient(135deg, ${accentColor}, #252525)` }}
              >
                <Github size={14} /> View on GitHub
              </a>
            </div>
          )}
        </div>
      </TiltWrapper>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   PROJECTS SECTION
═══════════════════════════════════════════════════════════════ */

const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [showMore, setShowMore] = useState(false);

  return (
    <section id="projects" ref={ref} className="py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger}>
          <SectionHeader label="Portfolio" title="Featured Projects" subtitle="A selection of my recent engineering work" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>

          {/* Expanded projects */}
          <AnimatePresence>
            {showMore && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={stagger}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
                >
                  {MORE_PROJECTS.map((p) => (
                    <ProjectCard key={p.id} project={p} />
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* See More / Show Less toggle */}
          {MORE_PROJECTS.length > 0 && (
            <motion.div variants={fadeInUp} className="mt-10 text-center">
              <button
                onClick={() => setShowMore((prev) => !prev)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#7D7D7D] hover:text-[#252525] transition-all duration-300 px-6 py-2.5 rounded-full border border-[#545454] bg-[rgba(37,37,37,0.25)] backdrop-blur-sm hover:bg-[rgba(37,37,37,0.25)] hover:shadow-lg hover:shadow-[#545454]/10"
              >
                {showMore ? 'Show Less' : 'See More Projects'}
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${showMore ? 'rotate-180' : ''}`}
                />
              </button>
            </motion.div>
          )}

          <motion.div variants={fadeInUp} className="mt-12 text-center">
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#7D7D7D] hover:text-[#252525] transition-colors"
            >
              View All Projects on GitHub <ArrowRight size={15} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SKILLS
═══════════════════════════════════════════════════════════════ */

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" ref={ref} className="py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger}>
          <SectionHeader label="Skills" title="Technical Expertise" subtitle="Technologies and tools I work with" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center max-w-5xl mx-auto">
            {SKILL_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <motion.div key={cat.category} variants={fadeInUp} className="h-full">
                  <TiltWrapper tiltStrength={15} scale={1.03} className="h-full">
                    <div className="h-full p-6 rounded-2xl bg-[rgba(37,37,37,0.25)] backdrop-blur-sm border border-[#545454] shadow-[0_5px_15px_rgba(0,0,0,0.05)] hover:bg-[rgba(37,37,37,0.25)] hover:shadow-[0_15px_30px_rgba(37,37,37,0.15)] transition-all duration-300 transform-style-3d">
                      <div
                        className="w-11 h-11 mx-auto rounded-xl flex items-center justify-center mb-4 transition-colors"
                        style={{ background: `${cat.accent}18`, transform: 'translateZ(20px)' }}
                      >
                        <Icon size={20} style={{ color: cat.accent }} />
                      </div>
                      <h3 className="font-bold text-center text-[#CFCFCF] mb-3" style={{ transform: 'translateZ(25px)' }}>{cat.category}</h3>
                      <ul className="space-y-1.5" style={{ transform: 'translateZ(10px)' }}>
                        {cat.skills.map((s) => (
                          <li key={s} className="flex items-start gap-2 text-sm text-[#7D7D7D]">
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                              style={{ background: cat.accent }}
                            />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TiltWrapper>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════════════════════════ */

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" ref={ref} className="py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger}>
          <SectionHeader label="Contact" title="Let's Connect" subtitle="Actively seeking Full-Time Software Engineering or AI Engineering roles — open to relocation." />

          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
            {/* Left — info card */}
            <motion.div
              variants={fadeInUp}
              className="p-8 rounded-2xl bg-[rgba(37,37,37,0.25)] backdrop-blur-sm border border-[#545454]"
            >
              <h3 className="text-lg font-bold text-[#CFCFCF] mb-1">Get in Touch</h3>
              <p className="text-sm text-[#7D7D7D] leading-relaxed mb-6">
                Whether it's a role, a project collaboration, or just a conversation about AI and engineering — I'd love to hear from you.
              </p>

              <div className="space-y-4">
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#FB923C]/10 group-hover:bg-[#FB923C]/20 transition-colors">
                    <FaEnvelope size={18} className="text-[#FB923C]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#7D7D7D] font-medium">Email</p>
                    <p className="text-sm text-[#7D7D7D] group-hover:text-[#FB923C] transition-colors">{EMAIL}</p>
                  </div>
                </a>

                <a href={`tel:${PHONE.replace(/[^+\d]/g, '')}`} className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#FB923C]/10 group-hover:bg-[#FB923C]/20 transition-colors">
                    <FaPhone size={18} className="text-[#FB923C]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#7D7D7D] font-medium">Phone</p>
                    <p className="text-sm text-[#7D7D7D] group-hover:text-[#FB923C] transition-colors">{PHONE}</p>
                  </div>
                </a>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#FB923C]/10">
                    <FaLocationDot size={18} className="text-[#FB923C]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#7D7D7D] font-medium">Location</p>
                    <p className="text-sm text-[#7D7D7D]">Rolla, Missouri — Open to relocation</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right — CTA card */}
            <motion.div
              variants={fadeInUp}
              className="p-8 rounded-2xl border border-[#545454] text-center flex flex-col items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.06), rgba(236,72,153,0.06))' }}
            >
              <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-5"
                style={{ background: 'linear-gradient(135deg, #FB923C22, #FB923C22)' }}
              >
                <FaEnvelope size={28} style={{ color: '#FB923C' }} />
              </div>
              <p className="text-sm text-[#7D7D7D] mb-6 leading-relaxed">
                Drop me an email or connect on LinkedIn — I typically respond within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                <a
                  href={`mailto:${EMAIL}`}
                  className="w-full inline-flex items-center justify-center gap-2 text-sm font-semibold text-[#141413] px-6 py-3 rounded-full shadow-lg shadow-[rgba(251,146,60,0.2)] transition-all hover:scale-105 hover:shadow-xl"
                  style={{ background: '#FB923C' }}
                >
                  <FaEnvelope size={15} /> Send an Email
                </a>
                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 text-sm font-semibold text-[#141413] px-6 py-3 rounded-full shadow-lg shadow-[rgba(251,146,60,0.2)] transition-all hover:scale-105 hover:shadow-xl bg-[#FB923C]"
                >
                  <FaLinkedin size={15} /> LinkedIn
                </a>
              </div>
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full inline-flex items-center justify-center gap-2 text-sm font-semibold text-[#7D7D7D] px-6 py-3 rounded-full border border-[#545454] bg-[rgba(37,37,37,0.25)] hover:bg-[rgba(37,37,37,0.25)] transition-all hover:scale-105 hover:text-[#CFCFCF] hover:border-[#FB923C]"
              >
                <FaGithub size={15} /> GitHub
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════ */

const Footer = () => (
  <footer className="py-12 border-t border-white/40">
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[#7D7D7D] font-mono">
          &copy; {new Date().getFullYear()} Gnanadeep Gudapati
        </p>
        <p className="text-xs text-[#7D7D7D] font-mono">
          React &middot; Tailwind &middot; Framer Motion &middot; Vite
        </p>
        <div className="flex items-center gap-4">
          {[
            { icon: FaGithub, href: GITHUB },
            { icon: FaLinkedin, href: LINKEDIN },
            { icon: FaEnvelope, href: `mailto:${EMAIL}` },
          ].map(({ icon: Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7D7D7D] hover:text-[#FB923C] hover:scale-110 transition-all duration-200"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

/* ═══════════════════════════════════════════════════════════════
   APP
═══════════════════════════════════════════════════════════════ */

export default function App() {
  return (
    <div
      className="relative min-h-screen overflow-x-hidden text-[#CFCFCF] selection:bg-[#545454]/30 selection:text-[#CFCFCF]/70"
    >
      {/* 1+2. Three.js 3D hex floor — handles its own background colour & canvas */}
      <HexBackground />

      {/* 3. UI Plane */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Education />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
        <ChatBot />
      </div>
    </div>
  );
}

