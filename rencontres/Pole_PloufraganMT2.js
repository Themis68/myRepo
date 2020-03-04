var script2 = [
    {
        step: '00:00:01',
        act: "AllerA",
        niveau: "DEBUTANT",
        indice: '00:08:43'
    },
    {
        step: '00:00:02',
        act: "Question",
        niveau: "CONFIRME",
        saut: {
            attente: 3,
            indice: '00:09:20'
        },
        question: {
            libelle: "Que doit vérifier l'arbitre juste avant l'engagement selon l'usage ?"
        },
        attributs: ["Il doit vérifier que les arbitres assistants et les gardiens sont prêts", "Il doit vérifier que les arbitres assistants sont prêts"],
        reponse: {
            solution: 1,
            points: 2
        }
    },
    {
        step: '00:00:03',
        act: "AllerA",
        niveau: "EXPERT",
        indice: '00:02:07'
    },
    {
        step: '00:02:10',
        act: "Bonus",
        niveau: "EXPERT",
        saut: {
            attente: 5,
            indice: '00:17:08'
        },
        question: {
            libelle: "Lors de l'exécution d'un coup de pied de but, un partenaire peut-il jouer le ballon avant que celui-ci soit sorti de la surface de réparation ?"
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
            libelle: "1 joueur de l'équipe qui engage a franchi la ligne médiane, alors que la ballon n’a pas encore été botté",
            loi: "Loi_08",
            points: 2
        }
    },
    {
        step: '00:09:23',
        act: "Question",
        niveau: "CONFIRME",
        saut: {
            attente: 5,
            indice: '00:14:32'
        },
        question: {
            libelle: "L'arbitre vient de siffler une faute. Laquelle selon vous ?"
        },
        attributs: ["charge irrégulière dans le dos", "tirage de maillot"],
        reponse: {
            solution: 2,
            loi: "Loi_13",
            points: 1
        }
    },
    {
        step: '00:12:38',
        act: "Question",
        niveau: "DEBUTANT",
        saut: {
            attente: 1,
            indice: '00:21:10'
        },
        question: {
            libelle: "Sur cette situation de jeu, que signalent les arbitres ? "
        },
        attributs: ["Coup de pied de but (5,50m)", "un corner"],
        reponse: {
            solution: 2,
            libelle: "Sur cette action le ballon ayant franchi la ligne de but de peu. L’arbitra assistant signale la sortie du ballon en levant le drapeau, pour alerter l’arbitre central puis en indique le point de corner.",
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
            attente: 1,
            indice: '00:21:10'
        },
        question: {
            libelle: "A quoi correspond le geste de l'arbitre ?"
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
        step: '00:17:14',
        act: "Question",
        niveau: "EXPERT",
        saut: {
            attente: 3,
            indice: '00:19:56'
        },
        question: {
            libelle: "Sur une passe en retrait volontaire à son gardien, si le gardien touche le ballon avec les mains, quelle est la décision ?"
        },
        attributs: ["CFI à l'endroit où le gardien touche le ballon des mains","Penalty","CFD à l'endroit où le gardien touche le ballon des mains"],
        reponse: {
            solution: 1,
            libelle: "Dans le cas où le gardien touche le ballon avec les mains, dans sa surface de but. Le coup franc indirect sera exécuté sur la ligne de but au plus près où gardien aura touché le ballon",
            loi: "Loi_13",
            points: 1
        }
    },
    {
        step: '00:20:00',
        act: "Question",
        niveau: "EXPERT",
        saut: {
            attente: 1,
            indice: '00:21:10'
        },
        question: {
            libelle: "Selon vous, quelle faute siffle l'arbitre ?",
            reculReplay: 3
        },
        attributs: ["charge sur le gardien", "contact avec le défenseur", "hors-jeu"],
        reponse: {
            solution: 3,
            pict: "arbitre/hors-jeu.png",
            loi: "Loi_11",
            points: 2
        }
    },
    {
        step: '00:21:15',
        act: "Fin"
    }
]