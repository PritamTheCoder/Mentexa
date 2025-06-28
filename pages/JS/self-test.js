    // Toggle sidebar visibility
    function toggleSidebar() {
      const sidebar = document.querySelector('.sidebar');
      const overlay = document.querySelector('.overlay');
      sidebar.classList.toggle('active');
      overlay.classList.toggle('active');
    }

  // Get test type from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const testType = urlParams.get('test'); // 'test' parameter

    // Load questions based on URL parameter
    function loadQuestions() {
      if (!testType || (testType !== 'gad7' && testType !== 'phq9')) {
        alert('Invalid test type. Redirecting to home...');
        window.location.href = 'home.html';
        return;
      }
      // fetch api for loading questions
      fetch('/Mentexa/pages/html/questions.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
        })
        .then(data => {
          const questions = data[testType];
          if (!questions) {
            throw new Error('No questions found for test type: ' + testType);
          }
          let html = '';
          questions.forEach((q, index) => {
            html += `
              <div class="question" id="q-${index + 1}">
                <label>${q.text}</label>
                <input type="radio" name="q${index + 1}" value="0" required> Not at all<br>
                <input type="radio" name="q${index + 1}" value="1"> Several days<br>
                <input type="radio" name="q${index + 1}" value="2"> More than half the days<br>
                <input type="radio" name="q${index + 1}" value="3"> Nearly every day<br>
              </div>
            `;
          });
          document.getElementById('questions').innerHTML = html;
          document.getElementById('submit-btn').style.display = 'block';
        })
        .catch(error => {
          console.error('Error loading questions:', error);
          alert('Failed to load questions. Please try again later or check your connection.');
          window.location.href = 'home.html';
        });
    }

    // Calculate score and display result
    function calculateScore() {
      let score = 0;
      const questions = testType === 'gad7' ? 7 : 9;

      // Sum up points from all questions
      for (let i = 1; i <= questions; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected) {
          score += parseInt(selected.value);
        } else {
          alert('Please answer all questions.');
          return;
        }
      }

      // Determine and display result based on score
      let resultText = '';
      if (testType === 'gad7') {
        if (score <= 4) {
          resultText = `
            <strong>Minimal Anxiety</strong><br>
            Your score indicates minimal anxiety symptoms. This suggests you are experiencing little to no anxiety-related distress at this time.<br><br>
            <strong>Tips:</strong>
            - Maintain a balanced routine with regular exercise and sleep.<br>
            - Practice mindfulness or deep breathing for relaxation.<br>
            - Stay connected with supportive friends or family.<br><br>
            <em>For peace of mind, consider consulting a healthcare professional for a comprehensive evaluation or book an appointment.</em>
          `;
        } else if (score <= 9) {
          resultText = `
            <strong>Mild Anxiety</strong><br>
            Your score suggests mild anxiety symptoms, which may occasionally interfere with daily life.<br><br>
            <strong>Tips:</strong>
            - Try relaxation techniques like meditation or yoga.<br>
            - Limit caffeine and screen time before bed.<br>
            - Journal your thoughts to identify triggers.<br><br>
            <em>We recommend consulting a professional to explore further support if needed.</em>
          `;
        } else if (score <= 14) {
          resultText = `
            <strong>Moderate Anxiety</strong><br>
            Your score indicates moderate anxiety, which may significantly impact your daily functioning.<br><br>
            <strong>Tips:</strong>
            - Engage in structured relaxation exercises daily.<br>
            - Seek a trusted confidant to discuss your concerns.<br>
            - Consider professional guidance for coping strategies.<br><br>
            <em>Please consult a healthcare professional for personalized advice and potential treatment options.</em>
          `;
        } else {
          resultText = `
            <strong>Severe Anxiety</strong><br>
            Your score suggests severe anxiety, which may require immediate attention and support.<br><br>
            <strong>Tips:</strong>
            - Practice slow, controlled breathing to manage acute episodes.<br>
            - Avoid isolating yourself; reach out to someone you trust.<br>
            - Prioritize rest and avoid stressors where possible.<br><br>
            <em>We strongly urge you to consult a healthcare professional promptly for expert evaluation and care.</em>
          `;
        }
      } else { // phq9
        if (score <= 4) {
          resultText = `
            <strong>Minimal Depression</strong><br>
            Your score indicates minimal depression symptoms, suggesting you are coping well currently.<br><br>
            <strong>Tips:</strong>
            - Continue healthy habits like exercise and nutrition.<br>
            - Engage in activities you enjoy to maintain well-being.<br>
            - Stay connected with loved ones.<br><br>
            <em>For reassurance, consider a professional check-up if symptoms persist.</em>
          `;
        } else if (score <= 9) {
          resultText = `
            <strong>Mild Depression</strong><br>
            Your score suggests mild depression, which may affect your mood occasionally.<br><br>
            <strong>Tips:</strong>
            - Incorporate light exercise or outdoor time daily.<br>
            - Set small, achievable goals to build confidence.<br>
            - Talk to a friend or consider journaling.<br><br>
            <em>We suggest consulting a professional for additional guidance if needed.</em>
          `;
        } else if (score <= 14) {
          resultText = `
            <strong>Moderate Depression</strong><br>
            Your score indicates moderate depression, which may disrupt your daily life.<br><br>
            <strong>Tips:</strong>
            - Establish a consistent sleep and meal schedule.<br>
            - Seek support from a trusted person or group.<br>
            - Try guided relaxation or therapy exercises.<br><br>
            <em>Please consult a healthcare professional for tailored support and treatment options.</em>
          `;
        } else if (score <= 19) {
          resultText = `
            <strong>Moderately Severe Depression</strong><br>
            Your score suggests moderately severe depression, indicating significant challenges.<br><br>
            <strong>Tips:</strong>
            - Focus on basic self-care (eating, resting, hydrating).<br>
            - Reach out to a support network or helpline.<br>
            - Avoid making major decisions alone.<br><br>
            <em>We strongly recommend consulting a healthcare professional for immediate assistance.</em>
          `;
        } else {
          resultText = `
            <strong>Severe Depression</strong><br>
            Your score indicates severe depression, which requires urgent attention.<br><br>
            <strong>Tips:</strong>
            - Contact a trusted person or emergency service immediately.<br>
            - Ensure safety by staying with someone if possible.<br>
            - Avoid isolation and seek professional help.<br><br>
            <em>Please seek help from a healthcare professional or crisis support service without delay.</em>
          `;
        }
      }

      document.getElementById('result').innerHTML = `
        <h2>Test Result</h2>
        <p>${resultText}</p>
        <button onclick="window.location.href='self-test.html?test=${testType}'">Retake Test</button>
      `;
      document.getElementById('result').style.display = 'block';
      document.getElementById('submit-btn').style.display = 'none';
    }

    // Load questions when page loads
    window.onload = () => loadQuestions();

    /* const moodTrackerLink = document.getElementById('moodTrackerLink'); // Reference to Mood Tracker link
const appointmentBookingLink = document.getElementById('appointmentBookingLink'); // Reference to Appointment Booking link
const authLink = document.getElementById('authLink'); // Reference to the auth link in header */

    /*     // Handle Mood Tracker link click with login check
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
}); */

