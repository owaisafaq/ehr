var AppEHR = angular.module('AppEHR');

AppEHR.controller('wardsBedOccupancyController', ['$scope', function($scope){
	$scope.pageTitle = "EHR - Wards Bed Occupacy";
	$scope.includeTemplate = 'views/wards-bed-occupancy.html';
}]);