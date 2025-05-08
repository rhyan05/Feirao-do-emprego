// Smooth Scrolling
$("#navbar a, .btn").on("click", function (event) {
    if (this.hash !== "") {
        event.preventDefault();

        const hash = this.hash;

        $("html, body").animate(
            {
                scrollTop: $(hash).offset().top - 100
            },
            800
        );
    }
});

window.addEventListener("scroll", function() {
    const navbar = document.querySelector("#navbar > .navbar");
    if (window.scrollY > 150) {
        navbar.style.opacity = 0.9;
    } else {
        navbar.style.opacity = 1;
    }
});


