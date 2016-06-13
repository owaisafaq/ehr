var AppEHR = angular.module('AppEHR');

AppEHR.controller('newEncounterEncounterListController', ['$scope', '$rootScope', '$routeParams', '$window', 'GetPatientInfo', 'GetEncountersByPatients', function($scope, $rootScope, $routeParams, $window, GetPatientInfo, GetEncountersByPatients){
	$rootScope.pageTitle = "EHR - new Encounter Clinical Documentation Controller";
	$rootScope.loader = "show";
	$scope.allEncounter = [];
	GetPatientInfo.get({token: $window.sessionStorage.token, patient_id:$routeParams.patientID}, getEncountersSuccess, getEncountersFailure);
	GetEncountersByPatients.get({token: $window.sessionStorage.token, patient_id:$routeParams.patientID}, getPatientEncounters, getPatientEncountersFailure);
	$scope.displayInfo = {};
	function getEncountersSuccess(res){
		if(res.status == true){
			//console.log(res);
			$scope.disabledEncounterButton = false;
			$scope.patientInfo = true;
			$scope.displayInfo.first_name = res.data.first_name;
			$scope.displayInfo.patient_id = res.data.id;
			$scope.displayInfo.age = res.data.age;
			$scope.displayInfo.sex = res.data.sex;
			$scope.displayInfo.marital_status = res.data.marital_status;
		}
	}

	function getEncountersFailure(error){
		console.log(error);
	}

	function getPatientEncounters(res){
		if(res.status == true){
			$rootScope.loader = "hide";
			$scope.allEncounter = res.data;
			console.log($scope.allEncounter);
		}
	}

	function getPatientEncountersFailure(error){
		console.log(error);
	}
	// console.log($routeParams.patientID);
}]);