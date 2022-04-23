var version = "1.0.5";

document.addEventListener("DOMContentLoaded", init, false);	
// gestion du portrait/payasage
window.addEventListener('resize', windowResize, false);

function init(){
    // recupérer infos taille viewport
    matriceDevice = viewportSize();
    // appel nécessaire pour aligner le footer tout en bas
    calculHauteur(matriceDevice.height);

    setTimeout('RedirectionJavascript()', 6000);

    setVersion(version);
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

/**
 * 
 * @returns 
 */
 function setVersion(version) {
    document.getElementById("version").innerHTML = version;
}