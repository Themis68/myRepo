var actions = [{step:10, act:'information', libelle:'Soyez attentifs à cette phase de jeu'},
    {step:20, act:'question', libelle:'L\'arbitre vient de siffler une faute. D\'après-vous laquelle ? ', attributs:['une main', 'un pied', 'une tête'], reponse:1}];

//var reponses = [{step:10, ok:1}];
    
// tableau de fonctions pour traiter les arrêts deans la vidéo
var mesActions = { 
    question : function () {
        document._video.pause();    // on pause la vidéo
        // on affiche la question
      //  document.getElementById("badgeRouge").style.visibility = "hidden";
        document.getElementById("message").value = actions[0].libelle;
        // construction des réponses
        console.log('length', actions[0].attributs.length);
        var maQuestion = document.getElementById("Question");
        for (i=1; i <= actions[0].attributs.length; i++) { 
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
            monLabel.id = 'LR' + i;
            monLabel.innerHTML = actions[0].attributs[i-1];
            maQuestion.appendChild(monLabel);
            console.log( actions[0].attributs[i-1]);
        }
        // gestion du bouton continuer
        document.getElementById("continuer").style.visibility = "hidden";
        // gestion du bouton répondre
        document.getElementById("repondre").style.visibility = "visible";
        // gestion de la zone Question
        maQuestion.style.visibility = "visible";

    },

    information : function () {

        //document.getElementById("badgeRouge").style.visibility = "visible";
        document.getElementById("message").value = actions[0].libelle;
        document.getElementById("Question").style.visibility = "visible";
        //
        var myVideo = document._video = document.getElementById("video");
        myVideo.className = "videoEncadre";

        actions.shift();	// on supprime l'élément FIRST
    },

    stop3 : function () {
        var msg = document.getElementById("message");
        msg.value = 'stop3';
    }
}

// est appelé depuis l'IHM pour remonter la réponse
function mesReponses() {
    var maRep = returnSelRadio();   // récupère le bouton radio sélectionné par l'utilisateur
    var repOk = actions[0].reponse;     // récupère la bonne réponse



    //************************ATTENTION IL FAUT REVOIR CE CODE CAR CELA NE FONCTIONNE QUE POUR UNE REPONSE *******
    //************************************************************************************************************
    alert(maRep === repOk ? "bonne réponse" : "mauvaise réponse. Il fallait choisir '"+ actions[0].reponse +"'");
    //************************************************************************************************************



   // reponses.shift();   // on supprime les réponses de la question en cours
    // gestion du bouton continuer
    document.getElementById("continuer").style.visibility = "visible";
    // gestion du bouton répondre
    document.getElementById("repondre").style.visibility = "hidden";

    actions.shift();	// on supprime l'élément FIRST
}

// récupère le bouton radio sélectionné par l'utilisateur
function returnSelRadio(){
	var valeur = '';
	for (i=1; i<=3; i++) {
		if (document.getElementById("R" + i).checked) {
			return document.getElementById("R" + i).innerHTML;
		}
	}
}

function continuer(){

     // gestion du bouton répondre
    document.getElementById("repondre").style.visibility = "hidden";
    // gestion du bouton continuer
    document.getElementById("continuer").style.visibility = "hidden";
    // gestion du bouton question
    document.getElementById("Question").style.visibility = "hidden";
    //
    var myVideo = document._video = document.getElementById("video");
    myVideo.className = "videoNonEncadre";
    document._video.play(); // on reprend la lecture de la vidéo
}