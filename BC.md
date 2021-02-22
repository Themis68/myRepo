# installation match

## les éléments à fournir :

- fanion : taille et format ?
- Couleur maillot : codage RGB
- Vidéo du match

## Elements de la vidéo

### Structure pour une équipe :

{
    type: "equipe",
    id:"vjs-bug-EquipeA",
    visibility: true,
    opacity: 1,
    left: "30px",
    top: "25px",
    position: 'tl',
    link: video[0].gauche.site,
    paddingInterne: "3px"

    idFanion:"vjs-bug-pictEquipeA",
    imgSrc: pathImages + "fanions/" + (video[0].gauche.fanion || 'fff.png'),
    alt: video[0].gauche.nom  || "fanion par défaut",

    idTitre:"vjs-bug-titreEquipeA",
    libelle: "<span>"+ video[0].gauche.nom +"</span>",
    classeCSSText: "vjs-bug-titreBug",

    idCanvas:"vjs-bug-silhEquipeA",
    classeCSSCanvas: "vjs-bug-silhBug",
}
