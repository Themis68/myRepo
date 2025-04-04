var screenParams = [
    {width:0, nbElem:1},
    {width:375, nbElem:2},
    {width:576, nbElem:3},
    {width:768, nbElem:4},
    {width:991, nbElem:5}
];


$('#carousel-example').on('slide.bs.carousel', function (e) {
    // FONCTION PAS APPELLEE LORS DU DRRAG


    
    /*
    Bootstrap’s carousel class exposes two events for hooking into carousel functionality.

    Both events have the following additional properties:

    direction: The direction in which the carousel is sliding (either “left” or “right”).
    relatedTarget: The DOM element that is being slid into place as the active item.
    All carousel events are fired at the carousel itself (i.e. at the).
    */
    var $e = $(e.relatedTarget);
    var idx = $e.index();



    let indexScreen = arrayAssoSearch2(screenParams, window.screen.width);
    var itemsPerSlide = screenParams[indexScreen].nbElem;
    var totalItems = $('.carousel-item').length;

    // originaux
    //var itemsPerSlide = 4;
    // var totalItems = $('.carousel-item').length;
    //


    if (idx >= totalItems-(itemsPerSlide-1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i=0; i<it; i++) {
            // append slides to end
            if (e.direction=="left") {
                console.log("drag left");
                $('.carousel-item').eq(i).appendTo('.carousel-inner');
            }
            else {
                console.log("drag right");
                $('.carousel-item').eq(0).appendTo('.carousel-inner');
            }
        }
    }
})

document.addEventListener("DOMContentLoaded", init, false);	// lance l'écoute des évènements et appelle INIT

function init(){
    var car = document.querySelector("carousel");
    car.innerHTML = templateHTML();
}

function templateHTML(){
    let myCar=' <div id="carousel-example" class="carousel slide" data-ride="carousel" data-interval="false">';
    myCar+='<div id="vignettes" class="carousel-inner row w-100 mx-auto" role="listbox">';
    myCar+='</div>';
    myCar+='<ol id="indicateurs" class="carousel-indicators"></ol>';
    myCar+='<a class="carousel-control-prev" href="#carousel-example" role="button" data-slide="prev">';
    myCar+='<span class="carousel-control-prev-icon" aria-hidden="true"></span>';
    myCar+='<span class="sr-only">Previous</span>';
    myCar+='</a>';
    myCar+='<a class="carousel-control-next" href="#carousel-example" role="button" data-slide="next">';
    myCar+='<span class="carousel-control-next-icon" aria-hidden="true"></span>';
    myCar+='<span class="sr-only">Next</span>';
    myCar+='</a>';
    myCar+='</div>';
    return myCar;
}

function xCarousel(action, data) {
    switch (action) {
        case "addQuizz":
            // déterminer le nombre de slides à afficher sur une ligne
            let nbResolutions = arrayAssoSize(screenParams);
            nbElem = 0;
            for(let i=0; i < nbResolutions; i++) {
                if (screenParams[i].width <= window.screen.width) {
                    nbElem = screenParams[i].nbElem;
                }
            }

            for (let i = 0; i < data.cat.length; i++) {
                // création indicateur
                let ind = addIndicateur(i);
                data.htmlIndName.appendChild(ind);

                // création vignette
                let item = data.cat[i];
                let infosItem = {
                    index: i,
                    poster: data.posterPath + (item.poster || "stade.jpg"),
                    niveau: item.niveau,
                    badge: data.badgePath + "badge" + item.niveau + ".png",
                    titre: item.titre,
                    loi: item.loi,
                    etat: (i < nbElem ? 'showCarouselItem' : 'hideCarouselItem')
                }
                let car = addItem(infosItem);
                data.htmlCarName.appendChild(car);
            }
            break;
    }
}

function addIndicateur(i) {
    // création indicateur
    let myInd = document.createElement("li");
    myInd.setAttribute("data-target", "#carousel-example");
    myInd.setAttribute("data-slide-to",i);
    if(i === 0) { 
        myInd.setAttribute("class", "active cercle"); 
    } else {
        myInd.setAttribute("class", "cercle");
    }
    return myInd;
}

function addItem(data){
    // création d'une vignette
    let myDiv = document.createElement("div");
    myDiv.className = "carousel-item col col-sm-6 col-md-4 col-lg-3" + data.etat + " " + (data.index === 0 ?' active':'');
    //myDiv.className = "carousel-item " + data.etat + " " + (data.index === 0 ?' active':'');

    // IMG
    let myImg = document.createElement("img");
    myImg.className = "img-fluid mx-auto d-block";
    myImg.setAttribute("alt", "img" + data.index);
    myImg.setAttribute("title", "img" + data.index);
    myImg.setAttribute("src", data.poster);

    // caption
    let myCaption = document.createElement("div");

    // badge
    let myBadge = document.createElement("img");
    myBadge.className = "carouselFanion";
    myBadge.setAttribute("title", "niveau : " + nbQuests[data.niveau].niv);
    myBadge.setAttribute("src", data.badge);
    myCaption.appendChild(myBadge);

    // titre
    let myP = document.createElement("p");   

    myP.innerHTML = data.titre + " (" + (data.loi === undefined ? "mix" : "loi " + data.loi) +")";
    myCaption.appendChild(myP);
    myCaption.className = "carousel-caption d-none d-md-block titre";
    myCaption.setAttribute("onclick", 'javascript:switchQuizz('+ (data.index+1) +');');	// mettre ici car cette DIV est au-dessus de l'image

    myDiv.appendChild(myImg);
    myDiv.appendChild(myCaption);
    return myDiv;
}