// Competitive Programming Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Force proper tab initialization
    initBootstrapTabs();
    initScrollAnimations();
    initTableHoverEffects();
    initCardAnimations();
});

// Initialize Bootstrap tabs with proper event handling
function initBootstrapTabs() {
    // Force hide all tabs except active on page load
    const allTabs = document.querySelectorAll('.tab-pane');
    const activeTab = document.querySelector('.tab-pane.active');
    
    // Hide all tabs first
    allTabs.forEach(tab => {
        tab.style.display = 'none';
        tab.classList.remove('show', 'active');
    });
    
    // Show only the first tab (contests) by default
    const contestsTab = document.querySelector('#contests');
    if (contestsTab) {
        contestsTab.style.display = 'block';
        contestsTab.classList.add('show', 'active');
    }
    
    // Ensure the first tab button is active
    const contestsTabButton = document.querySelector('#contests-tab');
    if (contestsTabButton) {
        contestsTabButton.classList.add('active');
        contestsTabButton.setAttribute('aria-selected', 'true');
    }
    
    // Remove active from other tab buttons
    const profilesTabButton = document.querySelector('#profiles-tab');
    if (profilesTabButton) {
        profilesTabButton.classList.remove('active');
        profilesTabButton.setAttribute('aria-selected', 'false');
    }
    
    // Add click event listeners to tab buttons
    const tabButtons = document.querySelectorAll('[data-bs-toggle="pill"]');
    tabButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Get target tab
            const targetId = this.getAttribute('data-bs-target');
            const targetTab = document.querySelector(targetId);
            
            if (targetTab) {
                // Hide all tabs
                allTabs.forEach(tab => {
                    tab.style.display = 'none';
                    tab.classList.remove('show', 'active');
                });
                
                // Remove active from all tab buttons
                tabButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });
                
                // Show target tab
                targetTab.style.display = 'block';
                targetTab.classList.add('show', 'active');
                
                // Activate clicked button
                this.classList.add('active');
                this.setAttribute('aria-selected', 'true');
            }
        });
    });
}

// Initialize scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.judge-card, .contest-table-wrapper, .achievement-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add hover effects for table rows
function initTableHoverEffects() {
    const tableRows = document.querySelectorAll('.modern-table tbody tr');
    
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// Add click animation for judge cards
function initCardAnimations() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('.judge-link')) {
            const card = e.target.closest('.judge-card');
            if (card) {
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                }, 150);
            }
        }
    });

    // Add loading animation for cards
    const cards = document.querySelectorAll('.judge-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}
