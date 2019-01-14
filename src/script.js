var media_events = new Array();
media_events["loadstart"] = 0;
media_events["progress"] = 0;
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

var myURLcomplete = document.location.href;
var myURL  = myURLcomplete.substring( 0 ,myURLcomplete.lastIndexOf( "/" ) );

// variables globales
//var videoMaxPoint = 0;		// nb points maximum
var videoNbPoint = 0;		// nb points en cours
var stepBarre = 0;			// % de progression pour une question
var stepDone = 0;			// % de progression effectué
var niveauQuest = 1		//niveau par défaut au démarrage
var idVideo = null;		// vidéo en cours
//var nbQuest = 0;			// nombre de question sur la vidéo de niveau
var nbQuests = [
	{niv: "COURANT", nb: 0, points: 0},
	{niv: "DEBUTANT", nb: 0, points: 0},
	{niv: "CONFIRME", nb: 0, points: 0}
];		// le niveau 0 est le niveau en cours
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
	document._video = document.getElementById("video");
	listeVideos("videos");					// créé la barre des vidéos disponibles
}

function showZone(id, state) {
	const myState = (state === true ? "visible" : "hidden");
	const el = document.getElementById(id);
	el.setAttribute("style","visibility:"+ myState +";");
}

function showItem(id, state) {
	let myState = (state === true ? "show" : "hide");
	const el = document.getElementById(id);
	switch (myState) {
		case "show":
		(el.classList.contains("hide") ? el.classList.replace("hide", "show") : el.classList.add("show"));
		break;

		default:
		(el.classList.contains("show") ? el.classList.replace("show", "hide") : el.classList.add("hide"));	
	}
}

function listeVideos(id) {
	// création des boutyons pour les vidéos
	//<button onclick="switchVideo(3);">MAH00065</button>
	var tbody = document.getElementById(id);
	tr = document.createElement("tr");
	for (i=0; i < arrayAssoSize(tableau); i++) {
		var td = document.createElement("td");
		var btn = document.createElement("button");
		btn.textContent = tableau[i][0].titre;
		btn.setAttribute("name", i);
		btn.setAttribute("onclick", 'switchVideo('+ tableau[i][0].id +');');
		td.appendChild(btn);
		tr.appendChild(td);		
	}
	tbody.appendChild(tr);
}

function listeEvents(id, arrayEventDef) {
	// intercepte tous les évènements pour les renseigner
	var f;
    for (key in arrayEventDef) {
		document._video.addEventListener(key, capture, false);
    }

	var e_loadstart = document.getElementById('e_loadstart');
	if (e_loadstart) {
		for (key in arrayEventDef) {
			var elt = document.getElementById('e_' + key);
			elt.textContent = "0";
		}
	} else {
		// à créer
		var tbody = document.getElementById(id);
		var i = 1;
		var tr = null;
		for (key in arrayEventDef) {
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

function init_properties(id, arrayPropDef, arrayProp) {
	for (key in arrayProp) {
		document._video.addEventListener(key, capture2, false);
	}
	
    var tbody = document.getElementById(id);
    var i = 0;
    var tr = null;
    do {
		if (tr == null) tr    = document.createElement("tr");
		var th = document.createElement("th");
		th.textContent = arrayPropDef[i];
		var td = document.createElement("td");
		var r;
		td.setAttribute("id", "p_" + arrayPropDef[i]);
		r = eval("document._video." + arrayPropDef[i]);
		td.textContent = r;
		if (typeof(r) != "undefined") {
		    td.className = "true";
		} else {
		    td.className = "false";
		}
		tr.appendChild(th);
		tr.appendChild(td);
		arrayProp[i] = td;
		if ((++i % 3) == 0) {
		    tbody.appendChild(tr);
		    tr = null;
		}
    } while (i < arrayPropDef.length);
    if (tr != null) tbody.appendChild(tr);
}

function capture(event) {
	// attention : si l'on change les ligne sde place dans cette fonction, on peut être dans la situation de gérer deux appels  àun même évènement
	if (event.type === 'timeupdate') {
		// recherche s'il existe un traitement a effectuer
		var seq = Math.trunc(document._video.currentTime);	// on récupère la partie entière du pointeur temps
		if (seq !== seqUsed) {			
			seqUsed = seq;	// évite de jouer deux fois le traitement
			var asWork = arrayAssoSearch(actions, seq);	// renvoi l'indice de l'action si elle existe pour cette séquence

			// on teste si on doit jouer ou pas
			if (asWork > -1) {
				switch(actions[asWork].act) {
					case "question":
					if (actions[asWork].niveau === nbQuests[niveauQuest].niv) {
						mesActions[actions[asWork].act](asWork);	// on appelle le traitement nécessaire
					}
					break;

					case "information":
						mesActions[actions[asWork].act](asWork);	// on appelle le traitement nécessaire
					break;

					case "fin":
						mesActions[actions[asWork].act](asWork);	// on appelle le traitement nécessaire
					break;

					case "allerA":
						mesActions[actions[asWork].act](asWork);	// on appelle le traitement nécessaire
					break;
				}
			}

			/*if (asWork > -1 && actions[asWork].niveau === nbQuests[niveauQuest].niv) {
				// il y a une action				
				mesActions[actions[asWork].act](asWork);	// on appelle le traitement nécessaire
			}*/	
		}
		media_events["currentTime"] = seq;	// MAJ de la valeur dans le tableau (pour info)
	}
	media_events[event.type]++;		// traitement : on augmente de 1
}

function getVideo() {
	return document._video;
}

function update_properties() {
	//</tr><th>currentTime</th><td id="p_currentTime" class="true">3.561355</td>

    var i = 0;
    for (key in media_events) {
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
    for (var key in arr) 
    {
        if (arr.hasOwnProperty(key)) size++;
    }
    return size;
}

// scanne d'un tableau associatif
function arrayAssoSearch(arr, valObject) {
	var nbEl = arrayAssoSize(arr);
	for (ind = 0; ind < nbEl; ind++) {
		if (arr[ind].step === valObject) {
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
	// init
	nbQuests[1].nb = 0;
	nbQuests[2].nb = 0;
	nbQuests[1].points = 0;
	nbQuests[2].points = 0;
	// scanne des actions
	for (ind = 0; ind < arrayAssoSize(actions); ind++) {
		switch(actions[ind].act) {
			case  "question": 
				let niv = (actions[ind].niveau === "DEBUTANT" ? 1: actions[ind].niveau === "CONFIRME" ? 2 : 0);
				nbQuests[niv].nb++;
				nbQuests[niv].points+= actions[ind].points;
				break;
			
			/*case "information":
				document.getElementById("description").innerHTML = actions[ind].libelle;
				break;*/
		}
	}
}

function switchVideo(n) {
	// affectation de la nouvelle vidéo et des attributs liés
	
	if (n > arrayAssoSize(tableau)) {
		// vérifie si l'index de la vidéo existe dans le fichier tableau.js
		n = 0;
		return false;
	} else {
		// MAJ videos
		idVideo = n;		// maj de l'indice de la vidéo en cours
		video = tableau[n-1];    // recup données de la vidéo
		// affectation video à la zone
		var mp4 = document.getElementById("mp4");
		document._video.setAttribute("poster", video[0].poster);
		mp4.setAttribute("src", "videos/" + video[0].fichier);
		document.getElementById("description").innerHTML = video[0].description;

		document._video.load();

		//
		// travail sur les actions et l'IHM associée
		//
		actions = video[1];    // recup tableau des actions (position 3)
		scanQuestion();		// scanne des actions du niveau et met à jour le tableau des niveaux
		// le niveau est pris en charge par la fonction appelante changeLevel et la fonction INIT pour le premier tour
		nbQuests[0].nb = nbQuests[niveauQuest].nb;
    	nbQuests[0].points = nbQuests[niveauQuest].points;
		// barre de progression
		stepBarre = Math.trunc(100 / nbQuests[0].nb);		// valeur pour une tranche de progression
		init_barre();
		// Score
		videoNbPoint = 0;						// nb points en cours
		document.getElementById("scoreBoard").innerHTML = videoNbPoint.toString() + ' / ' + (nbQuests[0].points).toString();
		// titre cartouche message
		document.getElementById("quest").innerHTML = "INFORMATION";

		listeEvents("events", media_events);	// créé le tableau des évènements vidéos
		setInterval(update_properties, 200);	// lance le process de MAJ des évènements	

		// Niveau
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

		// camps
		document.getElementById("gauche").innerHTML = video[0].gauche;
		document.getElementById("droite").innerHTML = video[0].droite;
		
		showItem("fondVideo", false);
		showItem("videoOn", true);
		showItem("zCamp", true);
		showItem("goulotte", true);
		showItem("board", true);	
		showItem("zPropositions", false);
		showItem("zLoi", false);
		showItem("zSuite", false);
		encadreVideo(false);
		showZone("zConseiller", false);
	}
}

function encadreVideo(state) {
	let myState = (state === true ? "videoEncadre" : "videoNonEncadre");
	const el = document.getElementById("video");
	switch (myState) {
		case "videoEncadre":
		(el.classList.contains("videoNonEncadre") ? el.classList.replace("videoNonEncadre", "videoEncadre") : el.classList.add("videoEncadre"));
		break;

		default:
		(el.classList.contains("videoEncadre") ? el.classList.replace("videoEncadre", "videoNonEncadre") : el.classList.add("videoNonEncadre"));	
	}
}