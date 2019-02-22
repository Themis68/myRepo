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
  if(typeof window.videojs === 'undefined' && typeof require === 'function') {
    videojs = require('video.js');
  } else {
    videojs = window.videojs;
  }

  (function(window, videojs) {
   // console.log('init 1');
    var defaults = {},
      videoJsZoom,
        currentZoom = {}, 
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

    /*
    * Resolution menu item
    */
    var MenuItem = videojs.getComponent('MenuItem');

    console.log('init ZoomMenuItem');
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

          this.addClass('vjs-selected');
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
        console.log('click', this.options_.val);
        this.onClickListener(this);
        this.showAsLabel();
        this.addClass('vjs-selected');
        setSourcesSanitized(this.player_, this.options_.val);
        }
      });

      /*
      * Resolution menu button
      */
      var MenuButton = videojs.getComponent('MenuButton');

      console.log('init ZoomMenuButton');
      var ZoomMenuButton = videojs.extend(MenuButton, {
        constructor: function(player, options, settings, label){
          console.log('init ZoomMenuButton / constructor');
         this.zoom = options.zoom;  // tableau des valeurs possibles
         this.label = label;  // code HTML pour le bouton '1X'
         this.label.innerHTML = options.initialySelectedLabel;  //valeur '1X'
         // Sets this.player_, this.options_ and initializes the component
         MenuButton.call(this, player, options, settings);
         this.controlText('Zoom');
 
         if(settings.dynamicLabel){
           // affiche le label du zoom dans la barre de contrôle
           this.el().appendChild(label);
         }else{
           // affiche l'engrenage
           var staticLabel = document.createElement('span');
           videojs.addClass(staticLabel, 'vjs-zoom-button-staticlabel');
           this.el().appendChild(staticLabel);
         }
        },
        createItems: function(player, options, settings, label){
          console.log('init ZoomMenuButton / createItem');

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
              console.log('menuItemsHolder['+key+']', menuItemsHolder[key]);
             }
          }
          return menuItems;
        }
      });

    /**
     * Initialize the plugin.
     * @param {object} [options] configuration for the plugin
     */
    videoJsZoom = function(options) {
     // console.log('appel videoJsZoom');
      //
      // ne passe pas lors de l'INIT mais seulement quand on appel le plugin dans la video
      //

      // définition des variables
      var settings = videojs.mergeOptions(defaults, options),
          player = this,
          label = document.createElement('span');

      // affectationd e la classe
      videojs.addClass(label, 'vjs-zoom-button-label');
      
      /**
       * Updates player sources or returns current source URL
       * @param   {Array}  [src] array of sources [{src: '', type: '', label: '', res: ''}]
       * @returns {Object|String|Array} videojs player object if used as setter or current source URL, object, or array of sources
       */
      player.updateSrc = function(niveaux){
       console.log('appel player.updateSrc');

        if(!niveaux){ return player.niveau(); }

        // on prend le zoom = 1 pour le début
        // récupère l'id de l'objet DOM
        var def = player.options_.plugins.videoJsZoom.default;
        var choosen = {lab:'1x', val:1};
        /*if (def) {
          choosen = {lab:'1x', val:1};
          player.options_.plugins.videoJsZoom.default = false;
        } else {
          choosen = chooseSrc(niveaux);
        }*/

       // var choosen = chooseSrc(niveaux);
        var menuButton = new ZoomMenuButton(player, { zoom: niveaux, initialySelectedLabel: choosen.lab , initialySelectedRes: choosen.val}, settings, label);

        videojs.addClass(menuButton.el(), 'vjs-zoom-button');
        player.controlBar.videoJsZoom = player.controlBar.el_.insertBefore(menuButton.el_, player.controlBar.getChild('fullscreenToggle').el_); // ajout de la liste déroulante

        player.controlBar.videoJsZoom.dispose = function(){
          this.parentNode.removeChild(this);
        };
        return setSourcesSanitized(player, choosen);
      };

      function setSourcesSanitized(player, zoom) {
        // récupère l'id de l'objet DOM
        var playerDOM = player.el(); 
        var video = playerDOM.getElementsByTagName('video')[0];
  
        /* Array of possible browser specific sources for transformation */
        var properties = ['transform', 'WebkitTransform', 'MozTransform',
                          'msTransform', 'OTransform'],
                         prop = properties[0];
        var i,j;
        /* Find out which CSS transform the browser supports */
        for(i=0,j=properties.length;i<j;i++){
          if(typeof playerDOM.style[properties[i]] !== 'undefined'){
            prop = properties[i];
            break;
          }
        }
        playerDOM.style.overflow = 'hidden';
        video.style[prop]='scale('+zoom.val+')';  // effectue la transformation
        return true;
      }

      function setSourcesSanitized2(player, zoom) {
        // récupère l'id de l'objet DOM
        var playerDOM = player.el(); 
        var video = playerDOM.getElementsByTagName('video')[0];
        var def = player.options_.plugins.videoJsZoom.default;
        console.log('def', player.options_.plugins.videoJsZoom.default);
  
        /* Array of possible browser specific sources for transformation */
        var properties = ['transform', 'WebkitTransform', 'MozTransform',
                          'msTransform', 'OTransform'],
                         prop = properties[0];
        var i,j;
        /* Find out which CSS transform the browser supports */
        for(i=0,j=properties.length;i<j;i++){
          if(typeof playerDOM.style[properties[i]] !== 'undefined'){
            prop = properties[i];
            break;
          }
        }
        playerDOM.style.overflow = 'hidden';
        if (def) {
          video.style[prop]='scale(1)';
          player.options_.plugins.videoJsZoom.default = false;
          console.log('def', player.options_.plugins.videoJsZoom.default);
        } else {
          video.style[prop]='scale('+zoom.val+')';  // effectue la transformation
        }
        return true;
      }

      /**
       * Returns current resolution or sets one when label is specified
       * @param {String}   [label]         label name
       * @param {Function} [customSourcePicker] custom function to choose source. Takes 3 arguments: player, sources, label. Must return player object.
       * @returns {Object}   current resolution object {label: '', sources: []} if used as getter or player object if used as setter
       */
      player.currentZoom = function(label, customSourcePicker){
        console.log('appel player.currentZoom', customSourcePicker);
        if(label == null) { return currentZoom; }
        if(menuItemsHolder[label] != null){
          menuItemsHolder[label].onClick(customSourcePicker);
        }
        return player;
      };

      /**
       * Group sources by label, resolution and type
       * @param   {Array}  src Array of sources
       * @returns {Object} grouped sources: { label: { key: [] }, res: { key: [] }, type: { key: [] } }
       */
      function bucketSources(niveaux){
        console.log('appel bucketSources()', niveaux);
        var niv = {
          lab: {},
          val: {}
        };
        niveaux.map(function(niveaux) {
          initResolutionKey(niv, 'lab', niveaux);
          initResolutionKey(niv, 'val', niveaux);

          appendSourceToKey(niv, 'lab', niveaux);
          appendSourceToKey(niv, 'val', niveaux);
        });
        return niv;
      }

      function initResolutionKey(niv, key, niveaux) {
       // console.log('appel initResolutionKey()');
        if(niv[key][niveaux[key]] == null) {
          niv[key][niveaux[key]] = [];
        }
      }

      function appendSourceToKey(niv, key, niveaux) {
        console.log('appel appendSourceToKey()');
        niv[key][niveaux[key]].push(niveaux);
      }

      /**
       * Choose src if option.default is specified
       * @param   {Array}  src Array of sources sorted by resolution used to find high and low res
       * @returns {Object} {res: string, sources: []}
       */
      function chooseSrc(niveaux){
        console.log('appel chooseSrc()', niveaux);
        var selectedLab = niveaux[0].lab;
        var selectedVal = niveaux[0].val;
        return {lab: selectedLab, val: selectedVal};
      }
			
			player.ready(function(){
        console.log('appel player.ready', player.options_.plugins.videoJsZoom.niveaux);
				player.updateSrc(player.options_.plugins.videoJsZoom.niveaux);
			});
      };

      // register the plugin
      videojs.plugin('videoJsZoom', videoJsZoom);
    }
  )(window, videojs);
})();
