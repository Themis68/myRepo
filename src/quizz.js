var scripts = [];
var actions = [];
var actionEnCours = [];
var timeCode = '';
var avatar = '';
var myURLcomplete = document.location.href;
var myURL  = myURLcomplete.substring( 0 ,myURLcomplete.lastIndexOf( "/" ) );
var quizzNbPoint = 0;		// nb points en cours
var stepBarre = 0;			// % de progression pour une Question
var stepDone = 0;			// % de progression effectué
var idQuizz = null;		// quizz en cours
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
var numQuestion = 0;	// numero de la Question

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
		myF.setAttribute("title", "badge" + i);
		myF.setAttribute("src", pathBadges + "badge_"+(scenario[i][0].badge + ".png" || "fff.png'"));
		myCaption.appendChild(myF);
		
        let myP = document.createElement("p");        
		myP.innerHTML = scenario[i][0].titre;
		myCaption.appendChild(myP);
		myCaption.className = "carousel-caption d-none d-md-block";
		myCaption.setAttribute("onclick", 'javascript:switchQuizz('+ scenario[i][0].id +');');	// mettre ici car cette DIV est au-dessus de l'image
		myCaption.setAttribute("title", (scenario[i][0].titre));
		myCaption.setAttribute("alt", (scenario[i][0].titre));

		myDiv.appendChild(myImg);
		myDiv.appendChild(myCaption);

		bloc.appendChild(myDiv);

		let myScript = document.createElement("SCRIPT");
		myScript.setAttribute("type", "text/javascript");
		myScript.setAttribute("src", pathQuizz + scenario[i][0].fichier);
		document.head.appendChild(myScript);
	}
}

function fBascule(event) {
	let carousel = document.querySelector("carousel");
	let span = document.querySelector("bascule span");

	if (this.src.indexOf("fermee") > 0 ){
		// on ouvre
		carousel.style.display = "flex";
		this.src = pathImages + "fleche_ouverte.png";
		this.alt = "affiche la liste des matchs";
		span.innerHTML = "cliquez sur la vignette du quizz que vous souhaitez jouer";
	} else {
		// on ferme
		carousel.style.display = "none";
		this.src = pathImages + "fleche_fermee.png";
		this.alt = "masque la liste des matchs";
		span.innerHTML = "cliquez sur cet icône pour afficher les quizz disponibles";
	}	
}

function switchQuizz(n) {
	if (n > arrayAssoSize(scenario)) {
		// vérifie si l'index du quizz existe dans le fichier catalogue.js
		n = 0;
		return false;
	} else {
		idQuizz = n;		// 1 = premier quizz
		quizz = scenario[n-1];    // recup scénario du quizz
		idQuizzOn = n;
		actions = quizz.fichier;    // recup tableau des actions (position 3)
		numQuestion = 0;	// on ré-initialise le nombre de questions

		gestionBoard("selectQuizz", quizz[0]);	// on passe les infos sur le quizz sélectionné
	}
}

function gestionBoard(etape, objet) {
	let inter = document.querySelector("inter");
	switch (etape) {
		case "selectQuizz":
			document.querySelector("inter tete titre p").innerHTML = "Quizz<br>" + objet.description;
			document.querySelector("inter tete points").style.display = "none";
			gestNiveaux(objet);
			scanQuestion(objet);	// analyse du scénario
           /* gestJauge();	// MAJ de la jauge
            document.querySelector("inter question p").style.display = "flex";
			document.querySelector("inter question p").innerHTML = quizz[0].description;
			document.querySelector("inter propositions").style.display = "none";
            document.querySelector("inter complement").style.display = "flex";
            document.querySelector("inter complement p").innerHTML = "Vous allez analyser le match avec des questions de niveau " + nbQuests[niveauQuest].niv + ".<br><br>Cliquez sur le bouton Play sur la vidéo pour déclencher le visionnage du match"
            document.querySelector("inter complement img").style.display = "none";
			// score
			document.querySelector("inter suite score p").style.display = "none";
			addScore(0);	// on init même si c'est masqué
			// next
			document.querySelector("inter suite next img").style.display = "none";*/
			document.querySelector("inter").style.display = "flex";
            break;
        
		default:
			inter.display = "none";
	}
}

function gestNiveaux(quizz) {
	let idBadge = quizz.badge;

    let badge = document.querySelector("inter tete niveau");
	img = document.createElement("img");
	img.setAttribute("title", nbQuests[idBadge+1].niv);
	img.setAttribute("alt", nbQuests[idBadge+1].niv);
	img.setAttribute("src", pathBadges + "badge_"+idBadge+".png");
    badge.appendChild(img);

}


function scanQuestion(fichier) {
let script = eval("script" + "1");
console.log(script);
	let niv = 0;

	// scanne des actions et imputation des points ou pas
	for (let ind = 0; ind < arrayAssoSize(script); ind++) {
				nbQuests[niv].nb++;	// nombre de Questions
				nbQuests[niv].points+= script[ind].points;	// nombre de points MAX
	}
	console.log(nbQuests);
	return nbQuests;	// on renvoi le nombre de Question du nouveau niveau
}

function gestJauge() {
    let pourCent = 0;
    //MAJ de la jauge
    let jauge = document.getElementsByClassName("progress-bar");
    
    if (numQuestion == 0) {
        jauge[0].setAttribute("aria-valuenow", 0);
        jauge[0].setAttribute("style", "width: 0%");
        jauge[0].innerHTML = nbQuests[niveauQuest].nb + " Questions";
    } else {
        jauge[0].setAttribute("aria-valuenow", numQuestion);
        pourCent = numQuestion / nbQuests[niveauQuest].nb * 100;
        jauge[0].setAttribute("style", "width: " + pourCent + "%");
        jauge[0].innerHTML = numQuestion;
    }
}

function addScore(value) {
    if (value === 0) {
        videoNbPoint = 0;
    } else {
        videoNbPoint = videoNbPoint + value;
    }
    var score = ('0' + videoNbPoint.toString()).substr(-2);       // on a le score avec deux digits
    var scoreMax = ('0' + nbQuests[niveauQuest].points.toString()).substr(-2);

    let myColor = ((videoNbPoint / nbQuests[niveauQuest].points) > 0.5 ? 'green' : 'black');
    let myScore = '<span style="color:'+ myColor +';">' + score + '</span>';

    document.querySelector("inter suite score p").innerHTML = myScore + ':' + scoreMax;
}