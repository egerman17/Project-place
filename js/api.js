let map= null;

   async function initMap() {
        let location = new Object();
  
        navigator.geolocation.getCurrentPosition(position => {
        
            location.lat = position.coords.latitude;
            location.lng = position.coords.longitude; 
            localizacion = {lat: location.lat , lng: location.lng};
            map = new google.maps.Map(document.getElementById('mapa'), {
                center : {lat: location.lat , lng: location.lng},
                zoom: 18
              });
              console.log(map, "mapa")
              console.log(localizacion)
              getRestaurantes(localizacion)
        });
    }
        function getRestaurantes(localizacion){
            var pyrmot = new google.maps.LatLng(localizacion);
            var request = {
                location: pyrmot,
                radius: '2000',
                type: ['restaurant']
            };
            service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, callback);
        }

        function callback(results, status){
            if (status == google.maps.places.PlacesServiceStatus.OK){
                for (var i=0; i < results.length; i++){
                    var place = results[i];
                    // let price = createPrice(place.price_level);
                    let content = `<h3>${place.name}</h3>
                    <h4>${place.vicinity}</h4>
                    <p>Price: ${price}<br/>
                    Rating: ${place.rating}`;

                    var marker = new google.maps.Marker({
                        position: place.geometry.location,
                        map: map,
                        title: place.name
                    });
                    var infowindow = new google.maps.Infowindow({
                        content:content
                    });
                    bindInfoWindow(marker, map, infowindow, content);
                    marker.setMap(map);
                }
            }
        }

        function bindInfoWindow(marker, map, infowindow, html) {
            marker.addlistener('click', function(){
                infowindow.setContent(html);
                infowindow.open(map, this);
            });
        }

        // function createPrice(level){
        //     if(level != "" && level !=null){
        //         let out = "";
        //         for (var x=0; x< level; x++){
        //             out += "$";
        //         }
        //         return out;
        //     }else{
        //         return "?";
        //     }
        // }

    








    
  
    //   map.addListener('center_changed', function() {
    //     // 3 seconds after the center of the map has changed, pan back to the
    //     // marker.
    //     window.setTimeout(function() {
    //       map.panTo(marker.getPosition());
    //     }, 3000);
    //   });
  
    //   marker.addListener('click', function() {
    //     map.setZoom(8);
    //     map.setCenter(marker.getPosition());
    //   });
    // }
    
    // initMap();
  
  