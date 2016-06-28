var AppEHR = angular.module('AppEHR');

AppEHR.controller('clinicalDocumentationClinicProgressNote', ['$scope', '$rootScope', '$window', '$routeParams', 'GetPatientInfo', 'ClinicalProgressNotesFields', 'GetTemplatesDropDown', 'SetClinicalProgressNotes', function($scope, $rootScope, $window, $routeParams, GetPatientInfo, ClinicalProgressNotesFields, GetTemplatesDropDown, SetClinicalProgressNotes){
	$rootScope.pageTitle = "EHR - Clinical Documentation - Clinic Progress Note";
	$scope.displayInfo = {};
	$scope.templates = {};
	$scope.templateFields = {};
	$scope.inputFields = {};
	$scope.items = [];
	$rootScope.loader = "show";
	/*{{field = field + 1}}*/
	GetPatientInfo.get({token: $window.sessionStorage.token, patient_id: $routeParams.patientID}, getPatientSuccess, getPatientFailure);
	GetTemplatesDropDown.get({token: $window.sessionStorage.token}, getTemplateDropDownSuccess, getTemplateDropDownFailure);

	function getPatientSuccess(res){
		if(res.status == true){
			$scope.displayInfo.first_name = res.data.first_name;
			$scope.displayInfo.id = res.data.id;
			$scope.displayInfo.patient_id = res.data.id;
			$scope.displayInfo.age = res.data.age;
			$scope.displayInfo.sex = res.data.sex;
			$scope.displayInfo.marital_status = res.data.marital_status;
			$scope.displayInfo.visit_created_at = res.data.visit_created_at;
			$scope.displayInfo.encounter_id = res.data.encounter_id;
			$rootScope.loader = "hide";
		}
	}

	function getPatientFailure(error){
		$rootScope.loader = "hide";
		console.log(error);
	}

	function getTemplateDropDownSuccess(res){
		if(res.status == true){
			$scope.templates = res.data;
		}
	}

	function getTemplateDropDownFailure(error){
		$rootScope.loader = "hide";
		console.log(error);
	}

	// get templates
	$scope.getTemplates = function(tempId){
		$rootScope.loader = "show";
		ClinicalProgressNotesFields.get({token: $window.sessionStorage.token, template_id: tempId}, getTemplatesSuccess, getTemplatesFailure);
		function getTemplatesSuccess(res){
			if(res.status == true){
				$scope.templateFields = res.data;
				$rootScope.loader = "hide";
			}
		}

		function getTemplatesFailure(error){
			$rootScope.loader = "hide";
			console.log(error);
		}
	}
	/*
		[{ "field_id": "1", "value": "test" }, { "field_id": "2", "value": "test" }]
	*/
	$scope.saveClinicalNotes = function(data){
		console.log(data);
		$rootScope.loader = "show";
		//SetClinicalProgressNotes.save({token: $window.sessionStorage.token, clinical_notes:data}, saveClinicalSuccess, saveClinicalFailure);

		function saveClinicalSuccess(res){
			console.log(res);
			$rootScope.loader = "hide";
			if(res.status == true){

			}
		}

		function saveClinicalFailure(error){
			$rootScope.loader = "hide";
			console.log(error);
		}
	}


}]);