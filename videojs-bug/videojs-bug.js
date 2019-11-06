/**
 * videojs-bug
 * @version 1.0.0-rc.2
 * @copyright 2017 johndanek <john.danek@teamcoco.com>
 * @license MIT
 * Modified by Paulo Pires Seixas
 -- version 1.0.0-ps.1 : 
      gestion de plusieurs objets
      gestion de plusieurs types d'objets : pict, texte, canvas
-- version 1.0.0-ps.2 : 
      gestion de la position de l'objet (left, top, right et bootom)
 
 
 */
(function(f){
  // INIT PAGE 1
  if(typeof exports==="object" && typeof module!=="undefined"){
    module.exports=f()
  } else if(typeof define==="function"&&define.amd){
    define([],f)
  } else {
    var g;
    if(typeof window!=="undefined"){
      g=window
    } else if (typeof global!=="undefined"){
      g=global
    } else if (typeof self!=="undefined"){
      g=self
    } else {
      g=this
    }
    g.videojsBug = f()
    //console.log('INIT1', g);
  }
})(function(){
  // INIT PAGE 2
  var define,module,exports;
  return (function e(t,n,r){
    function s(o,u){
      if(!n[o]){
        if(!t[o]){
          var a=typeof require=="function" && require;
          if(!u&&a)return a(o,!0);
          if(i)return i(o,!0);
          var f=new Error("Cannot find module '"+o+"'");
          throw f.code="MODULE_NOT_FOUND",f
        }
        var l=n[o]={exports:{}};
        t[o][0].call(l.exports,function(e){
          var n=t[o][1][e];
          return s(n?n:e)},l,l.exports,e,t,n,r)
      }
      return n[o].exports
    }
    var i=typeof require=="function"&&require;
    for(var o=0;o<r.length;o++)s(r[o]);
    //console.log('INIT2', s);
    return s
  })

  ({1:[function(require,module,exports){
  
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () {
      // INIT PAGE 3
      function defineProperties(target, props) { 
        for (var i = 0; i < props.length; i++) { 
          var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; 
          if ("value" in descriptor) descriptor.writable = true; 
          Object.defineProperty(target, descriptor.key, descriptor); 
        } 
      } 
      return function (Constructor, protoProps, staticProps) { 
        if (protoProps) defineProperties(Constructor.prototype, protoProps); 
        if (staticProps) defineProperties(Constructor, staticProps); 
        //console.log('INIT3', Constructor);
        return Constructor; 
      }; 
    }();

    function _classCallCheck(instance, Constructor) { 
      //console.log('CLIC4', instance, Constructor);
      // CLIC 4
      if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } 
    }

    function _possibleConstructorReturn(self, call) { 
      // JAMAIS
      if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } 
      return call && (typeof call === "object" || typeof call === "function") ? call : self; 
    }

    function _inherits(subClass, superClass) { 
      // INIT PAGE 5
      if (typeof superClass !== "function" && superClass !== null) { 
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); 
      } 
      subClass.prototype = Object.create(superClass && superClass.prototype, { 
        constructor: { value: subClass, enumerable: false, writable: true, configurable: true } 
      }); 
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; 
    }

    // Check for videojs before doing anything else:
    function VideojsUndefinedException(message) {
      // JAMAIS
      this.message = message;
    }

    var videojs = window.videojs;

    if (!videojs) {
      // JAMAIS
      throw new VideojsUndefinedException('video-bug: "videojs" is undefined!');
    }
    var VjsClickableComponent = videojs.getComponent('ClickableComponent');

    /**
    * Bug UI Component class
    */

    var BugComponent = function (_VjsClickableComponen) {
      // INIT PAGE 4

      _inherits(BugComponent, _VjsClickableComponen);

      function BugComponent(player, options) {
        _classCallCheck(this, BugComponent);
        return _possibleConstructorReturn(this, (BugComponent.__proto__ || Object.getPrototypeOf(BugComponent)).call(this, player, options));
      }

      // The `createEl` function of a component creates its DOM element.
      _createClass(BugComponent, [{
        key: 'createEl',
        value: function createEl() {
          
          var options = this.options();

          var bugElement = videojs.createEl('span', {         // element container
            className: 'vjs-bug vjs-bug-' + options.position
          });

          // Create the element
          switch (options.type) {
            case "pict":
              var element = videojs.createEl('img', {
                src: options.imgSrc,
                width: options.width,
                height: options.height,
                title: options.alt  || "",
                className: (options.visibility ? "vjs-bug-show" : "vjs-bug-hide")
              });
              element.id = options.id;
              break;

            case "text":
              var element = videojs.createEl('span', {
                width: options.width, 
                height: options.height,
                className: options.classeCSS + " " + (options.visibility ? "vjs-bug-show" : "vjs-bug-hide"),
              });
              element.innerHTML = options.libelle;
              element.id = options.id;
             // element.style = "padding-left: 3px; padding-right: 3px;";
              break;
            
            case "canvas":
            var element = videojs.createEl('canvas', {
                width: options.width,
                height: options.height,
                className: options.classeCSS + " " + (options.visibility ? "vjs-bug-show" : "vjs-bug-hide")
              });
              element.id = options.id;
              break;

            default:
              break;
          }
        
          // Possibly make it a link
          if (options.link) {
            var linkElement = videojs.createEl('a', {}, {
              href: options.link,
              target: '_blank'
            });

            linkElement.appendChild(element);
            bugElement.appendChild(linkElement);
          } else {
            bugElement.className += ' no-link';
            bugElement.appendChild(element);
          }

          // Styling
          bugElement.style.opacity = options.opacity;

          // on ne traite pas le padding pour les centrage horizontaux et verticaux
          bugElement.style.padding = options.padding || "";
          bugElement.style.left = options.left || "";
          bugElement.style.top = options.top || "";
          bugElement.style.right = options.right || "";
          bugElement.style.bottom = options.bottom || "";
         // }

          return bugElement;
        }
      }]);
      return BugComponent;
    }(VjsClickableComponent);

    // Cross-compatibility for Video.js 5 and 6.
    var registerPlugin = videojs.registerPlugin || videojs.plugin;

    var validateOptions = function validateOptions(options) {
      // CLIC 3
      //console.log('CLIC3', options);
      // traitement éventuel de la position
     // for (var i=0; i < options.length; i++) {
        switch (options.position) {
          case 'tl':
          case 'tr':
          case 'bl':
          case 'br':
          case 'tc':  // horizontal center et top
          case 'cc':  // centrage total
          case 'bc':  // horizontal center et bottom
          case 'cl':  // vertical center et left
          case 'cr':  // vertical center et right
          break;

          default:
            options.position = 'br';
        }

        if (options.opacity > 1) {
          options.opacity = 1;    // corerction en cas de dépassement de la valeur
        }
        if (options.opacity < 0) {
          options.opacity = 0;  // corerction en cas de dépassement de la valeur
        }
      //}
    };

    /**
     * Function to invoke when the player is ready.
     *
     * This is a great place for your plugin to initialize itself. When this
     * function is called, the player will have its DOM and child components
     * in place.
     *
     * @function onPlayerReady
     * @param    {Player} player
     * @param    {Object} [options={}]
     */
    var onPlayerReady = function onPlayerReady(player, options) {
      // CLIC 2
      //console.log('CLIC2', BugComponent);
       for (var i=0 ; i < options.length; i++) {
        validateOptions(options[i]);
        //console.log("options4", options[i]);
        videojs.registerComponent('BugComponent', BugComponent);  // MAJ faite pour gérer le tableau
        player.addChild('BugComponent', options[i], 1);  // Insert bug as first item after <video>:
       }
    };

    /**
     * A video.js plugin.
     *
     * In the plugin function, the value of `this` is a video.js `Player`
     * instance. You cannot rely on the player being in a "ready" state here,
     * depending on how the plugin is invoked. This may or may not be important
     * to you; if not, remove the wait for "ready"!
     *
     * @function bug
     * @param    {Object} [options={}]
     *           An object of options left to the plugin author to define.
     */
    var bug = function bug(options) {
      // CLIC 1
      //console.log('CLIC1', options);
      var _this2 = this;  // structure de "video"

      // options = les objets passés par Bug (tableau)
      this.ready(function () {
        onPlayerReady(_this2, options); //videojs.mergeOptions(defaults, options)); // appel fonction onPlayerReady()
      });
    };

    // Register the plugin with video.js.
    registerPlugin('bug', bug);

    // Include the version number.
    bug.VERSION = '1.0.1';  // version avec modification de Paulo

    exports.default = bug;
  },{}]},{},[1])(1)
});