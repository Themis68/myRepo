const version = "1.0.20";

// initialisation matrice device
var matriceDevice = viewportSize();

// multilangue
var pathLangues = "./lang";	

// écouteurs
document.addEventListener("DOMContentLoaded", init, false);	
window.addEventListener('resize', windowResize, false); 
document.addEventListener('readystatechange', ready, false);
window.addEventListener('load', windowLoaded, false); 
/*
window.addEventListener('load', (event) => {
    console.log("event 3");
    // LANG : appeler l'initialisation
    LG_load();      // on créé le code HTML pour le menu des langues
    //LG_selectLangue("../mob/lang", paramsURL.lang);	// on charge les chaines dns la langue souhaitée
});
*/
function windowLoaded() {
    console.log("event 3");
    // LANG : appeler l'initialisation
}


function ready() {
    console.log("event 1");
    // event 1

    // Cette condition évite le doublement du chargement
/*	if (document.readyState === "complete") {
        setLibelle("titre","LIB_A001");
        setLibelle("titre1","LIB_A002");
        setLibelle("titre2","LIB_A003");
        setLibelle("titre3","LIB_A004");
        setLibelle("titre4","LIB_A005");
        setLibelle("asi-title","LIB_A006");
    }*/
}

/**
 * s'exécute au lancement de la page
 */
function init() {
    console.log("event 2");
    // passe après READY()
    // calcul hauteur
    matriceDevice = viewportSize();
    calculHauteur(matriceDevice.height - 200);
    setVersion(version);
    paramsURL = getParameters();	// on récupère un tableau associatif depuis les paramètres de l'URL
}

function LG_chaines() {
        setLibelle("titre","LIB_A001");
        setLibelle("titre1","LIB_A002");
        setLibelle("titre2","LIB_A003");
        setLibelle("titre3","LIB_A004");
        setLibelle("titre4","LIB_A005");
        setLibelle("asi-title","LIB_A006");
}