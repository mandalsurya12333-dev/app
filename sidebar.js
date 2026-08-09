// --- SIDEBAR DATA ---
const menuItems = [
  { icon: 'public/sidebar/attendance.png', label: 'Attendance' },
  { icon: 'public/sidebar/placement-scanner.png', label: 'Placement Barcode Scanner' },
  { icon: 'public/sidebar/book-appointment.png', label: 'Book Appointment' },
  { icon: 'public/sidebar/transport.png', label: 'Transport Preference' },
  { icon: 'public/sidebar/change-password.png', label: 'Change UMS Password' },
  { icon: 'public/sidebar/view-marks.png', label: 'View Marks' },
  { icon: 'public/sidebar/event-attendance.png', label: 'Event Attendance' },
  { icon: 'public/sidebar/doctor-appointment.png', label: 'Doctor Appointment' },
  { icon: 'public/sidebar/document-upload.png', label: 'Document Upload' },
  
  { icon: 'public/sidebar/elective-polling.png', label: 'Elective Polling' },
  { icon: 'public/sidebar/fee-schedule.png', label: 'Fee Payment Schedule' },
  { icon: 'public/sidebar/fee-statement.png', label: 'Fee Statement' },
  { icon: 'public/sidebar/guest-lecture.png', label: 'Guest Lecture/Workshop Feedback' },
  { icon: 'public/sidebar/holidays.png', label: 'List of Holidays' },
  { icon: 'public/sidebar/fee-payment.png', label: 'Fee Payment' },
  { icon: 'public/sidebar/app-feedback.png', label: 'App Feedback' },
  { icon: 'public/sidebar/virtual-tour.png', label: 'Virtual Tour' },
  { icon: 'public/sidebar/holidays.png', label: 'Library Search' },
  { icon: 'public/sidebar/holidays.png', label: 'Summer Term Registration' },
  { icon: 'public/sidebar/hostel-leave.png', label: 'Hostel Leave Slip' },

  { icon: 'public/sidebar/holidays.png', label: 'Mess Food Scanner' },
  { icon: 'public/sidebar/pep.png', label: 'PEP Activities' },
  { icon: 'public/sidebar/guest-lecture.png', label: 'Placement Drive Summary' },
  { icon: 'public/sidebar/change-password.png', label: 'RMS Request Status' },
  { icon: 'public/sidebar/holidays.png', label: 'RMS Scanner' },
  { icon: 'public/sidebar/holidays.png', label: 'Skill Development Feedback' },
  { icon: 'public/sidebar/holidays.png', label: 'Student Class Feedback' },
  { icon: 'public/sidebar/spr-progress.png', label: 'SPR Course Progress' },
  { icon: 'public/sidebar/holidays.png', label: 'Event QR Scanner/Tier Request' },
  { icon: 'public/sidebar/.png', label: 'Exam Attendance' }
];

// --- ELEMENTS ---
const btnMenuOpen = document.getElementById('btn-menu-open');
const sidebarMenu = document.getElementById('sidebar-menu');
const sidebarBackdrop = document.getElementById('sidebar-backdrop');
const menuSearch = document.getElementById('menu-search');
const menuItemsContainer = document.getElementById('menu-items-container');

// --- RENDER LOGIC ---
function renderMenuItems(filter = '') {
  menuItemsContainer.innerHTML = '';
  const filtered = menuItems.filter(item => item.label.toLowerCase().includes(filter.toLowerCase()));
  
  filtered.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'w-full flex items-center px-4 py-4 hover:bg-gray-50 border-b border-gray-100 transition-colors';
    
    // Instead of lucide icons or emojis, we use an img placeholder for custom icons
    btn.innerHTML = `
      <div class="w-6 h-6 mr-4 flex-shrink-0 flex items-center justify-center">
        <img src="${item.icon}" alt="Icon" class="max-w-full max-h-full object-contain" onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%239ca3af%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Crect x=%223%22 y=%223%22 width=%2218%22 height=%2218%22 rx=%222%22 ry=%222%22/%3E%3Ccircle cx=%228.5%22 cy=%228.5%22 r=%221.5%22/%3E%3Cpolyline points=%2221 15 16 10 5 21%22/%3E%3C/svg%3E';">
      </div>
      <span class="text-gray-700 font-medium text-[15px]">${item.label}</span>
    `;
    
    btn.onclick = () => {
      if (item.label === 'Mess Food Scanner') {
        window.location.href = 'mess-scanner.html';
        return;
      }

      sidebarMenu.classList.add('hidden');
    };
    
    menuItemsContainer.appendChild(btn);
  });
}

// --- EVENT LISTENERS ---
btnMenuOpen.onclick = () => {
  sidebarMenu.classList.remove('hidden');
  renderMenuItems(menuSearch.value);
};

sidebarBackdrop.onclick = () => {
  sidebarMenu.classList.add('hidden');
};

menuSearch.oninput = (e) => {
  renderMenuItems(e.target.value);
};

// Initialize
renderMenuItems();
