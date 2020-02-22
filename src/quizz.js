var scripts = [];
var actions = [];
var timeCode = '';
var avatar = '';
var myURLcomplete = document.location.href;
var myURL  = myURLcomplete.substring( 0 ,myURLcomplete.lastIndexOf( "/" ) );
var quizzNbPoint = 0;		// nb points en cours
var stepBarre = 0;			// % de progression pour une Question
var stepDone = 0;			// % de progression effectué
var idQuizz = null;		// quizz en cours
var lois = [
	{num:1, libelle:"Terrain"},
	{num:2, libelle:"Ballon"},
	{num:3, libelle:"Joueurs"},
	{num:4, libelle:"Equipements"},
	{num:5, libelle:"Arbitre"},
	{num:6, libelle:"Autres arbitres"},
	{num:7, libelle:"Durée d'un match"},
	{num:8, libelle:"Coup d'envoi et reprise de jeu"},
	{num:9, libelle:"Ballon en jeu et hors du jeu"},
	{num:10, libelle:"Issue d'un match"},
	{num:11, libelle:"Hors-jeu"},
	{num:12, libelle:"Fautes et incorrections"},
	{num:13, libelle:"Coups francs"},
	{num:14, libelle:"Penalty"},
	{num:15, libelle:"Rentrée de touche"},
	{num:16, libelle:"Coup de pied de but"},
	{num:17, libelle:"Corner"}
]
var tabMessages = [
	"cliquez sur la vignette du quizz que vous souhaitez jouer",
	"cliquez sur cet icône pour afficher les quizz disponibles",
	"vous allez démarrer le quizz pour obtenir le niveau ",
	"vous venez de terminer le quizz<br>Votre score est de <b>",
	"Sélectionnez un nouveau quizz."
]
var nbQuests = [
	{niv: "COURANT", nb: 0, points: 0},
	{niv: "1 : j'apprends", nb: 0, points: 0},
	{niv: "2 : je comprends", nb: 0, points: 0}
];		// le niveau 0 est le niveau en cours
var niveauQuest = 1		//niveau par défaut au démarrage
var questionsFaites = [];
var seqUsed = -1;	// valeur de l'étape de la séquence qui a été traitée
var hauteurContent = 0; // hauteur de la zone CONTENT récupérée lors du chargement
var questionOn = 0;	// numero de la Question
var tabQuestions = [];

// chemins
var pathImages = "../images/";		// autres images
var pathQuizz = "../questionnaires/";		// scénarios des quizz
var pathPosters = pathQuizz + "posters/";		//  posters
var pathBadges = pathQuizz + "badges/";		//  badges

// **********************************************************************************************************

document.addEventListener("DOMContentLoaded", init, false);	// lance l'écoute des évènements et appelle INIT

function init() {
    //
    // est appelé en premier par la page lors du chargement
	//

	// mettre les listener ici car il faut avoir chargée la page

	// clic sur l'image de bascule
	var bascule = document.querySelector("bascule img");
	bascule.addEventListener("click", fBascule);	// de haut en bas
	creerVignettes("vignettes");					        // générer le vignettes dans le carousel
}

function creerVignettes(id) {
	//
    // générer le vignettes dans le carousel
	//
	
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
		myDiv.className = "carousel-item col-12 col-sm-6 col-md-4 col-lg-3" + (i === 0?' active':'');

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
		myP.innerHTML = scenario[i].titre;
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
            gestJauge(0, objet.niveau);			// MAJ de la jauge
            document.querySelector("inter question p").style.display = "none";
			document.querySelector("inter propositions").style.display = "none";
			document.querySelector("inter complement").style.display = "flex";
			
			let texte = avatar + " "+ tabMessages[2] + " " + nbQuests[niveauQuest].niv + "<br>";
			texte += (objet.loi !== undefined ? "portant sur la loi " + lois[parseFloat(objet.loi)-1].libelle : "");
			texte += " et constitué de " + nbQuests[niveauQuest].nb + " questions";
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
			document.querySelector("inter tete score p").style.display = "flex";
			gestJauge(questionOn, objet.niveau);	// MAJ de la jauge
            // question
			document.querySelector("inter question p").style.display = "flex";
			document.querySelector("inter question p").innerHTML = objet.question.libelle;
			// gestion des propositions
			gestPropositions("afficher", objet);
			document.querySelector("inter propositions").style.display = "flex";
			// Suite
			document.querySelector("inter suite").style.display = "flex";
			document.querySelector("inter suite next").style.display = "none";
			let pChrono = document.querySelector("inter suite chrono p");

			console.log(quizz);
			pChrono.innerHTML = (objet.reponse.temps !== undefined ? objet.reponse.temps : quizz.temps);
			document.querySelector("inter suite chrono").style.display = "flex";
			myChrono = setInterval(chrono, 1000, objet.reponse); // effet de transition

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
			break;
        
		default:
			inter.display = "none";
	}
}

function chrono(reponse) {
	let pChrono = document.querySelector("inter suite chrono p");
	let value = parseInt(pChrono.innerHTML,10);
	if (value == 0) {
		response(questionOn, -1);
	} else {
		if (value <= 4) {
			playSound("comptearebours");
		}
		pChrono.innerHTML = (value -1).toString();
	}
}

function response(numQ, propSel) {
	clearTimeout(myChrono);

	// on arrive ici si on a cliqué sur une des propositions OU si on a dépassé le temps
	//propSel = 1, 2 3 ou 4 ou -1 si on n'a pas cliqué

	// on neutralise les boutons
	for (let i =0; i < 4; i++) {
		document.getElementsByClassName("prop"+ (i+1))[0].setAttribute("style", "filter:grayscale(100%);");
		document.getElementsByClassName("prop"+ (i+1))[0].removeAttribute("onclick");
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
	
	document.getElementsByClassName("prop"+ myQ.reponse.solution)[0].setAttribute("style", "filter:drop-shadow(2px 4px 6px);");

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
	console.log(quizzNbPoint);
    var score = ('0' + quizzNbPoint.toString()).substr(-2);       // on a le score avec deux digits
    var scoreMax = ('0' + nbQuests[niveauQuest].points.toString()).substr(-2);

    let myColor = ((quizzNbPoint / nbQuests[niveauQuest].points) > 0.5 ? 'green' : 'black');
    let myScore = '<span style="color:'+ myColor +';">' + score + '</span>';

    document.querySelector("inter tete score p").innerHTML = myScore + ':' + scoreMax;
}

function gestNiveaux(niveau) {
    //let myBadge = document.querySelector("inter tete niveau");
	//img = document.createElement("img");
	//img.id = "badge"

	let img = document.getElementById("badge");
	img.setAttribute("title", nbQuests[niveau].niv);
	img.setAttribute("alt", nbQuests[niveau].niv);
	img.setAttribute("src", pathBadges + "badge" + niveau + ".png");
	//myBadge.appendChild(img);
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
	document.querySelector("inter suite next").style.display = "none";  // masquer bouton CONTINUER

	if(questionOn > nbQuests[niveauQuest].nb) {
		// la dernière question est passée
		questionOn = 0;	// on ré-initialise le nombre de questions
		// affichage de la zone INTER
		showContent(true);
		gestionBoard("QuizzTermine");
	} else {
		// Affichage  normal des boutons de réponse
		for (let i =0; i < 4; i++) {
			document.getElementsByClassName("prop"+ (i+1))[0].setAttribute("style", "filter:brightness(100%);");
		}
		gestionBoard("InterQuestion", tabQuestions[questionOn -1 ]);	// on passe les infos sur la question -1 car la première est index 0
	}
}

function gestPropositions(etape, objet) {
	for (let i=0; i < 4; i++) {
		// carte
		let myCard = document.getElementById("card" + (i+1));
		myCard.setAttribute("onclick", 'javascript:response('+ questionOn + ',' + (i+1) +');');
		// proposition
		let myProp = document.getElementById("prop" + (i+1));
		myProp.innerHTML = objet.question.attributs[i];		// afficher les libellés des propositions
	}
}