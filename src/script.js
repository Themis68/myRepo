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
var videoMaxPoint = 0;		// nb points maximum
var videoNbPoint = 0;		// nb points en cours
var stepBarre = 0;			// % de progression pour une question
var stepDone = 0;			// % de progression effectué

/* image du conseiller 
a utiliser après pour avoir une image dynamique
*/
function chargeImgConseiller() {	
	var myConseiller = document.getElementById('zMessage');
	// afficher une image qui a pour index 1 à 4
	myConseiller.background = myURL + '/images/conseiller/tete'+ Math.floor(Math.random() * Math.floor(4) + 1)+'.png';
}

var seqUsed = -1;	// valeur de l'étape de la séquence qui a été traitée

document.addEventListener("DOMContentLoaded", init, false);	// lance l'écoute des évènements

function init() {
	document._video = document.getElementById("video");
	listeVideos("videos");					// créé la barre des vidéos disponibles
}

function listeVideos(id) {
	// création des boutyons pour les vidéos
	//<button onclick="switchVideo(3);">MAH00065</button>
	var tbody = document.getElementById(id);
	tr = document.createElement("tr");
	for (i=0; i < arrayAssoSize(tableau); i++) {
		var td = document.createElement("td");
		var btn = document.createElement("button");
		btn.textContent = tableau[i][1];
		btn.setAttribute("name", i);
		btn.setAttribute("onclick", 'switchVideo('+ tableau[i][0]+');');
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
		console.log('key', key);
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
			if (asWork > -1) {
				// il y a une action				
				mesActions[actions[asWork].act](asWork);	// on appelle le traitement nécessaire
			}			
		}
		media_events["currentTime"] = seq;	// MAJ de la vakeur dans le tableau (pour info)
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
	/*
	for (key in media_properties) {
		var val = eval("document._video." + media_properties[key]);
		media_properties_elts[i++].textContent = val;
	}
	*/
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

// scanne d'un ableau associatif
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
	console.log('stepDone', stepDone);
	let step = stepBarre * stepDone;							// valeur à implémenter
	let questDone = document.getElementById("questDone");
	questDone.setAttribute("style","width:"+ step +"%");
	let questDo = document.getElementById("questDo");
	questDo.setAttribute("style","width:"+ (100 - step) +"%");
}

function switchVideo(n) {
	// affectation de la nouvelle vidéo et des attributs liés
	stepBarre = Math.trunc(100 / tableau[n-1][6]);		// valeur pour une tranche de progression
	console.log('stepBarre', stepBarre, 'nb quest', tableau[n-1][6]);
	init_barre();				// on passe l'état de progression
	
	if (n > arrayAssoSize(tableau)) {
		// vérifie si l'index de la vidéo existe dans le ficheir tableau.js
		n = 0;
		return false;
	} else {
		var mp4 = document.getElementById("mp4");
		var parent = mp4.parentNode;
		document._video.setAttribute("poster", tableau[n-1][2]);
		mp4.setAttribute("src", "videos/" + tableau[n-1][1] + ".mp4");
		document._video.load();
				//resize(300,200);

		listeEvents("events", media_events);	// créé le tableau des évènements vidéos
		setInterval(update_properties, 200);	// lance le process de MAJ des évènements	

		// Niveau
		document.getElementById("btnLevel").value = tableau[n-1][4];

		// Score
		videoMaxPoint = tableau[n-1][5];		// nb points maximum
		videoNbPoint = 0;						// nb points en cours
		document.getElementById("scoreBoard").innerHTML = videoNbPoint.toString() + ' / ' + videoMaxPoint.toString();
		
		// ré-init du tableau
		video = tableau[n-1];    // initialisation de la vidéo
		actions = video[3];    // initialisation des actions

		showItem("fondVideo", false);
		showItem("videoOn", true);
		showItem("goulotte", true);
		showItem("board", true);	
		showItem("btnMsg", false);	
	}
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
/*
function resize(larg, haut) {
    document._video.width = larg;
	document._video.height = haut;
	document._video.load();
	/*
	 document._video.width = document._video.videoWidth + 10;
	document._video.height = document._video.videoHeight + 10;
	
}
*/