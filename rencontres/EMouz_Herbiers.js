var script2 = [             
    {
        step: '00:00:03',
        act: "allerA",
        niveau: "CONFIRME",
        indice: "00:00:18"
    },
    {
        step: '00:00:05',
        act: "question",
        niveau: "DEBUTANT",
        saut: {
            attente: 3,
            indice: '00:00:11'
        },
        question: {
            libelle: "Selon vous y-a-t-il hors-jeu des blanches ? "
        },
        attributs: ["Oui", "Non"],
        reponse: {
            solution: 1,
            libelle: "La joueuse de l'équipe Blanche qui reçoit le ballon est en position de hors-jeu",
            points: 1,
            loi: "Loi_11"
        }
    },
    {
        step: '00:00:15',
        act: "bonus",
        niveau: "DEBUTANT",
        saut: {
            attente: 3,
            indice: '00:05:32'
        },
        question: {
            libelle: "Quel est le carton que sort l'arbitre lorsqu'il autorise le soigneur à entrer ? "
        },
        attributs: ["A", "C", "F", "D"],
        reponse: {
            solution: 4,
            libelle: "L'arbitre peut également lever le bras en direction du banc de touche",
            points: 2,
            loi: "Loi_11",
            pict: "cartons.png",
        }
    },
    {
        step: '00:00:21',
        act: "question",
        niveau: "CONFIRME",
        saut: {
            attente: 3,
            indice: '00:05:32'
        },
        question: {
            libelle: "QLe but n'est pas validé. Pour quelle raison ? "
        },
        attributs: ["Charge sur défenseur", "Position de hors-jeu", "Main"],
        reponse: {
            solution: 2,
            libelle: "La joueuse de l'équipe Blanche qui transmet le ballon du but est en position de hors-jeu.",
            points: 2,
            loi: "Loi_11"
        }
    },
    {
        step: '00:05:36',
        act: "fin"
    }
]