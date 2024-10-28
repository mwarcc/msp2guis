(function () {

  async function loadQuestionsFromUrl() {
      try {
          // Send a GET request to the provided URL
          const response = await fetch("https://raw.githubusercontent.com/mwarcc/ss/refs/heads/main/quiz");
  
          // Check if the response is OK (status code 200-299)
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          // Parse the JSON response
          const data = await response.json();
          return data; // Return the loaded questions
      } catch (err) {
          console.error('Error loading questions from URL:', err);
          return {}; // Return an empty object in case of an error
      }
  }

  let questionsDict = loadQuestionsFromUrl();

  const CONFIG = {
      colors: {
          background: '#1e1e1e',
          headerBg: '#252526',
          buttonBg: '#2d2d2d',
          buttonHover: '#3e3e3e',
          accent: '#0078d4',
          border: '#404040',
          text: '#cccccc',
          textMuted: '#888888',
          success: '#47d147',
          error: '#ff3333' // Red color for error state
      },
      animations: {
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
      }
  };

  // Create and inject required styles
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
      .starquiz-container {
          --shadow-color: rgba(0, 0, 0, 0.4);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          position: fixed;
          top: 20px;
          left: 20px;
          width: 300px;
          background: ${CONFIG.colors.background};
          border: 1px solid ${CONFIG.colors.border};
          border-radius: 8px;
          box-shadow: 0 4px 6px var(--shadow-color);
          z-index: 999999;
          opacity: 0;
          transform: translateY(-10px);
          transition: ${CONFIG.animations.transition};
      }

      .starquiz-container.visible {
          opacity: 1;
          transform: translateY(0);
      }

      .starquiz-header {
          background: ${CONFIG.colors.headerBg};
          padding: 12px 16px;
          border-bottom: 1px solid ${CONFIG.colors.border};
          border-radius: 8px 8px 0 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
      }

      .starquiz-title {
          color: ${CONFIG.colors.text};
          font-size: 16px;
          margin: 0;
      }

      .starquiz-close {
          background: transparent;
          border: none;
          color: ${CONFIG.colors.text};
          cursor: pointer;
          padding: 4px 8px;
          font-size: 16px;
          transition: ${CONFIG.animations.transition};
      }

      .starquiz-close:hover {
          background: ${CONFIG.colors.buttonHover};
      }

      .starquiz-content {
          padding: 16px;
      }

      .starquiz-button {
          width: 100%;
          padding: 10px 12px;
          margin: 6px 0;
          background: ${CONFIG.colors.buttonBg};
          border: 1px solid ${CONFIG.colors.border};
          border-radius: 4px;
          color: ${CONFIG.colors.text};
          font-size: 14px;
          cursor: pointer;
          transition: ${CONFIG.animations.transition};
      }

      .starquiz-button:hover {
          background: ${CONFIG.colors.buttonHover};
      }

     .starquiz-button.disabled {
  background: #ff3333 !important; /* Bright red background for disabled state */
  color: #fff !important; /* White text for better contrast */
  cursor: not-allowed;
}

      .starquiz-footer {
          padding: 8px 16px;
          border-top: 1px solid ${CONFIG.colors.border};
          font-size: 12px;
          color: ${CONFIG.colors.textMuted};
          text-align: center;
      }

      .status-indicator {
          margin-right: 8px;
          font-weight: bold;
      }
  `;
  document.head.appendChild(styleSheet);

  // Create main container
  const container = document.createElement('div');
  container.className = 'starquiz-container';

  // Create UI structure
  container.innerHTML = `
      <div class="starquiz-header">
          <h3 class="starquiz-title">StarQuiz Controller</h3>
          <button class="starquiz-close">✕</button>
      </div>
      <div class="starquiz-content">
          <button class="starquiz-button" id="stopQuiz" disabled>Stop Quiz</button>
          <div id="quizStatus" class="starquiz-footer">
              <span class="status-indicator">Status: </span><span id="statusText">Disconnected</span>
          </div>
      </div>
  `;

  // Add to DOM and animate in
  document.body.appendChild(container);
  requestAnimationFrame(() => container.classList.add('visible'));

  // Get UI elements
  const closeButton = container.querySelector('.starquiz-close');
  const stopQuizButton = container.querySelector('#stopQuiz');
  const statusText = document.querySelector('#statusText');

  let socket;

  // WebSocket handling
  const OriginalWebSocket = window.WebSocket;
  window.WebSocket = function (...args) {
      socket = new OriginalWebSocket(...args);
      
      socket.addEventListener('open', () => {
          console.log('WebSocket connected');
          updateConnectionStatus(true);
      });

      socket.addEventListener('close', () => {
          console.log('WebSocket disconnected');
          updateConnectionStatus(false);
      });

      socket.addEventListener('message', (event) => {
          const messageData = event.data;

          if (messageData.startsWith('42["1000"]')) {
              console.log('Received connection message');
              updateConnectionStatus(true);
          }

          const messageString = event.data;

          if (messageString.match(/^\d+$/)) {
              return;
          }
  
          let jsonString = messageString.startsWith('42[')
              ? messageString.substring(2)
              : messageString;

              if (jsonString.startsWith('[') && jsonString.endsWith(']')) {
                  const [_, payload] = JSON.parse(jsonString);
                  const { messageType, messageContent } = payload;
      
                  if (messageType === 'game:state') {
                      if (messageContent.newState === 'waiting_for_answer') {
                          console.log('Waiting for answer...');

                          const lastQuestion = Object.keys(questionsDict).find(q => questionsDict[q].correctAnswer !== null);
                          if (lastQuestion) {
                              const correctAnswer = questionsDict[lastQuestion].correctAnswer;
                              socket.send(`42${JSON.stringify(['quiz:answer', { "answer": correctAnswer }])}`);
                              console.log(`Sent correct answer: ${correctAnswer}`);
                          } else {
                              const answer = Math.floor(Math.random() * 3) + 1;
                              socket.send(`42${JSON.stringify(['quiz:answer', { "answer": answer }])}`);
                              console.log(`Sent random answer: ${answer}`);
                          }
                      }
                  }else if (messageType === 'quiz:chal') {
                      const { question, answers } = messageContent;
                      if (question && answers) {
                          if (!questionsDict[question]) {  // Only add if the question doesn't already exist
                              questionsDict[question] = { answers, correctAnswer: null };
                              console.log('\nQuestion added: ' + question);
      
          
                          } else {
                              console.log('\nQuestion already exists: ' + question);
                          }
                      }
                  } else if (messageType === 'quiz:reveal') {
                      const { correctAnswer } = messageContent;
                      const question = Object.keys(questionsDict).find(q => questionsDict[q].correctAnswer === null);
                      if (question) {
                          questionsDict[question].correctAnswer = correctAnswer;
                          console.log('Updated question' + question + ' with correct answer: ' + correctAnswer);
      
                    
      
                      }
                  }
              }

      });

      socket.addEventListener('error', (error) => {
          console.error('WebSocket error:', error);
          updateConnectionStatus(false);
      });

      return socket;
  };

  function updateConnectionStatus(connected) {
      statusText.textContent = connected ? 'Connected' : 'Disconnected';
      stopQuizButton.disabled = !connected;  // Disable button if disconnected
  
      if (!connected) {
          stopQuizButton.classList.add('disabled'); // Add disabled class
          stopQuizButton.style.background = CONFIG.colors.error; // Set background to red
          stopQuizButton.style.color = '#fff'; // Set text color to white for contrast
      } else {
          stopQuizButton.classList.remove('disabled'); // Remove disabled class
          stopQuizButton.style.background = ''; // Reset background color
          stopQuizButton.style.color = ''; // Reset text color
      }
  }

  function stopQuiz() {
      // Stop quiz logic can go here
      console.log("Stop Quiz button clicked");
  }

  // Event listeners
  closeButton.onclick = () => {
      container.classList.remove('visible');
      setTimeout(() => container.remove(), 200);
  };

  stopQuizButton.onclick = stopQuiz;

  // Restore original WebSocket
  Object.assign(window.WebSocket, OriginalWebSocket);

  // Return cleanup function
  return () => {
      container.remove();
      styleSheet.remove();
      window.WebSocket = OriginalWebSocket;
  };
})();
