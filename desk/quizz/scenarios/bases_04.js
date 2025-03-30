var version = "1.0.2";

var script4 = [               
    {
        number: 1,
        niveau: 1,
        question: {
            temps: 15,
            libelle: "Quelle taille de ballon est autorisée ?",
            attributs: ["Taille 3","Taille 4","Taille 3 ou 4","Taille libre"]
        },
        reponse: {
            temps: 15,
            solution: 3,
            loi: 2,
            points: 1
        }
    },
    {
        number: 2,
        niveau: 1,
        question: {
            temps: 15,
            libelle: "Quelle est le temps de jeu total à ne pas dépasser lors du plateau ?",
            attributs: ["50 min","40 min","30 min","20 min"]
        },
        reponse: {
            temps: 15,
            solution: 1,
            loi: 7,
            points: 1
        }
    },
    {
        number: 3,
        niveau: 1,
        question: {
            temps: 15,
            libelle: "Quel est le nombre de remplaçants maximum sur la feuille de match  ?",
            attributs: ["1","2","3","5"]
        },
        reponse: {
            temps: 15,
            solution: 2,
            loi: 3,
            points: 1
        }
    },
    {
        number: 4,
        niveau: 1,
        question: {
            temps: 15,
            libelle: "Où se situe la zone de hors-jeu ?",
            attributs: ["Surface de réparation","Milieu de terrain","Zone de but","Il n'y en a pas"]
        },
        reponse: {
            temps: 15,
            solution: 4,
            loi: 11,
            points: 2
        }
    },
    {
        number: 5,
        niveau: 1,
        question: {
            temps: 15,
            libelle: "Quelle sanction n'existe pas au foot à 5 ?",
            attributs: ["Coup-franc indirect","Coup-franc direct","Penalty","Remise en jeu"]
        },
        reponse: {
            temps: 15,
            solution: 1,
            loi: 12,
            points: 4
        }
    },
    {
        number: 6,
        niveau: 1,
        question: {
            temps: 15,
            libelle: "A quelle distance doivent se trouver les adversaires lors d'un coup-franc direct ?",
            attributs: ["4 m","5 m","6 m","9 m 15"]
        },
        reponse: {
            temps: 15,
            solution: 1,
            loi: 13,
            points: 2
        }
    },
    {
        number: 7,
        niveau: 1,
        question: {
            temps: 15,
            libelle: "Où doit-on positionner le ballon lors d'un coup de pied de but ?",
            attributs: ["5 m","6 m","Point de Penalty","Dans la surface de réparation"]
        },
        reponse: {
            temps: 15,
            solution: 4,
            loi: 16,
            points: 4
        }
    },
    {
        number: 8,
        niveau: 1,
        question: {
            temps: 15,
            libelle: "A quelle distance doivent se trouver les adversaires lors d'une remise en touche ?",
            attributs: ["2 m","4 m","6 m","9 m 15"]
        },
        reponse: {
            temps: 15,
            solution: 1,
            loi: 15,
            points: 5
        }
    }
]