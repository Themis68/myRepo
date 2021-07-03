// chemins
var pathImagesCommunes = "../images/"   // images communes
var pathPosters =  "./images/posters/";		//  posters
var pathBadges = "./images/badges/";		//  badges
var pathQuizz = "./questionnaires/";		// scénarios des quizz

var myURLcomplete = document.location.href;
var myURL  = myURLcomplete.substring( 0 ,myURLcomplete.lastIndexOf( "/" ) );

document.addEventListener("DOMContentLoaded", init, false);	
document.addEventListener("touchstart", clickF, false);	

// ne fonctionne pas sur iphone
//const btnNext = document.querySelector("#next");
//btnNext.addEventListener("touchstart", clickF, false);	
 
function init() {
	var quizzId = getParametersURL("id");
	var quizz = scenario[quizzId-1]; // le id va de 1 à n, l'idnex du tableau commence à 0
	
	// ajout accès au fichier des questions	
	let myScript = document.createElement("script");
	myScript.type = "text/javascript";
	//myScript.setAttribute("src", pathQuizz + quizz.fichier);
	myScript.src = pathQuizz + quizz.fichier;
	document.head.appendChild(myScript);

	// à ce stade les questions sont chargées dans la variable "script"	
}

function chargerQuestions() {
	alert(script[0].question.libelle);
}

function clickF() {
	chargerQuestions(); // on contrôle le chargement des questions
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