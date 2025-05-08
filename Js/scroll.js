document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.navbar-links');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // Fecha o menu se estiver aberto (com animação)
        if (navLinks.classList.contains('active')) {
            if (typeof window.closeMenu === 'function') {
                window.closeMenu();
            }
        }

        // Lógica de esconder/mostrar a navbar
        if (currentScroll > lastScrollTop && currentScroll > navbar.offsetHeight) {
            navbar.classList.add('hide');
        } else {
            navbar.classList.remove('hide');
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
});
