// Client-side validation for signup form
document.getElementById('signupForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Clear previous errors
  clearErrors();

  let valid = true;

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Username validation
  if (username.length < 3 || username.length > 20) {
    showError('usernameError', 'Username must be between 3 and 20 characters.');
    valid = false;
  }

  // Email validation
  if (!validateEmail(email)) {
    showError('emailError', 'Please enter a valid email address.');
    valid = false;
  }

  // Password validation
  if (password.length < 6) {
    showError('passwordError', 'Password must be at least 6 characters.');
    valid = false;
  }

  // Confirm password validation
  if (password !== confirmPassword) {
    showError('confirmPasswordError', 'Passwords do not match.');
    valid = false;
  }

  if (valid) {
    // Save user credentials locally in localStorage
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    // Check if email already exists
    if (users.some(user => user.email === email)) {
      showError('signupError', 'An account with this email already exists.');
      document.getElementById('signupSuccess').textContent = '';
      return;
    }
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    document.getElementById('signupSuccess').textContent = 'Registration successful! You can now log in.';
    document.getElementById('signupError').textContent = '';
    this.reset();
  } else {
    document.getElementById('signupSuccess').textContent = '';
  }
});

function showError(id, message) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = message;
    element.style.display = 'block';
  }
}

function clearErrors() {
  ['usernameError', 'emailError', 'passwordError', 'confirmPasswordError', 'signupError'].forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = '';
      element.style.display = 'none';
    }
  });
}

function validateEmail(email) {
  const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  return re.test(email);
}
