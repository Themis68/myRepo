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
var codeCatalogue = "";

// contenu du catalogue
var myCatalogue = "";

// pipette
var ctx;
var images = '';

// tab CATALOGUE
var pathRencontres = "../rencontres/";		// vidéos des matchs


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
    codeCatalogue = "";

    let lStructure = structure.split(",");
    let lString = "";
    let lObject = "";
    let lFinObj = "";
    console.log(lStructure);
    for (let i=0; i < lStructure.length; i++) {
        lObject = lStructure[i];
        lObject = lObject.split("(");
        lObject[0] = lObject[0].trim();
        console.log(lObject);

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
            console.log(lObject[1]);
            switch (lObject[1]) {
                case "area":
                    lString += '<textarea id="story" name="story" rows="5" cols="33" id="'+lObject[0]+'"></textarea>';
                    codeCatalogue += lObject[1] + ': "' + lObject[0] + '";';
                    break;
                case "pict":
                    lString += '<input type="button" onclick="javascript:capturePictFromVideo(\'myVideo\')" id="'+lObject[0]+';"/>';
                    codeCatalogue += lObject[1] + ': "' + lObject[0] + '";';
                    break;
                case "mp4":
                    lString += '<input id="uploaded"'+lObject[0]+ ' type="file" accept="video/mp4"/>';
                    codeCatalogue += lObject[1] + ': "' + lObject[0] + '";';
                    break;
                case "js":
                    lString += '<input id="uploaded"'+lObject[0]+ ' type="file" accept=".js"/>';
                    codeCatalogue += lObject[1] + ': "' + lObject[0] + '";';
                    break;
                case "url":
                    lString += '<input type="text" id="'+lObject[0]+'"/>';
                    codeCatalogue += lObject[1] + ': "' + lObject[0] + '";';
                    break;
                case "rgb":
                    lString += '<div class="pipette">'
                    lString += '<div class="inputColor">';
                    lString += '<input id="rgb'+i+'" type="text" value="" />';
                    lString += "<script>let e = getElementById('rgb"+i+"'); e.addEventListener('click', loadPipette);</script></div>";
                    lString += '<div id="previewrgb'+i+'">&nbsp;</div>';
                  //  lString += '<sil><canvas class="silrgb" id="silrgb'+i+'"></canvas></sil>';
                    lString += '</div>';
                    codeCatalogue += lObject[1] + ': "' + lObject[0] + '";';
                    break;
                default:
                    lString += ' <input type="text" id="'+lObject[0]+'"/>';
                    codeCatalogue += lObject[1] + ': "' + lObject[0] + '";';
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
        console.log(objet.dataset.obj);
        document.getElementById(objet.dataset.obj).value = "rgb("+pixel[0]+','+pixel[1]+','+pixel[2]+")";
    });
})

/*function tab(index){

    //document.getElementsByClassName("tabs").style.display = false;  // on masque l'onglet actuel
    document.querySelector("tab" + index).style.display = true; // on aaffiche l'onglet nouveau

}*/

/*  ONGKET CATALOGUE  
function creerCatalogue() {

    var testEndings = function(string, endings) {
        var file = new File([string], { type: 'plain/text',
                                        endings: endings });

        file.toBlob(function (blob) {
            var a = document.getElementById('ancre');
            a.href = URL.createObjectURL(blob);
            a.target = '_blank';
        })
        
    }
    testEndings('foo\nbar', 'native');
}*/
  
/******************** STEPS *********/

;(function($) {
    "use strict";  
    
    //* Form js
    function verificationForm(){
        //jQuery time
        var current_fs, next_fs, previous_fs; //fieldsets
        var left, opacity, scale; //fieldset properties which we will animate
        var animating; //flag to prevent quick multi-click glitches

        $(".next").click(function () {
            if (animating) return false;
            animating = true;

            current_fs = $(this).parent();
            next_fs = $(this).parent().next();

            //activate next step on progressbar using the index of next_fs
            $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

            //show the next fieldset
            next_fs.show();
            //hide the current fieldset with style
            current_fs.animate({
                opacity: 0
            }, {
                step: function (now, mx) {
                    //as the opacity of current_fs reduces to 0 - stored in "now"
                    //1. scale current_fs down to 80%
                    scale = 1 - (1 - now) * 0.2;
                    //2. bring next_fs from the right(50%)
                    left = (now * 50) + "%";
                    //3. increase opacity of next_fs to 1 as it moves in
                    opacity = 1 - now;
                    current_fs.css({
                        'transform': 'scale(' + scale + ')',
                        'position': 'absolute'
                    });
                    next_fs.css({
                        'left': left,
                        'opacity': opacity
                    });
                },
                duration: 800,
                complete: function () {
                    current_fs.hide();
                    animating = false;
                },
                //this comes from the custom easing plugin
                easing: 'easeInOutBack'
            });
        });

        $(".previous").click(function () {
            if (animating) return false;
            animating = true;

            current_fs = $(this).parent();
            previous_fs = $(this).parent().prev();

            //de-activate current step on progressbar
            $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

            //show the previous fieldset
            previous_fs.show();
            //hide the current fieldset with style
            current_fs.animate({
                opacity: 0
            }, {
                step: function (now, mx) {
                    //as the opacity of current_fs reduces to 0 - stored in "now"
                    //1. scale previous_fs from 80% to 100%
                    scale = 0.8 + (1 - now) * 0.2;
                    //2. take current_fs to the right(50%) - from 0%
                    left = ((1 - now) * 50) + "%";
                    //3. increase opacity of previous_fs to 1 as it moves in
                    opacity = 1 - now;
                    current_fs.css({
                        'left': left
                    });
                    previous_fs.css({
                        'transform': 'scale(' + scale + ')',
                        'opacity': opacity
                    });
                },
                duration: 800,
                complete: function () {
                    current_fs.hide();
                    animating = false;
                },
                //this comes from the custom easing plugin
                easing: 'easeInOutBack'
            });
        });

        $(".submit").click(function () {
            return false;
        })
    }; 
    
    //* Add Phone no select
    function phoneNoselect(){
        if ( $('#msform').length ){   
            $("#phone").intlTelInput(); 
            $("#phone").intlTelInput("setNumber", "+880"); 
        };
    }; 
    //* Select js
    function nice_Select(){
        if ( $('.product_select').length ){ 
            $('select').niceSelect();
        };
    }; 
    /*Function Calls*/  
    verificationForm ();
    phoneNoselect ();
    nice_Select ();
})(jQuery); 

function uploadCatalogue(event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function(){
        //var dataURL = reader.result;
        getCatalogue(reader.result);    //appel nécessaire pour sortir du context local et affecter la variable myCatalogue
    };
    reader.readAsText(input.files[0]);
}

// lister les catalogues
function getCatalogue(myCat){
    myCatalogue = JSON.parse(myCat); 

    console.log(myCatalogue.rencontres.length );

    if(myCatalogue.rencontres.length > 0 ) {
        let liste = document.querySelector("listeMatch");
        let matchs = document.createElement("div");
        matchs.setAttribute("class", "list-group");
        liste.appendChild(matchs);

        for (let i=0; i < myCatalogue.rencontres.length; i++){
            let matchA = document.createElement("a");
            matchA.href = "#";
            matchA.setAttribute("class", "list-group-item list-group-item-action flex-column align-items-start" + (i==0 ? "active" : ""));
            matchA.id = "match"+i;
            matchA.innerHTML = myCatalogue.rencontres[i].rencontre;
            matchs.appendChild(matchA);

            let matchD = document.createElement("div");
            matchD.setAttribute("class", "d-flex w-100 justify-content-between");
            matchA.appendChild(matchD);

            let matchH = document.createElement("h5");
            matchH.setAttribute("class", "mb-1");
            matchD.appendChild(matchH);

            let matchP = document.createElement("p");
            matchP.innerHTML = myCatalogue.rencontres[i].description;
            matchD.appendChild(matchP);

            matchA.appendChild(matchD);

            matchs.appendChild(matchA);
        }
    }   
}

// creerCatalogue
function creerCatalogue() {
    let b =  document.querySelector("listeMatch");
    var a = document.createElement('a');
    let myTab = '{"rencontres": []}';
    var file = new File( [myTab], "catalogue.json", { type: "plain/text", endings: "native" });
    a.href = URL.createObjectURL(file);
    a.setAttribute('download',  'catalogue_' + avatar + '.json');   // déclenche ledownload sur le click
    b.appendChild(a);
    a.click();  // provoque le clic sur l'objet
    b.removeChild(a);   // supprime l'objet
    alert("la catalogue catalogue_" + avatar + ".json vient d'être mis à disposition dans votre dossier de téléchargements");
}