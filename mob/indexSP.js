const version = "1.0.20";

var paramsURL = "";

// initialisation matrice device
var matriceDevice = viewportSize();

// écouteurs
document.addEventListener('readystatechange', ready, false);
document.addEventListener("DOMContentLoaded", init, false);	
window.addEventListener('load', windowLoaded, false); 
//window.addEventListener('resize', windowResize, false); 


function ready() {
    if (document.readyState === "complete") {
        console.log("5 - event");
    } else {
        console.log("1 - event");
    }
}

/**
 * s'exécute au lancement de la page
 */
function init() {
    console.log("3 - event");
    // passe après READY()
    // calcul hauteur
    matriceDevice = viewportSize();
    calculHauteur(matriceDevice.height - 200);
    setVersion(version);
    paramsURL = getParameters();	// on récupère un tableau associatif depuis les paramètres de l'URL
}

function windowLoaded() {
    console.log("7 - event");
    // LANG : appeler l'initialisation
}