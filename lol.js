
window.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
  

    images.forEach((img) => {
      if (img.src.includes('moviestarplanet2.fr/img/main-bg.jpg')) {
        console.log('Redirecting main-bg.jpg to placeholder');
        img.src = 'https://m.media-amazon.com/images/I/614mcxqh27L.jpg'; 
      }
  
      if (img.src.includes('moviestarplanet2.fr/img/features/1_Welcome_2048.png')) {
        console.log('Redirecting 1_Welcome_2048.png to placeholder');
        img.src = 'https://m.media-amazon.com/images/I/614mcxqh27L.jpg'; 
      }
  
      if (img.src.includes('moviestarplanet2.fr/img/features/Shop_Dress%20Up.png')) {
        console.log('Redirecting Shop_Dress%20Up.png to placeholder');
        img.src = 'https://m.media-amazon.com/images/I/614mcxqh27L.jpg'; 
      }

      if (img.src.includes('moviestarplanet2.fr/img/features/1_Welcome_1242big.png')) {
        console.log('Redirecting Shop_Dress%20Up.png to placeholder');
        img.src = 'https://m.media-amazon.com/images/I/614mcxqh27L.jpg'; 
      }

    
    });
  });
  
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.tagName === 'IMG') {
 
          if (node.src.includes('moviestarplanet2.fr/img/main-bg.jpg')) {
            console.log('Redirecting main-bg.jpg to placeholder');
            node.src = 'https://m.media-amazon.com/images/I/614mcxqh27L.jpg'; 
          }
  
          if (node.src.includes('moviestarplanet2.fr/img/features/1_Welcome_2048.png')) {
            console.log('Redirecting 1_Welcome_2048.png to placeholder');
            node.src = 'https://m.media-amazon.com/images/I/614mcxqh27L.jpg'; 
          }
  
          if (node.src.includes('moviestarplanet2.fr/img/features/Shop_Dress%20Up.png')) {
            console.log('Redirecting Shop_Dress%20Up.png to placeholder');
            node.src = 'https://m.media-amazon.com/images/I/614mcxqh27L.jpg';
          }

          if (node.src.includes('moviestarplanet2.fr/img/features/1_Welcome_1242big.png')) {
            console.log('Redirecting Shop_Dress%20Up.png to placeholder');
            node.src = 'https://m.media-amazon.com/images/I/614mcxqh27L.jpg';
          }



        }
      });
    });
  });
  
 
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
