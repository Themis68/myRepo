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
        // on construct dPropositions
        if (document.getElementById("R1") !== null) {
            console.log('efface');
            // retirer les elements de la réponse du DOM
            // sinon on les aura à la prochaine question
            for(i=1; i <= actions[ind].attributs.length ; i++) {
                var maReponse = document.getElementById("R"+i);
                maReponse.parentNode.removeChild(maReponse);
                var monLab = document.getElementById("L"+i);
                monLab.parentNode.removeChild(monLab);
                var lig = document.getElementById("br"+i);
                lig.parentNode.removeChild(lig);
            }

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
        showItem("zSuite", true);
        showItem("btnContinuer", false);
        showItem("btnRepondre", true);
    },

    information : function (ind) {
        showItem("echange", true);
        showItem("zPropositions", false);
        showItem("zLoi", false);
        showItem("zSuite", false);
        document.getElementById("quest").innerHTML = (actions[ind].act).toUpperCase();
        document.getElementById("message").innerHTML = actions[ind].libelle;
        showItem("message", true);
        showItem("btnContinuer", false);
        showItem("btnRepondre", false);
        encadreVideo(true);
    },

    allerA: function (ind) {
        console.log()
        encadreVideo(false);
        getVideo().currentTime = actions[ind].indice;
        document._video.play(); // on reprend la lecture de la vidéo
    },

    fin : function (ind) {
        encadreVideo(false);
        // zone à afficher
        showZone("zConseiller", true);
        // préparation message
        let text =  '<p>' + ((videoNbPoint / nbQuests[0].points) > 0.5 ? 'BRAVO tu as obtenu plus de la moitié des points' : 'Bien joué. Je suis sûr que tu peux faire mieux') + '<br><br>';
        text +=  'N\hésite pas à essayer avec d\'autres vidéos</p>';
        document.getElementById("rep").innerHTML = text;
    }
}

// est appelé depuis l'IHM pour remonter la réponse
function mesReponses(indice) {
    var maRep = returnSelRadio(actions[indice].attributs.length);   // récupère le bouton radio sélectionné par l'utilisateur
    var repOk = actions[indice].reponse;     // récupère la bonne réponse

    // conseiller
    var monConseiller = document.getElementById("conseiller");
    let source = myURL + '/images/conseiller/tete'+ Math.floor(Math.random() * Math.floor(4) + 1)+'.png';
    monConseiller.setAttribute("src", source);

    if (actions[indice].loi) {
        // afficher l'accès à la règle du jeu
        var maLoi = document.getElementById("loi");
        // imbriquer l'icone dans le lien hypertexte
       maLoi.setAttribute("href", myURL + '/lois/' + actions[indice].loi + '.pdf');
       maLoi.setAttribute("target",'_blank');
       maLoi.innerHTML = "Relire la loi du jeu";
       showItem("zLoi", true);
    } else {
        showItem("zLoi", false);
    }

    // on complète le message
    document.getElementById("message").innerHTML +=  "<br><br>Réponse : " +  actions[indice].attributs[repOk - 1];
    document.getElementById("message").innerHTML +=  "<br>Explication : " + actions[indice].libRep;
    document.getElementById("message").innerHTML +=  "<br>";

    // POP-UP
    let text =  '<p style="text-align:center;">' + (maRep === repOk ? 'BONNE REPONSE' : 'MAUVAISE REPONSE') + '<br><br>';
    text +=  '<span ' + (maRep === repOk ? 'class="gagne">Tu as gagné <br><span style="font-size: 18pt;font-weight: bolder;">' + actions[indice].points + ' points' : 'class="perdu">Dommage. ce sera pour une prochaine fois') + "</span></span></p>";
    document.getElementById("rep").innerHTML = text;

    // MAJ score
    videoNbPoint += (maRep === repOk ? actions[indice].points : 0);
    document.getElementById("scoreBoard").innerHTML = videoNbPoint.toString() + ' / ' + (nbQuests[0].points).toString();

    // MAJ Barre progression
    stepDone++;
    console.log(stepDone);
    init_barre();

    // MAJ interface
    showItem("zPropositions", false);
    showItem("btnRepondre", false);
    showItem("btnContinuer", true);
    showZone("zConseiller", true);
}

function changeLevel(level) {
    niveauQuest = level;
    stepDone = 0;
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
    showItem("zSuite", false); 
    encadreVideo(false);
    showZone("zConseiller", false);
    document._video.play(); // on reprend la lecture de la vidéo
}