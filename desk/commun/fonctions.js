function user() {
	let avatarOk = false;
	const reg = /^([a-zA-Z]){3,20}$/g;	// accepte des chaines de caractères jusqu'à 5 caractères
	do {
		avatar = window.prompt("Indique ton prénom s'il te plait (3 à 20 lettres maximum)");
		avatarOk = reg.exec(avatar);
	}
	while (!avatarOk);
	avatar = avatar.toUpperCase();
	document.title = "Bienvenue " + avatar;
	let msg = (tabMessages === undefined ? document.title : avatar + " " + tabMessages[0]);
	document.querySelector("bascule span").innerHTML = msg;
}

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

function arrayAssoSearch2(arr, valObject) {
	let res = null;
	var nbEl = arrayAssoSize(arr);
	for (let ind = 0; ind < nbEl; ind++) {
		if (valObject >= arr[ind].width ) {
			res = ind;	// retourne l'indice du tableau
		}
	}
	return res;	// aucun résultat
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

function playSound(soundObj) {
  var sound = document.getElementById(soundObj);
  sound.play();
}

function draw(id, maillotCouleur, shortCouleur) {
	let myCanvas = document.getElementById(id);
    	if (myCanvas.getContext) {
			let ctx = myCanvas.getContext("2d");

			// fond
			ctx.beginPath();
  			ctx.lineWidth="1";
  			ctx.arc(18, 18, 18, 0, 2 * Math.PI);	// X rayon, Y rayon, rayon, angle de départ, 2*PI pour le cercle complet
  			ctx.fillStyle = "black";	// couleur de fond
			ctx.fill();		// ordre de remplissage
			ctx.closePath();

			// tete
			ctx.beginPath();
  			ctx.lineWidth="1";
  			ctx.arc(18, 8, 5, 0, 2 * Math.PI);		// X rayon, Y rayon, rayon, angle de départ, 2*PI pour le cercle complet
  			ctx.fillStyle = maillotCouleur;	// couleur de fond
			ctx.fill();		// ordre de remplissage
			ctx.closePath();

			// haut
			let rectWidth = 18;
      		let rectHeight = 8;
      		let rectX = 9;
      		let rectY = 15; //12;
      		let cornerRadius = 5;

			ctx.beginPath();
			ctx.fillStyle = maillotCouleur;
			ctx.lineWidth = 1;
			ctx.moveTo(rectX + cornerRadius, rectY);
			ctx.lineTo(rectX + rectWidth - cornerRadius, rectY);
			ctx.arcTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + cornerRadius, cornerRadius);	// arrondi droite
			ctx.lineTo(rectX + rectWidth, rectY + rectHeight);	// descendre
			ctx.lineTo(rectX, rectY + rectHeight);	// horizontale basse
			ctx.lineTo(rectX, rectY + cornerRadius);	// remonter
			ctx.arcTo(rectX, rectY, rectX + cornerRadius, rectY, cornerRadius);	// arrondi gauche
			ctx.fill();		// ordre de remplissage
			ctx.closePath();

			// bas
			rectWidth = 18;
      		rectHeight = 5;
      		rectX = 9;
			rectY = (15 + 8 + 1);

			ctx.beginPath();
			ctx.fillStyle = shortCouleur;
			ctx.lineWidth = 1;

			ctx.moveTo(rectX, rectY);
			ctx.lineTo(rectX + rectWidth, rectY);
			ctx.lineTo(rectX + rectWidth, rectY + rectHeight);
			ctx.lineTo(rectX, rectY + rectHeight);
			ctx.lineTo(rectX, rectY);
			ctx.fill();		// ordre de remplissage
			ctx.closePath();
			
    }
}