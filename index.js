document.addEventListener("DOMContentLoaded", init, false);	

function init(){
    // recupérer infos taille viewport
    let matriceDevice = viewportSize();
    // appel nécessaire pour aligner le footer tout en bas
    calculHauteur(matriceDevice.height);
    // on redirige selon le device
   setTimeout('RedirectionJavascript()', 6000);
}

function RedirectionJavascript(){
    // appel HTML en fonction du device
    // inutile de passer la langue dans l'url car elle est déduite 
    // par LANG lors du chargement de la page
    if (isMobileDevice()) {
        // mobile
        // document.location.href="./y22/indexSP.html";
        document.location.href="./desk/indexDK.html";
    } else {
        //desktop
        document.location.href="./desk/indexDK.html";
    }
}