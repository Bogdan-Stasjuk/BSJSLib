/*
 * Trim functions
 */

String.prototype.trim = String.prototype.trim || function () {
    return this.replace(/^\s+|\s+$/g, "");
};

String.prototype.ltrim = String.prototype.ltrim || function () {
    return this.replace(/^\s+/, "");
};

String.prototype.rtrim = String.prototype.rtrim || function () {
    return this.replace(/\s+$/, "");
};

String.prototype.fulltrim = function () {
    return this.replace(/\s+/g, " ").trim();
};


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


BSStringHelper = {

    textPrompt: function() {
        var text = prompt("Input text");
        text = text.fulltrim();

        return text;
    },


    getHostname: function(url) {
        var a = document.createElement('a');
        a.href = url;
        return a.hostname;
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

        for (i in words) {
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