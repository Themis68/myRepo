https://css-tricks.com/slider-with-sliding-backgrounds

ANALYSE DE CODE :

div class="carousel-item col-12 col-sm-6 col-md-4 col-lg-3">

Nb images en largeur :
col-12 : 1 image
col-sm-6 : 2 images
col-md-4 : 3 images
col-lg-3 : 4 images


// 1. .carousel.pointer-event should ideally be pan-y (to allow for users to scroll vertically)
//    even when their scroll action started on a carousel, but for compatibility (with Firefox)
//    we're preventing all actions instead
// 2. The .carousel-item-left and .carousel-item-right is used to indicate where
//    the active slide is heading.
// 3. .active.carousel-item is the current slide.
// 4. .active.carousel-item-left and .active.carousel-item-right is the current
//    slide in its in-transition state. Only one of these occurs at a time.
// 5. .carousel-item-next.carousel-item-left and .carousel-item-prev.carousel-item-right
//    is the upcoming slide in transition.
