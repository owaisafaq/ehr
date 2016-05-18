var AppEHR = angular.module('AppEHR');

AppEHR.controller('patientSummaryDemographicsController', ['$scope', function($scope){
	$scope.pageTitle = "EHR - Patient Summary Demographics";
	$scope.includeTemplate = 'views/patient-summary-demographics.html';
}]);