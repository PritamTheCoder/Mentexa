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

        // Slick Carousel Initialization
        $(document).ready(function(){
            $('.quote-slider').slick({
                arrows: true,
                autoplay: true,
                autoplaySpeed: 4000,
                adaptiveHeight: true
            });
        });

        // Sidebar Toggle Logic
        document.addEventListener('DOMContentLoaded', function() {
            const hamburger = document.querySelector('.hamburger');
            const sidebar = document.querySelector('.sidebar');
            const closeBtn = document.querySelector('.close-btn');
            const overlay = document.querySelector('.overlay'); // Select the overlay

            // Function to open the sidebar
            hamburger.addEventListener('click', function() {
                sidebar.classList.add('active');
                overlay.classList.add('active'); // Show the overlay
            });

            // Function to close the sidebar
            closeBtn.addEventListener('click', function() {
                sidebar.classList.remove('active');
                overlay.classList.remove('active'); // Hide the overlay
            });

            // Close sidebar when clicking on the overlay
            overlay.addEventListener('click', function() {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            });

            // Optional: Close sidebar when clicking on a link inside it
            const sidebarLinks = document.querySelectorAll('.sidebar .nav-links a');
            sidebarLinks.forEach(link => {
                link.addEventListener('click', function() {
                    sidebar.classList.remove('active');
                    overlay.classList.remove('active');
                });
            });
        });
