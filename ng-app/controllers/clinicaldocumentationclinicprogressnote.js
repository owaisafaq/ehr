var AppEHR = angular.module('AppEHR');

AppEHR.controller('clinicalDocumentationClinicProgressNote', ['$scope', '$rootScope', '$window', '$routeParams', 'GetPatientInfo', 'ClinicalProgressNotesFields', 'GetTemplatesDropDown', 'SetClinicalProgressNotes', 'PatienPrescription', 'GetPrescription', 'GetAllMedications', 'DropDownData', 'CheckoutPatient', function($scope, $rootScope, $window, $routeParams, GetPatientInfo, ClinicalProgressNotesFields, GetTemplatesDropDown, SetClinicalProgressNotes, PatienPrescription, GetPrescription, GetAllMedications, DropDownData, CheckoutPatient){
	$rootScope.pageTitle = "EHR - Clinical Documentation - Clinic Progress Note";
	$scope.displayInfo = {};
	$scope.templates = {};
	$scope.templateFields = {};
	$scope.inputFields = {};
	$scope.items = [];
	$scope.selectedRow = false;
	$rootScope.loader = "show";
  $scope.message = false;
  $scope.PID = "/"+$routeParams.patientID;
	//$scope.medicationDropDowns = medicationDropDowns;
    //$scope.pharmacyDataDropDown = pharmacyDataDropDown;
    $scope.MedicationData = [];
    $scope.medicationsDataPush = [];
    $scope.buildInstructionObject = buildInstructionObject;
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
		$rootScope.loader = "show";
		SetClinicalProgressNotes.save({token: $window.sessionStorage.token, clinical_notes:data, patient_id: $routeParams.patientID, visit_id: $scope.displayInfo.encounter_id}, saveClinicalSuccess, saveClinicalFailure);

		function saveClinicalSuccess(res){
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
           $scope.note = $scope.MedicationData.note_of_pharmacy;
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
               note_for_pharmacy: $scope.note,
               token: $window.sessionStorage.token,
               visit_id: $scope.displayInfo.encounter_id
           }
           console.log(addPrescrptnPop);
           $rootScope.loader = 'show';
           PatienPrescription.save(addPrescrptnPop, PrescriptionSuccessPop, PrescriptionFailurePop)
        }

        function PrescriptionSuccessPop(res) {
           if (res.status == true) {
               $('#addmedication').modal('hide');
               $scope.medicationsDataPush = []; 
                $rootScope.loader = 'hide';
           }
        }

        function PrescriptionFailurePop(res) {
           console.log(res)
        }

        $scope.addSIG = function (sigData) {
        	if(sigData != undefined){
	            $scope.MedicationData.sig = sigData.dose == undefined ? '' : sigData.dose + " ";
	            $scope.MedicationData.sig += sigData.unit == undefined ? '' : sigData.unit + " ";
	            $scope.MedicationData.sig += sigData.route == undefined ? '' : sigData.route;
	            $scope.MedicationData.sig += sigData.frequency == undefined ? '' : " for " + sigData.frequency + " ";
	            $scope.MedicationData.sig += sigData.direction == undefined ? '' : sigData.direction + " ";
	            $scope.MedicationData.sig += sigData.duration == undefined ? '' : sigData.duration;
	            console.log($scope.MedicationData.sig);
	        }
        }

       /*$scope.addSIG = function (sigData) {
            $scope.MedicationData.sig = sigData.dose == undefined ? '' : sigData.dose + " " + sigData.unit == undefined ? '' : sigData.unit + " " + sigData.route  == undefined ? '' : sigData.route + " for " + sigData.frequency + " " + sigData.direction + " " + sigData.duration;
            console.log($scope.MedicationData.sig);
        }*/

        GetAllMedications.get({
            token: $window.sessionStorage.token,
            patient_id: $routeParams.patientID
        }, getAllMedicationsSuccess, getAllMedicationsFailure);
        $scope.allMedications = [];
        $scope.allPharmacies = [];
        function getAllMedicationsSuccess(res){
            if(res.status == true){
                $scope.allMedications = res.data;
            }
        }
        function getAllMedicationsFailure(error){
            console.log(error);
        }

        DropDownData.get({
            token: $window.sessionStorage.token
        }, getpharmacySuccess, getPharmacyFailure);

        function getpharmacySuccess(res){
            if(res.status == true){
                $scope.allPharmacies = res.data.pharmacy;
            }
        }

        function getPharmacyFailure(error){
            console.log(error);
        }

        /*CHECKOUT*/

        $scope.checkoutPatient = function (CO) {
          $scope.message = false;
            var CheckoutDetails = {
                token: $window.sessionStorage.token,
                visit_id: $scope.displayInfo.encounter_id,
                patient_id: $routeParams.patientID,
                reason: $('input:radio[name="checkoutpatient"]:checked').val(),
                notes: $('.checkout_patient_tab_con > div.active textarea').val() == undefined ? '' : $('.checkout_patient_tab_con > div.active textarea').val(),
                pick_date: CO.date,
                pick_time: CO.time,
                admit_date: CO.date,
                start_time: CO.time,
                department_id: CO.date,
                ward_id: CO.date
            }
            $rootScope.loader = "show";
            CheckoutPatient.save(CheckoutDetails, checkoutSuccess, checkoutSuccessFailure);
        }
        function checkoutSuccess(res) {
            $rootScope.loader = "hide";
            $scope.messageType = "alert-success";
            $scope.errorMessage = res.message;
            $scope.errorSymbol = "fa fa-check";// 
            $scope.message = true;
            setTimeout(function() {$('#checkout').modal('hide');}, 1000);

            $('.checkout_patient_tab_con > div.active textarea').val('');
            $('input:radio[name="checkoutpatient"]').prop("checked", false);
            $('input:radio[name="checkoutpatient"]').eq(0).trigger("click");
            $scope.buttonDisabled = false;
            $('.counter_pop').addClass('ng-hide');
            $scope.buttonDisabled = false;
            $scope.patientInfo = false;
        }
        function  checkoutSuccessFailure(res) {
            console.log(res)
        }

}]);