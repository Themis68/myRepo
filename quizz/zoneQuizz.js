// initialisation matrice device
var matriceDevice = viewportSize();

// chemins
var pathQuizz = "./questionnaires/";		// scénarios des quizz

var myURLcomplete = document.location.href;
var myURL  = myURLcomplete.substring( 0 ,myURLcomplete.lastIndexOf( "/" ) );

// variable d'une question
var indexQuestion = 1;
var nbPointsUtilisateur = 0;
var nbPointsQuizz = 0;
var question;
var script;

// on récupère le id du quizz
var quizzId = getParametersURL("id");

document.addEventListener("DOMContentLoaded", init, false);	
document.addEventListener("touchstart", clickF, false);		
window.addEventListener('resize', windowResize, false);
document.addEventListener('readystatechange', ready, false);

function ready() {
	if (document.readyState === "complete") {
		// MAJ titre navigation
	//	document.getElementsByClassName("asi-title")[0].innerHTML = window.quizz.titre + " " +window.quizz.niveau;

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
			document.getElementById(e.target.id).style.display = "none";
			window.indexQuestion++;	// on passe à la question suivante
			gestChrono("","");	// on reinitialisae la page avec les bons éléments
		}
	}

	if((e.target.id).indexOf("Prop") > 0) {
		// clic sur un des boutons de proposition
		gestChrono("R", e.target.id);
	}
}

function chrono(nbSecondesMax) {
	let btnJauge = document.getElementById("jauge");
	let value = parseInt(btnJauge.getAttribute("aria-valuenow"),10) + 1;	// transformation en numérique de la valeur actuelle
	if (value > nbSecondesMax) {
		// arrêter le chrono
		switch(btnJauge.dataset.use) {
			case "" :
				btnJauge.dataset.use = "P";
				data = "";
				break;

			case "P" :
				btnJauge.dataset.use = "R";
				data = "";
				break;
		}
		gestChrono(btnJauge.dataset.use, data);
	} else {
		btnJauge.setAttribute("aria-valuenow", value);
		pourCent = Math.round(value / nbSecondesMax * 100);
		btnJauge.setAttribute("style", "width: " + pourCent + "%");
	}
}

function gestChrono(phase, data) {
	btnJauge = document.getElementById("jauge");

	switch(phase) {
		case "":
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
			// INIT valeur de la jauge
			btnJauge.setAttribute("aria-valuenow", 0);
			// arrêt chrono	
			clearInterval(myChrono);
			// afficher les libellés des propositions
			document.getElementById("propositions").style.display = "flex";
			for (let i=0; i < 4; i++) {
				document.getElementById("libProp" + (i+1)).innerHTML = window.question.question.attributs[i];	
				document.getElementById("libProp" + (i+1)).style.display = "flex";
			}

			btnJauge.dataset.use = "P";
			// chrono
			myChrono = setInterval(chrono, 1000, parseInt(window.question.reponse.temps, 10));
			break;
		
		case "R":	// data = numéro de la qproposition cliquée
			// INIT valeur de la jauge
			btnJauge.setAttribute("aria-valuenow", 0);
			btnJauge.setAttribute("style", "width: 0%");
			btnJauge.dataset.use = "";
			
			let fond = undefined;
			let bord = undefined;
			let numPropClic = undefined;

			// arrêt chrono	
			clearInterval(myChrono);
			let bonneProp = parseInt(window.question.reponse.solution, 10);
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
					}
					fond = "green";
					bord = "green solid 1em";
				} else {
					// en cours = selection utilisateur ?
					if (enCours == numPropClic) {
						// mauvais choix : ajouter un son
						fond = "var(--fond-proposition)";
						bord = "red solid 1em";
					} else {
						fond = "var(--fond-proposition)";
						bord = "white solid 1em";
					}
				}
				document.getElementById("libProp" + (i+1)).style.backgroundColor = fond;
				document.getElementById("prop" + (i+1)).style.borderLeft = bord;
				// on retire la gestion du click
				document.getElementById("libProp" + (i+1)).removeAttribute("onclick");
			}

			// gestion des points
			// points du quizz
			pointsQuestion = parseInt(window.question.reponse.points, 10);

			window.nbPointsQuizz = window.nbPointsQuizz + pointsQuestion;
			if (data == "libProp" + window.question.reponse.solution) {
				// points de l'utilisateur
				window.nbPointsUtilisateur = window.nbPointsUtilisateur + pointsQuestion;
			}
			// derniere question ?
			indexQuestionSuivante = window.script[window.indexQuestion];

			let btnQuestion = document.getElementById("btnQuestion");
			if (indexQuestionSuivante === undefined) {
				//quizz fini	
				btnQuestion.innerHTML = "Afficher résultat";
				btnQuestion.setAttribute("href","./resultatQuizz.html?id=" + window.quizz.id + "&reussir=" + window.nbPointsUtilisateur + "&total=" + window.nbPointsQuizz);
			} else {
				// affichage bouton question suivante		
				btnQuestion.innerHTML = "Question suivante";
			}
			btnQuestion.style.display = "flex";
			break;

		default:
	}
}