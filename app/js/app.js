document.getElementById('in').addEventListener('change', uploadFile, false);

/* App Module */
function showname() {
    var  file = document.fileform.inFile.value;
    document.fileform.inputBox.value = file;
}

// REMOVE UNUSED FILE READING FUNCTIONS

function uploadFile(evt) {
    // showname();
    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0];
    if (!f) {
        alert("Failed to load file");
    } else if (!f.type.match('text/plain')) {
		    alert(f.name + " is type " + f.type +". This is not an accepted file type.\nPlease select a text file (.txt).");
    } else {
    	var reader = new FileReader();
      	reader.onload = function(e) {

	      var contents = e.target.result;
        // Verifies receipt of file
        // Remove later
        	alert( "Received File:\n"
              +"name: " + f.name + "\n"
              +"type: " + f.type + "\n"
              +"size: " + f.size + " bytes\n"
              +"starts with: " + contents.substr(contents.indexOf("\n"))
        	);
      	}
      	reader.readAsText(f);
    }
}


// Allows multiple files to be selected
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

/************************************************************************************/


//*************************************************************************************


// function handleSelectedFiles(evt) {
//     var files = evt.target.files; // FileList object

//     // Loop through the FileList and render image files as thumbnails.
//     for (var i = 0, f; f = files[i]; i++) {

//       // Only process image files.
//       if (!f.type.match('image.*')) {
//         continue;
//       }

//       var reader = new FileReader();

//       // Closure to capture the file information.
//       reader.onload = (function(theFile) {
//         return function(e) {
//           // Render thumbnail.
//           var span = document.createElement('span');
//           span.innerHTML = ['<img class="thumb" src="', e.target.result,
//                             '" title="', escape(theFile.name), '"/>'].join('');
//           document.getElementById('list').insertBefore(span, null);
//         };
//       })(f);

//       // Read in the image file as a data URL.
//       // reader.readAsDataURL(f);
//     }
//   }

// function readBlob(opt_startByte, opt_stopByte) {

//     var files = document.getElementById('files').files;
//     if (!files.length) {
//       alert('Please select a file!');
//       return;
//     }

//     var file = files[0];
//     var start = parseInt(opt_startByte) || 0;
//     var stop = parseInt(opt_stopByte) || file.size - 1;

//     var reader = new FileReader();

//     // If we use onloadend, we need to check the readyState.
//     reader.onloadend = function(evt) {
//       if (evt.target.readyState == FileReader.DONE) { // DONE == 2
//         document.getElementById('byte_content').textContent = evt.target.result;
//         document.getElementById('byte_range').textContent =
//             ['Read bytes: ', start + 1, ' - ', stop + 1,
//              ' of ', file.size, ' byte file'].join('');
//       }
//     };

//     var blob = file.slice(start, stop + 1);
//     reader.readAsBinaryString(blob);
//   }

//   document.querySelector('.readBytesButtons').addEventListener('click', function(evt) {
//     if (evt.target.tagName.toLowerCase() == 'button') {
//       var startByte = evt.target.getAttribute('data-startbyte');
//       var endByte = evt.target.getAttribute('data-endbyte');
//       readBlob(startByte, endByte);
//     }
//   }, false);

