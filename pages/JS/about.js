 // JS scroll animation
const fadeInElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver( entries =>{
    entries.forEach(entry =>{
        if (entry.isIntersecting){
            entry.target.classList.add('show');
        }
    });
},{ threshold: 0.1});
fadeInElements.forEach(el => observer.observe(el));