var paramsURL;

// recuperation des paramètres de l'url
function getParameters(){
	var urlParams,
	match,
	pl = "/+/g", // Regex for replacing addition symbol with a space
	search = /([^&=]+)=?([^&]*)/g,
	decode = function (s) { return decodeURIComponent(s.replace(pl, )); },
	query = window.location.search.substring(1);
	urlParams = {};
	while (match = search.exec(query))
	urlParams[decode(match[1])] = decode(match[2]);
	return urlParams;
}

/**
 * 
 * @returns matrice taille device
 */
 function getViewportSize() {
  /*
  clientHeight:
  Returns the height of the visible area for an object, in pixels. The value contains the height with the padding, 
  but it does not include the scrollBar, border, and the margin.

  offsetHeight:
  Returns the height of the visible area for an object, in pixels. The value contains the height with the padding, 
  scrollBar, and the border, but does not include the margin.

  So, offsetHeight includes scrollbar and border, clientHeight doesn't.
  */
  
    // récupération id objet à travailler
    const d = document.documentElement;
    // retourne la matrice device
    return {
      width: d.offsetWidth,
      height: d.offsetHeight,
      width2: d.clientWidth,
      height2: d.clientHeight,

    };
}

/**
 * 
 * @param {hauteurDevice} hauteur 
 */
 function setViewHauteur(hauteur) {
    // gestion hauteur de device
    let obj = document.querySelector("body");
    obj.style.minHeight = hauteur.toString() + "px";
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
 * @returns matrice taille device
 */
 function viewportSize() {
    // récupération id objet à travailler
    const d = document.documentElement;
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
    let elem = document.querySelector("body");
    elem.style.minHeight = hauteur.toString() + "px";
}



/**
 * 
 * détecte s'il s'agit d'un mobile
 */
function isMobileDevice() { 
  return !!(navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    || navigator.userAgent.match(/Mobile/i));
 }