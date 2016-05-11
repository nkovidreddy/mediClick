
var map;

$(window).load(function() {


  //var pyrmont = new google.maps.LatLng(-33.8665, 151.1956);
  var s= document.getElementById("routeFrom").value;
 var c=s.split(',');
 var a = c[0];
 var b = c[1];
   //var pyrmont = new google.maps.LatLng(s);
  
   var pyrmont = new google.maps.LatLng(parseFloat(a), parseFloat(b));

 //var pyrmont = {lat: 37.3352, lng: -121.8811};

  //var pyrmont = new google.maps.LatLng(37.3352, -121.8811);
  var pyrmont = document.getElementById("routeFrom").value;
 //var myloc = {lat: 37.3352, lng: -121.8811};

   map = new google.maps.Map(document.getElementById('map_canvas'), {
    center: pyrmont,
    zoom: 15,
   // mapTypeId: google.maps.MapTypeId.ROADMAP,
   // scrollwheel: false
  });
 var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
  var marker = new google.maps.Marker({
    position: document.getElementById("routeFrom").value,
    map: map,
    title: 'User Location',
    icon: image
  });
  marker.setMap(map);
  // Specify location, radius and place types for your Places API search.
  var request = {
    location: pyrmont,
    radius: '2000',
    types: ['pharmacy']
  };

  // Create the PlaceService and send the request.
  // Handle the callback with an anonymous function.
  var service = new google.maps.places.PlacesService(map);
 var infowindow = new google.maps.InfoWindow();

  service.nearbySearch(request, function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {

        var place = results[i];
 createMarker(results[i]);
        // If the request succeeds, draw the place location on
        // the map as a marker, and register an event to handle a
        // click on the marker.
       
         var dropdown = document.getElementById("end");

        //var opt = place.geometry.location;
   
        var opt = place.name;
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        dropdown.appendChild(el);
   
       
      }
    }
  });
 function createMarker(place) {
 var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

     google.maps.event.addListener(marker,'mouseover', function() {
    infowindow.setContent(place.name);
    
    infowindow.open(map, this);
});

     google.maps.event.addListener(marker,'mouseout', function() {
    infowindow.close();
});
   google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);

          var str=String(place.geometry.location);
          var str1 = str.replace("(", "");
         var res= str1.replace(")", "");
          calcRoute(res);
         
        // alert(res);
        });
 }
  //directionsDisplay.setMap(map);
  //directionsDisplay.setPanel(document.getElementById("directions"));
   $("#routeGo").on("click", function() {//navigator.geolocation.getCurrentPosition();
   // calcRoute();
  });

  

})


  
// Run the initialize function when the window has finished loading.
//google.maps.event.addDomListener(window, 'load', initialize);

function calcRoute(res) {
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
         map = new google.maps.Map(document.getElementById('map_canvas'), {
           zoom:7,

           mapTypeId: google.maps.MapTypeId.ROADMAP
         });

     directionsDisplay.setMap(map);
     directionsDisplay.setPanel(document.getElementById("directions"));
     
  var request = {
      origin: document.getElementById("routeFrom").value, 
 
    destination: res, 
 
    travelMode: google.maps.DirectionsTravelMode.DRIVING

  };
 
 // alert("Request Destination"+request.destination);
  directionsService.route(request, function(response, status) {
   //alert(status);
    if (status == google.maps.DirectionsStatus.OK ) {
     directionsDisplay.setDirections(response);
    }
  });
}

