var AppEHR = angular.module('AppEHR');

AppEHR.controller('patientRegistrationController', ['$scope', function($scope){
	$scope.pageTitle = "EHR - Patient Registration";
	$scope.includeTemplate = 'views/patient-registration.html';
}]);