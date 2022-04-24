

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
    var body = document.querySelector("body");
    body.style.minHeight = hauteur.toString() + "px";
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

/**
 * 
 * détecte s'il s'agit d'un mobile
 */
function isMobileDevice() { 
  if( navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    || navigator.userAgent.match(/Mobile/i))
    {
      return true;
    } else {
      return false;
    }
 }