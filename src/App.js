import React from 'react';
import './App.css';
import profileImage from './profile.jpg';
import Chatbot from './Chatbot'; // Import the Chatbot component

function App() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="App App-fade-in" // Added App-fade-in for overall page animation
      style={{ background: '#1a1a1a', color: 'white', minHeight: '100vh', padding: '2rem' }}
    >
      <h2 className="name-animation">Hi, I'm</h2>
      <h1 className="name-animation" style={{ fontSize: '3rem', fontWeight: 'bold' }}>Darren</h1>
      <h3 className="title-animation" style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
        and I'm a <span style={{ color: '#aaa' }}>Data Engineer</span>
      </h3>

      <div style={{ marginTop: '1.5rem' }}>
        <a
          href="/Darren_CV.pdf"
          download
          className="button-hover-effect" // Added button hover effect
          style={{
            marginRight: '1rem',
            padding: '0.5rem 1rem',
            background: '#fff',
            color: '#000',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            display: 'inline-block', // Added for proper transform
          }}
        >
          Download CV
        </a>

        <button
          onClick={scrollToContact}
          className="button-hover-effect" // Added button hover effect
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
        className="image-pop-in" // Added image pop-in animation
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
        className="contact-slide-up" // Added contact section slide-up animation
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
      </div>

      {/* Projects Section */}
      <div
        id="projects"
        className="projects-slide-up" // Similar animation to contact
        style={{ marginTop: '5rem', paddingTop: '2rem', borderTop: '1px solid #444' }}
      >
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>🚀 My Projects</h2>
        <div className="projects-grid">
          {/* Placeholder Project 1 */}
          <div className="project-card">
            <img src="https://via.placeholder.com/300x200.png?text=Project+Image+1" alt="Project 1" style={{ width: '100%', borderRadius: '4px' }} />
            <h3 style={{ marginTop: '1rem' }}>Project Title 1</h3>
            <p style={{ marginTop: '0.5rem', color: '#ccc' }}>
              A brief description of Project 1. Highlighting key technologies and outcomes.
            </p>
            <a href="#" target="_blank" rel="noopener noreferrer" className="project-link">View Project</a>
          </div>

          {/* Placeholder Project 2 */}
          <div className="project-card">
            <img src="https://via.placeholder.com/300x200.png?text=Project+Image+2" alt="Project 2" style={{ width: '100%', borderRadius: '4px' }} />
            <h3 style={{ marginTop: '1rem' }}>Project Title 2</h3>
            <p style={{ marginTop: '0.5rem', color: '#ccc' }}>
              A brief description of Project 2. Focusing on the challenges and solutions.
            </p>
            <a href="#" target="_blank" rel="noopener noreferrer" className="project-link">View Project</a>
          </div>

          {/* Placeholder Project 3 */}
          <div className="project-card">
            <img src="https://via.placeholder.com/300x200.png?text=Project+Image+3" alt="Project 3" style={{ width: '100%', borderRadius: '4px' }} />
            <h3 style={{ marginTop: '1rem' }}>Project Title 3</h3>
            <p style={{ marginTop: '0.5rem', color: '#ccc' }}>
              A brief description of Project 3. What I learned and achieved.
            </p>
            <a href="#" target="_blank" rel="noopener noreferrer" className="project-link">View Project</a>
          </div>
        </div>
      </div>
      <Chatbot /> {/* Add the Chatbot component here */}
    </div>
  );
}

export default App;
