(async function () {
    async function loadQuestionsFromUrl() {
        try {
            const response = await fetch("https://raw.githubusercontent.com/mwarcc/ss/refs/heads/main/quiz");
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return await response.json();
        } catch (err) {
            console.error('Error loading questions from URL:', err);
            return {};
        }
    }
////
    let questionsDict = await loadQuestionsFromUrl();
    let currentQuestion = null;
    let currentAction = 'Initializing...';
    let isConnected = false; 

    const CONFIG = {
        colors: {
            primary: '#6366f1',
            primaryLight: '#818cf8',
            primaryDark: '#4f46e5',
            background: 'rgba(15, 23, 42, 0.98)',
            surface: '#1e293b',
            surfaceHover: '#334155',
            border: 'rgba(99, 102, 241, 0.15)',
            shadow: 'rgba(0, 0, 0, 0.3)',
            text: '#f8fafc',
            textMuted: '#94a3b8',
            success: '#22c55e',
            error: '#ef4444',
            warning: '#eab308'
        },
        animations: {
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            slideIn: 'slideIn 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            fadeIn: 'fadeIn 0.3s ease-out'
        }
    };

    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes slideIn {
            from { opacity: 0; transform: translate(-50%, -10px); }
            to { opacity: 1; transform: translate(-50%, 0); }
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .quiz-container {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            position: fixed;
            top: 15px;
            left: 50%;
            transform: translateX(-50%);
            width: 100%; /* Make responsive */
            max-width: 400px; /* Max width for the quiz */
            background: ${CONFIG.colors.background};
            border-radius: 16px;
            box-shadow: 0 8px 24px ${CONFIG.colors.shadow},
                        0 0 0 1px ${CONFIG.colors.border};
            opacity: 0;
            z-index: 9999;
            backdrop-filter: blur(12px);
            animation: ${CONFIG.animations.slideIn};
            animation-fill-mode: forwards;
            transition: width 0.3s ease; /* Smooth width transition */
        }

        @media (max-width: 480px) {
            .quiz-container {
                width: 90%; /* Full width on small screens */
            }
        }

        .quiz-header {
            background: ${CONFIG.colors.surface};
            padding: 12px 16px;
            border-bottom: 1px solid ${CONFIG.colors.border};
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 16px 16px 0 0;
            cursor: move; /* Indicate draggable */
        }

        .quiz-title {
            color: ${CONFIG.colors.text};
            font-size: 14px;
            font-weight: 600;
            margin: 0;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .quiz-title::before {
            content: '';
            display: inline-block;
            width: 6px;
            height: 6px;
            background: ${CONFIG.colors.primary};
            border-radius: 50%;
            box-shadow: 0 0 8px ${CONFIG.colors.primary};
            animation: ${CONFIG.animations.pulse};
        }

        .quiz-close {
            background: transparent;
            border: none;
            color: ${CONFIG.colors.textMuted};
            cursor: pointer;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 6px;
            font-size: 18px;
            transition: ${CONFIG.animations.transition};
        }

        .quiz-close:hover {
            background: ${CONFIG.colors.surfaceHover};
            color: ${CONFIG.colors.text};
        }

        .quiz-content {
            padding: 12px;
        }

        .quiz-section {
            background: ${CONFIG.colors.surface};
            border-radius: 12px;
            padding: 12px;
            margin-bottom: 12px;
            border: 1px solid ${CONFIG.colors.border};
            animation: ${CONFIG.animations.fadeIn};
        }

        .quiz-section:last-child {
            margin-bottom: 0;
        }

        .section-title {
            color: ${CONFIG.colors.textMuted};
            font-size: 11px;
            font-weight: 500;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .status-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 8px;
            padding: 6px 8px;
            border-radius: 8px;
            transition: ${CONFIG.animations.transition};
        }

        .status-row:last-child {
            margin-bottom: 0;
        }

        .status-label {
            color: ${CONFIG.colors.textMuted};
            font-size: 12px;
            font-weight: 500;
        }

        .status-value {
            color: ${CONFIG.colors.text};
            font-size: 12px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .status-indicator {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: currentColor;
            box-shadow: 0 0 8px currentColor;
        }

        .status-connected { color: ${CONFIG.colors.success}; }
        .status-disconnected { color: ${CONFIG.colors.error}; }
        .status-idle { color: ${CONFIG.colors.warning}; }

        .question-card {
            background: ${CONFIG.colors.surfaceHover};
            border-radius: 8px;
            padding: 10px;
            margin-top: 8px;
        }

        .question-text {
            color: ${CONFIG.colors.text};
            font-size: 12px;
            margin-bottom: 8px;
            font-weight: 400;
            line-height: 1.5;
        }

        .correct-answer {
            color: ${CONFIG.colors.success};
            font-size: 12px;
            font-weight: 500;
            padding: 4px 8px;
            background: ${CONFIG.colors.success}10;
            border-radius: 6px;
            border: 1px solid ${CONFIG.colors.success}20;
        }

        .current-action {
            color: ${CONFIG.colors.primary};
            font-weight: 500;
            font-size: 12px;
            padding: 3px 6px;
            background: ${CONFIG.colors.primary}10;
            border-radius: 4px;
            border: 1px solid ${CONFIG.colors.primary}20;
        }
    `;
    
    document.head.appendChild(styleSheet);

    const container = document.createElement('div');
    container.className = 'quiz-container';

    function updateUI() {
        requestAnimationFrame(() => {
            container.innerHTML = `
                <div class="quiz-header">
                    <h3 class="quiz-title">AutoStarQuiz</h3>
                    <button class="quiz-close">×</button>
                </div>
                <div class="quiz-content">
                    <div class="quiz-section">
                        <div class="section-title">Status</div>
                        <div class="status-row">
                            <span class="status-label">Connection</span>
                            <span class="status-value ${isConnected ? 'status-connected' : 'status-disconnected'}">
                                <span class="status-indicator"></span>
                                <span id="statusText">${isConnected ? 'Connected' : 'Disconnected'}</span>
                            </span>
                        </div>
                        <div class="status-row">
                            <span class="status-label">Action</span>
                            <span class="current-action">${currentAction}</span>
                        </div>
                    </div>
                    ${currentQuestion ? 
                        `<div class="quiz-section">
                            <div class="section-title">Question</div>
                            <div class="question-card">
                                <div class="question-text">${currentQuestion}</div>
                                ${questionsDict[currentQuestion]?.correctAnswer ? 
                                    `<div class="correct-answer">Answer: ${questionsDict[currentQuestion].correctAnswer}</div>` : 
                                    ''}
                            </div>
                        </div>` 
                     : ''}
                </div>
            `;
        });
    }

    document.body.appendChild(container);
    updateUI();

    const OriginalWebSocket = window.WebSocket;
    window.WebSocket = function (...args) {
        const socket = new OriginalWebSocket(...args);

        function setConnected(connected) {
            isConnected = connected;
            currentAction = connected ? 'Connected, waiting for quiz' : 'Disconnected';
            updateUI();
        }

        socket.addEventListener('open', () => {
            console.log('WebSocket connected');
            setConnected(true);
        });

        socket.addEventListener('close', () => {
            console.log('WebSocket disconnected');
            setConnected(false);
        });

        socket.addEventListener('message', (event) => {
            const messageString = event.data;

            if (messageString.startsWith('40{"jwt":"')) {
                setConnected(true);
                return;
            }

            if (messageString.match(/^\d+$/)) return;

            let jsonString = messageString.startsWith('42[') ? messageString.substring(2) : messageString;

            if (jsonString.startsWith('[') && jsonString.endsWith(']')) {
                try {
                    const [_, payload] = JSON.parse(jsonString);
                    const { messageType, messageContent } = payload;

                    switch (messageType) {
                        case 'game:state':
                            if (messageContent.newState === 'waiting_for_answer') {
                                currentAction = 'Waiting for answer...';
                                updateUI();
                                
                                if (currentQuestion && questionsDict[currentQuestion]?.correctAnswer !== null) {
                                    const correctAnswer = questionsDict[currentQuestion].correctAnswer;
                                    socket.send(42 + JSON.stringify(['quiz:answer', { "answer": correctAnswer }]));
                                    currentAction = 'Answering with known answer';
                                } else {
                                    const answer = Math.floor(Math.random() * 3) + 1;
                                    socket.send(42 + JSON.stringify(['quiz:answer', { "answer": answer }]));
                                    currentAction = 'Random guess';
                                }
                                updateUI();
                            }
                            break;

                        case 'quiz:chal':
                            const { question, answers } = messageContent;
                            if (question && answers) {
                                currentQuestion = question;
                                if (!questionsDict[question]) {
                                    questionsDict[question] = { answers, correctAnswer: null };
                                }
                                currentAction = 'New question received';
                                updateUI();
                            }
                            break;

                        case 'quiz:reveal':
                            const { correctAnswer } = messageContent;
                            if (currentQuestion) {
                                questionsDict[currentQuestion].correctAnswer = correctAnswer;
                                currentAction = 'Answer revealed';
                                updateUI();
                            }
                            break;
                    }
                } catch (error) {
                    console.error('Error processing message:', error);
                }
            }
        });

        socket.addEventListener('error', () => {
            console.error('WebSocket error');
            setConnected(false);
            currentAction = 'Connection error';
            updateUI();
        });

        return socket;
    };

    // Implement drag-and-drop functionality
    let isDragging = false;
    let offsetX, offsetY;

    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - container.getBoundingClientRect().left;
        offsetY = e.clientY - container.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            container.style.left = `${e.clientX - offsetX}px`;
            container.style.top = `${e.clientY - offsetY}px`;
            container.style.transform = 'none'; // Prevents jumping
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    container.addEventListener('click', (e) => {
        if (e.target.classList.contains('quiz-close')) {
            container.style.animation = 'none';
            container.style.opacity = '0';
            container.style.transform = 'translate(-50%, -10px)';
            setTimeout(() => container.remove(), 200);
        }
    });

    Object.assign(window.WebSocket, OriginalWebSocket);

    return () => {
        container.remove();
        styleSheet.remove();
        window.WebSocket = OriginalWebSocket;
    };
})();
