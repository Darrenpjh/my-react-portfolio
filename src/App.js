import React from 'react';
import './App.css';
import profileImage from './profile.jpg';

function App() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="App"
      style={{ background: '#1a1a1a', color: 'white', minHeight: '100vh', padding: '2rem' }}
    >
      <h2>Hi, I'm</h2>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Darren</h1>
      <h3 style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
        and I'm a <span style={{ color: '#aaa' }}>Data Engineer</span>
      </h3>

      <div style={{ marginTop: '1.5rem' }}>
        <a
          href="/Darren_CV.pdf"
          download
          style={{
            marginRight: '1rem',
            padding: '0.5rem 1rem',
            background: '#fff',
            color: '#000',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
          }}
        >
          Download CV
        </a>

        <button
          onClick={scrollToContact}
          style={{
            padding: '0.5rem 1rem',
            background: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Contact Info
        </button>
      </div>

      <img
        src={profileImage}
        alt="Darren"
        style={{
          width: '250px',
          borderRadius: '50%',
          marginTop: '2rem',
          boxShadow: '0 0 25px #000',
        }}
      />

      {/* Contact Section */}
      <div
        id="contact"
        style={{ marginTop: '5rem', paddingTop: '2rem', borderTop: '1px solid #444' }}
      >
        <h2 style={{ fontSize: '2rem' }}>📬 Contact Me</h2>
        <p style={{ marginTop: '1rem' }}>
          Email:{' '}
          <a href="mailto:darrenpng61@gmail.com" style={{ color: '#4FC3F7' }}>
            darrenpng61@gmail.com
          </a>
        </p>
        <p>
          LinkedIn:{' '}
          <a
            href="https://www.linkedin.com/in/darren-png/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#4FC3F7' }}
          >
            https://www.linkedin.com/in/darren-png/
          </a>
        </p>
        <p>
          GitHub:{' '}
          <a
            href= "https://github.com/Darrenpjh"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#4FC3F7' }}
          >
            github.com/darren
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
