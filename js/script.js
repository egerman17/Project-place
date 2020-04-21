// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "",
    authDomain: "find-place-369b7.firebaseapp.com",
    databaseURL: "https://find-place-369b7.firebaseio.com",
    projectId: "find-place-369b7",
    storageBucket: "find-place-369b7.appspot.com",
    messagingSenderId: "561570713110",
    appId: "1:561570713110:web:a24cd18b10efd1aec02f37"
};
// iniciamos firebase

firebase.initializeApp(firebaseConfig);

// Realizamos esta funcion para registrar al usuario con su cuenta de git, y añadirla, en el caso de que este añadida se avisa.
document.getElementById("login").addEventListener("click", registrar);

function registrar() {
    console.log("prueba")
    const provider = new firebase.auth.GithubAuthProvider();
    const formulario = firebase.database().ref().child("datos");
    console.log(provider);
    firebase.auth().signInWithPopup(provider).then(result => {
        console.log(result);
        const authData = result.user.providerData[0];
        console.log(authData);
        formulario.orderByChild('uid')
            .equalTo(authData.uid)
            .once('value', snap => {
                const usuarioYaRegistrado = snap.val();
                if (usuarioYaRegistrado !== null) {
                    const alerta = `<div class="alert alert-danger alert-dismissible" role="alert">
    
                <strong>Aviso!</strong> ${authData.email} ya esta registrado! Comprueba tu inbox.</div>`
                    document.getElementById('alerta').innerHTML = alerta;
                } else {
                    console.log("authData:", authData)
                    formulario.push(authData);
                }
            });
    }).catch(error => {
        console.warn("error de login", error);
    });
}

firebase.auth().onAuthStateChanged(function (authData) {

    if (authData) {
        console.log("bienvenido" + authData.email)
    } else {
        console.log("no hay ninguna sesion abierta")
    }
});

document.getElementById("desloguear").addEventListener("click", salir);

function salir() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log("Se ha deslogueado correctamente");
        alert("se ha deslogueado correctamente");
    }).catch(function (error) {
        console.log("Errores ")
        // An error happened.
    });
};