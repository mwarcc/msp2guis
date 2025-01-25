// Intercept image requests by monitoring all <img> tags on the page
window.addEventListener('DOMContentLoaded', () => {
  // Select all img elements
  const images = document.querySelectorAll('img');

  // Loop through each image and check the src
  images.forEach((img) => {
    // Check if the image src matches any of the URLs you want to intercept
    if (img.src.includes('moviestarplanet2.fr/img/main-bg.jpg')) {
      console.log('Redirecting main-bg.jpg to placeholder');
      img.src = 'https://images3.alphacoders.com/118/1181423.jpg'; // Replace with your image URL
    }

    if (img.src.includes('moviestarplanet2.fr/img/features/1_Welcome_2048.png')) {
      console.log('Redirecting 1_Welcome_2048.png to placeholder');
      img.src = 'https://images3.alphacoders.com/118/1181423.jpg'; // Replace with your image URL
    }

    if (img.src.includes('moviestarplanet2.fr/img/features/Shop_Dress%20Up.png')) {
      console.log('Redirecting Shop_Dress%20Up.png to placeholder');
      img.src = 'https://images3.alphacoders.com/118/1181423.jpg'; // Replace with your image URL
    }
  });
});

// Dynamically monitor new images added to the DOM (e.g., through AJAX)
const observer = new MutationObserver((mutationsList) => {
  mutationsList.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.tagName === 'IMG') {
        // Intercept newly added img elements
        if (node.src.includes('moviestarplanet2.fr/img/main-bg.jpg')) {
          console.log('Redirecting main-bg.jpg to placeholder');
          node.src = 'https://images3.alphacoders.com/118/1181423.jpg'; // Replace with your image URL
        }

        if (node.src.includes('moviestarplanet2.fr/img/features/1_Welcome_2048.png')) {
          console.log('Redirecting 1_Welcome_2048.png to placeholder');
          node.src = 'https://images3.alphacoders.com/118/1181423.jpg'; // Replace with your image URL
        }

        if (node.src.includes('moviestarplanet2.fr/img/features/Shop_Dress%20Up.png')) {
          console.log('Redirecting Shop_Dress%20Up.png to placeholder');
          node.src = 'https://images3.alphacoders.com/118/1181423.jpg'; // Replace with your image URL
        }
      }
    });
  });
});

// Start observing for new img elements added dynamically
observer.observe(document.body, {
  childList: true,
  subtree: true
});
