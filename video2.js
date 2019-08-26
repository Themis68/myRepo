// variables EVENTS
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
media_events["playing"] = 0;
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
var isDefineBVideoJS = false;		// permet de gérer la délcaration de videoJS au premier tour
var timeCode = '';
var avatar = '';
var oldStep = null;	// conserve la valeur de step pour gérer le replay
var myURLcomplete = document.location.href;
var myURL  = myURLcomplete.substring( 0 ,myURLcomplete.lastIndexOf( "/" ) );
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
var seqUsed = -1;	// valeur de l'étape de la séquence qui a été traitée
var hauteurContent = 0; // hauteur de la zone CONTENT récupérée lors du chargement
// **********************************************************************************************************

document.addEventListener("DOMContentLoaded", init, false);	// lance l'écoute des évènements et appelle INIT


function user() {
    //
    // demande le nom de l'utilisateur
    //

	let avatarOk = false;
	const reg = /^([a-zA-Z]){3,20}$/g;	// accepte des chaines de caractères jusqu'à 5 caractères
	do {
		avatar = prompt("Indique ton prénom s'il te plait (3 à 20 lettres maximum)");
		avatarOk = reg.exec(avatar);
	}
	while (!avatarOk);
	// OBSOLETE : document.getElementById("msgVideo").innerHTML = avatar.toUpperCase() + " analyse l'arbitrage des matchs proposés";
	document.getElementById("avatar").innerHTML = avatar.toUpperCase();
}

function init() {
    //
    // est appelé en premier par la page lors du chargement
	//
    document._video = document.getElementById("myVideo");   // identification de l'objet video
	creerVignettes("vignettes");					        // générer le vignettes dans le carousel
}

function creerVignettes(id) {
    //
    // générer le vignettes dans le carousel
    //
    let bloc = document.getElementById(id);

			// création des vignettes
	for (let i = 0; i < arrayAssoSize(scenario); i++) {

		// div
		let myDiv = document.createElement("div");
		myDiv.className = "carousel-item col-12 col-sm-6 col-md-4 col-lg-3" + (i === 0?' active':'');

		// img
		let myImg = document.createElement("img");
		myImg.className = "img-fluid mx-auto d-block";
		myImg.setAttribute("alt", "img" + i);
		myImg.setAttribute("title", "img" + i);
		myImg.setAttribute("src", "./videos/" +(scenario[i][0].poster || "./images/pelouses/pelousemini.png"));

		// caption
		let myCaption = document.createElement("div");
		
        let myP = document.createElement("p");        
		myP.innerHTML = scenario[i][0].gauche.nom + "<br>" + scenario[i][0].droite.nom;
		myCaption.appendChild(myP);
		myCaption.className = "carousel-caption d-none d-md-block";
		myCaption.setAttribute("onclick", 'javascript:switchVideo('+ scenario[i][0].id +');');	// mettre ici car cette DIV est au-dessus de l'image

		myDiv.appendChild(myImg);
		myDiv.appendChild(myCaption);

		bloc.appendChild(myDiv);

	}
}

// changement de vidéo
function switchVideo(n) {
    //
    // affectation de la nouvelle vidéo et des attributs liés
    //

	if (n > arrayAssoSize(scenario)) {
		// vérifie si l'index de la vidéo existe dans le fichier tableau.js
		n = 0;
		return false;
	} else {
		// MAJ videos
		idVideo = n;		// maj de l'indice de la vidéo en cours
		video = scenario[n-1];    // recup données de la vidéo
		
		//
		// travail sur les actions et l'IHM associée
		//
		actions = video[1];    // recup tableau des actions (position 3)
		listeEvents("events", media_events);	// créé le tableau des évènements vidéos
        setInterval(update_properties, 200);	// lance le process de MAJ des évènements	
        
        //            
        // Gestion du contenu de la vidéo
		//
		
        if (isDefineBVideoJS) {
            // il y a déjà une vidéo
			myVideo.src({src: "./videos/" + video[0].fichier , type: "video/mp4"});
			myVideo.poster("./videos/" + video[0].poster);
		} else {
            // on créé la vidéo
			myVideo = videojs('myVideo', {
				controls: true,
				preload:  'none',
				loop: false,
				fluid: true,
				poster: ("./videos/" + video[0].poster || "./images/pelouses/pelousemini.png"),
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
					},
					bug: [{
						type: "pict",
						id:"vjs-bug-pictEquipeA",
						visibility: false,
						height: 40,
						width: 40,
						imgSrc: "./images/fanions/" + video[0].gauche.fanion,
						alt: video[0].droite.nom,
						link: "http://www.apple.fr",
						opacity: 0.7,
						padding: '20px',	// top et bottom + right et left
						position: 'tl'
					},{
						type: "text",
						id:"vjs-bug-titreEquipeA",
						visibility: false,
						height: 40,
						libelle: "<span>"+ video[0].gauche.nom +"</span>",
						classeCSS: "vjs-bug-titreEquipBug",
						opacity: 1,
						padding: '30px 70px',	// top et bottom + right et left
						position: 'tl'
					}, 
					{
						type: "text",
						id:"vjs-bug-titreAppBug",
						visibility: false,
						height: "30px",
						libelle: "<span>Arrêt sur Image !</span>",
						classeCSS: "vjs-bug-titreAppBug",
						opacity: 1,
						padding: '10px 40%',	// top et se combine avec le centrage horizontal
						position: 'tc'
					}, 					
					{
						type: "text",
						id:"vjs-bug-textScoreBug",
						visibility: false,
						height: "30px",
						libelle: "SCORE DE " + avatar.toUpperCase() + "&nbsp;&nbsp;<span class=\"scoreBoard\">00 : " + nbQuests[0].points + "</span>&nbsp;&nbsp;niveau " + nbQuests[niveauQuest].niv,
						classeCSS: "vjs-bug-textScoreBug",
						opacity: 1,
						padding: '50px 38%',	// top et se combine avec le centrage horizontal
						position: 'tc'
					}, 
					{
						type: "text",
						id:"vjs-bug-titreEquipeB",
						visibility: false,
						height: 40,
						libelle: "<span>"+ video[0].droite.nom +"</span>",
						classeCSS: "vjs-bug-titreEquipBug",
						opacity: 1,
						padding: '30px 80px',	// top et bottom + right et left
						position: 'tr'
					},
					{
						type: "pict",
						id:"vjs-bug-pictEquipeB",
						visibility: false,
						height: 35,
						width: 35,
						imgSrc: "./images/fanions/" + video[0].droite.fanion,
						alt: video[0].droite.nom,
						link: "http://www.fnac.fr",
						opacity: 0.7,
						padding: '20px',	// top et bottom + right et left
						position: 'tr'
					}]
				}
			});
		}
		isDefineBVideoJS = true;
		myVideo.load();

		// EQUIPES : doit être après le chargement des plugins videos
		gestionCamps(1);	// affichage des informations sur l'équipe pour la première mi-temps

		// affichage de la zone VIDEO
		showContent(true);
	}
}

function listeEvents(id, arrayEventDef) {
    //
    // créé le tableau des évènements vidéos
	//
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
            if (tr == null) {
                tr = document.createElement("tr");
                tr.setAttribute("style", "color:midnightblue"); // on lmasque le texte dans le FOOTER
            }
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

function capture(event) {
	// attention cette fonction n'est appelée que si la vidéo est en marche !!
	// la pause arrête le passage de l'event

	// attention : si l'on change les ligne sde place dans cette fonction, on peut être dans la situation de gérer deux appels  àun même évènement
	if (event.type === 'timeupdate') {
		var seq = Math.trunc(document._video.currentTime);	// on récupère la partie entière du pointeur temps
		if (seq !== seqUsed) {	
			seqUsed = seq;	// évite de jouer deux fois le traitement
			if (seq < oldStep) {
				// on recule
			//	showItem("echange", false);
    		//	showZone("zSuite", false); 
    		//	encadreVideo(false);
    		//	showZone("zConseiller", false);
			} else {
				timeCode = convertInTimeCode(seq);
				var asWork = arrayAssoSearch(actions, timeCode);	// renvoi l'indice de l'action si elle existe pour cette séquence
				// on teste si on doit jouer ou pas
				if (asWork > -1) {
					switch(actions[asWork].act) {
						case "question":
						case "question2":
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
		media_events["playing"] = 1;		// active la gestion de la souris
		// contrôle déplacement souris

	} else 
	{
		media_events["playing"] = 0;	// désactive la gestion de la souris
	}
	media_events[event.type]++;		// traitement : on augmente de 1
	oldStep = seq;
}

function update_properties() {
    //
    // mise à jour des données du tableau vidéo
    //

    for (let key in media_events) {
		var e = document.getElementById("e_" + key);
		if (e) {
		    e.textContent = media_events[key];
		    if (media_events[key] > 0) e.className = "true";
		}
	}
}

function convertInTimeCode(myStep) {
    //
    // tra,sforme un code numérique secondes en format mm:ss
    //
	var step = myStep;		
	var heures = Math.trunc(step / 3600);
	step = step - (heures * 3600);
	var minutes = Math.trunc(step / 60);
	var secondes = Math.trunc(step - (minutes * 60));
	return timeCode = ('0' + heures).substr(-2) + ':' + ('0' + minutes).substr(-2) + ':' + ('0' + secondes).substr(-2);
}

function bascule(id) {
	// affiche/cache un objet repéré par un id
	//
	// exemple appel : bascule(id)
	// - id de l'objet
	//

	// display:none
	let bascule_img = document.getElementById("bascule_img");

	let bascule_titre = document.getElementById("bascule_titre");

	let carousel = document.getElementById("carousel");

	let content = document.getElementById("content");
	content.style.visibility = "collapse";
	
	if (bascule_img.getAttribute("src") === "./images/fleche_fermee.png") {
		//if (carousel.style.visibility === "collapse") {
		// carousel est masquée et on veut l'afficher
		//carousel.style.visibility = "visible";
		carousel.style.display = "flex";
		bascule_img.setAttribute("src","./images/fleche_ouverte.png");	// MAJ icone bascule
		bascule_titre.innerHTML = "cliquez sur la vignette du match que vous souhaitez arbitrer";
		
	} else {
		// carousel est affichée et on veut la masquer
		//carousel.style.visibility = "collapse";
		carousel.style.display = "none";
		bascule_img.setAttribute("src","./images/fleche_fermee.png");	// MAJ icone bascule
		bascule_titre.innerHTML = "cliquez sur cet icône pour afficher les matchs disponibles";
	}

	
}

function gestionCamps(mitemps) {
	let codeG = '';
	let codeD = '';

	switch (mitemps) {
		case 1:
			codeG = '<img src="'+ myURL + '/images/fanions/'+ (video[0].gauche.fanion || 'fff.png') +'" width="20%" height="20%"/>';
			codeG+= '<span class="fanion">' + video[0].gauche.nom + '</span>';
			codeD = '<span class="fanion">' + video[0].droite.nom + '</span>';
			codeD+= '<img src="'+ myURL + '/images/fanions/'+ (video[0].droite.fanion || 'fff.png') +'" width="20%" height="20%" />';
			break;
		case 2:
			codeG = '<img src="'+ myURL + '/images/fanions/'+ (video[0].droite.fanion || 'fff.png') +'" width="20%" height="20%"/>';
			codeG+= '<span class="fanion">' + video[0].droite.nom + '</span>';
			codeD = '<span class="fanion">' + video[0].gauche.nom + '</span>';
			codeD+= '<img src="'+ myURL + '/images/fanions/'+ (video[0].gauche.fanion || 'fff.png') +'" width="20%" height="20%" />';
			break;
	}

	document.getElementById("gauche").innerHTML = codeG;	// fanions bande haute
	document.getElementById("droite").innerHTML = codeD;

	// fanions incrustés
	// en première mi-temps c'est l'init du plugin qui affiche les infos
	//if (mitemps===2) {
        document.getElementById("vjs-bug-pictEquipeA").src = myURL + '/images/fanions/'+ (video[0].droite.fanion || 'fff.png');
        document.getElementById("vjs-bug-pictEquipeB").src = myURL + '/images/fanions/'+ (video[0].gauche.fanion || 'fff.png');
    //}

}

function showContent(etat) {
	// ce n'est appelé que si on peut voir les vignettes car c'ets le clic dessus quki affiche !!!!
	let carousel = document.getElementById("carousel");
	let match = document.getElementById("match");
	let myVideo = document.getElementById("myVideo");
	let inter = document.getElementById("inter");

	let hautMatch = match.offsetHeight;

	// le DISPLAY du CAROUSEL a un effet sur la taille de CONTENT qui s'agrandit mais qui dépasse FOOTER
	carousel.style.display =  (etat === true ? "none" : "flex");

	let bascule_img = document.getElementById("bascule_img");
	bascule_img.setAttribute("src","./images/" +   (etat === true ? "fleche_fermee.png" : "fleche_ouverte.png"));	// MAJ icone bascule

	let bascule_titre = document.getElementById("bascule_titre");
	bascule_titre.innerHTML = (etat === true ? "cliquez sur cet icône pour afficher les matchs disponibles" : "cliquez sur la vignette du match que vous souhaitez arbitrer");

	myVideo.style.visibility  = "visible";	
	//myVideo.style.width = "700px";//hautContent + "px";
}