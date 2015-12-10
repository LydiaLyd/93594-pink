// navbar script

(function() {
  if (document.querySelector('.navbar')) {
    var navbar = document.querySelector('.navbar'),
        navbarHeader = navbar.querySelector('.navbar__header'),
        navbarNav = navbar.querySelector('.navbar__nav'),
        navToggle = navbar.querySelector('.navbar__toggle'),
        navToggleLines = navbar.querySelector('.navbar__lines'),
        navToggleCounter = 1;

    navToggle.addEventListener('click', function() {
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
        disableDefaultUI: true
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
