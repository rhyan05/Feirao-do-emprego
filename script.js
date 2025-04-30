const sliderTabs = document.querySelectorAll(".slider-tab");
const sliderIndicator = document.querySelector(".slider-indicator");
const sliderControls = document.querySelector(".slider-controls");


// Update the indicator height and width
const updateIndicator = (tab, index) => {
    sliderIndicator.style.transform = `translateX(${tab.offsetLeft - 20}px)`;
    sliderIndicator.style.width = `${tab.getBoundingClientRect().width}px`;

    // Calculate the scroll position and scroll smoothly
    const scrollLeft = sliderTabs[index].offsetLeft - sliderControls.offsetWidth / 2 + sliderTabs[index].offsetWidth / 2;
    sliderControls.scrollTo({ left: scrollLeft, behavior: "smooth"});
}

// Initialize swiper instance
const swiper = new Swiper(".slider-container", {
    effect: "slide",
    speed: 1300,
    autoplay: { delay: 4000 },
    navigation: {
        prevEl: "#slide-prev",
        nextEl: "#slide-next",
    },
    on: {
        // Update indicator on slide change
        slideChange: () => {
            const currentTabIndex = [...sliderTabs].indexOf(sliderTabs[swiper.activeIndex]);
            updateIndicator(sliderTabs[swiper.activeIndex], currentTabIndex);
        }
    },
    reachEnd: () => swiper.autoplay.stop()
});

// Update the slide on and pagination on tab click
sliderTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        swiper.slideTo(index);
        updateIndicator(tab, index);
    });
});

updateIndicator(sliderTabs[0], 0);
window.addEventListener("resize", () => updatePagination(sliderTabs[swiper.activeIndex], 0));

// scroll
    let lastScrollTop = 0;
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Rolando para baixo
            navbar.classList.add("hide");
        } else {
            // Rolando para cima
            navbar.classList.remove("hide");
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
