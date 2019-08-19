function init() {
	creeVignettes("vignettes");					// générer le vignettes dans le carousel
}


function creeVignettes(id) {
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
	}
}