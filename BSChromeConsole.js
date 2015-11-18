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

    /**
     * Clears console when document is ready.
     * @return {void}
     */
    $(document).ready(function() {
        console.clear();
    });


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