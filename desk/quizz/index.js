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

// **********************************************************************************************************

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

function showContent(etat) {
	// ce n'est appelé que si on peut voir les vignettes car c'ets le clic dessus quki affiche !!!!
	let carousel = document.getElementById("carousel");

	// le DISPLAY du CAROUSEL a un effet sur la taille de CONTENT qui s'agrandit mais qui dépasse FOOTER
	carousel.style.display =  (etat === true ? "none" : "flex");

	let bascule_img = document.querySelector("bascule img");
	bascule_img.setAttribute("src",pathImagesASI  +   (etat === true ? "fleche_fermee.png" : "fleche_ouverte.png"));	// MAJ icone bascule

	let bascule_titre = document.querySelector("bascule span");
	bascule_titre.innerHTML = avatar + " " + (etat === true ? tabMessages[1] : tabMessages[0]);
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

function switchQuizz(n) {
	if (n > catalogue.quizz.length) {
		// vérifie si l'index du quizz existe dans le fichier catalogue.js
		n = 0;
		return false;
	} else {
		quizz = catalogue.quizz[n-1];    		// recup infos du quizz
		let path = myURL + '/questionnaires/' + catalogue.quizz[n].fichier;

		// récupérer les questions du quizz selectionné
		let request = new XMLHttpRequest();
		let requestURL = path;
		request.open('GET', requestURL);
		request.responseType = 'json';
		request.send();
		request.onload = function() {
			selectQuizz(request.response);
		}
	}
}

function selectQuizz(quizzInfos){
	tabQuestions = quizzInfos.quizz	// recup questions du quizz

	// affichage de la zone INTER
	showContent(true);
	gestionBoard("selectQuizz", quizz);	// on passe les infos sur le quizz sélectionné

}

function gestionBoard(etape, objet) {
	let inter = document.querySelector("inter");
	switch (etape) {
		case "selectQuizz":
			//objet = scenario
			document.getElementById("content").style.display = "flex";
			document.querySelector("inter tete titre p").innerHTML = objet.titre;
			gestNiveaux(objet.niveau);		// calcul des niveaux
			scanQuestion(objet.niveau);	// analyse du scénario
			document.getElementsByClassName("progress-bar")[0].style.display = "none";
            document.querySelector("inter question p").style.display = "none";
			document.querySelector("inter propositions").style.display = "none";
			document.querySelector("inter complement").style.display = "flex";
			
			let texte = avatar + " "+ tabMessages[2] + " " + nbQuests[niveauQuest].niv + "<br>";

			texte += "Ce quizz de " +  nbQuests[niveauQuest].nb  +" question"+(nbQuests[niveauQuest].nb > 1 ? "s" : "");
			texte += " porte sur " + (objet.loi === undefined ? "un mix de lois" : "la loi "+ objet.loi+" - " + lois[parseFloat(objet.loi)-1].libelle)+ "<br>";
			texte += tabMessages[5];
			document.querySelector("inter complement p").innerHTML = texte;

			document.querySelector("inter complement img").style.display = "none";
			// score
			document.querySelector("inter tete score p").style.display = "none";
			addScore(0);	// on init même si c'est masqué
			// next
			document.querySelector("inter suite next").style.display = "flex";
			document.querySelector("inter suite chrono").style.display = "none";

			document.querySelector("inter").style.display = "flex";
			break;
		
		case "InterQuestion":
			// objet = question
			// complement
			document.querySelector("inter complement").style.display = "none";
			// score
			document.querySelector("inter tete score p").style.display = "none";
			// propositions
			document.querySelector("inter propositions").style.display = "none";
			// Suite
			document.querySelector("inter suite").style.display = "flex";
			document.querySelector("inter suite next").style.display = "none";
            // question
			document.querySelector("inter question p").style.display = "flex";
			document.querySelector("inter question p").innerHTML = objet.question.libelle;
			// jauge
			document.getElementsByClassName("progress")[0].style.display = "flex";	// afficher fond jauge
			document.getElementsByClassName("progress-bar")[0].style.display = "flex";	// afficher jauge
			document.getElementsByClassName("progress-bar")[0].setAttribute("aria-valuenow", 0);	// INIT valeur de la jauge
			// chronoQ
			document.querySelector("inter suite chrono").style.display = "none";
			document.querySelector("inter suite chrono p").innerHTML = "0";	// init de la valeur
			myChronoQ = setInterval(chronoQ, 1000, 7); // 7 secondes pour la lecture de la question
			break;
			
		case "InterReponse":
			// objet = question
			// score
			document.querySelector("inter tete score p").style.display = "flex";
			// jauge
			document.getElementsByClassName("progress-bar")[0].setAttribute("aria-valuenow", 0);	// INIT valeur de la jauge
			document.getElementsByClassName("progress-bar")[0].style.display = "none";	// masquer jauge
			document.getElementsByClassName("progress")[0].style.display = "none";	// masquer fond jauge
			// gestion des propositions
			gestPropositions("afficher", objet);
			document.querySelector("inter propositions").style.display = "flex";
			// Chrono
			document.querySelector("inter suite next").style.display = "none";
			document.querySelector("inter suite chrono").style.display = "flex";
			let pChronoR = document.querySelector("inter suite chrono p");
			pChronoR.innerHTML = (objet.reponse.temps !== undefined ? objet.reponse.temps : quizz.temps);
			document.querySelector("inter suite chrono").style.display = "flex";
			myChronoR = setInterval(chronoR, 1000, objet.reponse); // effet de transition
			break;

		case "QuizzTermine":
			// complement
			document.querySelector("inter complement").style.display = "flex";
			document.querySelector("inter complement p").innerHTML = avatar + " " + tabMessages[3] + " " + quizzNbPoint + (quizzNbPoint > 1 ? " points" : " point") +"</b><br>" +  tabMessages[4];
			// score
			document.querySelector("inter tete score p").style.display = "flex";
            // question
			document.querySelector("inter question p").style.display = "none";
			// gestion des propositions
			document.querySelector("inter propositions").style.display = "none";
			// Suite
			document.querySelector("inter suite").style.display = "flex";
			// Chrono
			document.querySelector("inter suite chrono").style.display = "none";
			document.querySelector("inter suite next").style.display = "none";
			break;
        
		default:
			inter.display = "none";
	}
}

function chronoQ(nbSecondesMax) {
	let jauge = document.getElementsByClassName("progress-bar");
	let value = parseInt(jauge[0].getAttribute("aria-valuenow"),10) + 1;	// transformation en numérique de la valeur actuelle
	if (value > nbSecondesMax) {
		continuer2();
	} else {
		jauge[0].setAttribute("aria-valuenow", (value));
		pourCent = value / nbSecondesMax * 100;
		jauge[0].setAttribute("style", "width: " + pourCent + "%");
	}
}


function chronoR(reponse) {
	let pChronoR = document.querySelector("inter suite chrono p");
	let value = parseInt(pChronoR.innerHTML,10);
	if (value == 0) {
		response(questionOn, -1);
	} else {
		if (value <= 4) {
			playSound("comptearebours");
		}
		pChronoR.innerHTML = (value -1).toString();
	}
}

function response(numQ, propSel) {
	clearTimeout(myChronoR);

	// on arrive ici si on a cliqué sur une des propositions OU si on a dépassé le temps
	//propSel = 1, 2 3 ou 4 ou -1 si on n'a pas cliqué

	// on neutralise les boutons
	for (let i =0; i < 4; i++) {
		document.getElementsByClassName("prop"+ (i+1))[0].setAttribute("style", "filter:grayscale(100%);");
		document.getElementsByClassName("prop"+ (i+1))[0].removeAttribute("onclick");
		document.getElementById("book"+ (i+1)).removeAttribute("onclick");
	}
	
	myQ = tabQuestions[numQ-1];
	if (propSel != myQ.reponse.solution) {
		// mauvaise réponse
		playSound("mauvaise");
	} else {
		// bonne réponse
		playSound("bonne");
		addScore(myQ.reponse.points);
	}
	
	let loi = "";

	document.getElementsByClassName("prop"+ myQ.reponse.solution)[0].setAttribute("style", "filter:drop-shadow(2px 4px 6px);cursor:pointer");
	if (myQ.reponse.loi == undefined){
		// prendre la loi du quizz
		if (quizz.loi == undefined) {
			loi="mix"
		} else {
			loi = lois[quizz.loi-1].fichier;
		}
	} else {
		// loi de la question
		loi = lois[(myQ.reponse.loi)-1].fichier;
	}

	let boutonOk = document.getElementById("book" + myQ.reponse.solution);
	boutonOk.className = "fas fa-book";
	boutonOk.setAttribute("onclick", "window.open('../lois/"+ loi + "','_target')");
	boutonOk.setAttribute("target", "_blank");
	boutonOk.setAttribute("title", loi);
	boutonOk.setAttribute("alt", loi);
	// on prépare la question suivante
	questionOn++;

	//afficher le bouton suivant pour appeler la question suivante
	document.querySelector("inter suite chrono").style.display = "none";
	document.querySelector("inter suite next").style.display = "flex";
}

function addScore(value) {
    if (value === 0) {
        quizzNbPoint = 0;
    } else {
        quizzNbPoint = quizzNbPoint + value;
	} 
    var score = ('0' + quizzNbPoint.toString()).substr(-2);       // on a le score avec deux digits
    var scoreMax = ('0' + nbQuests[niveauQuest].points.toString()).substr(-2);

    let myColor = ((quizzNbPoint / nbQuests[niveauQuest].points) > 0.5 ? 'green' : 'black');
    let myScore = '<span style="color:'+ myColor +';">' + score + '</span>';

    document.querySelector("inter tete score p").innerHTML = myScore + ':' + scoreMax;
}

function gestNiveaux(niveau) {
	let img = document.getElementById("badge");
	img.setAttribute("title", nbQuests[niveau].niv);
	img.setAttribute("alt", nbQuests[niveau].niv);
	img.setAttribute("src", pathBadges + "badge" + niveau + ".png");
}

function scanQuestion(niveau) {
	let script = eval(quizz.variable);
	// init
	for (let ind = 0; ind < arrayAssoSize(nbQuests); ind++) {
		nbQuests[ind].nb = 0;	// nombre de Questions du nouveau niveau
		nbQuests[ind].points = 0;	// nombre de points MAX du nouveau niveau
	}

	// scanne des actions et imputation des points ou pas
	let indexSelQuestions = 0;
	console.log(tabQuestions);
	for (let i = 0; i < arrayAssoSize(tabQuestions); i++) {
		if (tabQuestions[i].niveau == niveau) {
			nbQuests[tabQuestions[i].niveau].nb++;	// nombre de Questions du nouveau niveau
			nbQuests[tabQuestions[i].niveau].points+= tabQuestions[i].reponse.points;	// nombre de points MAX du nouveau niveau	
			tabQuestions[indexSelQuestions] = tabQuestions[i];
			indexSelQuestions++;
		}
	}

	niveauQuest = niveau;
	questionOn = 1;
}

function gestJauge(numQuest, niveau) {
    let pourCent = 0;
    //MAJ de la jauge
    let jauge = document.getElementsByClassName("progress-bar");
    
    if (numQuest == 0) {
		// première question
        jauge[0].setAttribute("aria-valuenow", 0);
        jauge[0].setAttribute("style", "width: 0%");
        jauge[0].innerHTML = nbQuests[niveau].nb + " Questions";
    } else {
		jauge[0].setAttribute("aria-valuenow", numQuest);
		pourCent = numQuest / nbQuests[niveau].nb * 100;
		jauge[0].setAttribute("style", "width: " + pourCent + "%");
        jauge[0].innerHTML = numQuest;
    }
}

function continuer() {
	showContent(true);		// affichage de la zone INTER
	// Chrono questions
	if(questionOn > nbQuests[niveauQuest].nb) {
		// la dernière question est passée
		questionOn = 0;	// on ré-initialise le nombre de questions
		gestionBoard("QuizzTermine");
	} else {
		document.querySelector("inter suite next").style.display = "none";  // masquer bouton CONTINUER
		gestionBoard("InterQuestion", tabQuestions[questionOn -1 ]);
	}
}

function continuer2() {
	// affichage des propositions
	clearTimeout(myChronoQ);	// arrêt du chrono Question

	document.querySelector("inter suite").style.display = "flex";
	document.querySelector("inter suite next").style.display = "none";


	// Chrono questions
/*	if(questionOn > nbQuests[niveauQuest].nb) {
		// la dernière question est passée
		questionOn = 0;	// on ré-initialise le nombre de questions
		// affichage de la zone INTER
		showContent(true);
		gestionBoard("QuizzTermine");
	} else {*/
		// Affichage  normal des boutons de réponse
		for (let i =0; i < 4; i++) {
			document.getElementsByClassName("prop"+ (i+1))[0].setAttribute("style", "filter:brightness(100%);");
		}
		gestionBoard("InterReponse", tabQuestions[questionOn -1 ]);	// on passe les infos sur la question -1 car la première est index 0
	//}
}

function gestPropositions(etape, objet) {
	for (let i=0; i < 4; i++) {
		// carte
		document.getElementById("card" + (i+1)).setAttribute("onclick", 'javascript:response('+ questionOn + ',' + (i+1) +');');
		// proposition
		let myProp = 
		document.getElementById("prop" + (i+1)).innerHTML = objet.question.attributs[i];		// afficher les libellés des propositions
		// book
		document.getElementById("book" + (i+1)).className = "far fa-comments";
	}
}