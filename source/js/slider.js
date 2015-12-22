(function() {
  if (!document.querySelector(".reviews-slider")) {
    return;
  }

  var slider = document.querySelector(".reviews-slider");

  var toggles = slider.querySelectorAll(".reviews-slider__control");
  var toggle_1 = toggles[0];
  var toggle_2 = toggles[1];
  var toggle_3 = toggles[2];

  var next = slider.querySelector(".reviews-slider__btn-next");
  var prev = slider.querySelector(".reviews-slider__btn-prev");

  var slides = slider.querySelector(".reviews-slider__slides");

  var counter = 0;

  slides.classList.add("reviews-slider__slides--show-first");

  toggle_1.addEventListener("click", function() {
    slides.classList.remove("reviews-slider__slides--show-second");
    slides.classList.remove("reviews-slider__slides--show-third");
    slides.classList.add("reviews-slider__slides--show-first");
  });

  toggle_2.addEventListener("click", function() {
    slides.classList.remove("reviews-slider__slides--show-first");
    slides.classList.remove("reviews-slider__slides--show-third");
    slides.classList.add("reviews-slider__slides--show-second");
  });

  toggle_3.addEventListener("click", function() {
    slides.classList.remove("reviews-slider__slides--show-first");
    slides.classList.remove("reviews-slider__slides--show-second");
    slides.classList.add("reviews-slider__slides--show-third");
  });

  prev.classList.add("reviews-slider__btn-prev--disabled");

  next.addEventListener("click", function(event) {
    event.preventDefault();

    counter++;
    if (counter > 2) counter = 2;

    if (counter == 1) {
      slides.classList.remove("reviews-slider__slides--show-first");
      slides.classList.add("reviews-slider__slides--show-second");
      prev.classList.remove("reviews-slider__btn-prev--disabled");
    } else if (counter == 2) {
      slides.classList.remove("reviews-slider__slides--show-second");
      slides.classList.add("reviews-slider__slides--show-third");
      next.classList.add("reviews-slider__btn-next--disabled");
    }
  });

  prev.addEventListener("click", function(event) {
    event.preventDefault();

    counter--;
    if (counter < 0) counter = 0;

    if (counter == 0) {
      slides.classList.remove("reviews-slider__slides--show-second");
      slides.classList.add("reviews-slider__slides--show-first");
      prev.classList.add("reviews-slider__btn-prev--disabled");
    } else if (counter == 1) {
      slides.classList.remove("reviews-slider__slides--show-third");
      slides.classList.add("reviews-slider__slides--show-second");
      next.classList.remove("reviews-slider__btn-next--disabled");
    }
  });
})();
