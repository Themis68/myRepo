let version = "1.0.20";


document.addEventListener("DOMContentLoaded", init, false);	
// gestion du portrait/payasage
window.addEventListener('resize', windowResize, false);

function init(){
    // recupérer infos taille viewport
    let matriceDevice = viewportSize();
    // appel nécessaire pour aligner le footer tout en bas
    calculHauteur(matriceDevice.height);
    setVersion(version);

    setTimeout('RedirectionJavascript()', 6000);
}

function RedirectionJavascript(){
    // appel HTML en fonction du device
    // inutile de passer la langue dans l'url car elle est déduite 
    // par LANG lors du chargement de la page
    if (isMobileDevice()) {
        // mobile
        document.location.href="./mob/indexSP.html";
    } else {
        //desktop
        document.location.href="./desk/indexDK.html";
    }
}

function setVersion(version) {
    document.getElementById("version").innerHTML = version;
}

