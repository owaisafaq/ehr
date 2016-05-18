var AppEHR = angular.module('AppEHR');

AppEHR.controller('wardsBedShematicController', ['$scope', function($scope){
	$scope.pageTitle = "EHR - Wards Bed Schematic";
	$scope.includeTemplate = 'views/wards-bed-shematic.html';
}]);