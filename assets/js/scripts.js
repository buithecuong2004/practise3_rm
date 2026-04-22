$(document).ready(function () {
    console.log("Vin Nexus Center script loaded!");

    const $sidebar = $('#sidebar');
    const $overlay = $('#overlay');
    const $openBtn = $('#openSidebar');
    const $closeBtn = $('#closeSidebar');

    // Open Sidebar
    $openBtn.on('click', function () {
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
    $('.l-header__link, .l-sidebar__link').on('click', function () {
        if ($sidebar.hasClass('l-sidebar--active')) {
            closeSidebar();
        }
    });

    // Scroll effect for header
    $(window).on('scroll', function () {
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
            text2: "Mỗi ngày đến trường của con đều khiến chúng tôi lo lắng."
        },
        {
            text1: "Tôi lo lắng rằng không ai thực sự hiểu con mình như tôi hiểu.",
            text2: "Chúng tôi đã dạy con nhưng vẫn không cải thiện được điểm số"
        }
    ];

    let currentIndex = 0;
    let isAnimating = false;

    const $sliderContent = $('#infoSliderContent');
    const $dots = $('.c-info-slider__dot');
    const $leftBtn = $('#btnSlideLeft');
    const $rightBtn = $('#btnSlideRight');
    const $sliderContainer = $('.c-info-slider');

    let autoSlideInterval;

    // function startAutoSlide() {
    //     autoSlideInterval = setInterval(() => {
    //         const nextIndex = (currentIndex + 1) % slides.length;
    //         goToSlide(nextIndex, 'right');
    //     }, 5000); // 5 seconds
    // }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        // startAutoSlide();
    }

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

        const exitClass = direction === 'right' ? 'slide-exit-left' : 'slide-exit-right';
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

    $rightBtn.on('click', function () {
        const nextIndex = (currentIndex + 1) % slides.length;
        goToSlide(nextIndex, 'right');
        resetAutoSlide();
    });

    $leftBtn.on('click', function () {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(prevIndex, 'left');
        resetAutoSlide();
    });

    $dots.on('click', function () {
        const targetIndex = $(this).data('index');
        if (targetIndex > currentIndex) {
            goToSlide(targetIndex, 'right');
        } else if (targetIndex < currentIndex) {
            goToSlide(targetIndex, 'left');
        }
        resetAutoSlide();
    });

    // ── Touch swipe (mobile) ───────────────────────────────────
    let touchStartX = 0;
    let touchStartY = 0;

    $sliderContent.on('touchstart', function (e) {
        touchStartX = e.originalEvent.touches[0].clientX;
        touchStartY = e.originalEvent.touches[0].clientY;
    });

    $sliderContent.on('touchend', function (e) {
        const dx = touchStartX - e.originalEvent.changedTouches[0].clientX;
        const dy = touchStartY - e.originalEvent.changedTouches[0].clientY;

        // Bỏ qua nếu vuốt dọc nhiều hơn ngang (tránh conflict khi scroll trang)
        if (Math.abs(dx) < Math.abs(dy)) return;
        // Ngưỡng tối thiểu 50px
        if (Math.abs(dx) < 50) return;

        if (dx > 0) {
            // Vuốt sang trái → slide tiếp theo
            const nextIndex = (currentIndex + 1) % slides.length;
            goToSlide(nextIndex, 'right');
        } else {
            // Vuốt sang phải → slide trước
            const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
            goToSlide(prevIndex, 'left');
        }
        resetAutoSlide();
    });

    // Start auto-slide on load
    // startAutoSlide();

    // Pause on hover
    $sliderContainer.on('mouseenter', () => clearInterval(autoSlideInterval));
    // ── About Section Logic ──────────────────────────────────
    const aboutData = [
        {
            img: "./assets/images/img_card_1.jpg",
            title: "HỢP TÁC CHUYÊN MÔN SÂU RỘNG VỚI CÁC TỔ CHỨC HÀNG ĐẦU THẾ GIỚI",
            text: "Nhằm đảm bảo đáp ứng các tiêu chuẩn quốc tế hàng đầu trong mọi hoạt động, Vin Nexus Center hợp tác chiến lược với The New England Center for Children (NECC) – một trong những tổ chức hàng đầu thế giới về giáo dục và can thiệp tự kỷ. Thông qua quan hệ đối tác này, chúng tôi áp dụng các phương pháp can thiệp dựa trên bằng chứng khoa học, chuẩn hóa quy trình đánh giá và xây dựng chương trình phù hợp với từng học sinh. Bên cạnh đó, đội ngũ chuyên gia quốc tế thường xuyên tham gia tập huấn, giám sát và cố vấn chuyên môn tại chỗ để đảm bảo chất lượng dịch vụ luôn đạt chuẩn toàn cầu."
        },
        {
            img: "./assets/images/img_card_2.jpg",
            title: "CHƯƠNG TRÌNH CÁ NHÂN HÓA VÀ LỘ TRÌNH PHÁT TRIỂN XUYÊN SUỐT",
            text: "Mỗi học sinh đều được xây dựng Kế hoạch học tập cá nhân (IEP) riêng biệt, dựa trên kết quả đánh giá chuyên sâu ban đầu và được cập nhật định kỳ theo sự tiến bộ thực tế của từng em. Lộ trình can thiệp không chỉ bao gồm các mục tiêu học thuật mà còn tích hợp phát triển ngôn ngữ, kỹ năng xã hội, kỹ năng tự phục vụ và điều hòa cảm xúc. Phụ huynh được đồng hành xuyên suốt trong toàn bộ quá trình, từ lập kế hoạch đến triển khai và đánh giá hiệu quả can thiệp."
        },
        {
            img: "./assets/images/img_card_3.jpg",
            title: "ĐỘI NGŨ CHUYÊN MÔN CHUẨN HÓA QUỐC TẾ",
            text: "Vin Nexus Center được dẫn dắt bởi đội ngũ nhân sự có bằng cấp uy tín và am hiểu sâu về các rối loạn phát triển, bao gồm các chuyên gia hành vi được chứng nhận quốc tế (BCBA), nhà tâm lý học lâm sàng, chuyên gia ngôn ngữ trị liệu, vật lý trị liệu và hoạt động trị liệu. Tất cả nhân sự đều trải qua quá trình đào tạo bài bản, giám sát thường xuyên và tham gia phát triển chuyên môn liên tục theo tiêu chuẩn quốc tế."
        },
        {
            img: "./assets/images/img_card_4.jpg",
            title: "ỨNG DỤNG CÔNG NGHỆ TIÊN TIẾN",
            text: "Vin Nexus Center đang hợp tác với NECC để tiên phong trong việc tích hợp ACE (Autism Curriculum Encyclopedia) – bộ chương trình giảng dạy kỹ thuật số toàn diện dành riêng cho trẻ tự kỷ. Hệ thống công nghệ bao gồm phần mềm theo dõi tiến độ theo thời gian thực, công cụ hỗ trợ giao tiếp tăng cường (AAC), ứng dụng học tập tương tác và nền tảng báo cáo minh bạch dành cho phụ huynh, giúp tối ưu hóa hiệu quả can thiệp và tăng cường kết nối giữa gia đình và nhà trường."
        }
    ];

    let currentAboutIdx = 0;
    const $aboutCards = $('#aboutCards');
    const $aboutExpanded = $('#aboutExpanded');
    const $expandedImg = $('#expandedImg');
    const $expandedTitle = $('#expandedTitle');
    const $expandedText = $('#expandedText');

    function updateExpandedView(index) {
        const data = aboutData[index];
        $expandedImg.attr('src', data.img);
        $expandedTitle.text(data.title);
        $expandedText.text(data.text);
        currentAboutIdx = index;
    }

    $('.js-expand-card').on('click', function () {
        const index = $(this).closest('.c-about__card').data('index');
        updateExpandedView(index);
        $aboutCards.addClass('is-hidden');
        $aboutExpanded.addClass('is-visible');
        
        // Scroll to the expanded section
        $('html, body').animate({
            scrollTop: $(".c-about").offset().top - 100
        }, 500);
    });

    $('.js-collapse-card').on('click', function () {
        $aboutExpanded.removeClass('is-visible');
        $aboutCards.removeClass('is-hidden');
    });

    $('.c-about__expanded-nav--next').on('click', function () {
        currentAboutIdx = (currentAboutIdx + 1) % aboutData.length;
        updateExpandedView(currentAboutIdx);
    });

    $('.c-about__expanded-nav--prev').on('click', function () {
        currentAboutIdx = (currentAboutIdx - 1 + aboutData.length) % aboutData.length;
        updateExpandedView(currentAboutIdx);
    });

    // ── Gallery Slider Logic ────────────────────────────────
    let galleryIdx = 0;
    const $galleryImages = $('#gallerySlider img');
    const totalGallery = $galleryImages.length;

    function updateGallery() {
        $galleryImages.each(function () {
            const $img = $(this);
            const idx = $img.data('idx');
            
            // Calculate relative position
            let pos = (idx - galleryIdx + totalGallery) % totalGallery;
            
            $img.removeClass('main side-prev-1 side-prev-2 side-next-1 side-next-2 hidden');
            
            if (pos === 0) $img.addClass('main');
            else if (pos === 1) $img.addClass('side-next-1');
            else if (pos === 2) $img.addClass('side-next-2');
            else if (pos === totalGallery - 1) $img.addClass('side-prev-1');
            else if (pos === totalGallery - 2) $img.addClass('side-prev-2');
            else $img.addClass('hidden');
        });
    }

    $('#galleryNext').on('click', function () {
        galleryIdx = (galleryIdx + 1) % totalGallery;
        updateGallery();
    });

    $('#galleryPrev').on('click', function () {
        galleryIdx = (galleryIdx - 1 + totalGallery) % totalGallery;
        updateGallery();
    });

    // Add click event to each image to make it the main one
    $galleryImages.on('click', function() {
        const clickedIdx = $(this).data('idx');
        if (clickedIdx !== galleryIdx) {
            galleryIdx = clickedIdx;
            updateGallery();
        }
    });

    // Initial gallery setup
    updateGallery();
});