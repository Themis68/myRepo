/**
 * 
 * @returns matrice taille device
 */
 function viewportSize() {
    // récupération id objet à travailler
    var d = document.documentElement;
    // retourne la matrice device
    return {
      height: d.clientHeight,
      width: d.clientWidth
    };
}

/**
 * 
 * @param {hauteurDevice} hauteur 
 */
 function calculHauteur(hauteur) {
    // gestion hauteur de device
    let body = document.querySelector("body");
    body.style.minHeight = hauteur + "px";
}

/**
 * redimensionnement écran
 */
 function windowResize() {
    // récupération nouvelle matrice device
    window.matriceDevice = viewportSize();
    // calcul de la hauteur du device
    calculHauteur(window.matriceDevice.height);
}