var AppEHR = angular.module('AppEHR');

AppEHR.controller('patientListingController', ['$scope', '$rootScope', function($scope, rootScope){
	$rootScope.pageTitle = "EHR - Patient Listing";
}]);