'use strict';

/* Controllers */

// var phonecatApp = angular.module('phonecatApp', []);

// phonecatApp.controller('PhoneListCtrl', function($scope) {
//   $scope.phones = [
//     {'name': 'Nexus S',
//      'snippet': 'Fast just got faster with Nexus S.'},
//     {'name': 'Motorola XOOM™ with Wi-Fi',
//      'snippet': 'The Next, Next Generation tablet.'},
//     {'name': 'MOTOROLA XOOM™',
//      'snippet': 'The Next, Next Generation tablet.'}
//   ];
// });

// phonecatApp.controller('ArticleController', function($scope) {
//   $scope.articles = [
//     {'title': 'Presidential Debate',
//      'snippet': 'Fast just got faster with Nexus S.'},
//     {'title': 'Hillary coming to DC',
//      'snippet': 'The Next, Next Generation tablet.'},
//     {'title': 'Lenas learning Angularjs holllaaaa',
//      'snippet': 'The Next, Next Generation tablet.'}
//   ];
// });

var geneVar = angular.module('GeneVar', []);  // do I need that?

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
	$scope.about = "GeneVar is a tool that will use regions of \
	interest or hotspots provided as input to identify genomic \
	variations amoung geographically dispersed human populations. \
	This data will be used to make population comparisons at hotspot \
	sites using heat maps and manhattan plots to visualize.";

	$scope.nhgc = 'National Human Genome Center';
	$scope.cobb = 'Cobb Lab info';
	$scope.advisor = 'Dr. Jackson bio';
	$scope.devs = 'Salena bios';
	
	$scope.hotspot = 'Description of Aaron\'s Hotspot Identifier program'; 
	$scope.infile = 'how to customize your input'; 
	$scope.results ='reading, interpretting, saving your output results'; 
	$scope.guide =  'link to how-to guide here'; 

	$scope.ds1 = '1000 Genome Description';
	$scope.ds2 = 'HapMap Description';
	$scope.ds3 = 'HGDP Description, why file4?';
	$scope.map = 'Image of Map here';
});
