var version = "1.0.19";

// initialisation matrice device
 var matriceDevice = viewportSize();

// écouteurs
document.addEventListener("DOMContentLoaded", init, false);	
window.addEventListener('resize', windowResize, false); 

/**
 * s'exécute au lancement de la page
 */
function init() {
    // calcul hauteur
    matriceDevice = viewportSize();
    calculHauteur(matriceDevice.height - 200);
    setVersion(version);
}