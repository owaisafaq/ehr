var AppEHR = angular.module('AppEHR');

AppEHR.controller('billing-invoice-print', ['$scope', '$rootScope', function($scope, $rootScope){
	$rootScope.pageTitle = "EHR - Billing Print (PDF Invoice)";
}]);