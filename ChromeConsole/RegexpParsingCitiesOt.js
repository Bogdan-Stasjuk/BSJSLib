/*
 Parsing of OT google docs
 */
// print value in console log and show in alert window.
// timFlag: 0 = nothing, 1 - trim, 2 - fulltrim
function showValue(value, trimFlag) {
    switch(trimFlag) {
        case 1:
            value = value.trim();
            break;
        case 2:
            value = value.fulltrim();
    }

    console.log("%s", value);
    alert(value);
}

var text = prompt("Please input OT gdoc");
var matches = new Array();

// meta canonical, title, keywords
matches = text.match(/URL:\s*(\S+)\s*Title:\s*([^\n\r\t]+)\s*Keyword:\s*(.+)/);
//console.log("%s", matches);
copy(matches[1].fulltrim());
showValue(matches[1], 2);
copy(matches[2].fulltrim());
showValue(matches[2], 2);
copy(matches[3].fulltrim());
showValue(matches[3], 2);

// meta description
matches = text.match(/meta\s*description\s*\(160\s*characters\s*max\)\s*([^\n\r\t]+)/);
//console.log("%s", matches);
copy(matches[1].fulltrim());
showValue(matches[1], 2);

// top block
var matches = text.match(/headline\s*\(1\)\s*<h2>\s*\(40\s*characters\s*per\s*line,\s*3\s*lines\s*max\)\s*(((?!\r\n\s*\r\n)|(?!body\s*text\s*\(1\)\s*<p>)[\s\S])*)\s*body\s*text\s*\(1\)\s*<p>\s*(((?!headline\s*\(2\)\s*<h2>)[\s\S])*)/);
//console.log("%s", matches);
copy(matches[1].fulltrim());
showValue(matches[1], 2);
copy(matches[3].trim());
showValue(matches[3], 1);

// accordions
//var matches = text.match(/body\s+text\s*\(2\)<p> *\S*\s*([^\n\r\t]+)\s*(((?!1.\s+)[\s\S])*)(((?!\r\n\s*\r\n)[\s\S])+)\s*([\s\S]+)?/);
var matches = text.match(/body\s+text\s*\(2\)<p> *\S*\s*(((?!Subheading\s*\(2\)\s*<p>\s*\[h2\s*\(accordion\)\])[\s\S])+)\s*(((?!1.\s+)[\s\S])*)(((?!\r\n\s*\r\n)[\s\S])+)\s*([\s\S]+)?/);
//console.log("%s", matches);
copy(matches[1].trim());
showValue(matches[1], 1);
copy(matches[5].trim());
showValue(matches[5], 1);
if(typeof matches[7] != "undefined")
{
    copy(matches[7].trim());
    showValue(matches[7], 1);
}
