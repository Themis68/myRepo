// tableau de fonctions pour traiter les arrêts deans la vidéo
var mesActions = { 
    question : function (indice) {
        console.log(actions[indice]);
        document._video.pause();    // on pause la vidéo
        // préparation des actions
        var monJob = actions[indice];

        // on prépare dMessage
        document.getElementById("message").innerHTML = monJob.libelle;
        // on construct dPropositions
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
          mesReponses(indice); 
        };        

        document.getElementById("quest").innerHTML = (actions[indice].act).toUpperCase();
        showItem("echange", true);
        showItem("zPropositions", true);
        showItem("zLoi", false);
        showItem("zSuite", true);
        showItem("btnContinuer", false);
        showItem("btnRepondre", true);
    },

    information : function (indice) {
        showItem("zPropositions", false);
        showItem("zLoi", false);
        showItem("zSuite", false);
        document.getElementById("quest").innerHTML = (actions[indice].act).toUpperCase();
        document.getElementById("message").innerHTML = actions[indice].libelle;
        encadreVideo(true);
    },

    fin : function (indice) {
        var conseil = document.getElementById("zConseiller");
        conseil.setAttribute("style","visibility:visible;");
        let text =  '<p>' + ((videoNbPoint / videoMaxPoint) > 0,5 ? 'BRAVO vous avez résussi à obtenir plus de la moitié des points' : 'Bien joué mais il faut faire encore des efforts pour devenir arbitre<br><br>');
        text +=  'N\hésite pas à ré-essyer</span></p>';
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
    // gestion particulière de la zone du conseiller
    var conseil = document.getElementById("zConseiller");
    conseil.setAttribute("style","visibility:visible;");
    let text =  '<p>' + (maRep === repOk ? 'BONNE REPONSE' : 'MAUVAISE REPONSE') + '<br><br>';
    text +=  '<span ' + (maRep === repOk ? 'class="gagne">Vous avez gagné ' + actions[indice].points + ' points' : 'class="perdu">Dommage. ce sera pour une prochaine fois') + "</span></p>";

    document.getElementById("rep").innerHTML = text;

    showItem("zPropositions", false);
    showItem("btnRepondre", false);
    showItem("btnContinuer", true);

    // retirer les elements de la réponse du DOM
    // sinon on les aura à la prochaine question
    for(i=1; i <= actions[indice].attributs.length ; i++) {
        var maReponse = document.getElementById("R"+i);
        maReponse.parentNode.removeChild(maReponse);
        var monLab = document.getElementById("L"+i);
        monLab.parentNode.removeChild(monLab);
        var lig = document.getElementById("br"+i);
        lig.parentNode.removeChild(lig);
    }

    // MAJ score
    videoNbPoint += (maRep === repOk ? actions[indice].points : 0);
    document.getElementById("scoreBoard").innerHTML = videoNbPoint.toString() + ' / ' + videoMaxPoint.toString();
	

    // MAJ Barre progression
    stepDone++;
    console.log(stepDone);
    init_barre();
}

// récupère le bouton radio sélectionné par l'utilisateur
function returnSelRadio(nbEl){
	var valeur = '';
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
    var conseil = document.getElementById("zConseiller");
    conseil.setAttribute("style","visibility:hidden;");
    document._video.play(); // on reprend la lecture de la vidéo
}