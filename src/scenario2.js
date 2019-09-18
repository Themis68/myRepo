var scenario = [
    [
        {
            id: 1,
            rencontre: "Bretagne/PDLL",
            poster: "Pole_PloufraganMT1.png",
            fichier: "Pole_PloufraganMT1.mp4",
            description: "Match amical opposant Les Pôles espoirs des Ligues de Bretagne et des Pays de La Loire",
            gauche: {
                nom: "Ligue de Bretagne",
                fanion: "ligueBretagne.png"
            },
            droite: {
                nom: "Ligue Pays De la Loire",
                fanion: "Ligue2.png"
            }
        },
        [               
            {
                step: '00:00:01',
                act: "Question",
                niveau: "DEBUTANT",
                Question: {
                    libelle: "Quelle règle liée à l'équipement des joueurs n'est pas respectée ?"
                },
                attributs: ["les maillots doivent êtres dans les shorts", "Les cuissardes doivent êtres de la couleur dominante du short"],
                reculReplay: 2,
                reponse: {
                    solution: 1,
                    libelle: "Plusieurs joueurs blancs n'ont pas le maillot dans le short",
                    loi: "Loi_04",
                    points: 1
                }
            },
            {
                step: '00:00:07',
                act: "AllerA",
                niveau: "DEBUTANT",
                indice: '00:02:00'
            },
            {
                step: '00:02:08',
                act: "Question",
                niveau: "DEBUTANT",
                Question: {
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
                act: "AllerA",
                niveau: "DEBUTANT",
                indice: "00:03:10"
            },
            {
                step: '00:03:20',
                act: "Question",
                niveau: "DEBUTANT",
                Question: {
                    libelle: "L'arbitre utilise une gestuelle pour indiquer"
                },
                attributs: ["une faute", "une situation d'avantage, le joueur fautif"],
                reculReplay: 3,
                reponse: {
                    solution: 2,
                    libelle: "L'arbitre indique par un geste des bras en avant ou en criant 'Avantage'",
                    loi: "Loi_05",
                    points: 1
                }
            },
            {
                step: '00:03:22',
                act: "AllerA",
                niveau: "DEBUTANT",
                indice: "00:06:23"
            },
            {
                step: '00:06:29',
                act: "Question",
                niveau: "DEBUTANT",
                Question: {
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
                act: "AllerA",
                niveau: "DEBUTANT",
                indice: "00:07:55"
            },
            {
                step: '00:08:02',
                act: "Question",
                niveau: "DEBUTANT",
                Question: {
                    libelle: "L'arbitre siffle un coup-franc. Sa gestuelle indique su'il s'agit d'un :"
                },
                attributs: ["coup-franc direct", "coup-franc indirect"],
                reculReplay: 3,
                reponse: {
                    solution: 1,
                    libelle: "Dans le cas d'un coup-franc indirect, l'arbitre maintiendrai son bras levé jusqu'au tir du coup-franc",
                    loi: "Loi_13",
                    points: 2
                }
            },
            {
                step: '00:08:12',
                act: "AllerA",
                niveau: "DEBUTANT",
                indice: "00:10:02"
            },
            {
                step: '00:10:08',
                act: "Question",
                niveau: "DEBUTANT",
                Question: {
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
                act: "AllerA",
                niveau: "DEBUTANT",
                indice: "00:11:55"
            },
            {
                step: '00:12:03',
                act: "Question",
                niveau: "DEBUTANT",
                Question: {
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
                act: "AllerA",
                niveau: "DEBUTANT",
                indice: "00:13:05"
            },
            {
                step: '00:13:15',
                act: "Question",
                niveau: "DEBUTANT",
                Question: {
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
                act: "AllerA",
                niveau: "DEBUTANT",
                indice: "00:17:40"
            },
            {
                step: '00:17:51',
                act: "Question",
                niveau: "DEBUTANT",
                Question: {
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
                act: "AllerA",
                niveau: "DEBUTANT",
                indice: "00:23:40"
            },
            {
                step: '00:23:45',
                act: "Information",
                niveau: "DEBUTANT",
                libelle: "BUT",
                type: 'but'
            },
            {
                step: '00:24:13',
                act: "Question",
                niveau: "DEBUTANT",
                Question: {
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
                act: "AllerA",
                niveau: "DEBUTANT",
                indice: "00:24:47"
            },
            {
                step: '00:24:51',
                act: "Information",
                niveau: "DEBUTANT",
                libelle: "BUT",
                type: 'but'
            },
            {
                step: '00:24:55',
                act: "AllerA",
                niveau: "DEBUTANT",
                indice: "00:25:16"
            },
            {
                step: '00:25:20',
                act: "Question",
                niveau: "DEBUTANT",
                Question: {
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
                act: "AllerA",
                niveau: "DEBUTANT",
                indice: "00:25:54"
            },
            {
                step: '00:25:58',
                act: "Information",
                niveau: "DEBUTANT",
                libelle: "BUT",
                type: 'but'
            },
            {
                step: '00:26:02',
                act: "AllerA",
                niveau: "DEBUTANT",
                indice: '00:30:05'
            },
            {
                step: '00:30:10',
                act: "Question",
                niveau: "DEBUTANT",
                Question: {
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
                act: "AllerA",
                niveau: "DEBUTANT",
                indice: '00:30:33'
            },
            {
                step: '00:30:39',
                act: "Question",
                niveau: "DEBUTANT",
                Question: {
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
                act: "AllerA",
                niveau: "DEBUTANT",
                indice: '00:32:33'
            },
            {
                step: '00:32:36',
                act: "Question",
                niveau: "DEBUTANT",
                Question: {
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
                act: "Bonus",
                niveau: "DEBUTANT",
                Question: {
                    libelle: "le temps additionnel indiqué par l'arbitre correspond à :"
                },
                attributs: ["Temps minimum à jouer", "Temps maximum à jouer"],
                reponse: {
                    solution: 1,
                    loi: "Loi_13",
                    points: 3
                }
            },
            {
                step: '00:32:42',
                act: "AllerA",
                niveau: "DEBUTANT",
                indice: '00:34:32'
            },
            {
                step: '00:34:08',
                act: "Information",
                niveau: "DEBUTANT",
                libelle: "L'abitre explique la sanction au joueur fautif pour calmer le jeu",
                type: 'fairplay'
            },
            {
                step: '00:34:35',
                act: "Question",
                niveau: "DEBUTANT",
                Question: {
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
                act: "AllerA",
                niveau: "DEBUTANT",
                indice: '00:34:55'
            },
            {
                step: '00:34:46',
                act: "Question",
                niveau: "DEBUTANT",
                Question: {
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
                act: "Fin"
            }
        ]
    ],
    [
        {
            id: 2,
            rencontre: "PDLL/Bretagne",
            poster: "Pole_PloufraganMT2.png",
            fichier: "Pole_PloufraganMT2.mp4",
            description: "Match amical opposant Les Pôles espoirs des Ligues de Bretagne et des Pays de La Loire",
            gauche: {                
                nom: "Ligue Pays De la Loire",
                fanion: "Ligue2.png"
            },
            droite: {
                nom: "Ligue de Bretagne",
                fanion: "ligueBretagne.png"
            }
        },
        [               
            {
                step: '00:00:01',
                act: "Question",
                niveau: "DEBUTANT",
                Question: {
                    libelle: "Quelle règle liée à l'équipement des joueurs n'est pas respectée ?"
                },
                attributs: ["les maillots doivent êtres dans les shorts", "Les cuissardes doivent êtres de la couleur dominante du short"],
                reponse: {
                    solution: 1,
                    libelle: "Plusieurs joueurs blancs n'ont pas le maillot dans le short",
                    loi: "Loi_04",
                    points: 1
                }
            }
        ]
    ],
    [
        {
            id: 3,
            rencontre: "Mouzillon/Bauge",
            poster: "Emouz_Bauge.png",
            fichier: "EM_Bauge.mp4",
            description: "Match amical opposant Mouzillon à Baugé",
            gauche: {
                nom: "Baugé",
                fanion: "Bauge.png"
            },
            droite: {
                nom: "Etoile Mouzillon",
                fanion: "EMouz.png"
            }
        },
        [               
            {
                step: '00:00:01',
                act: "Question",
                niveau: "DEBUTANT",
                Question: {
                    libelle: "Quelle règle liée à l'équipement des joueurs n'est pas respectée ?"
                },
                attributs: ["les maillots doivent êtres dans les shorts", "Les cuissardes doivent êtres de la couleur dominante du short"],
                reponse: {
                    solution: 1,
                    libelle: "Plusieurs joueurs blancs n'ont pas le maillot dans le short",
                    loi: "Loi_04",
                    points: 1
                }
            }
        ]
    ],
    [
        {
            id: 4,
            rencontre: "Mouzillon/Les Herbiers",
            poster: "EMouz_Herbiers.png",
            fichier: "EM_Herbiers.mp4",
            description: "Match amical opposant Mouzillon aux Herbiers",
            gauche: {
                nom: "Les Herbiers",
                fanion: "LHerbiers.png"
            },
            droite: {
                nom: "Etoile Mouzillon",
                fanion: "EMouz.png"
            }
        },
        [               
            {
                step: '00:00:01',
                act: "Question",
                niveau: "DEBUTANT",
                Question: {
                    libelle: "Quelle règle liée à l'équipement des joueurs n'est pas respectée ?"
                },
                attributs: ["les maillots doivent êtres dans les shorts", "Les cuissardes doivent êtres de la couleur dominante du short"],
                reponse: {
                    solution: 1,
                    libelle: "Plusieurs joueurs blancs n'ont pas le maillot dans le short",
                    loi: "Loi_04",
                    points: 1
                }
            }
        ]
    ],
    [
        {
            id: 5,
            rencontre: "Match témoin",
            poster: "match_temoin.jpg",
            fichier: "match_temoin.mp4",
            description: "Match amical opposant A à B",
            gauche: {
                nom: "Equipe A"
            },
            droite: {
                nom: "Equipe B"
            }
        },
        [               
            {
                step: '00:00:01',
                act: "Question",
                niveau: "DEBUTANT",
                Question: {
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
                step: '00:00:03',
                act: "Question",
                niveau: "CONFIRME",
                Question: {
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
                step: '00:00:05',
                act: "Question",
                niveau: "EXPERT",
                Question: {
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
                step: '00:00:08',
                act: "Question",
                niveau: "DEBUTANT",
                Question: {
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
                step: '00:00:10',
                act: "Question",
                niveau: "EXPERT",
                Question: {
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
                step: '00:00:11',
                act: "Question",
                niveau: "DEBUTANT",
                Question: {
                    libelle: "Quelle règle liée à l'équipement des joueurs n'est pas respectée ?"
                },
                attributs: ["les maillots doivent êtres dans les shorts", "Les cuissardes doivent êtres de la couleur dominante du short"],
                reponse: {
                    solution: 1,
                    libelle: "Plusieurs joueurs blancs n'ont pas le maillot dans le short",
                    loi: "Loi_04",
                    points: 1
                }
            }
        ]
    ]
]