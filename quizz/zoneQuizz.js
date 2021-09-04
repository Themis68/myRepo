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

var questCourante = 0;

// print state changes
document.addEventListener('readystatechange', ready, false);

// init page
document.addEventListener("DOMContentLoaded", init, false);	
//document.addEventListener("DOMContentLoaded", init, false);	
//document.addEventListener("touchstart", clickF, false);	

// ne fonctionne pas sur iphone
//const btnNext = document.querySelector("#next");
//btnNext.addEventListener("touchstart", clickF, false);	



function ready() {
	if (document.readyState === "complete") {
		gestQuestion("question", script[window.questCourante]);
	}
}

function init() {
	var quizzId = getParametersURL("id");
	var quizz = scenario[quizzId-1]; // le id va de 1 à n, l'index du tableau commence à 0
	
	// ajout accès au fichier des questions	
	let myScript = document.createElement("script");
	myScript.type = "text/javascript";
	myScript.src = pathQuizz + quizz.fichier;
	document.head.appendChild(myScript);

	questCourante = 0;
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

function clickF() {

}

function gestQuestion(etape, question) {
	switch(etape) {
		case "question":
			document.getElementById("libQuestion").innerHTML = question.question.libelle;
			for (let i=0; i < 4; i++) {
				document.getElementById("prop" + (i+1)).setAttribute("onclick", 'javascript:response('+ question.reponse.solution + ',' + (i+1) +');');
				document.getElementById("libProp" + (i+1)).innerHTML = question.question.attributs[i];		// afficher les libellés des propositions
			}
			// chrono
			gestChrono("init");
			myChronoQ = setInterval(chronoQ, 1000, 7); // 7 secondes pour la lecture de la question
			break;

		default:
	}
}

function chronoQ(nbSecondesMax) {
	let jauge = document.getElementsByClassName("progress-bar");
	let value = parseInt(jauge[0].getAttribute("aria-valuenow"),10) + 1;	// transformation en numérique de la valeur actuelle
	if (value > nbSecondesMax) {
		// arrêter le chrono
		clearTimeout(myChronoQ);	// arrêt du chrono Question
	} else {
		jauge[0].setAttribute("aria-valuenow", (value));
		pourCent = value / nbSecondesMax * 100;
		jauge[0].setAttribute("style", "width: " + pourCent + "%");
	}
}

function gestChrono(phase) {
	switch(phase) {
		case "init":
			document.getElementsByClassName("progress")[0].style.display = "flex";	// afficher fond jauge
			document.getElementsByClassName("progress-bar")[0].style.display = "flex";	// afficher jauge
			document.getElementsByClassName("progress-bar")[0].setAttribute("aria-valuenow", 0);	// INIT valeur de la jauge
			break;
		
		default:

	}
}