var AppEHR = angular.module('AppEHR');

AppEHR.controller('patientSummaryDemographicsController', ['$scope', '$rootScope', 'PatientInformation', '$window', function($scope, $rootScope, PatientInformation, $window){
	$rootScope.pageTitle = "EHR - Patient Summary Demographics";
	$scope.PI = {};
	/*PatientInformation.get({
		token: $window.sessionStorage.token,
		patient_id: $window.sessionStorage.patient_id
	}, getPatientInfoSuccess, getPatientInfoFailure);*/

	function getPatientInfoSuccess(res){
		console.log(res);
		if(res.status == true){

		}
	}

	function getPatientInfoFailure(error){
		console.log(error);
	}
}]);