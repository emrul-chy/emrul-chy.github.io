// Modern JavaScript for enhanced user experience

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initSmoothScrolling();
    initScrollAnimations();
});

// Navbar scroll effect
function initNavbar() {
    const navbar = document.querySelector('.modern-nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Active nav link highlighting - only for main index.html
    const currentPage = window.location.pathname;
    const isMainIndexPage = currentPage === '/' || currentPage === '/index.html' || (currentPage.endsWith('/index.html') && !currentPage.includes('/tutorials/'));
    const isTutorialsPage = currentPage.includes('tutorials');
    
    if (isMainIndexPage) {
        // Original scroll spy functionality for index page
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href && href.includes(`#${current}`)) {
                    link.classList.add('active');
                }
            });
        });
    } else if (!isTutorialsPage) {
        // For other pages (but NOT tutorials), set active nav item based on current page
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            let shouldBeActive = false;
            
            if (href) {
                // Check each page type explicitly
                if (currentPage.includes('competitive-programming-profile.html') && href.includes('competitive-programming-profile.html')) {
                    shouldBeActive = true;
                } else if (currentPage.includes('problem-setting-profile.html') && href.includes('problem-setting-profile.html')) {
                    shouldBeActive = true;
                } else if (currentPage.includes('career-background.html') && href.includes('career-background.html')) {
                    shouldBeActive = true;
                }
            }
            
            // Set or remove active class
            if (shouldBeActive) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    // For tutorials page, do nothing - let HTML handle the active class
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.skill-category, .quick-link-card, .section-header');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Enhanced button interactions
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        // Create ripple effect
        const button = e.target;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add ripple animation CSS
const rippleStyles = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;

const rippleStyleSheet = document.createElement('style');
rippleStyleSheet.textContent = rippleStyles;
document.head.appendChild(rippleStyleSheet);
