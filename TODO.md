# myRepo
https://www.w3.org/2010/05/video/mediaevents.html


**************************************
               A FAIRE
**************************************

- Lire les actions depuis un fichier du même nom que la vidéo
- Gérer une action qui attend une clic de le joueur
- Gérer une action qui affiche une faute que le joueur n'a pas vu
- Gérer l'affichage des contrôles selon les besoins
- proposer une liste de vidéos à le joueur (thumnails)
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
