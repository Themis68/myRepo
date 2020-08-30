function footer() {
    var myURLcomplete = document.location.href;
    var myURL  = myURLcomplete.substring( 0 ,myURLcomplete.lastIndexOf( "/" ) );
    myURL = myURL.replace("/src","");

    console.log(myURL);
    var myFooter='';

    myFooter+='<div class="col-lg-3 col-md-3 col-sm-3">';
    myFooter+='<span>Paulo Pires Seixas - v2.0.2&nbsp;'
    myFooter+='<a href="mailto:arretsurimage_@laposte.net?Subject=Prise de contact sur Arrêt sur image!" target="_blank">';
    myFooter+='<i class="fas fa-envelope"></i>';
    myFooter+='</a>';
    myFooter+='</span>';
    myFooter+='</div>';

    myFooter+='<div class="col-lg-1 col-md-1 col-sm-1">';
    myFooter+='<span><a href="'+myURL+'/aide.html">Aide</a></span>';
    myFooter+='</div>';

    myFooter+='<div class="col-lg-1 col-md-1 col-sm-1">';
    myFooter+='<span><a href="'+myURL+'/src/asi.html">Licence</a></span>';
    myFooter+='</div>';

    myFooter+='<div class="col-lg-1 col-md-1 col-sm-1">';
    myFooter+='<span><a href="'+myURL+'/src/video.html">Vidéo</a></span>';
    myFooter+='</div>';

    myFooter+='<div class="col-lg-1 col-md-1 col-sm-1">';
    myFooter+='<span><a href="'+myURL+'/src/quizz.html">Quizz</a></span>';
    myFooter+='</div>';

    myFooter+='<div class="col-lg-1 col-md-1 col-sm-1">';
    myFooter+='<span><a href="'+myURL+'/src/lois.html">Lois du jeu</a></span>';
    myFooter+='</div>';

    myFooter+='<div class="col-lg-4 col-md-4 col-sm-4">';
    myFooter+='<span>Compatible Chrome v79 et +</span>';
    myFooter+='</div>';

    var e = document.querySelector('footer');
    e.innerHTML = myFooter;
}


