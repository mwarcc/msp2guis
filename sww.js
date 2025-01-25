// Save original fetch function
const originalFetch = window.fetch;

// Intercept the fetch requests
window.fetch = async function (...args) {
  const [url, options] = args;

  // Log the intercepted URL to verify
  console.log('Intercepted URL:', url);

  // Check for specific image requests and redirect
  if (typeof url === 'string') {
    // Intercept specific image URLs and redirect them
    if (url.includes('moviestarplanet2.fr/img/main-bg.jpg')) {
      console.log('Redirecting main-bg.jpg to placeholder');
      return originalFetch('https://images3.alphacoders.com/118/1181423.jpg', options);
    }

    if (url.includes('moviestarplanet2.fr/img/features/1_Welcome_2048.png')) {
      console.log('Redirecting 1_Welcome_2048.png to placeholder');
      return originalFetch('https://images3.alphacoders.com/118/1181423.jpg', options);
    }

    if (url.includes('moviestarplanet2.fr/img/features/Shop_Dress%20Up.png')) {
      console.log('Redirecting Shop_Dress%20Up.png to placeholder');
      return originalFetch('https://images3.alphacoders.com/118/1181423.jpg', options);
    }
  }

  // Call the original fetch if it's not one of the intercepted URLs
  return originalFetch.apply(window, args);
};
