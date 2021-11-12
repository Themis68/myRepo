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
    // valeurs de l'état : interactive / complete
	// Cette condition évite le doublement du chargement
	if (document.readyState === "complete") {
		// 1 - on créé les vignettes du slider
		creerVignettes("holder");
		// 2 - on met à jour les attributs dynamiques des classes du Slider
		paramSlider(arrayAssoSize(scenario));
		// 3 - on lance la fonction sldier
		loadSlider();

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

function paramSlider(nbSlides) {
	// .holder
	let holder = document.getElementsByClassName("holder")[0];
	holder.style.width = (nbSlides * 100) + "%";

	// .slider-wrap
	let sliderWrap = document.getElementsByClassName("slider-wrap")[0];
	sliderWrap.style.marginLeft = ((-nbSlides * 100) /2) + "px";
	sliderWrap.style.width = (nbSlides * 100) + "px";

	// .slide div
	let slide = document.getElementsByClassName("slide");
	// .slide-wrapper
	let slideWrapper = document.getElementsByClassName("slide-wrapper");
	for(let i = 0; i < nbSlides; i++) {
		slide[i].style.width = (nbSlides * 100) + "%";
		slideWrapper[i].style.width = (100 / nbSlides) + "%";
	}
}

/*
          <div class="slide-wrapper">
            <div class="slide"><img class="slide-image" src="http://farm8.staticflickr.com/7382/8732044638_9337082fc6_z.jpg" /></div>
            <span class="temp">82</span>
          </div>
*/