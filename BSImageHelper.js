BSImageHelper = {
    /**
     * Resizes image to fit to the current window
     * @param  {Image} img Image for manipulation
     * @return {Dictionary} width: width, height: height Resized image size
     */
    fitToWindow: function(img) {
        img.css('width', 'auto');
        img.css('height', 'auto');

        var windowWidth = window.innerWidth; // Max width for the image
        var windowHeight = window.innerHeight; // Max height for the image
        console.bslogx(String.format("windowWidth: {0}, windowHeight: {1}", windowWidth, windowHeight));

        var width = img.width(); // Current image width
        var height = img.height(); // Current image height

        // Check if the current width is larger than the max
        if (width > windowWidth) {
            var ratio = windowWidth / width; // get ratio for scaling image
            width = windowWidth;
            height = height * ratio;
            img.css("width", width); // Set new width
            img.css("height", height); // Scale height based on ratio
        }

        // Check if current height is larger than the max
        if (height > windowHeight) {
            var ratio = windowHeight / height; // get ratio for scaling image
            width = width * ratio;
            height = windowHeight;
            img.css("width", width); // Scale width based on ratio
            img.css("height", height); // Set new height
        }

        return {
            width: width,
            height: height,
        };
    },

    imageExists(url, completion) {
      if (url) {
          $.get(url).done(function() { completion(true); }).fail(function() { completion(false); });
      } else {
          completion(false);
      }
    },

    imageSize(url, completion) {
        var img = new Image();
        img.onload = function() {
            console.bslogx("imageSize =", this.width + 'x' + this.height);
            completion(this.width, this.height);
        }
        img.src = url;
    }
}
