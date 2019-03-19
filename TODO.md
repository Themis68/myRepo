# myRepo
https://www.w3.org/2010/05/video/mediaevents.html


**************************************
               A FAIRE
**************************************
- comment afficher un objet de videojs qui existe déjà par défaut
- peut-on ajouter le register du plug seulement quand on en a besoin ?
- gérer un peu mieux l'attribut "visibility" des éléments à incruster
- le centrage vertical des incrustations est trop bas alors qu'on met 50%
- le centrage horizontal des incrustations ne tient pas compte de la largeur de l'objet
- afficher la ves versions techniques des modules
x ajouter le nom des équipes en incrustation
x positionner les fanions et le score sur la vidéo
- scroll sur une video qui est zoomée
x centrer verticalement le logo Mouzillon dans la barre de contrôle
- préparer un gestionnaire pour la génération du scénario
- cacher le menu si on choisi une valeur
- proposer une valeur pour le replay
- le titre "arret sur image" est masqué quand on n'a pas la frame du developpement ouverte (F12)
- revoir le skin pour rendre transparent la barre de progression
- Lire les actions depuis un fichier du même nom que la vidéo
- Gérer une action qui attend une clic du joueur
- Gérer une action qui affiche une faute que le joueur n'a pas vu
- Gérer l'affichage des contrôles selon les besoins
- information : Reste le problème de cacher le message et le bouton au bout d'un certain temps
- afficher des messages lorsqu'on est en zoom écran
- formule quizz : questions et timer
- gérer automatiquement la fin de la vidéo
- rendre reactif une plage de vidéo pour donner des points à l'utilisateur

**************************************
calcul hauteur
**************************************
var el = document.getElementById('tonID');
 
// inclu les padding, border & scrollbar.
console.log(el.offsetHeight);
 
// inclu les padding.
console.log(el.clientHeight);

var style = el.getAttribute('style'); // On récupère l'attribut « style »
el.setAttribute('style', '--hauteur:'+el.clientHeight+'px;'); // On édite l'attribut « style »

**************************************
Element <progress>
**************************************
https://www.alsacreations.com/article/lire/1416-html5-meter-progress.html

- HTML
<p>Avancement de la tâche à effectuer :
       <progress id="avancement" value="50" max="100"></progress>
       <span id="pourcentage"></span>
       <input type="button" onclick="modif(-10);" value="-">
       <input type="button" onclick="modif(10);" value="+">
</p>

- JAVASCRIPT
function avancement() {
  var ava = document.getElementById("avancement");
  var prc = document.getElementById("pourcentage");
  prc.innerHTML = ava.value + "%";
}

avancement(); //Initialisation

function modif(val) {
  var ava = document.getElementById("avancement");
  if((ava.value+val)<=ava.max && (ava.value+val)>0) {
     ava.value += val;
  }
  avancement();
}

- CSS
progress {}
	/* ici les styles généraux */

progress::-webkit-progress-bar { 
	/* ici les styles généraux pour Webkit */
}
progress::-webkit-progress-value {  
	/* styles de barre d'avancement pour Webkit */
}  
progress::-moz-progress-bar { 
	/* styles de barre d'avancement pour Firefox */
}

**************************************
              HAUTEUR DIV
**************************************
Tu peux recupere la hauteur d'un div par :

var hauteur=document.getElementById("maDiv").offsetHeight;

Et tu peux la placer par :

document.getElementById("maDiv").style.height=hauteur+"px";

**********************************************************
              CALCUL CSS avec compatibilité navigateur
**********************************************************
https://www.zonecss.fr/proprietes-css/calc-css-fonction.html

.elem{
    height: -moz-calc(100% - 50px);
    height: -webkit-calc(100% - 50px);
    height: -o-calc(100% - 50px);
    height: -ms-calc(100% - 50px);
    height: calc(100% - 50px);
}


**************************************
              ZOOM
**************************************
une liste déroulante autorise un zoom sur la vidéo en mode pause ou lecture
par défaut le zoom est à 1
La vidéo se centre lors du zoom


**************************************
               LINKEDIN
**************************************
Favoriser la compréhension de l'arbitrage chez les jeunes et susciter des vocations pour devenir un acteur essentiel du football. Voila l'objectif que s'est fixée l'Académie Sport/Devoirs de l'Etoile de Mouzillon avec "Arrêt sur image". Avec une interface ludique, cette solution propose au joueur d'être en intéraction avec un match au travers de questions et d'informations. A l'arrivée, le joueur aura revu les lois du jeu avec le regard de l'arbitre.
Mais "Arrêt sur image" est avant tout une solution web paramétrable. Ainsi, vous êtes libre d'installer la vidéo qui vous intéresse (match, entrainement, situation) et créer un questionnaire en fonction de vos besoins (analyse tactique, révision des règles du jeu, quizz).



gestion des styles :
- le moteur applique les styles de classes puis les styles de l'objet

Gestion de la visibilité :
HTML : <div id="badge" class="coinHD" style="visibility:hidden;">
JS : 
    document.getElementById("badge").style.visibility = "visible";
ou
	myBadge = document.getElementById('badge');
	myBadge.visibility = "hidden";

visibility garde l'espace de l'objet sur la page. Equivaud à un opacity=0%
alors que "display: none;" enlève la réservation d'espace

Gestion de la valeur d'un Label :
document.getElementById("LR1").innerHTML = "une main";

Gestion des vidéos
- Il faut d'abord "rembobiner" la vidéo pour obtenir sa longueur


Gestion des actions
- la vidéo s'encadre en vert dès qu'il y a une action en cours
- on possède un catalogue d'actions



**************************************
               LES SONS
**************************************
MP3 : 
<object type="audio/mpeg" data="sons/foule.mp3" width="200" height="20">
<param name="src" value="sons/foule.mp3">
<param name="autoplay" value="false">
<param name="autoStart" value="0">
alt : <a href="sons/foule.mp3">foule.mp3</a>
</object>

WAV : 
<object type="audio/x-wav" data="sons/applaudissements.wav" width="200" height="20">
<param name="src" value="sons/applaudissements.wav">
<param name="autoplay" value="false">
<param name="autoStart" value="0">
alt : <a href="sons/applaudissements.wav">applaudissements.wav</a>
</object>

pour jouer un son sur un click sur un bouton il est possible de réaliser ton lien de la manière suivante  :
Code: [Sélectionner]
<input type="button" value="Lire" onclick="play('http://tonURL/tonfichier.mp3')">
<input type="button" value="Arrêt" onclick="stop()">
ou bien sur un lien simple :
Code: [Sélectionner]
<a href="tonfichier.mp3">Musique</a>
ou encore pour quicktime :
Code: [Sélectionner]
<embed src="tonfichier.mp3" autostart=false loop=false>
au survol d'un texte :
Code: [Sélectionner]
<a href="#" onMouseOver="PlaySound('tonfichier.mp3')">lecture du son au survol</A>
Voilà bon travail maintenant....

**************************************
             VIDEOJS
**************************************

Générer un plug-in : https://docs.videojs.com/docs/guides/plugins.html

Déclaration dans <HEAD> :
    // videojs
  <script type="text/javascript" src="./video.js/dist/video.min.js"/></script>
  <link href="./video.js/dist/video-js.css" rel="stylesheet" type="text/css">

  // plugin video-brand
  <script type="text/javascript" src="./videojs-brand/dist/videojs-brand.min.js"/>
    videojs.registerPlugin('brand', videojs-brand);
  </script>
  <link href="./videojs-brand/dist/videojs-brand.css" rel="stylesheet" type="text/css">

**********************************************************
- paramètres du player :

myVideo = videojs('myVideo', {
				controls: true,                 // afficher les contrôles
				preload:  'none',               // ne pas précharger la vidéo
				loop: false,                    // pas de boucle sur la lecture
				fluid: true,                    // ?
				poster: video[0].poster,        // poster à afficher
				controlBar: {                   // éléments de la barre
					volumeMenuButton: {           // gestion du son
					inline: false,
					vertical: true                // on affiche le menu verticalement
					}
				},
				sources: [{                     // flux de la vidéo
					src: "./videos/" + video[0].fichier,
					type: "video/mp4"
				}],
				plugins: {                      // liste des plugs-in à activer
					brand: {                      // affiche un bouton qui renvoi vers un site
						image: myURL + '/images/EMouzmini.png',
						title: "club Etoile Mouzillonnaise de football",
						destination: "https://etoile-mouzillon.footeo.com/",
						destinationTarget: "_blank",
						width: 20,
						height: 20
					},
					declencheur: {                // plug-in permettant d'afficher un bouton spécifique qui appelle une fonction JS
						image: myURL + '/images/EMouzmini.png',
						fonction: "zoom(-1);"
					},
					zoomrotate: {                 // gestion des rotations et des zoom de l'image
						zoom: nivZoom,
						rotate: 0
					}		
				}
					
			});


**********************************************************

Si on veut passer ces options pour toutes les vidéos, on les passe dasn HTML

Méthode 1 : 
<video id="video" class="" 
    data-setup='{"controls": true,
    "autoplay": false,
    "preload": "none"}'>
    <p class="vjs-no-js">Votre navigateur ne supporte pas la gestion des vidéos</p>
</video>

Méthode 2 : 
<video id="video" class="videoNonEncadre" controls="" preload="none" poster="https://media.w3.org/2010/05/sintel/poster.png">
    <source id="mp4" src="videos/MAH00063.MP4" type="video/mp4">
    <p>Votre navigateur ne supporte pas la gestion des vidéos</p>
</video>

Méthode 3 : embarquer le minimum et définir les éléments dynamiquement
<video id="myVideo" class="video-js vjs-looping vjs-big-play-centered"> 

OPTIONS : https://docs.videojs.com/docs/guides/options.html 
https://videojs.readthedocs.io/en/latest/guides/setup/



*************************************************
Gestion du référencement de la vidéos dans la mémoire de videojs

isDefineBVideoJS = false;
.....
	if (isDefineBVideoJS) {
    // les uatres tours
			myVideo.src({src: "./videos/" + video[0].fichier , type: "video/mp4"});
			myVideo.poster(video[0].poster);
		} else {
      // premier tour
			myVideo = videojs('myVideo', {
				controls: true,
				preload:  'none',
				loop: false,
				fluid: true,
				poster: video[0].poster,
				sources: [{
					src: "./videos/" + video[0].fichier,
					type: "video/mp4"}],
                plugins: {
					brand: {
						image: myURL + '/images/EMouzmini.png',
						title: "club Etoile Mouzillonnaise de football",
						destination: "https://etoile-mouzillon.footeo.com/",
						destinationTarget: "_blank",
						width: 20,
						height: 20
					},
					ass: {
                        'src': ["subs/OuterScienceSubs.ass"],
                        ' delay': -0.1,
          }
					}
				}
			});
		}
		isDefineBVideoJS = true;

*************************************************
video-js.css

.vjs-icon-play-circle {
  font-family: VideoJS;
  font-weight: normal;
  font-style: normal; }
  .vjs-icon-play-circle:before {
    content: "\f102"; }

-> content correspond au code de l'icone 

*************************************************

Spinners : https://github.com/videojs/video.js/issues/2507


***************************************************************************************************************************************************
                                                                                NOTES TECHNIQUES
***************************************************************************************************************************************************


*************************************************
                   VIDEO
La vidéo lance un spinner qui gêne la lecture. Pour le désactiver il faut :
- CCS
.vjs-looping .vjs-loading-spinner {
  display: none;
}

- index.html
<video id="myVideo" class="video-js vjs-looping">

Center le lanceur de la vidéo
<video id="myVideo" class="video-js vjs-big-play-centered">

*************************************************
                  THUMBNAIL
Développé maison 


***************************************************************************
CONTROL DE LA VIDEO
***************************************************************************
La vidéo possède ses propres contrôles :
- vjs-tech
- vjs-poster
- vjs-track
- vjs-spinner
- vjs-big-play-button
- vjs-control-bar
- vjs-error
- vjs-captions-settings


vjs-control-bar : La barre contient tous les éléments de contrôle par défaut mais ne les affiche que si on a clairement demandé dans l'appel ou les CSS
- vjs-play
- vjs-play-progress : timer en fonction de la position de la souris
- vjs-volume
- vjs-current-time
- vjs-time
- vjs-duration
- vjs-progress
- vjs-live
- vjs-ramining-time
- vjs-spacer
- vjs-playback-rate
- vjs-chapters
- vjs-description
- vjs-subtitles
- vjs-captions
- vjs-audio
- vjs-fullscreen

Les plugins sont ajoutés à vjs-control-bar
- vjs-brand
- vjs-resolution-button-label : bouton qui s'affiche sur le control-bar


************************************
           ZOOM
************************************
On doit passer la vidéo avec les attributs suivants :

	myVideo = videojs('myVideo', {
				controls: true,
				...
				sources: [{
					src: "./videos/" + video[0].fichier,
					res: 460,
					type: "video/mp4",
					label: "low"
				}],

videoJsResolutionSwitcher: {
						default: 'high',
						dynamicLabel: false	// false affiche l'icone du bouton et pas true
}

************************************
           Objets BUG
************************************
https://www.npmjs.com/package/videojs-bug 

Adds a logo bug to your videojs player with adjustable position, size, link, and opacity.

Example de code :
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-bug.min.js"></script>
<script>
  var player = videojs('my-video');
 
  player.bug({
    height: 50,
    imgSrc: 'http://cdn.teamcococdn.com/image/frame:1/teamcoco_twitter_128x128.png',
    link: "http://www.teamcoco.com",
    opacity: 0.5,
    padding: '8px',
    position: 'br',
    width: 50
  });
</script>

si on a un item dans script alors il est le seul dans la variable options().
si on en a plusieurs via un tableau il ajoute un objet nommé Bugcomponent

********************************
INFORMATIONS TECHNIQUES
********************************
Ne pas envoyer de données statistiques à google :
<script>window.HELP_IMPROVE_VIDEOJS = false;</script>

Liaison avec le site de video.js :
<link href="http://vjs.zencdn.net/7.0/video-js.min.css" rel="stylesheet">
<script src="http://vjs.zencdn.net/7.0/video.min.js"></script>

ou en local :


*************************************
              PLUGIN BUG
*************************************
{
						type: "pict",
						id:"vjs-bug-pictEquipeA",
						visibility: true,
						height: 30,
						width: 30,
						imgSrc: "./images/fanions/EMouz.png",
						alt: "Etoile Mouzillonnaise",
						link: "http://www.apple.fr",
						opacity: 0.7,
						padding: '10px 10px',	// top et bottom + right et left
						position: 'tl'
					}, 
					{
						type: "text",
						id:"vjs-bug-scoreBug",
						visibility: true,
						height: 30,
						width: 80,
						libelle: "00:" + nbQuests[0].points,
						classeCSS: "vjs-bug-text",
						opacity: 1,
						padding: '10px 50px',	// top et bottom + right et left
						position: 'tl'
					},
					
- max-content permet de ne pas renseigner la largeur de la zone

*************************************
switcher un icone de controle
*************************************

In the default LESS file there are two states for the play button:

.vjs-default-skin .vjs-play-control:before {
  content: @play-icon;
}
.vjs-default-skin.vjs-playing .vjs-play-control:before {
  content: @pause-icon;
}
You just need to add a third state when the video has ended. There is already a CSS class for that. You'll end up with something that looks like:

.vjs-default-skin.vjs-ended .vjs-play-control:before {
   content: "YOUR REPLY ICON";
 }