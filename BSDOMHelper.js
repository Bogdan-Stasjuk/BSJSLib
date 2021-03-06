BSDOMHelper = {
    EventNames: {
        DOMActivate: "DOMActivate",
        DOMAttrModified: "DOMAttrModified",
        DOMAttributeNameChanged: "DOMAttributeNameChanged",
        DOMCharacterDataModified: "DOMCharacterDataModified",
        DOMContentLoaded: "DOMContentLoaded",
        DOMElementNameChanged: "DOMElementNameChanged",
        DOMFocusIn: "DOMFocusIn",
        DOMFocusOut: "DOMFocusOut",
        DOMNodeInserted: "DOMNodeInserted",
        DOMNodeInsertedIntoDocument: "DOMNodeInsertedIntoDocument",
        DOMNodeRemoved: "DOMNodeRemoved",
        DOMNodeRemovedFromDocument: "DOMNodeRemovedFromDocument",
        DOMSubtreeModified: "DOMSubtreeModified",
    },

    checkDOMEventsForSelector: function(selector) {
        var domEventNames = BSDOMHelper.EventNames;
        for (var eventNameKey in domEventNames) {
            console.bslogx("bind event " + domEventNames[eventNameKey]);

            $(selector).bind(domEventNames[eventNameKey], function(event) {
                console.bslog("checkDOMEventsForSelector: event =", event);
            });
        }
    },

    addEventListener(selector, eventName) {
        document.querySelector(selector).addEventListener(eventName, (event) => {
            console.bslog(event);
        });
    },

    injectJSSource: function(source, onload) {
        var nodeScript = document.createElement('script');
        nodeScript.src = source;
        nodeScript.onload = onload;
        document.head.appendChild(nodeScript);
    },

    injectJSCode: function(code, onload) {
        var nodeScript = document.createElement('script');
        nodeScript.innerHTML = code;
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

    injectCSSCode: function(code) {
        var nodeCSS = document.createElement('style');
        nodeCSS.id = "testID";
        nodeCSS.type = "text/css";
        nodeCSS.innerHTML = code;
        document.head.appendChild(nodeCSS);
    },

    injectQtip: function() {
        BSDOMHelper.injectJSSource("http://code.jquery.com/jquery-3.3.1.min.js");
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
    },

    removeHtmlComments: function(selector) {
        $(selector ? selector : 'body').contents().each(function() {
            if (this.nodeType === Node.COMMENT_NODE) {
                $(this).remove();
            }
        });
    }
}