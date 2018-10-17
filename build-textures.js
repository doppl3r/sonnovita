/*/
 *  Generate CSS texture backgrounds from a local json file.
 *  Uses node.js File System to read and write to CSS.
 *  By: Jacob DeBenedetto
/*/

var fs = require('fs');
var path = require('path');    
var filePath = path.join(__dirname, 'textures.json');
var data = "";

//read json file then write file
fs.readFile(filePath, function(err, data){
    if (!err) {
        var obj = JSON.parse(data);
        writeFile(obj);
    } 
    else { console.log(err); }
});

function writeFile(obj){
    var css = ".texture { background-size: cover; }\n";
    //loop through all textures
    for (var category in obj['textures']){
        for (var texture in obj['textures'][category]){
            css += '.'+category+'.'+texture+' { background-image: url("../img/textures/'+category+'/'+texture+'.jpg"); }\n';
        }
    }
    css = css.substring(0, css.lastIndexOf('\n')); //trim last return
    //write css file
    fs.writeFile("css/textures.css", css, function(err) {
        if(err) { return console.log(err); }
        console.log("The file was saved!");
    });
}
