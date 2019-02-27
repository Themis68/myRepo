
var media_events = new Array();
media_events["loadstart"] = 0;
//media_events["progress"] = 0;
//media_events["suspend"] = 0;
//media_events["abort"] = 0;
//media_events["error"] = 0;
//media_events["emptied"] = 0;
//media_events["stalled"] = 0;
//media_events["loadedmetadata"] = 0;
//media_events["loadeddata"] = 0;
//media_events["canplay"] = 0;
//media_events["canplaythrough"] = 0;
//media_events["playing"] = 0;
//media_events["waiting"] = 0;
//media_events["seeking"] = 0;
//media_events["seeked"] = 0;
//media_events["ended"] = 0;
//media_events["durationchange"] = 0;
media_events["timeupdate"] = 0;
//media_events["play"] = 0;
//media_events["pause"] = 0;
//media_events["ratechange"] = 0;
//media_events["resize"] = 0;
//media_events["volumechange"] = 0;
media_events["currentTime"] = 0;

// varianbles des videos
var nivZoom = 1;
var video = [];
var actions = [];
var isDefineBVideoJS = false;
var timeCode = '';

var avatar = '';

var oldStep = null;	// conserve la valeur de step pour gérer le replay

var myURLcomplete = document.location.href;
var myURL  = myURLcomplete.substring( 0 ,myURLcomplete.lastIndexOf( "/" ) );

// variables globales
//var videoMaxPoint = 0;		// nb points maximum
var videoNbPoint = 0;		// nb points en cours
var stepBarre = 0;			// % de progression pour une question
var stepDone = 0;			// % de progression effectué
var niveauQuest = 1		//niveau par défaut au démarrage
var idVideo = null;		// vidéo en cours
var nbQuests = [
	{niv: "COURANT", nb: 0, points: 0},
	{niv: "DEBUTANT", nb: 0, points: 0},
	{niv: "CONFIRME", nb: 0, points: 0}
];		// le niveau 0 est le niveau en cours
var questionsFaites = [];

/* image du conseiller 
a utiliser après pour avoir une image dynamique
*/
function chargeImgConseiller() {	
	return myURL + '/images/conseiller/tete'+ Math.floor(Math.random() * Math.floor(4) + 1)+'.png';
}

var seqUsed = -1;	// valeur de l'étape de la séquence qui a été traitée

document.addEventListener("DOMContentLoaded", init, false);	// lance l'écoute des évènements

function init() {
	showZone("zConseiller", false);
	document._video = document.getElementById("myVideo");
	listeVideos("videos");					// créé la barre des vidéos disponibles
}

function showZone(id, state, isEnd) {
	// gère les DIV qui ont "display:flex"
	const myState = (state === true ? "visible" : "hidden");
	const el = document.getElementById(id);
	el.setAttribute("style","visibility:"+ myState +";" + (isEnd ? "border: solid chocolate 10px;" : "border:"));
}

function showItem(id, state) {
	// gère les DIV qui ont "display:block"
	let myState = (state === true ? "show" : "hide");
	const el = document.getElementById(id);
	if (myState === "show") {
		(el.classList.contains("hide") ? el.classList.replace("hide", "show") : el.classList.add("show"));
	} else {
		(el.classList.contains("show") ? el.classList.replace("show", "hide") : el.classList.add("hide"));	
	}
}

function listeVideos(id) {
	let tr2 = document.getElementById('videos2');
	//let tr2 = document.createElement("tr");

			// création des vignettes
	for (let i = 0; i < arrayAssoSize(scenario); i++) {
		let larg = '100px';
		let haut = '80px';
		let td2 = document.createElement("td");
		td2.setAttribute("width", larg);
		td2.setAttribute("height", haut);
		td2.setAttribute("title", scenario[i][0].description);
		let content = '<img src="'+ myURL + '/images/fanions/'+ scenario[i][0].gauche.fanion +'" width="30%" height="30%"/>';
		content += '&nbsp;&nbsp;<img src="'+ myURL + '/images/fanions/'+ scenario[i][0].droite.fanion +'" width="30%" height="30%"/>';
		td2.innerHTML = content;
		td2.style.backgroundSize = larg + " " + haut;
		td2.style.backgroundRepeat = "no-repeat";
		td2.style.backgroundImage = "url("+ scenario[i][0].poster +")";
		td2.style.border = "white 3px solid";
		td2.className = "thumb";
		td2.setAttribute("onclick", 'switchVideo('+ scenario[i][0].id +');');	
		tr2.appendChild(td2);
	}
	//tbody2.appendChild(tr2);
}

function listeEvents(id, arrayEventDef) {
	// intercepte tous les évènements pour les renseigner
    for (let key in arrayEventDef) {
		document._video.addEventListener(key, capture, false);
    }

	var e_loadstart = document.getElementById('e_loadstart');
	if (e_loadstart) {
		for (let key in arrayEventDef) {
			var elt = document.getElementById('e_' + key);
			elt.textContent = "0";
		}
	} else {
		// à créer
		var tbody = document.getElementById(id);
		var i = 1;
		var tr = null;
		for (let key in arrayEventDef) {
			if (tr == null) tr = document.createElement("tr");
			var th = document.createElement("th");
			th.textContent = key;
			var td = document.createElement("td");
			td.setAttribute("id", "e_" + key);
			td.textContent = "0";
			td.className = "false";
			tr.appendChild(th);
			tr.appendChild(td);

			if ((i++ % 5) == 0) {
				tbody.appendChild(tr);
				tr = null;
			}
		}
		if (tr != null) tbody.appendChild(tr);
	}
}

function convertInTimeCode(myStep) {
	var step1 = myStep;		
	var heures = Math.trunc(step1 / 3600);
	step1 = step1 - (heures * 3600);
	var minutes = Math.trunc(step1 / 60);
	var secondes = Math.trunc(step1 - (minutes * 60));
	return timeCode = ('0' + heures).substr(-2) + ':' + ('0' + minutes).substr(-2) + ':' + ('0' + secondes).substr(-2);
}

function capture(event) {
	// attention : si l'on change les ligne sde place dans cette fonction, on peut être dans la situation de gérer deux appels  àun même évènement
	if (event.type === 'timeupdate') {
		var seq = Math.trunc(document._video.currentTime);	// on récupère la partie entière du pointeur temps
		if (seq !== seqUsed) {	
			seqUsed = seq;	// évite de jouer deux fois le traitement
			if (seq < oldStep) {
				// on recule
				showItem("echange", false);
    			showZone("zSuite", false); 
    			encadreVideo(false);
    			showZone("zConseiller", false);
			} else {
				timeCode = convertInTimeCode(seq);
				var asWork = arrayAssoSearch(actions, timeCode);	// renvoi l'indice de l'action si elle existe pour cette séquence
				// on teste si on doit jouer ou pas
				if (asWork > -1) {
					switch(actions[asWork].act) {
						case "question":
						case "bonus":
						case "information":
						case "allerA":
							if (actions[asWork].niveau === nbQuests[niveauQuest].niv) {
								mesActions[actions[asWork].act](asWork);	// on appelle le traitement nécessaire
							}
							break;

						case "fin":
						case "mitemps":
							mesActions[actions[asWork].act](asWork);	// on appelle le traitement nécessaire
							break;
					}
				}
			}
		}
		media_events["currentTime"] = seq;	// MAJ de la valeur dans le scenario (pour info)
	}
	media_events[event.type]++;		// traitement : on augmente de 1
	oldStep = seq;
}

function getVideo() {
	return document._video;
}

function update_properties() {
    for (let key in media_events) {
		var e = document.getElementById("e_" + key);
		if (e) {
		    e.textContent = media_events[key];
		    if (media_events[key] > 0) e.className = "true";
		}
	}
}

// retourne la taille d'un tableau associatif
function arrayAssoSize(arr) {
    var size = 0;
    for (let key in arr) 
    {
        if (arr.hasOwnProperty(key)) size++;
    }
    return size;
}

// scanne d'un tableau associatif
function arrayAssoSearch(arr, valObject) {
	var nbEl = arrayAssoSize(arr);
	for (let ind = 0; ind < nbEl; ind++) {
		if (arr[ind].step2 === valObject) {
			return ind;	// retourne l'indice du tableau
		}
	}
	return -1;	// aucun résultat
}

function init_barre() {
	let step = stepBarre * stepDone;							// valeur à implémenter
	let questDone = document.getElementById("questDone");
	questDone.setAttribute("style","width:"+ step +"%");
	if(stepDone !== 0 ) {
		document.getElementById("curStep").innerHTML = stepDone;
	} else {
		document.getElementById("curStep").innerHTML = '';
	}
	let questDo = document.getElementById("questDo");
	if(stepDone !== nbQuests[0].nb ) {
		document.getElementById("nbQuest").innerHTML = nbQuests[0].nb;
	} else {
		document.getElementById("nbQuest").innerHTML = '';
	}
	questDo.setAttribute("style","width:"+ (100 - step) +"%");
}

function scanQuestion() {
	let niv = 0;
	// init
	nbQuests[1].nb = 0;
	nbQuests[2].nb = 0;
	nbQuests[1].points = 0;
	nbQuests[2].points = 0;
	// scanne des actions et imputation des points ou pas
	for (let ind = 0; ind < arrayAssoSize(actions); ind++) {
		if(actions[ind].act === "question") {
				niv = (actions[ind].niveau === "DEBUTANT" ? 1: actions[ind].niveau === "CONFIRME" ? 2 : 0);
				nbQuests[niv].nb++;
				nbQuests[niv].points+= actions[ind].points;
		}
	}
}

function zoom(id) {
	switch (id) {
		case 1:
		nivZoom = nivZoom + 0.1;
		break;

		case -1:
		nivZoom = nivZoom - 0.1;
		break;
	}	
	myVideo.zoomrotate({zoom: nivZoom, rotate: 0});
}

function switchVideo(n) {
	// affectation de la nouvelle vidéo et des attributs liés
	
	if (n > arrayAssoSize(scenario)) {
		// vérifie si l'index de la vidéo existe dans le fichier tableau.js
		n = 0;
		return false;
	} else {
		// MAJ videos
		idVideo = n;		// maj de l'indice de la vidéo en cours
		video = scenario[n-1];    // recup données de la vidéo

		if (isDefineBVideoJS) {
			myVideo.src({src: "./videos/" + video[0].fichier , type: "video/mp4"});
			myVideo.poster(video[0].poster);
		} else {
			myVideo = videojs('myVideo', {
				controls: true,
				preload:  'none',
				loop: false,
				fluid: true,
				poster: video[0].poster,
				controlBar: {
					volumeMenuButton: {
					inline: false,
					vertical: true
					}
				},
				sources: [{
					src: "./videos/" + video[0].fichier,
					type: "video/mp4"
				}],
				zoom: {
					lab: '1x',
					val: 1
				},
				plugins: {
					brand: {
						image: myURL + '/images/EMouzmini.png',
						title: "club Etoile Mouzillonnaise de football",
						destination: "https://etoile-mouzillon.footeo.com/",
						destinationTarget: "_blank",
						width: 20,
						height: 20
					},
					videoJsZoom: {
						default: true,
						dynamicLabel: true,	// false affiche l'icone du bouton sinon on a le label directement
						niveaux: [
								{lab: '2.5x', val: 2.5}, {lab: '2x', val: 2}, {lab: '1.5x', val: 1.5}, {lab: '1x', val: 1}
						]
					}	
				}
			});
		}
		isDefineBVideoJS = true;

		myVideo.load();
		//
		// travail sur les actions et l'IHM associée
		//
		actions = video[1];    // recup tableau des actions (position 3)
		scanQuestion();		// scanne des actions du niveau et met à jour le tableau des niveaux
		// le niveau est pris en charge par la fonction appelante changeLevel et la fonction INIT pour le premier tour
		nbQuests[0].nb = nbQuests[niveauQuest].nb;
		nbQuests[0].points = nbQuests[niveauQuest].points;
		// tableaux du jeu
		questionsFaites.splice(0, questionsFaites.length);	// efface le contenu
		// Score
		//videoNbPoint = 0;						// nb points en cours
		document.getElementById("textBoard").innerHTML = "SCORE DE " + avatar.toUpperCase();
		addScore(0);
		//document.getElementById("scoreBoard").innerHTML = videoNbPoint.toString() + ' / ' + (nbQuests[0].points).toString();
		// barre de progression (après score sinon on n'a pas l'init des valeurs)
		stepBarre = Math.trunc(100 / nbQuests[0].nb);		// valeur pour une tranche de progression
		stepDone = 0;
		init_barre();
		// titre cartouche message
		document.getElementById("quest").innerHTML = "INFORMATION";
		document.getElementById("message").innerHTML = video[0].description + "<br><br> Vous pouvez lancer la vidéo";

		listeEvents("events", media_events);	// créé le tableau des évènements vidéos
		setInterval(update_properties, 200);	// lance le process de MAJ des évènements	

		// NIVEAUX
		let myB = null;
		switch (niveauQuest) {
			case 1:
			myB = document.getElementById("btnLevel1");
			myB.setAttribute("style", "background-color:limegreen");
			myB = document.getElementById("btnLevel2");
			myB.setAttribute("style", "background-color:buttonface");
			break;
	
			case 2:
			myB = document.getElementById("btnLevel2");
			myB.setAttribute("style", "background-color:limegreen");
			myB = document.getElementById("btnLevel1");
			myB.setAttribute("style", "background-color:buttonface");
			break;
		}

		// EQUIPES
		gestionCamps(1);	// affichage des informations sur l'équipe pour la première mi-temps
		
		showItem("fondVideo", false);
		showItem("videoOn", true);
		showItem("zCamp", true);
		showItem("goulotte", true);
		showItem("board", true);	
		showItem("zPropositions", false);
		showItem("zLoi", false);
		showZone("zSuite", false);
		encadreVideo(false);
		showZone("zConseiller", false);

		// titre de la page
		let msg = document.getElementById("msgVideo");
		msg.style.fontFamily = "scoreboardregular";
		msg.style.fontSize = "24pt";
		msg.style.color = "white";
		msg.style.textAlign = "center";
		msg.innerHTML = "Arrêt sur image !";
	}
}

function gestionCamps(mitemps) {
	let codeG = '';
	let codeD = '';

	switch (mitemps) {
		case 1:
			codeG = '<img src="'+ myURL + '/images/fanions/'+ video[0].gauche.fanion +'" width="20%" height="20%"/>';
			codeG+= '<span class="fanion">' + video[0].gauche.nom + '</span>';
			codeD = '<span class="fanion">' + video[0].droite.nom + '</span>';
			codeD+= '<img src="'+ myURL + '/images/fanions/'+ video[0].droite.fanion +'" width="20%" height="20%" />';
			break;
		case 2:
			codeG = '<img src="'+ myURL + '/images/fanions/'+ video[0].droite.fanion +'" width="20%" height="20%"/>';
			codeG+= '<span class="fanion">' + video[0].droite.nom + '</span>';
			codeD = '<span class="fanion">' + video[0].gauche.nom + '</span>';
			codeD+= '<img src="'+ myURL + '/images/fanions/'+ video[0].gauche.fanion +'" width="20%" height="20%" />';
			break;
	}

	document.getElementById("gauche").innerHTML = codeG;
	document.getElementById("droite").innerHTML = codeD;
}
function encadreVideo(state) {
	let myState = (state === true ? "videoEncadre" : "videoNonEncadre");
	const el = document.getElementById("myVideo");
	if (myState === "videoEncadre") {
		(el.classList.contains("videoNonEncadre") ? el.classList.replace("videoNonEncadre", "videoEncadre") : el.classList.add("videoEncadre"));
	} else {
		(el.classList.contains("videoEncadre") ? el.classList.replace("videoEncadre", "videoNonEncadre") : el.classList.add("videoNonEncadre"));	
	}
}

function user() {
	let avatarOk = false;
	const reg = /^([a-zA-Z]){3,20}$/g;	// accepte des chaines de caractères jusqu'à 5 caractères
	do {
		avatar = prompt("Indique ton prénom s'il te plait (3 à 20 lettres maximum)");
		avatarOk = reg.exec(avatar);
	}
	while (!avatarOk);
	document.getElementById("msgVideo").innerHTML = "Bonjour "+ avatar.toUpperCase() + ". Merci de sélectionner une vidéo ci-dessous";
}