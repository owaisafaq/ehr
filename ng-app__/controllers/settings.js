var AppEHR = angular.module('AppEHR');

AppEHR.controller('settings', ['$scope', '$rootScope', function($scope, $rootScope){
	$rootScope.pageTitle = "EHR - Settings";
}]);