const menu = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");

menu.addEventListener("click", () => {
    navbar.classList.toggle("active");
});

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let index = 0;

function showSlide(i){

    slides.forEach(slide=>slide.classList.remove("active"));
    dots.forEach(dot=>dot.classList.remove("active"));

    slides[i].classList.add("active");
    dots[i].classList.add("active");
}

function nextSlide(){

    index++;

    if(index >= slides.length)
        index = 0;

    showSlide(index);
}

function prevSlide(){

    index--;

    if(index < 0)
        index = slides.length - 1;

    showSlide(index);
}

document.querySelector(".next").onclick = nextSlide;
document.querySelector(".prev").onclick = prevSlide;

dots.forEach((dot,i)=>{

    dot.onclick=()=>{

        index=i;
        showSlide(index);

    }

});

setInterval(nextSlide,7000);