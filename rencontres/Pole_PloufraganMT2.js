var script2 = [
    {
        step: '00:00:01',
        act: "Question",
        niveau: "CONFIRME",
        saut: {
            attente: 3,
            indice: '00:00:35'
        },
        question: {
            libelle: "Que doit vérifier l'arbitre juste avant l'engagement ?"
        },
        attributs: ["Il doit vérifier que les arbitres assistants et les gardiens sont prêts", "Il doit vérifier que les arbitres assistants sont prêts"],
        reponse: {
            solution: 1,
            loi: "Loi_08",
            points: 2
        }
    },
    {
        step: '00:00:11',
        act: "AllerA",
        niveau: "EXPERT",
        indice: '00:02:07'
    },
    {
        step: '00:00:08',
        act: "Question",
        niveau: "DEBUTANT",
        saut: {
            attente: 3,
            indice: '00:08:40'
        },
        question: {
            libelle: "L'engagement est-il fait dans les règles ?",
            reculReplay: 3
        },
        attributs: ["Oui", "Non"],
        reponse: {
            solution: 1,
            loi: "Loi_08",
            points: 2
        }
    },
    {
        step: '00:00:56',
        act: "Question",
        niveau: "CONFIRME",
        saut: {
            attente: 10,
            indice: '00:09:16'
        },
        question: {
            libelle: "Au vue de la situation, l'arbitre va-til ?"
        },
        attributs: ["Siffler un CDI", "dégagement en 6 mètres", "Arrête le jeu et mettre une balle entre deux"],
        reponse: {
            solution: 3,
            libelle: "l'arbitre revient sur sa decision d'avantage pour vérifier l'état des joueurs suite à ce contact",
            loi: "Loi_13",
            points: 2
        }
    },
    {
        step: '00:02:11',
        act: "Bonus",
        niveau: "EXPERT",
        saut: {
            attente: 5,
            indice: '00:08:08'
        },
        question: {
            libelle: "Lors de l'exécution d'un coup de pied de but par le gardien, un partenaire peut-il jouer le ballon avant que celui-ci soit sorti de la surface de réparation ?"
        },
        attributs: ["Oui", "Non, tous les joueurs doivent se trouver à l'extérieur de la surface"],
        reponse: {
            solution: 1,
            libelle: "Modification des lois du jeu 2019/2020",
            loi: "Loi_16",
            points: 2
        }
    },
    {
        step: '00:08:12',
        act: "Question",
        niveau: "EXPERT",
        saut: {
            attente: 5,
            indice: '00:09:12'
        },
        question: {
            libelle: "Comment l'arbitre doit-il notifier que le but est accordé après que le ballon ait pénétré dans le but ?"
        },
        attributs: ["L'arbitre indique le rond central et doit obligatoirement siffler", "L'arbitre indique le rond central sans obligatoirement siffler"],
        reponse: {
            solution: 2,
            loi: "Loi_08",
            points: 2
        }
    },
    {
        step: '00:08:46',
        act: "Question",
        niveau: "DEBUTANT",
        saut: {
            attente: 3,
            indice: '00:12:32'
        },
        question: {
            libelle: "L'engagement est-il fait dans les règles ?",
            reculReplay: 3
        },
        attributs: ["Oui", "Non"],
        reponse: {
            solution: 2,
            libelle: "1 joueur de l'équipe qui engage a traversé la ligne de mi-terrain alors que le ballon n'a pas été déplacé",
            loi: "Loi_08",
            points: 2
        }
    },
    {
        step: '00:09:17',
        act: "Question",
        niveau: "EXPERT",
        saut: {
            attente: 5,
            indice: '00:12:25'
        },
        question: {
            libelle: "Sur la situation présentée, le coup-franc est-il joué régulièrement ?",
            reculReplay: 3
        },
        attributs: ["Oui, si le joueur joue rapidement", "le joueur doit attendre que les joueurs adverses soient à 9m15"],
        reponse: {
            solution: 1,
            loi: "Loi_13",
            points: 3
        }
    },
    {
        step: '00:09:21',
        act: "Question",
        niveau: "CONFIRME",
        saut: {
            attente: 5,
            indice: '00:14:32'
        },
        question: {
            libelle: "L'arbitre vient de siffler une faute. Laquelle selon vous ?"
        },
        attributs: ["Poussette dans le dos", "Tirage de maillot"],
        reponse: {
            solution: 2,
            loi: "Loi_13",
            points: 1
        }
    },
    {
        step: '00:12:30',
        act: "Question",
        niveau: "EXPERT",
        saut: {
            attente: 3,
            indice: '00:15:34'
        },
        question: {
            libelle: "Sur la situation présentée l'arbitre siffle faute alors que le joueur allait se présenter seul face au gardien, quelle sera la décision ?",
            reculReplay: 3
        },
        attributs: ["Exclusion du joueur", "Avertissement au joueur"],
        reponse: {
            solution: 1,
            pict: "cartons.png",
            loi: "Loi_12",
            points: 2
        }
    },
    {
        step: '00:12:38',
        act: "Question",
        niveau: "DEBUTANT",
        saut: {
            attente: 3,
            indice: '00:17:40'
        },
        question: {
            libelle: "Quelle situation indique l'arbitre ?"
        },
        attributs: ["un sortie de but", "un corner"],
        reponse: {
            solution: 2,
            libelle: "L'arbitre assistant signale la sortie de jeu en levant son bras puis dirige son bras son bras vers le coin de corner",
            pict: "arbitre/corner.png",
            loi: "Loi_17",
            points: 1
        }
    },
    {
        step: '00:14:35',
        act: "Question",
        niveau: "CONFIRME",
        saut: {
            attente: 3,
            indice: '00:20:55'
        },
        question: {
            libelle: "A quoi correspoind le geste de l'arbitre ?"
        },
        attributs: ["Pause fraicheur", "remplacement de joueur autorisé", "rappel au calme sur le banc"],
        reponse: {
            solution: 2,
            libelle: "L'arbitre assistant signale la demande de remplacement de la même façon",
            pict: "arbitre/remplacement.png",
            loi: "Loi_03",
            points: 2
        }
    },
    {
        step: '00:15:39',
        act: "Question",
        niveau: "EXPERT",
        saut: {
            attente: 8,
            indice: '00:17:10'
        },
        question: {
            libelle: "Sur la situation présentée l'arbitre siffle. Selon vous pourquoi ?",
            reculReplay: 3
        },
        attributs: ["Il décide que la touche est pour l'autre équipe", "La touche n'est pas jouée au point de sortie"],
        reponse: {
            solution: 2,
            loi: "Loi_15",
            points: 2
        }
    },
    {
        step: '00:17:14',
        act: "Question",
        niveau: "EXPERT",
        saut: {
            attente: 3,
            indice: '00:19:50'
        },
        question: {
            libelle: "Sur une passe en retrait volontaire à son gardien, si le gardien touche le ballon avec les mains, quelle est la décision ?"
        },
        attributs: ["CFI à l'endroit où le gardien touche le ballon des mains","Penalty","CFD à l'endroit où le gardien touche le ballon des mains"],
        reponse: {
            solution: 1,
            loi: "Loi_13",
            points: 1
        }
    },
    {
        step: '00:17:45',
        act: "Question",
        niveau: "DEBUTANT",
        saut: {
            attente: 3,
            indice: '00:20:55'
        },
        question: {
            libelle: "A quoi correspond le geste de l'arbitre ?"
        },
        attributs: ["remplacement de joueur autorisé", "rappel au calme sur le banc"],
        reponse: {
            solution: 1,
            libelle: "L'arbitre assistant signale la demande de remplacement de la même façon",
            pict: "arbitre/remplacement.png",
            loi: "Loi_03",
            points: 2
        }
    },
    {
        step: '00:20:00',
        act: "Question",
        niveau: "EXPERT",
        saut: {
            attente: 12,
            indice: '00:20:55'
        },
        question: {
            libelle: "Selon vous, quelle faute siffle l'arbitre ?",
            reculReplay: 3
        },
        attributs: ["Charge sur le gardien", "Contact avec le défenseur", "Hors-jeu"],
        reponse: {
            solution: 3,
            libelle: "L'arbitre assistant signale le hors-jeu (hors vidéo)",
            pict: "arbitre/hors-jeu.png",
            loi: "Loi_11",
            points: 2
        }
    },
    {
        step: '00:21:00',
        act: "Fin"
    }
]