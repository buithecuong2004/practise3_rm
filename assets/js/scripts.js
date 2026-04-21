$(document).ready(function() {
    console.log("Vin Nexus Center script loaded!");

    const $sidebar = $('#sidebar');
    const $overlay = $('#overlay');
    const $openBtn = $('#openSidebar');
    const $closeBtn = $('#closeSidebar');

    // Open Sidebar
    $openBtn.on('click', function() {
        $sidebar.addClass('l-sidebar--active');
        $overlay.addClass('c-overlay--active');
        $('body').css('overflow', 'hidden'); // Prevent scroll
    });

    // Close Sidebar
    function closeSidebar() {
        $sidebar.removeClass('l-sidebar--active');
        $overlay.removeClass('c-overlay--active');
        $('body').css('overflow', 'auto');
    }

    $closeBtn.on('click', closeSidebar);
    $overlay.on('click', closeSidebar);

    // Smooth scroll for nav links (optional)
    $('.l-header__link, .l-sidebar__link').on('click', function() {
        if ($sidebar.hasClass('l-sidebar--active')) {
            closeSidebar();
        }
    });

    // Scroll effect for header
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $('.l-header').addClass('l-header--scrolled');
        } else {
            $('.l-header').removeClass('l-header--scrolled');
        }
    });
});
