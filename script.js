const sliderTabs = document.querySelectorAll(".slider-tab");
const sliderIndicator = document.querySelector(".slider-indicator");


// Update the indicator height and width
const updatePagination = (tab, index) => {
    sliderIndicator.style.transform = `translateX(${tab.offsetLeft - 20}px)`;
    sliderIndicator.style.width = `${tab.getBoundingClientRect().width}px`;
}

// Initialize swiper instance
const swiper = new Swiper(".slider-container", {
    effect: "slide",
    speed: 1300,
    autoplay: { delay: 4000 }
});

// Update the slide on and pagination on tab click
sliderTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        swiper.slideTo(index);
        updatePagination(tab, index);
    });
});

updatePagination(sliderTabs[0], 0);