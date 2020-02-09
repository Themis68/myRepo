var scenario = [
    [
        {
            id: 5,
            rencontre: "CBAF / Metz",
            poster: "CBAF_Metz.png",
            fichier: "CBAF_Metz.mp4",
            description: "Match amical opposant Croix-Blanche à Metz",
            gauche: {
                nom: "Croix-Blanche",
                fanion: "cbaf.png",
                site: "https://www.enavantbaugeois.net",
                maillotCouleur: "rgb(255, 152, 117)"
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
                step: '00:00:01',
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