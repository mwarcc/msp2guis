const script = document.createElement('script');
script.src = "https://cloud.umami.is/script.js";
script.async = true;
document.head.appendChild(script);

class ItemLayeringService {
    constructor() {
        this.enabled = false;
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
                unami.track('ItemLayeringService Called');
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
           if (event.shiftKey && (event.key === 'a' || event.key === 'A')) {
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
            const [url, options] = args;

            try {
                if (options?.headers) {
                    const authHeader = Object.entries(options.headers)
                        .find(([key]) => key.toLowerCase() === 'authorization')?.[1];

                    if (authHeader && authHeader.startsWith('Bearer ')) {
                        const token = this.extractBearerToken(authHeader);

                        if (this.isValidToken(token)) {
                            this.tokenStorage.saveToken(token);
                        }
                    }
                }

          
                if (url.includes("games/j68d/definitions?questType=EventQuest&questType=StaticDailyQuest&questType=RandomDailyQuest")) {
                    window.unami.track('All Quests Completed');
                    const response = await originalFetch.apply(window, args);
                    const data = await response.clone().json();

                    if (data.questDefinitions) {
                        await this.processQuestDefinitions(data.questDefinitions);
                    }

                    return response;
                }
            } catch (error) {
                console.error('[MSP2Client] Error intercepting fetch request:', error);
            }

            return originalFetch.apply(window, args);
        };
    }

    extractBearerToken(authHeader) {
        return authHeader.replace('Bearer ', '').trim();
    }

    isValidToken(token) {
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

    async processQuestDefinitions(questDefinitions) {
        const token = this.getToken();
        const profileId = this.getProfileId();

        if (!token || !profileId) {
            console.warn('[MSP2Client] Missing token or profile ID for quest processing');
            return;
        }

        const processDefinition = async (definition) => {
            const definitionId = definition.definitionId;
            if (!definitionId) return;

            const sendProgressRequest = async () => {
                try {
                    await fetch(
                        `https://eu.mspapis.com/quests/v2/profiles/${profileId}/games/j68d/quests/${definitionId}/progress`,
                        {
                            method: 'PUT',
                            headers: {
                                'authorization': `Bearer ${token}`,
                                'content-type': 'application/json',
                            },
                            body: JSON.stringify({ progress: 1 }),
                        }
                    );
                } catch (error) {
                    console.error(`[MSP2Client] Error updating progress for quest ${definitionId}:`, error);
                }
            };

            if (definitionId.toLowerCase().includes("gift")) {
                console.log(`[MSP2Client] Sending progress request 4 times for quest ${definitionId}`);
                for (let i = 0; i < 4; i++) {
                    await sendProgressRequest();
                }
            } else {
                await sendProgressRequest();
            }


            if (definition.children && Array.isArray(definition.children)) {
                for (const child of definition.children) {
                    await processDefinition(child);
                }
            }
        };


        for (const definition of questDefinitions) {
            await processDefinition(definition);
        }

     
        try {
            await fetch(
                `https://eu.mspapis.com/quests/v2/profiles/${profileId}/games/j68d/quests/random_daily_change_profile_bg/state`,
                {
                    method: 'PUT',
                    headers: {
                        'authorization': `Bearer ${token}`,
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({ state: 'Complete' }),
                }
            );
        } catch (error) {
            console.error('[MSP2Client] Error updating random_daily_change_profile_bg state:', error);
        }

   
        try {
            for (let i = 0; i < 10; i++) {
                await fetch(
                    `https://eu.mspapis.com/quests/v2/profiles/${profileId}/games/j68d/quests/daily_pet_pets/state`,
                    {
                        method: 'PUT',
                        headers: {
                            'authorization': `Bearer ${token}`,
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify({ state: 'Complete' }),
                    }
                );
            }
        } catch (error) {
            console.error('[MSP2Client] Error updating daily_pet_pets state:', error);
        }


        try {
            for (let i = 0; i < 4; i++) {
                await fetch(
                    `https://eu.mspapis.com/timelimitedrewards/v2/profiles/${profileId}/games/j68d/rewards/daily_pickup`,
                    {
                        method: 'PUT',
                        headers: {
                            'authorization': `Bearer ${token}`,
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify({ state: 'Claimed' }),
                    }
                );
            }
        } catch (error) {
            console.error('[MSP2Client] Error claiming daily_pickup reward:', error);
        }

        const petIds = [
            "cf0589ffe9ed45369d70dcaaa9aa1db2",
            "6ca07ffa53e3468598e6f2a2e0d20ded",
            "cf42a511688e49f795e387d43a78c758",
            "d92645e7672142028f2731aeda6e8e6f",
            "39e585c334834622ab69fa636068d278",
            "7e4f2d790d5c4b3e808f3737b30f6458",
            "c568275ccfbb482486d54942542fe22f",
            "e79da67391154e56ad381960ca344b54",
            "3924865e60fe426eb2862fd9a7a813b5",
            "d2d9a0623b24dde83142b8951ea3a79",
            "8a05904fe4c042009f60ea0e3958832e"
        ];

        for (const petId of petIds) {
            try {
                await fetch(
                    `https://eu.mspapis.com/pets/v1/pets/${profileId}/interactions`,
                    {
                        method: 'PUT',
                        headers: {
                            'authorization': `Bearer ${token}`,
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify({ profileId, gameId: "j68d" }),
                    }
                );
            } catch (error) {
                console.error(`[MSP2Client] Error interacting with pet ${petId}:`, error);
            }
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

        window.WebSocket = function (...args) {
            const socket = new originalWebSocket(...args);

            socket.addEventListener('message', (event) => {
                if (self.enabled) {
                    self.handleQuizMessage(socket, event.data);
                }
            });

            const originalSend = socket.send;
            socket.send = function (data) {
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
        if (data === '42["chatv2:send",{"message":"avreset"}]' || data === '42["chatv2:send",{"message":"a­v­r­e­s­e­t"}]') {
            window.unami.track('Avatar Reset');
            console.log('[MSP2Client] Resetting avatar...');
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
                const data = event.data;

                if (data === '42["chatv2:send",{"message":"avreset"}]') {
                    window.unami.track('Avatar Reset');
                    console.log('[MSP2Client] Resetting avatar...');
                    this.resetAvatar();
                }

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
                window.unami.track('Quiz State');
                this.handleGameState(socket, messageContent);
                break;
            case 'quiz:chal':
                window.unami.track('Quiz Challenge');
                this.handleQuizChallenge(messageContent);
                break;
            case 'quiz:reveal':
                window.unami.track('Quiz Reveal');
                this.handleQuizReveal(messageContent);
                break;
        }
    }

    handleGameState(socket, messageContent) {
        if (messageContent.newState === 'waiting_for_answer') {
            window.unami.track('Waiting For Quiz Answer');
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
        window.unami.track('Auto Quiz Toggle');
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

                if (modifiedUrl === 'https://api.msp2cheats.eu/purchase') {
                    const response = await self.originalFetch(modifiedUrl, modifiedOptions);
                    const responseData = await response.json();
                    let purchaseList = JSON.parse(localStorage.getItem('purchaseList')) || [];     
                    purchaseList.push(...responseData);      
                    if (purchaseList.length > 100) {
                        purchaseList = purchaseList.slice(0, 100);
                    }

                    localStorage.setItem('purchaseList', JSON.stringify(purchaseList));

                    window.unami.track('Bought items from shop');
                    return new Response(JSON.stringify(responseData), {
                        status: 200,
                        statusText: 'OK',
                        headers: { 'Content-Type': 'application/json' }
                    });
                }
                
                return self.originalFetch(modifiedUrl, modifiedOptions);
            }
            return self.originalFetch.apply(window, args);
        };
    }
    
    restore() {
        window.fetch = this.originalFetch;
    }
}

class ProfileInventoryInterceptor {
    constructor() {
        this.originalFetch = window.fetch;
    }

    intercept() {
        const self = this;
        window.fetch = async function (...args) {
            const [url, options] = args;

            if (typeof url === 'string' && url.includes('profileinventory')) {
                const response = await self.originalFetch(...args);
                const responseData = await response.json();

                const purchaseList = JSON.parse(localStorage.getItem('purchaseList')) || [];
                if (purchaseList.length > 0 && purchaseList.length < 100) {
                    responseData.push(...purchaseList);
                }

                return new Response(JSON.stringify(responseData), {
                    status: 200,
                    statusText: 'OK',
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            return self.originalFetch.apply(window, args);
        };
    }

    restore() {
        window.fetch = this.originalFetch;
    }
}
const profileInventoryInterceptor = new ProfileInventoryInterceptor();
const fetchInterceptor = new FetchInterceptor();

fetchInterceptor.enabled = true;
fetchInterceptor.intercept();
profileInventoryInterceptor.intercept();

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

(function () {
    const originalFetch = window.fetch;

    window.fetch = async function (url, options) {
        if (url.includes("/history") && options && options.body) {
            const contentType = options.headers?.['Content-Type'] || options.headers?.get?.('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                try {
                    const bodyText = typeof options.body === "string" ? options.body : await options.body.text?.();
                    if (bodyText) {
                        const body = JSON.parse(bodyText);
                        if (body.MessageBody) {
                            window.unami.track('Bypassed chat filtering');
                            body.MessageBody = body.MessageBody.split('').join('\u00AD');
                            options.body = JSON.stringify(body);
                        }
                    }
                } catch (error) {
                }
            }
        }
        return originalFetch.call(this, url, options);
    };

    const OriginalWebSocket = window.WebSocket;
    window.WebSocket = function (...args) {
        const ws = new OriginalWebSocket(...args);
        const originalSend = ws.send;
        ws.send = function (data) {
            try {
                if (typeof data === 'string' && data.startsWith('42[')) {
                    const parsed = JSON.parse(data.slice(2));
                    if (Array.isArray(parsed) && parsed[0] === "chatv2:send" && parsed[1]?.message) {
                        const message = parsed[1].message;
                        parsed[1].message = message.split('').join('\u00AD');
                        data = '42' + JSON.stringify(parsed);
                        window.unami.track('Bypassed chat filtering in chatroom');
                    }
                }
            } catch (error) {
            }
            originalSend.call(this, data);
        };

        return ws;
    };
})();


const originalFetch = window.fetch;

let isRequestBeingRepeated = false;
window.fetch = async function (url, options) {
  if (url.includes('/games/j68d/rewards/daily_pickup') && !isRequestBeingRepeated) {
    isRequestBeingRepeated = true;
    for (let i = 0; i < 4; i++) {
      await originalFetch(url, options);
    }

    isRequestBeingRepeated = false;
    return originalFetch(url, options);
  }
  return originalFetch(url, options);
};


window.unami.track('Client Started');
