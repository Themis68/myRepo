# myRepo
https://www.w3.org/2010/05/video/mediaevents.html


**************************************
               A FAIRE
**************************************
- insérer les logos Ligue et District
- centrer verticalement le logo Mouzillon
- intercepter le fullscreen
- préparer un gestionnaire pour la génération du scénario
- cacher le menu si on choisi une valeur
- revoir le margin dans le menu car quand on clique sur la ligne ce n'est pas beau le cadre blanc
- nettoyer le code du plugin et renommer js

- le titre est masqué quand on n'a pas la frame du developpement ouverte (F12)
- revoir le skin pour rendre transparent la barre de progression
- saisir le temps "00:00" et non en nombre de secondes car cela oblige à convertir
- Lire les actions depuis un fichier du même nom que la vidéo
- Gérer une action qui attend une clic du joueur
- Gérer une action qui affiche une faute que le joueur n'a pas vu
- Gérer l'affichage des contrôles selon les besoins
- information : Reste le problème de cacher le message et le bouton au bout d'un certain temps
- afficher des messages lorsqu'on est en zoom écran
- formule quizz : questions et timer
- gérer automatiquement la fin de la vidéo
- page de démarrage de la vidéo : afficher en pleine image le nom des équipes et leurs fanions
- rendre reactif une plage de vidéo pour donner des points à l'utilisateur

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