document.addEventListener('DOMContentLoaded', function () {
  const runButton = document.getElementById('runScan');
  const aboutButton = document.getElementById('about');
  const loadingDiv = document.getElementById('loading');
  const resultDiv = document.getElementById('result'); 
  const aboutDiv = document.getElementById('aboutSection');
  const closeAboutButton = document.getElementById('closeAbout');

  aboutButton.addEventListener('click', function () {
    loadingDiv.style.display = 'none';
    resultDiv.style.display = 'none';
    runButton.style.display = 'none';
    aboutButton.style.display = 'none';
    aboutDiv.style.display = 'block';
  });

  closeAboutButton.addEventListener('click', function () {
    loadingDiv.style.display = 'none';
    resultDiv.style.display = 'none';
    runButton.style.display = 'block';
    aboutButton.style.display = 'block';
    aboutDiv.style.display = 'none';
  });

  runButton.addEventListener('click', function () {
    runButton.style.display = 'none';
    aboutButton.style.display = 'none';
    loadingDiv.style.display = 'block';

    chrome.tabs.executeScript(null, {
      file: "/content_scripts/foxtrack.js",
    }, function() {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { msg: "start scan" }, function(response) {
          if (response && response.status === "completed") {
            loadingDiv.style.display = 'none';
            resultDiv.style.display = 'block';
          }
        });
      });
    });
  });

  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type === 'scanResult') {
      document.getElementById('thirdPartyStatus').textContent = message.thirdPartyDomains;
      document.getElementById('hijackingStatus').textContent = message.hijackingDetected;
      document.getElementById('storageStatus').textContent = message.localStorageDetected;
      document.getElementById('fingerprintStatus').textContent = message.canvasFingerprintDetected;
      document.getElementById("cookieStatus").textContent = message.cookieStatus;
      document.getElementById('cookieAmount').textContent = message.cookieAmount;
      document.getElementById('privacyScore').textContent = `${message.score}/100`;

    }
  });
});
