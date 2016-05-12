
var directionsDisplay = new google.maps.DirectionsRenderer({
  draggable: true
});
var directionsService = new google.maps.DirectionsService();
var map;



// $(".use-address").click(function() {
//     calcRoute();
// });

$(window).load(function() {
  var input = /** @type {!HTMLInputElement} */(
      document.getElementById('routeTo'));
   var autocomplete = new google.maps.places.Autocomplete(input);

   var input2 = /** @type {!HTMLInputElement} */(
      document.getElementById('routeFrom'));
   var autocomplete2 = new google.maps.places.Autocomplete(input2);
  var myOptions = {
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: new google.maps.LatLng(35.270, -80.837)
  };
  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById("directions"));

  $("#routeMode").on("change", function() {
    calcRoute();
  });

 


  $("#routeGo").on("click", function() {//navigator.geolocation.getCurrentPosition();
    calcRoute();
  });

  $("#routeClear").on("click", function() {
    directionsDisplay.setDirections({
      routes: []
    });
  });

});

 function showLocation(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            document.getElementById("routeFrom").value= "1 Washington Square San Jose CA";
    //        alert("Latitude : " + latitude + " Longitude: " + longitude);
         }

         function errorHandler(err) {
            if(err.code == 1) {
              document.getElementById("routeFrom").value= "1 Washington Square San Jose CA";
               //alert("Error: Access is denied!");
            }
            
            else if( err.code == 2) {
               alert("Error: Position is unavailable!");
            }
         }
  

 function getLocation(){

            if(navigator.geolocation){
               // timeout at 60000 milliseconds (60 seconds)
               var options = {timeout:60000};
               navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
            }
            
            else{
               alert("Sorry, browser does not support geolocation!");
            }
         }



function calcGoogleRoute() {
document.getElementById("routeFrom").value= "1 Washington Square San Jose CA";
//comment above line in server
var table = document.getElementsByTagName("table")[0];
var tbody = table.getElementsByTagName("tbody")[0];
tbody.onclick = function (e) {
    e = e || window.event;
    var data;
    //var data=[];
    var target = e.srcElement || e.target;
    while (target && target.nodeName !== "TR") {
        target = target.parentNode;
    }
    if (target) {
        var cells = target.getElementsByTagName("td");
        // for (var i = 0; i < cells.length; i++) {
        //     data.push(cells[i].innerHTML);
        // }
        data=cells[2].innerHTML;
    }
    document.getElementById("routeTo").value= data;
    //alert("Testing route To");
    //alert(document.getElementById("routeTo").value);
    calcRoute();
    //alert(data);
};  
    //getLocation();
    //Uncomment the above line when loaded from server since it is from localhost we get permission denied and comment the below line   
  };

function calcRoute() {
  //alert("Test Inside");
  
   var input = /** @type {!HTMLInputElement} */(
      document.getElementById('routeTo'));
   var autocomplete = new google.maps.places.Autocomplete(input);

   var input2 = /** @type {!HTMLInputElement} */(
      document.getElementById('routeFrom'));
   var autocomplete2 = new google.maps.places.Autocomplete(input2);
  
  var request = {
    //origin: $("#routeFrom").val(),
    //destination: $("#routeTo").val(),
    origin: document.getElementById("routeFrom").value,
    destination: document.getElementById("routeTo").value,
    travelMode: google.maps.TravelMode[$("#routeMode").val()]
  };
  //alert("Request Origin"+request.origin);
  //alert(document.getElementById("routeTo").value);
  //alert("Request Destination"+request.destination);
  directionsService.route(request, function(response, status) {
   //alert(status);
    if (status == google.maps.DirectionsStatus.OK ) {
      //alert(status);
      directionsDisplay.setDirections(response);
    }
  });
}

