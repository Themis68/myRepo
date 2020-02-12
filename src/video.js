// variables EVENTS
var media_events = new Array();
media_events["loadstart"] = 0;
media_events["playing"] = 0;
media_events["timeupdate"] = 0;
media_events["currentTime"] = 0;

// varianbles des videos
var timeOut = 0;	// pointe sur le timeout
var timeOutEffet = 0; // pointe sur le timeout

var idVideoOn = 0;	// numero de la vidéo selectionnée
var nivZoom = 1;
var video = [];
var scripts = [];
var actions = [];
var actionEnCours = [];
var isDefineBVideoJS = false;		// permet de gérer la délcaration de videoJS au premier tour
var timeCode = '';
var avatar = '';
var oldStep = null;	// conserve la valeur de step pour gérer le replay
var myURLcomplete = document.location.href;
var myURL  = myURLcomplete.substring( 0 ,myURLcomplete.lastIndexOf( "/" ) );
var videoNbPoint = 0;		// nb points en cours
var stepBarre = 0;			// % de progression pour une Question
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
var replaysFaits = [];	// on ne peut faire le replay q'une fois
var seqUsed = -1;	// valeur de l'étape de la séquence qui a été traitée
var hauteurContent = 0; // hauteur de la zone CONTENT récupérée lors du chargement
var numQuestion = 0;	// numero de la Question
var transitionTime = 1000;	// durée d'une transition ALLERA en ms

// chemins
var pathImages = "../images/";		// autres images
var pathVideos = "../rencontres/";		// vidéos des matchs
var pathFanions = pathImages + "fanions/";		// fanions des equipes

// **********************************************************************************************************

document.addEventListener("DOMContentLoaded", init, false);	// lance l'écoute des évènements et appelle INIT
document.addEventListener("click", central, false);	// lance l'écoute des évènements CLIC

function central(event) {
	// gestion de la position de la souris pour plus tard
	var target = event.target || event.srcElement; // ce dernier pour compatibilité IE
	if(target.getAttribute('class') == 'vjs-icon-placeholder') {
		// clic sur big play
		draw("vjs-bug-silhEquipeA", video[0].gauche.maillotCouleur);
		draw("vjs-bug-silhEquipeB", video[0].droite.maillotCouleur);
		draw("vjs-bug-silhArbitre", video[0].arbitre.maillotCouleur);
    }
}

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

    document._video = document.getElementById("myVideo");   // identification de l'objet video
	creerVignettes("vignettes");					        // générer la vignettes dans le carousel
}

function draw(id, maillotCouleur) {
	let canvas = document.getElementById(id);
    	if (canvas.getContext) {
			let ctx = canvas.getContext("2d");

			// fond
			ctx.beginPath();
  			ctx.lineWidth="1";
  			ctx.arc(14, 14, 14, 0, 2 * Math.PI);	// X rayon, Y rayon, rayon, angle de départ, 2*PI pour le cercle complet
  			ctx.fillStyle = "black";	// couleur de fond
			ctx.fill();		// ordre de remplissage
			ctx.closePath();

			// tete
			ctx.beginPath();
  			ctx.lineWidth="1";
  			ctx.arc(14, 8, 5, 0, 2 * Math.PI);		// X rayon, Y rayon, rayon, angle de départ, 2*PI pour le cercle complet
  			ctx.fillStyle = maillotCouleur;	// couleur de fond
			ctx.fill();		// ordre de remplissage
			ctx.closePath();

			// corps
			let rectWidth = 18;
      		let rectHeight = 8;
      		let rectX = 5;
      		let rectY = 15; //12;
      		let cornerRadius = 5;

			ctx.beginPath();
			ctx.fillStyle = maillotCouleur;
			ctx.lineWidth = 1;
			ctx.moveTo(rectX + cornerRadius, rectY);
			ctx.lineTo(rectX + rectWidth - cornerRadius, rectY);
			ctx.arcTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + cornerRadius, cornerRadius);	// arrondi droite
			ctx.lineTo(rectX + rectWidth, rectY + rectHeight);	// descendre
			ctx.lineTo(rectX, rectY + rectHeight);	// horizontale basse
			ctx.lineTo(rectX, rectY + cornerRadius);	// remonter
			ctx.arcTo(rectX, rectY, rectX + cornerRadius, rectY, cornerRadius);	// arrondi gauche
			ctx.fill();		// ordre de remplissage
			ctx.closePath();
    }
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
		myImg.setAttribute("src", pathVideos + (scenario[i][0].poster || pathImages + "stade.jpg"));

		// caption
		let myCaption = document.createElement("div");

		// fanion
		let myF = document.createElement("img");
		myF.className = "carouselFanion";
		myF.setAttribute("title", "fanionG" + i);
		myF.setAttribute("src", pathFanions + (scenario[i][0].gauche.fanion || "fff.png'"));
		myCaption.appendChild(myF);
		// fanion
		myF = document.createElement("img");
		myF.className = "carouselFanion";
		myF.setAttribute("title", "fanionD" + i);
		myF.setAttribute("src", pathFanions + (scenario[i][0].droite.fanion || "fff.png'"));
		myCaption.appendChild(myF);
		
        let myP = document.createElement("p");        
		myP.innerHTML = scenario[i][0].gauche.nom + "<br>" + scenario[i][0].droite.nom;
		myCaption.appendChild(myP);
		myCaption.className = "carousel-caption d-none d-md-block";
		myCaption.setAttribute("onclick", 'javascript:switchVideo('+ scenario[i][0].id +');');	// mettre ici car cette DIV est au-dessus de l'image
		myCaption.setAttribute("title", (scenario[i][0].rencontre));
		myCaption.setAttribute("alt", (scenario[i][0].rencontre));

		myDiv.appendChild(myImg);
		myDiv.appendChild(myCaption);

		bloc.appendChild(myDiv);

		let myScript = document.createElement("SCRIPT");
		myScript.setAttribute("type", "text/javascript");
		myScript.setAttribute("src", "../rencontres/" + scenario[i][0].scenario);
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

function switchVideo(n) {
    //
    // affectation de la nouvelle vidéo et des attributs liés
    //;


	if (n > arrayAssoSize(scenario)) {
		// vérifie si l'index de la vidéo existe dans le fichier tableau.js
		n = 0;
		return false;
	} else {
		// MAJ videos
		idVideo = n;		// 1 = première vidéo
		video = scenario[n-1];    // recup scénario de la vidéo
		console.log(video);
		idVideoOn = n; //video[0].id;
		
		//
		// travail sur les actions et l'IHM associée
		//
		// actions = video[1];    // recup tableau des actions (position 3)
		actions = eval("script" + n);
		//actions = video[0].scenario;    // recup tableau des actions (position 3)

		listeEvents("events", media_events);	// créé le tableau des évènements vidéos
        setInterval(update_properties, 200);	// lance le process de MAJ des évènements	
        
        //            
        // Gestion du contenu de la vidéo
		//

		let hauteur = 0;
		let matchWCalcule = 0;
		
        if (isDefineBVideoJS) {
			// il y a déjà une vidéo
			myVideo.src({
				   src: pathVideos + video[0].fichier , 
				   type: "video/mp4"
				});
			myVideo.poster(pathVideos + video[0].poster); 
		} else {
			// tableau du jeu
			questionsFaites.splice(0, questionsFaites.length);	// efface le contenu
			replaysFaits.splice(0, replaysFaits.length);	// efface le contenu

			// calcul des dimensions en tenant compte du ratio prévu
			let match = document.querySelector("match");
			let carousel = document.querySelector("carousel");

			hauteur = match.offsetHeight + carousel.offsetHeight;
			matchWCalcule = hauteur  * 1.75;	// 1,78 est le ratio accepté par videoJs

            // on créé la vidéo
			 myVideo = videojs('myVideo', {
				width: matchWCalcule,
				height: hauteur,
				controls: true,
				preload:  'none',
				loop: false,
				fluid: true,
				poster: (pathVideos + video[0].poster || pathImages + "pelouses/pelousemini.png"),
				controlBar: {
					volumePanel: {	// avec l'ancienne version de video-js on appelait volumeMenuButton
						inline: false,
						vertical: true
					},
					pictureInPictureToggle: false	// nouveau : gère l'image par image
				},
				sources: [{
					src: pathVideos + video[0].fichier,
					type: "video/mp4"
				}],
				zoom: {
					lab: '1x',
					val: 1
				},
				plugins: {
					brand: {
						image: pathImages + "isamini.png",
						title: "Arrêt sur image!",
						destination: "isa.html",
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
						height: 30,
						width: 30,
						imgSrc: pathImages + "fanions/" + (video[0].gauche.fanion || 'fff.png'),
						alt: video[0].gauche.nom  || "fanion par défaut",
						link: video[0].gauche.site,
						opacity: 0.7,
						left: "20px",
						top: "20px",
						position: 'tl'
					},
					{
						type: "text",
						id:"vjs-bug-titreEquipeA",
						visibility: true,
						libelle: "<span>"+ video[0].gauche.nom +"</span>",
						classeCSS: "vjs-bug-titreEquipBug",
						opacity: 1,
						left: (30 + 20 + 5) + "px",
						top: "25px",
						position: 'tl'
					}, 
					{
						type: "canvas",
						id:"vjs-bug-silhEquipeA",
						visibility: true,
						height: 30,
						width: 30,
						classeCSS: "vjs-bug-silhEquipBug",
						opacity: 1,
						left: (30 + 20 + 160 + 5) + "px",
						top: "20px",
						position: 'tl'
					},
					{
						type: "canvas",
						id:"vjs-bug-silhArbitre",
						visibility: true,
						height: 30,
						width: 30,
						classeCSS: "vjs-bug-silhArbitreBug",
						opacity: 1,
						left: (30 + 20 + 160 + 5 + 300) + "px",
						top: "20px",
						position: 'tc'
					},
					{
						type: "text",
						id:"vjs-bug-titreArbitre",
						visibility: true,
						libelle: "<span>"+ avatar +"</span>",
						classeCSS: "vjs-bug-titreArbitre",
						opacity: 1,
						left: (30 + 20 + 160 + 5 + 300) + "px",
						top: "50px",
						position: 'tr'
					}, 
					{
						type: "canvas",
						id:"vjs-bug-silhEquipeB",
						visibility: true,
						height: 30,
						width: 30,
						classeCSS: "vjs-bug-silhEquipBug",
						opacity: 1,
						right: (30 + 20 + 170 + 5) + "px",
						top: "20px",
						position: 'tr'
					},
					{
						type: "text",
						id:"vjs-bug-titreEquipeB",
						visibility: true,
						libelle: "<span>"+ video[0].droite.nom +"</span>",
						classeCSS: "vjs-bug-titreEquipBug",
						opacity: 1,
						right: (30 + 20 + 5) + "px",
						top: "25px",
						position: 'tr'
					}, 
					{
						type: "pict",
						id:"vjs-bug-pictEquipeB",
						visibility: true,
						height: 30,
						width: 30,
						imgSrc: pathImages + "fanions/" + (video[0].droite.fanion || 'fff.png'),
						alt: video[0].droite.nom || "fanion par défaut",
						link: video[0].droite.site,
						opacity: 0.7,
						right: "20px",
						top: "20px",
						position: 'tr'
					}]
				}
			});
		}

		numQuestion = 0;	// on ré-initialise le nombre e questions
		
		isDefineBVideoJS = true;
		myVideo.load();

		// zone canvas
	//	draw("canvasG", video[0].gauche.couleur.maillot, video[0].gauche.couleur.short, video[0].gauche.couleur.chaussettes);

		let inter = document.getElementById("inter");
		inter.offsetHeight * hauteur;
		inter.style.display = "flex";
		// EQUIPES : doit être après le chargement des plugins videos
		gestionCamps(1);	// affichage des Informations sur l'équipe pour la première mi-temps

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
						case "Question":
						case "Bonus":
						case "Information":
						case "AllerA":
							if (actions[asWork].niveau === nbQuests[niveauQuest].niv) {
								mesActions[actions[asWork].act](asWork);	// on appelle le traitement nécessaire
							}
							break;

						case "Fin":
						case "Mitemps":
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

function getVideo() {
	return document._video;
}

function gestionCamps(mitemps) {
		// fanions incrustés
	// en première mi-temps c'est l'init du plugin qui affiche les infos
	if (mitemps===2) {
		document.getElementById("vjs-bug-titreEquipeA").innerHTML = "<span>" + video[0].droite.nom + "</span>";
		document.getElementById("vjs-bug-titreEquipeB").innerHTML = "<span>" + video[0].gauche.nom + "</span>";
		document.getElementById("vjs-bug-pictEquipeA").setAttribute("src", pathImages + "fanions/"+ (video[0].droite.fanion || "fff.png"));
		document.getElementById("vjs-bug-pictEquipeB").setAttribute("src", pathImages + "fanions/"+ (video[0].gauche.fanion || "fff.png"));
		draw("vjs-bug-silhEquipeA", video[0].droite.maillotCouleur);
		draw("vjs-bug-silhEquipeB", video[0].gauche.maillotCouleur);
	}
}

function showContent(etat) {
	// ce n'est appelé que si on peut voir les vignettes car c'ets le clic dessus quki affiche !!!!
	let carousel = document.getElementById("carousel");
	let myVideo = document.getElementById("myVideo");

	// le DISPLAY du CAROUSEL a un effet sur la taille de CONTENT qui s'agrandit mais qui dépasse FOOTER
	carousel.style.display =  (etat === true ? "none" : "flex");

	let bascule_img = document.querySelector("bascule img");
	bascule_img.setAttribute("src",pathImages  +   (etat === true ? "fleche_fermee.png" : "fleche_ouverte.png"));	// MAJ icone bascule

	let bascule_titre = document.querySelector("bascule span");
	bascule_titre.innerHTML = (etat === true ? "cliquez sur cet icône pour afficher les matchs disponibles" : "cliquez sur la vignette du match que vous souhaitez arbitrer");

	myVideo.style.visibility  = "visible";
	// la gestion du cadre doit se faire ici et non dans switchVideo sinon cela ne fonctionne pas
	myVideo.classList.add("cadre");

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

// tableau de fonctions pour traiter les arrêts deans la vidéo
var mesActions = { 
    Question : function (ind) {
        document._video.pause();    // on pause la vidéo
        // préparation des actions
        actionEnCours = actions[ind];
        gestionInter("InterQuestion", actionEnCours);
    },
    
    Bonus : function (ind) {
        document._video.pause();    // on pause la vidéo
        // préparation des actions
        actionEnCours = actions[ind];
        gestionInter("InterBonus", actionEnCours);
    },

    Information : function (ind) {
        actionEnCours = actions[ind];
        // on affiche le bouton répondre si FAIRPLAY et pas encore GAGNE
		timeOut = setTimeout(gestionInter, 2000, "FermeInfo", actionEnCours); 
		if (actionEnCours.type === 'but'){
			playSound("goal");
		}

        if ((actionEnCours.type === 'fairplay') && (questionsFaites.indexOf(actionEnCours.step) < 0)) {
           /* var btnBonus = document.getElementById("btnBonus");
            btnBonus.onclick = function() 
            {
                fairplay(ind); 
            };*/
            //showItem("btnBonus", true);
        } else {
           // .showItem("btnBonus", false);
        }

        gestionInter("InterInformation", actionEnCours);
    },

    AllerA: function (ind) {
        actionEnCours = actions[ind];
        allerA(actionEnCours.indice);
    },

    Fin: function (ind) {
        actionEnCours = actions[ind];
        //showConseiller('fin', ((videoNbPoint / nbQuests[0].points) > 0.5));
    },

    Mitemps: function (ind) {
        actionEnCours = actions[ind];
        gestionCamps(2);	// changement de camp
    }
}

function convertInSeqCode(myTimeCode) {
    var seqTab = myTimeCode.split(':');
    var seq = parseFloat(seqTab[0]) * 3600;
    seq += parseFloat(seqTab[1]) * 60;
    seq += parseFloat(seqTab[2])
	return seq;
}

// v2
function continuer2() {
    document.querySelector("inter suite next img").style.display = "none";  // masquer bouton CONTINUER

    // MAJ jauge
    if (actionEnCours.act === "Question") { 
        numQuestion++;
        gestJauge();
    }

    document._video.playbackRate = 1;   // vitesse normale
    document._video.play(); // on relance la video

    if (actionEnCours.saut !== undefined) {
        timeOut = setTimeout(gestionInter, (actionEnCours.saut.attente * 1500), "FermeInfo", actionEnCours); 
    } else {
        gestionInter("FermeInfo", actionEnCours);
    }
}

// v2
function fProposition(reponse) {
	// gestion des réponses	
	let bonneReponse = actionEnCours.reponse.solution;

	if (bonneReponse === reponse) {
        classId("add", "proposition" + reponse, "green");
        
        if (questionsFaites.indexOf(actionEnCours.step) < 0) {
            addScore(actionEnCours.reponse.points);			 // ajouter des points
            questionsFaites.push(actionEnCours.step);        // on stocke le step qui a été traité
            // PAS TRAITE
        } else {
            // DEJA TRAITE
        }
	} else {
		classId("add", "proposition" + reponse, "rouge");
		classId("add", "proposition" + bonneReponse, "green");
    }
    document.getElementById("loi"+bonneReponse).style.display = "flex";

    gestPropositions("bloquer", actionEnCours.attributs);           // enlever le clic sur les boutons

    // afficher la lois sur le bouton vert
	gestionInter("reponse", actionEnCours);    	// gerer la réponse
}

function allerA(param) {
    timeOutEffet = setTimeout(endTimeOut, 500, convertInSeqCode(param)); // effet de transition
    classId("del", "myVideo", "vjs-blurOff");
    classId("add", "myVideo", "vjs-blurOn"); 
}

function endTimeOut(seqCod) {
    // on est arrivé à la fin de l'effet alors on retire l'effet
    getVideo().currentTime = seqCod;
    classId("del", "myVideo", "vjs-blurOn");
    classId("add", "myVideo", "vjs-blurOff");
    clearTimeout(timeOutEffet);
}

// v2
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

// v2
function fReplay(param) {
    // param est le nombre de secondes à reculer sinon on prend la valeur par défaut
    addScore(-1);   // MAJ score
    replaysFaits.push(actionEnCours.step);    // on enbregistre l'opération
    getVideo().currentTime = getVideo().currentTime - (param); // on recule de X secondes
    document._video.playbackRate = 0.2; // on active le ralentis
    document._video.play(); // on reprend la lecture de la vidéo
}

// v2
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

// v2
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

// v2
function fNiveaux(level, idVideo) {
	// changer de niveau
	//
	// exemple appel : fNiveaux(id)
	// - id de l'objet
    //
    clearTimeout(timeOutEffet);
    niveauQuest = level;
    switchVideo(idVideo);

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

// v2
function gestPropositions(etape, attributs, reponse) {
    let propositions = document.querySelector("inter propositions");
    
    let proposition  = document.createElement("proposition");
    let loi = document.createElement("a");
    let img = document.createElement("img");
    let button = document.createElement("button");

	switch(etape) {
		case "afficher":
            deleteChild("inter propositions");	// on supprime l'existant

			for (let i=0; i < attributs.length; i++) {
                proposition.id = "proposition-div-" + (i+1);

                loi.id = "loi" + (i+1);
                loi.href = '../lois/' + actionEnCours.reponse.loi + '.pdf'; //myURL + '/lois/' + actionEnCours.reponse.loi + '.pdf';
                loi.target = '_blank';
                img.src = pathImages + "lois.png"; // myURL + "/images/lois.png";
                loi.appendChild(img);
                loi.setAttribute("style", "display:none");

                proposition.appendChild(loi);

				button.id = "proposition" + (i+1);
				button.className = "btn btn-warning";
                button.innerHTML = attributs[i];
                
                if (questionsFaites.indexOf(actionEnCours.step) < 0) {
                    // pas deja joué
                    button.setAttribute("onclick","fProposition(" + (i+1) +");"); 
                }
                proposition.appendChild(button);

                propositions.appendChild(proposition);

                button = document.createElement("button");
                loi = document.createElement("a");
                img = document.createElement("img");
                proposition = document.createElement("proposition");
			}
			// zone complement : on renseigne mais c'est masqué pour l'instant
			document.querySelector("inter complement p").innerHTML = reponse.libelle;
            break;

        case "bloquer":
			for (let i=0; i < attributs.length; i++) {
                document.getElementById("proposition" + (i+1)).removeAttribute("onClick");
			}
			break;
	}
}

// v2
function gestionInter(etape, objet) {

	let inter = document.querySelector("inter");
	switch (etape) {
		case "selectVideo":
           // classSelector("set", "inter tete", "Information");
			document.querySelector("inter tete titre p").innerHTML = "Match";
			document.querySelector("inter tete points").style.display = "none";
			gestNiveaux(idVideoOn);
			scanQuestion();	// analyse du scénario
            gestJauge();	// MAJ de la jauge
            document.querySelector("inter question p").style.display = "flex";
			document.querySelector("inter question p").innerHTML = video[0].description;
			document.querySelector("inter propositions").style.display = "none";
            document.querySelector("inter complement").style.display = "flex";
            document.querySelector("inter complement p").innerHTML = "Vous allez analyser le match avec des questions de niveau " + nbQuests[niveauQuest].niv + ".<br><br>Cliquez sur le bouton Play sur la vidéo pour déclencher le visionnage du match"
            document.querySelector("inter complement img").style.display = "none";
			// replay
			document.querySelector("inter suite replay span").style.display = "none";
			// score
			document.querySelector("inter suite score p").style.display = "none";
			addScore(0);	// on init même si c'est masqué
			// next
			document.querySelector("inter suite next img").style.display = "none";

			//draw("canvasG", video[0].gauche.couleur.maillot, video[0].gauche.couleur.short, video[0].gauche.couleur.chaussettes);
            break;
        
        case "FermeInfo":
          //  classSelector("set", "inter tete", "Information");
            document.querySelector("inter tete titre p").innerHTML = "Match";
            document.querySelector("inter tete points").style.display = "none";
            document.querySelector("inter question p").style.display = "none";
            document.querySelector("inter propositions").style.display = "none";
            document.querySelector("inter complement").style.display = "none";
            document.querySelector("inter suite replay span").style.display = "none";
            document.querySelector("inter suite score p").style.display = "flex";
            allerA(objet.saut.indice);
            break;

		case "InterQuestion":
			// tete
            //classSelector("set", "inter tete", objet.act);
           // classSelector("set", "inter suite", objet.act);
			document.querySelector("inter tete titre p").innerHTML = objet.act;
            document.querySelector("inter tete points").style.display = "flex";
            classSelector("set", "inter tete points p",  objet.act);
			document.querySelector("inter tete points p").innerHTML = "0" + objet.reponse.points;
			// jauge et niveaux
            gestJauge();	// MAJ de la jauge
            // question
            document.querySelector("inter question p").style.display = "flex";
			document.querySelector("inter question p").innerHTML = objet.question.libelle;
			// gestion des propositions
			gestPropositions("afficher", objet.attributs, objet.reponse);
			document.querySelector("inter propositions").style.display = "flex";
			// complement
			document.querySelector("inter complement").style.display = "none";
			// Suite
			//document.querySelector("inter suite").style.display = "flex";
            // replay
            if (replaysFaits.indexOf(objet.step) < 0) {
                // pas traité encore
                document.querySelector("inter suite replay span").style.display = (objet.question.reculReplay ? "flex" : "none");
                document.querySelector("inter suite replay span").innerHTML = objet.question.reculReplay;
                document.querySelector("inter suite replay span").setAttribute("onclick","fReplay(" + (objet.question.reculReplay) + ");");
            } else {
                document.querySelector("inter suite replay span").style.display = "none";
            }
			// score
			document.querySelector("inter suite score p").style.display = "flex";
			// next
			document.querySelector("inter suite next img").style.display = "none";
			break;
		
		case "InterBonus":
			// tete
            //classSelector("set", "inter tete", objet.act);
           // classSelector("set", "inter suite", objet.act);
			document.querySelector("inter tete titre p").innerHTML = objet.act;
            document.querySelector("inter tete points").style.display = "flex";
            classSelector("set", "inter tete points p",  objet.act);
            document.querySelector("inter tete points p").innerHTML = "0" + objet.reponse.points;
            // question
            document.querySelector("inter question p").style.display = "flex";
			document.querySelector("inter question p").innerHTML = objet.question.libelle;
			// gestion des propositions
			gestPropositions("afficher", objet.attributs, objet.reponse);
			document.querySelector("inter propositions").style.display = "flex";
			// complement
			document.querySelector("inter complement").style.display = "none";
			// replay
			document.querySelector("inter suite replay span").style.display = "none";
			// score
			document.querySelector("inter suite score p").style.display = "flex";
			// next
			document.querySelector("inter suite next img").style.display = "none";
            break;
        
        case "InterInformation":
         //   classSelector("set", "inter tete", objet.act);
           // classSelector("set", "inter suite", objet.act);
            document.querySelector("inter tete titre p").innerHTML = objet.act;
            document.querySelector("inter tete points").style.display = "none";
            // question
            document.querySelector("inter question p").style.display = "flex";
            document.querySelector("inter question p").innerHTML = objet.libelle;

            document.querySelector("inter propositions").style.display = "none";
            document.querySelector("inter complement").style.display = "none";
            document.querySelector("inter suite replay span").style.display = "none";
			document.querySelector("inter suite score p").style.display = "flex";
            document.querySelector("inter suite next img").style.display = "none";
            break;

		case "reponse":
            // complement
            if ((objet.reponse.libelle === undefined) && (objet.reponse.pict === undefined)) {
                document.querySelector("inter complement").style.display = "none";    
            } else {
                document.querySelector("inter complement").style.display = "flex";
                document.querySelector("inter complement p").style.display = (objet.reponse.libelle === undefined ? "none" : "flex");
                document.querySelector("inter complement img").style.display = (objet.reponse.pict === undefined ? "none" : "flex");
                if (objet.reponse.pict !== undefined) {
                    // on doit avoir le IF car sinon ca généère un message d'eereur lors de l'affectation de l'image  
                    document.querySelector("inter complement img").setAttribute("src",pathImages + objet.reponse.pict);
                }
            }
            // replay
            // on teste si le bouton replay est encore à l'écran
            if (document.querySelector("inter suite replay span") !== undefined) {
                document.querySelector("inter suite replay span").style.display = "none";
            }
			// score
			document.querySelector("inter suite score p").style.display = "flex";
			// next
            document.querySelector("inter suite next img").style.display = "flex";
			break;

		default:
			inter.display = "none";
	}
}