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
var pathFanions = pathImages + "fanions/";		// fanions des equipes

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
		myImg.setAttribute("src", pathQuizz + (scenario[i][0].poster || pathImages + "stade.jpg"));

		// caption
		let myCaption = document.createElement("div");

		// badge
		let myF = document.createElement("img");
		myF.className = "carouselFanion";
		myF.setAttribute("title", "badge" + i);
		myF.setAttribute("src", pathImages + "badge_"+(scenario[i][0].badge || "fff.png'"));
		myCaption.appendChild(myF);
		
        let myP = document.createElement("p");        
		myP.innerHTML = scenario[i][0].titre;
		myCaption.appendChild(myP);
		myCaption.className = "carousel-caption d-none d-md-block";
		myCaption.setAttribute("onclick", 'javascript:switchVideo('+ scenario[i][0].id +');');	// mettre ici car cette DIV est au-dessus de l'image
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
	// affiche/cache un objet repéré par un id
	//
	// exemple appel : bascule(id)
	// - id de l'objet
	//
	let carousel = document.querySelector("carousel");
	let span = document.querySelector("bascule span");

	if (this.src.indexOf("fermee") > 0 ){
		// on ouvre
		carousel.style.display = "flex";
		this.src = pathImages + "fleche_ouverte.png";
		this.alt = "affiche la liste des matchs";
		span.innerHTML = "cliquez sur la vignette du match que vous souhaitez arbitrer";
	} else {
		// on ferme
		carousel.style.display = "none";
		this.src = pathImages + "fleche_fermee.png";
		this.alt = "masque la liste des matchs";
		span.innerHTML = "cliquez sur cet icône pour afficher les matchs disponibles";
	}	
}