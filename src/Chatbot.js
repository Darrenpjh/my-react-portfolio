import React, { useState } from 'react';
import ragData from './ragData'; // Import the data

// Basic RAG-like function (very simplified)
const getResponse = (query) => {
  const queryLower = query.toLowerCase();
  const dataLines = ragData.toLowerCase().split('\n');
  let relevantLines = [];

  // Find lines that contain keywords from the query
  dataLines.forEach(line => {
    const keywords = queryLower.split(' ').filter(kw => kw.length > 2); // Basic keyword extraction
    if (keywords.some(keyword => line.includes(keyword))) {
      relevantLines.push(line);
    }
  });

  if (relevantLines.length > 0) {
    // Return a few relevant lines, could be improved with better ranking
    return relevantLines.slice(0, 3).join('\n') || "Found some information: " + relevantLines[0];
  }

  // Generic fallback if no specific info found
  if (queryLower.includes('hello') || queryLower.includes('hi')) {
    return "Hello! How can I help you learn more about Darren?";
  }
  if (queryLower.includes('education')) {
    return "Darren studied Electronics and Data Engineering at Singapore Institute of Technology and has a Diploma in Electrical and Electronic Engineering from Republic Polytechnic. You can find more details in his CV.";
  }
  if (queryLower.includes('experience') || queryLower.includes('work')) {
    return "Darren has work experience as an Assistant Camp-In-Charge, an Admin Support Assistant in SAF, and as an ICA Officer during an internship. For specifics, please check his CV or ask a more targeted question.";
  }
  if (queryLower.includes('projects')) {
    return "Darren has worked on projects like an Injection Moulding Process Prediction using machine learning and a wearable tracker device. More details are in his CV and the projects section of this page.";
  }
  if (queryLower.includes('skills')) {
    return "Darren's skills include Python, C++, SQL, Data Analytics (Pandas, Matplotlib), and more. He also holds certificates like Google AI Essentials. Check his CV for a full list.";
  }

  return "I'm still learning! Try asking about Darren's education, experience, projects, or skills. For detailed information, you can download his CV.";
};


function Chatbot() {
  const [messages, setMessages] = useState([{ text: "Hi! Ask me anything about Darren.", sender: 'bot' }]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };
      const botResponse = { text: getResponse(input), sender: 'bot' };
      setMessages([...messages, userMessage, botResponse]);
      setInput('');
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    // Reset messages if closing and reopening, or keep history
    if (!isOpen && messages.length === 1 && messages[0].sender === 'bot' && messages[0].text !== "Hi! Ask me anything about Darren.") {
        // This condition means it was likely closed and reopened without interaction, so reset to initial.
        // Or if you want to clear history every time it's opened:
        // setMessages([{ text: "Hi! Ask me anything about Darren.", sender: 'bot' }]);
    } else if (isOpen) {
        // Optionally, clear messages when closing, or keep them.
        // For now, we keep them. If you want to clear:
        // setMessages([{ text: "Hi! Ask me anything about Darren.", sender: 'bot' }]);
    }
  };


  if (!isOpen) {
    return (
      <button onClick={toggleChatbot} style={styles.chatToggleButton}>
        Ask DarrenBot 🤖
      </button>
    );
  }

  return (
    <div style={styles.chatbotContainer}>
      <button onClick={toggleChatbot} style={styles.closeButton}>X</button>
      <div style={styles.chatWindow}>
        {messages.map((msg, index) => (
          <div key={index} style={msg.sender === 'bot' ? styles.botMessage : styles.userMessage}>
            {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.inputArea}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          style={styles.inputField}
          placeholder="Ask a question..."
        />
        <button onClick={handleSend} style={styles.sendButton}>Send</button>
      </div>
    </div>
  );
}

const styles = {
  chatToggleButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '10px 20px',
    backgroundColor: '#4FC3F7',
    color: 'black',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '1rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    zIndex: 1000,
  },
  chatbotContainer: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '350px',
    height: '500px',
    backgroundColor: '#2c2c2c',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1000,
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '1.2rem',
    cursor: 'pointer',
  },
  chatWindow: {
    flexGrow: 1,
    padding: '15px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#444',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: '10px 10px 10px 0',
    maxWidth: '80%',
    wordWrap: 'break-word',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4FC3F7',
    color: '#000',
    padding: '8px 12px',
    borderRadius: '10px 10px 0 10px',
    maxWidth: '80%',
    wordWrap: 'break-word',
  },
  inputArea: {
    display: 'flex',
    padding: '10px',
    borderTop: '1px solid #444',
  },
  inputField: {
    flexGrow: 1,
    padding: '10px',
    border: '1px solid #555',
    borderRadius: '5px',
    backgroundColor: '#333',
    color: '#fff',
    marginRight: '10px',
  },
  sendButton: {
    padding: '10px 15px',
    backgroundColor: '#4FC3F7',
    color: 'black',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};

export default Chatbot;
