/*! videojs-zoom - 2015-7-26
 * Copyright (c) 2016 Kasper Moskwiak
 * Modified by Pierre Kraft
 * Licensed under the Apache-2.0 license. 
 * Modfied by Paulo Pires Seixas
 * Version 1.0
 * */

(function() {
  'use strict';
  var videojs = null;
  var first = true; // permet de gérer le zoom pour le premier tour
  if(typeof window.videojs === 'undefined' && typeof require === 'function') {
    videojs = require('video.js');
  } else {
    videojs = window.videojs;
  };

  (function(window, videojs) {
    var defaults = {},
      videoJsZoom,
        menuItemsHolder = {}; // stores menuItems

    var extend = function() {
      var args, target, i, object, property;
      args = Array.prototype.slice.call(arguments);
      target = args.shift() || {};
      for (i in args) {
        object = args[i];
        for (property in object) {
          if (object.hasOwnProperty(property)) {
            if (typeof object[property] === 'object') {
              target[property] = extend(target[property], object[property]);
            } else {
              target[property] = object[property];
            }
          }
        }
      }
      return target;
    };

    /*****************************************************************************************
    // ATTENTION : ne pas déplacer cette fonction plus bas car sinon elle n'est pas reconnue
    ******************************************************************************************/
    function setSourcesSanitized(player, zoom) {

      /* Grab the necessary DOM elements */
      player = player.el();
      var video = player.getElementsByTagName('video')[0];
      /* Array of possible browser specific sources for transformation */
      var properties = ['transform', 'WebkitTransform', 'MozTransform',
                        'msTransform', 'OTransform'],
                       prop = properties[0];
      var i,j;
      /* Find out which CSS transform the browser supports */
      for(i=0,j=properties.length;i<j;i++){
        if(typeof player.style[properties[i]] !== 'undefined'){
          prop = properties[i];
          break;
        }
      }
      player.style.overflow = 'hidden';

      var decalage = {hor:10, vert:20};
      if (zoom.val > 1) {
        // matrix(scaleX(),skewY(),skewX(),scaleY(),translateX(),translateY())
        video.style[prop]='matrix(' + zoom.val + ', 0, 0, ' + zoom.val + ', ' + decalage.hor + ', ' + decalage.vert + ')';  // effectue la transformation combinée
      } else {
        video.style[prop]='matrix(' + zoom.val + ', 0, 0, ' + zoom.val + ', 0, 0)';
      }
      return true;
    }

    /*
    * Resolution menu item
    */
    var MenuItem = videojs.getComponent('MenuItem');

    var ZoomMenuItem = videojs.extend(MenuItem, {
      constructor: function(player, options, onClickListener, label){
        this.onClickListener = onClickListener;
        this.label = label;
        MenuItem.call(this, player, options);
        this.zoom = options.zoom;

        this.on('click', this.onClick);
        this.on('touchstart', this.onClick);

        if (options.initialySelected) {
          this.showAsLabel();
          this.selected(true);

          this.dom.addClass('vjs-selected');
        }
      },
      showAsLabel: function() {
        // Change menu button label to the label of this item if the menu button label is provided
        if(this.label) {
          this.label.innerHTML = this.options_.label;
        }
      },
      // fonction qui gère le clic sur un item du menu
      onClick: function(customSourcePicker){
        this.onClickListener(this);
        this.showAsLabel();
        this.dom.addClass('vjs-selected');
        setSourcesSanitized(this.player_, this.options_.val);
      }
    });

    /*
    * Resolution menu button
    */
    var MenuButton = videojs.getComponent('MenuButton');

    var ZoomMenuButton = videojs.extend(MenuButton, {
      constructor: function(player, options, settings, label){
        this.zoom = options.zoom;  // tableau des valeurs possibles
        this.label = label;  // code HTML pour le bouton '1X'
        this.label.innerHTML = options.initialySelectedLabel;  //valeur '1X'
        // Sets this.player_, this.options_ and initializes the component
        MenuButton.call(this, player, options, settings);
        this.controlText('Zoom');

        if(settings.dynamicLabel){
          // affiche le label du zoom dans la barre de contrôle
          this.el().appendChild(label);
        } else {
          // affiche l'engrenage
          var staticLabel = document.createElement('span');
          videojs.dom.addClass(staticLabel, 'vjs-zoom-button-staticlabel');
          this.el().appendChild(staticLabel);
        }
      },
      createItems: function(player, options, settings, label){


        var menuItems = [];
        var labels = this.zoom; // (this.zoom && this.label) || {};  // tableau des valeurs possibles
        var onClickUnselectOthers = function(clickedItem) {
          var monZoom = clickedItem.options_.val.val;

          menuItems.map(function(item) {
            item.selected(item === clickedItem);
            item.removeClass('vjs-selected');
          });
        };

        for (var key in labels) {
          if (labels.hasOwnProperty(key)) {
            menuItems.push(new ZoomMenuItem(
              this.player_,
              {
                label: labels[key].lab,
                val: labels[key],
                initialySelected: key === this.options_.initialySelectedLabel 
              },
              onClickUnselectOthers,   //code HTML du select
              this.label));    // code HTML du bouton 1x
            // Store menu item for API calls
            menuItemsHolder[key] = menuItems[menuItems.length - 1];
          }
        }
        return menuItems;
      }
    });

    /**
     * Initialize the plugin.
     * @param {object} [options] configuration for the plugin
     */

         // Cross-compatibility for Video.js 5 and 6.
    var registerPlugin = videojs.registerPlugin || videojs.plugin;

    
    videoJsZoom = function(options) {
      //
      // ne passe pas lors de l'INIT mais seulement quand on appel le plugin dans la video
      //

      // définition des variables
      var settings = videojs.mergeOptions(defaults, options),
          player = this,
          label = document.createElement('span');

      // affectation de la classe
      // @deprecated : videojs.dom.addClass(label, 'vjs-zoom-button-label');
      videojs.dom.addClass(label, 'vjs-zoom-button-label');
        
      /**
       * Updates player sources or returns current source URL
       * @param   {Array}  [src] array of sources [{src: '', type: '', label: '', res: ''}]
       * @returns {Object|String|Array} videojs player object if used as setter or current source URL, object, or array of sources
       */
      player.updateSrc = function(niveaux){
        if(!niveaux){ return player.niveau(); }

        // nécessaire pour mettre à jour la valeur à l'écran
        if (first) {
          var choosen = {lab: '1x', val: 1};
        } else {
          choosen = {lab: niveaux[0].lab, val: niveaux[0].val};
        }

        var menuButton = new ZoomMenuButton(player, { zoom: niveaux, initialySelectedLabel: choosen.lab , initialySelectedRes: choosen.val}, settings, label);

        videojs.dom.addClass(menuButton.el(), 'vjs-zoom-button');
        player.controlBar.videoJsZoom = player.controlBar.el_.insertBefore(menuButton.el_, player.controlBar.getChild('fullscreenToggle').el_); // ajout de la liste déroulante

        player.controlBar.videoJsZoom.dispose = function(){
          this.parentNode.removeChild(this);
        };

        return setSourcesSanitized(player, choosen);
      };
			
			player.ready(function(){
				player.updateSrc(player.options_.plugins.videoJsZoom.niveaux);
			});
    };

    // @deprecated 
    //videojs.plugin('videoJsZoom', videoJsZoom);

    // Register the plugin with video.js.
    registerPlugin('videoJsZoom', videoJsZoom);
  }
)(window, videojs);
})();
