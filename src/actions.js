// tableau de fonctions pour traiter les arrêts deans la vidéo
var mesActions = { 
    question2 : function (ind) {
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
        setMessage("question");
        showItem("zPropositions", true);
        showItem("zLoi", false);
        showZone("zSuite", true);
        showItem("btnContinuer", false);
        showItem("btnRepondre", true);
        showItem("btnReplay", (actions[ind].reculReplay || false));
        showItem("btnBonus", false);
    },

    question : function (ind) {
        encadreVideo(false);
        document._video.pause();    // on pause la vidéo
        // préparation des actions
        var monJob = actions[ind];

        document.getElementById("message").innerHTML = actions[ind].question.libelle;
        
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
        showPict((actions[ind].question.pict || null), 'myPictQ');
        //showPict(null, 'myPictR');

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
        showItem("btnReplay", (actions[ind].reculReplay || false));
        showItem("btnBonus", false);
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
        showItem("btnBonus", false);
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
        console.log('actions[ind].type', actions[ind].type);
        if ((actions[ind].type === 'fairplay') && (questionsFaites.indexOf(actions[ind].step) < 0)) {
            var btnBonus = document.getElementById("btnBonus");
            btnBonus.onclick = function() 
            {
                fairplay(ind); 
            };
            showItem("btnBonus", true);
        } else {
            showItem("btnBonus", false);
        }

        document.getElementById("quest").innerHTML = (actions[ind].act).toUpperCase();
        document.getElementById("message").innerHTML = actions[ind].libelle;

        // gestion de l'image
        showPict(actions[ind].pict, 'myPict');

        showItem("message", true);
        encadreVideo(true);
    },

    allerA: function (ind) {
        allerA(actions[ind].indice);
    },

    fin: function (ind) {
        encadreVideo(false);
        showConseiller('fin', ((videoNbPoint / nbQuests[0].points) > 0.5));
    },

    mitemps: function (ind) {
        gestionCamps(2);	// changement de camp
    }

}

function convertInSeqCode(myTimeCode) {
    var seqTab = myTimeCode.split(':');
    var seq = parseFloat(seqTab[0]) * 3600;
    seq += parseFloat(seqTab[1]) * 60;
    seq += parseFloat(seqTab[2])
    //console.log("seq", seq);
	return seq;
}

/******************************* IHM REPONSES **************************/
function mesReponses(ind) {
    showPict((actions[ind].reponse.pict || null), 'myPictQ');
    //showPict(null, 'myPictQ');
    // n'a pas encore été joué
    var maRep = returnSelRadio(actions[ind].attributs.length);   // récupère le bouton radio sélectionné par l'utilisateur
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

function continuer(param) {
    showItem("echange", false);
    showZone("zSuite", false); 
    encadreVideo(false);
    showZone("zConseiller", false);
    document._video.playbackRate = 1;   // vitesse normale
    if (param) {
        // allerA intégré
        allerA(param);
    }
    document._video.play(); // on relance la video
}

function allerA(param) {
    encadreVideo(false);
    seqCode = convertInSeqCode(param);
    getVideo().currentTime = seqCode;
}

function replay(param) {
    // param est le nombre de secondes à reculer sinon on prend la valeur par défaut
    addScore(-1);   // MAJ score
    showItem("echange", false);
    showZone("zSuite", false); 
    showZone("zConseiller", false);
    encadreVideo(true);
    getVideo().currentTime = getVideo().currentTime - (param || 2); // on recule de X secondes
    document._video.playbackRate = 0.2; // on active le ralentis
    document._video.play(); // on reprend la lecture de la vidéo
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

function addScore(value) {
    //console.log("addScore");
    if (value === 0) {
        videoNbPoint = 0;
    } else {
        videoNbPoint = videoNbPoint + value;
    }
    var score = ('0' + videoNbPoint.toString()).substr(-2);       // on a le score avec deux digits
    var scoreMax = ('0' + nbQuests[0].points.toString()).substr(-2);

    let myColor = ((videoNbPoint / nbQuests[0].points) > 0.5 ? 'green' : 'white');
    let myScore = '<span style="color:'+ myColor +';">' + score + '</span>';
    document.getElementById("scoreBoard").innerHTML = myScore + ':' + scoreMax;    // score dans la zone à droite

    if(document.getElementById('vjs-bug-textScoreBug')) {
        //le contrôle est nécessaire car l'objet est créé plus tard dans le process
        document.getElementById("vjs-bug-textScoreBug").innerHTML = "SCORE DE " + avatar.toUpperCase() + "&nbsp;&nbsp;<span class=\"scoreBoard\">" + score + ':' + scoreMax + "</span>&nbsp;&nbsp;niveau " + nbQuests[niveauQuest].niv;     // score sur la vidéo
    }
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
            text+= '<span ' + (resultat ? 'class="gagne">Tu as gagné<br><span style="font-size: 18pt;font-weight: bolder;">' + points + (points>1?' pts':' pt') : 'class="perdu">Essaye encore') + "</span></span></p>";
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

function showPict(pict, id) {
    if (pict) {
        let myPict = document.getElementById(id);
        let source = myURL + '/images/'+ pict;
        myPict.setAttribute("src", source);
        myPict.setAttribute("style", "width:40%;height:60%");
        showItem(id, true);
    } else {
        showItem(id, false);
    }
}