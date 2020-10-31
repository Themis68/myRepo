$('#carousel-example').on('slide.bs.carousel', function (e) {
//$('#carousel-example').on('slide', function (e) {
    var screenParams = [
        {width:375, nbElem:2},
        {width:576, nbElem:2},
        {width:768, nbElem:3},
        {width:991, nbElem:4}
    ];

    var $e = $(e.relatedTarget);
    var idx = $e.index();


    // déterminer le nombre de slides à afficher sur une ligne
    let indexScreen = arrayAssoSearch2(screenParams, window.screen.width);
    var itemsPerSlide = screenParams[indexScreen].nbElem;

    var totalItems = $('.carousel-item').length;

    if (idx >= totalItems-(itemsPerSlide-1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i=0; i<it; i++) {
            // append slides to end
            if (e.direction=="left") {
                $('.carousel-item').eq(i).appendTo('.carousel-inner');
            }
            else {
                $('.carousel-item').eq(0).appendTo('.carousel-inner');
            }
        }
    }
})

function carousel(action, monCarousel) {
    switch (action) {
        case "addQuizz":
            for (let i = 0; i < monCarousel.cat.length; i++) {
                // création indicateur
                let ind = addIndicateur(i);
                monCarousel.htmlIndName.appendChild(ind);

                // création vignette
                let car = addItem(monCarousel, i);
                monCarousel.htmlCarName.appendChild(car);
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

function addItem(data, i){
    // création d'une vignette
    let myDiv = document.createElement("div");

    myDiv.className = "carousel-item col-12 col-sm-6 col-md-4 col-lg-3" + (i === 0 ?' active':'');
    //myDiv.className = "carousel-item col-" + screenParams[indexScreen].code + (i === 0?' active':'');	// 2 3 et 4

    //myDiv.className = "carousel-item col-xs-6 col-sm-6 col-md-3 col-lg-2" + (i === 0?' active':'');

    // img
    let myImg = document.createElement("img");
    myImg.className = "img-fluid mx-auto d-block";
    myImg.setAttribute("alt", "img" + i);
    myImg.setAttribute("title", "img" + i);
    myImg.setAttribute("src", data.posterPath + (data.cat[i].poster || "stade.jpg"));

    // caption
    let myCaption = document.createElement("div");

    // badge
    let myBadge = badgeItem(data.cat[i].niveau, data.badgePath);
    myCaption.appendChild(myBadge);

    // titre
    let myP = document.createElement("p");   

    myP.innerHTML = data.cat[i].titre + " (" + (data.cat[i].loi === undefined ? "mix" : "loi " + data.cat[i].loi) +")";
    myCaption.appendChild(myP);
    myCaption.className = "carousel-caption d-none d-md-block titre";
    myCaption.setAttribute("onclick", 'javascript:switchQuizz('+ (i+1) +');');	// mettre ici car cette DIV est au-dessus de l'image

    myDiv.appendChild(myImg);
    myDiv.appendChild(myCaption);
    return myDiv;
}

function badgeItem(niveau, badgePath) {
    // badge
    let myBadge = document.createElement("img");
    myBadge.className = "carouselFanion";
    myBadge.setAttribute("title", "niveau : " + nbQuests[niveau].niv);
    myBadge.setAttribute("src", badgePath + "badge" +(niveau + ".png" || "fff.png'"));
    return myBadge;
}
