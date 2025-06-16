// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful');
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}

// Show install prompt for PWA
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // Show your custom "Install App" button
  const installBtn = document.createElement('button');
  installBtn.textContent = 'Install App';
  installBtn.style.position = 'fixed';
  installBtn.style.bottom = '20px';
  installBtn.style.right = '20px';
  installBtn.style.zIndex = '1000';
  installBtn.style.padding = '10px 20px';
  installBtn.style.backgroundColor = 'var(--primary-color)';
  installBtn.style.color = 'white';
  installBtn.style.border = 'none';
  installBtn.style.borderRadius = '5px';
  
  installBtn.addEventListener('click', () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted install');
      }
      deferredPrompt = null;
    });
  });
  
  document.body.appendChild(installBtn);
});