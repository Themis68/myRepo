document.addEventListener("DOMContentLoaded", init, false);	
 
function init() {
    // mise en place de l'écoute des onglets
    var menuButton = document.getElementsByClassName("nav-link");
    for (var i = 0 ; i < menuButton.length; ++i)
    {
        attach_event(menuButton[i]);
    }
}

function attach_event(c) {
    // on actice le LISTENER sur un objet
    c.addEventListener("touchstart", function(){ gestContent(c.innerHTML) }, false);
}

function gestContent(c) {
    // on rend active le menu et les éléments liés en fonction du clic
    document.querySelector("footer span").innerHTML = c;  
    
    content = document.getElementsByClassName("onglet");
    btnMenu = document.getElementsByClassName("nav-link");
    onglet = document.getElementsByClassName("nav-item");
    
    for(var i = 0; i < content.length; i++) {
        if (content[i].id === c) {
            content[i].className = 'onglet active';
            btnMenu[i].className = 'nav-link active';
            onglet[i].className = 'nav-item active';
        } else {
            content[i].className = 'onglet';
            btnMenu[i].className = 'nav-link';
            onglet[i].className = 'nav-item';
        }
    }
}




/*
document.addEventListener("DOMContentLoaded", init, false);	

function init() {

    if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
        document.addEventListener("click", initSP, false);
       /*
        document.write('<a id="init" ontouchstart="javascript:sndInit();">click</a>');

        function sndInit(){
            snd.play();
            snd.pause();
            document.getElementById('init').style.display = 'none';
            }
    }
    
}

function initSP() {
    document.write('<p>hello</p>');
}

function playSound(soundObj) {
    var sound = document.getElementById(soundObj);
    sound.play();
}
*/