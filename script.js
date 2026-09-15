// Initialize AOS (Animate On Scroll)
AOS.init({
    once: true, // whether animation should happen only once - while scrolling down
    offset: 100, // offset (in px) from the original trigger point
});

// Sticky Navigation
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Theme Toggle (Dark/Light Mode)
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

// Check for saved user preference, if any, on load of the website
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'light') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
const navItems = document.querySelectorAll('.nav-links li a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Typing Animation Effect
const textElement = document.querySelector('.typing-text');
const words = ["Computer Science Undergraduate", "Full Stack Developer", "Flutter Developer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        textElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // Faster when deleting
    } else {
        textElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }
    
    // Check if word is complete
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before starting new word
    }
    
    setTimeout(typeEffect, typeSpeed);
}

// Start typing effect on load
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeEffect, 1000);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Fetch Live GitHub Profile Stats
async function loadGitHubStats() {
    try {
        const userRes = await fetch('https://api.github.com/users/FatimaCh-11');
        if (userRes.ok) {
            const userData = await userRes.json();
            const reposEl = document.getElementById('gh-repos');
            const followersEl = document.getElementById('gh-followers');
            const followingEl = document.getElementById('gh-following');
            if (reposEl && userData.public_repos !== undefined) reposEl.textContent = userData.public_repos;
            if (followersEl && userData.followers !== undefined) followersEl.textContent = userData.followers;
            if (followingEl && userData.following !== undefined) followingEl.textContent = userData.following;
        }
    } catch (e) {
        // Fallback gracefully without breaking UI
        console.log('GitHub API offline or rate-limited; displaying default profile metrics.');
    }
}
loadGitHubStats();
