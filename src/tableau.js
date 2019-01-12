var tableau = [
    [
        1,
        "MAH00063",
        "http://media.w3.org/2010/05/sintel/poster.png",
        [   {
                step: 1,
                act: "information",
                niveau: "DEBUTANT",
                libelle: "Match opposant Metz (rouge) à la Croix-Blanche Angers (Blanc) en championnat u19F"
            },
            {
                step: 20,
                act: "question",
                niveau: "DEBUTANT",
                libelle: "L'arbitre vient de siffler une faute. D'après-vous laquelle ? ",
                attributs: ["une main", "un pied", "une tête"],
                reponse: 1,
                libRep:"La joueuse de l'équipe Blanche qui reçoit le ballon est en position de hors-jeu",
                loi: "loi_01",
                points: 3
            },
            {
                step: 40,
                act: "question",
                niveau: "DEBUTANT",
                libelle: "Que signifie le geste de l'arbitre assistant ?",
                attributs: ["touche en faveur des blancs", "touche en faveur des marrons"],
                reponse: 1,
                libRep:"Touche en faveur de la Croix-Blanche (blancs)",
                loi: "loi_15",
                points: 3
            },
            {
                step: 45,
                act: "allerA",
                indice: 50
            },
            {
                step: 58,
                act: "question",
                niveau: "DEBUTANT",
                libelle: "L'arbitre vient de siffler une faute. Pour quelle raison ? ",
                attributs: ["position de hors-jeu", "contact sur une joueuse marron"],
                reponse: 2,
                libRep:"L'attaquante marron a été taclée par la défenseuse blanche sans avoir le ballon",
                loi: "loi_13",
                points: 3
            },
            {
                step: 60,
                act: "fin"
            }
        ]
    ],
    [
        2,
        "extrait_match",
        "http://media.w3.org/2010/05/bunny/poster.png",
        [   {
                step: 1,
                act: "information",
                libelle: "Match opposant Les Verchers (marron) à l'Etoile Mouzillon (Blanc) en championnat R2F"
            },
            {
                step: 3,
                act: "question",
                niveau: "DEBUTANT",
                libelle: "Selon vous y-a-t-il hors-jeu ? ",
                attributs: ["Oui", "Non"],
                reponse: 1,
                libRep:"La joueuse de l'équipe Blanche qui reçoit le ballon est en position de hors-jeu.",
                loi: "Loi_11",
                points: 3
            },
            {
                step: 10,
                act: "question",
                niveau: "DEBUTANT",
                libelle: "Le but est-il valable ? ",
                attributs: ["Oui", "Non"],
                reponse: 2,
                libRep:"La joueuse de l'équipe Blanche qui transmet le ballon du but est en position de hors-jeu.",
                loi: "Loi_11",
                points: 3
            },
            {
                step: 13,
                act: "question",
                niveau: "DEBUTANT",
                libelle: "La remise en jeu s'est-elle effectuée correctement ? ",
                attributs: ["Oui", "Non"],
                reponse: 1,
                libRep:"Les pieds ne décollent pas du sol",
                loi: "Loi_15",
                points: 3
            },
            {
                step: 16,
                act: "question",
                niveau: "DEBUTANT",
                libelle: "Que décidez-vous ? ",
                attributs: ["Je ne siffle rien", "Je siffle un coup franc", "Je siffle un coup franc et donne un carton jaune"],
                reponse: 2,
                libRep: "La joueuse de l'équipe Rouge touche le pied de la joueuse de l'équipe blanche. C'est une faute caractérisée mais sans intention du coup pas de carton.",
                loi: "Loi_13",
                points: 3
            },
            {
                step: 17,
                act: "fin"
            }
        ]
    ],
    [
        3,
        "EM_Verchers",
        "http://media.w3.org/2010/05/bunny/poster.png",
        [   {
                step: 1,
                act: "information",
                libelle: "Match opposant Les Verchers (Rouge) à l'Etoile Mouzillon (Blanc) en championnat R2F"
            },
            {
                step: 3,
                act: "question",
                niveau: "DEBUTANT",
                libelle: "Selon vous y-a-t-il hors-jeu ? ",
                attributs: ["Oui", "Non"],
                reponse: 1,
                libRep:"L'arbitre lève le bras pour confirmer le hors-jeu",
                loi: "Loi_11",
                points: 3
            },
            {
                step: 10,
                act: "question",
                niveau: "DEBUTANT",
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
                niveau: "DEBUTANT",
                libelle: "La remise en jeu s'est-elle effectuée correctement ? ",
                attributs: ["Oui", "Non"],
                reponse: 1,
                libRep:"Lors de la remise en jeu suite à une touche, la joueuse doit avoir les talons au sol et le ballon doit être placé dans le dos au départ du mouvement.",
                loi: "Loi_15",
                points: 8
            },
            {
                step: 16,
                act: "question",
                niveau: "DEBUTANT",
                libelle: "Que décidez-vous ? ",
                attributs: ["Je ne siffle rien", "Je siffle un coup franc", "Je siffle un coup franc et donne un carton jaune"],
                reponse: 2,
                libRep: "La joueuse de l'équipe Rouge touche le pied de la joueuse de l'équipe blanche. C'est une faute caractérisée mais sans intention du coup pas de carton.",
                loi: "Loi_13",
                points: 4
            },
            {
                step: 17,
                act: "fin"
            }
        ]
    ],
    [
        4,
        "EM_Verchers",
        "http://media.w3.org/2010/05/bunny/poster.png",
        [   {
                step: 1,
                act: "information",
                libelle: "Match opposant Les Verchers (Rouge) à l'Etoile Mouzillon (Blanc) en championnat R2F"
            },
            {
                step: 3,
                act: "question",
                niveau: "DEBUTANT",
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
                niveau: "CONFIRME",
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
                niveau: "DEBUTANT",
                libelle: "La remise en jeu s'est-elle effectuée correctement ? ",
                attributs: ["Oui", "Non"],
                reponse: 1,
                libRep:"Lors de la remise en jeu suite à une touche, la joueuse doit avoir les talons au sol et le ballon doit être placé dans le dos au départ du mouvement.",
                loi: "Loi_15",
                points: 9
            },
            {
                step: 17,
                act: "fin"
            }
        ]
    ]
]