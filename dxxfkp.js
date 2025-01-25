
window.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
  

    images.forEach((img) => {
      if (img.src.includes('moviestarplanet2.fr/img/main-bg.jpg')) {
        console.log('Redirecting main-bg.jpg to placeholder');
        img.src = 'https://motionbgs.com/media/6953/pixel-lamborghini-countach.960x540.mp4'; 
      }
  
      if (img.src.includes('moviestarplanet2.fr/img/features/1_Welcome_2048.png')) {
        console.log('Redirecting 1_Welcome_2048.png to placeholder');
        img.src = 'https://motionbgs.com/media/6953/pixel-lamborghini-countach.960x540.mp4'; 
      }
  
      if (img.src.includes('moviestarplanet2.fr/img/features/Shop_Dress%20Up.png')) {
        console.log('Redirecting Shop_Dress%20Up.png to placeholder');
        img.src = 'https://m.media-amazon.com/images/I/614mcxqh27L.jpg'; 
      }

      if (img.src.includes('moviestarplanet2.fr/img/features/1_Welcome_1242big.png')) {
        console.log('Redirecting Shop_Dress%20Up.png to placeholder');
        img.src = 'https://m.media-amazon.com/images/I/614mcxqh27L.jpg'; 
      }

      if (img.src.includes('img/logo.png')) {
        console.log('Redirecting Shop_Dress%20Up.png to placeholder');
        img.src = 'https://cdn.leonardo.ai/users/2bfd1ced-09a4-4845-a870-3670abce8903/generations/d32ccf8f-a90a-42d4-85b2-a42a161985c8/Leonardo_Phoenix_10_Create_a_humorous_surreal_image_featuring_3.jpg'; 
      }

      
      if (img.src.includes('img/buy_giftcertificate_btn.png')) {
        console.log('Redirecting Shop_Dress%20Up.png to placeholder');
        img.src = 'https://cdn.leonardo.ai/users/58a045bd-cd84-48f0-ac75-3a67f603dfc5/generations/ae3c7429-6b18-4ac1-897b-0df82c92b48f/Leonardo_Phoenix_10_Create_an_image_depicting_a_bold_red_recta_0.jpg'; 
      }

      
    });
  });
  
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.tagName === 'IMG') {
 
          if (node.src.includes('moviestarplanet2.fr/img/main-bg.jpg')) {
            console.log('Redirecting main-bg.jpg to placeholder');
            node.src = 'https://motionbgs.com/media/6953/pixel-lamborghini-countach.960x540.mp4'; 
          }
  
          if (node.src.includes('moviestarplanet2.fr/img/features/1_Welcome_2048.png')) {
            console.log('Redirecting 1_Welcome_2048.png to placeholder');
            node.src = 'https://motionbgs.com/media/6953/pixel-lamborghini-countach.960x540.mp4'; 
          }
  
          if (node.src.includes('moviestarplanet2.fr/img/features/Shop_Dress%20Up.png')) {
            console.log('Redirecting Shop_Dress%20Up.png to placeholder');
            node.src = 'https://m.media-amazon.com/images/I/614mcxqh27L.jpg';
          }

          if (node.src.includes('moviestarplanet2.fr/img/features/1_Welcome_1242big.png')) {
            console.log('Redirecting Shop_Dress%20Up.png to placeholder');
            node.src = 'https://m.media-amazon.com/images/I/614mcxqh27L.jpg';
          }

          if (node.src.includes('img/logo.png')) {
            console.log('Redirecting Shop_Dress%20Up.png to placeholder');
            node.src = 'https://cdn.leonardo.ai/users/2bfd1ced-09a4-4845-a870-3670abce8903/generations/d32ccf8f-a90a-42d4-85b2-a42a161985c8/Leonardo_Phoenix_10_Create_a_humorous_surreal_image_featuring_3.jpg';
          }

          if (node.src.includes('img/buy_giftcertificate_btn.png')) {
            console.log('Redirecting Shop_Dress%20Up.png to placeholder');
            node.src = 'https://cdn.leonardo.ai/users/58a045bd-cd84-48f0-ac75-3a67f603dfc5/generations/ae3c7429-6b18-4ac1-897b-0df82c92b48f/Leonardo_Phoenix_10_Create_an_image_depicting_a_bold_red_recta_0.jpg';
          }



        }
      });
    });
  });
  
 
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
