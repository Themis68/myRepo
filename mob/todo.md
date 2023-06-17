1 - catalogue.js

Ce fichier contient la liste des quizz avec leurs caractéristiques

var scenario = [
    {
        quizz 1
    },
        {
        quizz n
    }
]

1.1 - chaque quizz est structuré comme suit :

{
    id: 1,                                            identifiant du quizz
    titre: "Contrôle des connaissances",              titre affiché du quizz
    fichier: "1968754A1.js",                          nom du fichier ayant les questions du quizz
    multilangue: "false",                             indique si le quizz est dans plusieurs langues disponibles
    variable: "script",                               utilisé seulement pour la version desktop (DEPRICATED dans une version à venir)
    description: "Ensemble des lois (séance 1)",      description affichée du quizz
    niveau: 1,                                        niveau de difficulté (1: débutant, 2 confirmé, 3 expert)
    temps: 12                                         transféré vers le fichier des questions (DEPRICATED dans une version à venir)
}


