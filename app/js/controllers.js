'use strict';

var jerzy = require('jerzy');

var geneVar = angular.module('GeneVar', []);
var selectedPops = [];

geneVar.controller('ContentController', function($scope, $http) {

	$scope.about = {'p1':"GeneVar is a tool that will use regions of interest or hotspots provided as input to identify genomic variations amoung geographically dispersed human populations. This data will be used to make population comparisons at hotspot sites using heat maps and manhattan plots to visualize.", 
					  'p2': 'Dr. Latifa Jackson, a postdoctoral fellow with National Human Genome Center at Howard University, has found an interest in, and is therefore conducting research on, how clusters of genes in genomic regions on a chromosome may predict disease severity in different dispersed human populations. This research has led Dr. Jackson to build a tool that identifies clusters of single nucleotide polymorphisms (SNPs) on the genome, called hotspots, and reveals significant variations in the SNPs between populations. In 2014, Dr. Jackson worked with Aaron Maleaux, a Howard University undergraduate Computer Science student, to expand the cluster identifying portion of the tool to use a more robust and commonly used programming language and to provide a user interface for the tool to be easily used by colleagues.', 
				    'p3': 'Through the valuable information Dr. Jackson has learned from the data acquired by Aaron’s project, the next step, and our project, is to compare the genomic regions of populations. The project will identify population variation in specific genomic regions, as identified by the hotspots acquired from Maleaux’s program to make population and individual variant site comparison. Also, Dr. Jackson’s version of the program is on proprietary software, and therefore usability and accessibility of the software is reduced. The new program will provide a more accessible and user friendly data exploration environment for our users at the National Human Genome Center and the Montague Cobb Lab.'}; 

	$scope.usrGuide = {'hotspot':'Navigate GeneVar with ease!', 
            'infile':'1. Identity your area of interest: Upload the Hotspot File with the start location, stop location, and chromosome number of the area of the genome that peaks your interest most.',
            'results':'2. Customize your Input: Adjust the areas of the genome that you would care to receive analysis on by adding or removing files from the Hotspot File. Adjust the populations that are most relevant to your interests or projects by checking the continent order boxes next to your populations of interest.',
            'guide': '3. Reading, interpreting, saving your output result: After your Hotspots are entered and your desired populations are selected, you will be able to view your results in a color coded Heatmap. The lighter the color on your heatmap describes a greater degree of difference between population SNP alleles. The heatmap is downloadable as a PDF with an easy click of the ‘Download’ button.'};

	$scope.resources = {'ds1': '1000 Genome Description',
						'ds2': 'HapMap Description',
						'ds3': 'HGDP Description, why file4?',
						'map' :'Image of Map here'};

	$scope.chkd = [];

	$scope.African = ['Yoruba', 'Beja_H', 'BiakaPygmy', 'Borana', 'Hadza', 'Iraqw', 'Mada', 'Fulani_M','ASW', 'Mandenka', 'Mbuti pygmy', 'MKK', 'Mozabite', 'San', 'BantuSouthAfrica', 'BantuKenya', 'Sandawe', 'Sengwer']; 
	$scope.csAsian = ['Balochi', 'Bengali', 'Brahui', 'GIH','Burusho', 'Hazara', 'Kalash', 'Makrani', 'Pathan','Sindhi', 'Tamil','Uygur'];  
	$scope.eAsian = ['Cambodian','CEU', 'CHB', 'CHD', 'Dai', 'Han', 'She', 'Japanese', 'JPT+CHB', 'Daur', 'Hezhen', 'Lahu', 'Miao', 'Mongola', 'Naxi', 'Oroqen', 'Tu', 'Tujia', 'Xibo', 'Yakut', 'Yi'];
	$scope.wAsian = ['Bedouin', 'Druze', 'Palestinian'];
	$scope.European = ['Italian', 'TSI', 'Russian', 'French', 'Adygei', 'Basque', 'North Italian', 'Orcadian', 'Tuscan', 'Sardinian'];
	$scope.naAmerican = ['Maya', 'MEX', 'Colombian', 'Karitiana', 'Pima', 'Surui'];
	$scope.Oceania = ['Melanesian', 'Papuan'];

	$scope.pops = [
    {cont: 'Africa', pop: $scope.African},
    {cont: 'Central & South Asia', pop: $scope.csAsian},
    {cont: 'Eastern Asia', pop: $scope.eAsian},
    {cont: 'Europe', pop: $scope.European},
    {cont: 'Oceania', pop: $scope.Oceania},
    {cont: 'Native America', pop: $scope.naAmerican},
    {cont: 'Western Asia', pop: $scope.wAsian}
  ];

	// select all populations in region?
 	$scope.checkAll = function(cont) {
 		for(i=0; i < pops.length; i++) {
 			check($scope.pops[i].pop);
		}
    alert("All checked");
  };

  // todo: uncheck all populations in region?
  $scope.uncheckAll = function() {
  	alert($scope.chkd);
    $scope.chkd = [];
  };

   $scope.check = function(name) {
     if (document.getElementById(name).checked == true) {
      $scope.chkd.push(name);
    } else {
      var i = $scope.chkd.indexOf(name);
      $scope.chkd.splice(i, 1);
    }
    selectedPops = $scope.chkd;
   };

   $scope.dostuff = function() {
    selectedPops = $scope.chkd;
    };


 $scope.submit = function() {
    $http.post('/submit', $scope.chkd)
   	.success(function(data) {
      $scope.chkd = []; 

      var len = selectedPops.length;
      var heatmapData = [];
      // * optimize later, just get it to work
      // only need to calculate half the map  
      // move to server side??
      for (var x = 0; x < len; x++) {
        for (var y = 0; y < len; y++) {
          var xdata = new jerzy.Vector(selectedPops[x]);
          var ydata = new jerzy.Vector(selectedPops[y]);
          var ks = new jerzy.Nonparametric.kolmogorovSmirnov(xdata, ydata); 
          if (isNaN(ks.p))   // *** clean this
            ks.p = 1;
            heatmapData.push({xpopulation:selectedPops[x], ypopulation:selectedPops[y], ks:ks.p});
        }
      }
      heatmapChart(selectedPops, heatmapData);

    })
    .error(function(error) {
    	console.log('Error: ' + JSON.stringify(error));
    });
  }
});

