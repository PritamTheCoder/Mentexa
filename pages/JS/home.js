
    const emojis = document.querySelectorAll('.emoji');
    const moodText = document.getElementById('moodText');

    emojis.forEach(emoji => {
      emoji.addEventListener('click', () => {
        emojis.forEach(e => e.classList.remove('selected'));
        emoji.classList.add('selected');
        const mood = emoji.getAttribute('data-mood');
        moodText.innerHTML = `You are feeling: <span>${mood}</span>`;
      });
    });
$(document).ready(function(){

  $('.quote-slider').slick({
    
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    adaptiveHeight: true
  });
});


  
