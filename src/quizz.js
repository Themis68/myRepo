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
var tabMessages = [
	"cliquez sur la vignette du quizz que vous souhaitez jouer",
	"cliquez sur cet icône pour afficher les quizz disponibles"
]
var nbQuests = [
	{niv: "COURANT", nb: 0, points: 0},
	{niv: "j'apprends", nb: 0, points: 0},
	{niv: "je comprends", nb: 0, points: 0},
	{niv: "j'applique", nb: 0, points: 0},
	{niv: "j'explique", nb: 0, points: 0}
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

function user() {
	let avatarOk = false;
	const reg = /^([a-zA-Z]){3,20}$/g;	// accepte des chaines de caractères jusqu'à 5 caractères
	do {
		avatar = window.prompt("Indique ton prénom s'il te plait (3 à 20 lettres maximum)");
		avatarOk = reg.exec(avatar);
	}
	while (!avatarOk);
	document.getElementById("avatar").innerHTML = avatar.toUpperCase();
}

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
		myImg.setAttribute("src", pathPosters + (scenario[i][0].poster || pathImages + "stade.jpg"));

		// caption
		let myCaption = document.createElement("div");

		// badge
		let myF = document.createElement("img");
		myF.className = "carouselFanion";
		myF.setAttribute("title", "niveau : " + nbQuests[scenario[i][0].niveau].niv);
		myF.setAttribute("src", pathBadges + "badge" +(scenario[i][0].niveau + ".png" || "fff.png'"));
		myCaption.appendChild(myF);
		
		let myP = document.createElement("p");    
		myP.innerHTML = scenario[i][0].titre;
		myCaption.appendChild(myP);
		myCaption.className = "carousel-caption d-none d-md-block titre";
		myCaption.setAttribute("onclick", 'javascript:switchQuizz('+ scenario[i][0].id +');');	// mettre ici car cette DIV est au-dessus de l'image

		myDiv.appendChild(myImg);
		myDiv.appendChild(myCaption);

		bloc.appendChild(myDiv);

		let myScript = document.createElement("SCRIPT");
		myScript.setAttribute("type", "text/javascript");
		myScript.setAttribute("src", pathQuizz + scenario[i][0].fichier);
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
	bascule_titre.innerHTML = (etat === true ? tabMessages[1] : tabMessages[0]);
}

function fBascule(event) {
	let carousel = document.querySelector("carousel");
	let span = document.querySelector("bascule span");

	if (this.src.indexOf("fermee") > 0 ){
		// on ouvre
		carousel.style.display = "flex";
		this.src = pathImages + "fleche_ouverte.png";
		this.alt = "affiche la liste des matchs";
		span.innerHTML = tabMessages[0];
	} else {
		// on ferme
		carousel.style.display = "none";
		this.src = pathImages + "fleche_fermee.png";
		this.alt = "masque la liste des matchs";
		span.innerHTML = tabMessages[1];
	}	
}

function switchQuizz(n) {
	if (n > arrayAssoSize(scenario)) {
		// vérifie si l'index du quizz existe dans le fichier catalogue.js
		n = 0;
		return false;
	} else {
		quizz = scenario[n-1];    		// recup infos du quizz
		questions = eval("script" + n);	// recup questions du quizz

		// affichage de la zone INTER
		showContent(true);
		gestionBoard("selectQuizz", quizz[0]);	// on passe les infos sur le quizz sélectionné
	}
}

function gestionBoard(etape, objet) {
	let inter = document.querySelector("inter");
	switch (etape) {
		case "selectQuizz":
			gestNiveaux(objet.niveau);		// calcul des niveaux
			scanQuestion(objet.niveau);	// analyse du scénario
            gestJauge(0, objet.niveau);			// MAJ de la jauge
            document.querySelector("inter question p").style.display = "none";
			document.querySelector("inter propositions").style.display = "none";
            document.querySelector("inter complement").style.display = "flex";
            document.querySelector("inter complement p").innerHTML = "Vous allez démarrer le quizz pour obtenir le niveau '" + nbQuests[niveauQuest].niv + "'."
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
			// complement
			document.querySelector("inter complement").style.display = "none";
			// score
			document.querySelector("inter tete score p").style.display = "flex";
			gestJauge(questionOn, objet.niveau);	// MAJ de la jauge
            // question
			document.querySelector("inter question p").style.display = "flex";
			console.log(objet);
			document.querySelector("inter question p").innerHTML = objet.question.libelle;
			// gestion des propositions
			gestPropositions("afficher", objet.attributs);
			document.querySelector("inter propositions").style.display = "flex";
			// Suite
			document.querySelector("inter suite").style.display = "flex";
			document.querySelector("inter suite next").style.display = "none";
			let pChrono = document.querySelector("inter suite chrono p");
			pChrono.innerHTML = objet.reponse.temps;
			document.querySelector("inter suite chrono").style.display = "flex";
			chrono = setInterval(chrono, 1000, objet.reponse); // effet de transition

			break;
        
		default:
			inter.display = "none";
	}
}

function chrono(reponse) {
	let pChrono = document.querySelector("inter suite chrono p");
	let value = parseInt(pChrono.innerHTML,10);
	if (value == 0) {
		clearTimeout(chrono);
		response(reponse);
	} else {
		pChrono.innerHTML = (value -1).toString();
	}
}

function response(reponse) {
	// on arrive ici si on a cliqué sur une des propositions OU si on a dépassé le temps
	for (let i =0; i < 4; i++) {
		//if (tab[i] != reponse.solution) {
		if ((i+1) != reponse.solution) {
			document.getElementsByClassName("prop"+ (i+1))[0].setAttribute("style", "filter:brightness(500%);");
		} else {
			document.getElementsByClassName("prop"+ (i+1))[0].setAttribute("style", "filter:drop-shadow(2px 4px 6px black);");
		}
	}
	// controler la réponse
	addScore(reponse.points);
	// on prépare la question suivante
	questionOn++;

	//afficher le bouton suivant pour appelrr la question suivante
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
    let myBadge = document.querySelector("inter tete niveau");
	img = document.createElement("img");
	img.id = "badge"
	img.setAttribute("title", nbQuests[niveau].niv);
	img.setAttribute("alt", nbQuests[niveau].niv);
	img.setAttribute("src", pathBadges + "badge" + niveau + ".png");
	myBadge.appendChild(img);
}

function scanQuestion(niveau) {
	tabQuestions = [];

	let script = eval("script" + niveau);
	// init
	for (let ind = 0; ind < arrayAssoSize(nbQuests); ind++) {
		nbQuests[ind].nb = 0;	// nombre de Questions du nouveau niveau
		nbQuests[ind].points = 0;	// nombre de points MAX du nouveau niveau
	}
	console.log(nbQuests);

	// scanne des actions et imputation des points ou pas
	for (let ind = 0; ind < arrayAssoSize(script); ind++) {
		nbQuests[script[ind].niveau].nb++;	// nombre de Questions du nouveau niveau
		nbQuests[script[ind].niveau].points+= script[ind].reponse.points;	// nombre de points MAX du nouveau niveau
		tabQuestions[ind] = script[ind];
	}

	niveauQuest = niveau;
	questionOn = 0;
	nbQuests[0].nb = nbQuests[niveau].nb;	// nombre de Questions du nouveau niveau
	nbQuests[0].points = nbQuests[niveau].points;

	return nbQuests;	// on renvoi le nombre de Question du nouveau niveau
}

function gestJauge(numQuest, niveau) {
    let pourCent = 0;
    //MAJ de la jauge
    let jauge = document.getElementsByClassName("progress-bar");
    
    if (numQuest == 0) {
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
	for (let i =0; i < 4; i++) {
			document.getElementsByClassName("prop"+ (i+1))[0].setAttribute("style", "filter:brightness(100%);");
	}
	document.querySelector("inter suite next").style.display = "none";  // masquer bouton CONTINUER
	if(questionOn == nbQuests[niveauQuest].nb) {
		// c'est la dernière question
		questionOn = 0;	// on ré-initialise le nombre de questions
	//	reponse(questions[tabQuestions[questionOn]])
	} else {
	//	index = questionOn;
		// gestion des questions
	/*	let index = questionOn;
		let nbQuestionsMax = arrayAssoSize(questions);
		while ((questionOn, questions[index].niveau != (niveauQuest+1)) && (index < nbQuestionsMax)) {
			console.log(index, questions[index].niveau);
			index++;
		}
		questionOn = index;	// si c'est la dernière question on aura */
// 		gestionBoard("InterQuestion", questions[questionOn-1]);	// on passe les infos sur la question -1 car la première est index 0
		gestionBoard("InterQuestion", tabQuestions[questionOn]);	// on passe les infos sur la question -1 car la première est index 0
	}
}

function gestPropositions(etape, attributs) {
	for (let i=0; i < 4; i++) {
		document.getElementById("prop" + (i+1)).innerHTML = attributs[i];
	}
}