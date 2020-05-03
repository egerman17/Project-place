
import { registrar, salir, firebaseConfig } from './script.js';
import { initMap } from './api.js';

// Create the script tag, set the appropriate attributes
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAz0N-D06DyIgb8YWfFI_oYDSHPQemDkn0&callback=initMap&libraries=places';
script.defer = true;
script.async = true;

// Attach your callback function to the `window` object
window.initMap = initMap;

// Append the 'script' element to 'head'
document.head.appendChild(script);

// iniciamos firebase
firebase.initializeApp(firebaseConfig);

// Realizamos esta funcion para registrar al usuario con su cuenta de git, y añadirla, en el caso de que este añadida se avisa.
document.getElementById("login").addEventListener("click", registrar);

firebase.auth().onAuthStateChanged(function (authData) {

  if (authData) {
      console.log("bienvenido" + authData.email)
  } else {
      console.log("no hay ninguna sesion abierta")
  }
});

document.getElementById("desloguear").addEventListener("click", salir);