'use strict';

/* App Module */

function showname(){
    var  file = document.fileform.inputbox.value ;
    document.fileform.filename.value = file;
}

function dostuff(){
	alert("Stuff will happen");
}

// function readSingleFile(evt) {
//     //Retrieve the first (and only!) File from the FileList object
//     var f = evt.target.files[0]; 

//     if (!f) {
//         alert("Failed to load file");
//     } else if (!file.type.match('text.*')) {
// 		    alert(f.name + " is not a valid text file.");
//     } else {
//     	var r = new FileReader();
//       	r.onload = function(e) { 
// 	      var contents = e.target.result;
//         	alert( "Got the file.n" 
//               +"name: " + f.name + "n"
//               +"type: " + f.type + "n"
//               +"size: " + f.size + " bytesn"
//               + "starts with: " + contents.substr(1, contents.indexOf("n"))
//         	);  
//       	}
//       	r.readAsText(f);
//     } 
// }

  // document.getElementById('fileinput').addEventListener('change', readSingleFile, false);

// this function allows multiple files to be selected
function verifyFiles(evt) {
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
    	output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
    	f.size, ' bytes, last modified: ',
    	f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a','</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}