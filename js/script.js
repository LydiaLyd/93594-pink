// navbar

(function() {
  if (document.querySelector(".navbar")) {
    var navbar = document.querySelector(".navbar"),
        navbarHeader = navbar.querySelector(".navbar__header"),
        navbarNav = navbar.querySelector(".navbar__nav"),
        navToggle = navbar.querySelector(".navbar__toggle"),
        navToggleLines = navbar.querySelector(".navbar__lines"),
        navToggleCounter = 1;

    navToggle.addEventListener("click", function(event) {
      event.preventDefault();

      navToggleCounter++;

      if (!(navToggleCounter % 2)) {
        navbarHeader.classList.add("navbar__header--active");
        navToggleLines.classList.add("navbar__lines--cross");
        navbarNav.classList.add("navbar__nav--drop-down");
      } else if (navToggleCounter % 2) {
        navbarHeader.classList.remove("navbar__header--active");
        navToggleLines.classList.remove("navbar__lines--cross");
        navbarNav.classList.remove("navbar__nav--drop-down");
      }
    });
  }
})();



// slider

(function() {
  if (!document.querySelector(".reviews-slider")) return;

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

  // не работает
  // for (var i = 0; i < toggles.length; i++) {
  //   var toggle = toggles[i];
  //   var toggleKey = i;
  //
  //   toggle.addEventListener("click", function() {
  //     if (toggleKey == 0) {
  //       slides.classList.remove("reviews-slider__slides--show-second");
  //       slides.classList.remove("reviews-slider__slides--show-third");
  //       slides.classList.add("reviews-slider__slides--show-first");
  //     };
  //     if (toggleKey == 1) {
  //       slides.classList.remove("reviews-slider__slides--show-first");
  //       slides.classList.remove("reviews-slider__slides--show-third");
  //       slides.classList.add("reviews-slider__slides--show-second");
  //     };
  //     if (toggleKey == 2) {
  //       slides.classList.remove("reviews-slider__slides--show-first");
  //       slides.classList.remove("reviews-slider__slides--show-second");
  //       slides.classList.add("reviews-slider__slides--show-third");
  //     };
  //   });
  // };

  prev.classList.add("reviews-slider__btn-prev--disabled");

  next.addEventListener("click", function(event) {
    event.preventDefault();

    counter++;
    if (counter > 2) counter = 2;

    if (counter == 1) {
      slides.classList.remove("reviews-slider__slides--show-first");
      slides.classList.add("reviews-slider__slides--show-second");
      prev.classList.remove("reviews-slider__btn-prev--disabled");
    }
    if (counter == 2) {
      slides.classList.remove("reviews-slider__slides--show-second");
      slides.classList.add("reviews-slider__slides--show-third");
      next.classList.add("reviews-slider__btn-next--disabled");
    }
  })

  prev.addEventListener("click", function(event) {
    event.preventDefault();

    counter--;
    if (counter < 0) counter = 0;

    if (counter == 0) {
      slides.classList.remove("reviews-slider__slides--show-second");
      slides.classList.add("reviews-slider__slides--show-first");
      prev.classList.add("reviews-slider__btn-prev--disabled");
    }
    if (counter == 1) {
      slides.classList.remove("reviews-slider__slides--show-third");
      slides.classList.add("reviews-slider__slides--show-second");
      next.classList.remove("reviews-slider__btn-next--disabled");
    }
  });
})();



// minus / plus buttons

(function() {
  if (!document.querySelector(".time__btns-group")) {
    return
  };

  moment().format();

  var groupTime = document.querySelector(".time__btns-group");
  var groupCompanions = document.querySelector(".companions__btns-group");

  var list = document.querySelector(".companions__list");
  var template = document.querySelector("#companion-template").innerHTML;
  var companionsAmount = document.querySelector("[name=companions-amount]");

  var btnRemove = document.querySelectorAll(".btn--companions");

  changeDuration(groupTime, "10");
  changeAmount(groupCompanions, "2");

  addFuncRemove(btnRemove[0]);
  addFuncRemove(btnRemove[1]);

  function addFuncRemove(btn) {
    btn.addEventListener("click", function(event) {
      event.preventDefault;
      companionsAmount.value--;
      var li = btn.parentNode;
      var list = li.parentNode;
      list.removeChild(li);
      changeNum();
    });
  };

  function changeNum() {
    var numbers = document.querySelectorAll(".companions__value");
    for (var i = 0; i < numbers.length; i++) {
      var num = numbers[i];
      num.innerHTML = i + 1;
    };
  };

  function changeDuration(group, initVal) {
    var minus = group.querySelector(".btn--minus");
    var plus = group.querySelector(".btn--plus");
    var amount = group.querySelector("[type=number]");

    amount.value = initVal;

    minus.addEventListener("click", function(event) {
      event.preventDefault();
      if (amount.value > 0) {
        amount.value--;
        setDate()
      };
    });

    plus.addEventListener("click", function(event) {
      event.preventDefault();
      amount.value++;
      setDate()
    });
  };

  function changeAmount(group, initVal) {
    var minus = group.querySelector(".btn--minus");
    var plus = group.querySelector(".btn--plus");
    var amount = group.querySelector("[type=number]");

    amount.value = initVal;

    minus.addEventListener("click", function(event) {
      event.preventDefault();
      if (amount.value > 0) {
        amount.value--;
      };

      var item = document.querySelector(".companions__item:last-child");
      list.removeChild(item);
    });

    plus.addEventListener("click", function(event) {
      event.preventDefault();
      amount.value++;

      var li = document.createElement("li");
      li.classList.add("companions__item");
      li.innerHTML = Mustache.render(template, {
        "number-$": companionsAmount.value,
        "companion-name-$": "companion-name-" + companionsAmount.value,
        "companion-niсkname-$": "companion-niсkname-" + companionsAmount.value
      });;

      list.appendChild(li);

      var btnRemove = li.querySelector(".btn--companions");
      btnRemove.addEventListener("click", function(event) {
        event.preventDefault;
        var list = li.parentNode;
        list.removeChild(li);
        amount.value--;
        changeNum();
      });
    });
  };

  function setDate() {
    var dateDeparture = document.querySelector("[name=departure-date]").value;
    var dateReturn = document.querySelector("[name=return-date]").value;
    var duration = +document.querySelector("[name=duration]").value;

    // оО почему дата возвращения не меняется?
    dateReturn = moment(dateDeparture).add(duration, "days");
    console.log( "Return date: " + dateReturn );
  };
})();



// Form sending with ajax

(function() {
  if (!("FormData" in window) || !document.querySelector(".story-form form")) return;

  var form = document.querySelector(".story-form form");
  var area = document.querySelector(".photos__list");

  var template = document.querySelector("#image-template").innerHTML;
  var queue = [];

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    var data = new FormData(form);

    queue.forEach(function(element) {
      data.append("images", element.file);
    });

    request(data, function(response) {
      console.log(response);
      popupSuccess.classList.add("popup-success--show")
    });
  });

  function request(data, fn) {
    var xhr = new XMLHttpRequest();
    var time = (new Date()).getTime();

    xhr.open("post", "https://echo.htmlacademy.ru/adaptive?" + time);

    xhr.addEventListener("readystatechange", function() {
      if (xhr.readyState == 4) {
        fn(xhr.responseText);
      }
    });

    xhr.send(data);
  };

  if ("FileReader" in window) {
    form.querySelector("#upload-photos").addEventListener("change", function() {
      var files = this.files;
      for (var i = 0; i < files.length; i++) {
        preview(files[i]);
      };
      this.value = "";
    });

    function preview(file) {
      if (file.type.match(/image.*/)) {
        var reader = new FileReader();

        reader.addEventListener("load", function(event) {
          var html = Mustache.render(template, {
            "image": event.target.result,
            "name": file.name
          });

          var li = document.createElement("li");
          li.classList.add("photos__item");
          li.innerHTML = html;

          area.appendChild(li);

          li.querySelector(".btn--cross").addEventListener("click", function(event) {
            event.preventDefault();
            removePreview(li);
          });

          // file - картинка в base64-кодировке (?), li нужен для удаления
          queue.push({
            "file": file,
            "li": li
          });
        });

        reader.readAsDataURL(file);
      }
    };

    function removePreview(li) {
      queue = queue.filter(function(element) {
        return element.li != li;
      });

      li.parentNode.removeChild(li);
    };
  }

  var popupSuccess = document.querySelector(".popup-success");
  var popupFailure = document.querySelector(".popup-failure");
  var btnClosePopup = document.querySelectorAll(".btn--popup");

  for (var j = 0; j < btnClosePopup.length; j++) {
    var btnClose = btnClosePopup[j];

    btnClose.addEventListener("click", function(event) {
      event.preventDefault();

      if (popupSuccess.classList.contains("popup-success--show")) {
        popupSuccess.classList.remove("popup-success--show")
      };
      if (popupFailure.classList.contains("popup-failure--show")) {
        popupFailure.classList.remove("popup-failure--show")
      };
    })
  };
})();



// google map
// TODO:
// 1) убрать текст внизу
// 2) куда исчез адрес? исправить

(function() {
  if (document.querySelector(".map")) {
    function initialize() {
      var mapOptions = {
        // customize zoom
        zoom: 16,
        // customize coordinates
        center: new google.maps.LatLng(59.936352,30.321097),
        disableDefaultUI: true,
        scrollwheel: false
      }
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      // customize image
      var image = "img/img_map-marker.png";
      // customize coordinates
      var myLatLng = new google.maps.LatLng(59.936352,30.321097);
      var beachMarker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        // customize image
        icon: image
      });
    }

    google.maps.event.addDomListener(window, "load", initialize);
  }
})();
