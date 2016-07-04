var AppEHR = angular.module('AppEHR');

AppEHR.controller('clinicalDocumentationClinicProgressNote', ['$scope', '$rootScope', '$window', '$routeParams', 'GetPatientInfo', 'ClinicalProgressNotesFields', 'GetTemplatesDropDown', 'SetClinicalProgressNotes', 'PatienPrescription', 'GetAllPrescription', function($scope, $rootScope, $window, $routeParams, GetPatientInfo, ClinicalProgressNotesFields, GetTemplatesDropDown, SetClinicalProgressNotes, PatienPrescription, GetAllPrescription){
	$rootScope.pageTitle = "EHR - Clinical Documentation - Clinic Progress Note";
	$scope.displayInfo = {};
	$scope.templates = {};
	$scope.templateFields = {};
	$scope.inputFields = {};
	$scope.items = [];
	$scope.selectedRow = false;
	$rootScope.loader = "show";
	$scope.medicationDropDowns = medicationDropDowns;
    $scope.pharmacyDataDropDown = pharmacyDataDropDown;
    $scope.MedicationData = [];
    $scope.medicationsDataPush = [];
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
			$scope.displayInfo.visit_created_at = $scope.displayInfo.visit_created_at.split(' ');
			$scope.displayInfo.visit_created_at = $scope.displayInfo.visit_created_at[0];
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
		$scope.selectedRow = true;
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
		SetClinicalProgressNotes.save({token: $window.sessionStorage.token, clinical_notes:data, patient_id: $routeParams.patientID, visit_id: $scope.displayInfo.encounter_id}, saveClinicalSuccess, saveClinicalFailure);

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

	/*PRISCRIPITON*/


	$scope.addMedication = function (checkEdit) {
           var AddMedications = {
               medication: $scope.MedicationData.medication,
               sig: $scope.MedicationData.sig,
               dispense: $scope.MedicationData.dispense,
               reffills: $scope.MedicationData.reffills,
               pharmacy: $scope.MedicationData.pharmacy,
               note_of_pharmacy: $scope.MedicationData.note_of_pharmacy,
           }
           $scope.medicationsDataPush.push(AddMedications);
           $scope.MedicationData.sig = "";
           $scope.MedicationData.dispense = "";
           $scope.MedicationData.reffills = "";
           $scope.MedicationData.note_of_pharmacy = "";
           $scope.MedicationData.medication = "";
           $scope.MedicationData.pharmacy = "";
           $("#addmedication select").select2("val", "");
           if (checkEdit == 1) {
               $scope.showUpdate = false;
           }
       }
       $scope.editMedication = function (index) {
           $scope.MedicationData = $scope.medicationsDataPush[index];
           setTimeout(function () {
               $('#addmedication select').trigger('change');
           }, 100)
           $scope.medicationsDataPush.splice(index, 1);
           console.log($scope.medicationsDataPush)
           $scope.showUpdate = true;
       }
       $scope.savePharmacyPopUp = function () {
           for (var i = 0; i < $scope.medicationsDataPush.length; i++) {
               delete $scope.medicationsDataPush[i].$$hashKey
           }
           var addPrescrptnPop = {
               patient_id: $routeParams.patientID,
               prescription: JSON.stringify($scope.medicationsDataPush),
               token: $window.sessionStorage.token,
               visit_id: $scope.displayInfo.encounter_id
           }
           console.log(addPrescrptnPop)
           PatienPrescription.save(addPrescrptnPop, PrescriptionSuccessPop, PrescriptionFailurePop)
       }
       function PrescriptionSuccessPop(res) {
           console.log(res)
           if (res.status == true) {
               $('#addmedication').modal('hide');
               $scope.medicationsDataPush = [];
           }
       }
       function PrescriptionFailurePop(res) {
           console.log(res)
       }
}]);