// tableau de fonctions pour traiter les arrêts deans la vidéo
var mesActions = { 
    question : function (ind) {
        encadreVideo(false);
        document._video.pause();    // on pause la vidéo
        // préparation des actions
        var monJob = actions[ind];

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
        showPict(monJob.pict, 'myPict');

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
        setMessage("question");
        showItem("zPropositions", true);
        showItem("zLoi", false);
        showZone("zSuite", true);
        showItem("btnContinuer", false);
        showItem("btnRepondre", true);
        showItem("btnReplay", true);
        showItem("btnFairPlay", false);
    },
    
    bonus : function (ind) {
        encadreVideo(false);
        document._video.pause();    // on pause la vidéo
        // préparation des actions
        var monJob = actions[ind];

        document.getElementById("message").innerHTML = monJob.libelle;
        
        //
        // PROPOSITIONS
        // on construct dPropositions
        if (document.getElementById("R1") !== null) {
            var parent = document.getElementById("R1").parentNode;
            while( parent.firstChild) {
                // La liste n'est pas une copie, elle sera donc réindexée à chaque appel
                parent.removeChild( parent.firstChild);
            }
        }

        // gestion de l'image
        showPict(monJob.pict, 'myPict');

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

        document.getElementById("quest").innerHTML = (actions[ind].act).toUpperCase();

        setMessage("bonus");
        showItem("zPropositions", true);
        showItem("zLoi", false);
        showZone("zSuite", true);
        showItem("btnContinuer", false);
        showItem("btnRepondre", true);
        showItem("btnReplay", false);
        showItem("btnFairPlay", false);
    },

    information : function (ind) {
        setMessage("information");
        showItem("zPropositions", false);
        showItem("zLoi", false);
        showZone("zSuite", true);
        showItem("btnContinuer", false);
        showItem("btnRepondre", false);
        showItem("btnReplay", false);

        // on affiche le bouton répondre si FAIRPLAY et pas encore GAGNE
        if ((actions[ind].type === 'fairplay') && (questionsFaites.indexOf(actions[ind].step) < 0)) {
            var btnFairPlay = document.getElementById("btnFairPlay");
            btnFairPlay.onclick = function() 
            {
            fairplay(ind); 
            };
            showItem("btnFairPlay", true);
        } else {
            showItem("btnFairPlay", false);
        }

        document.getElementById("quest").innerHTML = (actions[ind].act).toUpperCase();
        document.getElementById("message").innerHTML = actions[ind].libelle;

        // gestion de l'image
        showPict(actions[ind].pict, 'myPict');

        showItem("message", true);
        encadreVideo(true);
    },

    allerA: function (ind) {
        encadreVideo(false);
        getVideo().currentTime = actions[ind].indice;
    },

    fin: function (ind) {
        encadreVideo(false);
        showConseiller('fin', ((videoNbPoint / nbQuests[0].points) > 0.5));
    },

    mitemps: function (ind) {
        gestionCamps(2);	// changement de camp
    }

}

// est appelé depuis l'IHM pour remonter la réponse
function mesReponses(ind) {
    // n'a pas encore été joué
    var maRep = returnSelRadio(actions[ind].attributs.length);   // récupère le bouton radio sélectionné par l'utilisateur
    console.log(actions[ind].reponse);
    var repOk = actions[ind].reponse;     // récupère la bonne réponse

    if (actions[ind].loi) {
        // afficher l'accès à la règle du jeu
        var maLoi = document.getElementById("loi");
        // imbriquer l'icone dans le lien hypertexte
        maLoi.setAttribute("href", myURL + '/lois/' + actions[ind].loi + '.pdf');
        maLoi.setAttribute("target",'_blank');
        maLoi.innerHTML = "Relire la loi du jeu";
        showItem("zLoi", true);
    } else {
        showItem("zLoi", false);
    }

    // on complète le message
    document.getElementById("message").innerHTML +=  "<br><br>Réponse : " +  actions[ind].attributs[repOk - 1];
    document.getElementById("message").innerHTML +=  "<br>Explication : " + actions[ind].libRep;
    document.getElementById("message").innerHTML +=  "<br>";
    
    if (questionsFaites.indexOf(actions[ind].step) < 0) {
        // MAJ score
        if (maRep === repOk) {
            addScore(maRep === repOk ? actions[ind].points : 0);
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
        showConseiller('reponse', (maRep === repOk), actions[ind].points);
    } else {
        // DEJA TRAITE
        showConseiller('traite', (maRep === repOk));
    }

    // MAJ interface
    showItem("zPropositions", false);
    showItem("btnRepondre", false);
    showItem("btnReplay", false);
    showItem("btnContinuer", true);
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

function continuer() {
    showItem("echange", false);
    showZone("zSuite", false); 
    encadreVideo(false);
    showZone("zConseiller", false);
    document._video.playbackRate = 1;   // vitesse normale
    document._video.play(); // on reprend la lecture de la vidéo
}

function replay() {
    addScore(-1);   // MAJ score
    showItem("echange", false);
    showZone("zSuite", false); 
    showZone("zConseiller", false);
    encadreVideo(true);
    getVideo().currentTime = getVideo().currentTime - 2;    // on recule de 2 secondes
    document._video.playbackRate = 0.2; // on active le ralentis
    document._video.play(); // on reprend la lecture de la vidéo
}

function fairplay(ind) {
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

function addScore(value) {
    if (value === 0) {
        videoNbPoint = 0;
    } else {
        videoNbPoint = videoNbPoint + value;
    }
    let myColor = ((videoNbPoint / nbQuests[0].points) > 0.5 ? 'green' : 'white');
    let myScore = '<span style="color:'+ myColor +';">' + videoNbPoint.toString() + '</span>';
    document.getElementById("scoreBoard").innerHTML = myScore + ' / ' + (nbQuests[0].points).toString();
}

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
            text+= '<span ' + (resultat ? 'class="gagne">Tu as gagné<br><span style="font-size: 18pt;font-weight: bolder;">' + points + ' pts' : 'class="perdu">Essaye encore') + "</span></span></p>";
            break;
    }
    showZone("zConseiller", true, isEnd);
    monConseiller.setAttribute("src", source);
    document.getElementById("rep").innerHTML = text;
}

function setMessage(rubrique) {
    let monMessage = document.getElementById("zMessage");
    let monTitre = document.getElementById("chapeau");

    if (rubrique === 'bonus') {
        monTitre.style.backgroundImage="url("+ myURL +"/images/bandeau2.png)";
        monMessage.style.border= "4px solid #32CD32";
    } else {
        monTitre.style.backgroundImage="url("+ myURL +"/images/bandeau.png)";
        monMessage.style.border= "2px solid chocolate";
    }
    showItem("echange", true);
}

function showPict(attribut, id) {
    if (attribut) {
        let myPict = document.getElementById(id);
        let source = myURL + '/images/'+ attribut;
        myPict.setAttribute("src", source);
        showItem(id, true);
    } else {
        showItem(id, false);
    }
}