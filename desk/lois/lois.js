document.addEventListener("DOMContentLoaded", init, false);	

function init(){
    header();
    vignettesLois();
    footer();
}


function vignettesLois(){
    var myLois='';

    myLois+='<div class="container">';
    myLois+='<div class="row text-center text-lg-left">';

    for(let i=1; i<18; i++) {
        myLois+= '<div class="col-lg-2 col-md-2 col-sm-4">';
        myLois+='<a href="./images/Loi_'+ (i<10?'0'+i:i)+'.pdf" class="d-block mb-4 h-100" target="_blank">';
        myLois+='<img class="img-fluid img-thumbnail" src="./images/loi_'+ (i<10?'0'+i:i)+'.png" alt="">';
        myLois+='</a>';
        myLois+='</div>';
    }
    myLois+= '<div class="col-lg-2 col-md-2 col-sm-4">';
    myLois+= '<a href="https://lfhf.fff.fr" class="d-block mb-4 h-100" target="_blank">';
    myLois+= '<img class="img-fluid img-thumbnail" src="./images/lfhf.png" alt="">';
    myLois+= '</a>';
    myLois+= '</div>';

    myLois+= '</div></div>';

    var e = document.querySelector('vignettesLois');
    e.innerHTML = myLois;
}
