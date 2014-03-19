// $(function(){
	function initialize() {
        var mapOptions = {
        	center: new google.maps.LatLng(40.0076, 254.744),
        	zoom: 12,
        	panControl: false,
        	maxZoom: 12,
        	minZoom: 12,
        	streetViewControl: false,
        	mapTypeControl: false,
        	zoomControl: false,
        	draggable: true,
        };
        //variable declaring center on window resize
        var center;

        //creates the google map api
        var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

        //creates the google geocoder API
        var geocoder = new google.maps.Geocoder();

        //create ovrelapping markers plug-in that separates markers that are on the same latLng
        var oms = new OverlappingMarkerSpiderfier(map, {keepSpiderfied: true});
        var iw = new google.maps.InfoWindow();
		// oms.addListener('click', function(marker, event) {
		// 	iw.setContent(marker.desc);
		// 	iw.open(map, marker);
		// });
		// oms.addListener('spiderfy', function(markers) {
		// 	iw.close();
		// });


        //Create static markers on the map when map loads
        //creates variable of marker images to be used when the marker is placed
        // var markerImages = [
        // 	{image: $("#jencon").attr("src")},
        // 	{image: $("#limacon").attr("src")},
        // 	{image: $("#rosiecon").attr("src")},
        // 	{image: $("#arleniscon").attr("src")},
        // 	{image: $("#jarahcon").attr("src")}
        // ];

        //list of cities and their LatLng positions that giranaut has launched in
  		var markerLatLng = [
        {locate: new google.maps.LatLng(40.71, 285.994)},
        {locate: new google.maps.LatLng(40.0076, 254.744)},
        {locate: new google.maps.LatLng(41.8519, 272.344)},
        {locate: new google.maps.LatLng(36.09, 244.794)}
        ];



        //generate fake Data from Faker.js to fill out sidebar
		var guideInfo = $('#guideBioCard').html();
		var guideTemplate = Handlebars.compile(guideInfo);


		//function grabs center of map at current window size
		function calculateCenter() {
		  center = map.getCenter();
		}
        //creates the marker that is to be placed
        function markerCreate(arrImages,arrLatLng ){
        	// for(var i=0; i < arrLatLng.length; i++ ){
        		for(var j = 0; j<guidesData.length ; j++){
        			// var guideData = fakeGuides[j+(i*guidesData.length)];
        			var address = guidesData[j].applicationData.address+" "+guidesData[j].applicationData.city+", "+guidesData[j].applicationData.state+" "+guidesData[j].applicationData.country;
        			geocode(guidesData[j],address);
		    	}
	    }
	    function geocode(data, address){
	    	var div = document.createElement('DIV');
	    	div.innerHTML = '<div class="guideMarkers"><img class="guideMarkersImage" src='+data.picture+'></div>';
	    	geocoder.geocode( { 'address': address}, function(results, status) {
        				 if (status == google.maps.GeocoderStatus.OK) {
					        // var location = results[0].geometry.location;
					        // var image = {
					        // 	origin: new google.maps.Point(0,0),
					        // 	anchor: new google.maps.Point(0, 32)
					        // 	}; 
					        var marker = new RichMarker({
					            position: results[0].geometry.location,
					            map: map,
					            // icon: image,
					            flat: false,
					            animation: google.maps.Animation.DROP,
					            draggable: true,
					            content: div
				        	});
	    					// var marker = new CustomMarker(results[0].geometry.location, map, div)
				        	oms.addMarker(marker);
				        // console.log("marker: ",marker," data: ",data)
		        			(function(marker, guideData){
				  				google.maps.event.addListener(marker, 'click', function() {
				  					var chris = guideTemplate(guideData);
				  					$("#guideBio").css("display","block");
			      					$('#guideBio').html(chris);
				    			});
				    		})(marker, data);
					      } else {
					        alert("Geocode was not successful for the following reason: " + status);
					      }
        			});	
	    }

        //click handler to zoom in on city after button has been clicked
         $(".giranaut-cities li").on("click", function(){
        	if($(this).text()==="Boulder"){
        		map.setCenter(markerLatLng[1].locate);
				map.setZoom(12);
			}
			else if($(this).text()==="NYC"){
				map.setCenter(markerLatLng[0].locate);
				map.setZoom(12);
			}
			else if($(this).text()==="Chicago"){
				map.setCenter(markerLatLng[2].locate);
				map.setZoom(12);
			}
			else{
				map.setCenter(markerLatLng[3].locate);
				map.setZoom(12);
			}
		})

  //       google.maps.event.addListener(marker, 'click', function() {
		//     infowindow.open(map,marker);
		// });

	    //calls the create marker function and places markers on the map
	    markerCreate()//(markerImages, markerLatLng);




        //google maps styling of maps object:	
	    var stylers = [
	    {
		    "featureType": "poi",
		    "elementType": "labels",
		    "stylers": [
		      { "visibility": "off" }
		    ]
		}
	  //   	{
	  //  		"featureType": "transit",
	  //   	"stylers": [{ 
	  //   		"visibility": "off" 
	  //   	}]
	  // 		},
	  // 		{
	  //   	"featureType": "road",
	  //   	"stylers": [{
	  //   		"visibility": "simplified" 
	  //   	}]
	  // 		},
	  // 		{
	  //   	"featureType": "landscape",
	  //   	"elementType": "labels",
	  //   	"stylers": [{
	  //   		"visibility": "off" 
	  //   	}]
	  // 		},
	  // 		{
	  // 		"featureType": "landscape.natural.terrain",
	  // 		"elementType": "geometry",
	  // 		"stylers": [{
	  // 			"visibility": "on" 
	  // 		}]
	  // 		},
	  // 		{
	  //   	"featureType": "poi",
	  //   	"stylers": [{
	  //   		"visibility": "off" 
	  //   	}]
	  // 		},
	  // 		{
	  //   	"featureType": "water",
	  //   	"stylers": [{
	  //   		"visibility": "simplified" 
	  //   	}]
			// },
			// {
	  //   	"featureType": "road",
	  //   	"elementType": "labels",
	  //   	"stylers": [{
	  //   		"visibility": "off" 
	  //   	}]
	  // 		},
	  // 		{
	  //   	"featureType": "administrative.land_parcel",
	  //   	"stylers": [{
	  //   		"visibility": "off" 
	  //   	}]
	  // 		},
	  // 		{
	  //   	"featureType": "administrative.neighborhood",
	  //   	"stylers": [{
	  //   		"visibility": "off" 
	  //   	}]
	  // 		},
	  // 		{
	  //   	"featureType": "administrative.province",
	  //   	"stylers": [{
	  //   		"visibility": "off" 
	  //   	}]
	  // 		},
	  // 		{
	  //   	"featureType": "administrative",
	  //   	"elementType": "geometry",
	  //   	"stylers": [{
	  //   		"visibility": "off" 
	  //   	}]
	  // 		}
	  		// {
	    // 	"featureType": "water",
	    // 	"elementType": "geometry",
	    // 	"stylers": [{
	    // 		"color": "#99f4ff" 
	    // 	}]
	  		// },
	  		// {
	    // 	"featureType": "landscape",
	    // 	"stylers": [{
	    // 		"color": "#31a745" 
	    // 	}]
	  		// },
	  		// {
	    // 	"elementType": "labels",
	    // 	"stylers": [{
	    // 		"weight": 0.7 
	    // 	}
	    //   	{
	    //   		"color": "#333333" 
	    //   	}]
	  		// }
		]
		//calls setOptions and makes map styles to styles listed above:
		map.setOptions({styles: stylers});

		//google listener to calculate center of map when window is idle
		google.maps.event.addDomListener(map, 'idle', function() {
		  calculateCenter();
		});
		//google listener to set center of map when window is resized
		google.maps.event.addDomListener(window, 'resize', function() {
		  map.setCenter(center);
		});





	}
    google.maps.event.addDomListener(window, 'load', initialize);
// })