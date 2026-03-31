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
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

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

const GITHUB_USERNAME = 'Abhijeet83193';

const Terminal = () => {
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCommits = async () => {
    try {
      const token = import.meta.env.VITE_GITHUB_TOKEN;

      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      // Using GraphQL API to fetch recent commits across all repositories
      const query = `{
        viewer {
          repositories(first: 10, orderBy: {field: UPDATED_AT, direction: DESC}) {
            nodes {
              name
              url
              defaultBranchRef {
                target {
                  ... on Commit {
                    history(first: 5) {
                      nodes {
                        oid
                        message
                        author {
                          name
                          avatarUrl
                        }
                        committedDate
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }`;

      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers,
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      console.log('GraphQL result:', result);

      if (result.errors) {
        console.error('GraphQL errors:', result.errors);
        throw new Error('GraphQL error');
      }

      const repos = result.data?.viewer?.repositories?.nodes || [];
      const allCommits = [];

      repos.forEach(repo => {
        const commits = repo.defaultBranchRef?.target?.history?.nodes || [];
        commits.forEach((commit, idx) => {
          allCommits.push({
            id: `${repo.name}-${commit.oid}`,
            sha: commit.oid.substring(0, 7),
            message: commit.message.split('\n')[0],
            author: commit.author?.name || 'Unknown',
            date: new Date(commit.committedDate),
            url: commit.url,
            repo: repo.name,
            type: allCommits.length === 0 ? 'active' : 'commit',
          });
        });
      });

      // Sort by date, oldest first (newest at bottom with cursor)
      allCommits.sort((a, b) => a.date - b.date);
      // Mark newest (last) as active
      if (allCommits.length > 0) {
        allCommits[allCommits.length - 1].type = 'active';
        // Reset others to 'commit'
        allCommits.forEach((c, i) => {
          if (i !== allCommits.length - 1) c.type = 'commit';
        });
      }
      const latestCommits = allCommits;

      setCommits(latestCommits);
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error('Error fetching commits:', err);
      setError('Unable to load commits');
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
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1 }}
      className="terminal-window"
      style={{
        background: '#1e1e1e',
        borderRadius: '12px',
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
    </motion.div>
  );
};

const Quote = () => (
  <div className="quote-container" style={{ minHeight: 'calc(100vh - 100px)', padding: '60px 5%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3rem', width: '100%' }}>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1 }}
        style={{ width: '250px', height: '250px' }}>
        <DotLottieReact
          src="https://lottie.host/39d6c4e7-3644-4c21-a229-39dcf70032ae/gAZ9iS1rgE.lottie"
          loop
          autoplay
          style={{ width: '100%', height: '100%' }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={{ fontSize: '1.8rem', color: 'var(--primary)', fontWeight: '600' }}>
        <span className="glitch-text" data-text="Hey, I'm GOJO, injecting code...">
          <i>Hey,I'm GOJO. injecting code..</i>
        </span>
      </motion.div>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1, delay: 0.3 }}
      style={{ width: '100%', maxWidth: '1400px', display: 'flex', justifyContent: 'center' }}
    >
      <Terminal />
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

const WhatIDo = () => {
  const items = [
    {
      title: "Building Full-Stack Web Applications",
      icon: "🌐",
      description: "Creating scalable and modern web applications from frontend to backend. I specialize in building complete solutions using React for dynamic frontends and Node.js with MongoDB for robust backend systems. From conceptualization to deployment, I ensure seamless integration across all layers of the application stack.",
      image: "/images/fullstack_illustration.jpg",
      reverse: true,
      type: "image"
    },
    {
      title: "Crafting Modern User Interfaces",
      icon: "🎨",
      description: "Designing clean, responsive, and user-friendly interfaces for better user experience. I leverage modern frameworks like React combined with Framer Motion to create engaging, animated experiences. Every interface is meticulously crafted with accessibility and performance in mind, ensuring users enjoy smooth interactions across all devices.",
      image: "/images/backend_illustration.jpg",
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
            viewport={{ once: true, amount: 0.3 }}
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
            viewport={{ once: true, amount: 0.1 }}
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
        <div className="header-title">
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
