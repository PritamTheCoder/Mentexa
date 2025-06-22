// toggle sidebar visibility
function toggleSidebar(){
    const sidebar = document.querySelector('.sidebar');
    const Overlay = document.querySelector('.Overlay');
    sidebar.classList.toggle('active');
    Overlay.classList.toggle('Overlay');
}

// get test type from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const testType = urlParams.get('test'); // 'test' parameter

// load questions based on URL parameter
function loadQuestions(){
    if(!testType || (testType !== 'gad7' && testType !== 'phq9')){
        alert("Invalid test type. Redirecting to home....");
        window.location.href = 'home.html';
        return ;
    }

    // fetch API for loading questions
fetch('questions.JSON')
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
})

.then(data => {
    const questions = data[testType];
    if(!questions){
        throw new Error('Questions not found for test type ' + testType);
    }
    let html ='';
    questions.forEach((q,index) => {
        html +=`
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
        console.error('Error loading questions: ' + error);
        alert('Failed to load questions. Please try again later or check your connection.');
        window.location.href = 'home.html';
    });
}
