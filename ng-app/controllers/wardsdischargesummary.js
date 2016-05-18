var AppEHR = angular.module('AppEHR');

AppEHR.controller('wardsDischargeSummaryController', ['$scope', function($scope){
	$scope.pageTitle = "EHR - Wards Discharge Summary";
	$scope.includeTemplate = 'views/wards-discharge-summary.html';
}]);