import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
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
  Twitter,
  Linkedin,
  Instagram,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Pages
const Dashboard = () => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    className="home-view"
  >
    {/* Hero Section */}
    <section className="hero-section" style={{ gridTemplateColumns: '1fr', textAlign: 'center' }}>
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hero-content"
        style={{ alignItems: 'center' }}
      >
        <h1 className="hero-title">
          Abhijeet Dhokne
        </h1>
        <p className="hero-description">
          Building and breaking things.
        </p>
        
        <div className="social-links">
          <a href="#" className="social-icon-box"><Github size={20} /></a>
          <a href="#" className="social-icon-box"><Linkedin size={20} /></a>
          <a href="#" className="social-icon-box"><Globe size={20} /></a>
          <a href="#" className="social-icon-box"><Twitter size={20} /></a>
          <a href="#" className="social-icon-box"><Instagram size={20} /></a>
        </div>

        <div className="hero-actions-group">
          <button className="btn-primary">
            See my resume
          </button>
        </div>
      </motion.div>
    </section>

    {/* Section 2: Features/Stats */}
    <div className="features-grid">
      <div className="feature-card">
        <div className="feature-icon"><Code2 size={40} /></div>
        <h3>Full Stack</h3>
        <p>Developing end-to-end solutions with modern tech stacks.</p>
      </div>
      <div className="feature-card">
        <div className="feature-icon"><Briefcase size={40} /></div>
        <h3>3+ Years</h3>
        <p>Experience in building scalable web applications.</p>
      </div>
      <div className="feature-card">
        <div className="feature-icon"><History size={40} /></div>
        <h3>Active</h3>
        <p>Always learning and exploring new technologies.</p>
      </div>
    </div>
  </motion.div>
);

const PlaceholderPage = ({ title }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    className="glass-card"
    style={{ padding: '8rem', textAlign: 'center' }}
  >
    <h2 style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem' }}>{title}</h2>
    <p style={{ fontSize: '1.2rem', opacity: 0.7 }}>Our {title} section is getting a creative makeover.</p>
  </motion.div>
);

const Header = () => {
  const location = useLocation();
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Education', path: '/education' },
    { label: 'Experience', path: '/experience' },
    { label: 'Projects', path: '/projects' },
    { label: 'Open Source', path: '/open-source' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact Me', path: '/contact' }
  ];

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <h1>Abhijeet Dhokne</h1>
        </div>
        <nav className="header-actions">
          <div className="action-buttons">
            {navItems.map((item) => (
              <NavLink 
                key={item.path} 
                to={item.path} 
                className={({ isActive }) => isActive ? "nav-link-custom active" : "nav-link-custom"}
              >
                {item.label}
              </NavLink>
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
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Dashboard key="dashboard" />} />
              <Route path="/education" element={<PlaceholderPage key="edu" title="Education" />} />
              <Route path="/experience" element={<PlaceholderPage key="exp" title="Experience" />} />
              <Route path="/projects" element={<PlaceholderPage key="projects" title="Projects" />} />
              <Route path="/open-source" element={<PlaceholderPage key="os" title="Open Source" />} />
              <Route path="/blog" element={<PlaceholderPage key="blog" title="Blog" />} />
              <Route path="/contact" element={<PlaceholderPage key="contact" title="Contact Me" />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}

export default App;
