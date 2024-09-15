var slider = {};
  
document.addEventListener('click', gestionClick, false);

function paramSlider(nbSlides) {
  console.log("paramSlider");

	// .holder
	var holder = document.getElementsByClassName("holder")[0];
	holder.style.width = (nbSlides * 100) + "%";
 // holder.setAttribute("data-nbslides", nbSlides);

	// .slide-wrapper
	var slideWrapper = document.getElementsByClassName("slide-wrapper");
	for(let i = 0; i < nbSlides; i++) {
		slideWrapper[i].style.width = (100 / nbSlides) + "%";
    slideWrapper[i].style.height = "100%";
	}
}

function loadSlider(nbSlides) {
  console.log("TOUCH : " + navigator.msMaxTouchPoints);
  if (document.readyState === "complete") {

    if (navigator.msMaxTouchPoints) {
      // ce parametre remonte undefined sur une simulation CHROME MOBILE

      // on est sur un device qui accepte le TOUCHER
    /*  $('#slider').addClass('ms-touch');

      $('#slider').on('scroll', function() {
        console.log("loadSlider : scroll");
        $('.slide-image').css('transform','translate3d(-' + (100-$(this).scrollLeft()/6) + 'px,0,0)');
      });
      */
    } else {
      // cee code est mis ici car la simulation d'un mobile sous chrome remonte undefined pour le parametre navigator.msMaxTouchPoints
      $('#slider').addClass('ms-touch');

      $('#slider').on('scroll', function() {
        console.log("loadSlider : scroll");
        $('.slide-image').css('transform','translate3d(-' + (100-$(this).scrollLeft()/6) + 'px,0,0)');

        //               this.el.holder.css('transform','translate3d(-' + 900 + 'px,0,0)');
      });

      // n'accepte pas le TOUCHER
      slider = {
        el: {
          slider: $("#slider"), //document.getElementById("slider"), 
          holder: $(".holder"), // il faut affecter comme ça sinon on ne peut pas appeler .ON 
          imgSlide: $(".slide-image"), // il faut affecter comme ça sinon on ne peut pas appeler .CSS (addClass notamment)
          iconeSlider: $(".icone-slider")
        },

        slideWidth: 0, // on n'arrive pas à récupérer la valkeur de slider à ce niveau là (cf TOUCHSTART ci-dessous)
        holderWidth: $(".holder").width(),
       // touchstartx: undefined,
       // touchmovex: undefined,
        movex: undefined,
       // index: 0,
       // longTouch: undefined,
        direction: undefined,
        continuer: false,
        nbSlides: nbSlides,
        //nbSlides: document.getElementById("holder").dataset.nbslides, // recupère le nbre de slides
        
        init: function() { 
          console.log("loadSlider : init" );
          this.bindUIEvents();

        },

        bindUIEvents: function() {


          this.el.holder.on("touchstart", function(event) {
            slider.slideWidth = $("#slider").width()  // n&écessaire pour initialiser la valeur
            slider.start(event);
          });

          this.el.holder.on("touchmove", function(event) {
            console.log(slider.slideWidth);
            console.log(nbSlides);

            slider.move(event);
          });

          this.el.holder.on("touchend", function(event) {
            slider.end(event);
          });

        },

        start: function(event) {
          console.log("loadSlider : start");
          // passage uniquement sur le premier appui
          this.longTouch = false;
          setTimeout(function() {window.slider.longTouch = true;}, 250);

          // Get the original touch position.
          this.touchstartx =  event.originalEvent.touches[0].pageX;

          // The movement gets all janky if there's a transition on the elements.
          $('.animate').removeClass('animate');
        },

        move: function(event) {
          console.log("loadSlider : move");
          // Continuously return touch position.
          this.touchmovex =  event.originalEvent.touches[0].pageX;
          
          //document.getElementById("info").innerHTML = this.touchmovex + " / " + this.holderWidth;

          // Calculate distance to translate holder.
          this.direction = this.touchstartx - this.touchmovex;
          this.continuer = false;
          if(this.direction > 0) {
            // glisser vers gauche
            // on contrôle la borne supérieure
            this.continuer = (this.index == (this.nbSlides-1) ? false : true);
          } else {
            // glisser vers droite
            // on contrôle la borne inférieure
            this.continuer = (this.index == 0 ? false : true);
          }

          if(this.continuer == true) {
            // on continue le sliding
            this.movex = (this.index * this.slideWidth) + this.direction;

            // Defines the speed the images should move at.
            var panx = 100-this.movex/6;
            // this.holderWidth = permet de savoir s'il y a encore des images
            // on garde c contrôle même si on a déjà fait un controle ci-dessus sur le this.index 
            if (this.movex < this.holderWidth) { // Makes the holder stop moving when there is no more content.
              //this.el.holder.css('transform','translate3d(-' + this.movex + 'px,0,0)');
         //     this.el.holder.css('transform','translate3d(-' + this.movex + 'px,0,0)');
            }
            
            // Corrects an edge-case problem where the background image moves without the container moving.
            if (panx < 100) { 
              this.el.imgSlide.css('transform','translate3d(-' + panx + 'px,0,0)');
            }
          }
        },

        end: function(event) {
          console.log("loadSlider : end");
          // on vérifie si le move était autorisé
          if (this.continuer == true) {
            // Calculate the distance swiped.
            var absMove = Math.abs(this.index*this.slideWidth - this.movex);
            // Calculate the index. All other calculations are based on the index.
            if (absMove > this.slideWidth/2 || this.longTouch === false) {
              var indexOld = this.index;
              if (this.movex > this.index*this.slideWidth && this.index < (this.nbSlides-1)) {
                this.index++;
              } else if (this.movex < this.index*this.slideWidth && this.index > 0) {
                this.index--;
              }
              this.indicateur(indexOld, this.index);  // MAJ indicateur
              doAfterSlide(this.index);   // afficher les infos du quizz
            }     
            // Move and animate the elements.
            this.el.holder.addClass('animate').css('transform', 'translate3d(-' + this.index*this.slideWidth + 'px,0,0)');
            this.el.imgSlide.addClass('animate').css('transform', 'translate3d(-' + 100-this.index*50 + 'px,0,0)');
          }
        },

        indicateur: function(indexOld, indexNew) {
          // MAJ état des indicateurs
          console.log("loadSlider : indicateur");
          document.getElementById("indicateur"+indexOld).setAttribute("class", "cercle");
          document.getElementById("indicateur"+indexNew).setAttribute("class", "cercle-active");
          // MAJ image de backgrounf
          if (indexOld>indexNew) {
            // glisser àç droite
            this.direction = 1;
          } else {
            this.direction = -1;
          }
          this.sliding(this.direction);
          // arrêter l'animation de la main puisqu'on active un quizz différent
          this.hideHand();
        },

        hideHand: function() {
          console.log("loadSlider : hideHand");
          // on arrête l'animation de la main
          this.el.iconeSlider.addClass('icone-slider').css('animation-play-state','paused');
          document.getElementsByClassName("icone-slider")[0].style.display = "none";
        }, 

        sliding: function(direction){
          console.log(direction);
          if (direction == 1) {
              console.log("Slide à droite");
          } else {
              console.log("Slide à gauche");
          }
          myObj = document.getElementById("slider2");
          // récupérer les valeurs
          var style = window.getComputedStyle(myObj);
          var backgroundPosition = style.getPropertyValue('background-position');
          var backgroundPositionArray = backgroundPosition.split(" ");
          myObj.style.backgroundPosition = parseInt(backgroundPositionArray[0], 10) + (direction * 850) + "px 0";
        }
      };

      slider.init();
    }
  }
}

function gestionClick(event){
	var target = event.target || event.srcElement; // ce dernier pour compatibilité IE

	switch (target.getAttribute('class')) { 
		case 'cercle':	
      // clic sur un des indicateurs direct
			// MAJ etat des indicateurs

      // on isole l'index de l'indicateur
      let indexOld = document.getElementsByClassName("cercle-active")[0].getAttribute("id").substring(10);
      let indexNew = target.id.substring(10);
      slider.indicateur(indexOld, indexNew);
      // MAJ infos Quizz
      slider.index = indexNew;
      doAfterSlide(slider.index);   // afficher les infos du quizz
			break;
	}
}