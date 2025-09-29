// Cursor follower effect
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorFollower.style.opacity = '0.5';
});

function animateFollower() {
    const dx = mouseX - followerX;
    const dy = mouseY - followerY;
    
    followerX += dx * 0.1;
    followerY += dy * 0.1;
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateFollower);
}
animateFollower();

// Hide scroll indicator on scroll
const scrollIndicator = document.getElementById('scrollIndicator');
let scrollTimeout;

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollIndicator.classList.add('hidden');
    } else {
        scrollIndicator.classList.remove('hidden');
    }
});

// Scroll indicator click
scrollIndicator.addEventListener('click', () => {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
});

// Animated counter for stats
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString() + '+';
        }
    };
    updateCounter();
};

// Intersection Observer for stats animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach((stat, index) => {
                setTimeout(() => {
                    animateCounter(stat);
                }, index * 200);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsContainer = document.querySelector('.stats-container');
if (statsContainer) {
    observer.observe(statsContainer);
}

// Add hover effect to clickable elements
const interactiveElements = document.querySelectorAll('a, button, .skill-tag, .project-card, .timeline-item');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursorFollower.style.transform = 'scale(1.5)';
        cursorFollower.style.borderColor = '#00b8ff';
    });
    element.addEventListener('mouseleave', () => {
        cursorFollower.style.transform = 'scale(1)';
        cursorFollower.style.borderColor = '#00ff9d';
    });
});

// Fade in animations on scroll
const fadeElements = document.querySelectorAll('.section');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    fadeObserver.observe(element);
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.textContent = '☰';
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 100;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Skill item click interaction
// Hexagon skill item click interaction
const hexagonItems = document.querySelectorAll('.hexagon-item');
hexagonItems.forEach(item => {
    item.addEventListener('click', function() {
        // Remove active from all others
        hexagonItems.forEach(h => h.classList.remove('active'));
        // Add active to clicked item
        this.classList.add('active');
        
        // Remove active after 3 seconds
        setTimeout(() => {
            this.classList.remove('active');
        }, 3000);
    });
});