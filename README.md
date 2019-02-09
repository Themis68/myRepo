********************************
IHM
********************************

L'arrivée sur la page débute par la saisie du prénom de l'utilisateur :
Il est possible de saisir 3 à 20 caractères qui seront affichés pendant la partie en majuscule.
Cette saisie est obligatoire.

Plusieurs zones sont alors proposées : 
- liste des vidéos des matchs proposés
- zone d'information sur la vidéo qui comprend : les équipes, le sens du jeu, la vidéo ainsi qu'une jauge de progression dans les questions
- zone d'intéraction avec le joueur qui comprend les zones : niveau, score, message, les boutons d'action ainsi qu'une zone CONSEILLER
- zone d'information générale

********************************
Zone Liste des vidéos
********************************
Affiche le nom du joueur
Liste les vidéos disponibles en se basant sur le contenu du fichier scenario.js

********************************
Zone Vidéo
********************************
Continet les sous-zones :
- description
- vidéo
- jauge des question

** description **
Nom des équipes, leur fanion, les couleurs principales

** vidéo  **
Zone principale qui affiche le match.
Possède ses propres boutons de contrôles : lecture, pause, son, zoom, jauge de progression

La jauge de progression affiche :
- le timing en cours
- le timing correspondant à la position de la souris sur la jauge

Attention : le zoom masque toutes les autres zones rendant impossible l'intéraction avec le joueur

**  jauge des question  **
Cette jauge affichera le nombre de questions prévues par le match et son niveau
Au fur et à mesure de l'avancée dans le jeu, une jauge blanche affichera le nombre de questions traitées

********************************
Zone Intéraction
********************************
Contient les sous-zones :
- niveau
- score
- message
- boutons actions

** Niveau **
Il existe deux niveaux : DEBUTANT / CONFIRME
Cliquer sur un niveau active le scénario lié et reprend les compteurs à zéro (jauge des questions, avancée vidéo, score)
Le bouton du niveau sélectionné apparait en fond vert

** Score **
Affiche le score du joueur et celui prévu au maximum par le scénario activé
Le score du joueur change de couleur lorsqu'il dépasse 50% des points totals

** Message **
La zone des messages permet d'interagir avec le joueur
Elle propose trois types d'informations :
- question
- bonus
- information

* question *
Le titre du chapeau est "QUESTION n°x"
Le cadre et le chapeau sont orangés
Affichera :
- une question
- une série de propositions pouvant êtres en relation avec une image
Donnera des points prévus

* bonus *
Le titre du chapeau est "BONUS"
Le cadre et le chapeau sont verts
Affichera :
- une question
- une série de propositions pouvant êtres en relation avec une image
Donnera des points supplémentaires

* information *
Le titre du chapeau est "INFORMATION"
Le cadre et le chapeau sont orangés
Affichera :
- une information pouvant êtres en relation avec une image
Donnera des points supplémentaires dans certains cas (fair-play)

** Boutons actions **
Les boutons actions sont liés au type de message :
- une question proposera : 
    un bouton REPONDRE pour essayer d'obtenir des points 
    un bouton REPLAY pour revoir l'action au ralentit (coutera 1 point)
    un bouton CONTINUER une fois la réponse affichée
- un bonus est géré de la même façon qu'une question
- une information proposera éventuellement un bouton donnant des points supplémentaires (fair-play)

** Conseiller **
Cette zone s'affiche lorsque le joueur a validé sa réponse à une question ou un bonus.
Elle lui précise s'il a bien répondu ou pas et informe sur les points gagnés le cas échéant.

Elle s'affiche également en fin de partie pour résumer cette dernière.

Dans tous les cas les messages sont liés au résultat.

********************************
INFORMATION
********************************
Cette zone affiche :
- les crédits photos
- la version proposée

********************************
SCENARIO
********************************

Il s'agit de paramétrer le scénario qui va traiter la vidéo.
Chaque scénario porte sur une vidéo et propose 2 niveaux.

La structure du fichier scenario.js est la suivante :

var scenario = [
    [
        { 
            données de la vidéo (structure tableau nommée)
        },
        [
            {
                opérations à effectuer (structure nommée spécifique)
            }

        ]
    ],
    [
        vidéo n°2
    ]
]

** Opérations **
Le scénario accepte plusieurs opérations :
- question : intéraction avec le joueur permettant de répondre à des questions avec des points à gagner. La vidéo s'arrête pour permettre de répondre.
    - sans image
    {
        step: 5,
        act: "question",
        niveau: "DEBUTANT",
        libelle: "Selon vous y-a-t-il hors-jeu des blanches ? ",
        attributs: ["Oui", "Non"],
        reponse: 1,
        libRep:"La joueuse de l'équipe Blanche qui reçoit le ballon est en position de hors-jeu",
        loi: "Loi_11",
        points: 2
    },

    - avec image
    {
        step: 40,
        act: "bonus",
        niveau: "CONFIRME",
        libelle: "Quel est le bon geste pour que l'arbitre assistant indique un coup de pied de coin ?",
        pict:"gestes_assistant.png",
        attributs: ["A", "B", "C"],
        reponse: 2,
        libRep:"",
        loi: "Loi_17",
        points: 3
    },

- bonus : même type que 'question' mais les points sont donnés en plus des points prévus par les questions
    {
        step: 15,
        act: "bonus",
        niveau: "DEBUTANT",
        libelle: "Quel est le carton que sort l'arbitre lorsqu'il autorise le soigneur à entrer ? ",
        pict: "cartons.png",
        attributs: ["A", "C", "F", "D"],
        reponse: 4,
        libRep:"L'arbitre peut également lever le bras en direction du banc de touche",
        points: 2
    },
- information : affichage d'une information. Dans le cas d'un Fair-Play il y a la possibilité d'interagir avec le joueur via un bouton qui rapporte des points
    - avec image
    {
        step: 58,
        act: "information",
        niveau: "DEBUTANT",
        libelle: "La joueuse en rouge fait preuve de fair-play en allant aider à se relever la joueuse blanche",
        pict: "FIFA_Fair_Play.jpg",
        type: 'fairplay'
    },

    - sans image
    {
    step: 228,
    act: "information",
    niveau: "DEBUTANT",
    libelle: "L'arbitre note alors le changement et peut vérifer les équipements éventuellement"
    },
- allerA : permet de faire des sauts dans la vidéo. Il est possible de programmer un saut vers l'arrière
    {
        step: 3,
        act: "allerA",
        niveau: "CONFIRME",
        indice: 2506
    },
- fin : permet de préciser que l'on arrive à la fin de la vidéo
    {
        step: 2508,
        act: "fin"
    }
- mitemps : inverse les équipes sur la page
    {
        step: 10,
        act: "mitemps"
    },

********************************
INFORMATIONS TECHNIQUES
********************************
Ne pas envoyer de données statistiques à google :
<script>window.HELP_IMPROVE_VIDEOJS = false;</script>

Liaison avec le site de video.js :
<link href="http://vjs.zencdn.net/7.0/video-js.min.css" rel="stylesheet">
<script src="http://vjs.zencdn.net/7.0/video.min.js"></script>

ou en local :
