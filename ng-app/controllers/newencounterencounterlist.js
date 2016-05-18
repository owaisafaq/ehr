var AppEHR = angular.module('AppEHR');

AppEHR.controller('newEncounterEncounterListController', ['$scope', function($scope){
	$scope.pageTitle = "EHR - new Encounter Clinical Documentation Controller";
	$scope.includeTemplate = 'views/new-encounter-encounter-list.html';
	/*$scope.changeTemplate = function(page){
		$scope.includeTemplate = 'views/'+page;
		alert(page);
	}*/
}]);