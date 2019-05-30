var scenario = [
    [
        {
            id: 1,
            rencontre: "Bretagne/PDLL",
            poster: "Pole_PloufraganMT1.png",
            fichier: "Pole_PloufraganMT1.mp4",
            description: "Match amical opposant Les Pôles espoirs des Ligues de Bretagne et des Pays de La Loire",
            gauche: {
                nom: "Ligue de Bretagne (Blanc/Marron)",
                fanion: "ligueBretagne.png"
            },
            droite: {
                nom: "Ligue Pays de La Loire (Bleu/Bleu)",
                fanion: "Ligue2.png"
            }
        },
        [               
            {
                step: '00:00:03',
                act: "allerA",
                niveau: "DEBUTANT",
                indice: '00:02:00'
            },
            {
                step: '00:02:06',
                act: "question",
                niveau: "DEBUTANT/CONFIRME",
                libelle: "Touche",
                pict: "<nom>.png",
                attributs: ["val1", "val2", "valn"],
                reponse: 1,
                libRep:"description réponse",
                loi: "Loi_15",
                points: 1
            },
            {
                step: '00:03:20',
                act: "question",
                niveau: "DEBUTANT/CONFIRME",
                libelle: "Avantage : geste",
                pict: "<nom>.png",
                attributs: ["val1", "val2", "valn"],
                reponse: 1,
                libRep:"description réponse",
                loi: "Loi_5",
                points: 1
            },
            {
                step: '00:03:25',
                act: "allerA",
                niveau: "DEBUTANT",
                indice: '00:06:25'
            },
            {
                step: '00:05:35',
                act: "question",
                niveau: "DEBUTANT/CONFIRME",
                libelle: "Touche : mal faite",
                pict: "<nom>.png",
                attributs: ["val1", "val2", "valn"],
                reponse: 1,
                libRep:"description réponse",
                loi: "Loi_15",
                points: 1
            },
            {
                step: '00:06:29',
                act: "question",
                niveau: "DEBUTANT/CONFIRME",
                libelle: "Intervention soigneur",
                pict: "<nom>.png",
                attributs: ["val1", "val2", "valn"],
                reponse: 1,
                libRep:"description réponse",
                loi: "Loi_5",
                points: 1
            },
            {
                step: '00:08:02',
                act: "question",
                niveau: "DEBUTANT/CONFIRME",
                libelle: "Coup-Franc : position arbitre",
                pict: "<nom>.png",
                attributs: ["val1", "val2", "valn"],
                reponse: 1,
                libRep:"description réponse",
                loi: "Loi_13",
                points: 1
            },
            {
                step: '00:10:06',
                act: "question",
                niveau: "DEBUTANT/CONFIRME",
                libelle: "Coup-Franc : intervention arbitre assistant",
                pict: "<nom>.png",
                attributs: ["val1", "val2", "valn"],
                reponse: 1,
                libRep:"description réponse",
                loi: "Loi_13",
                points: 1
            },
            {
                step: '00:12:03',
                act: "question",
                niveau: "DEBUTANT/CONFIRME",
                libelle: "Avantage : jouer",
                pict: "<nom>.png",
                attributs: ["val1", "val2", "valn"],
                reponse: 1,
                libRep:"description réponse",
                loi: "Loi_5",
                points: 1
            },
            {
                step: '00:13:16',
                act: "question",
                niveau: "DEBUTANT/CONFIRME",
                libelle: "Coup-Franc",
                pict: "<nom>.png",
                attributs: ["val1", "val2", "valn"],
                reponse: 1,
                libRep:"description réponse",
                loi: "Loi_13",
                points: 1
            },
            {
                step: '00:13:20',
                act: "allerA",
                niveau: "DEBUTANT",
                indice: '00:17:40'
            },
            {
                step: '00:17:51',
                act: "question",
                niveau: "DEBUTANT/CONFIRME",
                libelle: "6 mètres",
                pict: "<nom>.png",
                attributs: ["val1", "val2", "valn"],
                reponse: 1,
                libRep:"description réponse",
                loi: "Loi_16",
                points: 1
            },
            {
                step: '00:17:60',
                act: "allerA",
                niveau: "DEBUTANT",
                indice: '00:23:35'
            },
            {
                step: '00:23:45',
                act: "information",
                niveau: "DEBUTANT",
                libelle: "BUT",
                pict: "<nom>.png",
                type: 'fairplay'
            },
            {
                step: '00:24:13',
                act: "question",
                niveau: "DEBUTANT/CONFIRME",
                libelle: "Engagement : pas bien fait",
                pict: "<nom>.png",
                attributs: ["val1", "val2", "valn"],
                reponse: 1,
                libRep:"description réponse",
                loi: "Loi_8",
                points: 1
            },
            {
                step: '00:24:51',
                act: "information",
                niveau: "DEBUTANT",
                libelle: "BUT",
                pict: "<nom>.png",
                type: 'fairplay'
            },
            {
                step: '00:25:20',
                act: "question",
                niveau: "DEBUTANT/CONFIRME",
                libelle: "Engagement : pas bien fait",
                pict: "<nom>.png",
                attributs: ["val1", "val2", "valn"],
                reponse: 1,
                libRep:"description réponse",
                loi: "Loi_8",
                points: 1
            },
            {
                step: '00:25:58',
                act: "information",
                niveau: "DEBUTANT",
                libelle: "BUT",
                pict: "<nom>.png",
                type: 'fairplay'
            },
            {
                step: '00:26:00',
                act: "allerA",
                niveau: "DEBUTANT",
                indice: '00:30:00'
            },
            {
                step: '00:30:10',
                act: "question",
                niveau: "DEBUTANT/CONFIRME",
                libelle: "Entre deux",
                pict: "<nom>.png",
                attributs: ["val1", "val2", "valn"],
                reponse: 1,
                libRep:"description réponse",
                loi: "Loi_5",
                points: 1
            },
            {
                step: '00:32:36',
                act: "question",
                niveau: "DEBUTANT/CONFIRME",
                libelle: "Coup-franc : intervention asiistant ++",
                pict: "<nom>.png",
                attributs: ["val1", "val2", "valn"],
                reponse: 1,
                libRep:"description réponse",
                loi: "Loi_13",
                points: 1
            },
            {
                step: '00:33:30',
                act: "question",
                niveau: "DEBUTANT/CONFIRME",
                libelle: "Main ? (utiliser ralentit)",
                pict: "<nom>.png",
                attributs: ["val1", "val2", "valn"],
                reponse: 1,
                libRep:"description réponse",
                loi: "Loi_12",
                points: 1
            },
            {
                step: '00:34:35',
                act: "question",
                niveau: "DEBUTANT/CONFIRME",
                libelle: "Pedagogie : position des bras dans le mur",
                pict: "<nom>.png",
                attributs: ["val1", "val2", "valn"],
                reponse: 1,
                libRep:"description réponse",
                loi: "Loi_13",
                points: 1
            },
            {
                step: '00:35:00',
                act: "question",
                niveau: "DEBUTANT/CONFIRME",
                libelle: "Corner",
                pict: "<nom>.png",
                attributs: ["val1", "val2", "valn"],
                reponse: 1,
                libRep:"description réponse",
                loi: "Loi_17",
                points: 1
            },
            {
                step: '00:35:21',
                act: "fin"
            }
        ]
    ],
    [
        {
            id: 2,
            rencontre: "EM/Herbiers",
            poster: "EMouz_Herbiers.png",
            fichier: "EM_Herbiers.mp4",
            description: "Match opposant Les Herbiers à l'Etoile Mouzillon en championnat R2F",
            competition: "R2F",
            gauche: {
                nom: "Les Herbiers (Rouge)",
                fanion: "LHerbiers.png"
            },
            droite: {
                nom: "Etoile Mouzillon (Blanc)",
                fanion: "EMouz.png"
            }
        },
        [               
            {
                step: '00:00:03',
                act: "allerA",
                niveau: "CONFIRMER",
                indice: '00:00:18'
            },
            {
                step: '00:00:05',
                act: "question",
                niveau: "DEBUTANT",
                libelle: "Selon vous y-a-t-il hors-jeu des blanches ? ",
                attributs: ["Oui", "Non"],
                reponse: 1,
                libRep:"La joueuse de l'équipe Blanche qui reçoit le ballon est en position de hors-jeu",
                loi: "Loi_11",
                reculReplay: 2,
                points: 2
            },
            {
                step: '00:00:15',
                act: "bonus",
                niveau: "DEBUTANT",
                libelle: "Quel est le carton que sort l'arbitre lorsqu'il autorise le soigneur à entrer ? ",
                pict: "cartons.png",
                attributs: ["A", "C", "F", "D"],
                reponse: 4,
                libRep:"L'arbitre peut également lever le bras en direction du banc de touche",
                allerA: '00:00:42',
                points: 2
            },
            {
                step: '00:00:21',
                act: "question",
                niveau: "CONFIRME",
                libelle: "Le but n'est pas validé. Pour quelle raison ? ",
                attributs: ["Charge sur défenseur", "Position de hors-jeu", "Main"],
                reponse: 2,
                libRep:"La joueuse de l'équipe Blanche qui transmet le ballon du but est en position de hors-jeu.",
                loi: "Loi_11",
                reculReplay: 3,
                points: 2
            },
            {
                step: '00:00:37',
                act: "information",
                niveau: "CONFIRME",
                libelle: "Le jeu reprend à la position signalée du hors-jeu"
            },
            {
                step: '00:00:40',
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
            {
                step: '00:00:44',
                act: "question",
                niveau: "DEBUTANT",
                libelle: "La remise en jeu s'est-elle effectuée correctement ? ",
                attributs: ["Oui", "Non"],
                reponse: 1,
                libRep:"Lors de la remise en jeu suite à une touche, la joueuse doit avoir les talons au sol et le ballon doit être placé dans le dos au départ du mouvement.",
                loi: "Loi_15",
                reculReplay: 2,
                points: 3
            },
            {
                step: '00:00:54',
                act: "question",
                niveau: "CONFIRME",
                libelle: "Selon vous l'arbitre va-t-il siffler un coup-franc ? ",
                attributs: ["Oui", "Non"],
                reponse: 2,
                libRep:"Il indique de poursuire le jeu car il n'y a pas de faute caractérisée",
                loi: "Loi_13",
                reculReplay: 3,
                points: 3
            },
            {
                step: '00:00:58',
                act: "information",
                niveau: "DEBUTANT",
                libelle: "La joueuse en rouge fait preuve de fair-play en allant aider à se relever la joueuse blanche",
                pict: "FIFA_Fair_Play.jpg",
                type: 'fairplay'
            },
            {
                step: '00:01:00',
                act: "bonus",
                niveau: "CONFIRME",
                libelle: "Quel est le bon geste pour que l'arbitre indique un coup-franc indirect ?",
                pict:"gestes_arbitre.png",
                attributs: ["A", "D", "E"],
                reponse: 1,
                libRep:"",
                loi: "Loi_13",
                points: 3
            },
            {
                step: '00:01:15',
                act: "question",
                niveau: "DEBUTANT",
                libelle: "L'arbitre a sifflé un coup-franc en faveur des : ",
                attributs: ["Rouges", "Blanches"],
                reponse: 2,
                libRep:"L'arbitre tend son bras en direction du camp sanctionné",
                loi: "Loi_12",
                points: 3
            },
            {
                step: '00:01:21',
                act: "question",
                niveau: "CONFIRME",
                libelle: "A quoi correspond le geste de l'arbitre ? ",
                attributs: ["Le soigneur peut entrer sur le terrain", "Le remplaçant peur entrer sur le terrain"],
                reponse: 1,
                libRep:"L'arbitre définit s'il y a besoin ou pas du soigneur auprès de la joueuse",
                loi: "Loi_5",
                reculReplay: 2,
                points: 3
            },
            {
                step: '00:01:40',
                act: "question",
                niveau: "DEBUTANT",
                libelle: "L'arbitre a sifflé une faute. Laquelle ?",
                attributs: ["Faute du bras de la joueuse blanche", "Charge de la joueuse blanche"],
                reponse: 1,
                libRep:"L'arbitre considère qu'il y a obstruction",
                loi: "Loi_12",
                reculReplay: 3,
                points: 3
            },
            {
                step: '00:01:53',
                act: "question",
                niveau: "DEBUTANT",
                libelle: "La touche sera en faveur des joueuses de l'équipe : ",
                attributs: ["Blanche", "Rouge"],
                reponse: 1,
                libRep:"L'arbitre assistant tend son drapeau en direction du camp sanctionné. L'arbitre central confirme.",
                loi: "Loi_15",
                reculReplay: 3,
                points: 2
            },
            {
                step: '00:02:15',
                act: "question",
                niveau: "DEBUTANT",
                libelle: "Comment l'arbitre confirme-t-il le but ?",
                pict: "gestes_arbitre.png",
                attributs: ["B", "D", "A" ],
                reponse: 3,
                libRep:"Il se rend ensuite vers le rond central",
                loi: "Loi_10",
                points: 2
            },
            {
                step: '00:02:30',
                act: "question",
                niveau: "CONFIRME",
                libelle: "Quelles sont les informations que note l'arbitre ?",
                attributs: ["La minute de jeu et le score", "La minute de jeu, le score et le nom de la buteuse"],
                reponse: 2,
                libRep:"Il se rend ensuite vers le rond central",
                points: 2
            },
            {
                step: '00:02:41',
                act: "question",
                niveau: "DEBUTANT",
                libelle: "Quelles sont les conditions pour valider la remise en jeu dans le rond central ?",
                attributs: ["Il n'y a que la joueuse qui fait la remise en jeu", "Il peut y avoir les joueuses de l'équipe qui a pris le but"],
                reponse: 1,
                libRep:"Il se rend ensuite vers le rond central",
                loi: "Loi_8",
                points: 2
            },
            {
                step: '00:02:53',
                act: "question",
                niveau: "DEBUTANT",
                libelle: "Comment l'arbitre indique-t-il l'inversion de la touche ?",
                attributs: ["Il tend son bras vers le camp de l'équipe sanctionnée", "il mime la touche et tend son bras vers le camp de l'équipe sanctionnée"],
                reponse: 2,
                libRep:"Un touche mal effectuée donne droit à l'inversion de la touche enf aveur de l'adversaire",
                loi: "Loi_15",
                points: 2
            },
            {
                step: '00:03:03',
                act: "question",
                niveau: "CONFIRME",
                libelle: "Que signifie le geste de l'arbitre ?",
                attributs: ["indique qu'il n'y a pas faute", "indique l'avantage aux blanches"],
                reponse: 2,
                libRep:"L'arbitre peu laisser le jeu se dérouler suite à une faute si le bénéficiaire est en possession du ballon",
                reculReplay: 2,
                points: 2
            },
            {
                step: '00:03:10',
                act: "bonus",
                niveau: "DEBUTANT",
                libelle: "Quel est le bon geste pour que l'arbitre assistant indique la rentrée de touche ?",
                pict:"gestes_assistant.png",
                attributs: ["A", "B", "C"],
                reponse: 1,
                libRep:"",
                loi: "Loi_15",
                points: 3
            },
            {
                step: '00:03:17',
                act: "question",
                niveau: "CONFIRME",
                libelle: "Il y a un tirage de maillot. Que fait l'arbitre ?",
                attributs: ["Il siffle la faute", "Il laisse l'avantage aux blanches"],
                reponse: 2,
                libRep:"L'arbitre tend ses deux bras vers le camp sanctionné",
                loi: "Loi_12",
                points: 1
            },
            {
                step: '00:03:27',
                act: "question",
                niveau: "CONFIRME",
                libelle: "L'arbitre lève ses deux bras pour",
                attributs: ["Autoriser le changement de joueuse", "Indiquer la fin de la mi-temps"],
                reponse: 1,
                libRep:"La ouvelle joueuse attend la sortie avant d'entrer",
                points: 2
            },
            {
                step: '00:03:30',
                act: "information",
                niveau: "DEBUTANT",
                libelle: "Les co-équipières applaudissent la joueuse qui sort pour la remercier pour sa prestation",
                pict: "FIFA_Fair_Play.jpg",
                type: 'fairplay'
            },
            {
                step: '00:03:48',
                act: "information",
                niveau: "DEBUTANT",
                libelle: "L'arbitre note alors le changement et peut vérifer les équipements éventuellement"
            },
            {
                step: '00:04:23',
                act: "question",
                niveau: "CONFIRME",
                libelle: "Selon vous quelle faute va siffler l'arbitre ?",
                attributs: ["une charge par derrière et donner un carton jaune", "une charge par derrière", "Laisser l'avantage aux rouges"],
                reponse: 2,
                libRep:"L'arbitre a d'abord vérifié si les rouges conservaient le ballon",
                loi: "Loi_12",
                reculReplay: 2,
                points: 2
            },
            {
                step: '00:04:51',
                act: "question",
                niveau: "CONFIRME",
                libelle: "A quelle distance doit se trouver le mur sur un coup-franc direct ?",
                attributs: ["9m", "9m10", "9m15"],
                reponse: 3,
                loi: "Loi_13",
                points: 2
            },
            {
                step: '00:05:16',
                act: "question",
                niveau: "DEBUTANT",
                libelle: "Comment l'arbitre assistant va-t-il signaler le coup de pied de coin ?",
                pict: "gestes_assistant.png",
                attributs: ["B", "A", "D"],
                reponse: 1,
                libRep:"L'arbitre assistant se positionne au niveau de la ligne de limite de terrain pour vérifier que le ballon ne sort pas.",
                loi: "Loi_17",
                points: 2
            },
            {
                step: '00:05:27',
                act: "question",
                niveau: "DEBUTANT",
                libelle: "Comment l'arbitre va-t-il signaler la relance aux 6 mètres ?",
                pict: "gestes_arbitre.png",
                attributs: ["F", "A", "C"],
                reponse: 3,
                libRep:"L'arbitre se re-positionne pour suivre le jeu",
                loi: "Loi_8",
                points: 2
            },
            {
                step: '00:05:36',
                act: "fin"
            }
        ]
    ]
]