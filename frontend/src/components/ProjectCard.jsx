import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Calendar, Code2, X } from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
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

  return (
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
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
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
          borderRadius: '20px',
          border: '1px solid var(--border-soft)',
          maxWidth: '650px',
          width: '100%',
          maxHeight: '85vh',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '1px solid var(--border-soft)',
            background: 'rgba(114, 125, 115, 0.1)',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            zIndex: 10
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--army-olive)';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(114, 125, 115, 0.1)';
            e.currentTarget.style.color = 'var(--text-muted)';
          }}
        >
          <X size={18} />
        </button>

        {/* Project Image - Fixed, not scrollable */}
        <div style={{ position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: '100%',
              height: '280px',
              objectFit: 'cover',
              objectPosition: project.imagePosition || 'center',
              display: 'block'
            }}
          />
          {project.role && (
            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              background: 'rgba(53, 66, 48, 0.9)',
              color: '#fff',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: '600',
              backdropFilter: 'blur(8px)'
            }}>
              {project.role}
            </div>
          )}
        </div>

        {/* Scrollable Content */}
        <div
          className="modal-scrollable-content"
          style={{
            padding: '2rem',
            overflowY: 'auto',
            overflowX: 'hidden',
            scrollbarWidth: 'thin',
            scrollbarColor: 'var(--border-strong) #F0F0D7'
          }}
        >
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'var(--army-olive)',
            marginBottom: '0.5rem'
          }}>
            {project.title}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
            <Calendar size={14} color="var(--text-muted)" />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {project.date}
            </span>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>About this project</p>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
              {project.description}
            </p>
          </div>

          {project.techStack && project.techStack.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Tech Stack</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '4px 12px',
                      background: 'rgba(114, 125, 115, 0.08)',
                      borderRadius: '16px',
                      fontSize: '0.8rem',
                      color: 'var(--text-main)',
                      border: '1px solid var(--border-soft)',
                      fontWeight: '500'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target={project.isMe ? "_self" : "_blank"}
                rel={project.isMe ? "" : "noopener noreferrer"}
                onClick={(e) => {
                  if (project.isMe) {
                    e.preventDefault();
                    onClose();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1rem',
                  background: 'var(--army-olive)',
                  color: '#fff',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--army-olive)';
                }}
              >
                <ExternalLink size={16} /> {project.isMe ? 'View Portfolio' : 'Live Demo'}
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
                  gap: '0.5rem',
                  padding: '0.75rem 1rem',
                  background: 'rgba(114, 125, 115, 0.1)',
                  color: 'var(--army-olive)',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  border: '1px solid var(--border-soft)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(114, 125, 115, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(114, 125, 115, 0.1)';
                }}
              >
                <Github size={16} /> Source Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectCard = ({ project, index }) => {
  const [showModal, setShowModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="project-card"
        style={{
          background: 'rgba(114, 125, 115, 0.04)',
          borderRadius: '16px',
          border: '1px solid var(--border-soft)',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          cursor: 'pointer'
        }}
      >
        {/* Project Image */}
        <div className="project-image-wrapper" style={{ position: 'relative', overflow: 'hidden' }}>
          <motion.img
            src={project.image}
            alt={project.title}
            style={{
              width: '100%',
              height: '220px',
              objectFit: 'cover',
              objectPosition: project.imagePosition || 'center',
              display: 'block',
              opacity: imageLoaded ? 1 : 0
            }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            onLoad={() => setImageLoaded(true)}
          />
          {project.role && (
            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              background: 'rgba(53, 66, 48, 0.9)',
              color: '#fff',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: '600',
              backdropFilter: 'blur(8px)'
            }}>
              {project.role}
            </div>
          )}
        </div>

        {/* Project Content */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
          {/* Title & Links Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: '700',
              color: 'var(--army-olive)',
              margin: 0,
              flex: 1
            }}>
              {project.title}
            </h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0, marginLeft: '1rem' }}>
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target={project.isMe ? "_self" : "_blank"}
                  rel={project.isMe ? "" : "noopener noreferrer"}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (project.isMe) {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    background: 'var(--primary)',
                    color: '#fff',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}
                >
                  <ExternalLink size={14} />
                  {project.isMe ? "Me" : "Live"}
                </motion.a>
              )}
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    background: 'rgba(114, 125, 115, 0.1)',
                    color: 'var(--army-olive)',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    border: '1px solid var(--border-soft)'
                  }}
                >
                  <Github size={14} />
                  Code
                </motion.a>
              )}
            </div>
          </div>

          {/* Description */}
          <p style={{
            fontSize: '0.95rem',
            lineHeight: '1.7',
            color: 'var(--text-muted)',
            marginBottom: '1.2rem',
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {project.description}
          </p>

          {/* Tech Stack */}
          {project.techStack && project.techStack.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.5rem' }}>
                <Code2 size={16} color="var(--army-olive)" />
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--army-olive)' }}>
                  Tech Stack
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '4px 12px',
                      background: 'rgba(114, 125, 115, 0.08)',
                      borderRadius: '16px',
                      fontSize: '0.8rem',
                      color: 'var(--text-main)',
                      border: '1px solid var(--border-soft)',
                      fontWeight: '500',
                      cursor: 'default'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Footer - Date */}
          {project.date && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              paddingTop: '0.75rem',
              borderTop: '1px solid var(--border-soft)'
            }}>
              <Calendar size={14} color="var(--text-muted)" />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {project.date}
              </span>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <ProjectModal project={project} onClose={() => setShowModal(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;
