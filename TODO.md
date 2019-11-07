
https://www.w3.org/2010/05/video/mediaevents.html

URL ressources externes
<script src="https://code.jquery.com/jquery-3.1.1.slim.min.js"></script>
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" type="text/css"


step: '00:09:22', : rechercher la loi du jeu pour une poussette dans le dos


**************************************
               ANOs
**************************************
- les composants BUG sont créés dans une boucle puis inscrits dans le DOM. : comment s'appuyer les uns sur les autres ?
- VIDEOJS: WARN: videojs.createEl() is deprecated; use videojs.dom.createEl() instead
- le clic sur le fanion n'exécute pas l'appel au site car le clic est considéré comme PAUSE de la vidéo
- position des module BUG sur la vidéo : les silhouettes se superposent au titre des équipes

**************************************
               EVOLs
**************************************
- bouton BIG PLAY en fond rouge
- un allerA dans une INFORMATION ?
- proposer un QUIZZ sur la base de questions du fascicule
- tester l'affichage des questions avec des images
- créer un texte qui défile au départ du match (page du match)
- avoir une animation pour la mi-temps (sifflet)
- pour un but prévoir une animation et non une image
- gérer automatiquement la fin de la vidéo
- rendre reactif une plage de vidéo pour donner des points à l'utilisateur
- paramétrer la couleur des incrustations (texte)
- cacher le bouton des points si on a une Information de type "but"
- gestion de la position de l'arbitre
- prévoir une présentation vidéo au départ (page 1)
- Gérer une action qui attend une clic du joueur
- Gérer une action qui affiche une faute que le joueur n'a pas vu
- scroll sur une video qui est zoomée
- comment afficher un objet de videojs qui existe déjà par défaut
- peut-on ajouter le register du plug seulement quand on en a besoin ?
- le centrage vertical des incrustations est trop bas alors qu'on met 50%
- le centrage horizontal des incrustations ne tient pas compte de la largeur de l'objet

**************************************
    		v1.1.1 en cours
**************************************
x erreur sur clic de deuxième vidéo après avoir visionné la première
x erreur sur clic de deuxième vidéo : même erreur en changeant de niveau de question
x préparer la silhouette de l'équipement
x les controles vidéos n'apparaissent plus quand le match se déroule (: suite à MAJ librairie videoJS)
x lors d'un allerA intégré il faut le faire mais seulement après quelques secondes de films
x ajouter un accès direct aux lois du jeu (page accueil)
x fProposition(code) : je dois récupérer le nb points de la bonne réponse
x masquer INTER quand la vidéo reprend
x x lors d'un allerA utiliser une transition : effet flou
x les points ont la couleur de fond du cartouche (informations, Bonus, Questions)
x récupération locale des sources bootstrap
x récupération locale des sources jQuery 
x le panneau QUESTION et PROPOSITIONS est caché au bout de 2 secondes
x ajouter les lois sur la PROPOSITION gagnante
x le bouton replay ne doit fonctionner qu'une fois
x tester l'affichage des réponses avec des images

**************************************
            v1.1.0
**************************************
x gestion de l'obtention des points en doublon (si on recule dans la vidéo)
x gestion des actions "Information"
x quand la question s'affiche (pas la première) on n'a pas la jauge des questions qui est juste alors que après continuer c'est bon
x le total des points s'affiche dès le départ
x le bouton replay retire 1 point au compteur
x gestion du clic réponse et de sa couleur
x en replay ajouter un logo à l'écran
x afficher le score et le nom des équipes en incrustation
x afficher des messages lorsqu'on est en zoom écran
x gérer l'indice 'allerA' au format 00:00:00
x ajouter le nom des équipes en incrustation
x positionner les fanions et le score sur la vidéo
x proposer une valeur pour le replay pour les questions (devient optionnel selon le type de question)
x prévoir une image pour la réponse différente que celle de la question
x centrer verticalement le logo Mouzillon dans la barre de contrôle
x récupération de la position xy sur la zone de la vidéo
x affecter un niveau de competition au match
x intégrer un allerA dans la question et aux bonus