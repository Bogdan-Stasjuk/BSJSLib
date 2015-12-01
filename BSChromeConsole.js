/*
BSChromeConsole head
 */

/**
 * Equivalent of console.log
 */
console.bslog = console.log;

/**
 * Cap for console logger's equivalent
 * @return {[type]} [description]
 */
console.bslogx = function() {};

/**
 * Cap for console's logger.
 * @return {void}
 */
console.logx = function() {};

/**
 * Cap for console's clear function.
 * @return {void}
 */
console.clearx = function() {};


BSChromeConsole = {
    /**
     * Include jquery (https://jquery.com/download/) to the current page.
     * @return {void}
     */
    includejQuery: function() {
        var scriptElement = document.createElement('script');
        scriptElement.src = "//code.jquery.com/jquery-2.1.4.min.js";
        document.getElementsByTagName('head')[0].appendChild(scriptElement);
    },

    /**
     * Set all checkboxes to checked state.
     * @return {void}
     */
    checkAllCheckboxes: function() {
        var allInputs = document.getElementsByTagName("input");
        for (var i = 0, max = allInputs.length; i < max; i++) {
            if (allInputs[i].type === 'checkbox')
                allInputs[i].checked = true;
        }
    }
}

/*
BSChromeConsole tail
 */