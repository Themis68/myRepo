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
            libelle: "Quelle usage lié à l'équipement des joueurs n'est pas respecté ?"
        },
        attributs: ["les maillots doivent être dans les shorts", "Les chaussettes doivent être de la même couleur que le maillot"],
        reponse: {
            solution: 1,
            libelle: "Plusieurs joueurs blancs n'ont pas le maillot dans le short. Ce n'est pas une loi mais un usage donc pas obligatoiremment signalé par l'arbitre",
            points: 1
        }
    },
    {
        step: '00:00:07',
        act: "AllerA",
        niveau: "CONFIRME",
        indice: "00:03:15"
    },            
    {
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
            libelle: "L'arbitre assistant a indiqué que la touche est en faveur de l'équipe (aidez-vous des silhouettes sur la vidéo)?",
            reculReplay: 2
        },
        attributs: ["Ligue Pays De la Loire", "Ligue de Bretagne"],
        reponse: {
            solution: 2,
            pict: "touche.png",
            libelle: "L'arbitre assistant positionne son drapeau en direction du camps qui a touché le ballon en dernier ",
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
            indice: '00:07:58'
        },
        question: {
            libelle: "L'arbitre utilise une gestuelle pour indiquer",
            reculReplay: 3
        },
        attributs: ["une faute", "une situation d'avantage"],
        reponse: {
            solution: 2,
            libelle: "En plus de la gestuelle l'arbitre peut compléter en criant 'avantage'",
            pict: "avantage.png",
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
            indice: '00:10:03'
        },
        question: {
            libelle: "Dans quel cas l’arbitre autorisera le soigneur à entrer sur le terrain ?"
        },
        attributs: ["Dès qu’un joueur ou joueuse est au sol", "Dès qu’il l’estimera nécessaire, après avoir demandé au joueur ou à la joueuse, s’il ou si elle souhaite cette intervention"],
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
        niveau: "CONFIRME",
        saut: {
            attente: 5,
            indice: '00:13:00'
        },
        question: {
            libelle: "L'arbitre siffle un coup-franc. Sa gestuelle indique qu'il s'agit d'un :",
            reculReplay: 3
        },
        attributs: ["coup-franc direct", "coup-franc indirect"],
        reponse: {
            solution: 1,
            libelle: "L'arbitre garde le bras levé jusqu'à l'exécution du coup-franc s'il s'agit d'un coup-franc indirect",
            pict: "direct.png",
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
            libelle: "L'arbitre central siffle un coup-franc. Comment l'arbitre assistant a-t-il appuyé la décision de l’arbitre central ?",
            reculReplay: 2
        },
        attributs: ["En levant et en agitant légèrement son drapeau puis en indiquant le sens de la faute", "En levant son drapeau et en le secouant"],
        reponse: {
            solution: 1,
            libelle: "L'arbitre assistant peut signaler à l'arbitre des fautes s'il estime être le plus près de l'action. L'arbitre central garde la décision finale.",
            pict: "fauteassistant.png",
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
            libelle: "A la vue de la gestuelle de l'arbitre, quelle a été sa décision sur cette situation ?",
            reculReplay: 3
        },
        attributs: ["coup-franc", "laisse jouer"],
        reponse: {
            solution: 2,
            libelle: "L'arbitre estime qu'il n'y a pas faute et crie 'jouer'",
            pict: "avantage.png",
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
        reponse: {
            solution: 1,
            libelle: "L'arbitre estime qu'il y a charge irrégulière ",
            pict: "direct.png",
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
            indice: "00:23:40"
        },
        question: {
            libelle: "Quelle est la décision de l'arbitre ?",
            reculReplay: 3
        },
        attributs: ["corner", "dégagement coup de pied de but (env. 5,50m)"],
        reponse: {
            solution: 2,
            libelle: "L’arbitre indique avec son bras que le dégagement doit avoir lieu à hauteur de la ligne des 5,50 mètres, familièrement appelé « 6 mètres »",
            pict: "sortiebut.png",
            loi: "Loi_16",
            points: 1
        }
    },
    {
        step: '00:23:45',
        act: "Information",
        niveau: "DEBUTANT",
        libelle: "1:0",
        type: 'but',
        saut: {
            attente: 3,
            indice: "00:24:12"
        }
    },
    {
        step: '00:24:16',
        act: "Question",
        niveau: "DEBUTANT",
        saut: {
            attente: 3,
            indice: "00:24:47"
        },
        question: {
            libelle: "L'engagement est-il fait dans les règles ?"
        },
        attributs: ["Oui", "Non"],
        reponse: {
            solution: 2,
            libelle: "2 joueurs de l'équipe adverse ont franchi la ligne médiane, alors que la ballon n’a pas encore été botté",
            loi: "Loi_08",
            points: 2
        }
    },
    {
        step: '00:24:51',
        act: "Information",
        niveau: "DEBUTANT",
        libelle: "1:1",
        type: 'but',
        saut: {
            attente: 4,
            indice: "00:25:18"
        }
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
            libelle: "Le joueur n°11 de l'équipe qui engage a franchi la ligne médiane, alors que la ballon n’a pas encore été botté »",
            loi: "Loi_08",
            points: 1
        }
    },
    {
        step: '00:25:58',
        act: "Information",
        niveau: "DEBUTANT",
        libelle: "2:1",
        type: 'but',
        saut: {
            attente: 4,
            indice: "00:31:52"
        }
    },
    {
        step: '00:31:58',
        act: "Information",
        niveau: "DEBUTANT",
        libelle: "l'arbitre s'enquiert de l'état du/des joueur(s) lorsqu'il y a un contact",
        type: 'fairplay',
        saut: {
            attente: 10,
            indice: "00:34:03"
        }
    },
    {
        step: '00:32:36',
        act: "Question",
        niveau: "CONFIRME",
        saut: {
            attente: 1,
            indice: '00:35:13'
        },
        question: {
            libelle: "L'arbitre assistant lève son drapeau et signale une faute"
        },
        attributs: ["l’arbitre suit son assistant", "l’arbitre ne suit pas son assistant"],
        reponse: {
            solution: 1,
            libelle: "L’arbitre assistant peut faire signaler une faute s’il estime qu’il est plus près de l’action pour juger que l’arbitre central",
            pict: "fauteassistant.png",
            loi: "Loi_13",
            points: 1
        }
    },
    {
        step: '00:34:07',
        act: "Information",
        niveau: "DEBUTANT",
        libelle: "L'arbitre explique la sanction au joueur fautif pour calmer le jeu",
        type: 'fairplay',
        saut: {
            attente: 10,
            indice: "00:34:31"
        }
    },
    {
        step: '00:34:30',
        act: "Question",
        niveau: "EXPERT",
        saut: {
            attente: 7,
            indice: '00:35:13'
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
        attributs: ["respecter la distance","respecter la distance et faire attention de ne pas commettre de main"],
        reponse: {
            solution: 2,
            libelle: "Les joueurs formant le mur doivent rester la distance réglementaire 9,15m jusqu’au botté du coup-franc, et ne pas lever leurs bras au-dessus de ligne d’épaule au risque d’entrainer un pénalty, le mur étant dans la surface de réparation",
            loi: "Loi_13",
            points: 2
        }
    },
    {
        step: '00:34:46',
        act: "Question",
        niveau: "DEBUTANT",
        saut: {
            attente: 1,
            indice: '00:34:50'
        },
        question: {
            libelle: "Quelle situation indique l'arbitre ?"
        },
        attributs: ["un coup de pied de but ", "un corner"],
        reponse: {
            solution: 2,
            libelle: "L'arbitre lève son bras vers le point de corner",
            loi: "Loi_17",
            points: 1
        }
    },    
    {
        step: '00:34:52',
        act: "Bonus",
        niveau: "DEBUTANT",
        saut: {
            attente: 3,
            indice: '00:35:13'
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
        step: '00:35:15',
        act: "Fin"
    }
]