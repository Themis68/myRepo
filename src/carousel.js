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
