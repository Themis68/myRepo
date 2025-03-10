const version = "1.0.19";

var paramsURL = "";

// initialisation matrice device
var matriceDevice = viewportSize();

// chemins
var pathImagesCommunes = "../images/"   // images communes
var pathPosters =  pathImagesCommunes + "posters/";		//  posters
var pathBadges = pathImagesCommunes + "badges/";		//  badges
var pathQuizz = "./questionnaires/";		// scénarios des quizz
var pathSVG = pathImagesCommunes + "svg/";			// images svg
var pageSuivante = "./quizzSPquestions.html";					// fichiers langues
var myURLcomplete = document.location.href;
var myURL  = myURLcomplete.substring( 0 ,myURLcomplete.lastIndexOf( "/" ) );
var nbQuizz = arrayAssoSize(scenario);	

document.addEventListener('readystatechange', ready, false);
document.addEventListener("DOMContentLoaded", init, false);	
window.addEventListener('load', windowLoaded, false); 
window.addEventListener('resize', windowResize, false);

function ready() {
    // valeurs de l'état : interactive / complete
	// Cette condition évite le doublement du chargement
	if (document.readyState === "complete") {
		// window.LG_menu_title.innerHTML
		console.log("5 - event");
		// 1 - on créé les vignettes du slider
		let nbSlides = creerVignettes("holder", LG_etatModule, LG_langUsed);
		// 2 - on met à jour les attributs dynamiques des classes du Slider
		// paramSlider(arrayAssoSize(scenario));
		paramSlider(nbSlides);
		// 3 - on lance la fonction slider
		loadSlider();
		// afficher les infos du quizz
		doAfterSlide(0);
	} else {
		console.log("1 - event");
	}
}


function init() {
	console.log("3 - event");

	// calcul hauteur
    matriceDevice = viewportSize();
    calculHauteur(matriceDevice.height);
	setVersion(version);
	paramsURL = getParameters();	// on récupère un tableau associatif depuis les paramètres de l'URL
	//selectLangue(pathLangues, paramsURL.lang);	// on charge les chaines dns la langue souhaitée
}

function windowLoaded() {
    console.log("7 - event");
    // LANG : appeler l'initialisation
}

function creerVignettes(id, etatModuleLang, langueUtilisee) {
	// indicateurs
	let ind = document.getElementById("indicateurs");
	// vignettes
	let holder = document.getElementById(id);
	// nombre de quizz conservés
	let iteQuizz = 0;

	for (let i = 0; i < arrayAssoSize(scenario); i++) {
		// on verifie si le quizz doit être conservé

		if (etatModuleLang === true && scenario[i].multilangue.indexOf(langueUtilisee) >= 0 ){
			// création des indicateurs		
			//for (let i = 0; i < arrayAssoSize(scenario); i++) {
			let myInd = document.createElement("li");
			myInd.setAttribute("id", "indicateur" + iteQuizz);
			myInd.setAttribute("data-target", "#carousel-example");
			myInd.setAttribute("data-slide-to", iteQuizz);
			myInd.setAttribute("class", "cercle"+ (iteQuizz === 0 ? '-active' : ''));
			ind.appendChild(myInd);
			//}
		
			// création des vignettes
			//for (let i = 0; i < arrayAssoSize(scenario); i++) {
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
			//}
			iteQuizz++;
		}
	}
	return iteQuizz;
}


function doAfterSlide(indexQuizz){
	// indexQuizz
	// récupérer le quizz sélectionné
	quizz = scenario[indexQuizz];

	// niveau du quizz
	let niveau = "";
	for(let i=0; i < quizz.niveau; i++){
		niveau += "<img src='../images/etoile.png' />";
	}

	// loi liée au quizz éventuellement
	let loi = "";
	if (quizz.loi === undefined) {
		loi = "Mix de lois";
	} else {
		loi = "Loi " + quizz.loi + " : " +lois[quizz.loi - 1].libelle;
	}

	// multilangue
	let tabLangue = quizz.multilangue.split(",");

	const codeHtml = `
		<span class="quizz_name" id="titreQuizz">${quizz.titre}</span>

		<div class="quizz-options">
			<strong>DESCRIPTION</strong>
			<span id="niveauQuizz">Niveau ${niveau}</span>
			<span id="descriptionQuizz">${quizz.description}</span>
			<span id="loiQuizz">${loi}</span>
			<strong>LANGUES</strong>
			${LG_getLanguesOfQuizz(tabLangue)}
        </div>`

	let statsContainer = document.getElementById("stats-container");
	statsContainer.innerHTML = codeHtml;

	// bouton de lancement
	let btnQuizz = document.getElementById("btnQuizz");
	btnQuizz.setAttribute("href", pageSuivante + "?lang=" + paramsURL.lang + "&id=" + quizz.id + "&question=1");

	// afficher la zone d'informations
	document.getElementsByClassName("stats")[0].style.display = "flex";

	
}