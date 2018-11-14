// tableau de fonctions pour traiter les arrêts deans la vidéo
var mesActions = { 
    question : function (indice) {
        var monJob = actions[indice];
        document._video.pause();    // on pause la vidéo
        // on affiche la question
      //  document.getElementById("badgeRouge").style.visibility = "hidden";
        document.getElementById("message").value = monJob.libelle;
        // construction des réponses
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
            maQuestion.appendChild(document.createElement("br"));
        }
        // on cache le bouton continuer
        document.getElementById("continuer").style.visibility = "hidden";
        // on affiche le bouton répondre
        var btnReponse = document.getElementById("btnRepondre");
        btnReponse.onclick = function() 
        {
          mesReponses(indice); 
        };        
        document.getElementById("message").style.visibility = "visible";
        document.getElementById("repondre").style.visibility = "visible";
        // gestion de la zone Question
        maQuestion.style.visibility = "visible";

    },

    information : function (indice) {
        //document.getElementById("badgeRouge").style.visibility = "visible";
        document.getElementById("message").value = actions[indice].libelle;
        document.getElementById("Question").style.visibility = "visible";
        //
        var myVideo = document._video = document.getElementById("video");
        myVideo.className = "videoEncadre";

        //actions.shift();	// on supprime l'élément FIRST
    },

    stop3 : function () {
        var msg = document.getElementById("message");
        msg.value = 'stop3';
    }
}

// est appelé depuis l'IHM pour remonter la réponse
function mesReponses(indice) {
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
    }

    // gestion du bouton continuer
    if (actions[indice].loi) {
        // afficher l'accès à la règle du jeu
        var maLoi = document.getElementById("loi");
        var monIco = '<img id="ico" src="images/pdf.png" width="5%" height="5%" />';
        // imbriquer l'icone dans le lien hypertexte
        var monDoc = document.createElement("a");
            monDoc.setAttribute("id", 'urlIco'); 
            monDoc.setAttribute("href", myURL + '/lois/' + actions[indice].loi + '.pdf');
            monDoc.setAttribute("target",'_blank');
            monDoc.innerHTML = monIco + '&nbsp;'+ actions[indice].loi;
            maLoi.appendChild(monDoc);
    }
    document.getElementById("continuer").style.visibility = "visible";
    document.getElementById("loi").style.visibility = "visible";
    // gestion du bouton répondre
    document.getElementById("repondre").style.visibility = "hidden";
    document.getElementById("message").style.visibility = "hidden";
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
     // gestion du bouton répondre
    document.getElementById("repondre").style.visibility = "hidden";
    // gestion du bouton continuer
    document.getElementById("continuer").style.visibility = "hidden";
    // cacher les lois
    document.getElementById("loi").style.visibility = "hidden";
    // gestion du bouton question
    document.getElementById("Question").style.visibility = "hidden";
    // zone lois
    var m1 = document.getElementById("ico");
    m1.parentNode.removeChild(m1);
    var m2 = document.getElementById("urlIco");
    m2.parentNode.removeChild(m2);
    // zone vidéo
    var myVideo = document._video = document.getElementById("video");
    myVideo.className = "videoNonEncadre";
    document._video.play(); // on reprend la lecture de la vidéo
}