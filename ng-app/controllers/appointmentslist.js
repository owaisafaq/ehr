var AppEHR = angular.module('AppEHR');

AppEHR.controller('appointmentsListController', ['$scope', function($scope){
	$scope.pageTitle = "EHR - Appointments List";
	$scope.includeTemplate = 'views/appointments-list.html';
}]);