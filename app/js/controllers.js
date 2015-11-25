'use strict';

/* Controllers */


var geneVar = angular.module('GeneVar', []);

// geneVar.controller('ContentController', function($scope) {
// 	$scope.about = ['description':"GeneVar is a tool that will use regions of interest or hotspots provided as input to identify genomic variations amoung geographically dispersed human populations. This data will be used to make population comparisons at hotspot sites using heat maps and manhattan plots to visualize.", 
// 					'nhgc': 'National Human Genome Center', 
// 					'cobb': 'Cobb Lab',
// 					'advisor': 'Dr. Jackson',
// 					'devs': 'Salena']; 
// 	$scope.guide = ['hotspot': 'Description of Aaron\'s Hotspot Identifier program', 
// 					'input': 'how to customize your input', 
// 					'results': 'reading, interpretting, saving your output results', 
// 					'howto': 'link to how-to guide here']; 
// 	$scope.resources = ['ds1': '1000 Genome Description', 
// 						'ds2': 'HapMap Description', 
// 						'ds3': 'HGDP Description, why file4?',
// 						'map': 'Image of Map here'];
// });

geneVar.controller('ContentController', function($scope) {
	// about.description = "GeneVar is a tool that will use regions of \
	// interest or hotspots provided as input to identify genomic \
	// variations amoung geographically dispersed human populations. \
	// This data will be used to make population comparisons at hotspot \
	// sites using heat maps and manhattan plots to visualize.";
	
	$scope.about = {'description':"GeneVar is a tool that will use regions of interest or hotspots provided as input to identify genomic variations amoung geographically dispersed human populations. This data will be used to make population comparisons at hotspot sites using heat maps and manhattan plots to visualize.", 
					'nhgc': 'National Human Genome Center', 
					'cobb': 'Cobb Lab',
					'advisor': 'Dr. Jackson',
					'devs': 'Salena'}; 

	$scope.usrGuide = {'hotspot':'Description of Aaron\'s Hotspot Identifier program', 
						'infile':'how to customize your input',
						'results':'reading, interpretting, saving your output results',
						'guide': 'link to how-to guide here'};


	$scope.resources = {'ds1': '1000 Genome Description',
						'ds2': 'HapMap Description',
						'ds3': 'HGDP Description, why file4?',
						'map' :'Image of Map here'};

	$scope.chkd = [];

	$scope.African = ['Yoruba', 'BantuSouthAfrica', 'BantuKenya'];
	$scope.Antarctican = [];
	$scope.Asian = ['Han', 'She', 'Japanese', 'JPT+CHB'];
	$scope.Australian = [];
	$scope.European = ['Italian', 'Russian', 'French'];
	$scope.nAmerican = ['Maya'];
	$scope.sAmerican = ['Colombian',];
	
	$scope.pops = [
    {cont: 'Africa', pop: $scope.African},
    {cont: 'Antarctican', pop: $scope.Australian},
    {cont: 'Europe', pop: $scope.European},
    {cont: 'Asia', pop: $scope.Asian},
    {cont: 'Australia', pop: $scope.Australian},
    {cont: 'Europe', pop: $scope.European},
    {cont: 'North America', pop: $scope.nAmerican},
    {cont: 'South America', pop: $scope.sAmerican}
  ];
	// doesn't work yet
 	$scope.checkAll = function(cont) {
 		for(i=0; i < pops.length; i++) {
 			check($scope.pops[i].pop);
    // $scope.chkd.push($scope.pops[i].pop);
    // document.getElementById('Asia_box').selected = true;
		}
    alert("All checked");
  };

  // todo: uncheck boxes in view
  $scope.uncheckAll = function() {
    $scope.chkd = [];
  };

// *** allows duplicates, does not unclick. 
// fix that. 
  $scope.check = function(name) {
  	 // alert(name);
  	document.getElementById(name).checked = true; 
  	$scope.chkd.push(name);
  }


});
