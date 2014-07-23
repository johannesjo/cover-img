# cover-img

Automatically calculates image-width and height of an image to always cover its parent-size while keeping the image-proportions.

Works inside block-elements, inline-block-elements and even table-cells.

It uses a variation of John Hahns debouncing function to listen the window-resize event
 http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/

## Getting Started

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/johannesjo/cover-img/master/dist/jquery.cover-img.min.js
[max]: https://raw.github.com/johannesjo/cover-img/master/dist/jquery.cover-img.js

In your web page:

```html
<div class="img-container" style="width:100%; height: 300px;">
  <img src="http://placekitten.com/700/500" alt="kitty kitty kitty">
</div>

<script src="jquery.js"></script>
<script src="dist/cover-img.min.js"></script>
<script>
jQuery(function($) {
  $(img).coverImg(); //
});
</script>
```

Or use it via the data-attribute
```html
<div class="img-container">
  <img data-cover-img="" src="http://placekitten.com/200/350"  alt="kitty kitty kitty">
</div>
```


## Release History
Version 1.0 - well it works
