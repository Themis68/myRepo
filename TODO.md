# myRepo
https://www.w3.org/2010/05/video/mediaevents.html


**************************************
               A FAIRE
**************************************

- Lire les actions depuis un fichier du même nom que la vidéo
- Gérer une action qui attend une clic du joueur
- Gérer une action qui affiche une faute que le joueur n'a pas vu
- Gérer l'affichage des contrôles selon les besoins
- proposer une liste de vidéos à le joueur (thumbnails)
- information : Reste le problème de cacher le message et le bouton au bout d'un certain temps
- afficher des messages en zoom écran
- proposer une intéraction en zoom écran
- formule quizz : questions et timer
- gérer automatiquement la fin de la vidéo
- page accueil : intégrer des photos d'arbitres

**************************************
               LINKEDIN
**************************************
Favoriser la compréhension de l'arbitrage chez les jeunes et susciter des vocations pour devenir un acteur essentiel du football. Voila l'objectif que s'est fixé l'Académie Sport/Devoirs de l'Etoile de Mouzillon avec "Arrêt sur image". Avec une interface ludique, cette solution propose au joueur d'être en intéraction avec un match au travers de questions et d'informations. A l'arrivée, le joueur aura revu les lois du jeu avec le regard de l'arbitre.
Mais "Arrêt sur image" est avant tout une solution web paramétrable. Ainsi, vous êtes libre d'installer la vidéo qui vous intéresse (match, entrainment, situation) et créer un questionnaire en fonction de vos besoins (analyse tactique, révision des règles du jeu, quizz).



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

Appel au plugin :   

 videojs('video', { options ou plugins});

ex : passer un plugin "brand"
    videojs('video', {
        plugins: {
            brand: {
                image: myURL + '/images/fanions/Bauge.png',
                title: "Logo Title",
                destination: "http://www.google.com",
                destinationTarget: "_top"
            }
        }
        }
    );

ex : passer un plug et des options
	videojs('video', {
			source: "videos/" + video[0].fichier,
			controls: true,
			preload:  'none',
			poster: video[0].poster,
			plugins: {
				brand: {
					image: myURL + '/images/ballonmini.png',
					title: "Logo Title",
					destination: "http://www.google.com",
					destinationTarget: "_top"
				}
			}
		  }, 
		);

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

OPTIONS : https://docs.videojs.com/docs/guides/options.html 

- The actual default component structure of the Video.js player looks something like this:

Player
    PosterImage
    TextTrackDisplay
    LoadingSpinner
    BigPlayButton
    ControlBar
        PlayToggle
        VolumeMenuButton
        CurrentTimeDisplay (Hidden by default)
        TimeDivider (Hidden by default)
        DurationDisplay (Hidden by default)
        ProgressControl
            SeekBar
              LoadProgressBar
              MouseTimeDisplay
              PlayProgressBar
        LiveDisplay (Hidden by default)
        RemainingTimeDisplay
        CustomControlsSpacer (No UI)
        ChaptersButton (Hidden by default)
        SubtitlesButton (Hidden by default)
        CaptionsButton (Hidden by default)
        FullscreenToggle
    ErrorDisplay
    TextTrackSettings

<video id="myVideo" class="videojs"
          data-setup='{"controls": true,
          "autoplay": false,
          "preload": "none"
          "loop": false,
          "fluid": true,
          "poster": "https://media.w3.org/2010/05/sintel/poster.png",
          "sources": [{
            src: "../videos/EM_Herbiers.mp4",
            type: "video/mp4"}]
          }'>
          <source src="videos/EMouz.mp4" type='video/mp4'>
            <p class="vjs-no-js">Votre navigateur ne supporte pas la gestion des vidéos</p>
          </video>

*************************************************


Spinners : https://github.com/videojs/video.js/issues/2507
