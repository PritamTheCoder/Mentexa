// Set login for testing (to be removed in production)
localStorage.setItem('isLoggedIn', 'true');

// Redirect if not logged in
if (localStorage.getItem('isLoggedIn') !== 'true') {
    alert('Please login first. Redirecting to login page...');
    window.location.href = 'login.html'; // link for login page
}

// Logout function
function logout() {
    localStorage.setItem('isLoggedIn', 'false');
    alert('Logged out successfully.');
    window.location.href = 'login.html';
}

// Toggle sidebar and overlay
const hamburger = document.querySelector('.hamburger');
const sidebar = document.querySelector('.sidebar');
const closeBtn = document.querySelector('.close-btn');
const overlay = document.querySelector('.overlay');
const authBtn = document.getElementById('auth-btn');

function toggleSidebar() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

hamburger.addEventListener('click', toggleSidebar);
closeBtn.addEventListener('click', toggleSidebar);
overlay.addEventListener('click', toggleSidebar);
authBtn.addEventListener('click', logout);

// Sets the minimum selectable date for an input field with id 'date' to today's date
document.getElementById('date').setAttribute('min', new Date().toISOString().split('T')[0]);

// List of doctors
const doctors = [
    { name: 'Dr.Leyman', speciality: 'Anxiety' },
    { name: 'Dr.Abhishek', speciality: 'Depression' },
    { name: 'Dr.Lorvel', speciality: 'Anxiety & Depression' }
];
let chosenDoctor = null;

// Show Doctor List
function showDoctors(doctorList) {
    const listDiv = document.getElementById('doctor-list');
    // Clear any existing content in the div to refresh the list
    listDiv.innerHTML = '';
    // Loop through each doctor in the provided list
    doctorList.forEach(doctor => {
        const card = document.createElement('div');
        // Assign a CSS class to style the doctor cards
        card.className = 'doctor-card';
        // Concatenating the name and specialty properties
        card.textContent = `${doctor.name} - ${doctor.speciality}`;
        // Add a click event to allow selection of a doctor
        card.onclick = () => {
            chosenDoctor = doctor;
            document.querySelectorAll('.doctor-card').forEach(el => el.classList.remove('selected'));
            card.classList.add('selected');
        };
        // Append the newly created card to the main list container
        listDiv.appendChild(card);
    });
}

// Filter Doctor by Search
document.getElementById('search').oninput = function() {
    const searchTerm = this.value.toLowerCase(); // Converts search term to lowercase for case-insensitive search
    // Checking if the doctor's name includes the search term
    const filteredDoctors = doctors.filter(doctor => doctor.name.toLowerCase().includes(searchTerm));
    showDoctors(filteredDoctors);
};

// Switch appointment type
function selectType(type) {
    document.getElementById('online').classList.remove('selected');
    document.getElementById('physical').classList.remove('selected');
    document.getElementById(type).classList.add('selected');
    document.getElementById('location-section').style.display = type === 'physical' ? 'block' : 'none';
}

// Book Appointment
function bookAppointment() {
    const type = document.querySelector('.appointment-type .selected').id;
    const location = type === 'physical' ? document.getElementById('location').value : 'Online';
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const today = new Date().toISOString().split('T')[0];

    // Check email format
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
        alert('Please enter a valid email.');
        return;
    }

    // Check all fields
    if (!chosenDoctor || !date || !time || !name || !email) {
        alert('Please fill all fields and choose a doctor.');
        return;
    }

    // Check for future date
    if (date < today) {
        alert('Please pick a future date.');
        return;
    }

    // Save appointment
    const appointment = { doctor: chosenDoctor.name, speciality: chosenDoctor.speciality, type, location, date, time, name, email };
    const history = JSON.parse(localStorage.getItem('appointmentHistory')) || [];
    history.push(appointment);
    localStorage.setItem('appointmentHistory', JSON.stringify(history));

    // Show confirmation
    document.getElementById('confirmation').style.display = 'block';
    document.getElementById('confirmation').innerHTML = `
        <h2>Appointment Confirmed</h2>
        <p>
            Doctor: ${appointment.doctor} (${appointment.speciality})<br>
            Type: ${appointment.type}, Location: ${appointment.location}<br>
            Date: ${appointment.date}, Time: ${appointment.time}<br>
            Name: ${appointment.name}, Email: ${appointment.email}<br>
            <strong>Email confirmation sent to ${email}.</strong>
        </p>
        <button class="cancel-btn" onclick="cancelAppointment()">Cancel Appointment</button>
    `;

    showHistory();
}

// Cancel last appointment
function cancelAppointment() {
    const history = JSON.parse(localStorage.getItem('appointmentHistory')) || [];
    if (history.length > 0) {
        history.pop();
        localStorage.setItem('appointmentHistory', JSON.stringify(history));
        document.getElementById('confirmation').style.display = 'none';
        showHistory();
        alert('Appointment cancelled!');
    }
}

// Show Appointment History
function showHistory() {
    const history = JSON.parse(localStorage.getItem('appointmentHistory')) || [];
    const historyDiv = document.getElementById('history');
    if (history.length === 0) {
        historyDiv.innerHTML = '<h2>Appointment History</h2><p>No appointments booked yet.</p>';
        return;
    }
    historyDiv.innerHTML = '<h2>Appointment History</h2><ul>' +
        history.reverse().map(h => `<li>${h.date}, ${h.time} with ${h.doctor} (${h.type})</li>`).join('') + '</ul>';
}

// Showing available doctors and history
showDoctors(doctors);
showHistory();