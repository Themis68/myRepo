var version = "1.0.18";

// initialisation matrice device
var matriceDevice = viewportSize();

// chemins
var pathImagesCommunes = "../images/"   // images communes
var pathPosters =  pathImagesCommunes + "posters/";		//  posters
var pathBadges = pathImagesCommunes + "badges/";		//  badges
var pathQuizz = "../../quizz/questionnaires/";		// scénarios des quizz
var pathSVG = pathImagesCommunes + "svg/";			// images svg
var pageSuivante = "./quizzSPquestions.html";

var myURLcomplete = document.location.href;
var myURL  = myURLcomplete.substring( 0 ,myURLcomplete.lastIndexOf( "/" ) );
var nbQuizz = arrayAssoSize(scenario);

document.addEventListener("DOMContentLoaded", init, false);	
//document.addEventListener("touchstart", clickF, false);		
window.addEventListener('resize', windowResize, false);
document.addEventListener('readystatechange', ready, false);

function ready() {
    // valeurs de l'état : interactive / complete
	// Cette condition évite le doublement du chargement
	if (document.readyState === "complete") {
		// 1 - on créé les vignettes du slider
		creerVignettes("holder");
		// 2 - on met à jour les attributs dynamiques des classes du Slider
		paramSlider(arrayAssoSize(scenario));
		// 3 - on lance la fonction sldier
		loadSlider();
		// afficher les infos du quizz
		doAfterSlide(0);   

	}

	//showInfosQuizz(scenario[0]);

}
function init() {
	// calcul hauteur
    matriceDevice = viewportSize();
    calculHauteur(matriceDevice.height);
	setVersion(version);
}

function creerVignettes(id) {
	// création des indicateurs
	let ind = document.getElementById("indicateurs");
	console.log(arrayAssoSize(scenario));
	for (let i = 0; i < arrayAssoSize(scenario); i++) {
		let myInd = document.createElement("li");
		myInd.setAttribute("id", "indicateur" + i);
		myInd.setAttribute("data-target", "#carousel-example");
		myInd.setAttribute("data-slide-to", i);
		myInd.setAttribute("class", "cercle"+ (i === 0 ? '-active' : ''));
		ind.appendChild(myInd);
	}
	
	// création des vignettes
	let holder = document.getElementById(id);
	for (let i = 0; i < arrayAssoSize(scenario); i++) {
		// mySlideImage
		let mySlideImage = document.createElement("img");
		mySlideImage.setAttribute("class", "slide-image");
		let poster = (scenario[i].loi === undefined ? "bases.png" : "Loi_" + scenario[i].loi + ".png");
		mySlideImage.setAttribute("src", pathPosters + poster);

		let mySlide = document.createElement("div");
		mySlide.setAttribute("class", "slide");
		mySlide.appendChild(mySlideImage);

		let mySlideWrapper = document.createElement("div");
		mySlideWrapper.setAttribute("class", "slide-wrapper");

		// ajouter le POSTER
		mySlideWrapper.appendChild(mySlide);

		// ajouter à la liste des vignettes
		holder.appendChild(mySlideWrapper);
	}
}


function doAfterSlide(indexQuizz){
	// indexQuizz
	// récupérer le quizz sélectionné
	quizz = scenario[indexQuizz];

	// titre du quizz
	let titreQuizz = document.getElementById("titreQuizz");
	titreQuizz.innerHTML = quizz.titre;

	// niveau du quizz
	let svgNiveau = document.getElementById("svgNiveau");
	svgNiveau.setAttribute("src", pathSVG + "niveau" + quizz.niveau + ".svg");

	// description du quizz
	let descriptionQuizz = document.getElementById("descriptionQuizz");
	descriptionQuizz.innerHTML = quizz.description;

	// loi liée au quizz éventuellement
	let loiQuizz = document.getElementById("loiQuizz");
	if (quizz.loi === undefined) {
		loiQuizz.innerHTML = "Mix de lois";
	} else {
		loiQuizz.innerHTML = "Loi " + quizz.loi + " : " +lois[quizz.loi - 1].libelle;
	}

	// bouton de lancement
	let btnQuizz = document.getElementById("btnQuizz");
	btnQuizz.setAttribute("href", pageSuivante + "?id=" + quizz.id + "&question=1");

	// afficher la zone d'informations
	document.getElementsByClassName("infosQuizz")[0].style.display = "flex";
	
}