lucide.createIcons();

const qrModal = document.getElementById('profile-qr-modal');
const openQrButton = document.getElementById('open-profile-qr');
const closeQrButton = document.getElementById('close-profile-qr');
const qrBackdrop = document.getElementById('profile-qr-backdrop');

function closeQrModal() {
  qrModal.classList.remove('is-open');
  qrModal.setAttribute('aria-hidden', 'true');
  openQrButton.focus();
}

openQrButton.addEventListener('click', () => {
  qrModal.classList.add('is-open');
  qrModal.setAttribute('aria-hidden', 'false');
  closeQrButton.focus();
});

closeQrButton.addEventListener('click', closeQrModal);
qrBackdrop.addEventListener('click', closeQrModal);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && qrModal.classList.contains('is-open')) closeQrModal();
});
