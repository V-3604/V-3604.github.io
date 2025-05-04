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

// Dynamic background effect
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    // Subtle parallax effect on background gradients
    document.body.style.backgroundPosition = `${x * 10}% ${y * 10}%`;
    
    // Create subtle glow around cursor
    const cursorGlow = document.querySelector('.cursor-glow') || createCursorGlow();
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
    cursorGlow.style.opacity = '1';
    
    // Clear previous timeout if exists
    if (window.cursorTimeout) clearTimeout(window.cursorTimeout);
    
    // Set timeout to fade out glow effect when mouse stops moving
    window.cursorTimeout = setTimeout(() => {
        cursorGlow.style.opacity = '0';
    }, 1500);
});

function createCursorGlow() {
    const glow = document.createElement('div');
    glow.classList.add('cursor-glow');
    glow.style.cssText = `
        position: fixed;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(157, 78, 221, 0.2) 0%, rgba(16, 0, 43, 0) 70%);
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: opacity 0.5s ease;
    `;
    document.body.appendChild(glow);
    return glow;
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Animations with more fluid timing
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px'
});

// Add hero section background
document.addEventListener('DOMContentLoaded', () => {
    // Create dynamic hero background
    const hero = document.querySelector('.hero');
    if (!document.querySelector('.hero-bg')) {
        const heroBg = document.createElement('div');
        heroBg.classList.add('hero-bg');
        hero.prepend(heroBg);
    }
    
    // Floating particles background for visual interest
    createParticles();
    
    // Apply animation to sections with different timing
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.classList.add('hidden');
        section.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(section);
    });

    // Add animation to skills with staggered timing
    const skills = document.querySelectorAll('.skill-category');
    skills.forEach((skill, index) => {
        skill.classList.add('hidden');
        skill.style.transitionDelay = `${0.15 + (index * 0.08)}s`;
        observer.observe(skill);
    });

    // Add animation to project cards with staggered timing
    const projects = document.querySelectorAll('.project-card');
    projects.forEach((project, index) => {
        project.classList.add('hidden');
        project.style.transitionDelay = `${0.2 + (index * 0.1)}s`;
        observer.observe(project);
    });

    // Update copyright year
    const currentYear = new Date().getFullYear();
    document.querySelector('.footer p').textContent = `© ${currentYear} Varshith Gowda K. All rights reserved.`;
});

// Create particles for visual interest
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.classList.add('particles-container');
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: -2;
        pointer-events: none;
    `;
    document.body.appendChild(particlesContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 5 + 1;
        const speed = Math.random() * 2 + 1;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background-color: rgba(157, 78, 221, ${Math.random() * 0.3});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${speed + 5}s ease-in-out infinite;
            animation-delay: -${Math.random() * 10}s;
            opacity: ${Math.random() * 0.8};
            filter: blur(${Math.random() * 2}px);
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add the animation to the stylesheet
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-25px) translateX(15px); }
            50% { transform: translateY(-35px) translateX(-15px); }
            75% { transform: translateY(-15px) translateX(25px); }
            100% { transform: translateY(0) translateX(0); }
        }
    `;
    document.head.appendChild(style);
}

// Smooth scrolling for navigation links with easing
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

// Add scroll animations to CSS with more fluid transitions
const style = document.createElement('style');
style.textContent = `
    .hidden {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 1s cubic-bezier(0.165, 0.84, 0.44, 1), 
                    transform 1s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    
    .show {
        opacity: 1;
        transform: translateY(0);
    }
    
    .cursor-glow {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    /* Projects hover effect */
    .project-card {
        transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1),
                    box-shadow 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    
    /* Skill hover effect */
    .skill-category {
        transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1),
                   background-color 0.5s cubic-bezier(0.165, 0.84, 0.44, 1),
                   border 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    
    /* Cool focus effect for buttons */
    .btn:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(157, 78, 221, 0.5);
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