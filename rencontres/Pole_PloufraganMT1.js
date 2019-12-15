var script1 = [               
    {
        step: '00:00:05',
        act: "AllerA",
        niveau: "DEBUTANT",
        indice: "00:02:04"
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
            libelle: "L'arbitre assistant a indiqué que la touche est en faveur de l'équipe ?",
            reculReplay: 3
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
            indice: '00:10:04'
        },
        question: {
            libelle: "Comment l'arbitre autorise-t-il le soigneur à entrer sur le terrain ?"
        },
        attributs: ["Il lève le bras en direction du banc", "Il lève le bras en direction du banc et doit siffler"],
        reponse: {
            solution: 2,
            libelle: "le soigneur doit attendre que l'arbitre ait donné son accord pour qu'il intervienne",
            loi: "Loi_05",
            points: 1
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
            indice: '00:23:41'
        },
        question: {
            libelle: "Au vue de la gestuelle de l'arbitre, quelle a été la décision de l'arbitre sur cette situation ?"
        },
        attributs: ["Coup-franc indirect", "Avantage", "Coup-franc direct"],
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
        niveau: "EXPERT",
        saut: {
            attente: 3,
            indice: '00:32:32'
        },
        question: {
            libelle: "Selon vous, au vue de l'action, l'arbitre va-t-il :"
        },
        attributs: ["Siffler un coup-franc", "Laisser l'avantage"],
        reponse: {
            solution: 1,
            libelle: "L'arbitre estime qu'il y a bousculade en pleine course",
            pict: "arbitre/direct.png",
            loi: "Loi_13",
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
            indice: '00:31:54'
        },
        question: {
            libelle: "L'engagement est-il fait dans les règles ?",
        },
        attributs: ["Oui", "Non"],
        reponse: {
            solution: 2,
            libelle: "2 joueurs de la Ligue de Bretagne ont traversé la ligne de mi-terrain alors que le ballon n'a pas été déplacé",
            loi: "Loi_08",
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
        indice: '00:32:13'
    },
    {
        step: '00:32:17',
        act: "Bonus",
        niveau: "DEBUTANT",
        saut: {
            attente: 3,
            indice: '00:34:58'
        },
        question: {
            libelle: "Dans le cas de temps additionnel, l'arbitre doit :"
        },
        attributs: ["Jouer au minium ce temps", "Jouer au maximum ce temps"],
        reponse: {
            solution: 1,
            loi: "Loi_13",
            points: 3
        }
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
        attributs: ["L'arbitre peut siffler une faute", "L'arbitre n'a pas à en tenir compte"],
        reponse: {
            solution: 1,
            libelle: "L'arbitre assistant peut faire part de ses observations lorsqu'il estime être plus près de l'action que l'abitre ",
            pict: "arbitre/fauteassistant.png",
            loi: "Loi_13",
            points: 1
        }
    },
    {
        step: '00:35:00',
        act: "Fin"
    }
]