// chemins
var pathImagesCommunes = "../images/"   // images communes
var pathPosters =  "./images/posters/";		//  posters
var pathBadges = "./images/badges/";		//  badges
var pathQuizz = "./questionnaires/";		// scénarios des quizz

document.addEventListener("DOMContentLoaded", init, false);	
 
function init() {
    // mise en place du carousel
    //var car = document.querySelector("carousel");
   // car.innerHTML = templateHTML();
    creerVignettes("vignettes");
}

function creerVignettes(id) {
	//
    // générer le vignettes dans le carousel
	//
	
	// création des indicateurs
	let ind = document.getElementById("indicateurs");
	for (let i = 0; i < arrayAssoSize(scenario); i++) {
		let myInd = document.createElement("li");
		myInd.setAttribute("id", "indicateur" + i);
		myInd.setAttribute("data-target", "#carousel-example");
		myInd.setAttribute("data-slide-to",i);
		myInd.setAttribute("class", (i === 0 ? "cercle active" : "cercle"));
		ind.appendChild(myInd);
	}

    /*
	// création des vignettes
	let bloc = document.getElementById(id);
	
	for (let i = 0; i < arrayAssoSize(scenario); i++) {

		// div
		let myDiv = document.createElement("div");
		myDiv.className = "carousel-item" + (i === 0?' active':'');

		// img
		let myImg = document.createElement("img");
		myImg.className = "img-fluid mx-auto d-block";
		myImg.setAttribute("alt", "img" + i);
		myImg.setAttribute("title", "img" + i);
		myImg.setAttribute("src", pathPosters + (scenario[i].poster || pathImages + "stade.jpg"));

		// caption
		let myCaption = document.createElement("div");

		// badge
		let myF = document.createElement("img");
		myF.className = "carouselFanion";
		myF.setAttribute("title", "niveau : " + nbQuests[scenario[i].niveau].niv);
		myF.setAttribute("src", pathBadges + "badge" +(scenario[i].niveau + ".png" || pathImagesCommunes + "fff.png'"));
		myCaption.appendChild(myF);
		
		let myP = document.createElement("p");    
		myP.innerHTML = scenario[i].titre + " (" + (scenario[i].loi === undefined ? "mix" : "loi " + scenario[i].loi) +")";
		myCaption.appendChild(myP);
		myCaption.className = "carousel-caption d-none d-md-block titre";
		myCaption.setAttribute("onclick", 'javascript:switchQuizz('+ scenario[i].id +');');	// mettre ici car cette DIV est au-dessus de l'image

		myDiv.appendChild(myImg);
		myDiv.appendChild(myCaption);

		bloc.appendChild(myDiv);

		let myScript = document.createElement("SCRIPT");
		myScript.setAttribute("type", "text/javascript");
		myScript.setAttribute("src", pathQuizz + scenario[i].fichier);
		document.head.appendChild(myScript);
	}
    */
}