import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Award, FileText, Code, X, Trophy } from 'lucide-react';

const codingPlatforms = [
  {
    name: 'LeetCode',
    username: 'Avdx23e',
    url: 'https://leetcode.com/u/Avdx23e/',
    logo: `${import.meta.env.BASE_URL}certificates/leetcode.png`,
    color: '#FFA116',
    bgGradient: 'linear-gradient(135deg, #FFA116 0%, #FFC107 100%)'
  },
  {
    name: 'CodeChef',
    username: 'abhi_14avd',
    url: 'https://www.codechef.com/users/abhi_14avd',
    logo: `${import.meta.env.BASE_URL}certificates/logo.png`,
    color: '#5B4638',
    bgGradient: 'linear-gradient(135deg, #5B4638 0%, #8B7355 100%)'
  },
  {
    name: 'Codeforces',
    username: 'abhi_14avd',
    url: 'https://codeforces.com/profile/abhi_14avd',
    logo: `${import.meta.env.BASE_URL}certificates/free-code-forces-logo-icon-svg-download-png-2944796.png`,
    color: '#318CE7',
    bgGradient: 'linear-gradient(135deg, #318CE7 0%, #5DADE2 100%)'
  }
];

const certificates = [
  {
    id: 'python-training',
    title: 'Certificate for the Completion of Python 3.4.3 Training',
    organization: 'EduPyramids, SINE, IIT Bombay',
    orgLogo: `${import.meta.env.BASE_URL}certificates/IIT-bombay-Indian-Institute-of-Technology-Bombay.png`,
    credentialId: '4023174R43',
    issuedDate: 'November 2025',
    year: 2025,
    description: 'Scored 70% in the remote Python programming test conducted by EduPyramids.',
    file: 'Certificate for the Completion of python-tarining.pdf'
  },
  {
    id: 'certificate-b3axfxve3ji7',
    title: 'Certificate of Completion: AI Fluency Framework & Foundations',
    organization: 'Anthropic',
    orgLogo: `${import.meta.env.BASE_URL}certificates/anthropic-Picsart-BackgroundRemover.png`,
    credentialId: 'b3axfxve3ji7',
    issuedDate: 'March 2026',
    year: 2026,
    description: 'Learned to efficiently use AI agents, 4D\'s framework, and secure AI practices.',
    file: 'certificate-b3axfxve3ji7-1774327082.pdf'
  },
  {
    id: 'dsa-apna-college',
    title: 'Certificate of Completion - DSA in Java',
    organization: 'Apna College',
    orgLogo: `${import.meta.env.BASE_URL}certificates/apna college.png`,
    credentialId: '662fa0f98bc9344703016d06',
    issuedDate: 'June 2024',
    year: 2024,
    description: 'Completed DSA course with Java language covering core data structures and algorithms.',
    file: 'dsa-completion-apna-college.pdf'
  },
  {
    id: 'full-stack',
    title: 'Certificate of Completion - Full Stack Web Development',
    organization: 'Apna College',
    orgLogo: `${import.meta.env.BASE_URL}certificates/apna college.png`,
    credentialId: '66b4d31180c9fe2a87035972',
    issuedDate: 'January 2026',
    year: 2026,
    description: 'Completed Full Stack Web Development using MERN stack.',
    file: 'full-stack-developer.pdf'
  }
];

const PlatformCard = ({ platform, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: false }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="platform-card"
      style={{
        background: 'rgba(114, 125, 115, 0.05)',
        borderRadius: '20px',
        border: '1px solid var(--border-soft)',
        padding: '2rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 20px 40px ${platform.color}22`;
        e.currentTarget.style.borderColor = platform.color;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'var(--border-soft)';
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          top: '-30px',
          right: '-30px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: platform.color,
          opacity: 0.08,
          filter: 'blur(25px)'
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{
          width: '52px',
          height: '52px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          overflow: 'hidden'
        }}>
          <img
            src={platform.logo}
            alt={platform.name}
            style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }}
          />
        </div>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>
            {platform.name}
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
            @{platform.username}
          </p>
        </div>
      </div>

      <a
        href={platform.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.6rem 1.2rem',
          background: platform.bgGradient,
          color: '#fff',
          borderRadius: '10px',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: '600',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = `0 8px 20px ${platform.color}33`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        View Profile <ExternalLink size={14} />
      </a>
    </motion.div>
  );
};

const CertificateCard = ({ cert, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: false }}
      onClick={onClick}
      className="certificate-card"
      style={{
        background: 'rgba(114, 125, 115, 0.05)',
        borderRadius: '12px',
        border: '1px solid var(--border-soft)',
        padding: '1.5rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      {/* Header: Org Logo + Name */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1rem' }}>
        <div style={{
          width: '52px',
          height: '52px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          overflow: 'hidden'
        }}>
          <img
            src={cert.orgLogo}
            alt={cert.organization}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" style="color: var(--army-olive)"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>';
            }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h4 style={{
            fontSize: '1.05rem',
            fontWeight: '700',
            color: 'var(--text-main)',
            marginBottom: '0.2rem',
            lineHeight: '1.3'
          }}>
            {cert.title}
          </h4>
          <p style={{
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            marginBottom: '0.1rem',
            fontWeight: '500'
          }}>
            {cert.organization}
          </p>
          <p style={{
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            marginBottom: '0.1rem'
          }}>
            Issued {cert.issuedDate}
          </p>
          <p style={{
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-tech)',
            wordBreak: 'break-all',
            marginBottom: '0.5rem'
          }}>
            Credential ID: {cert.credentialId}
          </p>
        </div>
      </div>

      {/* Spacer to push button to bottom */}
      <div style={{ flex: 1 }} />

      {/* View Certificate Button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          padding: '0.6rem 1rem',
          background: 'var(--army-olive)',
          color: '#fff',
          borderRadius: '8px',
          fontSize: '0.85rem',
          fontWeight: '600',
          transition: 'all 0.2s ease'
        }}
      >
        <FileText size={14} /> View Details
      </div>
    </motion.div>
  );
};

const CertificateModal = ({ cert, onClose }) => {
  React.useEffect(() => {
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
          padding: '2.5rem',
          maxWidth: '550px',
          width: '100%',
          maxHeight: '85vh',
          overflowY: 'auto',
          position: 'relative',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Close Button */}
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
            transition: 'all 0.2s ease'
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

        {/* Org Logo + Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            overflow: 'hidden'
          }}>
            <img
              src={cert.orgLogo}
              alt={cert.organization}
              style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" style="color: var(--army-olive)"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>';
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: '700',
              color: 'var(--text-main)',
              marginBottom: '0.3rem',
              lineHeight: '1.3'
            }}>
              {cert.title}
            </h3>
            <p style={{
              fontSize: '1rem',
              color: 'var(--army-olive)',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>
              {cert.organization}
            </p>
          </div>
        </div>

        {/* Details Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginBottom: '1.5rem',
          padding: '1.25rem',
          background: 'rgba(114, 125, 115, 0.06)',
          borderRadius: '12px'
        }}>
          <div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Issued</p>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: '600' }}>{cert.issuedDate}</p>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Credential ID</p>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: '600', fontFamily: 'var(--font-tech)', wordBreak: 'break-all' }}>{cert.credentialId}</p>
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>About this certificate</p>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
            {cert.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <a
            href={`${import.meta.env.BASE_URL}certificates/${encodeURIComponent(cert.file)}`}
            target="_blank"
            rel="noopener noreferrer"
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
            <FileText size={16} /> View Certificate
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Achievements = () => {
  const [activeTab, setActiveTab] = useState('platforms');
  const [selectedCert, setSelectedCert] = useState(null);

  const sortedCertificates = useMemo(() => {
    const monthMap = {
      January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
      July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
    };
    
    return [...certificates].sort((a, b) => {
      const [monthA, yearA] = a.issuedDate.split(' ');
      const [monthB, yearB] = b.issuedDate.split(' ');
      
      const dateA = new Date(yearA, monthMap[monthA]);
      const dateB = new Date(yearB, monthMap[monthB]);
      
      return dateB - dateA;
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: false, amount: 0.1 }}
      style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}
    >
      {/* Tab Switcher */}
      <div className="achievements-tab-switcher" style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '3rem',
        flexWrap: 'wrap'
      }}>
        <motion.button
          onClick={() => setActiveTab('platforms')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: '0.75rem 2rem',
            borderRadius: '12px',
            border: activeTab === 'platforms' ? '2px solid var(--army-olive)' : '1px solid var(--border-soft)',
            background: activeTab === 'platforms' ? 'var(--army-olive)' : 'rgba(114, 125, 115, 0.06)',
            color: activeTab === 'platforms' ? '#fff' : 'var(--text-main)',
            fontSize: '0.95rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s ease'
          }}
        >
          <Code size={18} /> Coding Profiles
        </motion.button>
        <motion.button
          onClick={() => setActiveTab('certificates')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: '0.75rem 2rem',
            borderRadius: '12px',
            border: activeTab === 'certificates' ? '2px solid var(--army-olive)' : '1px solid var(--border-soft)',
            background: activeTab === 'certificates' ? 'var(--army-olive)' : 'rgba(114, 125, 115, 0.06)',
            color: activeTab === 'certificates' ? '#fff' : 'var(--text-main)',
            fontSize: '0.95rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s ease'
          }}
        >
          <Award size={18} /> Certificates
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'platforms' ? (
          <motion.div
            key="platforms"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="platform-cards-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {codingPlatforms.map((platform, index) => (
                <PlatformCard key={platform.name} platform={platform} index={index} />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="certificates"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="certificate-cards-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '1.5rem'
            }}>
              {sortedCertificates.map((cert, index) => (
                <CertificateCard key={cert.id} cert={cert} index={index} onClick={() => setSelectedCert(cert)} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedCert && (
          <CertificateModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Achievements;
