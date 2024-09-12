document.addEventListener('DOMContentLoaded', () => {
    const menuLinks = document.querySelectorAll('.menu ul li a');

    menuLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            menuLinks.forEach(link => link.parentElement.classList.remove('active'));
            link.parentElement.classList.add('active');
            window.location.href = link.href;
        });
    });

    const currentUrl = window.location.href.split('/').pop();
    menuLinks.forEach(link => {
        const linkUrl = link.href.split('/').pop();
        if (linkUrl === currentUrl) {
            link.parentElement.classList.add('active');
        }
    });
});
