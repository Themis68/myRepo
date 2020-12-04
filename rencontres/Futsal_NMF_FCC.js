var script3 = [  
    {
        step: "00:00:07",
        act: "AllerA",
        niveau: "DEBUTANT",
        indice: "00:00:15"
    },     
    {
        step: "00:00:09",
        act: "AllerA",
        niveau: "CONFIRME",
        indice: "00:03:00"
    },  
    {
        step: "00:00:17",
        act: "Question",
        niveau: "DEBUTANT",
        saut: {
            attente: 2,
            indice: '00:03:14'
        },
        question: {
            libelle: "Le but est-il accepté ?"
        },
        attributs: ["Oui","Non"],
        reponse: {
            solution: 1,
            libelle: "L'arbitre confirme en indiquant le centre du terrain",
            pict: "arbitre/sortiebut.png",
            points: 1
        }
    },
    {
        step: "00:03:02",
        act: "Question",
        niveau: "CONFIRME",
        saut: {
            attente: 3,
            indice: '00:03:14'
        },
        question: {
            libelle: "Y-a-t-il une faute de main ?",
            reculReplay: 2
        },
        attributs: ["Oui","Non"],
        reponse: {
            solution: 2,
            libelle: "Le joueur laisse son bras le long du corps",
            points: 1
        }
    },
    {
        step: "00:03:12",
        act: "Fin"
    }
]