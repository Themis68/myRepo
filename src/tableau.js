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
                loi: "loi_01"
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
                loi: "loi_11"
            }
        ]
    ],
    [
        2,
        "MAH00064",
        "http://media.w3.org/2010/05/bunny/poster.png",
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
                loi: "loi_02"
            }
        ]
    ],
    [
        3,
        "MAH00065",
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
                loi: "loi_03"
            }
        ]
    ]
];

var video = tableau[0]; // initialisation
var actions = video[3]; // initialisation