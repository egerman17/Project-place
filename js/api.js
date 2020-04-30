////Script dedicado para iniciar google maps y el buscador de establecimientos. Utilizaremos los datos que nos da la api de google place para que nos devuelva un json de los datos de los establecimientos que busquemos. Podremos buscar por tipo establecimiento o nombre del mismo.

function initMap() {
    let location = new Object();
/// Capturamos la localización del navegador para situarnos en el mapa.

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


        // Creando el search box 
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        console.log("lo que buscamos",searchBox);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Sesga los resultados de SearchBox hacia la vista del mapa actual.
        map.addListener('bounds_changed', function () {
            searchBox.setBounds(map.getBounds());
        });

       // Escucha el evento que se dispara cuando el usuario busca un establecimiento hace una llamada a la api place, y nos da un json con datos.

        searchBox.addListener('places_changed', function () {
            var places = searchBox.getPlaces();
            console.log("placesss searchbox", places);
            if (places.length == 0) {
                console.warn("no hay datos disponibles");
                alert("no hay datos disponibles");
                return;
            }

            //// recogemos los datos para pintar la ventana info
            places.forEach(function (place) {
                console.log("lugares", places)
                console.log(place, "resultados for");
                let content = `<h2>${place.name}</h2>
                        <h3>${place.formatted_address}</h3>
                        <h4>Web: ${place.website}</h4>
                        Rating: ${place.rating}
                        <button id="añadir">SOY TU FAVORITO</button>`;

                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                ///icono del marker
                var icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };
                //creando el objeto de la ventanainfo, y que recoja los datos del foreach
                var infoVentana = new google.maps.InfoWindow({
                    content: content
                });

                // Creando el marker por cada uno de los establecimientos. He cambiado el tema del push para que me funcione

                var marker = new google.maps.Marker({
                    position: place.geometry.location,
                    icon: icon,
                    map: map,
                    title: place.name
                });
                console.log("marker", marker);
                console.log("ventana", infoVentana);

                creandoInfoVentana(marker, map, infoVentana, content);

            });
            //// Creando la ventana de la info del establecimiento
            function creandoInfoVentana(marker, map, infoVentana, html) {
                marker.addListener('click', function () {
                    infoVentana.setContent(html);
                    infoVentana.open(map, this);
                });
            }


        });


    });
}
