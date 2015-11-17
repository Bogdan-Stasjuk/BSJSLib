//console.dir() - prints a directory of the properties in the object at the time you call it.


/*
* getting anchors of links on click-club cabinet page
*/
var attributes = $x("//a[parent::div[@class='menuindex' or @class='menuindexom']]");
console.dir(attributes);
var buffer = "";
for(each in attributes) {
    if(buffer != "") buffer = buffer + ", ";
    
    buffer = buffer + attributes[each].textContent.fulltrim().toLowerCase();

    if(each == attributes.length - 1) {
        buffer = buffer + ".";
        break;
    }
}


// getting table's column values
var zones = $x("//td[attribute::align=\"left\"]");
var buffer = "";
for(each in zones) {
    if(buffer != "") buffer = buffer + ", ";
    buffer = buffer + zones[each].innerHTML;
}
console.log("%s,", buffer );


// getting countries from div's list
var countries = $x("//b[parent::div[attribute::style=\"text-align:left\" and attribute::class=\"box0\"]]");
var buffer = "";
for(each in countries) {
    var country = countries[each].innerText;
    buffer = buffer + country.substring(1, country.length - 1);

    if(each == countries.length - 1) {
        buffer = buffer + ".";
        break;
    }

    buffer = buffer + ", ";
}
console.log("%s", buffer);


// getting top's categories from a's list
var categories = $x("//a[parent::div[@class='main']]");
var buffer = "";
for(each in categories) {
    if(buffer != "") buffer = buffer + ", ";
    buffer = buffer + categories[each].innerText;

    if(each == categories.length - 1) {
        buffer = buffer + ".";
        break;
    }
}
//console.log("%s", buffer);


// get items list
var items = $x("//b");
var buffer = "";
for(each in items) {
    if(buffer != "") buffer = buffer + ", ";
    buffer = buffer + items[each].innerText;

    if(each == items.length - 1) {
        buffer = buffer + ".";
        break;
    }
}
//console.log("%s", buffer);


// click-pp extremum costs
var cost = new Array();
var sum = 0;
var operators = $x("//text()[parent::div[@class='txt']]");
var buffer = "";
for(each in operators) {
    var costVal = operators[each].textContent.match(/ - (\d+) wmr/i)[1];
    cost.push(costVal);
    sum = sum + parseInt(costVal);
}
var max = Math.max.apply(Math, cost);
var min = Math.min.apply(Math, cost);
var mid = sum / cost.length;
console.log("Max: %s\nMin: %s\nMid: %s", max, min, mid);


// parsing hlam.com.ua
var question = $x("//div[@class='q_title']")[0];
var answers = $x("//li[parent::ul[parent::form]]");
console.log("%s", question.innerText.fulltrim());
for(each in answers) {
    console.log("%s", answers[each].innerText.fulltrim());
}
