// Redirect to login if not logged in
if (!localStorage.getItem('loggedInUser')) {
  window.location.href = "login.html";
}

// Set today's date as default
    document.getElementById('mood-date').valueAsDate = new Date();

    // Mood selection logic
    const moodOptions = document.querySelectorAll('.mood-option');
    let selectedMood = null;
    moodOptions.forEach(option => {
      option.addEventListener('click', () => {
        moodOptions.forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
        selectedMood = option.getAttribute('data-mood');
      });
    });

    // Save mood to localStorage
    document.getElementById('moodForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const date = document.getElementById('mood-date').value;
      const notes = document.getElementById('mood-notes').value.trim();
      if (!selectedMood) {
        alert('Please select your mood.');
        return;
      }
      const moodEntry = {
        date,
        mood: selectedMood,
        notes
      };
      let moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
      // Remove existing entry for the same date
      moodHistory = moodHistory.filter(entry => entry.date !== date);
      moodHistory.unshift(moodEntry);
      localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
      renderMoodHistory();
      this.reset();
      moodOptions.forEach(o => o.classList.remove('selected'));
      selectedMood = null;
    });

    // Render mood history
    function renderMoodHistory() {
      const moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
      const list = document.getElementById('moodHistoryList');
      list.innerHTML = '';
      if (moodHistory.length === 0) {
        list.innerHTML = '<li style="text-align:center;color:#5a7fcf;">No mood records yet.</li>';
        return;
      }
      moodHistory.forEach(entry => {
        const emojiMap = {
          happy: '😊',
          neutral: '😐',
          sad: '😩',
          angry: '😡',
          excited: '🤩'
        };
        const li = document.createElement('li');
        li.innerHTML = `
          <span>
            <span class="mood-emoji">${emojiMap[entry.mood] || ''}</span>
            <strong>${entry.date}</strong>
            ${entry.notes ? `<span style="font-size:0.95em;color:#5a7fcf;">- ${entry.notes}</span>` : ''}
          </span>
          <button style="background:none;border:none;color:#5a7fcf;cursor:pointer;font-size:1.1em;" title="Delete" onclick="deleteMood('${entry.date}')">&#10006;</button>
        `;
        list.appendChild(li);
      });
    }

    // Delete mood entry
    function deleteMood(date) {
      let moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
      moodHistory = moodHistory.filter(entry => entry.date !== date);
      localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
      renderMoodHistory();
    }

    // Initial render
    renderMoodHistory();
    // Expose deleteMood globally
    window.deleteMood = deleteMood;