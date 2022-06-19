document.addEventListener("DOMContentLoaded", init, false);	
// gestion du portrait/payasage
window.addEventListener('resize', windowResize, false);

function init(){
    // recupérer infos taille viewport
    matriceDevice = viewportSize();
    // appel nécessaire pour aligner le footer tout en bas
    calculHauteur(matriceDevice.height);
    setVersion(version);

    setTimeout('RedirectionJavascript()', 6000);
}

function RedirectionJavascript(){
    // appel HTML en fonction du device
    if (isMobileDevice()) {
        // mobile
        document.location.href="./mob/indexSP.html";
    } else {
        //desktop
        document.location.href="./indexDK.html";
    }
}

