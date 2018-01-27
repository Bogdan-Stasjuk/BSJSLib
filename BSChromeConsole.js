/**
 * Equivalent of console.log
 */
console.bslog = console.log;

/**
 * Disable standard logging by console
 */
console.log = function(...args) {};

/**
 * logs info with variable amount of arguments using String.format
 * @return {void}
 */
console.bslogf = function() {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }
    console.bslog(s);
}

/**
 * Cap for console logger's equivalent
 * @return {void}
 */
console.bslogx = function(...args) {};

/**
 * Cap for console's logger.
 * @return {void}
 */
console.logx = function() {};

/**
 * Cap for equivalent of console logger with format
 * @return {void}
 */
console.bslogfx = function(...args) {};

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