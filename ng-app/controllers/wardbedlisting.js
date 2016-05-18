var AppEHR = angular.module('AppEHR');

AppEHR.controller('wardBedListingController', ['$scope', function($scope){
	$scope.pageTitle = "EHR - Ward Bed Listing";
	$scope.includeTemplate = 'views/ward-bed-listing.html';
}]);