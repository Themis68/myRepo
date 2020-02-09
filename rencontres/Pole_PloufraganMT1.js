var script1 = [      
    {
        step: '00:00:01',
        act: "Question",
        niveau: "DEBUTANT",
        saut: {
            attente: 4,
            indice: '00:02:00'
        },
        question: {
            libelle: "Quelle règle liée à l'équipement des joueurs n'est pas respectée ?"
        },
        attributs: ["les maillots doivent êtres dans les shorts", "Les chaussettes doivent êtres de la même couleur que le maillot"],
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
        niveau: "CONFIRME",
        indice: "00:03:15"
    },            {
        step: '00:00:08',
        act: "AllerA",
        niveau: "EXPERT",
        indice: "00:34:22"
    },
    {
        step: '00:02:08',
        act: "Question",
        niveau: "DEBUTANT",
        saut: {
            attente: 3,
            indice: '00:06:24'
        },
        question: {
            libelle: "L'arbitre assistant a indiqué que la touche est en faveur de l'équipe ?"
        },
        attributs: ["Ligue Pays De la Loire", "Ligue de Bretagne"],
        reponse: {
            solution: 2,
            pict: "arbitre/touche.png",
            libelle: "L'arbitre assistant positionne son drapeau en direction du camps qui a provoqué la touche",
            loi: "Loi_15",
            points: 1
        }
    },
    {
        step: '00:03:20',
        act: "Question",
        niveau: "CONFIRME",
        saut: {
            attente: 3,
            indice: '00:13:10'
        },
        question: {
            libelle: "L'arbitre utilise une gestuelle pour indiquer"
        },
        attributs: ["une faute", "une situation d'avantage"],
        reculReplay: 3,
        reponse: {
            solution: 2,
            libelle: "En plus de la gestuelle l'arbitre peut compléter par un mot 'avantage'",
            pict: "arbitre/avantage.png",
            loi: "Loi_05",
            points: 1
        }
    },
    {
        step: '00:06:29',
        act: "Question",
        niveau: "DEBUTANT",
        saut: {
            attente: 5,
            indice: '00:07:55'
        },
        question: {
            libelle: "Comment l'arbitre autorise-t-il le soigneur à entrer sur le terrain ?"
        },
        attributs: ["Il lève le bras en direction du banc", "Il lève le bras en direction du banc et doit siffler"],
        reculReplay: 2,
        reponse: {
            solution: 2,
            libelle: "le soigneur doit attendre que l'arbitre ait donné son accord pour qu'il intervienne",
            loi: "Loi_05",
            points: 1
        }
    },
    {
        step: '00:08:04',
        act: "Question",
        niveau: "DEBUTANT",
        saut: {
            attente: 5,
            indice: '00:10:02'
        },
        question: {
            libelle: "L'arbitre siffle un coup-franc. Sa gestuelle indique qu'il s'agit d'un :"
        },
        attributs: ["coup-franc direct", "coup-franc indirect"],
        reculReplay: 3,
        reponse: {
            solution: 1,
            libelle: "L'arbitre garde le bras levé jusqu'à l'exécution du coup-franc s'il s'agit d'un coup-franc indirect",
            pict: "arbitre/direct.png",
            loi: "Loi_13",
            points: 2
        }
    },
    {
        step: '00:10:08',
        act: "Question",
        niveau: "DEBUTANT",
        saut: {
            attente: 3,
            indice: '00:11:55'
        },
        question: {
            libelle: "L'arbitre central siffle un coup-franc. Comment l'arbitre assistant a-t-il confirmé la faute ?"
        },
        attributs: ["En secouant son drapeau puis en le dirigeant vers le camp fautif", "En levant son drapeau et en le secouant"],
        reculReplay: 2,
        reponse: {
            solution: 1,
            libelle: "L'arbitre assistant peut signaler à l'arbitre des fautes s'il estime être le plus prêt de l'action. L'arbitre central garde la décision finale.",
            pict: "arbitre/fauteassistant.png",
            loi: "Loi_13",
            points: 1
        }
    },
    {
        step: '00:12:02',
        act: "Question",
        niveau: "DEBUTANT",
        saut: {
            attente: 5,
            indice: '00:17:47'
        },
        question: {
            libelle: "Au vue de la gestuelle de l'arbitre, quelle a été la décision de l'arbitre sur cette situation ?"
        },
        attributs: ["coup-franc", "avantage"],
        reculReplay: 2,
        reponse: {
            solution: 2,
            libelle: "L'arbitre signale l'avantage avec son bras et crie 'jouer'",
            pict: "arbitre/avantage.png",
            loi: "Loi_05",
            points: 1
        }
    },
    {
        step: '00:13:15',
        act: "Question",
        niveau: "CONFIRME",
        saut: {
            attente: 3,
            indice: '00:32:32'
        },
        question: {
            libelle: "Selon vous, au vue de l'action, l'arbitre va-t-il :"
        },
        attributs: ["siffler un coup-franc", "laisser l'avantage"],
        reculReplay: 3,
        reponse: {
            solution: 1,
            libelle: "L'arbitre estime qu'il y a bousculade en pleine course",
            pict: "arbitre/direct.png",
            loi: "Loi_13",
            points: 1
        }
    },
    {
        step: '00:17:51',
        act: "Question",
        niveau: "DEBUTANT",
        saut: {
            attente: 3,
            indice: '00:23:40'
        },
        question: {
            libelle: "Quelle est la décision de l'arbitre ?"
        },
        attributs: ["corner", "dégagement 6 mètres"],
        reculReplay: 3,
        reponse: {
            solution: 2,
            libelle: "L'arbitre indique le point des 6 mètres avec son bras",
            pict: "arbitre/direct.png",
            loi: "Loi_16",
            points: 1
        }
    },
    {
        step: '00:23:45',
        act: "Information",
        niveau: "DEBUTANT",
        libelle: "BUT",
        type: 'but'
    },
    {
        step: '00:23:48',
        act: "AllerA",
        niveau: "DEBUTANT",
        indice: "00:24:12",
    },
    {
        step: '00:24:16',
        act: "Question",
        niveau: "DEBUTANT",
        saut: {
            attente: 3,
            indice: '00:24:47'
        },
        question: {
            libelle: "L'engagement est-il fait dans les règles ?"
        },
        attributs: ["Oui", "Non"],
        reculReplay: 3,
        reponse: {
            solution: 2,
            libelle: "2 joueurs de l'équipe adverse ont traversé la ligne de mi-terrain alors que le ballon n'a pas été déplacé",
            loi: "Loi_08",
            points: 2
        }
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
        indice: "00:25:18"
    },
    {
        step: '00:25:20',
        act: "Question",
        niveau: "DEBUTANT",
        saut: {
            attente: 3,
            indice: '00:25:54'
        },
        question: {
            libelle: "L'engagement est-il fait dans les règles ?"
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
        saut: {
            attente: 5,
            indice: '00:30:35'
        },
        question: {
            libelle: "L'abitre arrête l'action car il y a eu une faute sur un joueur Bleu lors du contact précédent."
        },
        attributs: ["Il revient à la faute", "Il décide une balle à terre"],
        reponse: {
            solution: 2,
            libelle: "L'arbitre estime que la faute est sans conséquence sur l'action finale puisque le gardien des bleus a récupéré le ballon",
            loi: "Loi_08",
            points: 2
        }
    },
    {
        step: '00:30:40',
        act: "Question",
        niveau: "DEBUTANT",
        saut: {
            attente: 3,
            indice: '00:31:53'
        },
        question: {
            libelle: "Le coup-franc n'a pas lieu à l'endroit de la faute"
        },
        attributs: ["l'arbitre laisse faire", "l'arbitre siffle et fait rejouer"],
        reculReplay: 3,
        reponse: {
            solution: 1,
            libelle: "l'arbitre laisse faire car il est joué avant l'endroit de la faute",
            loi: "Loi_13",
            points: 2
        }
    },
    {
        step: '00:31:58',
        act: "Information",
        niveau: "DEBUTANT",
        libelle: "L'arbitre s'enquiert de l'état du/des joueur(s) lorsqu'il y a un contact",
        type: 'but'
    },
    {
        step: '00:31:60',
        act: "AllerA",
        niveau: "DEBUTANT",
        indice: '00:32:35'
    },
    {
        step: '00:32:36',
        act: "Question",
        niveau: "CONFIRME",
        saut: {
            attente: 3,
            indice: '00:34:55'
        },
        question: {
            libelle: "L'arbitre assistant lève son drapeau et le secoue pour indiquer une faute"
        },
        attributs: ["L'arbitre peut siffler une faute", "L'abitre n'a pas à en tenir compte"],
        reculReplay: 3,
        reponse: {
            solution: 1,
            libelle: "L'abritre assistant peut faire part de ses observations lorsqu'il estime être plus près de l'action que l'abitre ",
            pict: "arbitre/fauteassistant.png",
            loi: "Loi_13",
            points: 1
        }
    },
    {
        step: '00:32:39',
        act: "Bonus",
        niveau: "DEBUTANT",
        saut: {
            attente: 3,
            indice: '00:34:02'
        },
        question: {
            libelle: "Dans le cas de temps additionnel, l'arbitre doit :"
        },
        attributs: ["jouer au minium ce temps", "jouer au maximum ce temps"],
        reponse: {
            solution: 1,
            loi: "Loi_13",
            points: 3
        }
    },
    {
        step: '00:34:07',
        act: "Information",
        niveau: "DEBUTANT",
        libelle: "L'arbitre explique la sanction au joueur fautif pour calmer le jeu",
        type: 'fairplay'
    },
    {
        step: '00:34:12',
        act: "AllerA",
        niveau: "DEBUTANT",
        indice: '00:34:31'
    },
    {
        step: '00:34:30',
        act: "Question",
        niveau: "EXPERT",
        saut: {
            attente: 7,
            indice: '00:34:55'
        },
        question: {
            libelle: "Que doit faire l'arbitre pour suivre le coup-franc dans de bonnes conditions ?"
        },
        attributs: ["rester à côté du tireur","se positionner de façon à voir le tireur, son assistant et la surface de réparation", "se mettre au niveau du mur"],
        reponse: {
            solution: 2,
            points: 3
        }
    },
    {
        step: '00:34:34',
        act: "Question",
        niveau: "DEBUTANT",
        saut: {
            attente: 5,
            indice: '00:34:43'
        },
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
        step: '00:34:46',
        act: "Question",
        niveau: "DEBUTANT",
        saut: {
            attente: 5,
            indice: '00:34:55'
        },
        question: {
            libelle: "Quelle situation indique l'arbitre ?"
        },
        attributs: ["un sortie de but", "un corner"],
        reponse: {
            solution: 2,
            libelle: "L'arbitre lève son bras vers le coin de corner",
            loi: "Loi_17",
            points: 1
        }
    },
    {
        step: '00:35:00',
        act: "Fin"
    }
]