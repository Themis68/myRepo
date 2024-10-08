/**
 * videojs-bug
 *
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
        return Constructor; 
      }; 
    }();

    function _classCallCheck(instance, Constructor) { 
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

        // objet pas encore créé dans DOM

        return _possibleConstructorReturn(this, (BugComponent.__proto__ || Object.getPrototypeOf(BugComponent)).call(this, player, options));
      }

      // *****************************************************************************************
      // The `createEl` function of a component creates its DOM element.
      //
      _createClass(BugComponent, [{
        key: 'createEl',
        value: function createEl() {
          
          var options = this.options();

          // Create the element
          switch (options.type) {
            case "equipe":
            case "arbitre":
              // object général
              var element = videojs.dom.createEl('div', {
                className: "vjs-bug-compose",
              })

              // FANION
              if (options.type == "equipe") {
                var pict = videojs.dom.createEl('img', {
                  src: options.imgSrc,
                  title: options.alt  || "",
                  className: (options.visibility ? "vjs-bug-show" : "vjs-bug-hide"),
                  id: options.id + "F"
                });
                pict.style.padding= options.paddingInterne;
                pict.style.width= "14%";
              }

              // NOM EQUIPE
              var span = videojs.dom.createEl('span', {
                height: options.height,
                className: options.classeCSSText + " " + (options.visibility ? "vjs-bug-show" : "vjs-bug-hide"),
                id: options.id + "T",
                innerHTML: options.libelle
              });
              span.style.padding = options.paddingInterne;

              // SILHOUETTE
              var canvas = videojs.dom.createEl('canvas', {
                className: options.classeCSSCanvas + " " + (options.visibility ? "vjs-bug-show" : "vjs-bug-hide"),
                height: 30,
                width: 30,
                id: options.id + "C"
              });
              canvas.style.padding= options.paddingInterne;

              // Assemblage de l'objet
              
              (options.type == "equipe" ? element.appendChild(pict) : "");
              element.appendChild(span);
              element.appendChild(canvas);
              break;

            case "pict":
              var element = videojs.dom.createEl('img', {
                src: options.imgSrc,
                width: options.width,
                height: options.height,
                title: options.alt  || "",
                className: (options.visibility ? "vjs-bug-show" : "vjs-bug-hide"),
                id: options.id
              });
              break;

            case "text":
              var element = videojs.dom.createEl('span', {
                width: options.width, 
                height: options.height,
                className: options.classeCSS + " " + (options.visibility ? "vjs-bug-show" : "vjs-bug-hide"),
                id: options.id,
                innerHTML: options.libelle
              });
              break;
            
            case "canvas":
            var element = videojs.dom.createEl('canvas', {
                width: options.width,
                height: options.height,
                className: options.classeCSS + " " + (options.visibility ? "vjs-bug-show" : "vjs-bug-hide"),
                id: options.id,
              });
              break;

            default:
              break;
          }

          // préparation de l'objet composé
          var bugElement = videojs.dom.createEl('div', {         // element container
            className: 'vjs-bug vjs-bug-' + options.position,
            id: options.id
          });

          // Possibly make it a link
          if (options.link) {
            var linkElement = videojs.dom.createEl('a', {}, {
              id: options.id + "Z",
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
          bugElement.style.opacity = options.opacity || "";
          bugElement.style.padding = options.padding || "";
          bugElement.style.boxSizing = "border-box";

		     //bugElement.getBoundingClientRect(); sont à ZERO car l'objet n'a pas été recalculé à ce stade. Il le sera lors de l'init de la page

          // Position
          /*
          switch (options.position) {
           // case 'tc': // horizontal center et top
            case 'bc': // horizontal center et bottom
            case 'cc':  // centrage total
              options.left = (document.getElementById("myVideo").offsetWidth / 2)+ 'px'; // 'px' est obligatoire via cette déclaration alors que left depuis la délczration via la vidéo n'en n'a pas besoin
              break;
            
            case 'cl':  // vertical center et left
            case 'cr':  // vertical center et right
            case 'cc':  // centrage total
              options.top  = (document.getElementById("myVideo").offsetHeight / 2)+ 'px'; // 'px' est obligatoire via cette déclaration alors que left depuis la délczration via la vidéo n'en n'a pas besoin

              break;

            default:
              options.position = 'br';
          }
*/
          // espaces depuis le bord : padding
          bugElement.style.left = options.left || "";
          bugElement.style.top = options.top || "";
          bugElement.style.bottom = options.bottom || "";
          bugElement.style.right = options.right || "";

          // bugElement n'est pas encore présent dans le DOM
          return bugElement;
        }
      }]);
      return BugComponent;

      // *****************************************************************************************
    }(VjsClickableComponent);

    // Cross-compatibility for Video.js 5 and 6.
    var registerPlugin = videojs.registerPlugin || videojs.plugin;

    var validateOptions = function validateOptions(options) {
      // CLIC 3

        if (options.opacity > 1) {
          options.opacity = 1;    // correction en cas de dépassement de la valeur
        }
        if (options.opacity < 0) {
          options.opacity = 0;  // correction en cas de dépassement de la valeur
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
      for (var i=0 ; i < options.length; i++) {
        validateOptions(options[i]);
        videojs.registerComponent('BugComponent', BugComponent);  // MAJ faite pour gérer le tableau
        player.addChild('BugComponent', options[i], 1);  // Insert bug as first item after <video>:
      }
      // Objet pas créé dans DOM
  
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