// Check if the browser supports Service Workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(registration => {
    console.log('Service Worker registered with scope:', registration.scope);
  }).catch(error => {
    console.error('Service Worker registration failed:', error);
  });
}

// This part includes the Service Worker logic itself
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(function(registration) {
    // Create the Service Worker code directly inside the main script

    // Intercepting fetch requests
    self.addEventListener('fetch', (event) => {
      const request = event.request;

      // Check for specific image URLs and redirect
      if (request.method === 'GET' && request.url.includes('moviestarplanet2.fr/img/main-bg.jpg')) {
        console.log('Intercepted main-bg.jpg request');
        
        // Respond with a placeholder image
        event.respondWith(
          fetch('https://images3.alphacoders.com/118/1181423.jpg')  // Placeholder image URL
        );
      }

      if (request.method === 'GET' && request.url.includes('moviestarplanet2.fr/img/features/1_Welcome_2048.png')) {
        console.log('Intercepted 1_Welcome_2048.png request');
        
        // Respond with the same placeholder image or another image URL
        event.respondWith(
          fetch('https://images3.alphacoders.com/118/1181423.jpg')
        );
      }

      if (request.method === 'GET' && request.url.includes('moviestarplanet2.fr/img/features/Shop_Dress%20Up.png')) {
        console.log('Intercepted Shop_Dress%20Up.png request');
        
        // Respond with the same placeholder image or another image URL
        event.respondWith(
          fetch('https://images3.alphacoders.com/118/1181423.jpg')
        );
      }

      // Default behavior for other requests (pass them through)
      event.respondWith(fetch(request));
    });
  });
}
