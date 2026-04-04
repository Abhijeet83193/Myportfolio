import React, { useState, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';
const BASE = import.meta.env.BASE_URL;

const bentoCards = [
  {
    id: 'react',
    name: 'React',
    icon: `${DEVICON_BASE}/react/react-original-wordmark.svg`,
    category: 'Frontend',
    span: 'wide',
    color: '#61DAFB',
    description: 'Building dynamic, component-based UIs with hooks and modern patterns'
  },
  {
    id: 'node',
    name: 'Node.js',
    icon: `${DEVICON_BASE}/nodejs/nodejs-original-wordmark.svg`,
    category: 'Backend',
    span: 'wide',
    color: '#68A063',
    description: 'Server-side JavaScript for scalable APIs and microservices'
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: `${DEVICON_BASE}/javascript/javascript-original.svg`,
    category: 'Language',
    span: 'normal',
    color: '#F7DF1E',
    description: 'Core language for web development'
  },
  {
    id: 'python',
    name: 'Python',
    icon: `${DEVICON_BASE}/python/python-original-wordmark.svg`,
    category: 'Language',
    span: 'normal',
    color: '#3776AB',
    description: 'Scripting, automation, and problem solving'
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    icon: `${DEVICON_BASE}/mongodb/mongodb-original-wordmark.svg`,
    category: 'Database',
    span: 'normal',
    color: '#47A248',
    description: 'NoSQL database for flexible data models'
  },
  {
    id: 'express',
    name: 'Express.js',
    icon: `${DEVICON_BASE}/express/express-original-wordmark.svg`,
    category: 'Backend',
    span: 'normal',
    color: '#000000',
    description: 'Minimalist web framework for Node.js'
  },
  {
    id: 'html5',
    name: 'HTML5',
    icon: `${DEVICON_BASE}/html5/html5-original-wordmark.svg`,
    category: 'Frontend',
    span: 'normal',
    color: '#E34F26',
    description: 'Semantic markup and modern web standards'
  },
  {
    id: 'css3',
    name: 'CSS3',
    icon: `${DEVICON_BASE}/css3/css3-original-wordmark.svg`,
    category: 'Frontend',
    span: 'normal',
    color: '#1572B6',
    description: 'Responsive layouts, animations, and styling'
  },
  {
    id: 'tailwind',
    name: 'Tailwind',
    icon: `${BASE}images/tailwind-css-icon.jpg`,
    category: 'Frontend',
    span: 'normal',
    color: '#06B6D4',
    description: 'Utility-first CSS for rapid UI development'
  },
  {
    id: 'bootstrap',
    name: 'Bootstrap',
    icon: `${BASE}images/bootsrap.jpg`,
    category: 'Frontend',
    span: 'normal',
    color: '#7952B3',
    description: 'Component library for responsive design'
  },
  {
    id: 'java',
    name: 'Java',
    icon: `${BASE}images/java.jpg`,
    category: 'Language',
    span: 'normal',
    color: '#ED8B00',
    description: 'OOP, DSA, and enterprise applications'
  },
  {
    id: 'mysql',
    name: 'MySQL',
    icon: `${DEVICON_BASE}/mysql/mysql-original-wordmark.svg`,
    category: 'Database',
    span: 'normal',
    color: '#4479A1',
    description: 'Relational database for structured data'
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    icon: `${DEVICON_BASE}/git/git-original-wordmark.svg`,
    category: 'Tools',
    span: 'wide',
    color: '#F05032',
    description: 'Version control, collaboration, and CI/CD workflows'
  },
  {
    id: 'aws',
    name: 'AWS',
    icon: `${DEVICON_BASE}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
    category: 'Cloud',
    span: 'normal',
    color: '#FF9900',
    description: 'Cloud deployment and infrastructure'
  },
  {
    id: 'vscode',
    name: 'VS Code',
    icon: `${BASE}images/visual-studio-code-1-1.jpg`,
    category: 'Tools',
    span: 'normal',
    color: '#007ACC',
    description: 'Primary IDE with powerful extensions'
  },
  {
    id: 'postman',
    name: 'Postman',
    icon: `${DEVICON_BASE}/postman/postman-original-wordmark.svg`,
    category: 'Tools',
    span: 'normal',
    color: '#FF6C37',
    description: 'API testing and development'
  }
];

const SkillCard = memo(({ card, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.15 }}
      className={`bento-card ${card.span === 'wide' ? 'bento-wide' : ''}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'rgba(114, 125, 115, 0.05)',
        borderRadius: '20px',
        border: '1px solid var(--border-soft)',
        padding: card.span === 'wide' ? '1.75rem' : '1.25rem',
        cursor: 'pointer',
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, border-color 0.3s ease'
      }}
      whileHover={{
        y: -6,
        boxShadow: `0 16px 40px ${card.color}22, 0 0 0 2px ${card.color}44`
      }}
    >
      {/* Accent glow */}
      <motion.div
        style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: card.color,
          opacity: 0.08,
          filter: 'blur(30px)'
        }}
        animate={{
          opacity: isHovered ? 0.18 : 0.08,
          scale: isHovered ? 1.3 : 1
        }}
        transition={{ duration: 0.4 }}
      />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: card.span === 'wide' ? '0.75rem' : '0.5rem'
      }}>
        <motion.img
          src={card.icon}
          alt={card.name}
          style={{
            width: card.span === 'wide' ? '44px' : '36px',
            height: card.span === 'wide' ? '44px' : '36px',
            objectFit: 'contain',
            borderRadius: '10px',
            padding: '6px',
            background: `${card.color}12`
          }}
          animate={{
            scale: isHovered ? 1.15 : 1,
            rotate: isHovered ? -5 : 0
          }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 400 }}
        />
        <div>
          <h4 style={{
            fontSize: card.span === 'wide' ? '1.15rem' : '1rem',
            fontWeight: '700',
            color: 'var(--text-main)',
            margin: 0,
            letterSpacing: '0.01em'
          }}>
            {card.name}
          </h4>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: card.color,
            opacity: 0.85
          }}>
            {card.category}
          </span>
        </div>
      </div>

      <motion.p
        style={{
          fontSize: '0.85rem',
          lineHeight: '1.6',
          color: 'var(--text-muted)',
          margin: 0
        }}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: isHovered ? 1 : 0.6 }}
        transition={{ duration: 0.3 }}
      >
        {card.description}
      </motion.p>
    </motion.div>
  );
});

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = useMemo(() => {
    const cats = [...new Set(bentoCards.map(card => card.category))];
    return ['All', ...cats.sort()];
  }, []);

  const filteredCards = useMemo(() => {
    if (selectedCategory === 'All') return bentoCards;
    return bentoCards.filter(card => card.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.15 }}
      className="skills-section"
      style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}
    >
      {/* Category Filter Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '8px 18px',
              borderRadius: '20px',
              border: selectedCategory === cat ? '2px solid var(--army-olive)' : '1px solid var(--border-soft)',
              background: selectedCategory === cat ? 'var(--army-olive)' : 'rgba(114, 125, 115, 0.06)',
              color: selectedCategory === cat ? '#fff' : 'var(--text-main)',
              fontSize: '0.85rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease'
            }}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      <div className="bento-grid">
        <AnimatePresence mode="popLayout">
          {filteredCards.map((card, index) => (
            <SkillCard key={card.id} card={card} index={index} />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default memo(Skills);
