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

// variable d'une question
var indexQuestion = 1;
var nbPointsUtilisateur = 0;
var nbPointsQuizz = 0;
var question;
var script;

// on récupère le id du quizz
var quizzId = getParametersURL("id");

// print state changes
document.addEventListener('readystatechange', ready, false);

// init page
document.addEventListener("DOMContentLoaded", init, false);		

// gestion du clic
document.addEventListener("touchstart", clickF, false);

// ne fonctionne pas sur iphone
/*document.getElementById("jauge").addEventListener("blur", function(){
	displayPage();
}, false);	
*/

function displayPage() {
	alert("jauge");
}

function init() {
	// on récupère le numéro de la question a traiter
	window.indexQuestion = getParametersURL("question");
	// on charge le quizz
	window.quizz = scenario[quizzId-1]; // le id va de 1 à n, l'index du tableau commence à 0
	// ajout accès au fichier des questions	
	let myScript = document.createElement("script");
	myScript.type = "text/javascript";
	myScript.src = pathQuizz + quizz.fichier + "?n=1" ; 
	document.head.appendChild(myScript);
}

function ready() {
	if (document.readyState === "complete") {
		gestChrono("","");
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
	if (e.target.id === "btnQuestion") {
		document.getElementById(e.target.id).style.display = "none";
		window.indexQuestion++;	// on passe à la question suivante
		gestChrono("","");	// on reinitialisae la page avec les bons éléments
	}

	if((e.target.id).indexOf("Prop") > 0) {
		// clic sur un des boutons de proposition
		gestChrono("R", e.target.id);
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
				data = "";
				break;

			case "P" :
				btnJauge.dataset.use = "R";
				data = "";
				break;
		}
		gestChrono(btnJauge.dataset.use, data);
	} else {
		btnJauge.setAttribute("aria-valuenow", value);
		pourCent = Math.round(value / nbSecondesMax * 100);
		btnJauge.setAttribute("style", "width: " + pourCent + "%");
	}
}

function gestChrono(phase, data) {
	btnJauge = document.getElementById("jauge");

	switch(phase) {
		case "":
			// récupère la question
			window.question = window.script[window.indexQuestion-1];
			// libellé question
			document.getElementById("libQuestion").innerHTML = window.question.question.libelle;
			// on masque les propositions
			document.getElementById("propositions").style.display = "none";
			// INIT valeur de la jauge
			btnJauge.setAttribute("aria-valuenow", 0);	
			// chrono
			myChrono = setInterval(chrono, 1000, parseInt(window.question.question.temps, 10));
			break;

		case "P":
			// INIT valeur de la jauge
			btnJauge.setAttribute("aria-valuenow", 0);
			// arrêt chrono	
			clearInterval(myChrono);
			// afficher les libellés des propositions
			document.getElementById("propositions").style.display = "flex";
			for (let i=0; i < 4; i++) {
				document.getElementById("libProp" + (i+1)).innerHTML = window.question.question.attributs[i];	
				document.getElementById("libProp" + (i+1)).style.display = "flex";
			}

			btnJauge.dataset.use = "P";
			// chrono
			myChrono = setInterval(chrono, 1000, parseInt(window.question.reponse.temps, 10));
			break;
		
		case "R":
			// INIT valeur de la jauge
			btnJauge.setAttribute("aria-valuenow", 0);
			btnJauge.setAttribute("style", "width: 0%");
			btnJauge.dataset.use = "";
			// arrêt chrono	
			clearInterval(myChrono);
			for (let i=0; i < 4; i++) {
				document.getElementById("libProp" + (i+1)).style.display = ((i+1) === parseInt(window.question.reponse.solution, 10) ? "flex" : "none");
			}

			// gestion des points
			// points du quizz
			pointsQuestion = parseInt(window.question.reponse.points, 10);

			window.nbPointsQuizz = window.nbPointsQuizz + pointsQuestion;
			if(data == "libProp" + window.question.reponse.solution) {
				// points de l'utilisateur
				window.nbPointsUtilisateur = window.nbPointsUtilisateur + pointsQuestion;
			}
			// derniere question ?
			let btnQuestion = document.getElementById("btnQuestion");
			indexQuestionSuivante = window.script[window.indexQuestion];
			if (indexQuestionSuivante === undefined) {
				//quizz fini	
				gestSvg(window.nbPointsUtilisateur, window.nbPointsQuizz);
			} else {
				// affichage bouton question suivante		
				btnQuestion.style.display = "flex";
			}
			break;

		default:

	}
}

function gestSvg(reussite, total) {
	// calcul pourcentge réussite
	let offset = reussite / total * 100;

	// afficher réussite
	var titreSvg = document.querySelector("text");
  	titreSvg.innerHTML = reussite;

	  // récupérer le rayon du SVG
	let circle = document.getElementById("my-circle");
	let rayon = circle.getAttribute("r");

	// calculer la section de réussite
	let b = Math.PI * rayon * 2; 
	let a = offset * b / 100;		
	circle.setAttribute("stroke-dasharray", a + " "+ b);
	
	// afficher le svg
	let svg = document.querySelector("svg");
	svg.style.display = "flex";

	// lancer l'animation
	let animate = document.querySelector("animate");
	animate.setAttribute("to", a);
	animate.beginElement();
}