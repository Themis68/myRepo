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
