function paramSlider(nbSlides) {
	// .holder
	let holder = document.getElementsByClassName("holder")[0];
	holder.style.width = (nbSlides * 100) + "%";
  holder.setAttribute("data-nbslides", nbSlides);

	// .slider-wrap
/*	let sliderWrap = document.getElementsByClassName("slider-wrap")[0];
	sliderWrap.style.marginLeft = "0%";//((-nbSlides * 100) /2) + "px";
  sliderWrap.style.marginRight = "0%";
  // largeur globale de la zone 
	sliderWrap.style.width = "100%"; //(nbSlides * 100) + "px";
*/
	// .slide div
	let slide = document.getElementsByClassName("slide");
	// .slide-wrapper
	let slideWrapper = document.getElementsByClassName("slide-wrapper");
	for(let i = 0; i < nbSlides; i++) {
		//slide[i].style.width = (nbSlides * 100) + "%";
		slideWrapper[i].style.width = (100 / nbSlides) + "%";
    slideWrapper[i].style.height = "90%";
	}
}

function loadSlider() {
  if (document.readyState === "complete") {
    if (navigator.msMaxTouchPoints) {
      $('#slider').addClass('ms-touch');

      $('#slider').on('scroll', function() {
        $('.slide-image').css('transform','translate3d(-' + (100-$(this).scrollLeft()/6) + 'px,0,0)');
      });
    } else {
      var slider = {
        el: {
          slider: document.getElementById("slider"), //$("#slider"),
          holder: $(".holder"), // il faut affecter comme ça sinon on ne peut pas appeler .ON 
          imgSlide: $(".slide-image") // il faut affecter comme ça sinon on ne peut pas appeler .CSS
        },

        slideWidth: $("#slider").width(), // width est recupéré par ce moyen seulement
        holderWidth: $(".holder").width(),
        touchstartx: undefined,
        touchmovex: undefined,
        movex: undefined,
        index: 0,
        longTouch: undefined,
        nbSlides: document.getElementById("holder").dataset.nbslides, // recupère le nbre de slides
        
        init: function() {
          this.bindUIEvents();
        },

        bindUIEvents: function() {

          this.el.holder.on("touchstart", function(event) {
            slider.start(event);
          });

          this.el.holder.on("touchmove", function(event) {
            slider.move(event);
          });

          this.el.holder.on("touchend", function(event) {
            slider.end(event);
          });

        },

        start: function(event) {
          // passage uniquement sur le premier appui
          // Test for flick.
          this.longTouch = false;
          setTimeout(function() {
            window.slider.longTouch = true;
          }, 250);

          // Get the original touch position.
          this.touchstartx =  event.originalEvent.touches[0].pageX;

          // The movement gets all janky if there's a transition on the elements.
          $('.animate').removeClass('animate');
        },

        move: function(event) {
          // Continuously return touch position.
          this.touchmovex =  event.originalEvent.touches[0].pageX;
          
          document.getElementById("info").innerHTML = this.touchmovex + " / " + this.holderWidth;

          // Calculate distance to translate holder.
          this.movex = this.index*this.slideWidth + (this.touchstartx - this.touchmovex);
          // Defines the speed the images should move at.
          var panx = 100-this.movex/6;
          console.log("index " + this.index);
          // this.holderWidth = permet de savoir s'il y a encore des images
          if (this.movex < this.holderWidth) { // Makes the holder stop moving when there is no more content.
            this.el.holder.css('transform','translate3d(-' + this.movex + 'px,0,0)');
          }
          if (panx < 100) { // Corrects an edge-case problem where the background image moves without the container moving.
            this.el.imgSlide.css('transform','translate3d(-' + panx + 'px,0,0)');
          }
        },

        end: function(event) {
          // Calculate the distance swiped.
          var absMove = Math.abs(this.index*this.slideWidth - this.movex);
          // Calculate the index. All other calculations are based on the index.
          if (absMove > this.slideWidth/2 || this.longTouch === false) {
            if (this.movex > this.index*this.slideWidth && this.index < (this.nbSlides-1)) {
              this.index++;
            } else if (this.movex < this.index*this.slideWidth && this.index > 0) {
              this.index--;
            }
          }      
          // Move and animate the elements.
          this.el.holder.addClass('animate').css('transform', 'translate3d(-' + this.index*this.slideWidth + 'px,0,0)');
          this.el.imgSlide.addClass('animate').css('transform', 'translate3d(-' + 100-this.index*50 + 'px,0,0)');
        }
      };

      slider.init();
    }
  }
}