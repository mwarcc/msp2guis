class ItemLayeringService {
    constructor() {
        this.enabled = false; // Disabled by default
        this.initialize();
        this.setupToggleListener();
    }

    initialize() {
        this.interceptFetch();
    }

    interceptFetch() {
        const originalFetch = window.fetch;

        window.fetch = async (...args) => {
            const [url] = args;
            if (this.enabled && this.isItemTemplateUrl(url)) {
                return this.handleItemTemplateRequest(originalFetch, ...args);
            }
            return originalFetch.apply(window, args);
        };
    }

    isItemTemplateUrl(url) {
        return /curatedcontentitemtemplates\/v2\/item-templates\//.test(url);
    }

    async handleItemTemplateRequest(originalFetch, ...args) {
        try {
            const response = await originalFetch.apply(window, args);
            const data = await response.clone().json();
            this.processItemTemplates(data);
            return new Response(JSON.stringify(data), {
                status: 200,
                statusText: 'OK',
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (error) {
            console.error('Error processing item templates:', error);
            return originalFetch.apply(window, args);
        }
    }

    processItemTemplates(templates) {
        templates.forEach(template => {
            template.tags?.forEach(tag => {
                tag.resourceIdentifiers?.forEach(resource => {
                    resource.key = this.generateRandomString();
                });
            });

            if (template.additionalData?.MSP2Data) {
                template.additionalData.MSP2Data.Type = this.generateRandomString();
            }
        });
    }

    generateRandomString(length = 10) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    setupToggleListener() {
        window.addEventListener('keydown', (event) => {
            if (event.shiftKey && event.key === '1') {
                this.enabled = !this.enabled;
                console.log(`ItemLayeringService is now ${this.enabled ? 'enabled' : 'disabled'}`);
            }
        });
    }
}

const itemLayeringService = new ItemLayeringService();

class MSP2Client {
    constructor() {
        this.enabled = true;
        this.tokenStorage = {
            saveToken: (token) => {
                window.localStorage.setItem('msp2_auth_token', token);
            },
        };
        this.initialize();
    }

    initialize() {
        this.interceptFetchRequests();
        this.interceptWebSocket();
    }

    interceptFetchRequests() {
        const originalFetch = window.fetch;

        window.fetch = async (...args) => {
            const [_, options] = args;

            try {
                if (options?.headers) {
                    const authHeader = Object.entries(options.headers)
                        .find(([key]) => key.toLowerCase() === 'authorization')?.[1];

                    if (authHeader) {;

                        if (authHeader.startsWith('Bearer ')) {
                            const token = this.extractBearerToken(authHeader);

                            if (this.isValidToken(token)) {
                                this.tokenStorage.saveToken(token);
                            }
                        }
                    }
                }
            } catch (error) {
            }
            return originalFetch.apply(window, args);
        };
    }

    extractBearerToken(authHeader) {
        return authHeader.replace('Bearer ', '').trim();
    }

    isValidToken(token) {
        // lazy
        return token && token.length > 0;
    }

    getToken() {
        const token = window.localStorage.getItem('msp2_auth_token');
        if (!token) {
            console.warn('[MSP2Client] No auth token found');
            return null;
        }
        return token;
    }

    async resetAvatar() {
        try {
            console.log('[MSP2Client] Starting avatar reset...');
            const token = this.getToken();
            const profileId = this.getProfileId();

            if (!token || !profileId) {
                throw new Error('Missing authentication');
            }

 
            const avatarResponse = await fetch(
                `https://eu.mspapis.com/profileattributes/v1/profiles/${profileId}/games/j68d/attributes`,
                { 
                    headers: { 'authorization': `Bearer ${token}` }
                }
            );

            const avatarData = await avatarResponse.json();
            if (!avatarData?.avatarId) {
                throw new Error('No avatar ID found');
            }

            const defaultAvatarResponse = await fetch(
                'https://api.allorigins.win/raw?url=' + 
                encodeURIComponent('https://github.com/mwarcc/msp2guis/raw/refs/heads/main/default.bson')
            );

            if (!defaultAvatarResponse.ok) {
                throw new Error('Failed to get default avatar');
            }

            const defaultAvatar = await defaultAvatarResponse.arrayBuffer();

            const updateResponse = await fetch(
                `https://eu.mspapis.com/profilegeneratedcontent/v2/profiles/${profileId}/games/j68d/avatars/${avatarData.avatarId}`,
                {
                    method: 'PUT',
                    headers: {
                        'authorization': `Bearer ${token}`,
                        'content-type': 'application/bson',
                        'signature': '2eA/CteuR/k2YUipj3YflkjpxJLRoUlSbNNY8xpwo6S8='
                    },
                    body: defaultAvatar
                }
            );

            if (!updateResponse.ok) {
                throw new Error(`Avatar update failed: ${updateResponse.status}`);
            }

        } catch (error) {
        }
    }

    getProfileId() {
        const token = this.getToken();
        if (!token) return null;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.profileId;
        } catch (error) {
            console.error('[MSP2Client] Error getting profile ID:', error);
            return null;
        }
    }

    interceptWebSocket() {
        const originalWebSocket = window.WebSocket;
        const self = this;

        window.WebSocket = function(...args) {
            const socket = new originalWebSocket(...args);

            socket.addEventListener('message', (event) => {
                if (self.enabled) {
                    self.handleQuizMessage(socket, event.data);
                }
            });

            const originalSend = socket.send;
            socket.send = function(data) {
                if (self.enabled && typeof data === 'string') {
                    self.handleOutgoingMessage(data, socket);
                }
                return originalSend.apply(this, arguments);
            };

            return socket;
        };

        Object.assign(window.WebSocket, originalWebSocket);
    }

    handleOutgoingMessage(data, socket) {
        if (data === '42["chatv2:send",{"message":"avreset"}]') {
            this.resetAvatar();
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        console.log(`[MSP2Client] ${this.enabled ? 'Enabled' : 'Disabled'}`);
    }
}

const msp2Client = new MSP2Client();
window.msp2Client = msp2Client;



class AutoStarQuiz {
    constructor() {
        this.enabled = true;
        this.questions = new Map();
        this.currentQuestion = null;
        this.initialize();
    }

    async initialize() {
        try {
            const response = await fetch("https://raw.githubusercontent.com/mwarcc/ss/refs/heads/main/quiz.json");
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const questions = await response.json();
            
            Object.entries(questions).forEach(([key, value]) => {
                this.questions.set(key, value);
            });

            this.interceptWebSocket();
            console.log('[AutoStarQuiz] Initialized successfully');
        } catch (error) {
            console.error('[AutoStarQuiz] Initialization error:', error);
        }
    }

    interceptWebSocket() {
        const originalWebSocket = window.WebSocket;
        const self = this;

        window.WebSocket = function(...args) {
            const socket = new originalWebSocket(...args);
            
            socket.addEventListener('message', (event) => {
                if (self.enabled) {
                    self.handleMessage(socket, event.data);
                }
            });

            return socket;
        };

        Object.assign(window.WebSocket, originalWebSocket);
    }

    handleMessage(socket, messageString) {
        if (messageString.startsWith('40{"jwt":"') || messageString.match(/^\d+$/)) {
            return;
        }

        const jsonString = messageString.startsWith('42[') ? 
            messageString.substring(2) : messageString;

        try {
            const [eventName, payload] = JSON.parse(jsonString);
            this.processPayload(socket, payload);
        } catch (error) {
        }
    }

    processPayload(socket, payload) {
        const { messageType, messageContent } = payload;

        switch (messageType) {
            case 'game:state':
                this.handleGameState(socket, messageContent);
                break;
            case 'quiz:chal':
                this.handleQuizChallenge(messageContent);
                break;
            case 'quiz:reveal':
                this.handleQuizReveal(messageContent);
                break;
        }
    }

    handleGameState(socket, messageContent) {
        if (messageContent.newState === 'waiting_for_answer') {
            const answer = this.currentQuestion && this.questions.get(this.currentQuestion)?.correctAnswer
                ? this.questions.get(this.currentQuestion).correctAnswer
                : Math.floor(Math.random() * 3) + 1;

            socket.send(`42${JSON.stringify(['quiz:answer', { answer }])}`);
        }
    }

    handleQuizChallenge({ question, answers }) {
        if (question && answers) {
            this.currentQuestion = question;
            if (!this.questions.has(question)) {
                this.questions.set(question, { answers, correctAnswer: null });
            }
        }
    }

    handleQuizReveal({ correctAnswer }) {
        if (this.currentQuestion) {
            const question = this.questions.get(this.currentQuestion);
            if (question) {
                this.questions.set(this.currentQuestion, { 
                    ...question, 
                    correctAnswer 
                });
            }
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        console.log(`[AutoStarQuiz] ${this.enabled ? 'Enabled' : 'Disabled'}`);
    }
}

const autoStarQuiz = new AutoStarQuiz();
window.autoStarQuiz = autoStarQuiz;

const logger = {
    debug: (message) => console.debug(message),
    error: (message) => console.error(message)
};

class UrlTransformer {
    static shouldTransformUrl(url) {
        if (url.includes('/tags')) {
            if (url.includes('/shops/6/tags') || url.includes('/shops/13/tags')) {
                return false;
            }
        }

        return url.includes('eu.mspapis.com/shopinventory/v1/shops/') ||
               url.includes('us.mspapis.com/shopinventory/v1/shops/') ||
               url.includes('eu.mspapis.com/shoppurchase/v1/games/j68d/profiles/') ||
               url.includes('us.mspapis.com/shoppurchase/v1/games/j68d/profiles/') ||
               url === 'https://api.msp2cheats.eu/purchase';
    }

    static transform(originalUrl, shopType) {
        try {
            const url = new URL(originalUrl);


            if (url.pathname.includes('/items/purchase')) {
                console.log('Redirecting purchase request to: https://api.msp2cheats.eu/api/purchase');
                return 'https://api.msp2cheats.eu/purchase';
            }

            if (shopType.diamondPacks) {

                const params = new URLSearchParams(url.search);
                const newUrl = new URL('https://api.xerus.lol/listings');
                
                params.forEach((value, key) => {
                    if (!key.toLowerCase().includes('auth')) {
                        newUrl.searchParams.append(key, value);
                    }
                });

                newUrl.searchParams.append('diamondPack', 'True');
                return newUrl.toString();
            }
            
            return originalUrl;
        } catch (error) {
            return originalUrl;
        }
    }
}

class FetchInterceptor {
    constructor() {
        this.enabled = false;
        this.shopType = {
            diamondPacks: false
        };
        this.originalFetch = window.fetch;
    }

    intercept() {
        const self = this;
        window.fetch = async function (...args) {
            const [url, options] = args;

            if (self.enabled && typeof url === 'string' && UrlTransformer.shouldTransformUrl(url)) {
                const modifiedUrl = UrlTransformer.transform(url, self.shopType);
                const modifiedOptions = options ? { ...options } : {};
                return self.originalFetch(modifiedUrl, modifiedOptions);
            }

            return self.originalFetch.apply(window, args);
        };
    }

    restore() {
        window.fetch = this.originalFetch;
    }
}

class ShopInterceptor {
    constructor() {
        this.enabled = {
            diamondPacks: false
        };
        this.fetchInterceptor = new FetchInterceptor();
        this.initialize();
    }

    initialize() {
        this.fetchInterceptor.intercept();
    }

    setEnabled({ diamondPacks }) {
        this.enabled = { diamondPacks };
        this.fetchInterceptor.enabled = diamondPacks;
        this.fetchInterceptor.shopType = { diamondPacks };
    }
}


const shopInterceptor = new ShopInterceptor();
shopInterceptor.setEnabled({ diamondPacks: true });


