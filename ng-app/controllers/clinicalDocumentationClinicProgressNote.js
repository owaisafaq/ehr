var AppEHR = angular.module('AppEHR');

AppEHR.controller('clinicalDocumentationClinicProgressNote', ['$scope', function($scope){
	$scope.pageTitle = "EHR - clinical Documentation Clinic Progress Note";
	$scope.includeTemplate = 'views/clinical-documentation-clinic-progress-note.html';
}]);