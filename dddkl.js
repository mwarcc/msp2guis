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
