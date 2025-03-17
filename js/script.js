// const { watch } = require('browser-sync');

// const { type } = require('jquery');
document.addEventListener('DOMContentLoaded', () => {
  // HEader start
  let headerLinks = document.querySelectorAll('.menu-has-children > a');
  headerLinks.forEach(function (link) {
    let span = document.createElement('span');
    span.className = 'menu-item-plus';
    span.textContent = ' +';
    link.appendChild(span);
  });

  // MOBILE START
  const menuItem = document.querySelectorAll(
    '.mobile-menu-nav .menu-has-children'
  );
  menuItem.forEach((menuLi) => {
    menuLi.addEventListener('click', function (event) {
      event.preventDefault();
      const subMenu = menuLi.querySelector('.sub-menu');
      if (subMenu.style.display === 'block' || subMenu.style.height !== '') {
        slideUp(subMenu, 300);
        subMenu.classList.remove('is-active');
        menuLi.classList.remove('is-active');
      } else {
        slideDown(subMenu, 300);
        subMenu.classList.add('is-active');
        menuLi.classList.add('is-active');
      }
    });
  });
  //  меню
  $(document).ready(function () {
    // Открытие меню при клике на бургер
    $('.hamburger').on('click', function () {
      $('.header-mobile').addClass('is-active');
    });

    // Закрытие меню при клике на кнопку закрытия
    $('.header-mobile-close, .header-mobile-close img').on(
      'click',
      function () {
        $('.header-mobile').removeClass('is-active');
      }
    );

    // Закрытие при клике ВНЕ зоны меню
    $(document).on('click', function (e) {
      if (!$(e.target).closest('.header-mobile, .hamburger').length) {
        $('.header-mobile').removeClass('is-active');
      }
    });
  });
  // MOBILE END
  // HEader END

  //  Numbers Animation START
  function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    return elemBottom <= docViewBottom && elemTop >= docViewTop;
  }

  function countUp($element) {
    var countTo = $element.data('count');
    $({ countNum: $element.text() }).animate(
      {
        countNum: countTo,
      },
      {
        duration: 3000,
        easing: 'swing',
        step: function () {
          $element.text(Math.floor(this.countNum));
        },
        complete: function () {
          $element.text(this.countNum);
        },
      }
    );
  }

  var counted = false;
  $(window).on('scroll', function () {
    var $numScroll = $('.num-scroll');
    if ($numScroll.length && isScrolledIntoView($numScroll) && !counted) {
      $('.num-js').each(function () {
        countUp($(this));
      });
      counted = true;
    }
  });

  // Progress Script WHY  US
  var animationDone = false;

  function startProgress() {
    if (animationDone) return;

    if ($('.progress-js').length) {
      var skillsTop = $('.progress-js').offset().top - 200;
    } else {
      return; // Элемента нет
    }

    if ($(window).scrollTop() + $(window).height() >= skillsTop) {
      $('.progress-drag').each(function () {
        var $this = $(this);
        var percentNum = $this
          .closest('.progress-item')
          .find('.progress-percent')
          .data('percent');

        $({ numberValue: 0 }).animate(
          { numberValue: percentNum },
          {
            duration: 1500,
            easing: 'linear',
            step: function () {
              var roundedValue = Math.floor(this.numberValue);
              $this
                .closest('.progress-item')
                .find('.progress-percent')
                .text(roundedValue + '%');
              $this.width(roundedValue + '%');
            },
            complete: function () {
              $this
                .closest('.progress-item')
                .find('.progress-percent')
                .text(percentNum + '%');
              $this.width(percentNum + '%');
            },
          }
        );
      });

      animationDone = true;
    }
  }

  $(document).ready(function () {
    startProgress();
    $(window).on('scroll', function () {
      startProgress();
    });
  });
  // twentytwenty start
  $(window).on('load', function () {
    $('#container1').twentytwenty();
  });

  // FAQ

  // Slide Down Function START
  function slideDown(element, duration) {
    element.style.display = 'block';
    let height = element.offsetHeight;
    element.style.height = 0;
    element.style.overflow = 'hidden';

    let start = null;
    function step(timestamp) {
      if (!start) start = timestamp;
      let progress = timestamp - start;
      let currentHeight = Math.min((progress / duration) * height, height);
      element.style.height = currentHeight + 'px';
      if (progress < duration) {
        window.requestAnimationFrame(step);
      } else {
        element.style.height = '';
      }
    }
    window.requestAnimationFrame(step);
  }
  // Slide Down Function END

  // Sub Menu Slide Up Function START
  function slideUp(element, duration) {
    let height = element.offsetHeight;
    element.style.height = height + 'px';
    element.style.overflow = 'hidden';

    let start = null;
    function step(timestamp) {
      if (!start) start = timestamp;
      let progress = timestamp - start;
      let currentHeight = Math.max(height - (progress / duration) * height, 0);
      element.style.height = currentHeight + 'px';
      if (progress < duration) {
        window.requestAnimationFrame(step);
      } else {
        element.style.display = 'none';
        element.style.height = '';
      }
    }
    window.requestAnimationFrame(step);
  }
  // Sub Menu Slide Up Function END

  // FAQ ACCORDIONS START
  const faqQuestion = document.querySelectorAll('.faq-item');
  faqQuestion.forEach((button) => {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      const answer = button.querySelector('.faq-answer');
      if (answer.style.display === 'block' || answer.style.height !== '') {
        slideUp(answer, 300);
        answer.classList.remove('is-active');
        button.classList.remove('is-active');
      } else {
        slideDown(answer, 300);
        answer.classList.add('is-active');
        button.classList.add('is-active');
      }
    });
  });
  // FAQ ACCORDIONS END

  // testimonials  START

  const swiperTestimonials = new Swiper('.swiper-testimonials', {
    speed: 900,
    spaceBetween: 0,
    effect: 'cube',
    cubeEffect: {
      shadow: false,
    },
    pagination: {
      el: '.swiper-testimonials .swiper-pagination',
      clickable: true,
    },
  });
  // testimonials  END
  // testimoials v2 slider START
  const swiperTestimonialsV2 = new Swiper('.swiper-testimonials-v2', {
    speed: 1000,
    slidesPerView: 3,
    spaceBetween: 30,
    watchSlidesProgress: true,
    pagination: {
      el: '.swiper-testimonials-v2 .swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      // when window width is >= 575
      0: {
        slidesPerView: 1,
        spaceBetween: 30,
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
  // testimoials v2 slider END
  // magnific scripts  START
  $('.magnific-iframe').magnificPopup({
    type: 'iframe',
  });
  $('.magnific-image').magnificPopup({
    type: 'image',
  });
  // magnific scripts  end

  //gallery
  const swiperGallery = new Swiper('.swiper-gallery', {
    speed: 1000,
    slidesPerView: 4,
    spaceBetween: 0,
    breakpoints: {
      // when window width is >= 575
      0: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      575: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 0,
      },
    },
  });

  //gallery end
  // BLOG Start
  const swiperBlog = new Swiper('.swiper-news', {
    speed: 1000,
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-news .swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      // when window width is >= 575
      0: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      575: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });
  // BLOG end

  // about services slider START
  const swiperServices = new Swiper('.swiper-services', {
    speed: 1000,
    slidesPerView: 'auto',
    spaceBetween: 30,
    watchSlidesProgress: false,
    pagination: {
      el: '.swiper-services .swiper-pagination',
      clickable: true,
    },
  });
  // about services slider END
});
