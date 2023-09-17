// écouteurs
document.addEventListener('readystatechange', ready, false);
document.addEventListener("DOMContentLoaded", init, false);	
window.addEventListener('load', windowLoaded, false); 

function init(){
    // recupérer infos taille viewport
    let matriceDevice = getViewportSize();
    console.log("3 - INIT : ", matriceDevice);
}

function ready() {
    // recupérer infos taille viewport
    let matriceDevice = getViewportSize();
    if (document.readyState === "complete") {
        console.log("5 - READY 100% ", matriceDevice)
    } else {
        console.log("1 - READY ", matriceDevice);
        // récupérer template Header
        let header = document.getElementById("tmp_header");
        header.innerHTML = tmp_header("LAB_A006");  // on passe la clé du titre tmp_header("LAB_A006")
    }
}

function windowLoaded() {
    console.log("7 - LOAD");
}