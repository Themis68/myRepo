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
	alert("quizz "+ quizz.titre);
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