
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