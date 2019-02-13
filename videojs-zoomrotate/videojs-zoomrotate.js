//console.log('zoomrotate: Start');

(function(){
    var defaults, extend;
  ////  console.log('zoomrotate: Init defaults');
    defaults = {
      zoom: 1,
      rotate: 0,
      debug: true
    };
    extend = function() {
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

  /**
    * register the zoomrotate plugin
    */

    videojs.plugin('zoomrotate', function(settings){
     //   if (defaults.debug) console.log('zoomrotate: Register init');

        var options, player, video, poster;
        options = extend(defaults, settings);

        /* Grab the necessary DOM elements */
        player = this.el();
        video = this.el().getElementsByTagName('video')[0];
        //poster = this.el().getElementsByTagName('div')[1]; // div vjs-poster

       // if (options.debug) console.log('zoomrotate: '+video.style);
       // if (options.debug) console.log('zoomrotate: '+poster.style);
       // if (options.debug) console.log('zoomrotate: '+options.rotate);
       // if (options.debug) console.log('zoomrotate: '+options.zoom);

        /* Array of possible browser specific settings for transformation */
        var properties = ['transform', 'WebkitTransform', 'MozTransform',
                          'msTransform', 'OTransform'],
            prop = properties[0];

        /* Iterators */
        var i,j;

        /* Find out which CSS transform the browser supports */
        for(i=0,j=properties.length;i<j;i++){
          if(typeof player.style[properties[i]] !== 'undefined'){
            prop = properties[i];
            break;
          }
        }

        /* Let's do it */
        player.style.overflow = 'hidden';
        video.style[prop]='scale('+options.zoom+') rotate('+options.rotate+'deg)';
       // poster.style[prop]='scale('+options.zoom+') rotate('+options.rotate+'deg)';
       // if (options.debug) console.log('zoomrotate: Register end');
    });
})();

/*
@extends Component

var Component = function () {


e
   * Get the value of an attribute on the `Component`s element.
   *
   * @param {string} attribute
   *        Name of the attribute to get the value from.
   *
   * @return {string|null}
   *         - The value of the attribute that was asked for.
   *         - Can be an empty string on some browsers if the attribute does not exist
   *           or has no value
   *         - Most browsers will return null if the attibute does not exist or has
   *           no value.
   *
   * @see [DOM API]{@link https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute}
   


  Component.prototype.getAttribute = function getAttribute(attribute) {
    return Dom.getAttribute(this.el_, attribute);
  };
}

exports.getAttribute = getAttribute;


 * Get the value of an element's attribute
 *
 * @param {Element} el
 *        A DOM element
 *
 * @param {string} attribute
 *        Attribute to get the value of
 *
 * @return {string}
 *         value of the attribute
 
function getAttribute(el, attribute) {
  return el.getAttribute(attribute);
}


 * Get an element's attribute values, as defined on the HTML tag
 * Attributes are not the same as properties. They're defined on the tag
 * or with setAttribute (which shouldn't be used with HTML)
 * This will return true or false for boolean attributes.
 *
 * @borrows dom:getElAttributes as videojs.getAttributes
 
videojs.getAttributes = Dom.getElAttributes;
*/