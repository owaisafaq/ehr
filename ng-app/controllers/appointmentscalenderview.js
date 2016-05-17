var AppEHR = angular.module('AppEHR');

AppEHR.controller('appointmentsCalenderController', ['$scope', function($scope){
	$scope.pageTitle = "EHR - Appointments Calender";
	$scope.includeTemplate = 'views/appointments-calander-view.html';
}]);