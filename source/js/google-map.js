// TODO:
// 1) разобраться, как убрать текст внизу
// 2) разобраться, куда исчез адрес под маркером

(function() {
  if (document.querySelector(".map")) {
    function initialize() {
      var mapOptions = {
        zoom: 16, // customize zoom
        center: new google.maps.LatLng(59.936352,30.321097), // customize coordinates
        disableDefaultUI: true,
        scrollwheel: false
      }
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      var image = "img/img_map-marker.png"; // customize image
      var myLatLng = new google.maps.LatLng(59.936352,30.321097); // customize coordinates
      var beachMarker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image // customize image
      });
    }

    google.maps.event.addDomListener(window, "load", initialize);
  }
})();
