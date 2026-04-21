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

    // Info Slider Logic
    const slides = [
        {
            text1: "Tôi sợ đánh giá sai, mỗi nơi một kết quả khác nhau.",
            text2: "Con còn nhỏ quá, tôi không biết đâu là thời điểm phù hợp để can thiệp."
        },
        {
            text1: "Tôi không biết liệu con có thể hòa nhập được với các bạn hay không.",
            text2: "Mỗi ngày đến trường của con đều là một cuộc chiến với cảm xúc của cả nhà."
        },
        {
            text1: "Tôi lo lắng rằng không ai thực sự hiểu con mình như tôi hiểu.",
            text2: "Chúng tôi đã thử nhiều nơi nhưng vẫn chưa tìm được đúng hướng đi cho con."
        }
    ];

    let currentIndex = 0;
    let isAnimating = false;

    const $sliderContent = $('#infoSliderContent');
    const $dots = $('.c-info-slider__dot');
    const $leftBtn = $('#btnSlideLeft');
    const $rightBtn = $('#btnSlideRight');

    function updateDots(index) {
        $dots.removeClass('c-info-slider__dot--active');
        $dots.eq(index).addClass('c-info-slider__dot--active');
    }

    function buildSlideHTML(slide) {
        return `
            <div class="c-info-slider__slide c-info-slider__slide--1">
                <img src="./assets/images/semicolon111.png" alt="semicolon" class="c-info-slider__semicolon">
                <p class="c-info-slider__text-1">${slide.text1}</p>
            </div>
            <div class="c-info-slider__slide c-info-slider__slide--2">
                <img src="./assets/images/semicolon222.png" alt="semicolon" class="c-info-slider__semicolon c-info-slider__semicolon--2">
                <p class="c-info-slider__text-2">${slide.text2}</p>
            </div>`;
    }

    function goToSlide(newIndex, direction) {
        if (isAnimating || newIndex === currentIndex) return;
        isAnimating = true;

        const exitClass  = direction === 'right' ? 'slide-exit-left'  : 'slide-exit-right';
        const enterClass = direction === 'right' ? 'slide-enter-right' : 'slide-enter-left';

        const $oldSlide = $sliderContent.children();
        $oldSlide.addClass(exitClass);

        const $newSlide = $(buildSlideHTML(slides[newIndex])).addClass(enterClass);
        $sliderContent.append($newSlide);

        updateDots(newIndex);

        setTimeout(() => {
            $oldSlide.remove();
            $newSlide.removeClass(enterClass);
            currentIndex = newIndex;
            isAnimating = false;
        }, 450); // Matches the CSS animation duration
    }

    $rightBtn.on('click', function() {
        const nextIndex = (currentIndex + 1) % slides.length;
        goToSlide(nextIndex, 'right');
    });

    $leftBtn.on('click', function() {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(prevIndex, 'left');
    });

    $dots.on('click', function() {
        const targetIndex = $(this).data('index');
        if (targetIndex > currentIndex) {
            goToSlide(targetIndex, 'right');
        } else if (targetIndex < currentIndex) {
            goToSlide(targetIndex, 'left');
        }
    });

});
