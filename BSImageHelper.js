BSImageHelper = {
  /**
   * Resizes image to fit to the current window
   * @param  {Image} img Image for manipulation
   * @return {Dictionary} width: width, height: height Resized image size
   */
  fitToWindow: function(img) {
    img.css('width', 'auto');
    img.css('height', 'auto');

    var maxWidth = $(window).width(); // Max width for the image
    var maxHeight = $(window).height(); // Max height for the image
    var ratio = 0; // Used for aspect ratio
    var width = img.width(); // Current image width
    var height = img.height(); // Current image height

    // Check if the current width is larger than the max
    if (width > maxWidth) {
      ratio = maxWidth / width; // get ratio for scaling image
      width = maxWidth;
      height = height * ratio;
      img.css("width", width); // Set new width
      img.css("height", height); // Scale height based on ratio
    }

    // Check if current height is larger than the max
    if (height > maxHeight) {
      ratio = maxHeight / height; // get ratio for scaling image
      width = width * ratio;
      height = maxHeight;
      img.css("width", width); // Scale width based on ratio
      img.css("height", height); // Set new height
    }

    return {
      width: width,
      height: height,
    };
  }
}