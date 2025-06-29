// Real-time input validation
document.getElementById('email').addEventListener('input', validateEmail);
document.getElementById('password').addEventListener('input', validatePassword);

function validateEmail() {
  const email = document.getElementById('email').value;
  const emailError = document.getElementById('emailError');
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  emailError.classList.toggle('active', !isValid);
  emailError.textContent = isValid ? '' : 'Please enter a valid email address';
  return isValid;
}

function validatePassword() {
  const password = document.getElementById('password').value;
  const passwordError = document.getElementById('passwordError');
  const isValid = password.length >= 8;
  passwordError.classList.toggle('active', !isValid);
  passwordError.textContent = isValid ? '' : 'Password must be at least 8 characters';
  return isValid;
}

// Handle login submission
function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const rememberMe = document.getElementById('rememberMe').checked;
  const loginError = document.getElementById('loginError');
  const loading = document.getElementById('loading');

  // Validate inputs
  if (!validateEmail() || !validatePassword()) {
    loginError.classList.add('active');
    loginError.textContent = 'Please fix the errors above';
    return false;
  }

  // Show loading spinner
  loading.style.display = 'block';

  // Simulate server request (replace with actual API call)
  setTimeout(() => {
    // Added dummy user credentials
    const validCredentials = (email === 'test@gmail.com' && password === 'password123') ||
    (email === 'user@example.com' && password === 'userpass123');
    if (validCredentials) {
      // Store session/token
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('isLoggedIn', 'true');
      storage.setItem('email', email);

      // Redirect based on intent or default to home page
      const redirect = sessionStorage.getItem('redirectTo') || 'home.html';
      sessionStorage.removeItem('redirectTo');
      window.location.href = redirect;
    } else {
      loginError.classList.add('active');
      loginError.textContent = 'Invalid email or password';
      loading.style.display = 'none';
    }
  }, 1000); // Simulate 1-second delay

  return false;
}

// Check login status on page load
window.onload = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') || sessionStorage.getItem('isLoggedIn');
  if (isLoggedIn) {
    window.location.href = 'home.html';
  }

  const redirectPath = window.location.search.match(/redirect=([^&]+)/);
  if (redirectPath) {
    sessionStorage.setItem('redirectTo', redirectPath[1]);
    document.getElementById('loginError').classList.add('active');
    document.getElementById('loginError').textContent = 'Please log in to access this page.';
  }
};