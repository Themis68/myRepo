//var myURLcomplete = document.location.href;
//var myURL  = myURLcomplete.substring( 0 ,myURLcomplete.lastIndexOf( "/" ) );

var pathVideos = "../rencontres/";		// vidéos des matchs
var pathImages = "../images/";		// vidéos des matchs
var isDefineBVideoJS = false;		// permet de gérer la délcaration de videoJS au premier tour
var tabMessages = [
	" Charge la vidéo pour renseigner les différentes zones"
]
// structures
let rencontre = "rencontre(), description(area), poster(pict), fichier(mp4), scenario(js)";
let equipe = "{nom(), fanion(png), site(url), maillotCouleur(rgb), shortCouleur(rgb)}";
let arbitre = "{maillotCouleur(rgb), shortCouleur(rgb)}"
var structureRencontre =  rencontre + ", gauche" + equipe  + ", droite" + equipe + ", arbitre" + arbitre + "}";
// picker
//var indexElement = undefined;
//pipette
//var canvas;
var ctx;
var images = '';

document.addEventListener("DOMContentLoaded", init, false);	// lance l'écoute des évènements et appelle INIT
document.addEventListener('click', gestClick);

function init() {
    // initialisation des zones au load de la page
    document._video = document.getElementById("myVideo");

    setDisplay("video",false);
    setDisplay("inter",false);
    setDisplay("canvas",false); // poster + silhouettes
}

function getVideo() {
	return document._video;
}

function gestClick(e) {
    // traitement d'un clic sur les objets RGB
    let objet = e.target.id
    if (objet.indexOf("rgb") >= 0) {
        // gestion de la pipette
        loadPipette(objet);
    }

    if (objet.indexOf("png") >= 0) {
        // gestion du poster
        capturePictFromVideo();
    }
}

function upload() {
    // récupération du nom de la vidéo
    let fichier = document.getElementById("uploadedFile").value;
    let tab = fichier.split("\\");
    fileName = {completeName:fichier, shortName:tab[tab.length-1]};

    // afficher la vidéo
    setDisplay("video",true);
    setVideo(fileName);
    //capturePictFromVideo("myVideo");
    setDisplay("inter",true);
    setCodeRencontre();
}

function setCodeRencontre() {
    // prépare la zone d'affichage de la structure attendue pour le catalogue
    setDisplay("rencontre",true);
    setInnerHTML("rencontre",formStructure(structureRencontre));
}

function setVideo(fileName) {
    // définition de la zone de la vidéo
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
    // affiche/masque un objet by Selector
    try {
        let lSelector = document.querySelector(selector);
        lSelector.style.display = (state ? "flex" : "none");     // affiche INTER
    } catch {

    }
}

function setInnerHTML(id, value) {
    // met à jour #texte de l'objet HTML

    try {
        let lId = document.getElementById(id);
        lId.innerHTML = value;     // affecte la valeur
    } catch {

    }
}

function formStructure(structure) {
    // construction de laz chaine de caracteres qui emportera le code dans le catalogue

    let lStructure = structure.split(",");
    let lString = "";
    let lObject = "";
    let lFinObj = "";
    for (let i=0; i < lStructure.length; i++) {
        lObject = lStructure[i];
        lObject = lObject.split("(");
        lObject[0] = lObject[0].trim();

        lString += "<span>";

        // traitement du 1er caractère de la 1ère séquence
        if (lObject[0] == "{") {        // présence d'un début de structure ?
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
            lFinObj = (lObject[1].indexOf('}') > -1 ? true : false);    // présence d'une fin de structure ?
            lObject[1] = lObject[1].replace("}","");    // on supprime l'éventuelle fin de structure
            switch (lObject[1]) {
                case "area":
                    lString += '<textarea id="story" name="story" rows="5" cols="33" id="'+lObject[0]+'"></textarea>';
                    break;
                case "pict":
                    lString += '<input type="button" onclick="javascript:capturePictFromVideo(\'myVideo\')" id="'+lObject[0]+';"/>';
                    break;
                case "mp4":
                    lString += '<input id="uploaded"'+lObject[0]+ ' type="file" accept="video/mp4"/>';
                    break;
                case "js":
                    lString += '<input id="uploaded"'+lObject[0]+ ' type="file" accept=".js"/>';
                    break;
                case "url":
                    lString += '<input type="text" id="'+lObject[0]+'"/>';
                    break;
                case "rgb":
                    lString += '<div class="pipette">'
                    lString += '<div class="inputColor">';
                    lString += '<input id="rgb'+i+'" type="text" value="" />';
                    lString += "<script>let e = getElementById('rgb"+i+"'); e.addEventListener('click', loadPipette);</script></div>";
                    lString += '<div id="previewrgb'+i+'">&nbsp;</div>';
                    lString += '<sil><canvas class="silrgb" id="silrgb'+i+'"></canvas></sil>';
                    lString += '</div>';
                    break;
                default:
                    lString += ' <input type="text" id="'+lObject[0]+'"/>';
                    break;
            }
        }
        lString += "<br></span>";
    }
    return lString;
} 

function capturePictFromVideo() {
    setDisplay("match canvas",true);    // poster

    // 1. Obtenir une référence sur l’élément <video>
    let player = document.querySelector('video');
    
    // 2. Créer un canevas aux dimensions de la vidéo
    let myC = document.getElementById('panel');
    myC.width = player.clientWidth;   // player.videoWidth : taille réelle de la vidéo
    myC.height = player.clientHeight; // player.videoHeight : taille réelle de la vidéo
    
    // 3. Obtenir le contexte de dessin du canevas
    let cx = myC.getContext('2d');
    
    // 4. Capturer l’image actuelle de la vidéo
    cx.drawImage(player, 0, 0, myC.width, myC.height);
    
    // 5. Convertir l’image capturée en fichier, et créer un lien vers ce fichier
    myC.toBlob(function (blob) {
        var a = document.getElementById('myCanvas');
        a.href = URL.createObjectURL(blob);
        a.target = '_blank';
    })

    setDisplay("video",false);
    document.getElementsByClassName("video-js")[0].style.display = "none";

    // afficher les silhouettes
    draw("silG", "rgb(255,255,255)","rgb(0,255,255)");
    draw("silA", "rgb(255,255,255)","rgb(255,0,255)");
    draw("silD", "rgb(255,255,255)","rgb(255,255,0)");
    
    setDisplay("sil canvas",true);  // silhouette
}

// ******************************************
// pipette
// ******************************************

function loadPipette(objet) {
    setDisplay("match canvas",true);
    var image = new Image();
    image.onload = function () {
        ctx.drawImage(image, 0, 0, image.width, image.height); // draw the image on the canvas
    }
    image.src = "./images/" + "Pole_PloufraganMT1.png";
    // canvas est une variable de la fonction accessible depuis les sous-fonctions
    canvas = document.getElementById('panel');
    canvas.setAttribute('data-obj', objet)  // portera le nom de l'objet appelant qui demande le choix de la couleur
    ctx = canvas.getContext('2d');
}

$(function(){
    $('#panel').mousemove(function(e) { // mouse move handler
        var canvasOffset = $(canvas).offset();
        var canvasX = Math.floor(e.pageX - canvasOffset.left);
        var canvasY = Math.floor(e.pageY - canvasOffset.top);
        var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);   // extrait une zone de 1x1 pixel
        var pixel = imageData.data;
       // var pixelColor = "rgba("+pixel[0]+", "+pixel[1]+", "+pixel[2]+", "+pixel[3]+")";
       // $('#preview8').css('backgroundColor', pixelColor);
       let objet = document.getElementById("panel");
       // dataset permet de récupérer les infos des attributs <data->
       document.getElementById('preview'+objet.dataset.obj).setAttribute("style", "background-color:rgb("+pixel[0]+','+pixel[1]+','+pixel[2]+")");
       draw("sil"+objet.dataset.obj,"rgb("+pixel[0]+','+pixel[1]+','+pixel[2]+")","rgb("+pixel[0]+','+pixel[1]+','+pixel[2]+")");
    });
    
    $('#panel').click(function(e) { // mouse click handler
        var canvasOffset = $(canvas).offset();
        var canvasX = Math.floor(e.pageX - canvasOffset.left);
        var canvasY = Math.floor(e.pageY - canvasOffset.top);
        var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
        var pixel = imageData.data;
        let objet = document.getElementById("panel");
        document.getElementById(objet.dataset.obj).value = "rgb("+pixel[0]+','+pixel[1]+','+pixel[2]+")";
    });
})