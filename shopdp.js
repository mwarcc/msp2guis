(function () {
    const originalFetch = window.fetch;

    let websocket;
    function connectWebSocket() {
        websocket = new WebSocket('wss://socket.msp2cheats.eu');


        websocket.addEventListener('open', () => {
        });
        websocket.addEventListener('message', (event) => {
            const messageData = JSON.parse(event.data);
        });
        websocket.addEventListener('close', () => {
            setTimeout(connectWebSocket, 5000);
        });
        websocket.addEventListener('error', (error) => {
            console.error('WebSocket error:', error);
        });
    }

    window.fetch = function (url, options = {}) {
        options.mode = 'cors';
        if (url.includes('items/purchase')) {
            const redirectUrl = 'https://scripts.msp2cheats.eu/purchase';

            if (options.headers && options.headers['Authorization']) {
                delete options.headers['Authorization'];
            }

            if (websocket && websocket.readyState === WebSocket.OPEN) {
                websocket.send(JSON.stringify({ type: 'purchase_intercept', url: redirectUrl, timestamp: Date.now() }));
            }
            return originalFetch(redirectUrl, options);
        }

        if (url.includes('https://eu.mspapis.com/shopinventory/v1/shops/6/lis')) {
            const modifiedUrl = url.replace('eu.mspapis.com', 'scripts.msp2cheats.eu');

            if (options.headers && options.headers['Authorization']) {
                delete options.headers['Authorization'];
            }
            return originalFetch(modifiedUrl, options);
        }
        return originalFetch(url, options);
    };
    connectWebSocket();
    console.log('Fetch interception and WebSocket connection initialized');
})();
