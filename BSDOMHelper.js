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

    injectJSsource: function(source, onload) {
        var nodeScript = document.createElement('script');
        nodeScript.src = source;
        nodeScript.onload = onload;
        document.head.appendChild(nodeScript);
    }
}

/*
BSDOMHelper tail
 */
