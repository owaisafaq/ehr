var AppEHR = angular.module('AppEHR');

AppEHR.controller('patientListingController', ['$scope', function($scope){
	$scope.pageTitle = "EHR - Patient Listing";
	$scope.includeTemplate = 'views/patient-listing.html';
}]);