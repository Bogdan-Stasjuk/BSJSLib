/*
 * Trim functions
 */

String.prototype.trim = String.prototype.trim || function() {
    return this.replace(/^\s+|\s+$/g, "");
};

String.prototype.ltrim = String.prototype.ltrim || function() {
    return this.replace(/^\s+/, "");
};

String.prototype.rtrim = String.prototype.rtrim || function() {
    return this.replace(/\s+$/, "");
};

String.prototype.fulltrim = function() {
    return this.replace(/\s+/g, " ").trim();
};


String.format = function() {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }

    return s;
}

String.prototype.endsWith = function(suffix) {
    return (this.substr(this.length - suffix.length) === suffix);
}

String.prototype.startsWith = function(prefix) {
    return (this.substr(0, prefix.length) === prefix);
}


// string to lowercase and first letter to uppercase
String.prototype.firstToUpper = String.prototype.firstToUpper || function() {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

// reversing each word in string
String.prototype.reverse = function() {

    // show input string
    //console.log(String(this));

    var patternFormat = "[{1}\\w]+";

    // getting words array
    var patternWords = RegExp(patternFormat.replace("{1}", "^"));
    //console.log(patternWords);
    var words = this.split(patternWords);
    //console.log(words);

    // getting delimeters array
    var patternDelims = RegExp(patternFormat.replace("{1}", ""));
    //console.log(patternDelims);
    var delimeters = this.split(patternDelims);
    //console.log(delimeters);

    // reversing
    var result = "";
    for (var i = 0; i < words.length; i++) {
        var origWord = words[i];
        var reversedWord = "";
        var j = origWord.length;
        while (j > 0) {

            reversedWord += origWord.substring(j - 1, j);

            j--;
        }

        if (delimeters.length > i + 1)
            result = result.concat(reversedWord, delimeters[i + 1]);
    }

    return result;
}

String.prototype.transliterate = String.prototype.transliterate || function() {
    var translitDic = {
        "Ё": "YO",
        "Й": "I",
        "Ц": "TS",
        "У": "U",
        "К": "K",
        "Е": "E",
        "Н": "N",
        "Г": "G",
        "Ш": "SH",
        "Щ": "SCH",
        "З": "Z",
        "Х": "H",
        "Ъ": "'",
        "ё": "yo",
        "й": "i",
        "ц": "ts",
        "у": "u",
        "к": "k",
        "е": "e",
        "н": "n",
        "г": "g",
        "ш": "sh",
        "щ": "sch",
        "з": "z",
        "х": "h",
        "ъ": "'",
        "Ф": "F",
        "Ы": "I",
        "В": "V",
        "А": "a",
        "П": "P",
        "Р": "R",
        "О": "O",
        "Л": "L",
        "Д": "D",
        "Ж": "ZH",
        "Э": "E",
        "ф": "f",
        "ы": "i",
        "в": "v",
        "а": "a",
        "п": "p",
        "р": "r",
        "о": "o",
        "л": "l",
        "д": "d",
        "ж": "zh",
        "э": "e",
        "Я": "Ya",
        "Ч": "CH",
        "С": "S",
        "М": "M",
        "И": "I",
        "Т": "T",
        "Ь": "'",
        "Б": "B",
        "Ю": "YU",
        "я": "ya",
        "ч": "ch",
        "с": "s",
        "м": "m",
        "и": "i",
        "т": "t",
        "ь": "'",
        "б": "b",
        "ю": "yu"
    };

    return this.split('').map(function(symbol) {
        return translitDic[symbol] || symbol;
    }).join('');
}


BSStringHelper = {

    textPrompt: function() {
        var text = prompt("Input text");
        text = text.fulltrim();

        return text;
    },

    isUrlValid: function(url) {
        return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
    },

    getHostname: function(url) {
        var a = document.createElement('a');
        a.href = url;
        return a.hostname;
    },

    getUrlParameter: function(url, param) {
        var urlVariables = url.substr(url.indexOf('?') + 1).split('&');
        for (var i = 0; i < urlVariables.length; i++) {
            var urlParam = urlVariables[i].split('=');

            if (urlParam[0] === param) {
                var result = urlParam[1];
                return (result === undefined) ? true : result;
            }
        }
    },

    // string to lowercase and dot to comma
    strToLowCaseAndDotToComma: function() {
        var text = textPrompt();
        text = text.replace(/\./g, ",");
        text = text.toLowerCase();

        console.log("%s", text);

        return text;
    },


    // string to lowercase and whitespaces to hyphens
    strToLowCaseAndSpaceToHyphen: function() {
        var text = textPrompt();
        text = text.replace(/ /g, "-");
        text = text.toLowerCase();

        console.log("%s", text);

        return text;
    },


    strToUpperCaseAndSpaceToUnderscore: function() {
        var text = prompt();
        text = text.replace(/[^\w]/g, "_");
        text = text.toUpperCase();

        console.log("%s", text);

        return text;
    },
    // using
    // copy(strToUpperCaseAndSpaceToUnderscore())


    stringToMethodName: function() {
        var text = textPrompt();
        text = text.toLowerCase();
        var words = text.split(" ");
        var result = "";

        for (var i in words) {
            var word = words[i].charAt(0).toUpperCase() + words[i].slice(1);

            if (result == "")
                word = word.toLowerCase();

            result = result.concat(word);
        }

        console.log("%s", result);

        return result;
    },
    // using
    // copy(stringToMethodName());


    stringToProjectName: function() {
        var projectName = stringToMethodName();
        projectName = projectName.charAt(0).toUpperCase() + projectName.slice(1);
        console.log("%s", projectName);
        return projectName;
    },
    // using
    // copy(stringToProjectName());
}

/*
BSStringHelper end
 */