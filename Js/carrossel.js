const sliderTabs = document.querySelectorAll(".slider-tab");
const sliderIndicator = document.querySelector(".slider-indicator");
const sliderControls = document.querySelector(".slider-controls");

// Atualiza o indicador centralizado horizontalmente na aba
const updateIndicator = (tab, index) => {
    const tabWidth = tab.getBoundingClientRect().width;
    const indicatorWidth = tabWidth; // Indicador terá o mesmo tamanho da aba
    const leftOffset = tab.offsetLeft + (tabWidth / 2) - (indicatorWidth / 2);

    sliderIndicator.style.width = `${indicatorWidth}px`;
    sliderIndicator.style.transform = `translateX(${leftOffset}px)`;

    // Centraliza o scroll horizontal
    const scrollLeft = tab.offsetLeft - sliderControls.offsetWidth / 2 + tabWidth / 2;
    sliderControls.scrollTo({ left: scrollLeft, behavior: "smooth" });
};

// Inicializa o Swiper
const swiper = new Swiper(".slider-container", {
    effect: "slide",
    speed: 1300,
    autoplay: { delay: 4000 },
    navigation: {
        prevEl: "#slide-prev",
        nextEl: "#slide-next",
    },
    on: {
        slideChange: () => {
            const currentTabIndex = swiper.activeIndex;
            updateIndicator(sliderTabs[currentTabIndex], currentTabIndex);
        }
    },
    reachEnd: () => swiper.autoplay.stop()
});

// Clicar nas abas do carrossel
sliderTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        swiper.slideTo(index);
        updateIndicator(tab, index);
    });
});

// Inicializa indicador na aba 0
updateIndicator(sliderTabs[0], 0);

// Atualiza indicador ao redimensionar a janela
window.addEventListener("resize", () => {
    updateIndicator(sliderTabs[swiper.activeIndex], swiper.activeIndex);
});

// Esconde navbar ao rolar para baixo
let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        navbar.classList.add("hide");
    } else {
        navbar.classList.remove("hide");
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}); 
