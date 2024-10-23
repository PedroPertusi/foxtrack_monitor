chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("Message received in foxtrack.js:", request.msg);
  
    if (request.msg === "start scan") {
        let score = 100;
        let thirdPartyDomains = [];
        let hijackingDetected = false;
        let localStorageDetected = false;
        let canvasFingerprintDetected = false;
        let cookieDetected = false;
        let firstPartyCookies = 0;
        let thirdPartyCookies = 0;
  
      // Conexões a domínios de terceira parte
      function thirdPartyCheck() {
        const requests = performance.getEntriesByType('resource');
        requests.forEach((request) => {
          const url = new URL(request.name);
          if (url.hostname !== window.location.hostname) {
            thirdPartyDomains.push(url.hostname);
          }
        });
  
        if (thirdPartyDomains.length > 0) {
          score -= 10; 
        }
        console.log("Domínios de terceira parte:", thirdPartyDomains);
      }
  
      // Potenciais ameaças de sequestro de navegador
      function hijackingCheck() {
        if (window.top !== window.self) {
          hijackingDetected = true;
          score -= 10; 
        }
        console.log("Ameaças de sequestro de navegador detectadas:", hijackingDetected);
      }
  
      // Detectar o armazenamento de dados
      function localStorageCheck() {
        if (localStorage.length > 0) {
          localStorageDetected = true;
          score -= 10; 
        }
        console.log("Local storage detected:", localStorageDetected);
      }
  
      // Detecção de Canvas fingerprint
      function canvasFingerprintCheck() {
        const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
        HTMLCanvasElement.prototype.toDataURL = function () {
          canvasFingerprintDetected = true;
          score -= 5; 
          console.log("Canvas fingerprinting detected.");
          return originalToDataURL.apply(this, arguments);
        };
      }
  
      // Função para checar cookies (primeira e terceira parte)
      function cookieCheck() {
        const allCookies = document.cookie.split(';');
  
        allCookies.forEach((cookie) => {
          if (cookie.includes(window.location.hostname)) {
            firstPartyCookies++;
          } else {
            thirdPartyCookies++;
          }
        });
  
        if (thirdPartyCookies > 0) {
            cookieDetected = true;
            score -= 10; 
        }
        console.log("First-party cookies:", firstPartyCookies, "Third-party cookies:", thirdPartyCookies);
      }
  
      thirdPartyCheck();
      hijackingCheck();
      localStorageCheck();
      canvasFingerprintCheck();
      cookieCheck();

      setTimeout(() => {
        chrome.runtime.sendMessage({
            type: "scanResult",
            score: score,
            thirdPartyDomains: thirdPartyDomains.length > 0 ? thirdPartyDomains.join(', ') : 'Nenhum domínio de terceiros detectado',
            hijackingDetected: hijackingDetected ? 'Ameaça de sequestro detectada' : 'Nenhuma ameaça de sequestro detectada',
            localStorageDetected: localStorageDetected ? 'Armazenamento local detectado' : 'Nenhum armazenamento local detectado',
            canvasFingerprintDetected: canvasFingerprintDetected ? 'Canvas fingerprinting detectado' : 'Nenhum canvas fingerprinting detectado',
            cookieStatus: cookieDetected ? 'Cookies detectados' : 'Nenhum cookie detectado',
            cookieAmount: 'Cookies de primeira parte: ' + firstPartyCookies + ' | Cookies de terceiros: ' + thirdPartyCookies
        });
    
        sendResponse({ status: "completed" });
    }, 3000);    
  
      return true;
    }
});
