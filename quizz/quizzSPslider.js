// initialisation matrice device
var matriceDevice = viewportSize();

// chemins
var pathImagesCommunes = "../images/"   // images communes
var pathPosters =  "./images/posters/";		//  posters
var pathBadges = "./images/badges/";		//  badges
var pathQuizz = "./questionnaires/";		// scénarios des quizz

var myURLcomplete = document.location.href;
var myURL  = myURLcomplete.substring( 0 ,myURLcomplete.lastIndexOf( "/" ) );
var nbQuizz = arrayAssoSize(scenario);

document.addEventListener("DOMContentLoaded", init, false);	
//document.addEventListener("touchstart", clickF, false);		
window.addEventListener('resize', windowResize, false);
document.addEventListener('readystatechange', ready, false);

function ready() {
    // interactive
    // complete
	if (document.readyState === "complete") {
		// Cette condition évite le doublement du chargement
		loadSlider();
		creerVignettes("holder");
	}

	//showInfosQuizz(scenario[0]);

}
function init() {
	// calcul hauteur
    matriceDevice = viewportSize();
    calculHauteur(matriceDevice.height);
}

function creerVignettes(id) {
	// création des indicateurs
	let ind = document.getElementById("indicateurs");
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
		// POSTER
		let myPoster = document.createElement("img");
		myPoster.setAttribute("class", "slide-image");
		let poster = (scenario[i].loi === undefined ? "bases.png" : "Loi_" + scenario[i].loi + ".png");
		myPoster.setAttribute("src", pathPosters + poster);

		let mySlideWrapper = document.createElement("div");
		mySlideWrapper.setAttribute("class", "slide-wrapper");

		// ajouter le POSTER
		mySlideWrapper.appendChild(myPoster);

		// titre
		let myTitle = document.createElement("span");
		myTitle.setAttribute("class", "temp");
		myTitle.innerHTML = scenario[i].description;

		// ajouter le titre
		mySlideWrapper.appendChild(myTitle);

		// ajouter à la liste des vignettes
		holder.appendChild(mySlideWrapper);
	}
}

/*
          <div class="slide-wrapper">
            <div class="slide"><img class="slide-image" src="http://farm8.staticflickr.com/7382/8732044638_9337082fc6_z.jpg" /></div>
            <span class="temp">82</span>
          </div>
*/