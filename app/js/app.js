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
var margin = { top: 50, right: 0, bottom: 100, left: 30 },
          width = 960 - margin.left - margin.right,
          height = 430 - margin.top - margin.bottom,
          gridSize = Math.floor(width / 24),
          legendElementWidth = gridSize*2,
          buckets = 9,
          colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"], // alternatively colorbrewer.YlGnBu[9]
          axes = [];
          // selectedPops;
          //days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
          //times = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12a", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12p"];
          // dataset =[];
          // for (var i = 0; i < queries.length; i++) {
          //   dataset.push({queries[i].population : queries[i].count});
          // }

          // dataset = ["data.tsv", "data2.tsv"];

      var svg = d3.select("#chart").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var rowLabel = svg.selectAll(".rowLabel")
          .data(axes)
          .enter().append("text")
            .text(function (d) { return d; })
            .attr("x", 0)
            .attr("y", function (d, i) { return i * gridSize; })
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
            .attr("class", function (d, i) { return ("Populations"); });

      var colLabel = svg.selectAll(".colLabel")
          .data(axes)
          .enter().append("text")
            .text(function(d) { return d; })
            .attr("x", function(d, i) { return i * gridSize; })
            .attr("y", 0)
            .style("text-anchor", "middle")
            .attr("transform", "translate(" + gridSize / 2 + ", -6)")
            .attr("class", function(d, i) { return ("Populations"); });

      var heatmapChart = function() {
        d3.tsv('/js/hello.tsv',
        function(d) {
          console.log(+d.population);
          return {
            population: +d.population,
            count: +d.count
          };
        },
        function(error, data) {
          console.log("HELLO" + data);
          var colorScale = d3.scale.quantile()
              .domain([0, buckets - 1, d3.max(data, function (d) { return d.hour; })])
              .range(colors);

          var cards = svg.selectAll(".hour")
              .data(data, function(d) {return d.population;});

          cards.append("title");

          cards.enter().append("rect")
              .attr("x", function(d) { return (d.population - 1) * gridSize; })
              .attr("y", function(d) { return (d.population - 1) * gridSize; })
              .attr("rx", 4)
              .attr("ry", 4)
              .attr("class", "hour bordered")
              .attr("width", gridSize)
              .attr("height", gridSize)
              .style("fill", colors[0]);

          cards.transition().duration(1000)
              .style("fill", function(d) { return colorScale(d.count); });

          cards.select("title").text(function(d) { return d.count; });
          
          cards.exit().remove();

          var legend = svg.selectAll(".legend")
              .data([0].concat(colorScale.quantiles()), function(d) { return d; });

          legend.enter().append("g")
              .attr("class", "legend");

          legend.append("rect")
            .attr("x", function(d, i) { return legendElementWidth * i; })
            .attr("y", height)
            .attr("width", legendElementWidth)
            .attr("height", gridSize / 2)
            .style("fill", function(d, i) { return colors[i]; });

          legend.append("text")
            .attr("class", "mono")
            .text(function(d) { return "≥ " + Math.round(d); })
            .attr("x", function(d, i) { return legendElementWidth * i; })
            .attr("y", height + gridSize);

          legend.exit().remove();

        });  
      };

    
      
      // var datasetpicker = d3.select("#dataset-picker").selectAll(".dataset-button")
      //   .data(datasets);

      // datasetpicker.enter()
      //   .append("input")
      //   .attr("value", function(d){ return "Dataset " + d })
      //   .attr("type", "button")
      //   .attr("class", "dataset-button")
      //   .on("click", function(d) {
      //     heatmapChart(d);
      //   });
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

