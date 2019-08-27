var scenario = [
    [
        {
            id: 2,
            rencontre: "Bretagne/PDLL",
            poster: "Pole_PloufraganMT1.png",
            fichier: "Pole_PloufraganMT1.mp4",
            description: "Match amical opposant Les Pôles espoirs des Ligues de Bretagne et des Pays de La Loire",
            gauche: {
                nom: "Ligue de Bretagne (Marron)",
                fanion: "ligueBretagne.png"
            },
            droite: {
                nom: "Ligue Pays de La Loire (Bleu)",
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
            id: 3,
            rencontre: "PDLL/Bretagne",
            poster: "Pole_PloufraganMT2.png",
            fichier: "Pole_PloufraganMT2.mp4",
            description: "Match amical opposant Les Pôles espoirs des Ligues de Bretagne et des Pays de La Loire",
            gauche: {
                nom: "Ligue Pays de La Loire (Bleu)",
                fanion: "ligue2.png"
            },
            droite: {
                nom: "Ligue de Bretagne (Marron)",
                fanion: "ligueBretagne.png"
            }
        },
        [               
            {
                step: '00:00:28',
                act: "question",
                niveau: "DEBUTANT/CONFIRME",
                libelle: "Choc sur gardien",
                pict: "<nom>.png",
                attributs: ["val1", "val2", "valn"],
                reponse: 1,
                libRep:"description réponse",
                loi: "Loi_12",
                points: 1
            },
            {
                step: '00:02:20',
                act: "question",
                niveau: "DEBUTANT/CONFIRME",
                libelle: "Faute signaléee par arbitre assistant (--)",
                pict: "<nom>.png",
                attributs: ["val1", "val2", "valn"],
                reponse: 1,
                libRep:"description réponse",
                loi: "Loi_6",
                points: 1
            },
            {
                step: '00:02:25',
                act: "allerA",
                niveau: "DEBUTANT",
                indice: '00:05:12'
            },
            {
                step: '00:05:22',
                act: "question",
                niveau: "DEBUTANT/CONFIRME",
                libelle: "Avertissement (n°3)",
                pict: "<nom>.png",
                attributs: ["val1", "val2", "valn"],
                reponse: 1,
                libRep:"description réponse",
                loi: "Loi_12",
                points: 1
            },
            {
                step: '00:06:44',
                act: "question",
                niveau: "DEBUTANT/CONFIRME",
                libelle: "Choc gardien",
                pict: "<nom>.png",
                attributs: ["val1", "val2", "valn"],
                reponse: 1,
                libRep:"description réponse",
                loi: "Loi_12",
                points: 1
            },
            {
                step: '00:08:06',
                act: "information",
                niveau: "DEBUTANT",
                libelle: "BUT",
                pict: "<nom>.png",
                type: 'fairplay'
            },
            {
                step: '00:09:14',
                act: "question",
                niveau: "DEBUTANT/CONFIRME",
                libelle: "Coup-Franc : tirage de maillot : avertissement ?",
                pict: "<nom>.png",
                attributs: ["val1", "val2", "valn"],
                reponse: 1,
                libRep:"description réponse",
                loi: "Loi_13",
                points: 1
            },
            {
                step: '00:10:56',
                act: "question",
                niveau: "DEBUTANT/CONFIRME",
                libelle: "Touche : retour position ++",
                pict: "<nom>.png",
                attributs: ["val1", "val2", "valn"],
                reponse: 1,
                libRep:"description réponse",
                loi: "Loi_15",
                points: 1
            },
            {
                step: '00:11:55',
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
                step: '00:12:00',
                act: "allerA",
                niveau: "DEBUTANT",
                indice: '00:13:50'
            },
            {
                step: '00:13:59',
                act: "question",
                niveau: "DEBUTANT/CONFIRME",
                libelle: "Changement de joueur",
                pict: "<nom>.png",
                attributs: ["val1", "val2", "valn"],
                reponse: 1,
                libRep:"description réponse",
                loi: "Loi_3",
                points: 1
            },
            {
                step: '00:15:05',
                act: "question",
                niveau: "DEBUTANT/CONFIRME",
                libelle: "Touche : position ",
                pict: "<nom>.png",
                attributs: ["val1", "val2", "valn"],
                reponse: 1,
                libRep:"description réponse",
                loi: "Loi_15",
                points: 1
            },
            {
                step: '00:17:07',
                act: "question",
                niveau: "DEBUTANT/CONFIRME",
                libelle: "Changement de joueur",
                pict: "<nom>.png",
                attributs: ["val1", "val2", "valn"],
                reponse: 1,
                libRep:"description réponse",
                loi: "Loi_3",
                points: 1
            },
            {
                step: '00:19:24',
                act: "question",
                niveau: "DEBUTANT/CONFIRME",
                libelle: "Hors-jeu",
                pict: "<nom>.png",
                attributs: ["val1", "val2", "valn"],
                reponse: 1,
                libRep:"description réponse",
                loi: "Loi_11",
                points: 1
            },
            {
                step: '00:21:02',
                act: "question",
                niveau: "DEBUTANT/CONFIRME",
                libelle: "Obstruction ?",
                pict: "<nom>.png",
                attributs: ["val1", "val2", "valn"],
                reponse: 1,
                libRep:"description réponse",
                loi: "Loi_12",
                points: 1
            },
            {
                step: '00:21:08',
                act: "allerA",
                niveau: "DEBUTANT",
                indice: '00:24:38'
            },
            {
                step: '00:24:44',
                act: "question",
                niveau: "DEBUTANT/CONFIRME",
                libelle: "Coup-Franc avec carton jaune",
                pict: "<nom>.png",
                attributs: ["val1", "val2", "valn"],
                reponse: 1,
                libRep:"description réponse",
                loi: "Loi_13",
                points: 1
            },
            {
                step: '00:26:00',
                act: "bonus",
                niveau: "DEBUTANT",
                libelle: "Equipement règlementaire",
                pict: "<nom>.png",
                attributs: ["val1", "val2", "valn"],
                reponse: 1,
                libRep:"description réponse",
                loi: "Loi_4",
                points: 2
            },
            {
                step: '00:28:38',
                act: "information",
                niveau: "DEBUTANT",
                libelle: "BUT",
                pict: "<nom>.png",
                type: 'fairplay'
            },
            {
                step: '00:28:35',
                act: "allerA",
                niveau: "DEBUTANT",
                indice: '00:32:45'
            },
            {
                step: '00:32:50',
                act: "question",
                niveau: "DEBUTANT/CONFIRME",
                libelle: "Coup-Franc avec carton jaune",
                pict: "<nom>.png",
                attributs: ["val1", "val2", "valn"],
                reponse: 1,
                libRep:"description réponse",
                loi: "Loi_13",
                points: 1
            },
            {
                step: '00:33:00',
                act: "bonus",
                niveau: "DEBUTANT",
                libelle: "Le temps additionnel est :",
                pict: "<nom>.png",
                attributs: ["un minimum à jouer au-delà du temps règlementaire", "un maximum à jouer au-delà du temps règlementaire"],
                reponse: 1,
                libRep:"L'arbitre doit faire jouer le temps additionnel au minimum. Il peut aller au-delà en tenant compte de ce qu'il se passe sur le terrain",
                loi: "Loi_7",
                points: 2
            },
            {
                step: '00:33:06',
                act: "allerA",
                niveau: "DEBUTANT",
                indice: '00:35:45'
            },
            {
                step: '00:35:48',
                act: "fin"
            }
        ]
    ]
]