document.getElementById('in1').addEventListener('change', uploadFile, false);

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
    } else if (!f.type.match('text.*/')) {
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
          );
        }
        reader.readAsText(f);
    }
}
//*****************************************

// // Allows multiple files to be selected
// function verifyFiles(evt) {
//     var files = evt.target.files; // FileList object

//     // files is a FileList of File objects. List some properties.
//     var output = [];
//     for (var i = 0, f; f = files[i]; i++) {
//     	output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
//     	f.size, ' bytes, last modified: ',
//     	f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a','</li>');
//     }
//     document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
// }

/******************************* Heatmap *****************************************************/

axes = ["Maya", "Finnish", "American", "Yoruba", "Colombian", "Guatemalan"];
var margin = { top: 50, right: 20, bottom: 0, left: 100 },
          width = 960 - margin.left - margin.right,
          height = 330 - margin.top - margin.bottom,
          gridSize = Math.floor(width / (axes.length*2)),
          legendElementWidth = gridSize,
          // change color?  (colorbrewer.YlGnBu[9])
          colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"]; 

      var svg = d3.select("#map").append("svg")
          .attr("width", gridSize * 2 * axes.length)
          .attr("height", gridSize * 2 * axes.length)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var xLabels = svg.selectAll(".xLabel")
          .data(axes)
          .enter().append("text")
            .text(function (d) { return d; })
            .attr("x", 0)
            .attr("y", function (d, i) { return i * gridSize; })
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
            .attr("class", "xLabel mono axis");

      var yLabels = svg.selectAll(".yLabel")
          .data(axes)
          .enter().append("text")
            .text(function(d) { return d; })
            .attr("x", function(d, i) { return i * gridSize; })
            .attr("y", 0)
            .style("text-anchor", "middle")
            .attr("transform", "translate(" + gridSize / 2 + ", -6)")
            .attr("class", "yLabel mono axis");

      var heatmapChart = function(tsvFile) {
        d3.tsv(tsvFile,
        function(d) {
          return {
            xpopulation: d.xpopulation,
            ypopulation: d.ypopulation,
            pval: +d.pval,
          };
          
        },
        function(error, data) {
          var colorScale = d3.scale.quantile()
              .domain([.1, d3.max(data, function (d) { return d.pval; })])
              .range(colors);

          var cards = svg.selectAll(".xpopulation")
              .data(data, function(d) {return d.xpopulation+':'+d.ypopulation;});

          cards.append("title");

          
          cards.enter().append("rect")
              .attr("x", function(d) { 
                var pos = axes.indexOf(d.xpopulation);
                // testing.
                if (pos == -1) {
                  console.log("xpop not found: ", d.xpopulation, d.ypopulation, d.pval);
                }
                return pos * gridSize; })
              .attr("y", function(d) { 
                var pos = axes.indexOf(d.ypopulation);
                if (pos == -1) {
                  console.log("ypop not found: ", d.ypopulation);
                }
                return pos * gridSize; })
              .attr("rx", 4)
              .attr("ry", 4)
              .attr("class", "hour bordered")
              .attr("width", gridSize)
              .attr("height", gridSize)
              .style("fill", colors[0]);

          cards.transition().duration(1000)
              .style("fill", function(d) { return colorScale(d.pval); });

          cards.select("title").text(function(d) { return d.pval; });
          
          cards.exit().remove();

          var legend = svg.selectAll(".legend")
              .data([0].concat(colorScale.quantiles()), function(d) { return d; });

          legend.enter().append("g")
              .attr("class", "legend");

          legend.append("rect")
            .attr("x", function(d, i) { return legendElementWidth * i; })
            .attr("y", height+ (3*gridSize))
            .attr("width", legendElementWidth)
            .attr("height", gridSize / 2)
            .style("fill", function(d, i) { return colors[i]; });

          legend.append("text")
            .attr("class", "mono")
            .text(function(d) { return "≥ " + Math.round(d*10)/10; })
            .attr("x", function(d, i) { return (legendElementWidth * i)+20; })
            .attr("y", height + (4*gridSize));

          legend.exit().remove();

        });  
      };

      heatmapChart("test.tsv");
      

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

//     var files = document.getElementById('in1').in1;
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
//      // readBlob(startByte, endByte);
//     }
//   }, false);

