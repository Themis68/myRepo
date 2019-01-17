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
        if (monJob.pict) {
            var myPict = document.getElementById("myPict");
            let source = myURL + '/images/'+ monJob.pict;
            myPict.setAttribute("src", source);
            showItem('myPict', true);
        } else {
            showItem('myPict', false);
        }

        var maQuestion = document.getElementById("zPropositions");
        for (i=1; i <= monJob.attributs.length; i++) { 
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
        showItem("echange", true);
        showItem("zPropositions", true);
        showItem("zLoi", false);
        showZone("zSuite", true);
        showItem("btnContinuer", false);
        showItem("btnRepondre", true);
        showItem("btnReplay", true);
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
        if (monJob.pict) {
            var myPict = document.getElementById("myPict");
            let source = myURL + '/images/'+ monJob.pict;
            myPict.setAttribute("src", source);
            showItem('myPict', true);
        } else {
            showItem('myPict', false);
        }

        var maQuestion = document.getElementById("zPropositions");
        for (i=1; i <= monJob.attributs.length; i++) { 
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
        showItem("echange", true);
        showItem("zPropositions", true);
        showItem("zLoi", false);
        showZone("zSuite", true);
        showItem("btnContinuer", false);
        showItem("btnRepondre", true);
        showItem("btnReplay", false);
    },

    information : function (ind) {
        showItem("echange", true);
        showItem("zPropositions", false);
        showItem("zLoi", false);
        showZone("zSuite", false);
        document.getElementById("quest").innerHTML = (actions[ind].act).toUpperCase();
        document.getElementById("message").innerHTML = actions[ind].libelle;

        // gestion de l'image
        if (actions[ind].pict) {
            var myPict = document.getElementById("myPict");
            let source = myURL + '/images/'+ actions[ind].pict;
            myPict.setAttribute("src", source);
            showItem('myPict', true);
        } else {
            showItem('myPict', false);
        }

        showItem("message", true);
        showItem("btnContinuer", false);
        showItem("btnRepondre", false);
        showItem("btnReplay", false);
        encadreVideo(true);
    },

    allerA: function (ind) {
        encadreVideo(false);
        getVideo().currentTime = actions[ind].indice;
        //document._video.play(); // on reprend la lecture de la vidéo
    },

    fin : function (ind) {
        encadreVideo(false);
        showConseiller('fin', ((videoNbPoint / nbQuests[0].points) > 0.5));
        // zone à afficher
       // showZone("zConseiller", true);
        // préparation message
      //  let text =  '<p>' + ((videoNbPoint / nbQuests[0].points) > 0.5 ? 'BRAVO tu as obtenu plus de la moitié des points' : 'Bien joué. Je suis sûr que tu peux faire mieux') + '<br><br>';
      //  text +=  'N\hésite pas à essayer avec d\'autres vidéos</p>';
       // document.getElementById("rep").innerHTML = text;
    }
}

// est appelé depuis l'IHM pour remonter la réponse
function mesReponses(ind) {
    // n'a pas encore été joué
    var maRep = returnSelRadio(actions[ind].attributs.length);   // récupère le bouton radio sélectionné par l'utilisateur
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

    // POP-UP
   // let text =  '<p style="text-align:center;">' + (maRep === repOk ? 'BONNE REPONSE' : 'MAUVAISE REPONSE') + '<br><br>';
    
    if (questionsFaites.indexOf(actions[ind].step) < 0) {
        // MAJ score
        if (maRep === repOk) {
            addScore((maRep === repOk ? actions[ind].points : 0));
        }

        // MAJ Barre progression
        if(actions[ind].act === 'question') {
            stepDone++;
            init_barre();
        }
        // on stocke le step qui a été traité
        questionsFaites.push(actions[ind].step);

        // PAS TRAITE
        // POP-UP
        //ne pas mettre cette appel à showConseiller avant le if(questionsFaites...
        showConseiller('reponse', (maRep === repOk));
        //text+= '<span ' + (maRep === repOk ? 'class="gagne">Tu as gagné <br><span style="font-size: 18pt;font-weight: bolder;">' + actions[ind].points + 
        //' points' : 'class="perdu">Dommage. ce sera pour une prochaine fois') + "</span></span></p>";

    } else {
        // DEJA TRAITE
        showConseiller('traite', ((maRep === repOk)));
        //text+=  '<span ' + (maRep === repOk ? 'class="gagne">Tu as déja reçu tes points' : 'class="perdu">Et pourtant tu l\'as déjà faite') + '</span></p>';
    }

    //document.getElementById("rep").innerHTML = text;    //ne pas mettre cette ligne avant le if(questionsFaites...

    // MAJ interface
    showItem("zPropositions", false);
    showItem("btnRepondre", false);
    showItem("btnReplay", false);
    showItem("btnContinuer", true);
   // showZone("zConseiller", true);
}

function changeLevel(level) {
    niveauQuest = level;
    console.log('niveau', niveauQuest);
    //stepDone = 0;
    switchVideo(idVideo);
}

// récupère le bouton radio sélectionné par l'utilisateur
function returnSelRadio(nbEl){
	for (i=1; i <= nbEl; i++) {
		if (document.getElementById("R" + i).checked) {
			return i;
		}
	}
}

function continuer(){
    showItem("echange", false);
    showZone("zSuite", false); 
    encadreVideo(false);
    showZone("zConseiller", false);
    document._video.play(); // on reprend la lecture de la vidéo
}

function replay(){
    addScore(-1);   // MAJ score
    showItem("echange", false);
    showZone("zSuite", false); 
    showZone("zConseiller", false);
    encadreVideo(false);
    getVideo().currentTime = getVideo().currentTime - 2;    // on recule de 2 secondes
    document._video.play(); // on reprend la lecture de la vidéo
}

function addScore(value) {
    if (value === 0) {
        videoNbPoint = 0;
    } else {
        videoNbPoint = videoNbPoint + value;
    }
    document.getElementById("scoreBoard").innerHTML = videoNbPoint.toString() + ' / ' + (nbQuests[0].points).toString();
}

function showConseiller(rubrique, resultat) {
     // conseiller
     let monConseiller = document.getElementById("conseiller");
     let source = myURL + '/images/conseiller/tete'+ Math.floor(Math.random() * Math.floor(4) + 1)+'.png';

    let text = '<p style="text-align:center;">' + (resultat ? 'BRAVO' : 'DOMMAGE') + '<br><br>';
    switch(rubrique) {
        case 'fin':
            text+=  (resultat ? 'Tu as obtenu plus de la moitié des points' : 'Je suis sûr que tu peux faire mieux') + '<br><br>';
            text +=  'N\hésite pas à essayer avec d\'autres vidéos</p>';
            break;

        case 'traite':
            text+=  '<span ' + (resultat ? 'class="gagne">Tu as déja reçu tes points' : 'class="perdu">Et pourtant tu l\'as déjà faite') + '</span></p>';
            break;

        case 'reponse':
            text+= '<span ' + (resultat ? 'class="gagne">Tu as gagné<br><span style="font-size: 18pt;font-weight: bolder;">' + actions[ind].points + ' pts' : 'class="perdu">Ne lâche rien') + "</span></span></p>";
            break;
        
        case 'encouragement':
            break;
    }
    showZone("zConseiller", true);
    monConseiller.setAttribute("src", source);
    document.getElementById("rep").innerHTML = text;
}