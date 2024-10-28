(async function () {
    async function loadQuestionsFromUrl() {
        try {
            const response = await fetch("https://raw.githubusercontent.com/mwarcc/ss/refs/heads/main/quiz");
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            return data;
        } catch (err) {
            console.error('Error loading questions from URL:', err);
            return {};
        }
    }

    let questionsDict = await loadQuestionsFromUrl();

    const CONFIG = {
        colors: {
            background: 'rgba(0, 0, 0, 0.7)',
            headerBg: 'rgba(45, 45, 45, 0.8)',
  
            accent: '#00ff00',
            border: 'rgba(76, 76, 76, 0.8)',
            text: '#ffffff',
            textMuted: '#aaaaaa',
            success: '#5bff5b',
            error: '#ff4c4c'
        },
        animations: {
            transition: 'all 0.3s ease'
        }
    };

    // Inject CSS
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
        .starquiz-container {
            font-family: 'Minecraft', sans-serif;
            position: fixed;
            top: 20px; /* Keep some margin from the top */
            left: 50%; /* Center horizontally */
            transform: translateX(-50%); /* Center the element */
            width: 300px;
            background: ${CONFIG.colors.background};
            border: 1px solid ${CONFIG.colors.border};
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
            opacity: 0;
            transform: translate(-50%, -10px);
            transition: ${CONFIG.animations.transition};
            overflow: hidden;
            z-index: 9999;
            backdrop-filter: blur(5px);
        }
        .starquiz-container.visible {
            opacity: 1;
            transform: translate(-50%, 0); /* Keep centering when visible */
        }
        .starquiz-header {
            background: ${CONFIG.colors.headerBg};
            padding: 12px 16px;
            border-bottom: 1px solid ${CONFIG.colors.border};
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 8px 8px 0 0;
            cursor: default; /* Change cursor to indicate no dragging */
        }
        .starquiz-title {
            color: ${CONFIG.colors.accent};
            font-size: 18px;
            margin: 0;
            text-shadow: 1px 1px 2px black;
        }
        .starquiz-close {
            background: none;
            border: none;
            color: ${CONFIG.colors.text};
            cursor: pointer;
            font-size: 20px;
            transition: ${CONFIG.animations.transition};
        }
        .starquiz-close:hover {
            color: ${CONFIG.colors.error};
        }
        .starquiz-content {
            padding: 16px;
            color: ${CONFIG.colors.text};
        }
        .starquiz-footer {
            padding: 10px;
            border-top: 1px solid ${CONFIG.colors.border};
            color: ${CONFIG.colors.textMuted};
            font-size: 12px;
            text-align: center;
        }
        .status-indicator {
            font-weight: bold;
            color: ${CONFIG.colors.accent};
        }
        .quizStatus {
            background: none !important; /* Ensure no background */
            color: ${CONFIG.colors.text}; /* Ensure text color is set */
            border: none; /* Remove any border that might create visual artifacts */
            position: relative; /* If needed for positioning */
            padding: 0; /* No padding */
        }
        
    `;
    document.head.appendChild(styleSheet);

    // Create main container
    const container = document.createElement('div');
    container.className = 'starquiz-container';

    // Set up the HTML structure
    container.innerHTML = `
        <div class="starquiz-header">
            <h3 class="starquiz-title">MSP2 AutoStarQuiz</h3>
            <button class="starquiz-close">✕</button>
        </div>
        <div class="starquiz-content">
            <div id="quizStatus" class="starquiz-footer">
                <span class="status-indicator">Status:</span> <span id="statusText">Disconnected</span>
                <div id="botStatus" class="bot-status">Bot is idle</div>
            </div>
        </div>
    `;

    document.body.appendChild(container);
    requestAnimationFrame(() => container.classList.add('visible'));

    // Select UI elements
    const closeButton = container.querySelector('.starquiz-close');
    const statusText = document.querySelector('#statusText');
    const botStatus = document.querySelector('#botStatus');

    let socket;

    // WebSocket Setup
    const OriginalWebSocket = window.WebSocket;
    window.WebSocket = function (...args) {
        socket = new OriginalWebSocket(...args);

        // Handle open connection
        socket.addEventListener('open', () => {
            console.log('WebSocket connected');
            updateConnectionStatus(true);
        });

        // Handle close connection
        socket.addEventListener('close', () => {
            console.log('WebSocket disconnected');
            updateConnectionStatus(false);
        });

        // Handle messages
        socket.addEventListener('message', (event) => {
            const messageString = event.data;

            // Update connection status for JWT message
            if (messageString.startsWith('40{"jwt":"')) {
                if (socket.readyState === WebSocket.OPEN) {
                    updateConnectionStatus(true);
                }
            }
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
                   

                    // Check the current question being answered
                    if (currentQuestion && questionsDict[currentQuestion]?.correctAnswer !== null) {
                        const correctAnswer = questionsDict[currentQuestion].correctAnswer;
                        socket.send(`42${JSON.stringify(['quiz:answer', { "answer": correctAnswer }])}`);
                      
                    } else {
                        const answer = Math.floor(Math.random() * 3) + 1;
                        socket.send(`42${JSON.stringify(['quiz:answer', { "answer": answer }])}`);
                       
                    }
                }
            } else if (messageType === 'quiz:chal') {
                const { question, answers } = messageContent;
                if (question && answers) {
                    currentQuestion = question; // Set the current question
                    if (!questionsDict[question]) {
                        questionsDict[question] = { answers, correctAnswer: null };
                     
                      
                    } else {
                       
                    }
                }
            } else if (messageType === 'quiz:reveal') {
                const { correctAnswer } = messageContent;
                if (currentQuestion) {
                    questionsDict[currentQuestion].correctAnswer = correctAnswer;
                   
                }
            }
        }
        });

        socket.addEventListener('error', () => {
            updateConnectionStatus(false);
        });

        return socket;
    };

    function updateConnectionStatus(connected) {
        statusText.textContent = connected ? 'Connected' : 'Disconnected';
        botStatus.textContent = connected ? 'Bot is idle' : 'Disconnected';
    }

    closeButton.onclick = () => {
        container.classList.remove('visible');
        setTimeout(() => container.remove(), 200);
    };

    // Remove dragging functionality
    /*
    // Dragging functionality
    let isDragging = false;
    let offsetX, offsetY;

    const header = container.querySelector('.starquiz-header');

    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - container.getBoundingClientRect().left;
        offsetY = e.clientY - container.getBoundingClientRect().top;
        document.body.style.cursor = 'move'; // Change cursor to indicate dragging
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            container.style.left = `${e.clientX - offsetX}px`;
            container.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        document.body.style.cursor = ''; // Reset cursor when not dragging
    });
    */

    // Restore the original WebSocket
    Object.assign(window.WebSocket, OriginalWebSocket);

    // Cleanup function when done
    return () => {
        container.remove();
        styleSheet.remove();
        window.WebSocket = OriginalWebSocket;
    };
})();
