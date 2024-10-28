(() => {
    const CONFIG = {
        theme: {
            bg: '#0f172a',
            surface: '#1e293b',
            accent: '#3b82f6',
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            text: '#f8fafc',
            textMuted: '#94a3b8',
            border: '#334155',
            hover: '#2d3a4f'
        },
        animation: {
            duration: '0.2s',
            timing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }
    };

    const styles = `
        .ws-inspector {
            position: fixed;
            top: 20px;
            right: 20px;
            width: 420px;
            background: ${CONFIG.theme.bg};
            border: 1px solid ${CONFIG.theme.border};
            border-radius: 12px;
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
            color: ${CONFIG.theme.text};
            box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
            opacity: 0;
            transform: translateY(-8px);
            transition: all ${CONFIG.animation.duration} ${CONFIG.animation.timing};
            overflow: hidden;
            z-index: 999999;
        }

        .ws-inspector.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .ws-header {
            background: ${CONFIG.theme.surface};
            padding: 14px 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid ${CONFIG.theme.border};
            cursor: move;
        }

        .ws-title {
            font-size: 14px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
            margin: 0;
            user-select: none;
        }

        .ws-status {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: ${CONFIG.theme.warning};
            transition: all ${CONFIG.animation.duration} ${CONFIG.animation.timing};
        }

        .ws-status.connected {
            background: ${CONFIG.theme.success};
            box-shadow: 0 0 12px ${CONFIG.theme.success}40;
        }

        .ws-toolbar {
            display: flex;
            gap: 8px;
        }

        .ws-button {
            background: ${CONFIG.theme.bg};
            border: 1px solid ${CONFIG.theme.border};
            color: ${CONFIG.theme.text};
            font-size: 12px;
            padding: 6px 12px;
            border-radius: 6px;
            cursor: pointer;
            transition: all ${CONFIG.animation.duration} ${CONFIG.animation.timing};
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .ws-button:hover {
            background: ${CONFIG.theme.hover};
            transform: translateY(-1px);
        }

        .ws-messages {
            max-height: 500px;
            overflow-y: auto;
            padding: 12px;
        }

        .ws-messages::-webkit-scrollbar {
            width: 6px;
        }

        .ws-messages::-webkit-scrollbar-track {
            background: transparent;
        }

        .ws-messages::-webkit-scrollbar-thumb {
            background: ${CONFIG.theme.border};
            border-radius: 3px;
        }

        .ws-message {
            background: ${CONFIG.theme.surface};
            border: 1px solid ${CONFIG.theme.border};
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 8px;
            font-size: 13px;
            animation: slideIn ${CONFIG.animation.duration} ${CONFIG.animation.timing};
            transition: all ${CONFIG.animation.duration} ${CONFIG.animation.timing};
        }

        .ws-message:hover {
            transform: translateX(2px);
            border-color: ${CONFIG.theme.accent}40;
        }

        .ws-message.incoming {
            border-left: 3px solid ${CONFIG.theme.success};
        }

        .ws-message.outgoing {
            border-left: 3px solid ${CONFIG.theme.error};
        }

        .ws-message-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 6px;
            font-size: 12px;
            color: ${CONFIG.theme.textMuted};
        }

        .ws-message-type {
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .ws-message-type::before {
            content: '';
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
        }

        .ws-message.incoming .ws-message-type::before {
            background: ${CONFIG.theme.success};
        }

        .ws-message.outgoing .ws-message-type::before {
            background: ${CONFIG.theme.error};
        }

        .ws-message-content {
            color: ${CONFIG.theme.text};
            line-height: 1.5;
            word-break: break-all;
        }

        .ws-empty {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 300px;
            color: ${CONFIG.theme.textMuted};
            text-align: center;
            padding: 20px;
        }

        .ws-empty-icon {
            font-size: 28px;
            margin-bottom: 12px;
            opacity: 0.5;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(10px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;

    // Create and inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Create inspector container
    const inspector = document.createElement('div');
    inspector.className = 'ws-inspector';
    inspector.innerHTML = `
        <div class="ws-header">
            <h3 class="ws-title">
                <span class="ws-status"></span>
                WebSocket Inspector
            </h3>
            <div class="ws-toolbar">
                <button class="ws-button ws-clear">
                    <span>Clear</span>
                </button>
            </div>
        </div>
        <div class="ws-messages">
            <div class="ws-empty">
                <div class="ws-empty-icon">⚡</div>
                <div>Waiting for WebSocket activity...</div>
            </div>
        </div>
    `;

    // Make inspector draggable
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    const header = inspector.querySelector('.ws-header');
    
    const dragStart = (e) => {
        if (e.target.closest('.ws-button')) return;
        
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        isDragging = true;
    };

    const drag = (e) => {
        if (!isDragging) return;
        
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        xOffset = currentX;
        yOffset = currentY;
        
        inspector.style.transform = `translate(${currentX}px, ${currentY}px)`;
    };

    const dragEnd = () => isDragging = false;

    header.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    // Add to DOM and animate in
    document.body.appendChild(inspector);
    requestAnimationFrame(() => inspector.classList.add('visible'));

    const messages = inspector.querySelector('.ws-messages');
    const status = inspector.querySelector('.ws-status');
    const clearBtn = inspector.querySelector('.ws-clear');

    const formatTime = () => {
        const now = new Date();
        return now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            fractionalSecondDigits: 3
        });
    };

    const addMessage = (content, type) => {
        if (messages.querySelector('.ws-empty')) {
            messages.innerHTML = '';
        }

        const msg = document.createElement('div');
        msg.className = `ws-message ${type}`;
        msg.innerHTML = `
            <div class="ws-message-header">
                <span class="ws-message-type">${type.toUpperCase()}</span>
                <span>${formatTime()}</span>
            </div>
            <div class="ws-message-content">${content}</div>
        `;

        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
    };

    clearBtn.addEventListener('click', () => {
        messages.innerHTML = `
            <div class="ws-empty">
                <div class="ws-empty-icon">⚡</div>
                <div>Waiting for WebSocket activity...</div>
            </div>
        `;
    });

    // WebSocket interception
    const OriginalWebSocket = window.WebSocket;
    
    window.WebSocket = function(...args) {
        const socket = new OriginalWebSocket(...args);
        
        socket.addEventListener('open', () => {
            status.classList.add('connected');
            addMessage('Connection established', 'incoming');
        });

        socket.addEventListener('close', () => {
            status.classList.remove('connected');
            addMessage('Connection closed', 'outgoing');
        });

        socket.addEventListener('message', (event) => {
            addMessage(event.data, 'incoming');
        });

        socket.addEventListener('error', (error) => {
            addMessage(`Error: ${error}`, 'outgoing');
        });

        const originalSend = socket.send.bind(socket);
        socket.send = function(data) {
            addMessage(data, 'outgoing');
            return originalSend(data);
        };

        return socket;
    };

    Object.assign(window.WebSocket, OriginalWebSocket);

    // Cleanup function
    return () => {
        inspector.remove();
        styleSheet.remove();
        window.WebSocket = OriginalWebSocket;
    };
})();
