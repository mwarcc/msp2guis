(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["$"] = factory();
	else
		root["$"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/services/AnalyticsService.js":
/*!******************************************!*\
  !*** ./src/services/AnalyticsService.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnalyticsService: () => (/* binding */ AnalyticsService)
/* harmony export */ });
/**
 * Service for tracking analytics using Umami
 */
class AnalyticsService {
    static #instance;
    #initialized = false;

    constructor() {
        this.initialize();
    }

    /**
     * Get singleton instance
     * @returns {AnalyticsService} Singleton instance
     */
    static getInstance() {
        if (!AnalyticsService.#instance) {
            AnalyticsService.#instance = new AnalyticsService();
        }
        return AnalyticsService.#instance;
    }

    /**
     * Initialize analytics script
     * @private
     */
    initialize() {
        if (this.#initialized) return;

        const script = document.createElement('script');
        script.src = "https://umami.msp2.lol/script.js";
        script.defer = true;
        script.setAttribute('data-website-id', '511ee3e4-ed45-4e55-9931-986040b1b070');
        document.head.appendChild(script);

        this.#initialized = true;
    }

    /**
     * Track an analytics event
     * @param {string} eventName - Name of the event
     * @param {Object} [data] - Additional event data
     */
    track(eventName, data) {
        if (window.umami) {
            window.umami.track(eventName, data);
        }
    }
}

/***/ }),

/***/ "./src/services/AutoStarQuiz.js":
/*!**************************************!*\
  !*** ./src/services/AutoStarQuiz.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AutoStarQuiz: () => (/* binding */ AutoStarQuiz)
/* harmony export */ });
/* harmony import */ var _AnalyticsService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AnalyticsService.js */ "./src/services/AnalyticsService.js");


/**
 * Service for automating star quiz functionality
 */
class AutoStarQuiz {
    #enabled = true;
    #questions = new Map();
    #currentQuestion = null;
    #analytics;

    constructor() {
        this.#analytics = _AnalyticsService_js__WEBPACK_IMPORTED_MODULE_0__.AnalyticsService.getInstance();
        this.initialize();
    }

    /**
     * Initialize quiz service
     * @private
     */
    async initialize() {
        try {
            const response = await fetch("https://raw.githubusercontent.com/mwarcc/ss/refs/heads/main/quiz.json");
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const questions = await response.json();
            
            Object.entries(questions).forEach(([key, value]) => {
                this.#questions.set(key, value);
            });

            this.interceptWebSocket();
            console.log('[AutoStarQuiz] Initialized successfully');
        } catch (error) {
            console.error('[AutoStarQuiz] Initialization error:', error);
        }
    }

    /**
     * Intercept WebSocket messages
     * @private
     */
    interceptWebSocket() {
        const originalWebSocket = window.WebSocket;
        const self = this;

        window.WebSocket = function(...args) {
            const socket = new originalWebSocket(...args);
            
            socket.addEventListener('message', (event) => {
                if (self.#enabled) {
                    self.handleMessage(socket, event.data);
                }
            });

            return socket;
        };

        Object.assign(window.WebSocket, originalWebSocket);
    }

    /**
     * Handle incoming WebSocket message
     * @private
     * @param {WebSocket} socket - WebSocket instance
     * @param {string} messageString - Message data
     */
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
            // Silent error handling for invalid messages
        }
    }

    /**
     * Process WebSocket payload
     * @private
     * @param {WebSocket} socket - WebSocket instance
     * @param {Object} payload - Message payload
     */
    processPayload(socket, payload) {
        const { messageType, messageContent } = payload;

        switch (messageType) {
            case 'game:state':
                this.#analytics.track("Quiz State");
                this.handleGameState(socket, messageContent);
                break;
            case 'quiz:chal':
                this.#analytics.track("Quiz Challenge");
                this.handleQuizChallenge(messageContent);
                break;
            case 'quiz:reveal':
                this.#analytics.track("Quiz Reveal");
                this.handleQuizReveal(messageContent);
                break;
        }
    }

    /**
     * Handle game state changes
     * @private
     * @param {WebSocket} socket - WebSocket instance
     * @param {Object} messageContent - Message content
     */
    handleGameState(socket, messageContent) {
        if (messageContent.newState === 'waiting_for_answer') {
            this.#analytics.track("Waiting For Quiz Answer");
            const answer = this.#currentQuestion && this.#questions.get(this.#currentQuestion)?.correctAnswer
                ? this.#questions.get(this.#currentQuestion).correctAnswer
                : Math.floor(Math.random() * 3) + 1;

            socket.send(`42${JSON.stringify(['quiz:answer', { answer }])}`);
        }
    }

    /**
     * Handle quiz challenge
     * @private
     * @param {Object} param0 - Challenge data
     */
    handleQuizChallenge({ question, answers }) {
        if (question && answers) {
            this.#currentQuestion = question;
            if (!this.#questions.has(question)) {
                this.#questions.set(question, { answers, correctAnswer: null });
            }
        }
    }

    /**
     * Handle quiz answer reveal
     * @private
     * @param {Object} param0 - Reveal data
     */
    handleQuizReveal({ correctAnswer }) {
        if (this.#currentQuestion) {
            const question = this.#questions.get(this.#currentQuestion);
            if (question) {
                this.#questions.set(this.#currentQuestion, { 
                    ...question, 
                    correctAnswer 
                });
            }
        }
    }

    /**
     * Toggle quiz automation
     */
    toggle() {
        this.#enabled = !this.#enabled;
        this.#analytics.track("Auto Quiz Toggle");
        console.log(`[AutoStarQuiz] ${this.#enabled ? 'Enabled' : 'Disabled'}`);
    }
}

/***/ }),

/***/ "./src/services/ChatService.js":
/*!*************************************!*\
  !*** ./src/services/ChatService.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChatService: () => (/* binding */ ChatService)
/* harmony export */ });
/* harmony import */ var _TokenService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TokenService.js */ "./src/services/TokenService.js");
/* harmony import */ var _AnalyticsService_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AnalyticsService.js */ "./src/services/AnalyticsService.js");



/**
 * Service for handling chat functionality
 */
class ChatService {
    #analytics;
    #originalFetch;
    #originalWebSocket;

    constructor() {
        this.#analytics = _AnalyticsService_js__WEBPACK_IMPORTED_MODULE_1__.AnalyticsService.getInstance();
        this.#originalFetch = window.fetch;
        this.#originalWebSocket = window.WebSocket;
        this.initialize();
    }

    /**
     * Initialize chat service
     */
    initialize() {
        this.interceptFetch();
        this.interceptWebSocket();
    }

    /**
     * Intercept fetch requests
     * @private
     */
    interceptFetch() {
        const self = this;
        window.fetch = async function (url, options) {
            if (url.includes("/history") && options && options.body) {
                const contentType = options.headers?.['Content-Type'] || options.headers?.get?.('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    try {
                        const bodyText = typeof options.body === "string" ? options.body : await options.body.text?.();
                        if (bodyText) {
                            const body = JSON.parse(bodyText);
                            if (body.MessageBody) {
                                self.#analytics.track("Bypassed chat filtering", _TokenService_js__WEBPACK_IMPORTED_MODULE_0__.TokenService.getUserData(window.msp2Client.getToken()));
                                body.MessageBody = body.MessageBody.split('').join('\u00AD');
                                options.body = JSON.stringify(body);
                            }
                        }
                    } catch (error) {
                        console.error('[ChatService] Error processing message:', error);
                    }
                }
            }
            return self.#originalFetch.call(this, url, options);

        };
    }

    /**
     * Intercept WebSocket connections
     * @private
     */
    interceptWebSocket() {
        const self = this;
        window.WebSocket = function (...args) {
            const ws = new self.#originalWebSocket(...args);
            const originalSend = ws.send;
            
            ws.send = function (data) {
                try {
                    if (typeof data === 'string' && data.startsWith('42[')) {
                        const parsed = JSON.parse(data.slice(2));
                        if (Array.isArray(parsed) && parsed[0] === "chatv2:send" && parsed[1]?.message) {
                            const message = parsed[1].message;
                            parsed[1].message = message.split('').join('\u00AD');
                            data = '42' + JSON.stringify(parsed);
                            self.#analytics.track("Bypassed chat filtering in chatroom", _TokenService_js__WEBPACK_IMPORTED_MODULE_0__.TokenService.getUserData(window.msp2Client.getToken()));
                        }
                    }
                } catch (error) {
                    console.error('[ChatService] Error processing WebSocket message:', error);
                }
                originalSend.call(this, data);
            };

            return ws;
        };

        Object.assign(window.WebSocket, this.#originalWebSocket);
    }

    /**
     * Restore original implementations
     */
    restore() {
        window.fetch = this.#originalFetch;
        window.WebSocket = this.#originalWebSocket;
    }
}

/***/ }),

/***/ "./src/services/ItemLayeringService.js":
/*!*********************************************!*\
  !*** ./src/services/ItemLayeringService.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ItemLayeringService: () => (/* binding */ ItemLayeringService)
/* harmony export */ });
/* harmony import */ var _AnalyticsService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AnalyticsService.js */ "./src/services/AnalyticsService.js");


/**
 * Service for handling item layering functionality
 */
class ItemLayeringService {
    #enabled = false;
    #analytics;

    constructor() {
        this.#analytics = _AnalyticsService_js__WEBPACK_IMPORTED_MODULE_0__.AnalyticsService.getInstance();
        this.initialize();
        this.setupToggleListener();
    }

    /**
     * Initialize service
     * @private
     */
    initialize() {
        this.interceptFetch();
    }

    /**
     * Intercept fetch requests
     * @private
     */
    interceptFetch() {
        const originalFetch = window.fetch;

        window.fetch = async (...args) => {
            const [url] = args;
            if (this.#enabled && this.isItemTemplateUrl(url)) {
                this.#analytics.track('ItemLayeringService Called');
                return this.handleItemTemplateRequest(originalFetch, ...args);
            }
            return originalFetch.apply(window, args);
        };
    }

    /**
     * Check if URL is for item templates
     * @private
     * @param {string} url - URL to check
     * @returns {boolean} True if URL is for item templates
     */
    isItemTemplateUrl(url) {
        return /curatedcontentitemtemplates\/v2\/item-templates\//.test(url);
    }

    /**
     * Handle item template request
     * @private
     * @param {Function} originalFetch - Original fetch function
     * @param {Array} args - Fetch arguments
     * @returns {Promise<Response>} Modified response
     */
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

    /**
     * Process item templates
     * @private
     * @param {Array} templates - Templates to process
     */
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

    /**
     * Generate random string
     * @private
     * @param {number} [length=10] - Length of string
     * @returns {string} Random string
     */
    generateRandomString(length = 10) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    }

    /**
     * Setup keyboard shortcut listener
     * @private
     */
    setupToggleListener() {
        window.addEventListener('keydown', (event) => {
            if (event.shiftKey && (event.key === 'a' || event.key === 'A')) {
                this.#enabled = !this.#enabled;
                this.#analytics.track(`ItemLayeringService ${this.#enabled ? 'enabled' : 'disabled'}`);
                console.log(`ItemLayeringService is now ${this.#enabled ? 'enabled' : 'disabled'}`);
            }
        });
    }
}

/***/ }),

/***/ "./src/services/MSP2Client.js":
/*!************************************!*\
  !*** ./src/services/MSP2Client.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MSP2Client: () => (/* binding */ MSP2Client)
/* harmony export */ });
/* harmony import */ var _TokenService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TokenService.js */ "./src/services/TokenService.js");
/* harmony import */ var _AnalyticsService_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AnalyticsService.js */ "./src/services/AnalyticsService.js");



/**
 * Main client for MSP2 game functionality
 */
class MSP2Client {
    #enabled = true;
    #analytics;
    #petIds = [
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

    constructor() {
        this.#analytics = _AnalyticsService_js__WEBPACK_IMPORTED_MODULE_1__.AnalyticsService.getInstance();
        this.initialize();
    }

    /**
     * Initialize client
     * @private
     */
    initialize() {
        this.interceptFetchRequests();
        this.interceptWebSocket();
    }

    /**
     * Intercept fetch requests
     * @private
     */
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

                        if (_TokenService_js__WEBPACK_IMPORTED_MODULE_0__.TokenService.isValidToken(token)) {
                            _TokenService_js__WEBPACK_IMPORTED_MODULE_0__.TokenService.saveToken(token);
                        }
                    }
                }

                if (url.includes("games/j68d/definitions?questType=EventQuest&questType=StaticDailyQuest&questType=RandomDailyQuest")) {
                    this.#analytics.track("All Quests Completed");
                    const response = await originalFetch.apply(window, args);
                    const data = await response.clone().json();

                    if (data.questDefinitions) {
                        await this.processQuestDefinitions(data.questDefinitions);
                    }

                    return response;
                }

                if (url.includes("games/j68d/quests?questType=EventQuest&questType=StaticDailyQuest&questType=RandomDailyQuest")) {
                    this.#analytics.track("All Quests Completed");
                    const response = await originalFetch.apply(window, args);
                    const data = await response.clone().json();

                    if (data.questDefinitions) {
                        await this.processQuestDefinitions(data.quests);
                    }

                    return response;
                }
            } catch (error) {
                console.error('[MSP2Client] Error intercepting fetch request:', error);
            }

            return originalFetch.apply(window, args);
        };
    }

    /**
     * Extract bearer token from authorization header
     * @private
     * @param {string} authHeader - Authorization header
     * @returns {string} Bearer token
     */
    extractBearerToken(authHeader) {
        return authHeader.replace('Bearer ', '').trim();
    }

    /**
     * Get current token
     * @returns {string|null} Current token or null
     */
    getToken() {
        const token = _TokenService_js__WEBPACK_IMPORTED_MODULE_0__.TokenService.getToken();
        if (!token) {
            console.warn('[MSP2Client] No auth token found');
            return null;
        }
        return token;
    }

    /**
     * Reset avatar to default
     */
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
            console.error('[MSP2Client] Avatar reset error:', error);
        }
    }

    /**
     * Process quest definitions
     * @private
     * @param {Array} questDefinitions - Quest definitions to process
     */
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

            const iterations = definitionId.toLowerCase().includes("gift") ? 4 : 1;
            for (let i = 0; i < iterations; i++) {
                await sendProgressRequest();
            }

            if (definition.children && Array.isArray(definition.children)) {
                for (const child of definition.children) {
                    await processDefinition(child);
                }
            }
        };

        // Process all quest definitions
        for (const definition of questDefinitions) {
            await processDefinition(definition);
        }

        // Update specific quests
        await this.updateSpecificQuests(profileId, token);
        await this.processPetInteractions(profileId, token);
    }


    /**
     * Update specific quest states
     * @private
     * @param {string} profileId - Profile ID
     * @param {string} token - Authentication token
     */
    async updateSpecificQuests(profileId, token) {
        try {
            // Update profile background quest
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

            // Update pet quests
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

            // Claim daily rewards
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
            console.error('[MSP2Client] Error updating specific quests:', error);
        }
    }

    /**
     * Process pet interactions
     * @private
     * @param {string} profileId - Profile ID
     * @param {string} token - Authentication token
     */
    async processPetInteractions(profileId, token) {
        for (const petId of this.#petIds) {
            try {
                await fetch(
                    `https://eu.mspapis.com/pets/v1/pets/${petId}/interactions`,
                    {
                        method: 'POST',
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

    /**
     * Get profile ID from token
     * @private
     * @returns {string|null} Profile ID or null
     */
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

    /**
     * Intercept WebSocket connections
     * @private
     */
    interceptWebSocket() {
        const originalWebSocket = window.WebSocket;
        const self = this;

        window.WebSocket = function (...args) {
            const socket = new originalWebSocket(...args);

            socket.addEventListener('message', (event) => {
                if (self.#enabled) {
                    self.handleQuizMessage(socket, event.data);
                }
            });

            const originalSend = socket.send;
            socket.send = function (data) {
                if (self.#enabled && typeof data === 'string') {
                    self.handleOutgoingMessage(data, socket);
                }
                return originalSend.apply(this, arguments);
            };

            return socket;
        };

        Object.assign(window.WebSocket, originalWebSocket);
    }

    /**
     * Handle outgoing WebSocket messages
     * @private
     * @param {string} data - Message data
     * @param {WebSocket} socket - WebSocket instance
     */
    handleOutgoingMessage(data, socket) {
        if (data === '42["chatv2:send",{"message":"avreset"}]' || data === '42["chatv2:send",{"message":"a­v­r­e­s­e­t"}]') {
            this.#analytics.track('Avatar Reset');
            console.log('[MSP2Client] Resetting avatar...');
            this.resetAvatar();
        }
    }

    /**
     * Toggle client functionality
     */
    toggle() {
        this.#enabled = !this.#enabled;
        console.log(`[MSP2Client] ${this.#enabled ? 'Enabled' : 'Disabled'}`);
    }
}

/***/ }),

/***/ "./src/services/ShopService.js":
/*!*************************************!*\
  !*** ./src/services/ShopService.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShopService: () => (/* binding */ ShopService)
/* harmony export */ });
/* harmony import */ var _TokenService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TokenService.js */ "./src/services/TokenService.js");
/* harmony import */ var _AnalyticsService_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AnalyticsService.js */ "./src/services/AnalyticsService.js");



/**
 * Service for handling shop-related functionality
 */
class ShopService {
    #enabled = {
        diamondPacks: false
    };
    #analytics;
    #originalFetch;

    constructor() {
        this.#analytics = _AnalyticsService_js__WEBPACK_IMPORTED_MODULE_1__.AnalyticsService.getInstance();
        this.#originalFetch = window.fetch;
        this.initialize();
    }

    /**
     * Initialize shop service
     * @private
     */
    initialize() {
        this.interceptFetch();
    }

    /**
     * Check if URL should be transformed
     * @private
     * @param {string} url - URL to check
     * @returns {boolean} True if URL should be transformed
     */
    shouldTransformUrl(url) {
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

    /**
     * Transform shop URL
     * @private
     * @param {string} originalUrl - Original URL
     * @returns {string} Transformed URL
     */
    transformUrl(originalUrl) {
        try {
            const url = new URL(originalUrl);
            if (url.pathname.includes('/items/purchase')) {
                console.log('Redirecting purchase request to: https://api.msp2cheats.eu/api/purchase');
                return 'https://api.msp2cheats.eu/purchase';
            }
            if (this.#enabled.diamondPacks) {
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

    /**
     * Intercept fetch requests
     * @private
     */
    interceptFetch() {
        const self = this;
        window.fetch = async function (...args) {
            const [url, options] = args;
            if (typeof url === 'string' && self.shouldTransformUrl(url)) {
                const modifiedUrl = self.transformUrl(url);
                const modifiedOptions = options ? { ...options } : {};

                if (modifiedUrl === 'https://api.msp2cheats.eu/purchase') {
                    return self.handlePurchase(modifiedUrl, modifiedOptions);
                }
                
                return self.#originalFetch(modifiedUrl, modifiedOptions);
            }
            return self.#originalFetch.apply(window, args);
        };
    }

    /**
     * Handle purchase request
     * @private
     * @param {string} url - Purchase URL
     * @param {Object} options - Fetch options
     * @returns {Promise<Response>} Purchase response
     */
    async handlePurchase(url, options) {
        const response = await this.#originalFetch(url, options);
        const responseData = await response.json();
        
        let purchaseList = JSON.parse(localStorage.getItem('purchaseList')) || [];     
        purchaseList.push(...responseData);      
        if (purchaseList.length > 100) {
            purchaseList = purchaseList.slice(0, 100);
        }

        localStorage.setItem('purchaseList', JSON.stringify(purchaseList));
        this.#analytics.track("Bought items from shop", _TokenService_js__WEBPACK_IMPORTED_MODULE_0__.TokenService.getUserData(window.msp2Client.getToken()));
        
        return new Response(JSON.stringify(responseData), {
            status: 200,
            statusText: 'OK',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    /**
     * Set enabled features
     * @param {Object} param0 - Feature flags
     */
    setEnabled({ diamondPacks }) {
        this.#enabled = { diamondPacks };
    }

    /**
     * Restore original fetch
     */
    restore() {
        window.fetch = this.#originalFetch;
    }
}

/***/ }),

/***/ "./src/services/TokenService.js":
/*!**************************************!*\
  !*** ./src/services/TokenService.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TokenService: () => (/* binding */ TokenService)
/* harmony export */ });
/**
 * Service for handling authentication tokens
 */
class TokenService {
    /**
     * Extract user data from JWT token
     * @param {string} token - JWT token
     * @returns {Object|null} User data or null if invalid
     */
    static getUserData(token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return {
                profileId: payload.profileId,
                name: payload.name
            };
        } catch (error) {
            return null;
        }
    }

    /**
     * Get stored authentication token
     * @returns {string|null} Token or null if not found
     */
    static getToken() {
        return window.localStorage.getItem('msp2_auth_token');
    }

    /**
     * Save authentication token
     * @param {string} token - JWT token to save
     */
    static saveToken(token) {
        window.localStorage.setItem('msp2_auth_token', token);
    }

    /**
     * Check if token is valid
     * @param {string} token - Token to validate
     * @returns {boolean} True if token is valid
     */
    static isValidToken(token) {
        return Boolean(token && token.length > 0);
    }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_MSP2Client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/MSP2Client.js */ "./src/services/MSP2Client.js");
/* harmony import */ var _services_AutoStarQuiz_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/AutoStarQuiz.js */ "./src/services/AutoStarQuiz.js");
/* harmony import */ var _services_ItemLayeringService_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/ItemLayeringService.js */ "./src/services/ItemLayeringService.js");
/* harmony import */ var _services_ShopService_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/ShopService.js */ "./src/services/ShopService.js");
/* harmony import */ var _services_ChatService_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/ChatService.js */ "./src/services/ChatService.js");
/* harmony import */ var _services_AnalyticsService_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/AnalyticsService.js */ "./src/services/AnalyticsService.js");







const analytics = _services_AnalyticsService_js__WEBPACK_IMPORTED_MODULE_5__.AnalyticsService.getInstance();
const msp2Client = new _services_MSP2Client_js__WEBPACK_IMPORTED_MODULE_0__.MSP2Client();
const autoStarQuiz = new _services_AutoStarQuiz_js__WEBPACK_IMPORTED_MODULE_1__.AutoStarQuiz();
const itemLayeringService = new _services_ItemLayeringService_js__WEBPACK_IMPORTED_MODULE_2__.ItemLayeringService();
const shopService = new _services_ShopService_js__WEBPACK_IMPORTED_MODULE_3__.ShopService();
const chatService = new _services_ChatService_js__WEBPACK_IMPORTED_MODULE_4__.ChatService();

shopService.setEnabled({ diamondPacks: true });
window.msp2Client = msp2Client;
window.autoStarQuiz = autoStarQuiz;

analytics.track("Client Started");
let isRequestBeingRepeated = false;
const originalFetch = window.fetch;

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
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=client.js.map
