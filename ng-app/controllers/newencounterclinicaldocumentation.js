var AppEHR = angular.module('AppEHR');

AppEHR.controller('newEncounterClinicalDocumentationController', ['$scope', function($scope){
	$scope.pageTitle = "EHR - new Encounter Clinical Documentation Controller";
	$scope.includeTemplate = 'views/new-encounter-clinical-documentation.html';
	/*$scope.changeTemplate = function(page){
		$scope.includeTemplate = 'views/'+page;
		alert(page);
	}*/
}]);