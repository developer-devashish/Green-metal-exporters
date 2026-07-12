/* =====================================
            MOBILE MENU
===================================== */

const menu = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");

menu.addEventListener("click", () => {
    navbar.classList.toggle("active");
    menu.classList.toggle("active"); // Animate hamburger
});

/* Close menu after clicking any link */
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("active");
        menu.classList.remove("active"); // Reset hamburger
    });
});


/* =====================================
            HERO SLIDER
===================================== */

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let slideIndex = 0;

function showSlide(i){

    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[i].classList.add("active");
    dots[i].classList.add("active");

}

function nextSlide(){

    slideIndex++;

    if(slideIndex >= slides.length){

        slideIndex = 0;

    }

    showSlide(slideIndex);

}

function prevSlide(){

    slideIndex--;

    if(slideIndex < 0){

        slideIndex = slides.length - 1;

    }

    showSlide(slideIndex);

}

/* Hero Buttons */

const heroPrev = document.querySelector(".prev");
const heroNext = document.querySelector(".next");

if(heroPrev){

    heroPrev.onclick = prevSlide;

}

if(heroNext){

    heroNext.onclick = nextSlide;

}

/* Hero Dots */

dots.forEach((dot,i)=>{

    dot.onclick=()=>{

        slideIndex=i;

        showSlide(slideIndex);

    }

});

/* Auto Slider */

setInterval(nextSlide,7000);

/* =====================================
        PRODUCT GALLERY POPUP
===================================== */

const modal = document.getElementById("productModal");
const closeBtn = document.querySelector(".close-btn");

const mainImage = document.getElementById("mainImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");

const thumbs = document.querySelectorAll(".thumb");
const detailButtons = document.querySelectorAll(".details-btn");

const modalPrev = document.querySelector(".modal-prev");
const modalNext = document.querySelector(".modal-next");

let images = [];
let currentImage = 0;


/* =====================================
        OPEN POPUP
===================================== */

detailButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Open Modal
        modal.classList.add("active");
        document.body.classList.add("modal-open");

        // Product Title
        modalTitle.textContent = button.dataset.title;

        // Load Hidden HTML Description
        const descriptionBox = document.getElementById(button.dataset.description);

        if (descriptionBox) {
            modalDescription.innerHTML = descriptionBox.innerHTML;
        } else {
            modalDescription.innerHTML = "<p>Description not available.</p>";
        }

        // Load Images
        images = button.dataset.images
            .split(",")
            .map(img => img.trim());

        currentImage = 0;

        updateGallery();

    });

});


/* =====================================
        UPDATE GALLERY
===================================== */

function updateGallery() {

    mainImage.src = images[currentImage];

    thumbs.forEach((thumb, index) => {

        if (images[index]) {

            thumb.src = images[index];
            thumb.style.display = "block";

            thumb.classList.remove("active-thumb");

            if (index === currentImage) {

                thumb.classList.add("active-thumb");

            }

        } else {

            thumb.style.display = "none";

        }

    });

}


/* =====================================
        THUMBNAILS
===================================== */

thumbs.forEach((thumb, index) => {

    thumb.addEventListener("click", () => {

        currentImage = index;

        updateGallery();

    });

});


/* =====================================
        NEXT IMAGE
===================================== */

if (modalNext) {

    modalNext.addEventListener("click", () => {

        currentImage++;

        if (currentImage >= images.length) {

            currentImage = 0;

        }

        updateGallery();

    });

}


/* =====================================
        PREVIOUS IMAGE
===================================== */

if (modalPrev) {

    modalPrev.addEventListener("click", () => {

        currentImage--;

        if (currentImage < 0) {

            currentImage = images.length - 1;

        }

        updateGallery();

    });

}


/* =====================================
            CLOSE MODAL
===================================== */

function closeModal() {

    modal.classList.remove("active");
    document.body.classList.remove("modal-open");

}

closeBtn.addEventListener("click", closeModal);


/* =====================================
        CLICK OUTSIDE
===================================== */

window.addEventListener("click", (e) => {

    if (e.target === modal) {

        closeModal();

    }

});


/* =====================================
        ESC KEY
===================================== */

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        closeModal();

    }

});


/* =====================================
    ARROW KEY NAVIGATION
===================================== */

document.addEventListener("keydown", (e) => {

    if (!modal.classList.contains("active")) return;

    if (e.key === "ArrowRight") {

        currentImage++;

        if (currentImage >= images.length) {

            currentImage = 0;

        }

        updateGallery();

    }

    if (e.key === "ArrowLeft") {

        currentImage--;

        if (currentImage < 0) {

            currentImage = images.length - 1;

        }

        updateGallery();

    }

});