var version = "1.0.0";

var screenParams = [
	{width:375, code:"xs-6"},
	{width:576, code:"sm-6"},
	{width:768, code:"md-4"},
	{width:991, code:"xl-3"}
];

// variables 
var ratio = 0;
var tempsConsomme = 0;
var quizz = [];
var scripts = [];
var actions = [];
var timeCode = '';
var avatar = '';
var myURLcomplete = document.location.href;
var myURL  = myURLcomplete.substring( 0 ,myURLcomplete.lastIndexOf( "/" ) );
//var quizzNbPoint = 0;		// nb points en cours
var quizzNbPointRegul = 0;	// nb points regiularisé en fonction de la vitesse
var stepBarre = 0;			// % de progression pour une Question
var stepDone = 0;			// % de progression effectué
var idQuizz = null;		// quizz en cours

/*var cardIcones = [
	"fas fa-play",
	"fas fa-star",
	"fas fa-circle",
	"fas fa-square"
]*/
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
var questionsFaites = [];
var seqUsed = -1;	// valeur de l'étape de la séquence qui a été traitée
var hauteurContent = 0; // hauteur de la zone CONTENT récupérée lors du chargement
var questionOn = 0;	// numero de la Question
var tabQuestions = [];

// chemins
var pathImages = "../images/";		// autres images
var pathQuizz = "./scenarios/";		// scénarios des quizz
var pathPosters =  "./posters/";		//  posters
var pathBadges = "./badges/";		//  badges

// **********************************************************************************************************

document.addEventListener("DOMContentLoaded", init, false);	// lance l'écoute des évènements et appelle INIT
//window.MediaQueryList.addListener(lookScreen);

window.addEventListener("resize", function(){
	console.log(window.screen.width , window.screen.height);
});


function init() {
    //
    // est appelé en premier par la page lors du chargement
	//

    header();
	footer();
	
	// clic sur l'image de bascule
	var bascule = document.querySelector("bascule img");
	user();
	bascule.addEventListener("click", fBascule);	// de haut en bas
	
	creerVignettes("vignettes");					        // générer le vignettes dans le carousel
}

function lookScreen(evt) {
	console.log(evt);
}

function creerVignettes(id) {
	//
    // générer le vignettes dans le carousel
	//

	let indexScreen = arrayAssoSearch2(screenParams, window.screen.width);
	
	// création des indicateurs
	let ind = document.getElementById("indicateurs");
	for (let i = 0; i < arrayAssoSize(scenario); i++) {
		let myInd = document.createElement("li");
		myInd.setAttribute("data-target", "#carousel-example");
		myInd.setAttribute("data-slide-to",i);
		if(i === 0) { myInd.setAttribute("class", "active cercle"); } else {myInd.setAttribute("class", "cercle");}
		ind.appendChild(myInd);
	}

	// création des vignettes
	let bloc = document.getElementById(id);
	
	for (let i = 0; i < arrayAssoSize(scenario); i++) {

		// div
		let myDiv = document.createElement("div");

//		myDiv.className = "carousel-item col-12 col-sm-6 col-md-4 col-lg-3" + (i === 0?' active':'');
		myDiv.className = "carousel-item col-" + screenParams[indexScreen].code + (i === 0?' active':'');	// 2 3 et 4

		//myDiv.className = "carousel-item col-xs-6 col-sm-6 col-md-3 col-lg-2" + (i === 0?' active':'');
		myDiv.className = "carousel-item col-xs-6 col-sm-6 col-md-3 col-lg-2" + (i === 0?' active':'');

		// img
		let myImg = document.createElement("img");
		myImg.className = "img-fluid mx-auto d-block";
		myImg.setAttribute("alt", "img" + i);
		myImg.setAttribute("title", "img" + i);
		myImg.setAttribute("src", pathPosters + (scenario[i].poster || pathImages + "pelouses/stade.jpg"));

		// caption
		let myCaption = document.createElement("div");

		// badge
		let myF = document.createElement("img");
		myF.className = "carouselFanion";
		myF.setAttribute("title", "niveau : " + nbQuests[scenario[i].niveau].niv);
		myF.setAttribute("src", pathBadges + "badge" +(scenario[i].niveau + ".png" || "fff.png'"));
		myCaption.appendChild(myF);
		
		let myP = document.createElement("p");    
		myP.innerHTML = scenario[i].titre + " (" + (scenario[i].loi === undefined ? "mix" : "loi " + scenario[i].loi) +")";
		myCaption.appendChild(myP);
		myCaption.className = "carousel-caption d-none d-md-block titre";
		myCaption.setAttribute("onclick", 'javascript:switchQuizz('+ (i+1) +');');	// mettre ici car cette DIV est au-dessus de l'image

		myDiv.appendChild(myImg);
		myDiv.appendChild(myCaption);

		bloc.appendChild(myDiv);

		let myScript = document.createElement("SCRIPT");
		myScript.setAttribute("type", "text/javascript");
		myScript.setAttribute("src", pathQuizz + scenario[i].fichier);
		document.head.appendChild(myScript);
	}
}

function showContent(etat) {
	// ce n'est appelé que si on peut voir les vignettes car c'ets le clic dessus quki affiche !!!!
	let carousel = document.getElementById("carousel");

	// le DISPLAY du CAROUSEL a un effet sur la taille de CONTENT qui s'agrandit mais qui dépasse FOOTER
	carousel.style.display =  (etat === true ? "none" : "flex");

	let bascule_img = document.querySelector("bascule img");
	bascule_img.setAttribute("src",pathImages  +   (etat === true ? "fleche_fermee.png" : "fleche_ouverte.png"));	// MAJ icone bascule

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
		this.src = pathImages + "fleche_ouverte.png";
		this.alt = "affiche la liste des quizz";
		span.innerHTML = avatar + " " + tabMessages[0];
	} else {
		carousel.style.display = "none";
		this.src = pathImages + "fleche_fermee.png";
		this.alt = "masque la liste des quizz";
		span.innerHTML = avatar + " " + tabMessages[1];
	}	
}

function switchQuizz(n) {
	if (n > arrayAssoSize(scenario)) {
		// vérifie si l'index du quizz existe dans le fichier catalogue.js
		n = 0;
		return false;
	} else {
		quizz = scenario[n-1];    		// recup infos du quizz
		tabQuestions = eval(quizz.variable);	// recup questions du quizz

		// affichage de la zone INTER
		showContent(true);
		gestionBoard("selectQuizz", quizz);	// on passe les infos sur le quizz sélectionné
	}
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
			document.querySelector("inter question").style.display = "none";
			document.querySelector("inter propositions").style.display = "none";
			document.querySelector("inter complement").style.display = "flex";
			
			let texte = avatar + " "+ tabMessages[2] + " " + nbQuests[niveauQuest].niv + "<br>";

			texte += "Ce quizz de " +  nbQuests[niveauQuest].nb  +" question"+(nbQuests[niveauQuest].nb > 1 ? "s" : "");
			texte += " porte sur " + (objet.loi === undefined ? "un mix de lois" : "la loi "+ objet.loi+" - " + lois[parseFloat(objet.loi)-1].libelle)+ "<br>";
			texte += tabMessages[5];
			document.querySelector("inter complement p").innerHTML = texte;
			document.querySelector("inter complement img").style.display = "none";
			document.querySelector("inter complement #ring").style.display = "none";
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
			// lancer le ring
			document.querySelector("inter complement #ring").style.display = "none";
			document.querySelector("inter complement").style.display = "none";
			// score
			document.querySelector("inter tete score p").style.display = "flex";
			// propositions
			document.querySelector("inter propositions").style.display = "none";
			// Suite
			document.querySelector("inter suite").style.display = "flex";
			document.querySelector("inter suite next").style.display = "none";
            // question
			document.querySelector("inter question").style.display = "flex";
			// animation numQuestion
			doNextNum(objet.number);
			document.querySelector("inter question p").innerHTML = objet.question.libelle;
			// jauge
			document.getElementsByClassName("progress")[0].style.display = "flex";	// afficher fond jauge
			document.getElementsByClassName("progress-bar")[0].style.display = "flex";	// afficher jauge
			document.getElementsByClassName("progress-bar")[0].setAttribute("aria-valuenow", 0);	// INIT valeur de la jauge
			// chronoQ
			document.querySelector("inter suite chrono").style.display = "none";
			document.querySelector("inter suite chrono p").innerHTML = "0";	// init de la valeur
			myChronoQ = setInterval(chronoQ, 1000, (objet.question.temps !== undefined ? objet.question.temps : quizz.tempsQuestion));  // temps pour la lecture de la question
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
			pChronoR.innerHTML = (objet.reponse.temps !== undefined ? objet.reponse.temps : quizz.tempsReponse);
			document.querySelector("inter suite chrono").style.display = "flex";
			myChronoR = setInterval(chronoR, 1000, objet.reponse); // effet de transition
			break;

		case "QuizzTermine":
			// complement
			let scoreFinal = quizzNbPointRegul.toFixed(2) ;	// on arrondi à 2 chiffres
			document.querySelector("inter complement").style.display = "flex";
			document.querySelector("inter complement p").innerHTML = avatar + " " + tabMessages[3] + " " + scoreFinal + (scoreFinal> 1 ? " points" : " point") 
			+"</b> en " + tempsConsomme +(tempsConsomme > 1 ? " secondes" : " seconde")+ "<br>" +tabMessages[4];
			// lancer le ring
			document.querySelector("inter complement #ring").style.display = "flex";
			gestSvg(scoreFinal, nbQuests[niveauQuest].points);
			// score
			document.querySelector("inter tete score p").style.display = "flex";
            // question
			document.querySelector("inter question").style.display = "none";
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

function gestSvg(reussite, total) {
	// calcul pourcentge réussite
	let offset = reussite / total * 100;

	// afficher réussite
	var titreSvg = document.querySelector("text");
  	titreSvg.innerHTML = reussite + "/" + total;

	  // récupérer le rayon du SVG
	let circle = document.getElementById("my-circle");
	let rayon = circle.getAttribute("r");

	// calculer la section de réussite
	let b = Math.PI * rayon * 2; 
	let a = offset * b / 100;		
	circle.setAttribute("stroke-dasharray", a + " "+ b);
	
	// afficher le svg
	let svg = document.querySelector("svg");
	svg.style.display = "flex";

	// lancer l'animation
	let animate = document.querySelector("animate");
	animate.setAttribute("to", a);
	animate.beginElement();
}


function chronoQ(nbSecondesMax) {
	// affichage de la jauge pour la question
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
	// affichage du chrono numérique
	let pChronoR = document.querySelector("inter suite chrono p");
	let value = parseInt(pChronoR.innerHTML,10);
	if (value == 0) {
		// fin du chrono
		response(questionOn, -1);
	} else {
		if (value <= 4) {
			// compte à rebours 
			playSound("comptearebours");
		}
		// on decompte le chrono
		pChronoR.innerHTML = (value -1).toString();
	}
}

function response(numQ, propSel) {
	// on arrive ici si on a cliqué sur une des propositions OU si on a dépassé le temps
	//propSel = 1, 2 3 ou 4 ou -1 si on n'a pas cliqué

	// on neutralise les boutons
	for (let i =0; i < 4; i++) {
		document.getElementsByClassName("prop"+ (i+1))[0].setAttribute("style", "filter:grayscale(100%);");
		document.getElementsByClassName("prop"+ (i+1))[0].removeAttribute("onclick");
		document.getElementById("book"+ (i+1)).removeAttribute("onclick");
	}
	
	let gagne = false;	// init variable

	// choix du son à jouer selon réponse
	myQ = tabQuestions[numQ-1];
	if (propSel != myQ.reponse.solution) {
		// mauvaise réponse
		playSound("mauvaise");
	} else {
		// bonne réponse
		playSound("bonne");
		gagne = true;
	}

	// on récupère le chrono restant
	let pChronoR = document.querySelector("inter suite chrono p");	// on récupère la valeur du chrono en cours
	let tempsRestant = parseInt(pChronoR.innerHTML,10);	// on convertit la valeur en entier
	let tempsPropose = 0.0;	// on initialise la valeur proposée
	if (myQ.reponse.temps == undefined) {
		// temps du quizz
		tempsPropose = parseInt(quizz.tempsReponse,10);
	} else {
		// temps de la question
		tempsPropose = parseInt(myQ.reponse.temps,10);
	}

	if (gagne) {
		// Gagné : on tient compte du temps utilisé
		tempsConsomme = tempsConsomme + (tempsPropose - tempsRestant);
		console.log("max " + tempsPropose + " /  utilisé "+ (tempsPropose) + " total utilisé " + tempsConsomme);
	} else {
		// Perdu : on ajoute le temps prévu pour la question
		tempsConsomme = tempsConsomme + tempsPropose;
		console.log("max " + tempsPropose + " /  utilisé "+ (tempsPropose - tempsRestant) + " total utilisé " + tempsConsomme);
	}
	//ratio = tempsRestant / tempsPropose ;

	// MAJ score
	if(gagne) {
		addScore(myQ.reponse.points);
	}

	// on initialise le chrono
	clearTimeout(myChronoR);

	// gestion de la loi à afficher
	let loi = "";
	document.getElementsByClassName("prop"+ myQ.reponse.solution)[0].setAttribute("style", "filter:drop-shadow(2px 4px 6px);cursor:pointer");
	if (myQ.reponse.loi == undefined){
		// prendre la loi du quizz
		loi = lois[quizz.loi-1].fichier;
	} else {
		// loi de la question
		loi = lois[myQ.reponse.loi-1].fichier;
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
      //  quizzNbPoint = 0;
		// uizzNbPointRegul = quizzNbPoint;
		quizzNbPointRegul = 0;
    } else {
      //  quizzNbPoint = quizzNbPoint + value;
		//console.log("ratio "+ratio +"   points  " + (value * ratio));
		/*if (ratio >= 0.7) {
			// on favorise la réponse dans la moitié du temps impartie
			quizzNbPointRegul = quizzNbPointRegul + value;
		} else {
			quizzNbPointRegul = quizzNbPointRegul + (value * ratio);
		}*/
		quizzNbPointRegul = quizzNbPointRegul + value;
	} 
	
   // var score = ('0' + quizzNbPoint.toString()).substr(-2);       // on a le score avec deux digits
    var scoreMax = ('0' + nbQuests[niveauQuest].points.toString()).substr(-2);

    let myColor = ((quizzNbPointRegul / nbQuests[niveauQuest].points) > 0.5 ? 'green' : 'black');
    // let myScore = '<span style="color:'+ myColor +';">' + score + '</span>';
	let myScore = '<span style="color:'+ myColor +';">' + quizzNbPointRegul + '</span>';

    document.querySelector("inter tete score p").innerHTML = myScore + ':' + scoreMax;
}

function gestNiveaux(niveau) {
	let img = document.getElementById("badge");
	img.setAttribute("title", nbQuests[niveau].niv);
	img.setAttribute("alt", nbQuests[niveau].niv);
	img.setAttribute("src", pathBadges + "badge" + niveau + ".png");
}

function scanQuestion(niveau) {
	tabQuestions = [];

	let script = eval(quizz.variable);
	// init
	for (let ind = 0; ind < arrayAssoSize(nbQuests); ind++) {
		nbQuests[ind].nb = 0;	// nombre de Questions du nouveau niveau
		nbQuests[ind].points = 0;	// nombre de points MAX du nouveau niveau
	}

	// scanne des actions et imputation des points ou pas
	let indexSelQuestions = 0;
	for (let ind = 0; ind < arrayAssoSize(script); ind++) {
		if (script[ind].niveau == niveau) {
			nbQuests[script[ind].niveau].nb++;	// nombre de Questions du nouveau niveau
			nbQuests[script[ind].niveau].points+= script[ind].reponse.points;	// nombre de points MAX du nouveau niveau	
			tabQuestions[indexSelQuestions] = script[ind];
			indexSelQuestions++;
		}
	}

	niveauQuest = niveau;
	questionOn = 1;

	//return nbQuests;	// on renvoi le nombre de Question du nouveau niveau
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