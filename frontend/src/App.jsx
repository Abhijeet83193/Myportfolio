import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  Code2,
  History,
  FileText,
  GraduationCap,
  Mail,
  ExternalLink,
  Github,
  Linkedin,
  Instagram
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- Custom X Icon ---
const XIcon = ({ size = 20, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

// --- Generic Section Wrapper ---
const Section = ({ id, children, title }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.1 }}
      className="view-section"
      style={{
        minHeight: id === 'home' ? 'auto' : '65vh',
        padding: id === 'home' ? '0' : '60px 0'
      }}
    >
      {title && <h2 className="section-title">{title}</h2>}
      {children}
    </motion.section>
  );
};

const Quote = () => (
  <div className="quote-container two-col-layout" style={{ minHeight: 'calc(100vh - 100px)', padding: '0 5%' }}>
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.2 }}
      className="image-side"
    >
      <img src="/images/warrior.jpg" alt="Warrior Illustration" className="section-illustration" style={{ maxWidth: '650px' }} />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1 }}
      className="content-side"
      style={{ textAlign: 'center' }}
    >
      <h2 className="quote-text">बलिदान परम धर्म</h2>
      <p className="quote-author" style={{ color: '#8B4513' }}>"Sacrifice is supreme religion"</p>
    </motion.div>
  </div>
);

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Intro = () => (
  <div className="two-col-layout">
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="content-side"
    >
      <motion.h1 variants={textVariants} className="hero-title">Abhijeet Dhokne</motion.h1>

      <motion.h3 variants={textVariants} style={{ fontSize: '1.4rem', color: 'var(--primary)', fontWeight: '600', marginBottom: '1.2rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: '0.8rem' }}>
        Full Stack Web Developer
      </motion.h3>

      <motion.p variants={textVariants} className="hero-description" style={{ fontSize: '1.15rem', lineHeight: '1.7', color: 'var(--text-main)', marginBottom: '1.2rem', maxWidth: '600px' }}>
        I am a Computer Science student and a passionate developer focused on building efficient, scalable systems and engaging digital experiences.
      </motion.p>

      <motion.p variants={textVariants} style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-muted)', maxWidth: '600px' }}>
        My expertise lies in modern web architectures—particularly <strong>React</strong>, <strong>Node.js</strong>, and <strong>MongoDB</strong>.
        I love transforming creative ideas into optimized real-world applications while continuously sharpening my problem-solving skills through Data Structures and Algorithms.
      </motion.p>

      <div variants={textVariants} className="social-links" style={{ marginBottom: '2rem', marginTop: '2rem' }}>
        <a href="https://github.com/Abhijeet83193" className="social-icon-box github"><Github size={20} /></a>
        <a href="https://www.linkedin.com/in/abhijeet-dhokne-8644a32b3/" className="social-icon-box linkedin"><Linkedin size={20} /></a>
        <a href="https://x.com/Abhijeet_Dhokne" className="social-icon-box x-icon"><XIcon size={20} /></a>
        <a href="https://www.instagram.com/abhi.xiv.hz/" className="social-icon-box instagram"><Instagram size={20} /></a>
      </div>

      <a
        variants={textVariants}
        href="/resume/resume_1.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary"
        style={{ display: 'inline-block', padding: '1rem 2.5rem', borderRadius: '8px', fontSize: '1.1rem', textDecoration: 'none' }}
      >
        See my resume
      </a>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1 }}
      className="image-side"
    >
      <img src="/images/original-d2eee8c45af2c47792e18fc174bbdd5f.png" alt="Developer Illustration" className="section-illustration" style={{ mixBlendMode: 'multiply' }} />
    </motion.div>
  </div>
);

const WhatIDo = () => (
  <div className="two-col-layout reverse">
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1 }}
      className="image-side"
    >
      <img src="/images/architecture.png" alt="Architecture Illustration" className="section-illustration" />
    </motion.div>
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="content-side"
    >
      <motion.h2 variants={textVariants} className="section-sub-title">System Architecture</motion.h2>
      <div className="skill-bullets">
        <motion.div variants={textVariants} className="skill-item">
          <div className="skill-dot"></div>
          <div>
            <strong>Microservices Architecture:</strong>
            <p>Designed and implemented microservices for large-scale applications.</p>
          </div>
        </motion.div>
        <motion.div variants={textVariants} className="skill-item">
          <div className="skill-dot"></div>
          <div>
            <strong>Scalability & Performance:</strong>
            <p>Optimizing system performance and scalability including load balancing and caching.</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  </div>
);

const ModernDev = () => (
  <div className="two-col-layout">
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="content-side"
    >
      <motion.h2 variants={textVariants} className="section-sub-title">Modern Web Development</motion.h2>
      <div className="skill-bullets">
        <motion.div variants={textVariants} className="skill-item">
          <div className="skill-dot"></div>
          <div>
            <strong>Interactive UI/UX:</strong>
            <p>Creating dynamic, high-performance user interfaces with React and Framer Motion.</p>
          </div>
        </motion.div>
        <motion.div variants={textVariants} className="skill-item">
          <div className="skill-dot"></div>
          <div>
            <strong>State Management:</strong>
            <p>Efficiently managing application state for complex workflows and data-heavy apps.</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1 }}
      className="image-side"
    >
      <img src="/images/web_dev.jpg" alt="Modern Web Dev Illustration" className="section-illustration" />
    </motion.div>
  </div>
);

const Features = () => (
  <div className="features-grid">
    <motion.div whileHover={{ y: -10 }} className="feature-card">
      <div className="feature-icon"><Code2 size={40} /></div>
      <h3>Full Stack</h3>
      <p>Developing end-to-end solutions with modern tech stacks.</p>
    </motion.div>
    <motion.div whileHover={{ y: -10 }} className="feature-card">
      <div className="feature-icon"><Briefcase size={40} /></div>
      <h3>3+ Years</h3>
      <p>Experience in building scalable web applications.</p>
    </motion.div>
    <motion.div whileHover={{ y: -10 }} className="feature-card">
      <div className="feature-icon"><History size={40} /></div>
      <h3>Active</h3>
      <p>Always learning and exploring new technologies.</p>
    </motion.div>
  </div>
);

const PlaceholderContent = ({ title }) => (
  <div style={{ padding: '4rem', textAlign: 'center', width: '100%', background: 'rgba(0,0,0,0.02)', borderRadius: '20px' }}>
    <p style={{ fontSize: '1.2rem', opacity: 0.7 }}>Our {title} section is getting a creative makeover.</p>
  </div>
);

const MainLanding = () => {
  return (
    <div className="home-view">
      <Section id="home"><Quote /></Section>
      <Section id="intro"><Intro /></Section>
      <Section id="what-i-do" title="What I Do"><WhatIDo /></Section>
      <Section id="development"><ModernDev /></Section>
      <Section id="features"><Features /></Section>
      <Section id="education" title="Education"><PlaceholderContent title="Education" /></Section>
      <Section id="experience" title="Experience"><PlaceholderContent title="Experience" /></Section>
      <Section id="projects" title="Projects"><PlaceholderContent title="Projects" /></Section>
      <Section id="open-source" title="Open Source"><PlaceholderContent title="Open Source" /></Section>
      <Section id="blog" title="Blog"><PlaceholderContent title="Blog" /></Section>
      <Section id="contact" title="Contact Me"><PlaceholderContent title="Contact Me" /></Section>
    </div>
  );
};

const Header = () => {
  const [activePath, setActivePath] = useState(window.location.pathname);
  const isScrollingByNav = useRef(false);

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const handleIntersect = (entries) => {
      if (isScrollingByNav.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const path = id === 'home' ? '/' : `/${id}`;
          if (window.location.pathname !== path) {
            window.history.replaceState(null, '', path);
            setActivePath(path);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const navItems = [
    { label: 'Home', path: '/', targetId: 'home' },
    { label: 'Education', path: '/education', targetId: 'education' },
    { label: 'Experience', path: '/experience', targetId: 'experience' },
    { label: 'Projects', path: '/projects', targetId: 'projects' },
    { label: 'Open Source', path: '/open-source', targetId: 'open-source' },
    { label: 'Blog', path: '/blog', targetId: 'blog' },
    { label: 'Contact Me', path: '/contact', targetId: 'contact' }
  ];

  const handleNavClick = (e, item) => {
    e.preventDefault();
    isScrollingByNav.current = true;
    const element = document.getElementById(item.targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', item.path);
      setActivePath(item.path);
    }
    setTimeout(() => { isScrollingByNav.current = false; }, 1000);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <h1>Abhijeet Dhokne</h1>
        </div>
        <nav className="header-actions">
          <div className="action-buttons">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => handleNavClick(e, item)}
                className={activePath === item.path ? "nav-link-custom active" : "nav-link-custom"}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="*" element={<MainLanding />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
