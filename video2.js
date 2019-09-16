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
	{niv: "CONFIRME", nb: 0, points: 0},
	{niv: "EXPERT", nb: 0, points: 0}
];		// le niveau 0 est le niveau en cours
var questionsFaites = [];
var seqUsed = -1;	// valeur de l'étape de la séquence qui a été traitée
var hauteurContent = 0; // hauteur de la zone CONTENT récupérée lors du chargement
var numQuestion = 0;	// numero de la question
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

	// mettre les listener ici car il faut avoir chargée la page

	// clic sur l'image de bascule
	var bascule = document.querySelector("bascule img");
	bascule.addEventListener("click", fBascule);	// de haut en bas

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

		let hauteur = 0;
		
        if (isDefineBVideoJS) {
            // il y a déjà une vidéo
			myVideo.src({src: "./videos/" + video[0].fichier , type: "video/mp4"});
			myVideo.poster("./videos/" + video[0].poster);
		} else {
			// calcul des dimensions en tenant compte du ratio prévu
			let match = document.querySelector("match");
			let carousel = document.querySelector("carousel");

			// taille de la vidéo reclaculée
			let matchWCalcule = match.offsetHeight * 1.78;	// 1,78 est le ratio accepté par videoJs
			hauteur = match.offsetHeight + carousel.offsetHeight;

            // on créé la vidéo
			myVideo = videojs('myVideo', {
				width: matchWCalcule,
				height: hauteur,
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
							{lab: '2.5x', val: 2.5}, 
							{lab: '2x', val: 2}, 
							{lab: '1.5x', val: 1.5}, 
							{lab: '1x', val: 1}
						]
					},
					bug: [{
						type: "pict",
						id:"vjs-bug-pictEquipeA",
						visibility: true,
						height: 40,
						width: 40,
						imgSrc: "./images/fanions/" + (video[0].gauche.fanion || 'fff.png'),
						alt: video[0].droite.nom,
						link: "http://www.apple.fr",
						opacity: 0.7,
						padding: '20px',	// top et bottom + right et left
						position: 'tl'
					},{
						type: "text",
						id:"vjs-bug-titreEquipeA",
						visibility: true,
						height: 40,
						libelle: "<span>"+ video[0].gauche.nom +"</span>",
						classeCSS: "vjs-bug-titreEquipBug",
						opacity: 1,
						padding: '30px 70px',	// top et bottom + right et left
						position: 'tl'
					}, 				
					{
						type: "text",
						id:"vjs-bug-textScoreBug",
						visibility: true,
						height: "30px",
						libelle: "SCORE DE " + avatar.toUpperCase() + "&nbsp;&nbsp;<span class=\"scoreBoard\">00 : " + nbQuests[0].points + "</span>&nbsp;&nbsp;niveau " + nbQuests[niveauQuest].niv,
						classeCSS: "vjs-bug-textScoreBug",
						opacity: 1,
						padding: '10px 38%',	// top et se combine avec le centrage horizontal
						position: 'tc'
					}, 
					{
						type: "text",
						id:"vjs-bug-titreEquipeB",
						visibility: true,
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
						visibility: true,
						height: 35,
						width: 35,
						imgSrc: "./images/fanions/" + (video[0].droite.fanion || 'fff.png'),
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

		let inter = document.getElementById("inter");
		inter.offsetHeight * hauteur;
		inter.style.display = "flex";

		//match.offsetHeight = hauteur;

		// EQUIPES : doit être après le chargement des plugins videos
		gestionCamps(1);	// affichage des informations sur l'équipe pour la première mi-temps

		// affichage de la zone VIDEO
		showContent(true);

		gestionInter("selectVideo");
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
		this.src = "./images/fleche_ouverte.png";
		span.innerHTML = "cliquez sur la vignette du match que vous souhaitez arbitrer";
	} else {
		// on ferme
		carousel.style.display = "none";
		this.src = "./images/fleche_fermee.png";
		span.innerHTML = "cliquez sur cet icône pour afficher les matchs disponibles";
	}	
}

function fNiveaux(id) {
	// changer de niveau
	//
	// exemple appel : fNiveaux(id)
	// - id de l'objet
	//
	//console.log("clis sur " , id);
	let span = document.querySelectorAll("inter tete niveau button span");
	span.forEach( function(a) {
			a.className = "badge badge-light";
		}
	)
	niveauQuest = id;
	document.getElementById("level" + id).className = "badge badge-current badge-light";
	gestJauge(0, nbQuests[niveauQuest].nb);

}

function fProposition(id) {
	// gestion des réponses	
}

function fReplay(param) {
	//console.log("esd");
    // param est le nombre de secondes à reculer sinon on prend la valeur par défaut
    fAddScore(-1);   // MAJ score
    getVideo().currentTime = getVideo().currentTime - (param); // on recule de X secondes
    document._video.playbackRate = 0.2; // on active le ralentis
    document._video.play(); // on reprend la lecture de la vidéo
}

function getVideo() {
	return document._video;
}

function fAddScore(valeur) {
	// à définir
}

function gestionCamps(mitemps) {
		// fanions incrustés
	// en première mi-temps c'est l'init du plugin qui affiche les infos
	if (mitemps===2) {
    	document.getElementById("vjs-bug-pictEquipeA").src = myURL + '/images/fanions/'+ (video[0].droite.fanion || 'fff.png');
    	document.getElementById("vjs-bug-pictEquipeB").src = myURL + '/images/fanions/'+ (video[0].gauche.fanion || 'fff.png');
	}
}

function showContent(etat) {
	// ce n'est appelé que si on peut voir les vignettes car c'ets le clic dessus quki affiche !!!!
	let carousel = document.getElementById("carousel");
	let myVideo = document.getElementById("myVideo");

	// le DISPLAY du CAROUSEL a un effet sur la taille de CONTENT qui s'agrandit mais qui dépasse FOOTER
	carousel.style.display =  (etat === true ? "none" : "flex");

	let bascule_img = document.querySelector("bascule img");
	bascule_img.setAttribute("src","./images/" +   (etat === true ? "fleche_fermee.png" : "fleche_ouverte.png"));	// MAJ icone bascule

	let bascule_titre = document.querySelector("bascule span");
	bascule_titre.innerHTML = (etat === true ? "cliquez sur cet icône pour afficher les matchs disponibles" : "cliquez sur la vignette du match que vous souhaitez arbitrer");

	myVideo.style.visibility  = "visible";
	// la gestion du cadre doit se faire ici et non dans switchVideo sinon cela ne fonctionne pas
	myVideo.classList.add("cadre");

}

function gestJauge(valeur, nbQuestions) {
	//MAJ de la jauge
	let jauge = document.getElementsByClassName("progress-bar");
	//console.log(nbQuestions);
	pourCent = valeur / nbQuestions * 100;
	jauge[0].setAttribute("aria-valuenow", valeur);
	jauge[0].setAttribute("style", "width: " + pourCent + "%");
	jauge[0].innerHTML = (valeur == 0 ? nbQuestions + " questions" : valeur);
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

	// scanne des actions et imputation des points ou pas
	for (let ind = 0; ind < arrayAssoSize(actions); ind++) {
		if((actions[ind].act === "question") || (actions[ind].act === "question2")) {
			// calcul du compteur
			switch (actions[ind].niveau) {
				case "DEBUTANT":
					niveauQuest = 1;
					break;
				case "CONFIRME":
					niveauQuest = 2;
					break;
				case "EXPERT":
					niveauQuest = 3;
					break;
				default:
					nniveauQuestiv = 0;
			}
				//niv = (actions[ind].niveau === "DEBUTANT" ? 1: actions[ind].niveau === "CONFIRME" ? 2 : 0);
				nbQuests[niveauQuest].nb++;	// nombre de questions du nouveau niveau
				nbQuests[niveauQuest].points+= actions[ind].reponse.points;	// nombre de points MAX du nouveau niveau
		}
	}
	// MAJ boutons niveaux
	document.getElementById("level1").style.display = (nbQuests[1].nb > 0 ? "flex" : "none");
	document.getElementById("level2").style.display = (nbQuests[2].nb > 0 ? "flex" : "none");
	document.getElementById("level3").style.display = (nbQuests[3].nb > 0 ? "flex" : "none");

	return nbQuests;	// on renvoi le nombre de question du nouveau niveau
}

function gestPropositions(etape, attributs) {
	let proposition = document.querySelector("inter propositions");
	let button = document.createElement("button");

	deleteChild("inter propositions");	// on supprime l'existant

	switch(etape) {
		case "afficher":
			for (i=0; i < attributs.length; i++) {
				button.id = "proposition" + (i+1);
				button.className = "btn btn-warning";
				button.innerHTML = attributs[i];
				button.setAttribute("onclick","fProposition(" + (i+1) + ");"); 
				proposition.appendChild(button);
				button = document.createElement("button");
			}
			break;
	}
	
}

function gestionInter(etape, objet) {
	//console.log(objet);

	let inter = document.querySelector("inter");
	switch (etape) {
		case "selectVideo":
			numQuestion = 0;		// numero de la question
			document.querySelector("inter tete titre p").innerHTML = "Match";
			document.querySelector("inter tete points").style.display = "none";
			// jauge et niveaux
			let nbQuest = scanQuestion();	// analyse du scénario
			gestJauge(numQuestion, nbQuests[niveauQuest].nb);	// MAJ de la jauge
			document.querySelector("inter question p").innerHTML = video[0].description;
			document.querySelector("inter propositions").style.display = "none";
			document.querySelector("inter complement").style.display = "none";
			document.querySelector("inter suite replay").style.display = "none";
			document.querySelector("inter suite next").style.display = "none";
			break;

		case "InterQuestion":
			// tete
			classSelector("set", "inter tete", objet.act);
			document.querySelector("inter tete titre p").innerHTML = objet.act;
			document.querySelector("inter tete points").style.display = "flex";
			document.querySelector("inter tete points span").innerHTML = objet.reponse.points;
			// jauge et niveaux
			gestJauge(numQuestion, nbQuests[niveauQuest].nb);	// MAJ de la jauge
			document.querySelector("inter question p").innerHTML = objet.question.libelle;
			// gestion des propositions
			gestPropositions("afficher", objet.attributs);
			document.querySelector("inter propositions").style.display = "flex";
			// complement
			document.querySelector("inter complement").style.display = "none";
			// replay
			document.querySelector("inter suite replay").style.display = (objet.reculReplay ? "flex" : "none");
			document.querySelector("inter suite replay").innerHTML = objet.reculReplay;
			document.querySelector("inter suite replay").setAttribute("onclick","fReplay(" + (objet.reculReplay) + ");");
			// next
			document.querySelector("inter suite next").style.display = "none";
			break;
		
			case "InterBonus":
			// tete
			classSelector("set", "inter tete", objet.act);
			document.querySelector("inter tete titre p").innerHTML = objet.act;
			document.querySelector("inter tete points").style.display = "flex";
			document.querySelector("inter tete points span").innerHTML = objet.reponse.points;
			// jauge et niveaux
			gestJauge(numQuestion, nbQuests[niveauQuest].nb);	// MAJ de la jauge
			document.querySelector("inter question p").innerHTML = objet.question.libelle;
			// gestion des propositions
			gestPropositions("afficher", objet.attributs);
			document.querySelector("inter propositions").style.display = "flex";
			// complement
			document.querySelector("inter complement").style.display = "none";
			// replay
			document.querySelector("inter suite replay").style.display = "none";
			// next
			document.querySelector("inter suite next").style.display = "none";
			break;
		default:
			inter.display = "none";
	}
}
