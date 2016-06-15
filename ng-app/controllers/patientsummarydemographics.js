var AppEHR = angular.module('AppEHR');

AppEHR.controller('patientSummaryDemographicsController', ['$scope', '$rootScope', 'PatientDemographics', '$window', '$routeParams', 'GetEncountersByPatients' function($scope, $rootScope, PatientDemographics, $window, $routeParams, GetEncountersByPatients){
	$rootScope.pageTitle = "EHR - Patient Summary Demographics";
	$scope.PI = {};
	PatientDemographics.get({
		token: $window.sessionStorage.token,
		patient_id: $routeParams.patientID
	}, getPatientInfoSuccess, getPatientInfoFailure);
	console.log($routeParams.patientID);
	function getPatientInfoSuccess(res){
		console.log(res.data);
		if(res.status == true){
			var dob = new Date(res.data.date_of_birth);
			var dobArr = dob.toDateString().split(' ');
			$scope.PI.date_of_birth = dobArr[1] + ' ' + dobArr[2] + ' ' + dobArr[3];
			$scope.PI.first_name = res.data.first_name;
			$scope.PI.middle_name = res.data.middle_name;
			$scope.PI.last_name = res.data.last_name;
			$scope.PI.patient_id = res.data.id;
			$scope.PI.age = res.data.age;
			$scope.PI.sex = res.data.sex;
			$scope.PI.marital_status = res.data.marital_status;
			$scope.PI.next_to_kin = res.data.next_to_kin;
			$scope.PI.house_number = res.data.house_number;
			$scope.PI.street = res.data.street;
			$scope.PI.blood_group = res.data.blood_group;
			$scope.PI.email = res.data.email;
			$scope.PI.mobile_number = res.data.mobile_number;
			$scope.PI.hospital_plan = res.data.hospital_plan;
			$scope.PI.religion = res.data.religion;
			$scope.PI.patient_image = res.data.patient_image;
		}
	}

	function getPatientInfoFailure(error){
		console.log(error);
	}
}]);