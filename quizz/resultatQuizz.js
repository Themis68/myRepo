// chemins
var pathImagesCommunes = "../images/"   // images communes
var pathPosters =  "./images/posters/";		//  posters
var pathBadges = "./images/badges/";		//  badges
var pathQuizz = "./questionnaires/";		// scénarios des quizz

var myURLcomplete = document.location.href;
var myURL  = myURLcomplete.substring( 0 ,myURLcomplete.lastIndexOf( "/" ) );

var quizzId = getParametersURL("id");
var nbPointsUtilisateur = getParametersURL("reussir");
var nbPointsQuizz = getParametersURL("total");
var quizz;

// print state changes
document.addEventListener('readystatechange', ready, false);

// init page
document.addEventListener("DOMContentLoaded", init, false);		

// gestion du clic
document.addEventListener("touchstart", clickF, false);

function init() {
	// on charge les infos du quizz
	window.quizz = scenario[quizzId-1]; // le id va de 1 à n, l'index du tableau commence à 0
	poster = document.getElementById("poster");
	poster.setAttribute("src",pathPosters + (window.quizz.loi || "bases.png"));
}

function ready() {
	if (document.readyState === "complete") {
		// lancer le ring
		gestSvg(window.nbPointsUtilisateur, window.nbPointsQuizz);

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