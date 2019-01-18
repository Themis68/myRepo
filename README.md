# myRepo
https://www.w3.org/2010/05/video/mediaevents.html


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
               A FAIRE
**************************************

- Lire les actions depuis un fichir du même nom que la vidéo
- Compter les points
- Gérer une action qui attend une clic de l'utilisateur
- Gérer une action qui affiche une faute que l'utilisateur n'a pas vu
- Gérer l'affichage des contrôles selon les besoins
- proposer une liste de vidéos à l'utilisateur

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

INFORMATION :
c'est nivellé car accompagne souvent une question


********************************
NIVEAU
********************************

Le bouton du niveau sélectionné apparait en fond vert


********************************
SCORE
********************************

le score du User change de couleur lorsqu'il dépasse 50% des points totals


********************************
MESSAGES
********************************

La zone des messages est différentes :
- question : cadre et chapeau chocolate
- information : cadre et chapeau chocolate
- bonus : cadre et chapeau vert

********************************
INFORMATION
********************************

Si c'est un FairPlay on peut gagner 1 point en cliquant sur le bouton


