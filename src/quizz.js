var scripts = [];
var actions = [];
var actionEnCours = [];
var timeCode = '';
var avatar = '';
var myURLcomplete = document.location.href;
var myURL  = myURLcomplete.substring( 0 ,myURLcomplete.lastIndexOf( "/" ) );
var videoNbPoint = 0;		// nb points en cours
var stepBarre = 0;			// % de progression pour une Question
var stepDone = 0;			// % de progression effectué
var niveauQuest = 1		//niveau par défaut au démarrage
var idQuizz = null;		// quizz en cours
var nbQuests = [
	{niv: "COURANT", nb: 0, points: 0},
	{niv: "DEBUTANT", nb: 0, points: 0},
	{niv: "CONFIRME", nb: 0, points: 0},
	{niv: "EXPERT", nb: 0, points: 0}
];		// le niveau 0 est le niveau en cours
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
//
    // affectation de la nouvelle vidéo et des attributs liés
    //;


	if (n > arrayAssoSize(scenario)) {
		// vérifie si l'index de la vidéo existe dans le fichier tableau.js
		n = 0;
		return false;
	} else {
		// MAJ videos
		idQuizz = n;		// 1 = première vidéo
		quizz = scenario[n-1];    // recup scénario de la vidéo
		idQuizzOn = n; //video[0].id;
		
		//
		// travail sur les actions et l'IHM associée
		//
		actions = quizz[1];    // recup tableau des actions (position 3)

		numQuestion = 0;	// on ré-initialise le nombre e questions

		let inter = document.getElementById("inter");
		gestionBoard("selectQuizz");
		document.querySelector("inter").style.display = "flex";
	}
}

function gestionBoard(etape, objet) {
	let inter = document.querySelector("inter");
	switch (etape) {
		case "selectQuizz":
			document.querySelector("inter tete titre p").innerHTML = "Match";
			document.querySelector("inter tete points").style.display = "none";
			gestNiveaux(idQuizzOn);
			scanQuestion();	// analyse du scénario
            gestJauge();	// MAJ de la jauge
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
			document.querySelector("inter suite next img").style.display = "none";
            break;
        
		default:
			inter.display = "none";
	}
}

function gestNiveaux(idVideo) {

    deleteChild("inter tete niveau button");	// on supprime l'existant

    let button = document.querySelector("inter tete niveau button");
    let span = document.createElement("span");

    for (let i=0; i < 3; i++) {
        span.id = "level" + (i+1);
        span.className = ((i+1) === niveauQuest ? "badge badge-current badge-light" : "badge badge-light");
		span.setAttribute("onclick","fNiveaux("+ (i + 1) + "," + idVideo +");"); 
		span.setAttribute("title", nbQuests[i+1].niv);
		span.setAttribute("alt", nbQuests[i+1].niv);
        span.innerHTML = (i + 1);
        button.appendChild(span);
        span = document.createElement("span");
    }
}


function scanQuestion() {
	//let actions = video[1];

	// init
	nbQuests[1].nb = 0;		// niveau débutant
	nbQuests[2].nb = 0;		// niveau confirmé
	nbQuests[3].nb = 0;		// niveau expert
	nbQuests[1].points = 0;	// niveau débutant
	nbQuests[2].points = 0;	// niveau confirmé
	nbQuests[3].points = 0;	// niveau expert

	let niv = 0;

	// scanne des actions et imputation des points ou pas
	for (let ind = 0; ind < arrayAssoSize(actions); ind++) {
		if((actions[ind].act === "Question")) {
			// calcul du compteur
			switch (actions[ind].niveau) {
				case "DEBUTANT":
					niv = 1;
					break;
				case "CONFIRME":
					niv = 2;
					break;
				case "EXPERT":
					niv = 3;
					break;
				default:
					niv = 0;
			}
				//niv = (actions[ind].niveau === "DEBUTANT" ? 1: actions[ind].niveau === "CONFIRME" ? 2 : 0);
				nbQuests[niv].nb++;	// nombre de Questions du nouveau niveau
				nbQuests[niv].points+= actions[ind].reponse.points;	// nombre de points MAX du nouveau niveau
		}
	}
	// MAJ boutons niveaux
	document.getElementById("level1").style.display = (nbQuests[1].nb > 0 ? "flex" : "none");
	document.getElementById("level2").style.display = (nbQuests[2].nb > 0 ? "flex" : "none");
	document.getElementById("level3").style.display = (nbQuests[3].nb > 0 ? "flex" : "none");

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