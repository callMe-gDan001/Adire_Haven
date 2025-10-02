  // Load the logo image
        function loadLogo() {
            if (window.fs && window.fs.readFile) {
                window.fs.readFile('image.png').then(function(logoData) {
                    var blob = new Blob([logoData], { type: 'image/png' });
                    var logoUrl = URL.createObjectURL(blob);
                    document.querySelector('.logo img').src = logoUrl;
                }).catch(function(error) {
                    console.error('Error loading logo:', error);
                });
            }
        }

        loadLogo();

        // Mobile menu functionality
        var menuBtn = document.getElementById('menuBtn');
        var mobileNav = document.getElementById('mobileNav');
        var menuIcon = document.getElementById('menuIcon');
        var closeIcon = document.getElementById('closeIcon');

        menuBtn.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            
            if (mobileNav.classList.contains('active')) {
                menuIcon.style.display = 'none';
                closeIcon.style.display = 'block';
            } else {
                menuIcon.style.display = 'block';
                closeIcon.style.display = 'none';
            }
        });

        // Close mobile menu when a link is clicked
        var mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                menuIcon.style.display = 'block';
                closeIcon.style.display = 'none';
            });
        });

        // Carousel functionality
        let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.carousel-dot');
        let autoPlayInterval;

        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            if (n >= slides.length) currentSlide = 0;
            if (n < 0) currentSlide = slides.length - 1;

            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function changeSlide(direction) {
            currentSlide += direction;
            showSlide(currentSlide);
            resetAutoPlay();
        }

        function goToSlide(n) {
            currentSlide = n;
            showSlide(currentSlide);
            resetAutoPlay();
        }

        function autoPlay() {
            currentSlide++;
            showSlide(currentSlide);
        }

        function resetAutoPlay() {
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(autoPlay, 5000);
        }

        // Start autoplay
        autoPlayInterval = setInterval(autoPlay, 5000);

        // Pause autoplay on hover
        document.querySelector('.carousel-container').addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });

        document.querySelector('.carousel-container').addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(autoPlay, 5000);
        });