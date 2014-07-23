/*
 * cover-img
 *
 *
 * Copyright (c) 2014 Johannes Millan
 * Licensed under the MIT license.
 */
(function ($)
{
  // fixing jQuery issue with wordpress
  if (!$) {
    $ = jQuery;
  }

  (function ($, sr)
  {
    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    var debounce = function (func, threshold, execAsap)
    {
      var timeout;

      return function debounced()
      {
        var obj = this, args = arguments;

        function delayed()
        {
          if (!execAsap) {
            func.apply(obj, args);
          }
          timeout = null;
        }

        if (timeout) {
          clearTimeout(timeout);
        } else if (execAsap) {
          func.apply(obj, args);
        }
        timeout = setTimeout(delayed, threshold || 100);
      };
    };
    // smartresize
    jQuery.fn[sr] = function (fn)
    {
      return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
    };

  })(jQuery, 'smartresize');


  (function ($)
  {
    var CoverImg = function (element, options)
    {
      var that = this;

      this.$el = $(element);
      this.options = options;
      this.$parent = this.$el.parent();

      this.setStyles();
      this.setParentStyles();
      this.$el.width('100%');

      // IF image
      $("<img/>") // Make in memory copy of image to avoid css issues
        .attr("src", this.$el.attr("src"))
        .load(function ()
        {
          that.real_width = this.width;   // Note: $(this).width() will not
          that.real_height = this.height; // work for in memory images.
          $(window).trigger('resize');
        });

      $(window).smartresize(function ()
      {
        that.resizeToCover();
      });

    };

    CoverImg.prototype.setStyles = function ()
    {
      var cssPosition = this.$el.css('position'),
        cssMaxWidth = this.$el.css('max-width'),
        cssMaxHeight = this.$el.css('max-height');

      if (cssPosition !== 'relative' && cssPosition !== 'absolute') {
        this.$el.css('position', 'relative');
      }
      if (cssMaxWidth !== 'none') {
        this.$el.css('max-width', 'none');
      }
      if (cssMaxHeight !== 'none') {
        this.$el.css('max-height', 'none');
      }
    };

    CoverImg.prototype.handleTableCells = function ()
    {
      this.$parent.css('position', 'relative');
      this.$el.wrap('<div style="position: absolute; width: 100%; height: 100%; top: 0; left:0;"></div>');
      this.$parent = this.$el.parent();
      this.$parent.css('overflow', 'hidden');
    };

    CoverImg.prototype.setParentStyles = function ()
    {
      var cssPosition = this.$parent.css('position'),
        cssOverflow = this.$parent.css('overflow'),
        cssDisplay = this.$parent.css('display');

      if (cssDisplay !== 'block' && cssDisplay !== 'inline-block') {
        this.handleTableCells();
      } else {
        if (cssPosition !== 'relative' && cssPosition !== 'absolute') {
          this.$parent.css('position', 'relative');
        }
        if (cssOverflow !== 'hidden') {
          this.$parent.css('overflow', 'hidden');
        }
      }
    };

    CoverImg.prototype.resizeToCover = function ()
    {
      var scaled_width,
        scaled_height,
        offset_top,
        offset_left,
        par_height = this.$parent.height(),
        par_width = this.$parent.width();

      var scale_h = par_width / this.real_width;
      var scale_v = par_height / this.real_height;


      if (scale_h > scale_v) {
        scaled_width = Math.round(scale_h * this.real_width);
        scaled_height = Math.round(scale_h * this.real_height);
        offset_top = Math.round((par_height - scaled_height) / 2);
        offset_left = 0;

      } else {
        scaled_width = Math.round(scale_v * this.real_width);
        scaled_height = Math.round(scale_v * this.real_height);
        offset_top = 0;
        offset_left = Math.round((par_width - scaled_width) / 2);
      }

      // apply calculated values
      this.$el.width(scaled_width);
      this.$el.height(scaled_height);
      this.$el.css({
        top: offset_top,
        left: offset_left
      });
    };


    CoverImg.DEFAULTS = {
    };

    // Collection method.
    $.fn.coverImg = function (options)
    {
      return this.each(function ()
      {
        var options = $.extend({}, CoverImg.DEFAULTS, options);
        new CoverImg(this, options);
      });
    };

    $(window).on('load', function ()
    {
      $('[data-cover-img]').each(function ()
      {
        $(this).coverImg();
      });
    });
  }($));
}
($)
  )
;
