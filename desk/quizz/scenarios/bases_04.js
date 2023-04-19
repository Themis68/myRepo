var version = "1.0.0";

var script4 = [               
    {
        number: 1,
        niveau: 1,
        question: {
            libelle: "Quelle taille de ballon est autorisée ?",
            attributs: ["Taille 3","Taille 4","Taille 3 ou 4","Taille libre"]
        },
        reponse: {
            solution: 3,
            loi: 2,
            points: 1
        }
    },
    {
        number: 2,
        niveau: 1,
        question: {
            libelle: "Quelle est le temps de jeu total à ne pas dépasser lors du plateau ?",
            attributs: ["50 min","40 min","30 min","20 min"]
        },
        reponse: {
            solution: 1,
            loi: 7,
            points: 1
        }
    },
    {
        number: 3,
        niveau: 1,
        question: {
            libelle: "Quel est le nombre de remplaçants maximum ?",
            attributs: ["1","2","3","5"]
        },
        reponse: {
            solution: 2,
            loi: 3,
            points: 1
        }
    },
    {
        number: 4,
        niveau: 1,
        question: {
            libelle: "Qui peut arbitrer en priorité ces matchs ?",
            attributs: ["u15-u16","les joueurs eux-mêmes","encadrant ou responsable d'équipe","Séniors"]
        },
        reponse: {
            solution: 2,
            loi: 5,
            points: 4
        }
    },
    {
        number: 5,
        niveau: 1,
        question: {
            libelle: "Où se situe la zone de hors-jeu ?",
            attributs: ["Surface de réparation","Milieu de terrain","Zone de but","Il n'y en a pas"]
        },
        reponse: {
            solution: 4,
            loi: 11,
            points: 2
        }
    },
    {
        number: 6,
        niveau: 1,
        question: {
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
        number: 7,
        niveau: 1,
        question: {
            libelle: "A quelle distance doivent se trouver les adversaires lors d'un coup-franc direct ?",
            attributs: ["4 m","5 m","6 m","9 m 15"]
        },
        reponse: {
            solution: 1,
            loi: 13,
            points: 2
        }
    },
    {
        number: 8,
        niveau: 1,
        question: {
            libelle: "Où doit-on positionner le ballon lors d'un coup de pied de but ?",
            attributs: ["A 5 m","A 6 m","Sur le point de Penalty","Position libre dans la surface de réparation"]
        },
        reponse: {
            temps: 15,
            solution: 2,
            loi: 16,
            points: 4
        }
    },
    {
        number: 9,
        niveau: 1,
        question: {
            libelle: "A quelle distance du but se trouve le point de Penalty ?",
            attributs: ["6 m","9 m","9 m 15","11 m"]
        },
        reponse: {
            solution: 1,
            loi: 14,
            points: 2
        }
    },
    {
        number: 10,
        niveau: 1,
        question: {
            libelle: "Dans quel cas un arbitre peut-il revenir sur une décision ?",
            attributs: ["Jamais","Seulement s'il s'agit d'un but accordé par erreur","Seulement si le jeu n'a pas repris","seulement sur suggestion de l'arbitre assistant"]
        },
        reponse: {
            temps: 15,
            solution: 3,
            loi: 5,
            points: 5
        }
    }
]