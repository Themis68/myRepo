// cette variable est nécessaire ici mais aussi dans d'autres pages
// on ne peut pas éviter de la mettre ici donc
var myURLcomplete = document.location.href;
var myURL  = myURLcomplete.substring( 0 ,myURLcomplete.lastIndexOf( "/" ) );

// gestion des écrans
var screenParams = [
	{width:375, code:"xs-6"},
	{width:576, code:"sm-6"},
	{width:768, code:"md-4"},
	{width:991, code:"xl-3"}
];

// lois du jeu
var lois = [
	{num:1, libelle:"Terrain", fichier:"loi_01.pdf"},
	{num:2, libelle:"Ballon", fichier:"loi_02.pdf"},
	{num:3, libelle:"Joueurs", fichier:"loi_03.pdf"},
	{num:4, libelle:"Equipements", fichier:"loi_04.pdf"},
	{num:5, libelle:"Arbitre", fichier:"loi_05.pdf"},
	{num:6, libelle:"Autres arbitres", fichier:"loi_06.pdf"},
	{num:7, libelle:"Durée d'un match", fichier:"loi_07.pdf"},
	{num:8, libelle:"Coup d'envoi et reprise de jeu", fichier:"loi_08.pdf"},
	{num:9, libelle:"Ballon en jeu et hors du jeu", fichier:"loi_09.pdf"},
	{num:10, libelle:"Issue d'un match", fichier:"loi_10.pdf"},
	{num:11, libelle:"Hors-jeu", fichier:"loi_11.pdf"},
	{num:12, libelle:"Fautes et incorrections", fichier:"loi_12.pdf"},
	{num:13, libelle:"Coups francs", fichier:"loi_13.pdf"},
	{num:14, libelle:"Penalty", fichier:"loi_14.pdf"},
	{num:15, libelle:"Rentrée de touche", fichier:"loi_15.pdf"},
	{num:16, libelle:"Coup de pied de but", fichier:"loi_16.pdf"},
	{num:17, libelle:"Corner", fichier:"loi_17.pdf"}
];

function header() {
    url = calculURL(myURL);
    var myHeader='';

    myHeader+='<div class="col-12 col-sm-12 col-md-12 col-lg-12">';
    myHeader+='<img src="'+ url + '/images/isa.png" />&nbsp;&nbsp;';
    myHeader+='<span>ARRET SUR IMAGE !</span>';
    myHeader+='</div>';

    var e = document.querySelector('header');
    e.innerHTML = myHeader;
}

function footer() {
    url = calculURL(myURL);
    var myFooter='';

    myFooter+='<div class="col-lg-3 col-md-3 col-sm-3">';
    myFooter+='<span>Paulo Pires Seixas - v2.0.3&nbsp;'
    myFooter+='<a href="mailto:arretsurimage_@laposte.net?Subject=Prise de contact sur Arrêt sur image!" target="_blank">';
    myFooter+='<i class="fas fa-envelope"></i>';
    myFooter+='</a>';
    myFooter+='</span>';
    myFooter+='</div>';

    myFooter+='<div class="col-lg-1 col-md-1 col-sm-1">';
    myFooter+='<span><a href="'+url+'/aide/aide.html">Aide</a></span>';
    myFooter+='</div>';

    myFooter+='<div class="col-lg-1 col-md-1 col-sm-1">';
    myFooter+='<span><a href="'+url+'/licence/licence.html">Licence</a></span>';
    myFooter+='</div>';

    myFooter+='<div class="col-lg-1 col-md-1 col-sm-1">';
    myFooter+='<span><a href="'+url+'/src/video.html">Vidéo</a></span>';
    myFooter+='</div>';

    myFooter+='<div class="col-lg-1 col-md-1 col-sm-1">';
    myFooter+='<span><a href="'+url+'/src/quizz.html">Quizz</a></span>';
    myFooter+='</div>';

    myFooter+='<div class="col-lg-1 col-md-1 col-sm-1">';
    myFooter+='<span><a href="'+url+'/lois/lois.html">Lois du jeu</a></span>';
    myFooter+='</div>';

    myFooter+='<div class="col-lg-4 col-md-4 col-sm-4">';
    myFooter+='<span>Compatible Chrome v79 et +</span>';
    myFooter+='</div>';

    var e = document.querySelector('footer');
    e.innerHTML = myFooter;
}

function calculURL(url) {
    // traitement selon page courante
    url = url.replace("/aide","");
    url = url.replace("/lois","");
    url = url.replace("/licence","");
    url = url.replace("/questionnaires","");
    url = url.replace("/rencontres","");
    url = url.replace("/src","");
    
    return url;
}
