const emojis = document.querySelectorAll('.emoji');
const moodText = document.getElementById('moodText');
const moodHistoryLink = document.getElementById('moodHistoryLink'); // Reference to the mood history link
const moodTrackerLink = document.getElementById('moodTrackerLink'); // Reference to Mood Tracker link
const appointmentBookingLink = document.getElementById('appointmentBookingLink'); // Reference to Appointment Booking link
const authLink = document.getElementById('authLink'); // Reference to the auth link in header

// Handle emoji selection with login check
emojis.forEach(emoji => {
  emoji.addEventListener('click', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') || sessionStorage.getItem('isLoggedIn'); // Check login status
    if (!isLoggedIn) {
      // Redirect to login if not logged in
      window.location.href = 'login.html?redirect=home.html';
    } else {
      // Proceed with mood selection if logged in
      emojis.forEach(e => e.classList.remove('selected'));
      emoji.classList.add('selected');
      const mood = emoji.getAttribute('data-mood');
      moodText.innerHTML = `You are feeling: <span>${mood}</span>`;
    }
  });
});

// Handle Mood Tracker link click with login check
moodTrackerLink.addEventListener('click', () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') || sessionStorage.getItem('isLoggedIn');
  if (!isLoggedIn) {
    window.location.href = 'login.html?redirect=mood-tracker.html';
  } else {
    window.location.href = 'mood-tracker.html';
  }
});

// Handle Appointment Booking link click with login check
appointmentBookingLink.addEventListener('click', () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') || sessionStorage.getItem('isLoggedIn');
  if (!isLoggedIn) {
    window.location.href = 'login.html?redirect=appointment-booking.html';
  } else {
    window.location.href = 'Appointment Booking.html';
  }
});

// Handle auth link (Login/Logout) toggle and action
authLink.addEventListener('click', () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') || sessionStorage.getItem('isLoggedIn');
  if (isLoggedIn) {
    // Logout action
    localStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email');
    sessionStorage.removeItem('email');
    updateAuthLink(); // Update link text after logout
    alert('You have been logged out.');
  } else {
    // Redirect to login page
    window.location.href = 'login.html?redirect=home.html';
  }
});

// Function to update the auth link text based on login status
function updateAuthLink() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') || sessionStorage.getItem('isLoggedIn');
  if (isLoggedIn) {
    authLink.textContent = 'Log Out';
    // Keep it non-navigable for logout action
    authLink.href = 'javascript:void(0)'; 
  } else {
    authLink.textContent = 'Login';
    // Revert to login page link when logged out
    authLink.href = 'login.html'; 
  }
}

// Slick Carousel Initialization
$(document).ready(function(){
  $('.quote-slider').slick({
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    adaptiveHeight: true
  });
});

// Sidebar Toggle Logic
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.querySelector('.sidebar');
  const closeBtn = document.querySelector('.close-btn');
  const overlay = document.querySelector('.overlay'); // Select the overlay

  // Function to open the sidebar
  hamburger.addEventListener('click', function() {
    sidebar.classList.add('active');
    overlay.classList.add('active'); // Show the overlay
  });

  // Function to close the sidebar
  closeBtn.addEventListener('click', function() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active'); // Hide the overlay
  });

  // Close sidebar when clicking on the overlay
  overlay.addEventListener('click', function() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
  });

  // Optional: Close sidebar when clicking on a link inside it
  const sidebarLinks = document.querySelectorAll('.sidebar .nav-links a');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function() {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
    });
  });

  // Update auth link on page load
  updateAuthLink();
});