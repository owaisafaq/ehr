var AppEHR = angular.module('AppEHR');

AppEHR.controller('wardBedListingController', ['$scope', '$rootScope', function($scope, $rootScope){
	$rootScope.pageTitle = "EHR - Ward Bed Listing";
	$scope.action = '';
	$scope.allWards = [];
	$scope.buttonDisabled = true;
}]);