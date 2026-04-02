import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Rocket, ArrowUpDown } from 'lucide-react';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const [sortBy, setSortBy] = useState('all');
  const [yearInput, setYearInput] = useState('');

  const projects = [
    {
      title: 'Spotify Clone',
      description: 'A frontend UI clone of Spotify built during early learning phase to practice HTML and CSS fundamentals. This project helped in understanding layout design, responsive styling, and recreating real-world interfaces from scratch.',
      image: '/images/spotify.jpg',
      liveUrl: 'https://abhijeet83193.github.io/Spotify-Clone/',
      githubUrl: 'https://github.com/Abhijeet83193/Spotify-Clone',
      techStack: ['HTML', 'CSS'],
      role: 'Frontend Developer',
      date: '2024',
      year: 2024,
      order: 1
    },
    {
      title: 'FramePro',
      description: 'A simple, elegant platform designed using HTML and CSS to streamline the process of hiring photographers for events. Whether it\'s a wedding, corporate gathering, or a personal photoshoot, FramePro connects users with skilled professionals to capture their special moments. This responsive and user-friendly interface ensures seamless navigation for users to explore and book photographers effortlessly.',
      image: '/images/camera.jpg',
      imagePosition: 'top',
      liveUrl: 'https://abhijeet83193.github.io/FramePro/',
      githubUrl: 'https://github.com/Abhijeet83193/FramePro',
      techStack: ['HTML', 'CSS'],
      role: 'Frontend Developer',
      date: '2024',
      year: 2024,
      order: 2
    },
    {
      title: 'WeatherApp',
      description: 'A modern and responsive weather application built with React (Vite). The app fetches real-time weather data using the OpenWeather API and displays current weather conditions for any searched city.',
      image: '/images/weather-app.jpg',
      liveUrl: 'https://weatherapp-7d1e.onrender.com',
      githubUrl: 'https://github.com/Abhijeet83193/WeatherApp',
      techStack: ['React', 'JavaScript', 'HTML', 'CSS', 'OpenWeather API'],
      role: 'Frontend Developer',
      date: '2025',
      year: 2025,
      order: 3
    },
    {
      title: 'Hostmate',
      description: 'A modern web application for rental room listings and booking. It allows users to explore, list, and book rental rooms seamlessly. With an intuitive interface, integrated payments, and interactive maps, Hostmate simplifies the rental experience for both hosts and guests.',
      image: '/images/hostmate.jpg',
      imagePosition: 'bottom',
      liveUrl: 'https://hostmate-6org.onrender.com/',
      githubUrl: 'https://github.com/Abhijeet83193/Hostmate',
      techStack: ['Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'HTML', 'CSS', 'Stripe', 'Cloudinary', 'OpenStreetMap'],
      role: 'Full Stack Developer',
      date: '2025',
      year: 2025,
      order: 4
    },
    {
      title: 'HostelResolve',
      description: 'A hostel complaint management system that increases transparency between wardens and students. If complaints remain unresolved, the system automatically escalates them to higher authorities via email.',
      image: '/images/hostelresolve.jpg',
      liveUrl: 'https://hostelresolve.onrender.com/',
      githubUrl: 'https://github.com/Abhijeet83193/HostelResolve',
      techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'SMTP', 'Cloudinary', 'JavaScript', 'HTML', 'CSS', 'Framer Motion'],
      role: 'MERN Stack Developer',
      date: '2026',
      year: 2026,
      order: 5
    },
    {
      title: 'My Portfolio',
      description: 'A personal portfolio website showcasing my skills, projects, education, and experience as a Full Stack Developer. Built with React, Framer Motion, and Lottie animations for a modern, interactive experience with smooth scrolling, animated sections, and dynamic project filtering.',
      image: '/images/my-portfolio.jpg',
      imagePosition: 'top',
      liveUrl: 'https://abhijeet-dhokne.onrender.com/',
      githubUrl: 'https://github.com/Abhijeet83193/Myportfolio',
      techStack: ['React', 'JavaScript', 'HTML', 'CSS', 'Framer Motion', 'Lottie', 'Vite', 'GitHub', 'Node.js', 'Express.js', 'MongoDB'],
      role: 'Full Stack Developer',
      date: '2026',
      year: 2026,
      order: 6
    }
  ];

  const years = useMemo(() => {
    const uniqueYears = [...new Set(projects.map(p => p.year))].sort((a, b) => b - a);
    return uniqueYears;
  }, []);

  const filteredProjects = useMemo(() => {
    const filtered = [...projects];
    if (sortBy === 'latest') {
      filtered.sort((a, b) => b.order - a.order);
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => a.order - b.order);
    } else if (sortBy !== 'all') {
      return filtered.filter(p => p.year === parseInt(sortBy)).sort((a, b) => b.order - a.order);
    } else {
      filtered.sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        return b.order - a.order;
      });
    }
    return filtered;
  }, [sortBy]);

  const handleYearInput = (e) => {
    const val = e.target.value;
    setYearInput(val);
    if (val.length === 4) {
      const year = parseInt(val);
      if (!isNaN(year) && year >= 2000 && year <= 2099) {
        setSortBy(String(year));
      } else {
        setSortBy('all');
      }
    } else if (val.length === 0) {
      setSortBy('all');
    }
  };

  const handleSortChange = (key) => {
    setSortBy(key);
    if (key === 'all' || key === 'latest' || key === 'oldest') {
      setYearInput('');
    }
  };

  const sortOptions = [
    { key: 'all', label: 'All' },
    { key: 'latest', label: 'Latest' },
    { key: 'oldest', label: 'Oldest' },
    ...years.map(y => ({ key: String(y), label: String(y) }))
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.1 }}
      style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}
    >
      {/* Introduction Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '2.5rem',
        padding: '2.5rem 2rem',
        background: 'rgba(114, 125, 115, 0.05)',
        borderRadius: '20px',
        border: '1px solid var(--border-soft)'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '1rem' }}>
            <Code2 size={28} color="var(--army-olive)" />
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'var(--army-olive)',
              margin: 0
            }}>
              My Projects
            </h3>
            <Rocket size={28} color="var(--army-olive)" />
          </div>
          <p style={{
            fontSize: '1.05rem',
            lineHeight: '1.8',
            color: 'var(--text-muted)',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Here you'll find a collection of projects I've built — from practice clones to real-world applications.
            Each project reflects my learning journey, problem-solving approach, and passion for turning ideas into functional digital experiences.
          </p>
        </motion.div>
      </div>

      {/* Sort Filter Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--army-olive)',
          fontSize: '0.9rem',
          fontWeight: '600'
        }}>
          <ArrowUpDown size={18} />
          <span>Sort by:</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['all', 'latest', 'oldest'].map((key) => (
            <motion.button
              key={key}
              onClick={() => handleSortChange(key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '8px 18px',
                borderRadius: '20px',
                border: sortBy === key ? '2px solid var(--primary)' : '1px solid var(--border-soft)',
                background: sortBy === key ? 'var(--primary)' : 'rgba(114, 125, 115, 0.06)',
                color: sortBy === key ? '#fff' : 'var(--text-main)',
                fontSize: '0.85rem',
                fontWeight: '600',
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all 0.2s ease'
              }}
            >
              {key}
            </motion.button>
          ))}
        </div>
        {years.length > 0 && (
          <div style={{ position: 'relative' }}>
            <motion.input
              type="text"
              inputMode="numeric"
              maxLength={4}
              placeholder="Type year..."
              value={yearInput}
              onChange={handleYearInput}
              whileHover={{ scale: 1.02 }}
              style={{
                padding: '8px 14px',
                borderRadius: '20px',
                border: sortBy !== 'all' && sortBy !== 'latest' && sortBy !== 'oldest'
                  ? '2px solid var(--primary)'
                  : '1px solid var(--border-soft)',
                background: sortBy !== 'all' && sortBy !== 'latest' && sortBy !== 'oldest'
                  ? 'var(--primary)'
                  : 'rgba(114, 125, 115, 0.06)',
                color: sortBy !== 'all' && sortBy !== 'latest' && sortBy !== 'oldest'
                  ? '#fff'
                  : 'var(--text-main)',
                fontSize: '0.85rem',
                fontWeight: '600',
                cursor: 'text',
                outline: 'none',
                width: '120px',
                textAlign: 'center',
                letterSpacing: '2px'
              }}
            />
          </div>
        )}
      </div>

      {/* Project Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
        gap: '2rem'
      }}>
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              layout
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
        {filteredProjects.length === 0 && (
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: '3rem',
            color: 'var(--text-muted)',
            fontSize: '1rem'
          }}>
            No projects found for this filter.
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Projects;
