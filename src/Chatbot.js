import React, { useState, useEffect, useRef } from 'react';
import ragData from './ragData'; // Import the local data

// Simple keyword-based response generation
const getResponse = (query) => {
  const queryLower = query.toLowerCase();
  const dataLines = ragData.toLowerCase().split('\n');
  let relevantLines = [];

  // Basic keyword matching
  dataLines.forEach(line => {
    const keywords = queryLower.split(' ').filter(kw => kw.length > 2); // Extract keywords from query
    if (keywords.some(keyword => line.includes(keyword))) {
      relevantLines.push(line);
    }
  });

  if (queryLower.includes('hello') || queryLower.includes('hi')) {
    return "Hello! I'm Darren's personal bot. How can I help you learn more about him today?";
  }
  if (queryLower.includes('who are you') || queryLower.includes('what are you')) {
    return "I am a friendly chatbot here to tell you about Darren Png. Ask me about his experience, projects, or skills!";
  }

  if (relevantLines.length > 0) {
    // Return a few relevant lines. This can be made more sophisticated.
    // For now, just join the first few, or a specific one if only one is found.
    if (relevantLines.length === 1) return relevantLines[0];
    return relevantLines.slice(0, 2).join('. ') + "."; // Join first 2 relevant lines
  }

  // Fallback for common topics if no direct keyword match in ragData is strong
  if (queryLower.includes('education') || queryLower.includes('study') || queryLower.includes('school')) {
    return "Darren holds a Bachelor of Engineering with Honors in Electronics and Data Engineering from Singapore Institute of Technology – Technical University of Munich, and a Diploma in Electrical and Electronic Engineering from Republic Polytechnic. You can ask for more details on specific modules!";
  }
  if (queryLower.includes('experience') || queryLower.includes('work') || queryLower.includes('job')) {
    return "Darren is currently an Intern Data Engineer (Failure Analysis) at STMicroelectronics. He also has experience as an Assistant Camp-In-Charge at PeopleUp, an Admin Support Assistant in SAF, and an ICA Officer during an internship. Ask about a specific role for more details!";
  }
  if (queryLower.includes('project')) {
    return "Darren has worked on several projects, including an Injection Moulding Process Prediction using machine learning and a Wearable tracker device for people with intellectual disabilities. You can find more details in the 'My Projects' section or ask about a specific one.";
  }
  if (queryLower.includes('skill') || queryLower.includes('proficient') || queryLower.includes('knows')) {
    return "Darren's skills include Microsoft Office, Python, C++, Data Analytics (Pandas, Matplotlib), SQL, AutoCAD, and MATLAB. He's also proficient in English and Chinese and holds certificates like Google AI Essentials.";
  }
  if (queryLower.includes('about darren') || queryLower.includes('tell me about darren')) {
      return "Darren is a Data Engineer passionate about automation and data-driven improvements, especially in the semiconductor industry. He focuses on using manufacturing data for smarter decision-making and higher efficiency. He enjoys creating solutions that reduce manual work and help engineering teams. Ask more specific questions if you like!"
  }


  return "I'm still learning about Darren! Try asking about his education, work experience, projects, or skills. You can also find more details on his portfolio page or by downloading his CV.";
};

function Chatbot() {
  const [messages, setMessages] = useState([{ text: "Hi! Ask me anything about Darren.", sender: 'bot', isTyping: false }]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const chatboxRef = useRef(null);

  // Scroll to bottom of chatbox when new messages are added or typing starts
  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  const typeMessage = (fullMessage) => {
    setMessages(prevMessages => {
        const lastMessage = prevMessages[prevMessages.length - 1];
        if (lastMessage && lastMessage.sender === 'bot' && lastMessage.isTyping) {
            // Update the existing typing message
            return prevMessages.slice(0, -1).concat({ ...lastMessage, text: '', isTyping: true });
        }
        // Add a new typing message placeholder
        return [...prevMessages, { text: '', sender: 'bot', isTyping: true }];
    });

    let currentText = '';
    let charIndex = 0;
    const typingSpeed = 30; // milliseconds per character

    const intervalId = setInterval(() => {
      currentText += fullMessage[charIndex];
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1] = { text: currentText, sender: 'bot', isTyping: true };
        return updatedMessages;
      });
      charIndex++;
      if (charIndex === fullMessage.length) {
        clearInterval(intervalId);
        setMessages(prevMessages => {
          const updatedMessages = [...prevMessages];
          updatedMessages[updatedMessages.length - 1] = { ...updatedMessages[updatedMessages.length - 1], isTyping: false };
          return updatedMessages;
        });
      }
    }, typingSpeed);
  };


  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user', isTyping: false };
      // Add user message first
      setMessages(prevMessages => [...prevMessages, userMessage]);

      const botResponseText = getResponse(input);
      setInput(''); // Clear input after getting response text

      // Simulate bot thinking time then type out the message
      setTimeout(() => {
        typeMessage(botResponseText);
      }, 500); // Short delay before bot starts "typing"
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length <= 1) { // Reset to initial greeting if closed and reopened with no/initial interaction
        setMessages([{ text: "Hi! Ask me anything about Darren.", sender: 'bot', isTyping: false }]);
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
      <div style={styles.header}>
        <span>DarrenBot</span>
        <button onClick={toggleChatbot} style={styles.closeButton}>X</button>
      </div>
      <div ref={chatboxRef} style={styles.chatWindow}>
        {messages.map((msg, index) => (
          <div key={index} style={msg.sender === 'bot' ? styles.botMessage : styles.userMessage}>
            <span style={styles.messageSender}>{msg.sender === 'bot' ? 'Bot' : 'You'}: </span>
            {msg.text}
            {msg.isTyping && <span style={styles.typingCursor}></span>}
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
        <button onClick={handleSend} style={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  chatToggleButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '12px 20px',
    backgroundColor: '#007bff', // Brighter blue
    color: 'white',
    border: 'none',
    borderRadius: '25px', // More rounded
    cursor: 'pointer',
    fontSize: '1rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
    zIndex: 1000,
    transition: 'background-color 0.2s ease',
  },
  chatbotContainer: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '370px', // Slightly wider
    height: '550px', // Slightly taller
    backgroundColor: '#282c34', // Darker background
    borderRadius: '15px', // More rounded corners
    boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1000,
    overflow: 'hidden', // Important for border radius on children
    color: '#f1f1f1', // Light text color for contrast
  },
  header: {
    backgroundColor: '#20232a', // Slightly different dark shade for header
    color: '#61dafb', // React blue for header text
    padding: '10px 15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #444',
    fontSize: '1.1rem',
    fontWeight: 'bold',
  },
  closeButton: {
    background: 'transparent',
    border: 'none',
    color: '#f1f1f1', // Light color for X
    fontSize: '1.5rem', // Larger X
    cursor: 'pointer',
    padding: '5px',
  },
  chatWindow: {
    flexGrow: 1,
    padding: '15px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px', // Increased gap
    scrollbarWidth: 'thin', // For Firefox
    scrollbarColor: '#61dafb #282c34', // For Firefox
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#3a3f47', // Slightly lighter dark for bot messages
    padding: '10px 15px',
    borderRadius: '15px 15px 15px 5px', // Bubble shape
    maxWidth: '85%',
    wordWrap: 'break-word',
    lineHeight: '1.4',
    position: 'relative', // For typing cursor positioning
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff', // User message blue
    color: 'white',
    padding: '10px 15px',
    borderRadius: '15px 15px 5px 15px', // Bubble shape
    maxWidth: '85%',
    wordWrap: 'break-word',
    lineHeight: '1.4',
  },
  messageSender: {
    fontWeight: 'bold',
    display: 'block',
    marginBottom: '4px',
    fontSize: '0.8em',
    color: '#aaa', // Lighter color for sender name
  },
  typingCursor: { // Simple blinking cursor
    display: 'inline-block',
    width: '8px',
    height: '1em',
    backgroundColor: '#61dafb', // React blue or a contrasting color
    animation: 'blink 1s step-end infinite',
    marginLeft: '4px',
  },
  // Add this to your CSS or within a <style> tag in index.html for the keyframes
  // @keyframes blink { from, to { background-color: transparent } 50% { background-color: #61dafb; } }
  // Since this is JS styles, we'll handle blinking differently or omit for simplicity if not directly doable.
  // For a simpler visual cue, you could just append "..." or a unicode character.
  // The current implementation updates text directly, so a separate 'isTyping' visual like "Bot is typing..." might be better if a true cursor is hard.
  // The provided code adds a span for a cursor, but the @keyframes blink needs to be in CSS.
  // Let's adjust the `loadingIndicator` style for a text-based typing indicator.
  loadingIndicator: { // This was from the API version, repurposing for text typing effect.
    alignSelf: 'flex-start',
    color: '#aaa',
    padding: '10px 0px', // Adjusted padding
    fontStyle: 'italic',
    display: 'inline', // To show next to the partially typed message
  },
  inputArea: {
    display: 'flex',
    padding: '15px',
    borderTop: '1px solid #444',
    backgroundColor: '#20232a', // Match header background
  },
  inputField: {
    flexGrow: 1,
    padding: '12px 15px',
    border: '1px solid #444',
    borderRadius: '20px', // Rounded input field
    backgroundColor: '#3a3f47', // Dark input background
    color: '#f1f1f1',
    marginRight: '10px',
    fontSize: '0.95rem',
  },
  inputField_placeholder: {
    color: '#888',
  },
  sendButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '20px', // Rounded button
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: 'bold',
    transition: 'background-color 0.2s ease',
  },
   // styles.sendButton_hover and styles.sendButton_disabled are not directly used by React inline styles
   // but are good for reference if converting to CSS modules or styled-components
};

// Keyframes for blinking cursor (needs to be injected globally or App.css)
const globalStyles = `
  @keyframes blink {
    from, to { background-color: transparent; }
    50% { background-color: #61dafb; }
  }
`;

// Inject global styles - simple way for this example
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = globalStyles;
document.head.appendChild(styleSheet);


export default Chatbot;
