// retourne la taille d'un tableau associatif
//
// exemple appel : arrayAssoSize(scenario) avec 
// - scenario un tableau associatif
//
function arrayAssoSize(arr) {
    var size = 0;
    for (let key in arr) 
    {
        if (arr.hasOwnProperty(key)) size++;
    }
    return size;
}

// retourne l'indice du tableau correspondnat à la valeur reçue
//
// exemple appel : arrayAssoSearch(actions, timeCode) avec 
// - actions un tableau associatif
// - timecode la valeur à rechercher
//
function arrayAssoSearch(arr, valObject) {
	var nbEl = arrayAssoSize(arr);
	for (let ind = 0; ind < nbEl; ind++) {
		if (arr[ind].step === valObject) {
			return ind;	// retourne l'indice du tableau
		}
	}
	return -1;	// aucun résultat
}

// affiche/cache un objet repéré par un id
//
// exemple appel : bascule(id)
// - id de l'objet
//
function bascule(id) {
	var obj = document.getElementById(id);
	obj.setAttribute("style","visibility:" + (obj.style.visibility === "collapse" ? "visible" : "collapse"));
	obj.setAttribute("src","./images/" + (obj.style.visibility === "collapse" ? "fleche_fermee.png" : "fleche_ouverte.png"));
}