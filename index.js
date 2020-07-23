document.addEventListener("DOMContentLoaded", init, false);	

function init(){
    footer();
}

function showAlt(id) {
    let newInnerHTML = '';
    switch(id) {
        case 'quizz':
            newInnerHTML = "Répondez à des questions <br>afin d'évaluer vos connaissances sur les lois du football";
            break;
        case 'video':
            newInnerHTML = "Prenez le sifflet pour arbitrer des matchs comme si vous y étiez";
            break;
        case 'lois':
            newInnerHTML = "Révisez à tête reposée les lois du jeu avec les dernières évolutions";
    }
    document.getElementById("alt").innerHTML = newInnerHTML;
}

function cleanAlt() {
    document.getElementById("alt").innerHTML = " ";
}