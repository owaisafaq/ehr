var AppEHR = angular.module('AppEHR');

AppEHR.controller('newEncounterPatientSearchController', ['$scope', function($scope){
	$scope.pageTitle = "EHR - New Encounter Patient Search";
	$scope.includeTemplate = 'views/new-encounter-patient-search.html';
}]);