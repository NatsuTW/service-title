// wow.js
new WOW().init();

// swiper
const swiper = new Swiper('.swiper', {
  loop: true,
  loopedSlides: 5,
  slidesPerView: 'auto',
  spaceBetween: 20,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    reverseDirection: true,
    pauseOnMouseEnter: true,
  },
});

//scroll
jQuery('a[href^="#"]').on('click', function () {
  let id = jQuery(this).attr('href');
  let target = jQuery(id === "#" ? "html" : id)
  let position = jQuery(target).offset().top

  jQuery('html, body').animate({
    scrollTop: position,
  }, 400)
})