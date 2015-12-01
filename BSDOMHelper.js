/*
BSDOMHelper head
 */

/**
 * Cap for console's logger.
 * @return {void}
 */
console.logx = function() {};


BSDOMHelper = {
    domEventNames: function() {
        return [
            "DOMActivate",
            "DOMAttrModified",
            "DOMAttributeNameChanged",
            "DOMCharacterDataModified",
            "DOMContentLoaded",
            "DOMElementNameChanged",
            "DOMFocusIn",
            "DOMFocusOut",
            "DOMNodeInserted",
            "DOMNodeInsertedIntoDocument",
            "DOMNodeRemoved",
            "DOMNodeRemovedFromDocument",
            "DOMSubtreeModified",
        ];
    },

    checkDOMEventsForSelector: function(selector) {
        var domEventNames = BSDOMHelper.domEventNames();
        for (var eventNameKey in domEventNames) {
            console.logx("bind event " + domEventNames[eventNameKey]);

            $(selector).bind(domEventNames[eventNameKey], function(event) {
                console.log("currentTarget = " + event.currentTarget.localName + ", type = " + event.type + ", localName = " + event.target.localName + ", className = " + event.target.className + ", id = " + event.target.id);
            });
        }
    },

    injectJSSource: function(source, onload) {
        var nodeScript = document.createElement('script');
        nodeScript.src = source;
        nodeScript.onload = onload;
        document.head.appendChild(nodeScript);
    },

    injectCSSSource: function(source) {
        var nodeCSS = document.createElement('link');
        nodeCSS.rel = "stylesheet";
        nodeCSS.type = "text/css";
        nodeCSS.href = source;
        document.head.appendChild(nodeCSS);
    },

    injectQtip: function() {
        BSDOMHelper.injectJSSource("//code.jquery.com/jquery-2.1.4.min.js");
        BSDOMHelper.injectJSSource("https://cdnjs.cloudflare.com/ajax/libs/qtip2/2.2.1/basic/jquery.qtip.js");
        BSDOMHelper.injectJSSource("https://cdnjs.cloudflare.com/ajax/libs/qtip2/2.2.1/basic/imagesloaded.pkg.min.js");

        BSDOMHelper.injectCSSSource("https://cdnjs.cloudflare.com/ajax/libs/qtip2/2.2.1/basic/jquery.qtip.css");
    },

    /**
     * Detects the document is "ready" state and calls "callback" after that.
     * @param  {function} callback Function that will call after document will be ready.
     * @return {void}
     */
    documentIsReady: function(callback) {
        $(document).ready(function() {
            callback();
        });
    },

    triggerMousedown: function(selector, pageX, pageY) {
        var $el = $(selector);
        var event = jQuery.Event("mousedown", {
            which: 1,
            pageX: pageX,
            pageY: pageY
        });
        $el.trigger(event);
    }
}

/*
BSDOMHelper tail
 */