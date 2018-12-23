var tableau = [
    [
        1,
        "MAH00063",
        "http://media.w3.org/2010/05/sintel/poster.png",
        [{
                step: 10,
                act: "information",
                libelle: "Soyez attentifs à cette phase de jeu"
            },
            {
                step: 20,
                act: "question",
                libelle: "L'arbitre vient de siffler une faute. D'après-vous laquelle ? ",
                attributs: ["une main", "un pied", "une tête"],
                reponse: 1,
                libRep:"La joueuse de l'équipe Blanche qui reçoit le ballon est en position de hors-jeu.",
                loi: "loi_01",
                points: 5
            },
            {
                step: 25,
                act: "information",
                libelle: "Surveillez la joueuse n°10"
            },
            {
                step: 30,
                act: "question",
                libelle: "L'arbitre vient de siffler une faute de la joueuse n°10. Qu'a-t-elle fait ? ",
                attributs: ["position de hors-jeu", "a poussé une joueuse sans ballon"],
                reponse: 1,
                libRep:"La joueuse de l'équipe Blanche qui reçoit le ballon est en position de hors-jeu.",
                loi: "loi_11",
                points: 5
            }
        ],
        "DEBUTANT",
        10,
        2
    ],
    [
        2,
        "extrait_match",
        "http://media.w3.org/2010/05/bunny/poster.png",
        [   {
                step: 1,
                act: "information",
                libelle: "Soyez attentifs pendant toute la vidéo."
            },
            {
                step: 3,
                act: "question",
                libelle: "Selon vous y-a-t-il hors-jeu ? ",
                attributs: ["Oui", "Non"],
                reponse: 1,
                libRep:"La joueuse de l'équipe Blanche qui reçoit le ballon est en position de hors-jeu.",
                loi: "Loi_11",
                points: 6
            },
            {
                step: 10,
                act: "question",
                libelle: "Le but n'est pas validé. Pour quelle raison ? ",
                attributs: ["Charge sur défenseur", "Position de hors-jeu", "Main"],
                reponse: 2,
                libRep:"La joueuse de l'équipe Blanche qui transmet le ballon du but est en position de hors-jeu.",
                loi: "Loi_11",
                points: 5
            },
            {
                step: 13,
                act: "question",
                libelle: "La remise en jeu s'est-elle effectuée correctement ? ",
                attributs: ["Oui", "Non"],
                reponse: 1,
                libRep:"Lors de la remise en jeu suite à une touche, la joueuse doit avoir les talons au sol et le ballon doit être placé dans le dos au départ du mouvement.",
                loi: "Loi_15",
                points: 8
            },
            {
                step: 18,
                act: "question",
                libelle: "Que décidez-vous ? ",
                attributs: ["Je ne siffle rien", "Je siffle un coup franc", "Je siffle un coup franc et donne un carton jaune"],
                reponse: 2,
                libRep: "La joueuse de l'équipe Rouge touche le pied de la joueuse de l'équipe blanche. C'est une faute caractérisée mais sans intention du coup pas de carton.",
                loi: "Loi_13",
                points: 4
            }
        ],
        "CONFIRME",
        23,
        4
    ]
];

var video = tableau[0]; // initialisation
var actions = video[3]; // initialisation