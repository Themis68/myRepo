// chemins
var pathImagesCommunes = "../images/"   // images communes
var pathPosters =  "./images/posters/";		//  posters
var pathBadges = "./images/badges/";		//  badges
var pathQuizz = "./questionnaires/";		// scénarios des quizz
var pathSvg = "../svg/";

var myURLcomplete = document.location.href;
var myURL  = myURLcomplete.substring( 0 ,myURLcomplete.lastIndexOf( "/" ) );

document.addEventListener("DOMContentLoaded", init, false);	
let prev = document.getElementById("prev");
prev.addEventListener("click", clickF, false);
let next = document.getElementById("next");
next.addEventListener("click", clickF, false);


function clickF(e){
	switch(e.target.id) {

	case "prev":
		break;
	case "next":
		break;
	default :
		// indicateur direct
	}
}
function init() {
    creerVignettes("vignettes");
	showInfosQuizz(scenario[0]);
}

function showInfosQuizz(quizz){
	// quizz : scenario[index]
	alert(quizz.titre);
	var resultat = document.getElementById("title1");

	var svgInfo = document.createElement("img");
	svgInfo.setAttribute("id","svgInfo");
	svgInfo.setAttribute("src", pathSvg + "info.svg");
	svgInfo.setAttribute("width","10%");
	svgInfo.setAttribute("height","10%");
	resultat.appendChild(svgInfo);

	var titreQuizz = document.createElement("span");
	titreQuizz.setAttribute("id","titreQuizz");
	titreQuizz.className = "titreQuizz";
	titreQuizz.innerHTML = quizz.titre;
	resultat.appendChild(titreQuizz);
/*

	let resultat2 = document.getElementById("title2");

	let svgNiveau = document.createElement("img");
	svgNiveau.setAttribute("id","svgInfo");
	svgNiveau.setAttribute("src", pathSvg + "niveau" + quizz.niveau +".svg");
	svgNiveau.setAttribute("width","10%");
	resultat2.appendChild(svgNiveau);

	let descriptionQuizz = document.createElement("span");
	descriptionQuizz.setAttribute("id","descriptionQuizz");
	descriptionQuizz.className = "descriptionQuizz";
	descriptionQuizz.innerHTML = quizz.description;
	resultat2.appendChild(descriptionQuizz);
*/
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
		myInd.setAttribute("data-slide-to", i);
		myInd.setAttribute("class", "cercle"+ (i === 0 ? ' active' : ''));
		ind.appendChild(myInd);
	}

    
	// création des vignettes
	let vignettes = document.getElementById(id);
	
	for (let i = 0; i < arrayAssoSize(scenario); i++) {

		// POSTER
		let myPoster = document.createElement("img");
		myPoster.setAttribute("class", "img-fluid mx-auto d-flex");	// nécessaire poour l'affichage des vignettes
		myPoster.setAttribute("src", pathPosters + scenario[i].poster || "./images/stade.jpg");

		// assemblage fanion et svg
		// badge SVG
		var mySvg = document.createElementNS('http://www.w3.org/2000/svg','svg');
		mySvg.setAttribute('height','148');
		mySvg.setAttribute('width','105');
		mySvg.setAttribute('id','quizz' + scenario[i].id );
		
		var svgimg = document.createElementNS('http://www.w3.org/2000/svg','image');
		svgimg.setAttribute('height','100%');
		svgimg.setAttribute('width','100%');
		svgimg.setAttribute('href', pathBadges + "badge" + scenario[i].niveau + ".svg"  || "./images/fff.png");

		mySvg.appendChild(svgimg);

		// titre
		let myTitle = document.createElement("p");
		myTitle.setAttribute('id','title' + scenario[i].id );

		// caption
		let myCaption = document.createElement("div");
		myCaption.setAttribute("class", "carousel-caption");
		myCaption.appendChild(mySvg);


		// div
		let myVignette = document.createElement("div");
		myVignette.setAttribute("class", "carousel-item" + (i === 0 ? ' active':''));

		// assembler la vignette
		myVignette.appendChild(myTitle);
		myVignette.appendChild(myPoster);


		// ajouter à la liste des vignettes
		vignettes.appendChild(myVignette);
		/*
		let myScript = document.createElement("SCRIPT");
		myScript.setAttribute("type", "text/javascript");
		myScript.setAttribute("src", pathQuizz + scenario[i].fichier);
		document.head.appendChild(myScript);
		*/
	}
    
}