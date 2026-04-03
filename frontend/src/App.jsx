import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
  BookOpen,
  Smile,
  Trophy,
  Rocket,
  Cpu,
  Award,
  Globe,
  Menu,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Contact from './components/Contact';

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
const Section = ({ id, children, title, subtitle, description }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: false, amount: 0.1 }}
      className="view-section"
      style={{
        minHeight: id === 'home' ? 'auto' : '65vh',
        padding: id === 'home' ? '0' : '60px 0'
      }}
    >
      {title && (
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '3rem',
              fontWeight: 900,
              color: 'var(--army-olive)',
              marginBottom: '0.5rem',
              letterSpacing: '-0.02em'
            }}
          >
            {title}
          </motion.h2>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              style={{
                fontSize: '0.8rem',
                color: 'var(--primary)',
                fontWeight: '700',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}
            >
              {subtitle}
            </motion.p>
          )}

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.45, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            style={{
              width: '50px',
              height: '2px',
              background: 'var(--army-olive)',
              margin: '0 auto 1.25rem'
            }}
          />

          {description && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              style={{
                fontSize: '1.05rem',
                lineHeight: '1.7',
                color: 'var(--text-muted)',
                maxWidth: '550px',
                margin: '0 auto'
              }}
            >
              {description}
            </motion.p>
          )}
        </div>
      )}
      {children}
    </motion.section>
  );
};

const GITHUB_USERNAME = 'Abhijeet83193';

const Terminal = () => {
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCommits = async () => {
    try {
      // Use the events endpoint to get all public activity directly
      const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=15`);
      
      if (!response.ok) {
        if (response.status === 403) throw new Error('API Rate Limit exceeded (try again later)');
        throw new Error('Activity fetch failed');
      }
      
      const events = await response.json();
      
      // Filter only PushEvents (which contain commits)
      const pushEvents = events.filter(e => e.type === 'PushEvent');
      
      if (pushEvents.length === 0) {
        setError('No recent public git activity found');
        setLoading(false);
        return;
      }

      // Extract commits from push events
      const allCommits = [];
      pushEvents.forEach(event => {
        const repoName = event.repo.name.split('/')[1];
        if (event.payload && event.payload.commits) {
          event.payload.commits.forEach(commit => {
            allCommits.push({
              id: commit.sha,
              sha: commit.sha.substring(0, 7),
              message: commit.message.split('\n')[0],
              author: commit.author?.name || 'Abhijeet',
              date: new Date(event.created_at),
              url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
              repo: repoName,
              type: 'commit'
            });
          });
        }
      });

      // Limit to last 10 and reverse for terminal style (newest at bottom)
      const finalCommits = allCommits.slice(0, 10).reverse();
      
      if (finalCommits.length > 0) {
        finalCommits[finalCommits.length - 1].type = 'active';
      }

      setCommits(finalCommits);
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error('Error fetching activity:', err);
      setError(err.message || 'Unable to load activity');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommits();
    // Refresh every 2 minutes
    const interval = setInterval(fetchCommits, 120000);
    return () => clearInterval(interval);
  }, []);

  const getTimeAgo = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  return (
    <div
      className="terminal-window"
      style={{
        background: '#1e1e1e',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        maxWidth: '900px',
        width: '100%',
        fontFamily: 'Monaco, Consolas, "Courier New", monospace'
      }}
    >
      <div className="terminal-header" style={{
        background: 'linear-gradient(180deg, #323232 0%, #1e1e1e 100%)',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        borderBottom: '1px solid #333'
      }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#27c93f', fontSize: '8px' }}>●</span>
          <span style={{ color: '#888', fontSize: '12px' }}>
            {commits.length > 0 ? `Last seen: ${getTimeAgo(commits[commits.length - 1].date)}` : 'No commits'}
          </span>
        </div>
      </div>
      <div className="terminal-body" style={{
        padding: '20px',
        minHeight: '250px',
        maxHeight: '300px',
        overflowY: 'auto',
        scrollbarWidth: 'thin',
        scrollbarColor: '#4a4a4a #1e1e1e'
      }}
        css={`{
        &::-webkit-scrollbar {
          width: 6px;
        }
        &::-webkit-scrollbar-track {
          background: #1e1e1e;
        }
        &::-webkit-scrollbar-thumb {
          background: #4a4a4a;
          border-radius: 3px;
        }
        &::-webkit-scrollbar-thumb:hover {
          background: #5a5a5a;
        }
      }`}
      >
        <div style={{ color: '#27c93f', marginBottom: '16px', fontSize: '14px' }}>
          <span style={{ color: '#5af78e' }}>➜</span>
          <span style={{ color: '#5af78e', marginLeft: '8px' }}>~</span>
          <span style={{ color: '#fff', marginLeft: '8px' }}>git log --oneline --graph --all</span>
        </div>

        {loading && (
          <div style={{ color: '#6a6a6a', fontSize: '13px', textAlign: 'center', padding: '40px 0' }}>
            Loading commits...
          </div>
        )}

        {error && (
          <div style={{ color: '#ff5f56', fontSize: '13px', textAlign: 'center', padding: '40px 0' }}>
            {error}
          </div>
        )}

        {!loading && !error && commits.map((commit, index) => (
          <motion.div
            key={commit.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              marginBottom: '12px',
              fontSize: '13px',
              lineHeight: '1.5'
            }}
          >
            <span style={{
              color: commit.type === 'active' ? '#ff5f56' : '#5af78e',
              fontWeight: commit.type === 'active' ? 'bold' : 'normal'
            }}>
              {commit.type === 'active' ? '●' : '○'}
            </span>
            <div style={{ flex: 1 }}>
              <a
                href={commit.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#c6c6c6', textDecoration: 'none' }}
                title={commit.message}
              >
                <span style={{ color: '#5af78e', marginRight: '8px' }}>{commit.sha}</span>
                <span style={{ color: '#ffbd2e', marginRight: '8px' }}>[{commit.repo}]</span>
                {commit.message}
              </a>
              <div style={{ color: '#6a6a6a', marginTop: '4px', fontSize: '11px' }}>
                <span style={{ color: '#888' }}>{commit.author}</span>
                <span style={{ marginLeft: '12px' }}>{getTimeAgo(commit.date)}</span>
              </div>
            </div>
          </motion.div>
        ))}

        {!loading && !error && (
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '20px',
              color: '#5af78e',
              fontSize: '14px'
            }}
          >
            <span style={{ color: '#5af78e' }}>➜</span>
            <span style={{ color: '#5af78e' }}>~</span>
            <span style={{ width: '8px', height: '18px', background: '#5af78e' }}></span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const TypewriterText = ({ text, delay = 50, className, startDelay = 0, resetKey = 0 }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed('');
    let index = 0;

    const startTimeout = setTimeout(() => {
      const typeInterval = setInterval(() => {
        if (index < text.length) {
          index++;
          setDisplayed(text.slice(0, index));
        } else {
          clearInterval(typeInterval);
        }
      }, delay);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
    };
  }, [text, delay, startDelay, resetKey]);

  return <span className={className}>{displayed}</span>;
};

const Quote = ({ homeKey }) => (
  <div className="hero-section">
    <div className="hero-grid">
      {/* LEFT SIDE - Robot Mascot + Greeting */}
      <motion.div
        className="hero-left"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
      >
        <div className="robot-container">
          <DotLottieReact
            src="https://lottie.host/39d6c4e7-3644-4c21-a229-39dcf70032ae/gAZ9iS1rgE.lottie"
            loop
            autoplay
            className="robot-animation"
          />
        </div>
      </motion.div>

      {/* RIGHT SIDE - Intro Text + Terminal */}
      <motion.div
        className="hero-right"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Top: Main Intro Text */}
        <div className="hero-intro">
          <h1 className="hero-name">Hey, I'm <span className="highlight">GOJO</span> 👋</h1>
          <p className="hero-tagline">
            <TypewriterText text="Loading awesome experiences..." delay={60} startDelay={500} resetKey={homeKey} />
          </p>
        </div>

        {/* Bottom: Terminal */}
        <motion.div
          className="hero-terminal-wrapper"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <Terminal />
        </motion.div>
      </motion.div>
    </div>
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
      viewport={{ once: false, amount: 0.3 }}
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
        <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="social-icon-box google"><Globe size={20} /></a>
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
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 1 }}
      className="image-side"
    >
      <img src={`${import.meta.env.BASE_URL}images/original-d2eee8c45af2c47792e18fc174bbdd5f.png`} alt="Developer Illustration" className="section-illustration" style={{ mixBlendMode: 'multiply' }} />
    </motion.div>
  </div>
);

const WhatIDo = () => {
  const items = [
    {
      title: "Building Full-Stack Web Applications",
      icon: "🌐",
      description: "Creating scalable and modern web applications from frontend to backend. I specialize in building complete solutions using React for dynamic frontends and Node.js with MongoDB for robust backend systems. From conceptualization to deployment, I ensure seamless integration across all layers of the application stack.",
      image: `${import.meta.env.BASE_URL}images/fullstack_illustration.jpg`,
      reverse: true,
      type: "image"
    },
    {
      title: "Crafting Modern User Interfaces",
      icon: "🎨",
      description: "Designing clean, responsive, and user-friendly interfaces for better user experience. I leverage modern frameworks like React combined with Framer Motion to create engaging, animated experiences. Every interface is meticulously crafted with accessibility and performance in mind, ensuring users enjoy smooth interactions across all devices.",
      image: `${import.meta.env.BASE_URL}images/backend_illustration.jpg`,
      reverse: false,
      type: "image"
    },
    {
      title: "Developing Scalable Backend Systems",
      icon: "⚙️",
      description: "Building secure APIs and backend services that power web applications. I design RESTful APIs, implement proper authentication & authorization, and optimize database queries for performance. My focus is on creating maintainable, scalable architectures that can handle growing user bases and complex business logic.",
      image: "https://lottie.host/f8c0c124-34c7-4040-b09b-5757f953d9fc/29YuJKcSoq.lottie",
      reverse: true,
      type: "lottie"
    }
  ];

  return (
    <div className="what-i-do-container" style={{ display: 'flex', flexDirection: 'column', gap: '6rem', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      {items.map((item, index) => (
        <div key={index} className={`two-col-layout ${item.reverse ? 'reverse' : ''}`} style={{ minHeight: 'auto', padding: '0', width: '100%' }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="content-side"
          >
            <motion.h2 variants={textVariants} className="section-sub-title" style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '2.5rem' }}>{item.icon}</span> {item.title}
            </motion.h2>
            <motion.p variants={textVariants} style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
              {item.description}
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: item.reverse ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 1 }}
            className="image-side"
          >
            {item.type === "lottie" ? (
              <div style={{ width: '100%', maxWidth: '650px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <DotLottieReact
                  src={item.image}
                  loop
                  autoplay
                  style={{ width: '100%', height: 'auto', maxWidth: '650px' }}
                />
              </div>
            ) : (
              <img src={item.image} alt={item.title} className="section-illustration" style={{ maxWidth: '650px' }} />
            )}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

const ModernDev = () => (
  <div className="two-col-layout">
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
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
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 1 }}
      className="image-side"
    >
      <img src={`${import.meta.env.BASE_URL}images/web_dev.jpg`} alt="Modern Web Dev Illustration" className="section-illustration" />
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
      <h3>2+ Years</h3>
      <p>Experience in building scalable web applications.</p>
    </motion.div>
    <motion.div whileHover={{ y: -10 }} className="feature-card">
      <div className="feature-icon"><History size={40} /></div>
      <h3>Active</h3>
      <p>Always learning and exploring new technologies.</p>
    </motion.div>
  </div>
);

const Education = () => {
  const coursework = [
    "Data Structures & Algorithms",
    "Web Development",
    "Database Management",
    "Operating Systems",
    "Object-Oriented Programming",
    "Computer Networks"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: false, amount: 0.1 }}
      style={{ width: '100%', maxWidth: '1000px' }}
    >
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
        style={{
          background: 'rgba(114, 125, 115, 0.05)',
          borderRadius: '24px',
          padding: '3rem',
          border: '1px solid var(--border-soft)',
          transition: 'all 0.15s ease-out',
          cursor: 'pointer'
        }}
        className="education-card"
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(53, 66, 48, 0.15)';
          e.currentTarget.style.borderColor = 'var(--primary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.borderColor = 'var(--border-soft)';
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '2rem' }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{
              width: '110px',
              height: '110px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              overflow: 'hidden',
              borderRadius: '12px'
            }}
          >
            <img
              src={`${import.meta.env.BASE_URL}images/medicaps-logo-fin-Picsart-BackgroundRemover.png`}
              alt="Medicaps University"
              className="medicaps-logo-blend"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
          </motion.div>
          <div style={{ flex: 1 }}>
            <h3 className="education-title" style={{ fontSize: '1.5rem', color: 'var(--army-olive)', fontWeight: '700', marginBottom: '0.5rem' }}>
              B.Tech in Computer Science
            </h3>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: '500', marginBottom: '0.3rem' }}>
              Medicaps University, Indore, Madhya Pradesh, India
            </p>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                2023 - 2027
              </span>
              <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                CGPA: 7.55
              </span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <p style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--text-muted)' }}>
            Actively collaborated on group projects, building real-world applications that solve practical problems. Gained hands-on experience in team-based development, agile workflows, and delivering production-ready solutions from concept to deployment.
          </p>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h4 style={{ fontSize: '1.1rem', color: 'var(--army-olive)', fontWeight: '600', marginBottom: '1rem' }}>
            Key Coursework
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {coursework.map((subject, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: false }}
                className="coursework-tag"
                style={{
                  padding: '0.5rem 1rem',
                  background: 'rgba(114, 125, 115, 0.08)',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  color: 'var(--text-main)',
                  border: '1px solid var(--border-soft)',
                  fontWeight: '500'
                }}
              >
                {subject}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.1 }}
        style={{ width: '100%', maxWidth: '1000px', marginTop: '2rem' }}
      >
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          style={{
            background: 'rgba(114, 125, 115, 0.05)',
            borderRadius: '24px',
            padding: '3rem',
            border: '1px solid var(--border-soft)',
            transition: 'all 0.15s ease-out',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(53, 66, 48, 0.15)';
            e.currentTarget.style.borderColor = 'var(--primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = 'var(--border-soft)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '2rem' }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                width: '110px',
                height: '110px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                borderRadius: '12px',
                background: 'rgba(114, 125, 115, 0.1)'
              }}
            >
              <BookOpen size={48} color="var(--army-olive)" />
            </motion.div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--army-olive)', fontWeight: '700', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                High School
              </h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: '500', marginBottom: '0.3rem' }}>
                Govt LBS Hindi H S School, Pandhurna, Chhindwara, Madhya Pradesh, India
              </p>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                  2018 - 2023
                </span>
                <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                  Grade: A+
                </span>
                <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                  Subject: PCM
                </span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--text-muted)' }}>
              Active member of the school music group, delivering stage performances at the district level. Part of a talented ensemble equipped with a wide range of classical instruments. Primarily served as the lead vocalist, bringing energy and passion to every live performance.
            </p>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--army-olive)', fontWeight: '600', marginBottom: '1rem' }}>
              Key Subjects
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {['Physics', 'Chemistry', 'Maths', 'Hindi', 'English', 'Yoga'].map((subject, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: false }}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'rgba(114, 125, 115, 0.08)',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    color: 'var(--text-main)',
                    border: '1px solid var(--border-soft)',
                    fontWeight: '500'
                  }}
                >
                  {subject}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: false, amount: 0.1 }}
        style={{ width: '100%', maxWidth: '1000px', marginTop: '2rem' }}
      >
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          style={{
            background: 'rgba(114, 125, 115, 0.05)',
            borderRadius: '24px',
            padding: '3rem',
            border: '1px solid var(--border-soft)',
            transition: 'all 0.15s ease-out',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(53, 66, 48, 0.15)';
            e.currentTarget.style.borderColor = 'var(--primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = 'var(--border-soft)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '2rem' }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                width: '110px',
                height: '110px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                borderRadius: '12px',
                background: 'rgba(114, 125, 115, 0.1)'
              }}
            >
              <Smile size={48} color="var(--army-olive)" />
            </motion.div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--army-olive)', fontWeight: '700', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                Primary & Middle School
              </h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: '500', marginBottom: '0.3rem' }}>
                New Sunflower English Medium School, Pandhurna, Madhya Pradesh, India
              </p>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                  2009 - 2017
                </span>
                <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                  Grade: O
                </span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--text-muted)' }}>
              The most cherished chapter of my life — a time filled with curiosity, joy, and endless energy. Actively participated in sports competitions, dramas, and dance performances, discovering a deep love for the stage and teamwork. These formative years built the foundation for confidence, creativity, and a lifelong passion for performing arts.
            </p>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--army-olive)', fontWeight: '600', marginBottom: '1rem' }}>
              Key Learnings
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {['Reading & Writing', 'Basic Mathematics', 'Environmental Science', 'Sports & Athletics', 'Drama & Theatre', 'Dance & Performing Arts', 'Team Collaboration'].map((subject, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: false }}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'rgba(114, 125, 115, 0.08)',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    color: 'var(--text-main)',
                    border: '1px solid var(--border-soft)',
                    fontWeight: '500'
                  }}
                >
                  {subject}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Experience = () => {
  const techStack = ['React', 'Node.js', 'MongoDB', 'SMTP', 'Express.js'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: false, amount: 0.1 }}
      style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}
    >
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
        style={{
          background: 'rgba(114, 125, 115, 0.05)',
          borderRadius: '24px',
          padding: '2.5rem',
          border: '1px solid var(--border-soft)',
          transition: 'all 0.15s ease-out',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(53, 66, 48, 0.15)';
          e.currentTarget.style.borderColor = 'var(--primary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.borderColor = 'var(--border-soft)';
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{
              width: '80px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              overflow: 'hidden',
              borderRadius: '12px'
            }}
          >
            <img
              src={`${import.meta.env.BASE_URL}images/medicaps-logo-fin-Picsart-BackgroundRemover.png`}
              alt="Medicaps University"
              className="medicaps-logo-blend"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </motion.div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--army-olive)', fontWeight: '700', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Briefcase size={24} /> MERN Stack Developer
            </h3>
            <p style={{ fontSize: '1rem', color: 'var(--text-main)', fontWeight: '500', marginBottom: '0.2rem' }}>
              Medicaps University
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Feb 2026 - May 2026</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>2-Member Team</span>
            </div>
          </div>
        </div>

        <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Built a hostel complaint management system to digitize workflows and boost transparency by 40%.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {[
            'Built REST APIs with Node.js & Express.js for complaint tracking',
            'Integrated SMTP-based automated escalation for unresolved issues',
            'Designed responsive React UI for students & hostel admin',
            'Achieved 40% increase in hostel management transparency'
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: false }}
              style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}
            >
              <div style={{ width: '6px', height: '6px', background: 'var(--army-olive)', borderRadius: '50%', marginTop: '7px', flexShrink: 0 }}></div>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{item}</span>
            </motion.div>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {techStack.map((tech, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: false }}
              style={{
                padding: '0.35rem 0.85rem',
                background: 'rgba(114, 125, 115, 0.08)',
                borderRadius: '20px',
                fontSize: '0.8rem',
                color: 'var(--text-main)',
                border: '1px solid var(--border-soft)',
                fontWeight: '500'
              }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const PlaceholderContent = ({ title }) => (
  <div style={{ padding: '4rem', textAlign: 'center', width: '100%', background: 'rgba(0,0,0,0.02)', borderRadius: '20px' }}>
    <p style={{ fontSize: '1.2rem', opacity: 0.7 }}>Our {title} section is getting a creative makeover.</p>
  </div>
);

const MainLanding = ({ homeKey }) => {
  return (
    <div className="home-view">
      <Section id="home" key={`home-${homeKey}`}><Quote /></Section>
      <Section id="intro"><Intro /></Section>
      <Section id="what-i-do" title="What I Do" subtitle="My Expertise" description="Turning complex problems into elegant, scalable solutions — one component at a time.">
        <WhatIDo />
      </Section>
      <Section id="features"><Features /></Section>
      <Section id="education" title="Education" subtitle="Academic Journey" description="Building a strong foundation in computer science while exploring the endless possibilities of technology.">
        <Education />
      </Section>
      <Section id="experience" title="Experience" subtitle="Professional Growth" description="Real-world experience building production-grade applications that solve actual problems.">
        <Experience />
      </Section>
      <Section id="projects" title="Projects" subtitle="Built with Passion" description="From practice clones to full-stack applications — each project is a milestone in my developer journey.">
        <Projects />
      </Section>
      <Section id="skills" title="Skills" subtitle="Tech Arsenal" description="The tools, languages, and frameworks I use to bring ideas to life.">
        <Skills />
      </Section>
      <Section id="achievements" title="Achievements" subtitle="Badges of Honor" description="Recognized certifications and competitive programming profiles that reflect my commitment to continuous learning.">
        <Achievements />
      </Section>
      <Section id="contact" title="Contact Me" subtitle="Let's Connect" description="Have a project in mind or just want to say hi? I'd love to hear from you.">
        <Contact />
      </Section>
    </div>
  );
};

const Header = ({ homeKey, setHomeKey }) => {
  const [activePath, setActivePath] = useState(window.location.hash.replace('#', '') || '/');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
          const hashPath = id === 'home' ? '#/' : `#/${id}`;
          if (window.location.hash !== hashPath) {
            window.history.replaceState(null, '', hashPath);
            setActivePath(id === 'home' ? '/' : `/${id}`);
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
    { label: 'Skills', path: '/skills', targetId: 'skills' },
    { label: 'Achievements', path: '/achievements', targetId: 'achievements' },
    { label: 'Contact Me', path: '/contact', targetId: 'contact' }
  ];

  const handleNavClick = (e, item) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    isScrollingByNav.current = true;
    const element = document.getElementById(item.targetId);
    if (element) {
      const top = item.targetId === 'home' ? 0 : element.offsetTop - 80;
      window.scrollTo({
        top,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', `/#${item.path}`);
      setActivePath(item.path);
    }
    if (item.targetId === 'home') {
      setHomeKey(prev => prev + 1);
    }
    setTimeout(() => { isScrollingByNav.current = false; }, 1000);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title" onClick={(e) => {
          e.preventDefault();
          isScrollingByNav.current = true;
          window.scrollTo({ top: 0, behavior: 'smooth' });
          window.history.pushState(null, '', '/#/');
          setActivePath('/');
          setHomeKey(prev => prev + 1);
          setMobileMenuOpen(false);
          setTimeout(() => { isScrollingByNav.current = false; }, 1000);
        }} style={{ cursor: 'pointer' }}>
          <h1>Abhijeet Dhokne</h1>
        </div>
        <nav className="header-actions">
          <div className="action-buttons desktop-nav">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => handleNavClick(e, item)}
                className={`nav-link-custom ${activePath === item.path ? 'active' : ''}`}
              >
                {item.label}
              </a>
            ))}
          </div>
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              color: 'var(--army-olive)'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)} />

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        {navItems.map((item, index) => (
          <a
            key={item.path}
            href={item.path}
            onClick={(e) => handleNavClick(e, item)}
            className={`mobile-nav-link ${activePath === item.path ? 'active' : ''}`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </header>
  );
};


const Footer = () => (
  <footer className="site-footer">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      whileHover={{
        y: -15,
        rotate: -1,
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 0 0 2px #4a6fa5'
      }}
      className="quote-card"
    >
      <div className="quote-content">
        <p className="quote-text">
          You can sleep when you’re dead.
        </p>

        <p className="quote-author">
          ~Max Verstappen
        </p>
      </div>
    </motion.div>

    <div className="copyright-notice">
      <p className="copyright-text">
        &copy; {new Date().getFullYear()} Abhijeet Dhokne
      </p>
    </div>
  </footer>
);

function App() {
  const [homeKey, setHomeKey] = useState(0);
  return (
    <Router>
      <div className="app-container">
        <Header homeKey={homeKey} setHomeKey={setHomeKey} />
        <main className="main-content">
          <Routes>
            <Route path="*" element={<MainLanding homeKey={homeKey} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
