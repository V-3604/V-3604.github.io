// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Scroll Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

// Add 'hidden' class to sections for initial state
document.addEventListener('DOMContentLoaded', () => {
    // Apply animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });

    // Add animation to skills
    const skills = document.querySelectorAll('.skill-category');
    skills.forEach((skill, index) => {
        skill.style.animationDelay = `${index * 0.1}s`;
        observer.observe(skill);
    });

    // Add animation to project cards
    const projects = document.querySelectorAll('.project-card');
    projects.forEach((project, index) => {
        project.style.animationDelay = `${index * 0.1}s`;
        observer.observe(project);
    });

    // Update copyright year
    const currentYear = new Date().getFullYear();
    document.querySelector('.footer p').textContent = `© ${currentYear} Varshith Gowda K. All rights reserved.`;
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll animations to CSS
const style = document.createElement('style');
style.textContent = `
    .hidden {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .show {
        opacity: 1;
        transform: translateY(0);
    }
    
    .skill-category, .project-card {
        opacity: 0;
        transform: translateY(20px);
        animation-fill-mode: forwards;
    }
    
    .skill-category.show, .project-card.show {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        0% {
            opacity: 0;
            transform: translateY(20px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Type effect for hero section
function typeEffect(element, text, speed = 50, delay = 1000) {
    setTimeout(() => {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.append(text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }, delay);
}

// Optional: Implement typing effect on hero section
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero h2');
    
    // Clear and re-add text with typing effect
    const titleText = heroTitle.textContent;
    const subtitleText = heroSubtitle.textContent;
    
    heroTitle.textContent = '';
    heroSubtitle.textContent = '';
    
    typeEffect(heroTitle, titleText, 100, 300);
    typeEffect(heroSubtitle, subtitleText, 50, 2000);
}); 