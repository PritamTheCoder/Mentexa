// Set login for testing (to be removed in production)
localStorage.setItem('isLoggedIn','true');

// Redirect if not logged in
if (localStorage.getItem('isLoggedIn') !== 'true' ) {
alert('Please login first. Redirecting to login page...');
window.location.href = 'login.html'; // link for login page
}

// Sets the minimum selectable date for an input field with id 'date' to today's date
document.getElementById('date').setAttribute('min', new Date().toISOString().split('T')[0]); 
// .toISOString() gives Date & time format, .split('T')[0] splits time and date and only gives date format "YYYY-MM-DD"

// List of doctors
const doctors = [
    {name : 'Dr.Leyman', speciality : 'Anxiety'},
    {name : 'Dr.Abhishek', speciality : 'Depression'},
    {name : 'Dr.Lorvel', speciality : 'Anxiety & Depression'}
];
let chosenDoctor = null;

// Show Doctor List
function showDoctors(doctorList){
    const ListDiv = document.getElementById('doctor-list');
    // Clear any existing content in the div to refresh the list
    ListDiv.innerHTML = '';
    // Loop through each doctor in the provided list
    doctorList.forEach(doctor => {
        const card = document.createElement('div');
        // Assign a CSS class to style the doctor cards
        card.className = 'doctor-card';
         // concatenating the name and specialty properties
        card.textContent = doctor.name + " - " + doctor.speciality;
         // Add a click event to allow selection of a doctor
        card.onclick = () => {
            chosenDoctor = doctor;
            document.querySelectorAll('.doctor-card').forEach(el => el.classList.remove('selected'));
            card.classList.add('selected');
        };
         // Append the newly created card to the main list container
        ListDiv.appendChild(card);
    });
}

// Filter Doctor by Search
document.getElementById('search').oninput = function(){ //executes function on input
    const searchTerm = this.value.toLowerCase(); // Converts search term to lowercase for case-insensitive search
    // checking if the doctor's name includes the search term
    const filteredDoctors = doctors.filter(doctor => doctor.name.toLocaleLowerCase().includes(searchTerm));
    showDoctors(filteredDoctors);
}

// Switch appointment type
    function selectType(type) {
      document.getElementById('online').classList.remove('selected');
      document.getElementById('physical').classList.remove('selected');
      document.getElementById(type).classList.add('selected');
      document.getElementById('location-section').style.display = type === 'physical' ? 'block' : 'none';
    }

// Book Appointment 
function bookAppointment(){
    const type = document.querySelector('.appointment-type .selected').id;
    const location = type === 'physical' ? document.getElementById('location').value : 'Online';
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const today = new Date().toISOString().split('T')[0];

// check email format
if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)){ //format for email
    alert('Please enter a valid email.');
    return;
}

// Check all fields
if(!chosenDoctor || !date || !time || !name || !email ){
    alert('Please fill all fields and choose a doctor.');
    return ;
}

// Check for future date
if (date < today){
    alert('Please pick a future date.');
    return;
}

// save appointment
const appointment = { doctor: chosenDoctor.name, speciality: chosenDoctor.speciality, type, location, date, time, name, email };
const history = JSON.parse(localStorage.getItem('appointmentHistory')) || []; // Retrieve existing appointment history or initialize an empty array
history.push(appointment); // add new appointment to history
localStorage.setItem('appointmentHistory', JSON.stringify(history)); // Save updated history to localStorage

// show confirmation
document.getElementById('confirmation').style.display = 'block';
// `` backticks to reduce need for + " " + and to add variables with ${}
document.getElementById('confirmation').innerHTML = `   
    <h2> Appointment Confirmed</h2>
    <p>
      Doctor: ${appointment.doctor} (${appointment.speciality})<br>
      Type: ${appointment.type}, Location: ${appointment.location}<br>
      Date: ${appointment.date}, Time: ${appointment.time}<br>
      Name: ${appointment.name}, Email: ${appointment.email}<br>
      <strong> Email confirmation sent to ${email}.</strong>
      </p>
      <button class="cancel-btn" onclick="cancelAppointment()"> Cancel Appointment</button> 
      `;

      showHistory();
}

// Cancel last appointment
    function cancelAppointment(){
        const history = JSON.parse(localStorage.getItem('appointmentHistory')) || [];
        if(history.length > 0){
            // Remove the most recent appointment
            history.pop();
            // Update localStorage with modified history
            localStorage.setItem('appointmentHistory', JSON.stringify(history));
            document.getElementById('confirmation').style.display = 'none'; // Hide the confirmation display
            showHistory();
            alert('Appointment Cancled!');
        }
    }

  // show Appointment History
  function showHistory(){
    // Retrieve stored appointment history or initialize an empty array
    const history = JSON.parse(localStorage.getItem('appointmentHistory')) || [];
    const historyDiv = document.getElementById('history');
    if (history.length === 0){ // if !appointment
        historyDiv.innerHTML = '<h2>Appointment History</h2><p>No appointments booked yet.</p>';
        return;
    } 
    // Display appointment history as a list
    historyDiv.innerHTML = '<h2>Appointment History</h2><ul>' +
    history.reverse().map(h => `<li>${h.date}, ${h.time} with ${h.doctor} (${h.type})</li>` ).join('') + '</ul>';
  }  
  
// showing available doctors and history 
showDoctors(doctors);
showHistory();  