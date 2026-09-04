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

// --- FEEDBACK LOGIC ---
const btnOpenFeedback = document.getElementById('btn-open-feedback');
const modalFeedback = document.getElementById('modal-feedback');
const feedbackDrawer = document.getElementById('feedback-drawer');
const btnCloseFeedback = document.getElementById('btn-close-feedback');
const starIcons = document.querySelectorAll('#star-rating-container .star-icon');
const extendedFeedback = document.getElementById('extended-feedback');
const mealBtns = document.querySelectorAll('.meal-btn');
const fbCheckboxes = document.querySelectorAll('.fb-checkbox');
const btnSubmitFeedback = document.getElementById('btn-submit-feedback');
const modalThankYou = document.getElementById('modal-thank-you');
const btnCloseThankYou = document.getElementById('btn-close-thank-you');
const thankYouBox = document.getElementById('thank-you-box');

if (btnOpenFeedback) {
  btnOpenFeedback.onclick = () => {
    modalFeedback.classList.remove('hidden');
    // Animate up
    setTimeout(() => {
      feedbackDrawer.classList.remove('translate-y-full');
    }, 10);
  };
}

if (btnCloseFeedback) {
  btnCloseFeedback.onclick = () => {
    feedbackDrawer.classList.add('translate-y-full');
    setTimeout(() => {
      modalFeedback.classList.add('hidden');
    }, 300);
  };
}

starIcons.forEach((star, index) => {
  star.onclick = () => {
    // Reveal extended feedback if hidden
    if (extendedFeedback.classList.contains('hidden')) {
      extendedFeedback.classList.remove('hidden');
    }
    // Update stars
    starIcons.forEach((s, i) => {
      if (i <= index) {
        s.classList.add('fill-yellow-400');
      } else {
        s.classList.remove('fill-yellow-400');
      }
    });
  };
});

mealBtns.forEach(btn => {
  btn.onclick = () => {
    // Reset all
    mealBtns.forEach(b => {
      b.classList.remove('border-[#ff7b52]', 'border-[2px]', 'text-[#111]', 'font-semibold', 'bg-[#ff7b52]/10', 'shadow-[0_0_12px_rgba(255,123,82,0.5)]', 'py-[7px]');
      b.classList.add('border-gray-400', 'text-black', 'py-2');
    });
    // Set active
    btn.classList.add('border-[#ff7b52]', 'border-[2px]', 'text-[#111]', 'font-semibold', 'bg-[#ff7b52]/10', 'shadow-[0_0_12px_rgba(255,123,82,0.5)]', 'py-[7px]');
    btn.classList.remove('border-gray-400', 'text-black', 'py-2');
  };
});

fbCheckboxes.forEach(cb => {
  cb.onchange = (e) => {
    const box = e.target.nextElementSibling;
    const tick = box.querySelector('.fb-checkbox-tick');
    const row = e.target.closest('.fb-checkbox-row');
    if (e.target.checked) {
      box.classList.remove('border-gray-400');
      box.classList.add('border-transparent', 'bg-brand-coral');
      tick.classList.remove('opacity-0');
      row.classList.add('bg-gray-200/50');
    } else {
      box.classList.add('border-gray-400');
      box.classList.remove('border-transparent', 'bg-brand-coral');
      tick.classList.add('opacity-0');
      row.classList.remove('bg-gray-200/50');
    }
  };
});

if (btnSubmitFeedback) {
  btnSubmitFeedback.onclick = () => {
    // Close drawer
    feedbackDrawer.classList.add('translate-y-full');
    setTimeout(() => {
      modalFeedback.classList.add('hidden');
      
      // Open thank you modal
      modalThankYou.classList.remove('hidden');
      setTimeout(() => {
        thankYouBox.classList.remove('scale-95');
        thankYouBox.classList.add('scale-100');
      }, 10);
    }, 300);
  };
}

if (btnCloseThankYou) {
  btnCloseThankYou.onclick = () => {
    thankYouBox.classList.remove('scale-100');
    thankYouBox.classList.add('scale-95');
    setTimeout(() => {
      modalThankYou.classList.add('hidden');
    }, 200);
  };
}
