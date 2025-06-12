// Set login for testing (to be removed in production)
localStorage.setItem('isLoggedIn','true');

// Redirect if not logged in
if (localStorage.setItem('isLoggedIn') !== 'true' ) {
alert('Please login first. Redirecting to login page...');
window.location.href = 'login.html'; // link for login page
}

// Sets the minimum selectable date for an input field with id 'date' to today's date
document.getElementById('date').setAttribute('min', new Date().toISOString().split('T')[0]); 
// .toISOString() gives Date & time format, .split('T')[0] splits time and date and only gives date format "YYYY-MM-DD"

// List of doctors
const doctors = [
    {name : 'Dr.Leyman', speciality : 'Anxiety'},
    {name : 'Dr.Abhishek', speciality : 'Depression'}
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
    
}