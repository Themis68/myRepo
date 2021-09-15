// chemins
var pathImagesCommunes = "../images/"   // images communes
var pathPosters =  "./images/posters/";		//  posters
var pathBadges = "./images/badges/";		//  badges
var pathQuizz = "./questionnaires/";		// scénarios des quizz

var myURLcomplete = document.location.href;
var myURL  = myURLcomplete.substring( 0 ,myURLcomplete.lastIndexOf( "/" ) );

var nbQuests = [
	{niv: "COURANT", nb: 0, points: 0},
	{niv: "DEBUTANT", nb: 0, points: 0},
	{niv: "CONFIRME", nb: 0, points: 0}
];		// le niveau 0 est le niveau en cours

var indexQuestion = 0;

// on récupère le id du quizz
var quizzId = getParametersURL("id");

// print state changes
document.addEventListener('readystatechange', ready, false);

// init page
document.addEventListener("DOMContentLoaded", init, false);		

// gestion du clic
document.addEventListener("touchstart", clickF, false);	

// ne fonctionne pas sur iphone

document.getElementById("jauge").addEventListener("blur", function(){
	displayPage();
}, false);	


function displayPage() {
	alert("jauge");
}

function init() {
	
	// on récupère le numéro de la question a traiter
	window.indexQuestion = getParametersURL("question");
	// on charge le quizz
	var quizz = scenario[quizzId-1]; // le id va de 1 à n, l'index du tableau commence à 0
	// ajout accès au fichier des questions	
	let myScript = document.createElement("script");
	myScript.type = "text/javascript";
	myScript.src = pathQuizz + quizz.fichier;
	document.head.appendChild(myScript);
}

function ready() {
	if (document.readyState === "complete") {
		gestChrono("");
	}
}

function getParametersURL(param){
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}

function clickF(e) {
	if((e.target.id).indexOf("Prop") > 0) {
		// clic sur un des boutons de proposition
		gestChrono("R");
	}
}

function chrono(nbSecondesMax) {
	let btnJauge = document.getElementById("jauge");
	let value = parseInt(btnJauge.getAttribute("aria-valuenow"),10) + 1;	// transformation en numérique de la valeur actuelle
	if (value > nbSecondesMax) {
		// arrêter le chrono
		switch(btnJauge.dataset.use) {
			case "" :
				btnJauge.dataset.use = "P";
				break;

			case "P" :
				btnJauge.dataset.use = "R";
				break;
		}
		gestChrono(btnJauge.dataset.use);
	} else {
		btnJauge.setAttribute("aria-valuenow", value);
		pourCent = Math.round(value / nbSecondesMax * 100);
		btnJauge.setAttribute("style", "width: " + pourCent + "%");
	}
}

function gestChrono(phase) {
	btnJauge = document.getElementById("jauge");

	switch(phase) {
		case "":
			// récupère la question
			question = window.script[window.indexQuestion];
			// libellé question
			document.getElementById("libQuestion").innerHTML = question.question.libelle;
			// on masque les propositions
			document.getElementById("propositions").style.display = "none";
			// INIT valeur de la jauge
			btnJauge.setAttribute("aria-valuenow", 0);	
			// chrono
			myChrono = setInterval(chrono, 1000, parseInt(question.question.temps, 10));
			break;

		case "P":
			// INIT valeur de la jauge
			btnJauge.setAttribute("aria-valuenow", 0);
			// arrêt chrono	
			clearInterval(myChrono);
			// afficher les libellés des propositions
			document.getElementById("propositions").style.display = "flex";
			for (let i=0; i < 4; i++) {
				document.getElementById("libProp" + (i+1)).innerHTML = question.question.attributs[i];	
			}

			btnJauge.dataset.use = "P";
			// chrono
			myChrono = setInterval(chrono, 1000, parseInt(question.reponse.temps, 10));
			break;
		
		case "R":
			// INIT valeur de la jauge
			btnJauge.setAttribute("aria-valuenow", 0);
			btnJauge.setAttribute("style", "width: 0%");
			btnJauge.dataset.use = "";
			// arrêt chrono	
			clearInterval(myChrono);
			for (let i=0; i < 4; i++) {
				document.getElementById("libProp" + (i+1)).style.display = ((i+1) === parseInt(question.reponse.solution, 10) ? "flex" : "none");
			}
			// on incrémente la question
			window.indexQuestion++;
			indexQuestionSuivante = script[window.indexQuestion];
			if (indexQuestionSuivante === undefined) {
				// quizz fini
				buildRing("ring");
			} else {
				// affichage bouton question suivante
				let btnQuestion = document.getElementById("btnQuestion");
				btnQuestion.style.display = "flex";
				// récupérer le quizzID ou la URL en cours
				// appeler le gestChrono avec la nouvelle question
				btnQuestion.setAttribute("href","./zoneQuizz.html?id=" + window.quizzId + "&question=" + window.indexQuestion);
			}
			break;

		default:

	}
}

function buildRing(idObjet){
	let objet = document.getElementById(idObjet);
	objet.style.display = "flex";
}