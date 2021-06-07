// chemins
var pathImagesCommunes = "../images/"   // images communes
var pathPosters =  "./images/posters/";		//  posters
var pathBadges = "./images/badges/";		//  badges
var pathQuizz = "./questionnaires/";		// scénarios des quizz

var myURLcomplete = document.location.href;
var myURL  = myURLcomplete.substring( 0 ,myURLcomplete.lastIndexOf( "/" ) );

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
	//	myInd.setAttribute("id", "indicateur" + i);
		myInd.setAttribute("data-target", "#carousel-example");
		myInd.setAttribute("data-slide-to", i);
		myInd.setAttribute("class", "cercle"+ (i === 0 ? ' active' : ''));
		ind.appendChild(myInd);
	}

    
	// création des vignettes
	let vignettes = document.getElementById(id);
	
	for (let i = 0; i < arrayAssoSize(scenario); i++) {

		try {
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

		// caption
		let myCaption = document.createElement("div");
		myCaption.setAttribute("class", "carousel-caption");
		myCaption.appendChild(mySvg);

		// div
		let myVignette = document.createElement("div");
		myVignette.setAttribute("class", "carousel-item" + (i === 0 ? ' active':''));

		// assembler la vignette
		myVignette.appendChild(myCaption);
		myVignette.appendChild(myPoster);


		// ajouter à la liste des vignettes
		vignettes.appendChild(myVignette);
		/*
		let myScript = document.createElement("SCRIPT");
		myScript.setAttribute("type", "text/javascript");
		myScript.setAttribute("src", pathQuizz + scenario[i].fichier);
		document.head.appendChild(myScript);
		*/
		} catch (err) {
			alert(err);
		}
	}
    
}