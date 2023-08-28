// écouteurs
document.addEventListener('readystatechange', ready, false);
document.addEventListener("DOMContentLoaded", init, false);	

function init(){
    console.log("INIT ");
    // recupérer infos taille viewport
    let matriceDevice = getViewportSize();
    console.log("INIT : ", matriceDevice);
}

function ready() {
    let matriceDevice = getViewportSize();
    if (document.readyState === "complete") {
        console.log("READY 100% ", matriceDevice);
    } else {
        console.log("READY ", matriceDevice);
    }
}