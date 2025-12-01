// Data for portfolio, gallery and video items
const portfolioData = [
    {
        id: 1,
        title: "Cerdas Cermat",
        category: "website",
        image: "assets/web1.png",
        description: "Sebuah Aplikasi Lomba Cerdas Cermat Olimpiade Akuntansi Vokasi (OAV) 2024 berbasis website"
    },
    {
        id: 2,
        title: "Dexagon App",
        category: "website",
        image: "assets/web2.png",
        description: "Aplikasi Olimpiade Akuntansi Vokasi (OAV) 2024 berbasis website"
    },
    {
        id: 3,
        title: "SSC SMASA Web App",
        category: "website",
        image: "assets/web3.png",
        description: "Sebuah Aplikasoi Science School Competition 2024 SMA Negeri 1 Jember"
    },
    {
        id: 4,
        title: "Silulus Mif",
        category: "both",
        image: "assets/Silulus Mif8.jpg",
        description: "Sistem Prediksi Kelulusan Mahasiswa yang berbasis Website dan Aplikasi Mobile"
    },
    {
        id: 5,
        title: "Kenaikan Pangkat Kepegawaian",
        category: "website",
        image: "assets/web6.png",
        description: "Aplikasi Kenaikan Pangkat Kepegawaian yang berbasis website dan diusung oleh JTI Innovation"
    },
    {
        id: 6,
        title: "Dikantin Polije",
        category: "both",
        image: "assets/webmobile1.png",
        description: "Aplikasi yang berbasis website dan mobile dan dapat digunakan untuk memesan makanan di kantin Polije"
    },
    {
        id: 7,
        title: "CDC Polije",
        category: "both",
        image: "assets/webmobile2.png",
        description: "Sebuah Aplikasi yang digunakan untuk mencari sebuah lowongan pekerjaan bagi mahasiswa Polije"
    },
    {
        id: 8,
        title: "Dikasiri Polije",
        category: "both",
        image: "assets/webmobile3.png",
        description: "Aplikasi Kasir Tefa Backery Polije yang berbasis website dan mobile"
    }
];

const galleryData = [
    {
        src: "assets/galeri1.jpg",
        title: "Simulasi S-LEARN"
    },
    {
        src: "assets/galeri2.png",
        title: "Pelatihan Offline"
    },
    {
        src: "assets/galeri3.png",
        title: "Weekly Meet"
    },
    {
        src: "assets/galeri4.png",
        title: "Workshop Teknologi"
    },
    {
        src: "assets/galeri5.jpg",
        title: "Diskusi Kelompok"
    },
    {
        src: "assets/galeri6.jpg",
        title: "Diskusi Kelompok"
    }
];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
    setupPortfolioFilter();
    initializeGallery();
    setupEventListeners();
    setupSmoothScrolling();
    setupNavbarScroll();
    updateActiveNavLink();
});

// === NORMALISASI KATEGORI ======================================
function normalizeCategory(category) {
    const cat = category.toLowerCase();

    if (cat.includes("website") && cat.includes("mobile")) return "both";
    if (cat.includes("website")) return "website";
    if (cat.includes("mobile")) return "mobile";

    return category;
}

// === LABEL KATEGORI ============================================
function getCategoryLabel(category) {
    switch (category) {
        case "website": return "Website";
        case "mobile": return "Mobile App";
        case "both": return "Website & Mobile";
        default: return category;
    }
}

// === PORTFOLIO INITIALIZER =====================================
function initializePortfolio() {
    const portfolioGrid = document.querySelector(".portfolio-grid");
    portfolioGrid.innerHTML = "";

    portfolioData.forEach(item => {
        const normalized = normalizeCategory(item.category);

        const col = document.createElement("div");
        col.className = `col-md-6 col-lg-4 portfolio-item ${normalized}`;

        col.innerHTML = `
        <div class="h-100 rounded shadow-sm overflow-hidden position-relative portfolio-click"
         data-bs-toggle="modal"
         data-bs-target="#imageModal"
         data-image="${item.image}">

        <img src="${item.image}" alt="${item.title}" class="img-fluid">
        
        <div class="portfolio-overlay">
            <h5 class="fw-bold">${item.title}</h5>
            <p class="mb-0">${item.description}</p>
        </div>

        <span class="portfolio-category">${getCategoryLabel(item.category)}</span>
    </div>
`;

        portfolioGrid.appendChild(col);
    });
}

// === FILTER FUNCTION ============================================
function filterPortfolio(filter) {
    const items = document.querySelectorAll(".portfolio-item");

    items.forEach(item => {
        if (filter === "all" || item.classList.contains(filter)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

// === FILTER BUTTON EVENTS ======================================
function setupPortfolioFilter() {
    const buttons = document.querySelectorAll(".portfolio-filter .btn");

    buttons.forEach(btn => {
        btn.addEventListener("click", function () {
            buttons.forEach(b => b.classList.remove("active"));
            this.classList.add("active");

            const filterValue = this.getAttribute("data-filter");
            filterPortfolio(filterValue);
        });
    });
}

document.addEventListener("click", function(e) {
    if (e.target.closest(".portfolio-click")) {
        const card = e.target.closest(".portfolio-click");
        const imgSrc = card.getAttribute("data-image");

        document.getElementById("modalImage").src = imgSrc;
    }
});


// ===== GALLERY FUNCTIONS - CAROUSEL 3 GAMBAR =====
function initializeGallery() {
    initializeGalleryCarousel();
    initializeGalleryGrid();
}

function initializeGalleryCarousel() {
    const galleryCarousel = document.querySelector('#galleryCarousel .carousel-inner');
    const galleryIndicators = document.querySelector('#galleryCarousel .carousel-indicators');

    if (!galleryCarousel || !galleryIndicators) return;

    // Group gallery data into chunks of 3 for carousel
    const carouselItems = [];
    for (let i = 0; i < galleryData.length; i += 3) {
        carouselItems.push(galleryData.slice(i, i + 3));
    }

    // Create carousel items with 3 images each
    galleryCarousel.innerHTML = carouselItems.map((itemGroup, groupIndex) => `
        <div class="carousel-item ${groupIndex === 0 ? 'active' : ''}">
            <div class="carousel-item-row">
                ${itemGroup.map((item, index) => `
                    <div class="carousel-image-container" 
                         data-bs-toggle="modal" 
                         data-bs-target="#imageModal"
                         data-image-src="${item.src}" 
                         data-image-title="${item.title}">
                        <img src="${item.src}" alt="${item.title}" class="img-fluid" loading="lazy">
                        <div class="carousel-image-overlay">
                            <h6 class="carousel-image-title">${item.title}</h6>
                        </div>
                    </div>
                `).join('')}
                
                <!-- Fill remaining slots if less than 3 images -->
                ${Array(3 - itemGroup.length).fill().map((_, index) => `
                    <div class="carousel-image-container" style="visibility: hidden;">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f8f9fa'/%3E%3C/svg%3E" 
                             alt="Placeholder" class="img-fluid">
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');

    // Create carousel indicators
    galleryIndicators.innerHTML = carouselItems.map((_, index) => `
        <button type="button" 
                data-bs-target="#galleryCarousel" 
                data-bs-slide-to="${index}"
                class="${index === 0 ? 'active' : ''}" 
                aria-label="Slide ${index + 1}">
        </button>
    `).join('');

    // Add click event to carousel images
    setTimeout(() => {
        const carouselImages = document.querySelectorAll('.carousel-image-container');
        carouselImages.forEach(container => {
            if (container.style.visibility !== 'hidden') {
                container.addEventListener('click', function() {
                    const imageSrc = this.getAttribute('data-image-src');
                    const imageTitle = this.getAttribute('data-image-title');
                    
                    if (imageSrc && imageTitle) {
                        const modalImage = document.getElementById('modalImage');
                        const modalImageTitle = document.getElementById('modalImageTitle');
                        
                        if (modalImage && modalImageTitle) {
                            modalImage.src = imageSrc;
                            modalImage.alt = imageTitle;
                            modalImageTitle.textContent = imageTitle;
                        }
                    }
                });
            }
        });
    }, 100);
}

function initializeGalleryGrid() {
    if (!DOM.galleryGrid) return;

    DOM.galleryGrid.innerHTML = galleryData.map(item => `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="gallery-item shadow-sm rounded overflow-hidden" 
                 data-bs-toggle="modal" 
                 data-bs-target="#imageModal"
                 data-image-src="${item.src}" 
                 data-image-title="${item.title}">
                <img src="${item.src}" alt="${item.title}" class="img-fluid" loading="lazy">
                <div class="gallery-overlay">
                    <h6 class="mb-0 fw-semibold">${item.title}</h6>
                    <small class="text-light">Klik untuk memperbesar</small>
                </div>
            </div>
        </div>
    `).join('');
}

// Setup event listeners
function setupEventListeners() {
    // Portfolio filter
    const filterButtons = document.querySelectorAll('.portfolio-filter .btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            filterPortfolio(filterValue);
        });
    });
    
    // Image modal
    const imageModal = document.getElementById('imageModal');
    imageModal.addEventListener('show.bs.modal', function(event) {
        const button = event.relatedTarget;
        const imageSrc = button.getAttribute('data-image-src');
        const imageTitle = button.getAttribute('data-image-title');
        
        const modalImage = document.getElementById('modalImage');
        const modalImageTitle = document.getElementById('modalImageTitle');
        
        modalImage.src = imageSrc;
        modalImage.alt = imageTitle;
        modalImageTitle.textContent = imageTitle;
    });
    
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (name && email && subject && message) {
            // In a real application, you would send this data to a server
            alert('Terima kasih! Pesan Anda telah berhasil dikirim.');
            contactForm.reset();
        } else {
            alert('Harap lengkapi semua field sebelum mengirim pesan.');
        }
    });
}

// Filter portfolio items
function filterPortfolio(filter) {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        if (filter === 'all' || item.classList.contains(filter)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile navbar if open
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
                
                // Scroll to target
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar background on scroll
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Add scroll effect to navbar
const style = document.createElement('style');
style.textContent = `
    .navbar-scrolled {
        background-color: rgba(44, 62, 80, 0.95) !important;
        backdrop-filter: blur(10px);
        transition: background-color 0.3s ease;
    }
`;
document.head.appendChild(style);