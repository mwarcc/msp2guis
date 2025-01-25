// Store the original fetch function
const originalFetch = window.fetch;

// Override the fetch function
window.fetch = async function(url, options) {
    // Check if the URL matches the one you want to redirect
    if (url === 'https://moviestarplanet2.fr/img/main-bg.jpg') {
        console.log('Redirecting request for:', url);
        // Redirect to the new image URL
        return originalFetch('https://images3.alphacoders.com/118/1181423.jpg', options);
    }
    
    // For all other URLs, use the original fetch
    return originalFetch(url, options);
};
