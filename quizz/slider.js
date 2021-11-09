// ________________--   SLIDERS
/*
var slideWidth = undefined
var touchstartx = undefined;
var touchmovex = undefined;
var movex = undefined;
var index = 0;
var longTouch = undefined;

*/
document.addEventListener("readystatechange", ready, false);	


function ready() {
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
          holder: $(".holder"), // il faut affecter comme ça sinon on ne peut pas appeler ON 
          //document.getElementsByClassName("holder")[0], //$(".holder"),
          imgSlide: document.getElementsByClassName("slide-image")[0] //$(".slide-image")
        },

        slideWidth: $("#slider").width(), // width est recupéré par ce moyen seulement
        touchstartx: undefined,
        touchmovex: undefined,
        movex: undefined,
        index: 0,
        longTouch: undefined,
        
        init: function() {
          this.bindUIEvents();
        },

        bindUIEvents: function() {

          console.log(this.el.holder);

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
          // Calculate distance to translate holder.
          this.movex = this.index*this.slideWidth + (this.touchstartx - this.touchmovex);
          // Defines the speed the images should move at.
          var panx = 100-this.movex/6;
          if (this.movex < 600) { // Makes the holder stop moving when there is no more content.
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
            if (this.movex > this.index*this.slideWidth && this.index < 2) {
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

 // var slider = document.getElementById("slider");
  /*slideWidth = slider.width();
  slider.addEventListener("touchstart", handleStart, false);
  slider.addEventListener("touchend", handleEnd, false);
  slider.addEventListener("touchcancel", handleCancel, false);
  slider.addEventListener("touchleave", handleLeave, false);
  slider.addEventListener("touchmove", handleMove, false);
  */

function handleCancel(event) {

}

function handleLeave(event) {

}

function handleStart(event) {
 
}

function handleMove(event) {
  
}

function handleEnd(event) {
  
}      

// ________________________
