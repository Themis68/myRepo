var pathVideos = "../rencontres/";		// vidéos des matchs
var pathImages = "../images/";		// vidéos des matchs
var isDefineBVideoJS = false;		// permet de gérer la délcaration de videoJS au premier tour
// structures
let equipe = "{nom(), fanion(png), site(url), maillotCouleur(rgb)}";
let arbitre = "{maillotCouleur(rgb)}"
var structureRencontre =  "{id(incr), rencontre(), poster(png), fichier(mp4), scenario(js), description(), gauche" + equipe  + ", droite" + equipe + ", arbitre" + arbitre + "}";

document.addEventListener("DOMContentLoaded", init, false);	// lance l'écoute des évènements et appelle INIT

function init() {

}

function upload() {
    // récupération du nom de la vidéo
    let fichier = document.getElementById("uploadedFile").value;
    let tab = fichier.split("\\");
    fileName = {completeName:fichier, shortName:tab[tab.length-1]};

    // afficher la vidéo
    setVideo(fileName);
    setDisplay("inter",true);
    setCodeRencontre();
}

function setCodeRencontre() {
    setDisplay("rencontre",true);
    setInnerHTML("rencontre",formStructure(structureRencontre));
}

function setVideo(fileName) {
    if (isDefineBVideoJS) {
        // il y a déjà une vidéo
        myVideo.src({
               src: pathVideos + fileName.shortName , 
               type: "video/mp4"
            });
        myVideo.poster(pathImages + "pelouses/stade.jpg"); 
    } else {
        // on créé la vidéo
         myVideo = videojs('myVideo', {
            disableVideoPlayPauseClick: false,
            controls: true,
            preload:  'none',
            loop: false,
            fluid: true,
            poster: pathImages + "pelouses/stade.jpg",
            controlBar: {
                volumePanel: {
                    volume: 1,
                    inline: false,
                    vertical: true
                },
                pictureInPictureToggle: false	// nouveau : gère l'image par image
            },
            sources: [{
                src: pathVideos + fileName.shortName,
                type: "video/mp4"
            }]}
        )
        isDefineBVideoJS = true;    // on a une vidéo chargée
        myVideo.load();
    }
}

function setDisplay(selector, state) {
    try {
        let lSelector = document.querySelector(selector);
        lSelector.style.display = (state ? "flex" : "none");     // affiche INTER
    } catch {

    }
}

function setInnerHTML(id, value) {
    try {
        let lId = document.getElementById(id);
        lId.innerHTML = value;     // affecte la valeur
    } catch {

    }
}

function formStructure(structure) {
    // newStructureRencontre = structure.split(",").join("<br>");
    let lStructure = structure.split(",");
    let lString = "";
    let lObject = "";
    console.log(lStructure);
    for (let i=0; i < lStructure.length; i++) {
        lObject = lStructure[i];
        lObject = lObject.split("(");
        lObject[0] = lObject[0].trim();
        console.log(lObject);

        lString += "<span>";

        // traitement du 1er caractère de la 1ère séquence
        if (lObject[0] == "{") {
            lString += "{<br>";
            lObject[0] = lObject[0].replace("{","");
        } 
        lString += lObject[0] + ":";

        // traitement de la 2éme séquence
        lObject[1] = lObject[1].trim(); // suppression des espaces

        if (lObject[1] == ")") {
            // saisie libre
            lString += ' <input type="text" id="'+lObject[0]+'"/><br>';
        } else {
            lObject[1] = lObject[1].replace(")","");
            switch (lObject[1]) {
                case "incr":
                    lString += ' <input type="text" id="'+lObject[0]+'"/>';
                    break;
                case "png":
                    lString += '<input id="uploaded"'+lObject[0]+ ' type="file" accept="image/png"/>';
                    break;
                case "mp4":
                    lString += '<input id="uploaded"'+lObject[0]+ ' type="file" accept="video/mp4"/>';
                    break;
                case "js":
                    lString += '<input id="uploaded"'+lObject[0]+ ' type="file" accept="*/js"/>';
                    break;
                case "url":
                    lString += ' <input type="text" id="'+lObject[0]+'"/>';
                    break;
                case "rgb":
                  /*  el = document.createElement("canvas");
                    el.width = "10px";
                    el.height = "10px";
                    el.id = "silhEquipe"+ (i+1);*/


                    lString += '<input type="text" id="'+lObject[0]+'"/>';
                    lString += '<canvas id="silhEquipe'+ (i+1)+ '" width="10px" height="10px" />';

                 //   draw("silhEquipe"+ (i+1), "rgb(255,255,255)");
                    break;
                default:
                    lString += ' <input type="text" id="'+lObject[0]+'"/>';
                    break;
            }
        }
        lString += "<br></span>";
    }
    console.log(lString);
    return lString;
} 