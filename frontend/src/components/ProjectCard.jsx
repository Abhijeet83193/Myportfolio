import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Calendar, Code2 } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{ y: -6 }}
      className="project-card"
      style={{
        background: 'rgba(114, 125, 115, 0.04)',
        borderRadius: '16px',
        border: '1px solid var(--border-soft)',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(53, 66, 48, 0.15)';
        e.currentTarget.style.borderColor = 'var(--primary)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
        e.currentTarget.style.borderColor = 'var(--border-soft)';
      }}
    >
      {/* Project Image */}
      <div className="project-image-wrapper" style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: '100%',
            height: '220px',
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
                target="_blank"
                rel="noopener noreferrer"
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
                Live
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
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
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1, type: 'spring', stiffness: 200 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.08, y: -2 }}
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
                </motion.span>
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
    </motion.div>
  );
};

export default ProjectCard;
