// navbar script

(function() {
  if (document.querySelector('.navbar')) {
    var navbar = document.querySelector('.navbar'),
        navbarHeader = navbar.querySelector('.navbar__header'),
        navbarNav = navbar.querySelector('.navbar__nav'),
        navToggle = navbar.querySelector('.navbar__toggle'),
        navToggleLines = navbar.querySelector('.navbar__lines'),
        navToggleCounter = 1;

    navToggle.addEventListener('click', function(event) {
      event.preventDefault();

      navToggleCounter++;

      if (!(navToggleCounter % 2)) {
        navbarHeader.classList.add('navbar__header--active');
        navToggleLines.classList.add('navbar__lines--cross');
        navbarNav.classList.add('navbar__nav--drop-down');
      } else if (navToggleCounter % 2) {
        navbarHeader.classList.remove('navbar__header--active');
        navToggleLines.classList.remove('navbar__lines--cross');
        navbarNav.classList.remove('navbar__nav--drop-down');
      }
    });
  }
})();



// minus / plus btns

(function() {
  if (document.querySelector(".time__btns-group")) {
    var groupTime = document.querySelector(".time__btns-group");
    var groupCompanions = document.querySelector(".companions__btns-group");

    foo(groupTime);
    foo(groupCompanions);

    function foo(group) {
      var minus = group.querySelector(".btn--minus");
      var plus = group.querySelector(".btn--plus");
      var amount = group.querySelector("[type=number]");

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



// google map
// TO DO:
// 1) убрать текст внизу
// 2) куда исчез адрес? исправить

(function() {
  if (document.querySelector('.map')) {
    function initialize() {
      var mapOptions = {
        // customize zoom
        zoom: 16,
        // customize coordinates
        center: new google.maps.LatLng(59.936352,30.321097),
        disableDefaultUI: true,
        scrollwheel: false
      }
      var map = new google.maps.Map(document.getElementById('map'), mapOptions);
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

    google.maps.event.addDomListener(window, 'load', initialize);
  }
})();
