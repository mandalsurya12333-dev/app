// Initialize Lucide icons
lucide.createIcons();

let selectedMeal = 'Lunch';
let countdownTimer = null;
let html5QrcodeScanner = null;

const viewDashboard = document.getElementById('view-dashboard');
const viewMessScanner = document.getElementById('view-mess-scanner');
const viewQrScanner = document.getElementById('view-qr-scanner');
const modalMessPass = document.getElementById('modal-mess-pass');
const btnBackToDash = document.getElementById('btn-back-to-dash');
const btnBackToMess = document.getElementById('btn-back-to-mess');
const btnClosePass = document.getElementById('btn-close-pass');
const scanResultBox = document.getElementById('scan-result-box');
const scanResultText = document.getElementById('scan-result-text');

function openView(view) {
  viewDashboard.classList.add('hidden');
  viewMessScanner.classList.add('hidden');
  viewQrScanner.classList.add('hidden');
  view.classList.remove('hidden');

  if (view !== viewQrScanner && html5QrcodeScanner) {
    html5QrcodeScanner.stop().catch(() => {});
    html5QrcodeScanner = null;
  }
}

btnBackToDash.onclick = () => {
  openView(viewDashboard);
  scanResultBox.classList.add('hidden');
};

btnBackToMess.onclick = () => openView(viewMessScanner);

function openQRScanner(meal) {
  selectedMeal = meal;
  openView(viewQrScanner);

  // Preserve the original demo interaction: tap anywhere in the scanner to approve the meal.
  viewQrScanner.onclick = (event) => {
    if (event.target.closest('#btn-back-to-mess')) return;
    if (html5QrcodeScanner) {
      html5QrcodeScanner.stop().catch(() => {});
      html5QrcodeScanner = null;
    }
    openView(viewMessScanner);
    showMessPass();
  };

  // Camera scanning remains available whenever the page is served on localhost/HTTPS.
  if (typeof Html5Qrcode === 'undefined' || !window.isSecureContext || !navigator.mediaDevices?.getUserMedia) return;

  html5QrcodeScanner = new Html5Qrcode('qr-reader');
  html5QrcodeScanner.start(
    { facingMode: 'environment' },
    { fps: 10, qrbox: { width: 250, height: 250 } },
    (decodedText) => {
      scanResultText.innerText = decodedText;
      scanResultBox.classList.remove('hidden');
      openView(viewMessScanner);
      showMessPass();
    },
    () => {}
  ).catch(() => {});
}

function updateDateTime() {
  const now = new Date();
  document.getElementById('pass-date').innerText = now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  document.getElementById('pass-time').innerText = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function showMessPass() {
  document.getElementById('pass-meal-name').innerText = selectedMeal;
  updateDateTime();
  modalMessPass.classList.remove('hidden');
  document.getElementById('loading-spinner').classList.remove('hidden');
  const stamp = document.getElementById('accepted-stamp');
  stamp.classList.add('hidden', 'scale-0');
  stamp.classList.remove('scale-100');

  let count = 30;
  const countEl = document.getElementById('pass-countdown');
  countEl.innerText = count;
  if (countdownTimer) clearInterval(countdownTimer);
  countdownTimer = setInterval(() => {
    count -= 1;
    countEl.innerText = count;
    if (count <= 0) closePass();
  }, 1000);

  setTimeout(() => {
    document.getElementById('loading-spinner').classList.add('hidden');
    stamp.classList.remove('hidden');
    setTimeout(() => { stamp.classList.remove('scale-0'); stamp.classList.add('scale-100'); }, 50);
  }, 1000);
}

function closePass() {
  modalMessPass.classList.add('hidden');
  clearInterval(countdownTimer);
  scanResultBox.classList.add('hidden');
  scanResultText.innerText = '';
}

btnClosePass.onclick = closePass;
renderMenuItems();

// Direct route used by the sidebar. The original scanner UI stays inside index.html.
if (window.location.hash === '#mess-food-scanner') {
  openView(viewMessScanner);
}
