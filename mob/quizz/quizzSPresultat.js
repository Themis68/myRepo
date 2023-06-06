const version = "1.0.20";

// initialisation matrice device
var matriceDevice = viewportSize();

// chemins
var pathImagesCommunes = "../../images/"   // images communes
var pathPosters =  "../../images/posters/";		//  posters
var pathBadges = "../../images/badges/";		//  badges
var pathQuizz = "../../quizz/questionnaires/";		// scénarios des quizz

var myURLcomplete = document.location.href;
var myURL  = myURLcomplete.substring( 0 ,myURLcomplete.lastIndexOf( "/" ) );

// parametres
var idQuizz = getParametersURL("id");
var nbPointsUtilisateur = getParametersURL("reussir");
var nbPointsMax = getParametersURL("total");
var infosQuizz = undefined;

var user =  "paulo.pires-seixas@laposte.net";

// print state changes
document.addEventListener('readystatechange', ready, false);

// init page
document.addEventListener("DOMContentLoaded", init, false);		

// gestion du clic
document.addEventListener("touchstart", clickF, false);

function init() {
	 // calcul hauteur
	 matriceDevice = viewportSize();
	 calculHauteur(matriceDevice.height - 200);
	 setVersion(version);

	// on charge les infos du quizz
	quizzId = getParametersURL("id");
	// le id va de 1 à n, l'index du tableau commence à 0
	getInfoQuizz(quizzId-1);
}

function ready() {
	if (document.readyState === "complete") {
		// lancer le ring
		gestSvg(window.nbPointsUtilisateur, window.nbPointsMax);
		setLibelle("asi-title","LAB_D002");

	}
}

function clickF(e) {
	if (e.target.id === "btnMail") {
		envoyerMail(window.idQuizz);
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
  	titreSvg.innerHTML = reussite + "/" + total;

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

function getInfoQuizz(indexQuizz){
	// indexQuizz
	// récupérer le quizz sélectionné
	infosQuizz = scenario[indexQuizz];

	// titre du quizz
	let titreQuizz = document.getElementById("titreQuizz");
	titreQuizz.innerHTML = infosQuizz.titre;

	// niveau du quizz
	let svgNiveau = document.getElementById("svgNiveau");
	svgNiveau.setAttribute("src", "../../images/svg/niveau" + infosQuizz.niveau + ".svg");

	// description du quizz
	let descriptionQuizz = document.getElementById("descriptionQuizz");
	descriptionQuizz.innerHTML = infosQuizz.description;

	// loi liée au quizz éventuellement
	let loiQuizz = document.getElementById("loiQuizz");
	if (infosQuizz.loi === undefined) {
		loiQuizz.innerHTML = "Mix de lois";
	} else {
		loiQuizz.innerHTML = "Loi " + infosQuizz.loi + " : " +lois[infosQuizz.loi - 1].libelle;
	}

	// bouton de lancement
	let btnQuizz = document.getElementById("btnGameOver");
	btnQuizz.setAttribute("href","./quizzSPslider.html?id=" + infosQuizz.id + "&question=1");

	poster = document.getElementById("imgPoster");
	poster.setAttribute("src",pathPosters + (infosQuizz.loi || "bases.png"));

	// afficher la zone d'informations
	document.getElementsByClassName("infosQuizz")[0].style.display = "flex";
	
}

function envoyerMail(idQuizz){
	let saut = '<br>';

	// récupérer le quizz sélectionné
	infosQuizz = scenario[idQuizz-1];

	let body = "envoyé par " + window.user + saut;
	body += "titre du Quizz : " + infosQuizz.titre + saut;
	body += "description du quizz : " + infosQuizz.description + saut;
	body +=  "niveau du quizz : " + infosQuizz.niveau + saut;
	body +=  "loi du quizz : " + infosQuizz.loi + saut;

	body += "réussite : " + window.nbPointsUtilisateur + " sur " + window.nbPointsMax + saut;
	window.open('mailto:arretsurimage_%40laposte.net?subject=' + infosQuizz.titre + '&body=' + body);
}