BUILDER
//
// created : 24/02/2020
// creator : Paulo Pires Seixas
//

//
//*******************  A FAIRE ***********************
//


- insérer un picker pour les couleurs : pipette et RGB avec affichage couleur sélectionnée : http://bebraw.github.io/colorjoe/
- sauvegarder le code de la structure
- récupérer une image d'une vidéo : https://www.developpez.net/forums/d1578183/javascript/general-javascript/extraire-image-partir-d-video-projekktor/

 if (this.video.paused || this.video.ended)

//
//*******************  FAIT ***********************
//

x récupérer le code couleur d'un pixel sur une image
x Chrome en mode local : open -n -a /Applications/Google\ Chrome.app --args --user-data-dir="/Users/parents" --disable-web-security
x upload : propose de charger uniquement les fichiers videos
x afficher une structure de données avec affectation des éditeurs spécifiques

//
//***************      BC  ***************************
//
let objet = document.getElementById("panel");
// dataset permet de récupérer les infos des attributs <data->
document.getElementById('preview'+objet.dataset.obj).setAttribute("style", "background-color:rgb("+pixel[0]+','+pixel[1]+','+pixel[2]+")");


- gestion locale de Chrome
sous Mac :
open -n -a /Applications/Google\ Chrome.app --args --user-data-dir="/Users/parents" --disable-web-security


- récupérer le contenu d'un fichier JSON
- function getCatalogueQuizz(path) {
	var request = new XMLHttpRequest();
	var requestURL = path;
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
	request.onload = function() {
		setCatalogueQuizz(request.response);	// transmet la valeur à l'extérieur du scope local
	}
}

function setCatalogueQuizz(reponse) {
// catalogue est une varuiable globale au contrôleur JS
	catalogue = reponse;
}


- gestion de l'updateFile

https://stackoverflow.com/questions/3521122/html-input-type-file-apply-a-filter
https://en.wikipedia.org/wiki/Media_type


Update: It seems at least some version of every major browser on Windows now provides at least some support for the accept attribute. (Even IE supports it, as of version 10.) However, it's still a bit early yet to rely on it, as IE 8 and 9 still don't support it. And support in general is a bit spotty.

Chrome seems to have full support. It uses its own built-in list of types as well as the system's...so if either one defines the type, Chrome knows which files to show.
IE 10 supports file extensions beautifully, and MIME types decently. It seems to use only the system's mapping of MIME type to extensions, though...which basically means if something on the user's computer didn't register those extensions with the right MIME types, IE won't show files of those MIME types.
Opera only seems to support MIME types -- to the point where extensions actually disable the filter -- and the UI for the file selector sucks. You have to select a type in order to see the files of that type.
Firefox appears to support only a limited set of types, and ignore other types as well as extensions.

accept="image/jpeg"
accept="image/*"


importer des images locales :
Solution 2, la maline
On va créer une balise <script></script> et la faire pointer sur le fichier à télécharger. Ainsi on utilise le mécanisme naturel pour le navigateur d'include du code.

"var include = function(url, callback){
 
    /* on crée une balise<script type="text/javascript"></script> */
    var script = document.createElement('script');
    script.type = 'text/javascript';
 
    /* On fait pointer la balise sur le script qu'on veut charger
       avec en prime un timestamp pour éviter les problèmes de cache
    */
 
    script.src = url + '?' + (new Date().getTime());
 
    /* On dit d'exécuter cette fonction une fois que le script est chargé */
    if (callback) {
        script.onreadystatechange = callback;
        script.onload = script.onreadystatechange;
    }
 
    /* On rajoute la balise script dans le head, ce qui démarre le téléchargement */
    document.getElementsByTagName('head')[0].appendChild(script);
}"

Ca s'utilise comme ça:

"include('http://adressedemonscript.com/fichier.js', function() {
    code à exécuter une fois que le script est chargé
})"


La partie callback est très importante. En effet, si vous essayez d'exécuter du code après include() qui dépend du code chargé par include(), ça va foirer : le code n'est pas encore téléchargé. En effet, les navigateurs téléchargent les balises scripts en arrière plan et en parallèle :

"include('http://adressedemonscript.com/fichier.js');
code à exécyter une fois que le script est chargé"

Il faut donc mettre ce code dans un callback, pour garantir qu'il soit lancé quand le script a terminé de chargé.





Créer des sphères :
https://la-cascade.io/creer-des-spheres-en-css/

Des formes simples
https://www.lucaswillems.com/fr/articles/14/des-formes-geometriques-en-css?cache=update

*********************************

créer des images à la volée : https://codepen.io/tpai/pen/QVxPOJ
