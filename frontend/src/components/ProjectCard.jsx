import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { ExternalLink, Github, Calendar, Code2, X } from 'lucide-react';

const ProjectModal = memo(({ project, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(12px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#F0F0D7',
          borderRadius: '24px',
          border: '1px solid var(--border-soft)',
          padding: '0',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          position: 'relative',
          boxShadow: '0 40px 100px rgba(0, 0, 0, 0.4)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            background: 'rgba(0, 0, 0, 0.25)',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            zIndex: 10,
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--army-olive)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.25)'; }}
        >
          <X size={20} />
        </button>

        {/* Header: Project Image (Full width/Flush) */}
        <div style={{ width: '100%', height: '320px', overflow: 'hidden', position: 'relative' }}>
          <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', background: 'linear-gradient(to top, #F0F0D7, transparent)' }} />
        </div>

        {/* Content Section with Padding */}
        <div style={{ padding: '0 2.5rem 2.5rem 2.5rem', marginTop: '-20px', position: 'relative', zIndex: 1 }}>
          {/* Project Header Info */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--army-olive)', marginBottom: '0.25rem' }}>{project.title}</h3>
            {project.role && <p style={{ fontSize: '1rem', color: 'var(--primary)', fontWeight: '600', marginBottom: '1rem' }}>{project.role}</p>}
          </div>

          {/* Details Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            marginBottom: '2rem',
            padding: '1.25rem',
            background: 'rgba(53, 66, 48, 0.05)',
            borderRadius: '12px'
          }}>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700', marginBottom: '0.25rem' }}>Project Year</p>
              <p style={{ fontSize: '1rem', color: 'var(--text-main)', fontWeight: '700' }}>{project.date || '2026'}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700', marginBottom: '0.25rem' }}>Primary Stack</p>
              <p style={{ fontSize: '1rem', color: 'var(--text-main)', fontWeight: '700' }}>{project.techStack?.slice(0, 2).join(', ') || 'Development'}</p>
            </div>
          </div>

          {/* About Section */}
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700', marginBottom: '0.75rem' }}>About this Project</p>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '1.5rem' }}>{project.description}</p>
            
            {project.longDescription && project.longDescription.length > 0 && (
              <div style={{ marginTop: '2rem' }}>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--army-olive)', fontWeight: '700', marginBottom: '1rem' }}>
                  Key Technical Features:
                </h4>
                <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  {project.longDescription.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: '0.75rem', lineHeight: '1.6' }}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Full Tech Stack Section */}
          {project.techStack && (
             <div style={{ marginBottom: '2.5rem' }}>
               <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700', marginBottom: '1rem' }}>Technologies Used</p>
               <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                 {project.techStack.map((tech, idx) => (
                   <span key={idx} style={{ padding: '6px 14px', background: 'rgba(53, 66, 48, 0.08)', borderRadius: '12px', fontSize: '0.85rem', color: 'var(--army-olive)', fontWeight: '600', border: '1px solid var(--border-soft)' }}>
                     {tech}
                   </span>
                 ))}
               </div>
             </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target={project.isMe ? "_self" : "_blank"}
                rel={project.isMe ? "" : "noopener noreferrer"}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '1rem',
                  background: 'var(--primary)',
                  color: '#fff',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  transition: 'all 0.3s ease'
                }}
              >
                <ExternalLink size={20} /> View Project
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '1rem',
                  background: 'rgba(53, 66, 48, 0.1)',
                  color: 'var(--army-olive)',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  border: '1px solid var(--border-soft)',
                  transition: 'all 0.3s ease'
                }}
              >
                <Github size={20} /> Get Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
});

const ProjectCard = memo(({ project, index }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -8, scale: 1.01 }}
        onClick={() => setShowModal(true)}
        className="project-card"
        style={{
          background: 'rgba(114, 125, 115, 0.05)',
          borderRadius: '24px',
          border: '1px solid var(--border-soft)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          position: 'relative'
        }}
      >
        <div style={{ position: 'relative', overflow: 'hidden', height: '240px' }}>
          <img
            src={project.image}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
            className="project-image"
          />
          <div className="hover-overlay" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(53, 66, 48, 0.4)',
            backdropFilter: 'blur(4px)',
            opacity: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.3s ease'
          }}>
             <span style={{ color: '#fff', fontWeight: '700', fontSize: '1rem', border: '2px solid #fff', padding: '0.6rem 1.5rem', borderRadius: '30px' }}>
               View Details
             </span>
          </div>
        </div>

        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--army-olive)', fontWeight: '800', marginBottom: '0.75rem' }}>
            {project.title}
          </h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '1.5rem' }}>
            {project.description}
          </p>
          
          <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {project.techStack?.slice(0, 3).map((tech, idx) => (
              <span key={idx} style={{ padding: '4px 12px', background: 'rgba(53, 66, 48, 0.08)', borderRadius: '12px', fontSize: '0.75rem', color: 'var(--army-olive)', fontWeight: '600' }}>
                {tech}
              </span>
            ))}
            {project.techStack?.length > 3 && (
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                +{project.techStack.length - 3} more
              </span>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <ProjectModal project={project} onClose={() => setShowModal(false)} />
        )}
      </AnimatePresence>
    </>
  );
});

export default memo(ProjectCard);
