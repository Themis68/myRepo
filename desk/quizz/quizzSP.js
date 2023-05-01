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
document.addEventListener("touchstart", clickF, false);		
window.addEventListener('resize', windowResize, false);
document.addEventListener('readystatechange', ready, false);

function ready() {
    // interactive
    // complete

}
function init() {
	// calcul hauteur
    matriceDevice = viewportSize();
    calculHauteur(matriceDevice.height);
	
	// création carousel
    creerVignettes("vignettes");
	// récupération infos quizz initial
	showInfosQuizz(scenario[0]);
}

function clickF(e) {
	// indicateur actuel actif
	let indicateurActif = document.querySelectorAll("li.cercle.active");
	let indexIndActif = parseInt(indicateurActif[0].id.replace("indicateur", ""), 10);
	let libelle = (e.target.id.indexOf("indicateur") >= 0 ? "indicateur" : e.target.id);
	switch(libelle)
	{
		case "prev":
			index = (indexIndActif-1 < 0 ? nbQuizz-1 : indexIndActif-1 );
			showInfosQuizz(scenario[index]);
			break;
		case "next":
			index = (indexIndActif === nbQuizz-1 ? 0 : indexIndActif+1 );
			showInfosQuizz(scenario[index]);
			break;
		case "indicateur":
			index = parseInt(e.target.id.replace("indicateur", ""), 10);
			showInfosQuizz(scenario[index]);
			break;
		default:
		
	}
}

function showInfosQuizz(quizz){
	let titreQuizz = document.getElementById("titreQuizz");
	titreQuizz.innerHTML = quizz.titre;

	let svgNiveau = document.getElementById("svgNiveau");
	svgNiveau.setAttribute("src", "../svg/niveau" + quizz.niveau + ".svg");

	let descriptionQuizz = document.getElementById("descriptionQuizz");
	descriptionQuizz.innerHTML = quizz.description;

	let loiQuizz = document.getElementById("loiQuizz");
	if (quizz.loi === undefined) {
		loiQuizz.innerHTML = "Mix de lois";
	} else {
		loiQuizz.innerHTML = "Loi " + quizz.loi + " : " +lois[quizz.loi - 1].libelle;
	}

	let btnQuizz = document.getElementById("btnQuizz");
	btnQuizz.setAttribute("href","./zoneQuizz.html?id=" + quizz.id + "&question=1");
	
	
}

function creerVignettes(id) {
	//
    // générer le vignettes dans le carousel
	//
	
	// création des indicateurs
	let ind = document.getElementById("indicateurs");
	console.log(scenario);
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
		let poster = (scenario[i].loi === undefined ? "bases.png" : "Loi_" + scenario[i].loi + ".png");
		myPoster.setAttribute("src", pathPosters + poster);

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
		//myTitle.innerHTML = scenario[i].description;

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
	}
    
}