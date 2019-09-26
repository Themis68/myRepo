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

function deleteChild(selector) { 
	var e = document.querySelector(selector); 
	var first = e.firstElementChild; 
	while (first) { 
		first.remove(); 
		first = e.firstElementChild; 
	} 
} 

function classSelector(use, selector, value) {
	var e = document.querySelector(selector);
	gestClass(use, e, value);
}

function classId(use, id, value) {
	var e = document.getElementById(id);
	gestClass(use, e, value);
}

function gestClass(use, objet, value) {
	switch (use) {
		case "set":
			objet.className = value;
			break;

		case "add":
			objet.classList.add(value);
			break;
		
		case "del":
			objet.classList.remove(value);

		default:

	}
}