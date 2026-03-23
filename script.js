let lightbox = document.getElementById("lightbox");
let lightboxImg = document.getElementById("lightbox-img");
let downloadBtn = document.getElementById("downloadBtn");

let images = document.querySelectorAll(".card img");
let currentIndex = 0;
let autoSlideInterval;
let whatsappBtn = document.getElementById("whatsappBtn");

// Open
function openImage(img) {
    lightbox.style.display = "flex";
    currentIndex = Array.from(images).indexOf(img);
    updateImage();

    startAutoSlide();
}

// Close
function closeImage() {
    lightbox.style.display = "none";
    stopAutoSlide();
}

// Update
function updateImage() {
    let imgSrc = images[currentIndex].src;

    lightboxImg.src = imgSrc;
    downloadBtn.href = imgSrc;

    // ✅ WhatsApp share 
    whatsappBtn.href = `https://wa.me/?text=Check this photo: ${imgSrc}`;
}

// Next
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
}

// Prev
function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
}

// Auto Slide
function startAutoSlide() {
    autoSlideInterval = setInterval(nextImage, 3000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}

// Zoom
lightboxImg.addEventListener("click", () => {
    lightboxImg.classList.toggle("zoomed");
});

// Swipe (mobile)
let startX = 0;

lightbox.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});

lightbox.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;

    if (startX > endX + 50) nextImage();
    if (startX < endX - 50) prevImage();
});

// Keyboard
document.addEventListener("keydown", e => {
    if (lightbox.style.display === "flex") {
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "Escape") closeImage();
    }
});

// Click outside close
lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeImage();
});

// Active section highlight on scroll
let sections = document.querySelectorAll("h2.section-title");
let navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        let sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});


// Navbar background change on scroll
let navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});