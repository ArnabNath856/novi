// menu js
jQuery(window).on("scroll", function () {

  var scrollTop = jQuery(this).scrollTop();
  var bannerHeight = jQuery(".banner-slider").outerHeight();

  // Banner পুরো cross করলে fix হবে
  if (scrollTop > bannerHeight) {
    jQuery(".header-area").addClass("fix");
  } else {
    jQuery(".header-area").removeClass("fix");
  }

});

$(document).ready(function(){
  $(".btn-hamburger").click(function(){
    $(this).toggleClass("is-active");
  });
});



// 🔥 Split text only once (h1 + h2)
document.querySelectorAll(".banner-img h1, .banner-img h2").forEach((heading) => {
  if (!heading.classList.contains("split-done")) {
    let text = heading.textContent.trim();
    heading.innerHTML = "";

    text.split("").forEach((letter) => {
      let span = document.createElement("span");
      span.textContent = letter === " " ? "\u00A0" : letter;
      heading.appendChild(span);
    });

    heading.classList.add("split-done");
  }
});

// 🔥 Reset Function
function resetAllText() {
  gsap.set(".banner-img h1 span, .banner-img h2 span", {
    opacity: 0,
    y: 80,
    scale: 0.6,
    filter: "blur(15px)"
  });
}

// 🔥 Animate Active Slide
function animateActiveText(swiper) {
  let activeSlide = swiper.slides[swiper.activeIndex];

  let h1Letters = activeSlide.querySelectorAll("h1 span");
  let h2Letters = activeSlide.querySelectorAll("h2 span");

  // h1 animation
  gsap.to(h1Letters, {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    duration: 1,
    stagger: 0.05,
    ease: "power4.out",
    overwrite: "auto"
  });

  // h2 animation (slightly delayed)
  gsap.to(h2Letters, {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    duration: 1,
    stagger: 0.03,
    ease: "power4.out",
    delay: 0.5,
    overwrite: "auto"
  });
}

var swiper = new Swiper(".banner-slider", {
  loop: true,
  speed: 1000,
  direction: "horizontal",
  slidesPerView: 1,
  spaceBetween: 0,

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  resistanceRatio: 0,

  on: {
    init: function () {
      resetAllText();
      animateActiveText(this);
    },

    slideChange: function () {
      resetAllText();
    },

    transitionEnd: function () {
      animateActiveText(this);
    }
  }
});


$(window).on('load', function(){

    function createMarquee($slider, direction, speed){

        let position = 0;
        let totalWidth = 0;
        let isPaused = false;

        // duplicate once
        const original = $slider.html();
        $slider.append(original);

        function calculateWidth(){
            totalWidth = 0;
            $slider.children().each(function(){
                totalWidth += this.offsetWidth +
                              parseInt(getComputedStyle(this).marginRight);
            });
            totalWidth /= 2;

            // IMPORTANT FIX:
            if(direction === 'right'){
                position = -totalWidth;  // start from negative width
            }
        }

        calculateWidth();

        function animate(){

            if(!isPaused){

                if(direction === 'left'){

                    position -= speed;

                    if(position <= -totalWidth){
                        position += totalWidth;
                    }

                } else {

                    position += speed;

                    if(position >= 0){
                        position -= totalWidth;
                    }
                }

                $slider[0].style.transform =
                    `translate3d(${position}px,0,0)`;
            }

            requestAnimationFrame(animate);
        }

        animate();

        $slider.on('mouseenter', ()=> isPaused = true);
        $slider.on('mouseleave', ()=> isPaused = false);

        window.addEventListener('resize', calculateWidth);
    }

    // LEFT SLIDER (Right → Left)
    createMarquee($('.left-slide'), 'left', 0.6);

    // RIGHT SLIDER (Left → Right)  ← FIXED
    createMarquee($('.right-slide'), 'right', 0.6);

});

$(document).ready(function(){

    $(".car-section").each(function(){

        var $section = $(this);
        var $cards = $section.find(".col-lg-4");
        var $button = $section.find(".view-more");

        // Hide all cards after the first 3
        $cards.slice(3).hide();

        // ✅ যদি 3টার বেশি card না থাকে, button hide করো
        if ($cards.length <= 3) {
            $button.hide();
        }

        $button.on("click", function(){

            if ($cards.slice(3).is(":visible")) {
                $cards.slice(3).fadeOut(400);
                $button.text("View More");
            } else {
                $cards.slice(3).fadeIn(400);
                $button.text("View Less");
            }

        });

    });

});

$('.carSpecification2-carousel').owlCarousel({
    items: 1,
    loop: true,
    margin: 10,
    nav: true,
    dots: false,

    // 🔥 Fade Effect
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',

    smartSpeed: 800,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,

    mouseDrag: false,   // Fade e usually drag off thakle smooth lage
    touchDrag: false
});