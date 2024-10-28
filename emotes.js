(function () {
    const sessionIdlol = null;

    function simulateIncomingMessage(message) {
        const event = new Event('message');
        Object.defineProperty(event, 'data', { value: message });
        socket.onmessage(event);
    }

    function parseWebSocketMessage(data) {
        try {
            const messageStr = data.toString();
            if (messageStr.startsWith('42[')) {
                const jsonStr = messageStr.substring(2);
                const [eventName, payload] = JSON.parse(jsonStr);
                if (typeof payload === 'object') {
                    return payload;
                }
                return JSON.parse(payload);
            }
            return null;
        } catch (error) {
            console.error('Error parsing WebSocket message:', error);
            return null;
        }
    }

    const CONFIG = {
        colors: {
            background: '#1e1e1e',
            headerBg: '#252526',
            buttonBg: '#2d2d2d',
            buttonHover: '#3e3e3e',
            accent: '#0078d4',
            accentHover: '#1084d8',
            border: '#404040',
            text: '#cccccc',
            textMuted: '#888888',
            success: '#47d147',
            error: '#ff3333'
        },
        animations: {
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
        }
    };

    // Create and inject required styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .emote-changer {
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

        .emote-changer.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .emote-header {
            background: ${CONFIG.colors.headerBg};
            padding: 12px 16px;
            border-bottom: 1px solid ${CONFIG.colors.border};
            border-radius: 8px 8px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: move;
            user-select: none;
        }

        .emote-title {
            color: ${CONFIG.colors.text};
            font-size: 14px;
            font-weight: 600;
            margin: 0;
        }

        .emote-close {
            background: transparent;
            border: none;
            color: ${CONFIG.colors.text};
            cursor: pointer;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 14px;
            transition: ${CONFIG.animations.transition};
        }

        .emote-close:hover {
            background: ${CONFIG.colors.buttonHover};
        }

        .emote-content {
            padding: 16px;
        }

        .emote-button {
            width: 100%;
            padding: 10px 12px;
            margin: 6px 0;
            background: ${CONFIG.colors.buttonBg};
            border: 1px solid ${CONFIG.colors.border};
            border-radius: 4px;
            color: ${CONFIG.colors.text};
            font-size: 13px;
            cursor: pointer;
            transition: ${CONFIG.animations.transition};
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .emote-button:hover:not(:disabled) {
            background: ${CONFIG.colors.buttonHover};
            border-color: ${CONFIG.colors.accent};
        }

        .emote-button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        .emote-status {
            display: flex;
            align-items: center;
            margin-top: 12px;
            padding: 8px;
            background: ${CONFIG.colors.headerBg};
            border-radius: 4px;
            font-size: 12px;
        }

        .status-indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-right: 8px;
            background: ${CONFIG.colors.error};
            transition: ${CONFIG.animations.transition};
        }

        .status-indicator.connected {
            background: ${CONFIG.colors.success};
        }

        .emote-footer {
            padding: 8px 16px;
            border-top: 1px solid ${CONFIG.colors.border};
            font-size: 11px;
            color: ${CONFIG.colors.textMuted};
            text-align: center;
        }
    `;
    document.head.appendChild(styleSheet);

    // Create main container
    const container = document.createElement('div');
    container.className = 'emote-changer';

    // Create UI structure
    container.innerHTML = `
        <div class="emote-header">
            <h3 class="emote-title">Emote Controller</h3>
            <button class="emote-close">✕</button>
        </div>
        <div class="emote-content">
            <h4 style="color: white;">Emotes</h4>
            <button class="emote-button" data-emote="noshoes_skating">
                No Shoes Skating
                <span class="emote-shortcut">⌘1</span>
            </button>
            <button class="emote-button" data-emote="bunny_hold">
                Bunny Hold
                <span class="emote-shortcut">⌘2</span>
            </button>
            <button class="emote-button" data-emote="swin_new">
                Swim New
                <span class="emote-shortcut">⌘3</span>
            </button>
            <button class="emote-button" data-emote="2023_spidercrawl_lsz">
                2023 Spider Crawl
                <span class="emote-shortcut">⌘4</span>
            </button>
            <button class="emote-button" data-emote="bad_2022_teenwalk_dg">
                Chewing-gum
                <span class="emote-shortcut">⌘5</span>
            </button>
         

            <h4 style="color: white;">Animation Controller</h4>
            <button class="emote-button" data-animation="next_level">
                Next Level
                <span class="emote-shortcut">⌘6</span>
            </button>
            <button class="emote-button" data-animation="gift_open">
                Gift Open
                <span class="emote-shortcut">⌘7</span>
            </button>
            <button class="emote-button" data-animation="vip">
                VIP
                <span class="emote-shortcut">⌘8</span>
            </button>

            <div class="emote-status">
                <div class="status-indicator"></div>
                <span class="status-text">Disconnected</span>
            </div>
        </div>
        <div class="emote-footer">
            Pro Tip: Use keyboard shortcuts to trigger actions quickly
        </div>
    `;

    // Add to DOM and animate in
    document.body.appendChild(container);
    requestAnimationFrame(() => container.classList.add('visible'));

    // Get UI elements
    const closeButton = container.querySelector('.emote-close');
    const header = container.querySelector('.emote-header');
    const buttons = container.querySelectorAll('.emote-button');
    const statusIndicator = container.querySelector('.status-indicator');
    const statusText = container.querySelector('.status-text');

    // Dragging functionality
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;

        if (e.target.closest('.emote-header')) {
            isDragging = true;
            header.style.cursor = 'grabbing';
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            xOffset = currentX;
            yOffset = currentY;

            container.style.transform = `translate(${currentX}px, ${currentY}px)`;
        }
    }

    function dragEnd() {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
        header.style.cursor = 'grab';
    }

    // WebSocket handling
    let socket;
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
            const messageData = event.data; // Access the data property

            const parsedData = parseWebSocketMessage(messageData); // Parse the message
            console.log("AHAH: " + parsedData);
            console.log(parsedData);

            if (parsedData && parsedData.messageType === '2000') {
                console.log("uhh: " + parsedData.messageContent.sessionId);
                sessionIdlol = parsedData.messageContent.sessionId;
                this.localStorage.sessionIdlol = parsedData.messageContent.sessionId;
            }
        });

        socket.addEventListener('error', (error) => {
            console.error('WebSocket error:', error);
            updateConnectionStatus(false);
        });

        return socket;
    };

    function updateConnectionStatus(connected) {
        statusIndicator.classList.toggle('connected', connected);
        statusText.textContent = connected ? 'Connected' : 'Disconnected';
        buttons.forEach(btn => btn.disabled = !connected);
    }

    function triggerEmote(emoteId) {
        if (socket?.readyState === WebSocket.OPEN) {
            let message;
            if (emoteId === 'next_level') {
                message = `42["avt:lvlup",{"newLevel":2}]`;
            } else if (emoteId === 'gift_open') {
                message = `42["7006",{"emote":"gift_pickup_regular_withcoins","looping":false}]`;
            } else if (emoteId === 'vip') {
                message = `42["7006",{"emote":"vip","looping":false}]`;
            } else {
                message = `42["7005",{"mood":"${emoteId}"}]`;
            }
            

            socket.send(message);

            // Visual feedback
            const button = container.querySelector(`[data-emote="${emoteId}"], [data-animation="${emoteId}"]`);
            button.style.background = CONFIG.colors.accent;
            setTimeout(() => button.style.background = '', 200);
        }
    }

    // Event listeners
    closeButton.onclick = () => {
        container.classList.remove('visible');
        setTimeout(() => container.remove(), 200);
    };

    container.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    buttons.forEach(button => {
        button.onclick = () => {
            const emoteId = button.dataset.emote || button.dataset.animation; // Check for emote or animation
            triggerEmote(emoteId);
        };
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.metaKey || e.ctrlKey) {
            const num = parseInt(e.key);
            if (num > 0 && num <= buttons.length) {
                e.preventDefault();
                const emote = buttons[num - 1].dataset.emote || buttons[num - 1].dataset.animation; // Check for emote or animation
                triggerEmote(emote);
            }
        }
    });

    // Restore original WebSocket
    Object.assign(window.WebSocket, OriginalWebSocket);

    // Return cleanup function
    return () => {
        container.remove();
        styleSheet.remove();
        window.WebSocket = OriginalWebSocket;
    };
})();



