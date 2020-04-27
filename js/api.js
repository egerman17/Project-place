let map= null;

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
            zoom: 18
        });
        console.log(map, "mapa")
        console.log(localizacion)
        getRestaurantes(localizacion)
    });
}

function getRestaurantes(localizacion) {
    var pyrmot = new google.maps.LatLng(localizacion);
    var request = {
        location: pyrmot,
        radius: '2000',
        type: ['restaurant']
    };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            console.log(place, "resultados for");
            // let price = createPrice(place.price_level);
            let content = `<h3>${place.name}</h3>
                    <h4>${place.vicinity}</h4>
                    <img src=${place.icon}></img>
                    Rating: ${place.rating}
                    <p>añademe como favorito</p>`;

            var marker = new google.maps.Marker({
                position: place.geometry.location,
                icon: place.icon,
                map: map,
                title: place.name
            });

            
            var infowindow = new google.maps.InfoWindow({
                content: content
            });
            bindInfoWindow(marker, map, infowindow, content);
            marker.setMap(map);
        }
    }
}

function bindInfoWindow(marker, map, infowindow, html) {
    marker.addListener('click', function () {
        infowindow.setContent(html);
        infowindow.open(map, this);
    });
}

function createPrice(level){
    if(level != "" && level !=null){
        let out = "";
        for (var x=0; x< level; x++){
            out += "$";
        }
        return out;
    }else{
        return "?";
    }
}








