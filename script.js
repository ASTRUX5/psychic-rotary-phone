
document.addEventListener('DOMContentLoaded', () => {
    
    // -----------------------------------------------------------
    // 1. Intersection Observer for Fade In Animations
    // -----------------------------------------------------------
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // -----------------------------------------------------------
    // 2. Magnetic Buttons Effect
    // -----------------------------------------------------------
    const magneticButtons = document.querySelectorAll('.magnetic');

    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const position = btn.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;

            // Dampening factor (lower = less movement)
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // -----------------------------------------------------------
    // 3. Before & After Image Comparison Slider
    // -----------------------------------------------------------
    function initComparisons() {
        const container = document.querySelector('.img-comp-container');
        const overlayImg = document.querySelector('.img-comp-overlay');
        const handle = document.querySelector('.comp-slider-handle');
        
        let active = false;

        // Events
        handle.addEventListener('mousedown', slideReady);
        window.addEventListener('mouseup', slideFinish);
        container.addEventListener('mousemove', slideMove);
        
        // Touch events
        handle.addEventListener('touchstart', slideReady);
        window.addEventListener('touchend', slideFinish);
        container.addEventListener('touchmove', slideMove);

        function slideReady(e) {
            e.preventDefault();
            active = true;
        }

        function slideFinish() {
            active = false;
        }

        function slideMove(e) {
            if (!active) return;
            
            let pos = getCursorPos(e);
            
            // Prevent sliding out of bounds
            if (pos < 0) pos = 0;
            if (pos > container.offsetWidth) pos = container.offsetWidth;
            
            slide(pos);
        }

        function getCursorPos(e) {
            const a = container.getBoundingClientRect();
            let x = 0;
            
            // Check for touch or mouse
            if(e.changedTouches) {
                 x = e.changedTouches[0].pageX - a.left;
            } else {
                 x = e.pageX - a.left;
            }
            
            x = x - window.scrollX;
            return x;
        }

        function slide(x) {
            // Resize image
            overlayImg.style.width = x + "px";
            // Move handle
            handle.style.left = x + "px"; // Centered via CSS transform
        }
    }

    // Initialize comparison if element exists
    if(document.querySelector('.img-comp-container')) {
        initComparisons();
    }

    // -----------------------------------------------------------
    // 4. Smooth Scroll for Anchor Links (Backup for CSS)
    // -----------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement){
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
