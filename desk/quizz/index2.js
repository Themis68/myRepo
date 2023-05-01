var catalogue = [];
var quizz = [];	// quizz en cours
// var scripts = [];
//var actions = [];
var timeCode = '';
var avatar = '';
var myURLcomplete = document.location.href;
var myURL  = myURLcomplete.substring( 0 ,myURLcomplete.lastIndexOf( "/" ) );
var quizzNbPoint = 0;		// nb points en cours
//var stepBarre = 0;			// % de progression pour une Question
//var stepDone = 0;			// % de progression effectué
//var idQuizz = null;		// quizz en cours

var tabMessages = [
	"cliquez sur la vignette du quizz que vous souhaitez jouer",
	"cliquez sur cet icône pour afficher les quizz disponibles",
	"vous allez démarrer le quizz pour obtenir le niveau ",
	"vous venez de terminer le quizz<br>Votre score est de <b>",
	"Sélectionnez un nouveau quizz.",
	"(Pour rappel : Au football, les lois du jeu sont au nombre de 17)"
];
var nbQuests = [
	{niv: "COURANT", nb: 0, points: 0},
	{niv: "DEBUTANT", nb: 0, points: 0},
	{niv: "CONFIRME", nb: 0, points: 0}
];		// le niveau 0 est le niveau en cours
var niveauQuest = 1		//niveau par défaut au démarrage
//var questionsFaites = [];
//var seqUsed = -1;	// valeur de l'étape de la séquence qui a été traitée
//var hauteurContent = 0; // hauteur de la zone CONTENT récupérée lors du chargement
var questionOn = 0;	// numero de la Question
var tabQuestions = [];	// questions du quizz

// chemins
var pathImagesASI = "../images/";		// autres images
//var pathQuizz = "./";		// scénarios des quizz
var pathBadges = "./images/badges/";		//  badges : UTILISER ENCIRE UNE FOIS DANS LE CODE

document.addEventListener("DOMContentLoaded", init, false);	// lance l'écoute des évènements et appelle INIT
//window.MediaQueryList.addListener(lookScreen);

window.addEventListener("resize", function(){
	console.log("window.screen : ", window.screen.width , window.screen.height);
});


function init() {
    //
    // est appelé en premier par la page lors du chargement
	//

	user();
	header();
	// clic sur l'image de bascule
	var bascule = document.querySelector("bascule img");
	// mettre les listener ici car il faut avoir chargée la page
	bascule.addEventListener("click", fBascule);	// de haut en bas
	buildCarousel(myURL + '/catalogue.json');
	footer();
}

function buildCarousel(path) {
	let request = new XMLHttpRequest();
	let requestURL = path;
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
	request.onload = function() {
		creerVignettesNew(request.response);  // OBLIGATOIRE pour transettre la veleur de la fonction locale à la variable globale
	}
}

function creerVignettesNew(quizzCatalogue) {
	catalogue = quizzCatalogue;	// OBLIGATOIRE pour transettre la veleur de la fonction locale à la variable globale

	// objet à transmettre
	monCarousel = {
		cat: catalogue.quizz,
		htmlCarName: document.getElementById("vignettes"),
		htmlIndName: document.getElementById("indicateurs"),
		posterPath: "./images/posters/",	//  posters
		badgePath: "./images/badges/"		//  badges
	}
	// créer vignette
	xCarousel("addQuizz",monCarousel);
}

function fBascule(event) {
	let carousel = document.querySelector("carousel");
	let span = document.querySelector("bascule span");

	document.getElementById("content").style.display = "none";

	if (this.src.indexOf("fermee") > 0 ){
		// on ouvre

		carousel.style.display = "flex";
		this.src = pathImagesASI + "fleche_ouverte.png";
		this.alt = "affiche la liste des quizz";
		span.innerHTML = avatar + " " + tabMessages[0];
	} else {
		carousel.style.display = "none";
		this.src = pathImagesASI + "fleche_fermee.png";
		this.alt = "masque la liste des quizz";
		span.innerHTML = avatar + " " + tabMessages[1];
	}	
}