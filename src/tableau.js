var tableau = [
    [
        {
            id: 1,
            titre: "Metz/CBAF",
            poster: "http://media.w3.org/2010/05/sintel/poster.png",
            fichier: "MAH00063.mp4",
            description: "Match opposant Metz (grenat) à la Croix-Blanche Angers (Blanc) en championnat u19F",
            gauche: "FC Metz (Grenat)",
            droite: "CBAF (Blanc)"
        },
        [   
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
        {
            id: 2,
            titre: "EM/Herbiers1",
            poster: "http://media.w3.org/2010/05/bunny/poster.png",
            fichier: "EM_Herbiers.mp4",
            description: "Match opposant Les Herbiers (rouge) à l'Etoile Mouzillon (Blanc) en championnat R2F",
            gauche: "Les Herbiers (Rouge)",
            droite: "Etoile Mouzillon (Blanc)"
        },
        [   
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
        {
            id: 3,
            titre: "EM/Herbiers2",
            poster: "http://media.w3.org/2010/05/bunny/poster.png",
            fichier: "EM_Herbiers.mp4",
            description: "Match opposant Les Herbiers (Rouge) à l'Etoile Mouzillon (Blanc) en championnat R2F"
        },
        [
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
        {
            id: 4,
            titre: "EM/Herbiers3",
            poster: "http://media.w3.org/2010/05/bunny/poster.png",
            fichier: "EM_Herbiers.mp4",
            description: "Match opposant Les Herbiers (Rouge) à l'Etoile Mouzillon (Blanc) en championnat R2F",
            gauche: "Les Herbiers (Rouge)",
            droite: "Etoile Mouzillon (Blanc)"
        },
        [   
            {
                step: 5,
                act: "question",
                niveau: "DEBUTANT",
                libelle: "Selon vous y-a-t-il hors-jeu ? ",
                attributs: ["Oui", "Non"],
                reponse: 1,
                libRep:"La joueuse de l'équipe Blanche qui reçoit le ballon est en position de hors-jeu",
                loi: "Loi_11",
                points: 3
            },
            {
                step: 10,
                act: "information",
                libelle: "L'arbitre lève le bras pour indiquer qu'il y a hors-jeu"
            },
            {
                step: 21,
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
                step: 37,
                act: "information",
                libelle: "Le jeu reprend à la position signalée du hors-jeu"
            },
            {
                step: 44,
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
                step: 54,
                act: "question",
                niveau: "CONFIRME",
                libelle: "L'arbitre va-t-il siffler un coup-franc ? ",
                attributs: ["Oui", "Non"],
                reponse: 2,
                libRep:"Il indique de poursuire le jeu car il n'y a pas de faute caractérisée",
                loi: "Loi_15",
                points: 9
            },
            {
                step: 58,
                act: "information",
                libelle: "La joueuse en rouge fait preuve de fair-play en allant aider à se relever la joueuse blanche"
            },
            {
                step: 74,
                act: "question",
                niveau: "CONFIRME",
                libelle: "A quoi correspond le geste de l'arbitre ? ",
                attributs: ["Le soigneur peut entrer sur le terrain", "Le remplçant peur entrer sur le terrain"],
                reponse: 1,
                libRep:"L'arbitre définit s'il y a besoin ou pas du soigneur auprès de la joueuse",
                loi: "Loi_15",
                points: 9
            },
            {
                step: 81,
                act: "question",
                niveau: "DEBUTANT",
                libelle: "L'arbitre a sifflé en faveur d'un ",
                attributs: ["Coup-franc en faveur des rouges", "Coup-franc en faveur des banches"],
                reponse: 1,
                libRep:"L'arbitre tend son bras en direction du camp sanctionné",
                loi: "Loi_15",
                points: 9
            },
            {
                step: 100,
                act: "question",
                niveau: "DEBUTANT",
                libelle: "L'arbitre a sifflé en faveur d'un ",
                attributs: ["Faute du bras de la joueuse blanche", "Charge de la joueuse blanche"],
                reponse: 1,
                libRep:"L'arbitre considère qu'il y a obstruction",
                loi: "Loi_15",
                points: 9
            },
            {
                step: 113,
                act: "question",
                niveau: "DEBUTANT",
                libelle: "La touche sera en faveur de l'équipe ",
                attributs: ["Blanche", "Rouge"],
                reponse: 1,
                libRep:"L'arbitre assistant tend son drapeau en direction du camp sanctionné. L'arbitre central confirme.",
                loi: "Loi_15",
                points: 9
            },
            {
                step: 135,
                act: "question",
                niveau: "DEBUTANT",
                libelle: "Comment l'arbitre confirme-t-il le but ?",
                attributs: ["Il tend son bras vers le ciel", "Il tend son bras vers le rond central"],
                reponse: 1,
                libRep:"Il se rend ensuite vers le rond central",
                loi: "Loi_15",
                points: 9
            },
            {
                step: 150,
                act: "question",
                niveau: "CONFIRME",
                libelle: "Quelles sont les informations que note l'arbitre ?",
                attributs: ["La minute de jeu et le score", "La minute de jeu, le score et le nom de la buteuse"],
                reponse: 2,
                libRep:"Il se rend ensuite vers le rond central",
                loi: "Loi_15",
                points: 9
            },
            {
                step: 161,
                act: "question",
                niveau: "DEBUTANT",
                libelle: "Quelles sont les conditions pour valider la remise en jeu dans le rond central ?",
                attributs: ["Il n'y a que la joueuse qui fait la remise en jeu", "Il peut y avoir les joueuses de l'équipe qui a pris le but"],
                reponse: 1,
                libRep:"Il se rend ensuite vers le rond central",
                loi: "Loi_15",
                points: 9
            },
            {
                step: 173,
                act: "question",
                niveau: "DEBUTANT",
                libelle: "Comment l'arbitre indique-t-il l'inversion de la touche ?",
                attributs: ["Il tend son bras vers le camp de l'équipe sanctionnée", "il mime la touche et tend son bras vers le camp de l'équipe sanctionnée"],
                reponse: 2,
                libRep:"Un touche mal effectuée donne droit à l'inversion de la touche enf aveur de l'adversaire",
                loi: "Loi_15",
                points: 9
            },
            {
                step: 183,
                act: "question",
                niveau: "CONFIRME",
                libelle: "Que signifie le geste de l'arbitre ?",
                attributs: ["indique qu'il n'y a pas faute", "indique l'avantage aux blanches"],
                reponse: 2,
                libRep:"L'arbitre peu laisser le jeu se dérouler suite à une faute si le bénéficiaire est en possession du ballon",
                loi: "Loi_15",
                points: 9
            },
            {
                step: 197,
                act: "question",
                niveau: "CONFIRME",
                libelle: "Il y a un tirage de maillot. Que fait l'arbitre ?",
                attributs: ["Il siffle la faute", "Il laisse l'avantage aux blanches"],
                reponse: 2,
                libRep:"L'arbitre tend ses deux bras vers le camp sanctionné",
                loi: "Loi_15",
                points: 9
            },
            {
                step: 207,
                act: "question",
                niveau: "CONFIRME",
                libelle: "L'arbitre lève ses deux bras pour",
                attributs: ["Autoriser le changement de joueuse", "Indiquer la fin de la mi-temps"],
                reponse: 1,
                libRep:"La nouvelle joueuse attend la sortie avant d'entrer",
                loi: "Loi_15",
                points: 9
            },
            {
                step: 210,
                act: "information",
                libelle: "Les co-équipières applaudissent pour remercier leur copine pour sa prestation"
            },
            {
                step: 228,
                act: "information",
                libelle: "L'arbitre note alors le changement et peut vérifer les équipements éventuellement"
            },
            {
                step: 263,
                act: "question",
                niveau: "CONFIRME",
                libelle: "L'arbitre va",
                attributs: ["Siffler une charge par derrière et donner un carton jaune", "Siffler une charge par derrière", "Laisser l'avantage aux rouges"],
                reponse: 2,
                libRep:"L'arbitre a d'abord vérifié si les rouges conservaient le ballon",
                loi: "Loi_15",
                points: 9
            },
            {
                step: 296,
                act: "question",
                niveau: "DEBUTANT",
                libelle: "Comment l'arbitre va-t-il signaler le corner ?",
                attributs: ["Il lève son bras en direction du coin", "Il lève son bras vers le ciel", "Il lève ses deux bras vers le coin"],
                reponse: 1,
                libRep:"L'arbitre se positionne à l'extérieur de la surface de réparation pour suivre le corner",
                loi: "Loi_15",
                points: 9
            },
            {
                step: 307,
                act: "question",
                niveau: "DEBUTANT",
                libelle: "Comment l'arbitre va-t-il signaler la sortie de but ?",
                attributs: ["Il lève son bras vers le ciel", "Il tend son bras vers la ligne des 6 mètres"],
                reponse: 2,
                libRep:"L'arbitre se re-positionne pour suivre le jeu",
                loi: "Loi_15",
                points: 9
            },
            {
                step: 313,
                act: "fin"
            }
        ]
    ],
    [
        {
            id: 5,
            titre: "EM/Herbiers4",
            poster: "http://media.w3.org/2010/05/bunny/poster.png",
            fichier: "EM_Herbiers.mp4",
            description: "Match opposant Les Herbiers (Rouge) à l'Etoile Mouzillon (Blanc) en championnat R2F" ,
            gauche: "Les Herbiers (Rouge)",
            droite: "Etoile Mouzillon (Blanc)"
        },
        [   
            {
                step: 2,
                act: "allerA",
                indice: 295
            },
            {
                step: 296,
                act: "question",
                niveau: "DEBUTANT",
                libelle: "Comment l'arbitre va-t-il signaler le corner ?",
                attributs: ["Il lève son bras en direction du coin", "Il lève son bras vers le ciel", "Il lève ses deux bras vers le coin"],
                reponse: 1,
                libRep:"L'arbitre se positionne à l'extérieur de la surface de réparation pour suivre le corner",
                loi: "Loi_15",
                points: 9
            },
            {
                step: 300,
                act: "information",
                libelle: "L'arbitre lève le bras pour indiquer qu'il y a hors-jeu"
            },
        ],
        {
            step: 313,
            act: "fin"
        }
    ]
]