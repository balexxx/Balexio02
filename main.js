/**
 * BALEX Website - Main JavaScript
 */

// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page loader
    initLoader();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize navbar functionality
    initNavbar();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize video sound functionality
    initVideoSound();
});

/**
 * Page loader functionality
 */
function initLoader() {
    // Create loader element if it doesn't exist
    if (!document.querySelector('.loader')) {
        const loader = document.createElement('div');
        loader.className = 'loader';
        loader.innerHTML = `
            <div class="loader-content">
                <img src="Content/logo123.png" alt="Loading..." class="loader-logo">
            </div>
        `;
        document.body.appendChild(loader);
    }
    
    // Hide loader after page load
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader');
        
        // Add fade-out class
        setTimeout(() => {
            loader.classList.add('fade-out');
            document.body.classList.add('page-transition');
        }, 500);
        
        // Remove loader after animation
        setTimeout(() => {
            if (loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
        }, 1100);
    });
}

/**
 * Scroll animations for page elements
 */
function initScrollAnimations() {
    // Animation elements
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    // Animation observer
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Observe each element
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add some delay for initial animations if not coming from another page
    if (!document.referrer.includes(window.location.hostname)) {
        document.querySelectorAll('.hero-text h1, .hero-text p').forEach((el, i) => {
            el.style.animationDelay = `${i * 0.2 + 0.5}s`;
        });
    }
    
    // Add parallax effect to header logo
    window.addEventListener('scroll', function() {
        const scrollValue = window.scrollY;
        const logo = document.getElementById('logo');
        
        if (logo && scrollValue < 500) {
            logo.style.transform = `translateY(${scrollValue * 0.05}px)`;
        }
    });
}

/**
 * Navigation bar functionality
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    // Add scrolled class to navbar when scrolling
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Highlight current page in navigation
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentLocation.endsWith(linkPath) || 
            (currentLocation
