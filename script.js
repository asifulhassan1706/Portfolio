// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

// Update theme toggle icon
function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link Highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple form validation
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Simulate form submission (replace with actual form handling)
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// File Upload Handling for Projects
const projectUpload = document.getElementById('projectUpload');
const uploadArea = document.getElementById('uploadArea');

// Drag and drop functionality
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--primary-color)';
    uploadArea.style.background = 'var(--bg-secondary)';
});

uploadArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--border-color)';
    uploadArea.style.background = 'transparent';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--border-color)';
    uploadArea.style.background = 'transparent';
    
    const files = e.dataTransfer.files;
    handleFileUpload(files, 'project');
});

projectUpload.addEventListener('change', (e) => {
    handleFileUpload(e.target.files, 'project');
});

// Document Upload Handling
const documentUpload = document.getElementById('documentUpload');
const documentUploadArea = document.getElementById('documentUploadArea');

documentUpload.addEventListener('change', (e) => {
    handleFileUpload(e.target.files, 'document');
});

// File Upload Handler
function handleFileUpload(files, type) {
    if (files.length === 0) return;
    
    Array.from(files).forEach(file => {
        // Validate file type
        const allowedTypes = type === 'project' 
            ? ['application/pdf', 'image/jpeg', 'image/png', 'application/zip']
            : ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        
        if (!allowedTypes.includes(file.type)) {
            alert(`File type ${file.type} is not allowed for ${type} uploads.`);
            return;
        }
        
        // Simulate file upload (replace with actual upload logic)
        console.log(`Uploading ${type} file:`, file.name);
        
        // Create a visual representation of the uploaded file
        if (type === 'project') {
            createProjectCard(file);
        } else {
            createDocumentCard(file);
        }
    });
}

// Create Project Card from Uploaded File
function createProjectCard(file) {
    const projectsGrid = document.querySelector('.projects-grid');
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    
    projectCard.innerHTML = `
        <div class="project-image">
            <i class="fas fa-file"></i>
        </div>
        <div class="project-content">
            <h3>${file.name}</h3>
            <p>Uploaded project file</p>
            <div class="project-tags">
                <span class="project-tag">Uploaded</span>
                <span class="project-tag">${file.type.split('/')[1].toUpperCase()}</span>
            </div>
        </div>
    `;
    
    // Insert before the upload area
    const uploadCard = document.querySelector('.project-upload');
    projectsGrid.insertBefore(projectCard, uploadCard);
    
    // Add animation
    projectCard.style.opacity = '0';
    projectCard.style.transform = 'translateY(20px)';
    setTimeout(() => {
        projectCard.style.transition = 'all 0.3s ease';
        projectCard.style.opacity = '1';
        projectCard.style.transform = 'translateY(0)';
    }, 100);
}

// Create Document Card from Uploaded File
function createDocumentCard(file) {
    const documentsGrid = document.querySelector('.documents-grid');
    const documentCard = document.createElement('div');
    documentCard.className = 'document-card';
    
    documentCard.innerHTML = `
        <div class="document-icon">
            <i class="fas fa-file-pdf"></i>
        </div>
        <div class="document-info">
            <h3>${file.name}</h3>
            <p>Uploaded document</p>
            <a href="#" class="btn btn-primary" onclick="downloadFile('${file.name}')">
                <i class="fas fa-download"></i> Download
            </a>
        </div>
    `;
    
    // Insert before the upload area
    const uploadCard = document.querySelector('.document-upload');
    documentsGrid.insertBefore(documentCard, uploadCard);
    
    // Add animation
    documentCard.style.opacity = '0';
    documentCard.style.transform = 'translateY(20px)';
    setTimeout(() => {
        documentCard.style.transition = 'all 0.3s ease';
        documentCard.style.opacity = '1';
        documentCard.style.transform = 'translateY(0)';
    }, 100);
}

// Download File Function (placeholder)
function downloadFile(filename) {
    // This would typically trigger a download from your server
    console.log(`Downloading file: ${filename}`);
    alert(`Download functionality for ${filename} would be implemented here.`);
}

// Intersection Observer for Animations
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
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.certificate-card, .project-card, .document-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        if (body.getAttribute('data-theme') === 'dark') {
            navbar.style.background = 'rgba(17, 24, 39, 0.98)';
        }
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        if (body.getAttribute('data-theme') === 'dark') {
            navbar.style.background = 'rgba(17, 24, 39, 0.95)';
        }
    }
});

// Certificate Badge Click Handler
document.querySelectorAll('.cert-verify').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // This would typically open the certificate verification page
        alert('Certificate verification would open in a new window.');
    });
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 80);
});