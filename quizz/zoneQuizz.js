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

// gestion du clic
document.addEventListener("touchstart", clickF, false);	

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

function clickF(e) {
	//if(myChronoQ != undefined) {
		// on est dans le chrono
		if((e.target.id).indexOf("Prop") > 0) {
			// clic sur un des boutons de proposition
			clearTimeout(myChronoQ);	// arrêt du chrono Question sur clic utilisateur
			gestChrono("arret");
		}
	//}
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
	let objet = document.getElementsByClassName("progress-bar");
	let value = parseInt(objet[0].getAttribute("aria-valuenow"),10) + 1;	// transformation en numérique de la valeur actuelle
	if (value > nbSecondesMax) {
		// arrêter le chrono
		alert("fin");
		clearTimeout(myChronoQ);	// arrêt du chrono Question en fin de temps
		gestChrono("arret");
	} else {
		objet[0].setAttribute("aria-valuenow", (value));
		pourCent = value / nbSecondesMax * 100;
		objet[0].setAttribute("style", "width: " + pourCent + "%");
	}
}
/* fonction qui effectue un balayage en douceur de la barre de progression
function chronoQ2(nbSecondesMax) {
	let objet = document.getElementsByClassName("progress-bar");
//	let value = parseInt(objet[0].getAttribute("aria-valuenow"),10) + 1;	// transformation en numérique de la valeur actuelle
	for(let i=0; i < (1000*10); i++){
			objet[0].setAttribute("aria-valuenow", (i));
			pourCent = i / (1000 * 10)*100;
			for (let j=0; j < 000; j++) {
				// attente
			}
			objet[0].setAttribute("style", "width: " + pourCent + "%");
	}
	clearTimeout(myChronoQ);
}
*/

function gestChrono(phase) {
	switch(phase) {
		case "init":
			document.getElementsByClassName("progress")[0].style.display = "flex";	// afficher fond jauge
			document.getElementsByClassName("progress-bar")[0].style.display = "flex";	// afficher jauge
			document.getElementsByClassName("progress-bar")[0].setAttribute("aria-valuenow", 0);	// INIT valeur de la jauge
			break;
		
		case "arret":
			break;

		default:

	}
}