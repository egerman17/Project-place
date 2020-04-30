let map = null;

function initMap() {
    let location = new Object();

    navigator.geolocation.getCurrentPosition(position => {

        location.lat = position.coords.latitude;
        location.lng = position.coords.longitude;
        localizacion = {
            lat: location.lat,
            lng: location.lng
        };
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: location.lat,
                lng: location.lng
            },
            zoom: 14
        });
        console.log(map, "mapa")
        console.log(localizacion)
        // getRestaurantes(localizacion)


        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function () {
            searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function () {
            var places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }

            // Clear out the old markers.
            markers.forEach(function (marker) {
                marker.setMap(null);
            });
            markers = [];

            // For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();

            places.forEach(function (place) {

                console.log("lugares", places)

                console.log(place, "resultados for");
                let content = `<h3>${place.name}</h3>
                        <h4>${place.vicinity}</h4>
                        <img src=${place.icon}></img>
                        Rating: ${place.rating}
                        <button id="añadir">SOY TU FAVORITO</button>`;
                
                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                var icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };

                // Create a marker for each place.
                var marker = markers.push(new google.maps.Marker({
                    map: map,
                    icon: icon,
                    title: place.name,
                    position: place.geometry.location
                }));
                console.log("marker",marker);

                if (place.geometry.viewport) {
                    console.log("geometria",place.geometry.viewport)
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
                var infoVentana = new google.maps.InfoWindow({
                    content: content
                });

                creandoInfoVentana(marker, infoVentana, content);
                
            });

            function creandoInfoVentana(marker, infoVentana, html) {
                marker.addListener('click', function () {
                    infoVentana.setContent(html);
                    infoVentana.open(map, this);
                });
            }
            map.fitBounds(bounds);

           
        });
    });
}
