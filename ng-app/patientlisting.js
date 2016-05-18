var AppEHR = angular.module('AppEHR');

AppEHR.controller('patientInformationController', ['$scope', function($scope){
	$scope.abc = "EHR";
	$scope.includeTemplate = 'views/patient-listing.html';
	alert($scope.abc);
}]);