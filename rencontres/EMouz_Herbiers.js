var script2 = [             
    {
        step: '00:00:03',
        act: "AllerA",
        niveau: "CONFIRME",
        indice: "00:00:28"
    },
    {
        step: '00:00:05',
        act: "Question",
        niveau: "DEBUTANT",
        question: {
            libelle: "Selon vous y-a-t-il hors-jeu des blanches ? "
        },
        attributs: ["Oui", "Non"],
        reponse: {
            solution: 1,
            libelle: "L'arbitre assistant signale que la joueuse de l'équipe Blanche qui reçoit le ballon est en position de hors-jeu",
            points: 1,
            pict: "arbitre/hors-jeu.png",
            loi: "Loi_11"
        }
    },
    {
        step: '00:00:15',
        act: "Bonus",
        niveau: "DEBUTANT",
        saut: {
            attente: 3,
            indice: '00:05:32'
        },
        question: {
            libelle: "Quel est le carton que sort l'arbitre lorsqu'il expulse un joueur? "
        },
        attributs: ["Jaune", "Rouge", "Blanc", "Vert"],
        reponse: {
            solution: 2,
            points: 1,
            loi: "Loi_11"
        }
    },
    {
        step: '00:00:36',
        act: "Question",
        niveau: "CONFIRME",
        saut: {
            attente: 5,
            indice: '00:05:32'
        },
        question: {
            libelle: "Que va proposer l'arbitre sur cette faute sifflée ? "
        },
        attributs: ["Coup-Franc direct", "Coup-Franc indirect","Balle à terre"],
        reponse: {
            solution: 1,
            libelle: "L'arbitre lève le bras pour signaler la faute. Puis le baisse pour indiquer le caractère direct du coup-franc",
            pict: "arbitre/direct.png",
            points: 2,
            loi: "Loi_11"
        }
    },
    {
        step: '00:05:36',
        act: "Fin"
    }
]