// Problem Setting Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initPlatformFilter();
});

function initPlatformFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const problemItems = document.querySelectorAll('.problem-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.getAttribute('data-platform');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter problems
            filterProblems(platform, problemItems);
        });
    });
}

function filterProblems(platform, problemItems) {
    problemItems.forEach(item => {
        const itemPlatform = item.getAttribute('data-platform');
        
        if (platform === 'all' || itemPlatform === platform) {
            item.classList.remove('hidden');
            item.style.display = 'block';
        } else {
            item.classList.add('hidden');
            setTimeout(() => {
                if (item.classList.contains('hidden')) {
                    item.style.display = 'none';
                }
            }, 300);
        }
    });
    
    // Update problem count
    updateProblemCount(platform, problemItems);
}

function updateProblemCount(platform, problemItems) {
    let visibleCount = 0;
    
    problemItems.forEach(item => {
        const itemPlatform = item.getAttribute('data-platform');
        if (platform === 'all' || itemPlatform === platform) {
            visibleCount++;
        }
    });
    
    // You can add a counter display here if needed
    console.log(`Showing ${visibleCount} problems for platform: ${platform}`);
}

// Add smooth scroll animation for problem cards
function addScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    const problemCards = document.querySelectorAll('.problem-card');
    problemCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    const contestCards = document.querySelectorAll('.contest-card');
    contestCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize scroll animations
addScrollAnimations();
