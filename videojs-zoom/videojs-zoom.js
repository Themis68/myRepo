/*! videojs-zoom - 2019-02-14
 * Copyright (c) 2016 Kasper Moskwiak
 * Modified by Paulo PIRES SEIXAS
 * Licensed under the Apache-2.0 license. */
(function() {
  'use strict';
  var videojs = null;
  if(typeof window.videojs === 'undefined' && typeof require === 'function') {
    videojs = require('video.js');
  } else {
    videojs = window.videojs;
  }

  (function(window, videojs) {
    var defaults = {},
        zoom,
        currentZoom = {}, // stores current zoom
        menuItemsHolder = {}; // stores menuItems

    function setSourcesSanitized(player, sources, label, customSourcePicker) {
      currentZoom = {
        label: label,
        sources: sources
      };
      if(typeof customSourcePicker === 'function'){
        return customSourcePicker(player, sources, label);
      }
      return player.src(sources.map(function(src) {
        return {src: src.src, type: src.type, res: src.res};
      }));
    }

    /*
    * Zoom menu item
    */
    var MenuItem = videojs.getComponent('MenuItem');
    var ZoomMenuItem = videojs.extend(MenuItem, {
    constructor: function(player, options, onClickListener, label){
      this.onClickListener = onClickListener;
      this.label = label;
      // Sets this.player_, this.options_ and initializes the component
      MenuItem.call(this, player, options);
      this.src = options.src;

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
    onClick: function(customSourcePicker){
      this.onClickListener(this);
      // Remember player state
      var currentTime = this.player_.currentTime();
      var isPaused = this.player_.paused();
      this.showAsLabel();

      // add .current class
      this.addClass('vjs-selected');

      // Hide bigPlayButton
      if(!isPaused){
        this.player_.bigPlayButton.hide();
      }
      if(typeof customSourcePicker !== 'function' &&
        typeof this.options_.customSourcePicker === 'function'){
        customSourcePicker = this.options_.customSourcePicker;
      }
      // Change player source and wait for loadeddata event, then play video
      // loadedmetadata doesn't work right now for flash.
      // Probably because of https://github.com/videojs/video-js-swf/issues/124
      // If player preload is 'none' and then loadeddata not fired. So, we need timeupdate event for seek handle (timeupdate doesn't work properly with flash)
      var handleSeekEvent = 'loadeddata';
      if(this.player_.techName_ !== 'Youtube' && this.player_.preload() === 'none' && this.player_.techName_ !== 'Flash') {
        handleSeekEvent = 'timeupdate';
      }
      setSourcesSanitized(this.player_, this.src, this.options_.label, customSourcePicker).one(handleSeekEvent, function() {
        this.player_.currentTime(currentTime);
        this.player_.handleTechSeeked_();
        if(!isPaused){
          // Start playing and hide loadingSpinner (flash issue ?)
          this.player_.play().handleTechSeeked_();
        }
        this.player_.trigger('zoomchange');
        });
      }
    });


    /*
     * Resolution menu button
     */
     var MenuButton = videojs.getComponent('MenuButton');
     var ZoomMenuButton = videojs.extend(MenuButton, {
       constructor: function(player, options, settings, label){
        this.sources = options.sources;
        this.label = label;
        this.label.innerHTML = options.initialySelectedLabel;
        // Sets this.player_, this.options_ and initializes the component
        MenuButton.call(this, player, options, settings);
        this.controlText('Zoom');

        if(settings.dynamicLabel){
          this.el().appendChild(label);
        }else{
          var staticLabel = document.createElement('span');
					videojs.addClass(staticLabel, 'vjs-zoom-button-staticlabel');
          this.el().appendChild(staticLabel);
        }
       },
       createItems: function(){
         var menuItems = [];
         var labels = (this.sources && this.sources.label) || {};
         var onClickUnselectOthers = function(clickedItem) {
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
                label: key,
                src: labels[key],
                initialySelected: key === this.options_.initialySelectedLabel,
                customSourcePicker: this.options_.customSourcePicker
              },
              onClickUnselectOthers,
              this.label));
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
    zoom = function(options) {
      var settings = videojs.mergeOptions(defaults, options),
          player = this,
          label = document.createElement('span'),
          groupedSrc = {};

			videojs.addClass(label, 'vjs-zoom-button-label');
			
      /**
       * Updates player sources or returns current source URL
       * @param   {Array}  [src] array of sources [{src: '', type: '', label: '', res: ''}]
       * @returns {Object|String|Array} videojs player object if used as setter or current source URL, object, or array of sources
       */

      /**
       * Returns current resolution or sets one when label is specified
       * @param {String}   [label]         label name
       * @param {Function} [customSourcePicker] custom function to choose source. Takes 3 arguments: player, sources, label. Must return player object.
       * @returns {Object}   current resolution object {label: '', sources: []} if used as getter or player object if used as setter
       */
      player.currentZoom = function(label, customSourcePicker){
        if(label == null) { return currentZoom; }
        if(menuItemsHolder[label] != null){
          menuItemsHolder[label].onClick(customSourcePicker);
        }
        return player;
      };

      /**
       * Returns grouped sources by label, resolution and type
       * @returns {Object} grouped sources: { label: { key: [] }, res: { key: [] }, type: { key: [] } }
       */
      player.getGroupedSrc = function(){
        return groupedSrc;
      };

      /**
       * Method used for sorting list of sources
       * @param   {Object} a - source object with res property
       * @param   {Object} b - source object with res property
       * @returns {Number} result of comparation
       */
      function compareZoom(a, b){
        if(!a.res || !b.res){ return 0; }
        return (+b.res)-(+a.res);
      }

      /**
       * Group sources by label, resolution and type
       * @param   {Array}  src Array of sources
       * @returns {Object} grouped sources: { label: { key: [] }, res: { key: [] }, type: { key: [] } }
       */
      function bucketSources(src){
        var zooms = {
          label: {},
          res: {},
          type: {}
        };
        src.map(function(source) {
          initZoomKey(zooms, 'label', source);
          initZoomKey(zooms, 'res', source);
          initZoomKey(zooms, 'type', source);

          appendSourceToKey(zooms, 'label', source);
          appendSourceToKey(zooms, 'res', source);
          appendSourceToKey(zooms, 'type', source);
        });
        return zooms;
      }

      function initZoomKey(zooms, key, source) {
        if(zooms[key][source[key]] == null) {
          zooms[key][source[key]] = [];
        }
      }

      function appendSourceToKey(zooms, key, source) {
        zooms[key][source[key]].push(source);
      }

      /**
       * Choose src if option.default is specified
       * @param   {Object} groupedSrc {res: { key: [] }}
       * @param   {Array}  src Array of sources sorted by resolution used to find high and low res
       * @returns {Object} {res: string, sources: []}
       */
      function chooseSrc(groupedSrc, src){
        var selectedZoom = settings['default']; // use array access as default is a reserved keyword
        var selectedLabel = '';
        if (selectedZoom === 'auto') {
          selectedZoom = src[0].res;
          selectedLabel = src[0].label;
        } else if (selectedZoom == null || !groupedSrc.res[selectedZoom]) {
          // Select low-res if default is low or not set
          selectedZoom = src[src.length - 1].res;
          selectedLabel = src[src.length -1].label;
        } else if (groupedSrc.res[selectedZoom]) {
          selectedLabel = groupedSrc.res[selectedZoom][0].label;
        }
				
        return {res: selectedZoom, label: selectedLabel, sources: groupedSrc.res[selectedZoom]};
      }
			
			function initZoomForYt(player){
				// Init resolution
				player.tech_.ytPlayer.setPlaybackQuality('default');
				
				// Capture events
				player.tech_.ytPlayer.addEventListener('onPlaybackQualityChange', function(){
					player.trigger('zoomchange');
				});
			}
			
			player.ready(function(){
				if(player.techName_ === 'Youtube'){
					// tech: YouTube
					initZoomForYt(player);
				}
			});

    };

    // register the plugin
    videojs.plugin('zoom', zoom);
  })(window, videojs);
})();
