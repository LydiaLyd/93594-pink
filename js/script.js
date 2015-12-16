// navbar script

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



// minus / plus btns

(function() {
  if (document.querySelector(".time__btns-group") || document.querySelector(".companions__btns-group")) {
    var groupTime = document.querySelector(".time__btns-group");
    var groupCompanions = document.querySelector(".companions__btns-group");

    foo(groupTime, "10");
    foo(groupCompanions, "2");

    function foo(group, initVal) {
      var minus = group.querySelector(".btn--minus");
      var plus = group.querySelector(".btn--plus");
      var amount = group.querySelector("[type=number]");

      amount.value = initVal;

      minus.addEventListener("click", function(event) {
        event.preventDefault();
        if (amount.value > 0) {
          amount.value--;
        };
      });

      plus.addEventListener("click", function(event) {
        event.preventDefault();
        amount.value++;
      })
    };
  };
})();



// Form sending with ajax

(function() {
  if (!("FormData" in window) || document.querySelector(".story-form form")) {
    return;
  }

  var form = document.querySelector(".story-form form");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    var data = new FormData(form);

    request(data, function(response) {
      console.log(response);
    });
  });



  if ("FileReader" in window) {
    var area = document.querySelector(".photos__list");

    form.querySelector("#upload-photos").addEventListener("change", function() {
      var files = this.files;

      for (var i = 0; i < files.length; i++) {
        preview(files[i]);
      }
    });
  }



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

  function preview(file) {
    if (file.type.match(/image.*/)) {
      var reader = new FileReader();

      reader.addEventListener("load", function(event) {
        var imgBox = document.createElement("li");
        var img = document.createElement("img");
        var btnDelete = document.createElement("button");

        imgBox.classList.add("photos__item");
        btnDelete.classList.add("btn");
        btnDelete.classList.add("btn--cross");

        img.src = event.target.result;
        console.log( "test" );
        img.alt = file.name;

        area.appendChild(imgBox).appendChild(img);
        imgBox.appendChild(btnDelete);
      });

      reader.readAsDataURL(file);
    }
  };
})();



// google map
// TO DO:
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
