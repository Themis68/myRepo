********************************
IHM
********************************

L'arrivée sur la page débute par la saisie du prénom de l'utilisateur :
Il est possible de saisir 3 à 20 caractères qui seront affichés pendant la partie en majuscule.
Cette saisie est obligatoire.

**************************************
        PAGE ACCUEIL
**************************************
- Affiche le nom du joueur
- une série de photos d'arbitres (promotion, pub)
- liste des vidéos des matchs proposés

Plusieurs zones sont alors proposées : 
- liste des vidéos des matchs proposés reste affichée
- zone d'information sur la vidéo qui comprend : les équipes, le sens du jeu, la vidéo ainsi qu'une jauge de progression dans les questions
- zone d'intéraction avec le joueur qui comprend les zones : niveau, score, message, les boutons d'action ainsi qu'une zone CONSEILLER
- zone d'information générale

********************************
Zone Liste des vidéos
********************************
Affiche le nom du joueur
Liste les vidéos disponibles en se basant sur le contenu du fichier scenario.js 
en créant une vignette composée de : fanions des équipes et le poster en miniature

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
Possède ses propres boutons de contrôles : lecture, pause, son, zoom, jauge de progression, FULLSCREEN

Un bouton PLAY s'affiche initialement au centre de la vidéo pour lancer le match
Ensuite on peut utiliser le bouton PLAY/PAUSE sur la barre de contrôle

Le son s'affiche verticalement

La jauge de progression affiche :
- le timing en cours
- le timing correspondant à la position de la souris sur la jauge

Le zoom propose une liste déroulante pour définir le niveau de zoom
ATTENTION : il n'y a pas de scroll possible sur l'image actuellement

La fonction de FULLSCREEN permet de passer en mode plein écran
Cette fonction affiche en surimpression des :
- images
- textes
Ces zones peuvent êtres positionnées comme suit :

tl  tc  tr
cl  cc  cr
bl  bc  br

- tl : top left / avec un padding possible haut et gauche
- cl : centrage vertical left avec un padding possible gauche
- bl : bottom left / avec un padding possible gauche et bas
- tc : centrage horizontal top avec un padding possible haut
- cc : centrage total sans padding
- bc : centrage horizontal bottom avec un padding possible bas
- tr : top right / avec un padding possible haut et droite
- cr : centrage vertical right avec un padding possible droit
- br : bottom right / avec un padding possible droit et bas

Attention : Aucune intéraction avec le joueur n'est dés lors possible

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

        ]- 
    ],
    [
        vidéo n°2
    ]
]

** Match ***
- Chaque match possède des caractéristiques
    - id : permet d'idntifier la vidéo : il doit êre unique et de préférence doit suivre le précédent
    - rencontre : nom de la rencontre
    - poster : image a afficher dans la vignette du match (si absent on prend l'image d'une pelouse)
    - fichier : chemin d'accès au fichier vidéo
    - description : dexription de la rencontre qui sera affiché dans le cartouche d'informations
    - gauche : infos sur l'équipe jouant côté gauche
        - nom : nom de l'équipe
        - le fanion : optionnel (si absent on prend le fanion de la FFF)
    - droite : idem que pour "gauche"

id: 2,
rencontre: "EM/Baugé",
poster: "./videos/EMouz_Bauge.png",
fichier: "EM_Bauge.mp4",
description: "Match opposant Baugé à l'Etoile Mouzillon en championnat u18F Région",
gauche: {
    nom: "Baugé (Orange)"
},
droite: {
    nom: "Etoile Mouzillon (Blanc)",
    fanion: "EMouz.png"
}

** Opérations **
- Le scénario accepte plusieurs opérations :
- question : intéraction avec le joueur permettant de répondre à des questions avec des points à gagner. La vidéo s'arrête pour permettre de répondre.

    {
        step: '00:00:05',
        act: "question",
        niveau: "DEBUTANT",
        libelle: "Selon vous y-a-t-il hors-jeu des blanches ? ",
        pict: "cartons.png",
        attributs: ["Oui", "Non"],
        reponse: 1,
        libRep:"La joueuse de l'équipe Blanche qui reçoit le ballon est en position de hors-jeu",
        loi: "Loi_11",
        allerA: '00:00:50',
        reculReplay: 2,
        points: 2
    },

    - Lignes optionnelles : pict, libRep, loi, allerA, reculReplay

- bonus : même type que 'question' mais les points sont donnés en plus des points prévus par les questions
    {
        step: "00:00:10",
        act: "bonus",
        niveau: "DEBUTANT",
        libelle: "Quel est le carton que sort l'arbitre lorsqu'il autorise le soigneur à entrer ? ",
        pict: "cartons.png",
        attributs: ["A", "C", "F", "D"],
        reponse: 4,
        libRep:"L'arbitre peut également lever le bras en direction du banc de touche",
        loi: "Loi_11",
        allerA: '00:00:50',
        points: 2
    },

    - Lignes optionnelles : pict, libRep, loi, allerA

- information : affichage d'une information. Dans le cas d'un Fair-Play il y a la possibilité d'interagir avec le joueur via un bouton qui rapporte des points
    - avec image
    {
        step: "00:00:10",
        act: "information",
        niveau: "DEBUTANT",
        libelle: "La joueuse en rouge fait preuve de fair-play en allant aider à se relever la joueuse blanche",
        pict: "FIFA_Fair_Play.jpg",
        type: 'fairplay'
    },

    - sans image
    {
        step: "00:00:10",
        act: "information",
        niveau: "DEBUTANT",
        libelle: "L'arbitre note alors le changement et peut vérifer les équipements éventuellement"
    },

- allerA : permet de faire un saut en fonction du niveau des questions
    {
        step: '00:00:03',
        act: "allerA",
        niveau: "DEBUTANT",
        indice: '00:00:16'
    },

- fin : permet de préciser que l'on arrive à la fin de la vidéo
    {
        step: "00:00:10",
        act: "fin"
    }
- mitemps : inverse les équipes sur la page
    {
        step: "00:00:10",
        act: "mitemps"
    },

