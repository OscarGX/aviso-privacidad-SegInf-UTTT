window.onload = () => {
    const nav = document.querySelector('nav');
    const hamburger = document.querySelector('.btn-dropdown');
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('nav-toggle');
    });

};