var AppEHR = angular.module('AppEHR');

AppEHR.controller('dashboard', ['$scope', '$rootScope', function($scope, $rootScope){
	$rootScope.pageTitle = "EHR - Dashboard";
}]);