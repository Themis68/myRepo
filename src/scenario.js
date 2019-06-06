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
                nom: "Ligue Pays De la Loire (Bleu/Bleu)",
                fanion: "Ligue2.png"
            }
        },
        [               
            {
                step: '00:00:01',
                act: "question",
                niveau: "DEBUTANT",
                question: {
                    libelle: "Quelle règle liée à l'équipement des joueurs n'est pas respectée ?"
                },
                attributs: ["les maillots doivent êtres dans les shorts", "Les cuissardes doivent êtres de la couleur dominante du short"],
                reponse: {
                    solution: 1,
                    libelle: "Plusieurs joueurs blancs n'ont pas le maillot dans le short",
                    loi: "Loi_04",
                    points: 1
                }
            },
            {
                step: '00:00:07',
                act: "allerA",
                niveau: "DEBUTANT",
                indice: '00:02:00'
            },
            {
                step: '00:02:08',
                act: "question",
                niveau: "DEBUTANT",
                question: {
                    libelle: "L'arbitre assistant a indiqué que la touche est en faveur de l'équipe ?"
                },
                attributs: ["Ligue Pays De la Loire", "Ligue de Bretagne"],
                reponse: {
                    solution: 2,
                    libelle: "L'arbitre assistant positionne son drapeau en direction du camps qui a provoqué la touche",
                    loi: "Loi_15",
                    points: 1
                }
            },
            {
                step: '00:02:10',
                act: "allerA",
                niveau: "DEBUTANT",
                indice: "00:03:10"
            },
            {
                step: '00:03:20',
                act: "question",
                niveau: "DEBUTANT",
                question: {
                    libelle: "L'arbitre utilise une gestuelle pour indiquer"
                },
                attributs: ["une faute", "une situation d'avantage"],
                reculReplay: 2,
                reponse: {
                    solution: 2,
                    libelle: "L'arbitre indique par un geste des bras en avant ou en criant 'Avantage'",
                    loi: "Loi_05",
                    points: 1
                }
            },
            {
                step: '00:03:22',
                act: "allerA",
                niveau: "DEBUTANT",
                indice: "00:06:23"
            },
            {
                step: '00:06:29',
                act: "question",
                niveau: "DEBUTANT",
                question: {
                    libelle: "Comment l'arbitre signale-t-il au banc que le soigneur peut entrer sur le terrain ?"
                },
                attributs: ["Il lève le bras en direction du banc et crie 'soigneur'", "Il lève le bras en direction du banc et siffle"],
                reculReplay: 2,
                reponse: {
                    solution: 2,
                    libelle: "le soigneur doit attendre que l'arbitre ait donné son accord pour qu'il intervienne",
                    loi: "Loi_05",
                    points: 1
                }
            },
            {
                step: '00:06:32',
                act: "allerA",
                niveau: "DEBUTANT",
                indice: "00:07:55"
            },
            {
                step: '00:08:02',
                act: "question",
                niveau: "DEBUTANT",
                question: {
                    libelle: "L'arbitre siffle un coup-franc. Sa gestuelle indique su'il s'agit d'un :"
                },
                attributs: ["coup-franc direct", "coup-franc indirect"],
                reculReplay: 2,
                reponse: {
                    solution: 1,
                    libelle: "Dans le cas d'un coup-franc indirect, l'arbitre maintiendrai son bras levé jusqu'au tir du coup-franc",
                    loi: "Loi_13",
                    points: 2
                }
            },
            {
                step: '00:08:12',
                act: "allerA",
                niveau: "DEBUTANT",
                indice: "00:10:02"
            },
            {
                step: '00:10:08',
                act: "question",
                niveau: "DEBUTANT",
                question: {
                    libelle: "L'arbitre central siffle un coup-franc. Comment l'arbitre assistant a-t-il confirmé la faute ?"
                },
                attributs: ["En levant son drapeau, en le secouant, puis en le dirigeant vers le camp fautif", "En levant son drapeau, en le secouant"],
                reculReplay: 2,
                reponse: {
                    solution: 1,
                    libelle: "L'arbitre assistant peut signaler à l'arbitre des autes s'il estime être le plus prêt de l'action. L'arbitre central garde la décision finale.",
                    loi: "Loi_13",
                    points: 1
                }
            },
            {
                step: '00:10:10',
                act: "allerA",
                niveau: "DEBUTANT",
                indice: "00:11:55"
            },
            {
                step: '00:12:03',
                act: "question",
                niveau: "DEBUTANT",
                question: {
                    libelle: "Au vue de la gestuelle de l'arbitre, quelle a été l:a décision de l'arbitre sur cette situation ?"
                },
                attributs: ["coup-franc", "avantage"],
                reculReplay: 2,
                reponse: {
                    solution: 2,
                    libelle: "L'arbitre signale l'avantage avec son bras et crie 'jouer'",
                    loi: "Loi_05",
                    points: 1
                }
            },
            {
                step: '00:12:05',
                act: "allerA",
                niveau: "DEBUTANT",
                indice: "00:13:05"
            },
            {
                step: '00:13:15',
                act: "question",
                niveau: "DEBUTANT",
                question: {
                    libelle: "Au vue de l'action, l'arbitre va-t-il :"
                },
                attributs: ["siffler un coup-franc", "laisser l'avantage"],
                reculReplay: 3,
                reponse: {
                    solution: 2,
                    libelle: "L'arbitre estime qu'il y a bousculade en pleine course",
                    loi: "Loi_13",
                    points: 1
                }
            },
            {
                step: '00:13:18',
                act: "allerA",
                niveau: "DEBUTANT",
                indice: "00:17:40"
            },
            {
                step: '00:17:51',
                act: "question",
                niveau: "DEBUTANT",
                question: {
                    libelle: "Quelle est la décision de l'arbitre ?"
                },
                attributs: ["corner", "dégagement 6 mètres"],
                reculReplay: 3,
                reponse: {
                    solution: 2,
                    libelle: "L'arbitre indique le point des 6 mètres avec son bras",
                    loi: "Loi_16",
                    points: 1
                }
            },
            {
                step: '00:17:55',
                act: "allerA",
                niveau: "DEBUTANT",
                indice: "00:23:40"
            },
            {
                step: '00:23:45',
                act: "information",
                niveau: "DEBUTANT",
                libelle: "BUT",
                type: 'but'
            },
            {
                step: '00:24:13',
                act: "question",
                niveau: "DEBUTANT",
                question: {
                    libelle: "L'angagement est-il fait dans les règles ?"
                },
                attributs: ["Oui", "Non"],
                reculReplay: 3,
                reponse: {
                    solution: 2,
                    libelle: "Un joueur de l'équipe adverse a traversé la ligne de mi-terrain alors que le ballon n'a pas été déplacé",
                    loi: "Loi_08",
                    points: 2
                }
            },
            {
                step: '00:24:16',
                act: "allerA",
                niveau: "DEBUTANT",
                indice: "00:24:47"
            },
            {
                step: '00:24:51',
                act: "information",
                niveau: "DEBUTANT",
                libelle: "BUT",
                type: 'but'
            },
            {
                step: '00:24:55',
                act: "allerA",
                niveau: "DEBUTANT",
                indice: "00:25:16"
            },
            {
                step: '00:25:20',
                act: "question",
                niveau: "DEBUTANT",
                question: {
                    libelle: "L'angagement est-il fait dans les règles ?"
                },
                attributs: ["Oui", "Non"],
                reponse: {
                    solution: 2,
                    libelle: "Le joueur n°11 de l'équipe qui engage a traversé la ligne de mi-terrain alors que le ballon n'a pas été déplacé",
                    loi: "Loi_08",
                    points: 1
                }
            },
            {
                step: '00:24:23',
                act: "allerA",
                niveau: "DEBUTANT",
                indice: "00:25:54"
            },
            {
                step: '00:25:58',
                act: "information",
                niveau: "DEBUTANT",
                libelle: "BUT",
                type: 'but'
            },
            {
                step: '00:26:02',
                act: "allerA",
                niveau: "DEBUTANT",
                indice: '00:30:05'
            },
            {
                step: '00:30:10',
                act: "question",
                niveau: "DEBUTANT",
                question: {
                    libelle: "L'abitre arrête l'action car il y a eu une faute sur un joueur Bleu lors du contact précédent."
                },
                attributs: ["Il revient à la faute", "Il décide une balle à terre"],
                reponse: {
                    solution: 1,
                    libelle: "L'arbitre estime que la faute est sans conséquence sur l'action finale puisque le gardien des bleus a récupéré le ballon",
                    loi: "Loi_08",
                    points: 2
                }
            },
            {
                step: '00:30:13',
                act: "allerA",
                niveau: "DEBUTANT",
                indice: '00:30:33'
            },
            {
                step: '00:30:39',
                act: "question",
                niveau: "DEBUTANT",
                question: {
                    libelle: "Le coup-franc n'a pas lieu à l'endroit de la faute"
                },
                attributs: ["l'arbitre laisse faire", "l'arbitre siffle et fait rejouer"],
                reponse: {
                    solution: 1,
                    libelle: "l'arbitre laisse faire car il est joué avant l'endroit de la faute",
                    loi: "Loi_13",
                    points: 2
                }
            },
            {
                step: '00:30:42',
                act: "allerA",
                niveau: "DEBUTANT",
                indice: '00:32:33'
            },
            {
                step: '00:32:36',
                act: "question",
                niveau: "DEBUTANT",
                question: {
                    libelle: "L'arbitre assistant lève son drapeau et le secoue pour indiquer une faute"
                },
                attributs: ["L'arbitre peut siffler une faute", "L'abitre n'a pas à en tenir compte"],
                reculReplay: 3,
                reponse: {
                    solution: 1,
                    libelle: "L'abritre assistant peut faire part de ses observations lorsqu'il estime être plus près de l'action que l'abitre ",
                    loi: "Loi_13",
                    points: 1
                }
            },
            {
                step: '00:32:39',
                act: "allerA",
                niveau: "DEBUTANT",
                indice: '00:34:32'
            },
            {
                step: '00:34:08',
                act: "information",
                niveau: "DEBUTANT",
                libelle: "L'abitre explique la sanction au joueur fautif pour calmer le jeu",
                type: 'fairplay'
            },
            {
                step: '00:34:35',
                act: "question",
                niveau: "DEBUTANT",
                question: {
                    libelle: "Quelles sont les indications que l'arbitre donne aux joueurs qui forment le mur ?"
                },
                attributs: ["ne pas bouger lors du tir","position autorisée des bras dans le mur"],
                reponse: {
                    solution: 2,
                    libelle: "Les joueurs ne peuvent se déplacer avant le tir et ne doivent pas écarter leurs bras du corps",
                    loi: "Loi_13",
                    points: 2
                }
            },
            {
                step: '00:34:39',
                act: "allerA",
                niveau: "DEBUTANT",
                indice: '00:34:55'
            },
            {
                step: '00:34:46',
                act: "question",
                niveau: "DEBUTANT",
                question: {
                    libelle: "Quelle situation nindique l'arbitre ?"
                },
                attributs: ["Un sortie de but", "un corner"],
                reponse: {
                    solution: 2,
                    libelle: "L'abitre lève son bras vers le coin de corner",
                    loi: "Loi_17",
                    points: 1
                }
            },
            {
                step: '00:35:16',
                act: "fin"
            }
        ]
    ]
]