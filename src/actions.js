// tableau de fonctions pour traiter les arrêts deans la vidéo
var mesActions = { 
    question : function (indice) {
        document.getElementById("echanges").style.visibility = "hidden";
        // préparation des actions
        var monJob = actions[indice];
        document._video.pause();    // on pause la vidéo
        // on prépare dMessage
        document.getElementById("message").value = monJob.libelle;
        // on construct dPropositions
        var maQuestion = document.getElementById("questions");
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
        // gestion de la zone Question
       // maQuestion.style.visibility = "visible";

        document.getElementById("dMessage").style.visibility = "visible";
        document.getElementById("dPropositions").style.visibility = "visible";
        document.getElementById("dReponse").style.visibility = "hidden";
        document.getElementById("echanges").style.visibility = "visible";
    },

    information : function (indice) {
        document.getElementById("echanges").style.visibility = "hidden";
        // préparation dMessage
        document.getElementById("message").value = actions[indice].libelle;
        // MAJ cadre de la vidéo
        var myVideo = document._video = document.getElementById("video");
        myVideo.className = "videoEncadre";
        document.getElementById("dMessage").style.visibility = "visible";
        document.getElementById("dPropositions").style.visibility = "hidden";
        document.getElementById("dReponse").style.visibility = "hidden";
        document.getElementById("echanges").style.visibility = "visible";
    },

    stop3 : function () {
        var msg = document.getElementById("message");
        msg.value = 'stop3';
    }
}

// est appelé depuis l'IHM pour remonter la réponse
function mesReponses(indice) {
    document.getElementById("echanges").style.visibility = "hidden";
    var maRep = returnSelRadio(actions[indice].attributs.length);   // récupère le bouton radio sélectionné par l'utilisateur
    var repOk = actions[indice].reponse;     // récupère la bonne réponse

    alert(maRep === repOk ? "bonne réponse" : "mauvaise réponse. Il fallait choisir '"+ actions[indice].attributs[repOk - 1] +"'");

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

    // gestion du bouton continuer
    if (actions[indice].loi) {
        // afficher l'accès à la règle du jeu
        var maLoi = document.getElementById("loi");
        var monIco = '<img id="ico" src="images/pdf.png" width="5%" height="5%" />';
        // imbriquer l'icone dans le lien hypertexte
       // var maLoi = document.getElementById("maLoi");
      // maLoi.setAttribute("id", 'urlIco'); 
       maLoi.setAttribute("href", myURL + '/lois/' + actions[indice].loi + '.pdf');
       maLoi.setAttribute("target",'_blank');
       maLoi.innerHTML = monIco + '&nbsp;'+ actions[indice].loi;
         //   maLoi.appendChild(monDoc);
    }

    // on complète le message
    document.getElementById("message").value +=  "\nRéponse : " +  actions[indice].attributs[repOk - 1];
    document.getElementById("message").value +=  "\nExplication : " + actions[indice].libRep;
    document.getElementById("message").value +=  "\n";

    document.getElementById("dMessage").style.visibility = "visible";
    document.getElementById("dPropositions").style.visibility = "hidden";
    document.getElementById("dReponse").style.visibility = "visible";
    document.getElementById("echanges").style.visibility = "visible"; 
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
   // var m1 = document.getElementById("ico");
   // m1.parentNode.removeChild(m1);
   // var m2 = document.getElementById("urlIco");
   // m2.parentNode.removeChild(m2);

    document.getElementById("dMessage").style.visibility = "hidden";
    document.getElementById("dPropositions").style.visibility = "hidden";
    document.getElementById("dReponse").style.visibility = "hidden";
    document.getElementById("echanges").style.visibility = "hidden"; 


    // zone vidéo
    var myVideo = document._video = document.getElementById("video");
    myVideo.className = "videoNonEncadre";
    document._video.play(); // on reprend la lecture de la vidéo
}