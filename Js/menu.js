document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.navbar-links');
    const navbar = document.querySelector('.navbar');

    // Função para fechar o menu com animação
    window.closeMenu = function () {
        if (!navLinks.classList.contains('active')) return;

        navLinks.classList.remove('active');
        navLinks.classList.add('closing');
        document.body.style.overflow = 'auto';

        setTimeout(() => {
            navLinks.classList.remove('closing');
            navLinks.style.display = 'none';
        }, 300); // tempo da animação
    };

    // aTIVA o botão hamburguer
    toggleButton.addEventListener('click', function (e) {
        e.stopPropagation();
        const isOpening = !navLinks.classList.contains('active');

        if (isOpening) {
            navLinks.style.display = 'flex';
            requestAnimationFrame(() => {
                navLinks.classList.add('active');
                navLinks.classList.remove('closing');
            });
            document.body.style.overflow = 'hidden';
            navbar.classList.remove('hide');
        } else {
            closeMenu();
        }
    });

    // Fecha o menu ao clicar fora
    document.addEventListener('click', function (e) {
        if (
            navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !toggleButton.contains(e.target)
        ) {
            closeMenu();
        }
    });

    document.addEventListener('touchstart', function (e) {
        if (
            navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !toggleButton.contains(e.target)
        ) {
            closeMenu();
        }
    });
});
