document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    body.setAttribute('data-theme', 'dark'); // Always dark

    // === MOBILE NAVIGATION TOGGLE ===
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger?.addEventListener('click', () => {
        navMenu?.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu?.classList.remove('active');
            hamburger?.classList.remove('active');
        });
    });

    // === SMOOTH SCROLLING ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    // === ACTIVE NAVIGATION LINK HIGHLIGHTING ===
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

    // === CONTACT FORM HANDLING ===
    const contactForm = document.getElementById('contactForm');
    contactForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });

    // === FILE UPLOAD HANDLING (PROJECT & DOCUMENT) ===
    const projectUpload = document.getElementById('projectUpload');
    const uploadArea = document.getElementById('uploadArea');

    function handleFileUpload(files, type) {
        if (files.length === 0) return;
        
        Array.from(files).forEach(file => {
            const allowedTypes = type === 'project' 
                ? ['application/pdf', 'image/jpeg', 'image/png', 'application/zip']
                : ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            
            if (!allowedTypes.includes(file.type)) {
                alert(`File type ${file.type} is not allowed for ${type} uploads.`);
                return;
            }
            
            console.log(`Uploading ${type} file:`, file.name);
            if (type === 'project') createProjectCard(file);
            else createDocumentCard(file);
        });
    }

    uploadArea?.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--primary-color)';
        uploadArea.style.background = 'var(--bg-secondary)';
    });

    uploadArea?.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--border-color)';
        uploadArea.style.background = 'transparent';
    });

    uploadArea?.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--border-color)';
        uploadArea.style.background = 'transparent';
        handleFileUpload(e.dataTransfer.files, 'project');
    });

    projectUpload?.addEventListener('change', (e) => {
        handleFileUpload(e.target.files, 'project');
    });

    const documentUpload = document.getElementById('documentUpload');
    documentUpload?.addEventListener('change', (e) => {
        handleFileUpload(e.target.files, 'document');
    });

    function createProjectCard(file) {
        const projectsGrid = document.querySelector('.projects-grid');
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        projectCard.innerHTML = `
            <div class="project-image"><i class="fas fa-file"></i></div>
            <div class="project-content">
                <h3>${file.name}</h3>
                <p>Uploaded project file</p>
                <div class="project-tags">
                    <span class="project-tag">Uploaded</span>
                    <span class="project-tag">${file.type.split('/')[1].toUpperCase()}</span>
                </div>
            </div>
        `;
        
        const uploadCard = document.querySelector('.project-upload');
        projectsGrid.insertBefore(projectCard, uploadCard);
        
        projectCard.style.opacity = '0';
        projectCard.style.transform = 'translateY(20px)';
        setTimeout(() => {
            projectCard.style.transition = 'all 0.3s ease';
            projectCard.style.opacity = '1';
            projectCard.style.transform = 'translateY(0)';
        }, 100);
    }

    function createDocumentCard(file) {
        const documentsGrid = document.querySelector('.documents-grid');
        const documentCard = document.createElement('div');
        documentCard.className = 'document-card';
        
        documentCard.innerHTML = `
            <div class="document-icon"><i class="fas fa-file-pdf"></i></div>
            <div class="document-info">
                <h3>${file.name}</h3>
                <p>Uploaded document</p>
                <a href="#" class="btn btn-primary" onclick="downloadFile('${file.name}')">
                    <i class="fas fa-download"></i> Download
                </a>
            </div>
        `;
        
        const uploadCard = document.querySelector('.document-upload');
        documentsGrid.insertBefore(documentCard, uploadCard);
        
        documentCard.style.opacity = '0';
        documentCard.style.transform = 'translateY(20px)';
        setTimeout(() => {
            documentCard.style.transition = 'all 0.3s ease';
            documentCard.style.opacity = '1';
            documentCard.style.transform = 'translateY(0)';
        }, 100);
    }

    window.downloadFile = function(filename) {
        console.log(`Downloading file: ${filename}`);
        alert(`Download functionality for ${filename} would be implemented here.`);
    }

    // === INTERSECTION OBSERVER ANIMATION ===
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.certificate-card, .project-card, .document-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // === NAVBAR BACKGROUND ON SCROLL ===
    const navbar = document.querySelector('.navbar');
    function updateNavbarBackground() {
        if (!navbar) return;
        navbar.style.background = window.scrollY > 50
            ? 'rgba(17, 24, 39, 0.98)'   // Dark mode color
            : 'rgba(17, 24, 39, 0.95)';
    }
    window.addEventListener('scroll', updateNavbarBackground);
    updateNavbarBackground();

    // === CERTIFICATE BADGE CLICK HANDLER ===
    document.querySelectorAll('.cert-verify').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Certificate verification would open in a new window.');
        });
    });

    // === HERO TITLE TYPING EFFECT ===
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
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
});