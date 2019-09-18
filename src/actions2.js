// tableau de fonctions pour traiter les arrêts deans la vidéo
var mesActions = { 
    Question2 : function (ind) {
        encadreVideo(false);
        document._video.pause();    // on pause la vidéo
        // préparation des actions
        actionEnCours = actions[ind];
        document.getElementById("message").innerHTML = monJob.libelle;
        
        //
        // PROPOSITIONS
        // on construit dPropositions       
        // retirer les elements de la réponse du DOM
        // sinon on les aura à la prochaine question
        if (document.getElementById("R1") !== null) {
            var parent = document.getElementById("R1").parentNode;
            while( parent.firstChild) {
                // La liste n'est pas une copie, elle sera donc réindexée à chaque appel
                parent.removeChild( parent.firstChild);
            }
        }

        // gestion de l'image
        showPict((monJob.pict || null), 'myPict');
        showPict((monJob.pict || null), 'myPict');

        var maQuestion = document.getElementById("zPropositions");
        for (let i=1; i <= monJob.attributs.length; i++) { 
            // construction du input
            var monInput = document.createElement("input");
            if (i===1) {monInput.checked = true;}
            monInput.name = 'Q1';
            monInput.id = 'R' + i;
            monInput.type = 'radio';
            monInput.value = i;
            maQuestion.appendChild(monInput);
            // construction du label
            var monLabel = document.createElement("label");
            monLabel.id = 'L' + i;
            monLabel.innerHTML = monJob.attributs[i-1];
            maQuestion.appendChild(monLabel);
            // saut de lignes
            var lig = document.createElement("br");
            lig.id = "br" + i;
            maQuestion.appendChild(lig);
        }
        // on affiche le bouton répondre
        var btnRepondre = document.getElementById("btnRepondre");
        btnRepondre.onclick = function() 
        {
          mesReponses(ind); 
        };        

        document.getElementById("quest").innerHTML = (actions[ind].act).toUpperCase() + " " + (questionsFaites.length + 1);
    },

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
        if ((actionEnCours.type === 'fairplay') && (questionsFaites.indexOf(actionEnCours.step) < 0)) {
            var btnBonus = document.getElementById("btnBonus");
            btnBonus.onclick = function() 
            {
                fairplay(ind); 
            };
            showItem("btnBonus", true);
        } else {
            showItem("btnBonus", false);
        }

        document.getElementById("quest").innerHTML = (actionEnCours.act).toUpperCase();
        document.getElementById("message").innerHTML = actionEnCours.libelle;
    },

    AllerA: function (ind) {
        actionEnCours = actions[ind];
        allerA(actionEnCours.indice);
    },

    Fin: function (ind) {
        actionEnCours = actions[ind];
        showConseiller('fin', ((videoNbPoint / nbQuests[0].points) > 0.5));
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

/******************************* IHM REPONSES **************************/
function mesReponses(ind) {
     var repOk = actions[ind].reponse.solution;     // récupère la bonne réponse

    if (actions[ind].reponse.loi) {
        // afficher l'accès à la règle du jeu
        var maLoi = document.getElementById("loi");
        // imbriquer l'icone dans le lien hypertexte
        maLoi.setAttribute("href", myURL + '/lois/' + actions[ind].reponse.loi + '.pdf');
        maLoi.setAttribute("target",'_blank');
        maLoi.innerHTML = "Relire la loi du jeu";
        showItem("zLoi", true);
    } else {
        showItem("zLoi", false);
    }

    // on complète le message
    document.getElementById("message").innerHTML +=  "<br><br>Réponse : " + actions[ind].attributs[repOk - 1];
    if (actions[ind].reponse.libelle) {
        // optionnel
        document.getElementById("message").innerHTML +=  "<br>Explication : " + actions[ind].reponse.libelle;
    }
    document.getElementById("message").innerHTML +=  "<br>";
    
    if (questionsFaites.indexOf(actions[ind].step) < 0) {
        // MAJ score
        if (maRep === repOk) {
            addScore(maRep === repOk ? actions[ind].reponse.points : 0);
        }

        // MAJ Barre progression
        if(actions[ind].act === 'question') {
            stepDone++;
            init_barre();
        }
        // on stocke le step qui a été traité
        questionsFaites.push(actions[ind].step);
        // PAS TRAITE
        //ne pas mettre cette appel à showConseiller avant le if(questionsFaites...
        showConseiller('reponse', (maRep === repOk), actions[ind].reponse.points);
    } else {
        // DEJA TRAITE
        showConseiller('traite', (maRep === repOk));
    }

    // MAJ interface
    showItem("zPropositions", false);
    showItem("btnRepondre", false);
    showItem("btnReplay", false);
    showItem("btnContinuer", (actions[ind].allerA || true));
}

function changeLevel(level) {
    niveauQuest = level;
    switchVideo(idVideo);
}

// récupère le bouton radio sélectionné par l'utilisateur
function returnSelRadio(nbEl){
	for (let i=1; i <= nbEl; i++) {
		if (document.getElementById("R" + i).checked) {
			return i;
		}
	}
}

// v2
function continuer2(param) {
    // MAJ jauge
    gestJauge(actionEnCours.reponse.points, nbQuests[niveauQuest].nb);
    document._video.playbackRate = 1;   // vitesse normale
    if (param) {
        // allerA intégré
        allerA(param);
    }
    document._video.play(); // on relance la video
}

// v2
function fProposition(code) {
	// gestion des réponses	
	let id = code.substr(1, 1);
	let reponse = code.substr(3, 3);

	if (id === reponse) {
		classId("add", "proposition" + id, "green");
		addScore(1);				// ajouter des points
	} else {
		classId("add", "proposition" + id, "rouge");
		classId("add", "proposition" + reponse, "green");
	}
	// afficher la lois sur le bouton vert

	// gerer la réponse
	gestionInter("reponse");

}

function allerA(param) {
    // vérifié pour la version 2
    seqCode = convertInSeqCode(param);
    getVideo().currentTime = seqCode;
}

function fairplay(ind) {
    //console.log("fairplay");
    if (questionsFaites.indexOf(actions[ind].step) < 0) {
        // on accorde le point seulement une fois
        addScore(1);   // MAJ score
        showItem("echange", false);
        showZone("zSuite", false); 
        showZone("zConseiller", false);
        encadreVideo(false);
        questionsFaites.push(actions[ind].step);    // on ajoute l'action comme traitée
    }
   
}

// v2
function gestJauge(valeur, nbQuestions) {
	//MAJ de la jauge
	let jauge = document.getElementsByClassName("progress-bar");
	//console.log(nbQuestions);
	pourCent = valeur / nbQuestions * 100;
	jauge[0].setAttribute("aria-valuenow", valeur);
	jauge[0].setAttribute("style", "width: " + pourCent + "%");
	jauge[0].innerHTML = (valeur == 0 ? nbQuestions + " questions" : valeur);
}

// v2
function fReplay(param) {
	//console.log("esd");
    // param est le nombre de secondes à reculer sinon on prend la valeur par défaut
    addScore2(-1);   // MAJ score
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
    var scoreMax = ('0' + nbQuests[0].points.toString()).substr(-2);

    let myColor = ((videoNbPoint / nbQuests[0].points) > 0.5 ? 'green' : 'black');
    let myScore = '<span style="color:'+ myColor +';">' + score + '</span>';

    document.querySelector("inter suite score p").innerHTML = myScore + ':' + scoreMax;
}

// ?? on garde ou pas ?
function showConseiller(rubrique, resultat, points) {
     // conseiller
     let monConseiller = document.getElementById("conseiller");
     let source = myURL + '/images/conseiller/tete'+ Math.floor(Math.random() * Math.floor(4) + 1)+'.png';

    let text = '<p style="text-align:center;font-size: 16pt;font-weight: bolder;">' + (resultat ? 'BRAVO !' : 'DOMMAGE') + '<br><br>';    
    let isEnd = false;

    switch(rubrique) {
        case 'fin':
            text+= '<span ' + (resultat ? 'class="gagne">Tu as Plus de<br><span style="font-size: 18pt;font-weight: bolder;">50%</span> de réussite' : 'class="perdu">Reviens vite essayer') +'</span></p>';
            isEnd = true;
            break;

        case 'traite':
            text+=  '<span ' + (resultat ? 'class="gagne">Mais tu as déja tes points' : 'class="perdu">Et pourtant tu l\'as déjà faite') + '</span></p>';
            break;

        case 'reponse':
            text+= '<span ' + (resultat ? 'class="gagne">Tu as gagné<br><span style="font-size: 18pt;font-weight: bolder;">' + points + (points>1?' pts':' pt') : 'class="perdu">Essaye encore') + "</span></span></p>";
            break;
    }
    showZone("zConseiller", true, isEnd);
    monConseiller.setAttribute("src", source);
    document.getElementById("rep").innerHTML = text;
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

// v2
function gestPropositions(etape, attributs, reponse) {
	console.log(reponse);
	let proposition = document.querySelector("inter propositions");
	let button = document.createElement("button");

	deleteChild("inter propositions");	// on supprime l'existant

	switch(etape) {
		case "afficher":
			for (i=0; i < attributs.length; i++) {
				button.id = "proposition" + (i+1);
				button.className = "btn btn-warning";
				button.innerHTML = attributs[i];
				button.setAttribute("onclick","fProposition('" + (i*2) + "" + (i+1) + "" + (i+2) + "" + reponse.solution +"');"); 
				proposition.appendChild(button);
				button = document.createElement("button");
			}
			// zone complement : on renseigne mais c'est masqué pour l'instant
			document.querySelector("inter complement p").innerHTML = reponse.libelle;
			break;
	}
}

// v2
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
			// replay
			document.querySelector("inter suite replay span").style.display = "none";
			// score
			document.querySelector("inter suite score p").style.display = "none";
			addScore(0);	// on init même si c'est masqué
			// next
			document.querySelector("inter suite next img").style.display = "none";
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
			gestPropositions("afficher", objet.attributs, objet.reponse);
			document.querySelector("inter propositions").style.display = "flex";
			// complement
			document.querySelector("inter complement").style.display = "none";
			// Suite
			//document.querySelector("inter suite").style.display = "flex";
			// replay
			document.querySelector("inter suite replay span").style.display = (objet.reculReplay ? "flex" : "none");
			document.querySelector("inter suite replay span").innerHTML = objet.reculReplay;
			document.querySelector("inter suite replay span").setAttribute("onclick","fReplay(" + (objet.reculReplay) + ");");
			// score
			document.querySelector("inter suite score p").style.display = "flex";
			// next
			document.querySelector("inter suite next img").style.display = "none";
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

		case "reponse":
			// complement
			document.querySelector("inter complement").style.display = (document.querySelector("inter complement p").innerHTML != "" ? "flex" : "none");
			// replay
			document.querySelector("inter suite replay span").style.display = "none";
			// score
			document.querySelector("inter suite score p").style.display = "flex";
			// next
			document.querySelector("inter suite next img").style.display = "flex";
			break;

		default:
			inter.display = "none";
	}
}