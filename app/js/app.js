document.getElementById('in1').addEventListener('change', uploadFile, false);

/* App Module */
function showname() {
    var  file = document.fileform.inFile.value;
    document.fileform.inputBox.value = file;
}

// REMOVE UNUSED FILE READING FUNCTIONS

function uploadFile(evt) {
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

/******************************* Heatmap *****************************************************/

var heatmapChart = function(axes, data) {
    var margin = { top: 50, left: 130 },
        gridUnit = 80, 
        gridSize = gridUnit * axes.length,
        legendWidth = 70,
        // change color?  (colorbrewer.YlGnBu[9])
        colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"]; 

    var svg = d3.select("#map").append("svg")
        .attr("width", Math.max(legendWidth*11, gridSize))
        .attr("height", gridSize + (gridUnit*3))
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var yLabels = svg.selectAll(".yLabel")
        .data(axes)
        .enter().append("text")
          .text(function(d) { return d; })
          .attr("x", 0)
          .attr("y", function(d, i) { return i * gridUnit; })
          .style("text-anchor", "end")
          .attr("transform", "translate(-6," + gridUnit / 1.5 + ")")
          .attr("class", "yLabel mono axis");

    var xLabels = svg.selectAll(".xLabel")
        .data(axes)
        .enter().append("text")
          .text(function(d) { return d; })
          .attr("x", function(d, i) { return i * gridUnit; })
          .attr("y", 0)
          .style("text-anchor", "middle")
          .attr("transform", "translate(" + gridUnit / 2 + ", -6)")
          .attr("class", "xLabel mono axis");


    var colorScale = d3.scale.quantile()
        .domain([.1, 1])
        .range(colors);
    var cards = svg.selectAll(".xpopulation")
        .data(data, function(d) {
          return d.xpopulation+':'+d.ypopulation;});
    cards.append("title");

    cards.enter().append("rect")
        .attr("x", function(d) { 
          var pos = axes.indexOf(d.xpopulation);
          // testing. 
          if (pos == -1) {
            console.log("population not found: ", d.xpopulation);
          }
          return pos * gridUnit; })

        .attr("y", function(d) { 
          var pos = axes.indexOf(d.ypopulation);
          if (pos == -1) {
            console.log("population not found: ", d.ypopulation);
          }
          return pos * gridUnit; })

        .attr("rx", 4)
        .attr("ry", 4)
        .attr("class", "hour bordered")
        .attr("width", gridUnit)
        .attr("height", gridUnit)
        .style("fill", colors[0]);

    cards.transition().duration(1000)
        .style("fill", function(d) { return colorScale(d.ks); });

    cards.select("title").text(function(d) { return d.ks; });
    
    cards.exit().remove();

    var legend = svg.selectAll(".legend")
        .data([0].concat(colorScale.quantiles()), function(d) { return d; });

    legend.enter().append("g")
        .attr("class", "legend");

    legend.append("rect")
      .attr("x", function(d, i) { return (legendWidth * i); })
      .attr("y", gridSize + (.5*gridUnit))
      .attr("width", legendWidth)
      .attr("height", legendWidth / 3)
      .style("fill", function(d, i) { return colors[i]; });

    legend.append("text")
      .attr("class", "mono")
      .text(function(d) { return "≥ " + Math.round(d*10)/10; })
      .attr("x", function(d, i) { return (legendWidth * i)+20; })
      .attr("y", gridSize + gridUnit);
    legend.exit().remove();

    console.log()
};