var scenario = [
    [
        {
            id: 4,
            rencontre: "Mouzillon/Les Herbiers",
            poster: "EM_Herbiers.png",
            fichier: "EM_Herbiers.mp4",
            description: "Match amical opposant Mouzillon aux Herbiers",
            gauche: {
                nom: "Les Herbiers",
                fanion: "EM_Herbiers.png",
                site: "https://www.vendeelesherbiersfootball.fr/pages/index.php",
                maillotCouleur: "rgb(120, 83, 52)"
            },
            droite: {
                nom: "Etoile Mouzillon",
                fanion: "EMouz.png",
                site: "https://etoile-mouzillon.footeo.com",
                maillotCouleur: "rgb(255, 255, 255)"
            }
        },
        [               
            {
                step: '00:00:05',
                act: "Question",
                niveau: "DEBUTANT",
                question: {
                    libelle: "Quelle règle liée à l'équipement des joueurs n'est pas respectée ?"
                },
                attributs: ["les maillots doivent êtres dans les shorts", "Les cuissardes doivent êtres de la couleur dominante du short"],
                reponse: {
                    solution: 1,
                    libelle: "Plusieurs joueurs blancs n'ont pas le maillot dans le short",
                    loi: "Loi_04",
                    points: 1
                }
            }
        ]
    ]
]