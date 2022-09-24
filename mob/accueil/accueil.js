var version = "accuei1.0.1";

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