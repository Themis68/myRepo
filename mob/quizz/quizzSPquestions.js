// initialisation matrice device
var matriceDevice = viewportSize();

// chemins
var pathQuizz = "../../quizz/questionnaires/";		// scénarios des quizz

var myURLcomplete = document.location.href;
var myURL  = myURLcomplete.substring( 0 ,myURLcomplete.lastIndexOf( "/" ) );

// variable d'une question
var indexQuestion = 1;
var nbPointsUtilisateur = 0;
var nbPointsMax = 0;
var question;
var script;

// variable CSS propositions
var bord = "";
var fond = "";

// on récupère le id du quizz
var quizzId = getParametersURL("id");

document.addEventListener("DOMContentLoaded", init, false);	
document.addEventListener("touchstart", clickF, false);		
window.addEventListener('resize', windowResize, false);
document.addEventListener('readystatechange', ready, false);

function ready() {
	if (document.readyState === "complete") {
		// MAJ titre navigation
		gestChrono("","");
	}
}

function init() {
	// calcul hauteur
	matriceDevice = viewportSize();
	calculHauteur(matriceDevice.height);

	// on récupère le numéro de la question a traiter
	window.indexQuestion = getParametersURL("question");
	// on charge le quizz
	window.quizz = scenario[quizzId-1]; // le id va de 1 à n, l'index du tableau commence à 0
	// ajout accès au fichier des questions	
	let myScript = document.createElement("script");
	myScript.type = "text/javascript";
	// l'extension permet depurger le cache du ficheir JS
	myScript.src = pathQuizz + window.quizz.fichier + "?n=1" ; 
	document.head.appendChild(myScript);
}

function getParametersURL(param){
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}

function clickF(e) {
	if (e.target.id === "btnQuestion") {
		if (document.getElementById(e.target.id).getAttribute("href") === "#") {
			console.log("clickF : question suivante");
			document.getElementById(e.target.id).style.display = "none";
			window.indexQuestion++;	// on passe à la question suivante
			gestChrono("","");	// on reinitialisae la page avec les bons éléments
		}
	}

	if((e.target.id).indexOf("Prop") > 0) {
		console.log("clickF : une proposition");
		// clic sur un des boutons de proposition
		gestChrono("R", e.target.id);
	}
}

function chrono(nbSecondesMax) {
	console.log("appel chrono");
	let btnJauge = document.getElementById("jauge");
	let value = parseInt(btnJauge.getAttribute("aria-valuenow"),10) + 1;	// transformation en numérique de la valeur actuelle
	if (value > nbSecondesMax) {
		// Arrêter le chrono
		switch(btnJauge.dataset.use) {
			case "" :
				console.log("chrono : afficher propositions");
				// on va afficher les propositions
				btnJauge.dataset.use = "P";
				data = "";
				break;

			case "P" :
				console.log("chrono : afficher réponses");
				// on va afficher la réponse
				btnJauge.dataset.use = "R";
				data = "";
				break;
		}
		gestChrono(btnJauge.dataset.use, data);
	} else {
		// MAJ avancement chrono
		btnJauge.setAttribute("aria-valuenow", value);
		pourCent = Math.round(value / nbSecondesMax * 100);
		btnJauge.setAttribute("style", "width: " + pourCent + "%");
	}
}

function gestChrono(phase, data) {
	btnJauge = document.getElementById("jauge");

	switch(phase) {
		case "":
			console.log("gestChrono : afficher la question");
			// récupère la question
			window.question = window.script[window.indexQuestion-1];
			// libellé question
			document.getElementById("libQuestion").innerHTML = window.question.question.libelle;
			// on masque les propositions
			document.getElementById("propositions").style.display = "none";
			// INIT valeur de la jauge
			btnJauge.setAttribute("aria-valuenow", 0);	
			// chrono
			myChrono = setInterval(chrono, 1000, parseInt(window.question.question.temps, 10));
			break;

		case "P":
			console.log("gestChrono : afficher les propositions");
			// INIT valeur de la jauge
			btnJauge.setAttribute("aria-valuenow", 0);
			// arrêt chrono	
			clearInterval(myChrono);
			// afficher les libellés des propositions : ici sinon on ne peut pas travailler sur son contenu
			document.getElementById("propositions").style.display = "flex";
			// MAJ bordures pour la nouvelle question
			bord = "white solid 1em";
			for (let i=0; i < 4; i++) {
				// couleur bordure poroposition (LI)
				document.getElementById("prop" + (i+1)).style.borderLeft = bord;
				// fond proposition (H5)
				document.getElementById("libProp" + (i+1)).style.backgroundColor = fond;
				// récupérer libellé proposition
				document.getElementById("libProp" + (i+1)).innerHTML = window.question.question.attributs[i];	
				console.log(window.question.question.attributs[i]);
				// afficher proposition
				document.getElementById("libProp" + (i+1)).style.display = "flex";
			}

			btnJauge.dataset.use = "P";
			// chrono
			myChrono = setInterval(chrono, 1000, parseInt(window.question.reponse.temps, 10));
			break;
		
		case "R":	// data = numéro de la qproposition cliquée
			console.log("gestChrono : afficher les réponses");
			// INIT valeur de la jauge
			btnJauge.setAttribute("aria-valuenow", 0);
			btnJauge.setAttribute("style", "width: 0%");
			btnJauge.dataset.use = "";
			
			//fond = undefined;
			//bord = undefined;
			let numPropClic = undefined;

			// arrêt chrono	
			clearInterval(myChrono);

			// récupérer la bonne réponse
			let bonneProp = parseInt(window.question.reponse.solution, 10);
			// points de la bonne réponse
			let pointsQuestion = parseInt(window.question.reponse.points, 10);

			if (data != "") {
				numPropClic = parseInt(data.substring(data.length -1), 10);
			} else {
				numPropClic = 0; 	// pas de clic
			}
			// traitement des propositions
			for (let i=0; i < 4; i++) {
				var enCours = i+1;
				// en cours = bonne réponse ?
				if (enCours == bonneProp) {
					if(enCours == numPropClic) {
						// bon choix : ajouter un son
						document.getElementById('bonne').play();
						window.nbPointsUtilisateur = window.nbPointsUtilisateur + pointsQuestion;
					}
					fond = "green";
					bord = "green solid 1em";
				} else {
					// en cours = selection utilisateur ?
					if (enCours == numPropClic) {
						// mauvais choix : ajouter un son
						document.getElementById('mauvaise').play();
						fond = "var(--fond-proposition)";
						bord = "red solid 1em";
					} else {
						fond = "var(--fond-proposition)";
						bord = "white solid 1em";
					}
				}
				// couleur bordure poroposition (LI)
				document.getElementById("prop" + (i+1)).style.borderLeft = bord;
				// fond proposition (H5)
				document.getElementById("libProp" + (i+1)).style.backgroundColor = fond;
				// on retire la gestion du click (H5)
				document.getElementById("libProp" + (i+1)).removeAttribute("onclick");
			}

			// gestion des points
			window.nbPointsMax = window.nbPointsMax + pointsQuestion;
		//	if (data == "libProp" + window.question.reponse.solution) {
				// points de l'utilisateur
		//		window.nbPointsUtilisateur = window.nbPointsUtilisateur + pointsQuestion;
		//	}
			// derniere question ?
			indexQuestionSuivante = window.script[window.indexQuestion];

			let btnQuestion = document.getElementById("btnQuestion");
			if (indexQuestionSuivante === undefined) {
				//quizz fini	
				btnQuestion.innerHTML = "Afficher résultat";
				console.log(window.nbPointsUtilisateur , window.nbPointsMax);
				btnQuestion.setAttribute("href","./resultatQuizz.html?id=" + window.quizzId + "&reussir=" + window.nbPointsUtilisateur + "&total=" + window.nbPointsMax);
			} else {
				// affichage bouton question suivante		
				btnQuestion.innerHTML = "Question suivante";
			}
			btnQuestion.style.display = "flex";
			break;

		default:
	}
}