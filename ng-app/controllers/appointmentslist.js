var AppEHR = angular.module('AppEHR');

AppEHR.controller('appointmentsListController', ['$scope', '$rootScope', function($scope, $rootScope){
	$rootScope.pageTitle = "EHR - Appointments List";
}]);