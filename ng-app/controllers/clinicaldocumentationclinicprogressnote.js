var AppEHR = angular.module('AppEHR');

AppEHR.controller('clinicalDocumentationClinicProgressNote', ['$scope', '$rootScope', '$window', '$routeParams', 'GetPatientInfo', 'ClinicalProgressNotesFields', 'GetTemplatesDropDown', 'SetClinicalProgressNotes', 'PatienPrescription', 'GetPrescription', 'GetAllMedications', 'DropDownData', 'CheckoutPatient', 'GetMedicineUnits', 'getTemplateCategory', 'getTemplates', 'getTemplateData', 'ReferralPatient', 'ClinicalReport', 'GetAllWardsDropDown', 'GetBedsByWard', 'Upload', 'AddAttachmentClinical', 'SignOffClinicalProgress', 'CheckClinicalNotesStatus', 'UpdatePatientClinicalNotes', 'GetDiagnosisList', 'getCliTemplateCategory', 'addOrder', 'GetAllPatients', 'GetLabTests', '$timeout', function($scope, $rootScope, $window, $routeParams, GetPatientInfo, ClinicalProgressNotesFields, GetTemplatesDropDown, SetClinicalProgressNotes, PatienPrescription, GetPrescription, GetAllMedications, DropDownData, CheckoutPatient, GetMedicineUnits, getTemplateCategory, getTemplates, getTemplateData, ReferralPatient, ClinicalReport, GetAllWardsDropDown, GetBedsByWard, Upload, AddAttachmentClinical, SignOffClinicalProgress, CheckClinicalNotesStatus, UpdatePatientClinicalNotes, GetDiagnosisList, getCliTemplateCategory, addOrder, GetAllPatients, GetLabTests, $timeout){
	$rootScope.pageTitle = "EHR - Clinical Documentation - Clinic Progress Note";
	$scope.displayInfo = {};
	$scope.templates = {};
	$scope.templateFields = {};
	$scope.inputFields = {};
	$scope.items = [];
	$scope.selectedRow = false;
	$rootScope.loader = "show";
  $scope.message = false;
  $scope.showAccordion = false;
  $scope.disabledFooterButton = true;
  $scope.templateDisabled = true;
  $scope.referral = {};
  $scope.PID = "/"+$routeParams.patientID;
  $scope.mySchema = {}; // Expose the schema on the scope.
  $scope.myFormData = {}; // Something to store the input at.
  $scope.mySchemaNewTemp = {}; // Expose the schema on the scope.
  $scope.myFormDataNewTemp = {}; // Something to store the input at.
	//$scope.medicationDropDowns = medicationDropDowns;
    //$scope.pharmacyDataDropDown = pharmacyDataDropDown;
  $scope.MedicationData = [];
  $scope.medicationsDataPush = [];
  $scope.referral.type = "internal"
  $scope.externalDoctor = false;
  $scope.diagnosisData = diagnosisFields //[];
  $scope.newTemp = false;
  $scope.disabledDrop = true;
  $scope.Order = {};
  $scope.Order.selected_labName = "Radiology";
  $scope.testAdded = false;
  $scope.itemsPerPage = 15;
  $scope.withVisit = true;
  $scope.prefilledPatientName = $routeParams.patientID;


	/*{{field = field + 1}}*/
  //$scope.buildInstructionObject = buildInstructionObject;
	GetPatientInfo.get({token: $window.sessionStorage.token, patient_id: $routeParams.patientID}, getPatientSuccess, getPatientFailure);
  getCliTemplateCategory.get({token: $window.sessionStorage.token, template_type: 1}, TemplateCategorySuccess, TemplateCategoryFailed);

  function TemplateCategorySuccess(res) {
      if (res.status == true) {
        console.log('ooo', res)
          $scope.categories = res.data;
          if($scope.doUpdate == true){
            $scope.template = res.data.template_id;
            $scope.category = res.data.category_id;
            setTimeout(function () {
                $('select').not('.select_searchFields,.search-ajax').select2({minimumResultsForSearch: Infinity});
            },100);
          }
          
      } else {
          console.log(res);
      }
  }

  function TemplateCategoryFailed(error) {
      console.log(error);
      $('#internetError').modal('show');
  }
  $scope.selectCategory = function(selectedCategory){
    //console.log(selectedCategory);
    $scope.selectedCategory = selectedCategory;
    
    getTemplates.get({
        token: $window.sessionStorage.token,
        template_type: 1,
        category_id: selectedCategory,
        offset: 10,
        limit: 0
    }, getTemplateDropDownSuccess, getTemplateDropDownFailure);

    /*    GetTemplatesDropDown.get({token: $window.sessionStorage.token, category_id: selectedCategory, template_type: 1}, getTemplateDropDownSuccess, getTemplateDropDownFailure);*/
  }

	function getPatientSuccess(res){
		if(res.status == true){
			$scope.displayInfo.first_name = res.data.first_name;
			$scope.displayInfo.id = res.data.id;
			$scope.displayInfo.patient_id = res.data.id;
			$scope.displayInfo.age = res.data.age;
			$scope.displayInfo.sex = res.data.sex;
			$scope.displayInfo.marital_status = res.data.marital_status;
			$scope.displayInfo.visit_created_at = res.data.visit_created_at;
			$scope.displayInfo.visit_created_at = $scope.displayInfo.visit_created_at == undefined || $scope.displayInfo.visit_created_at == "" ? $scope.displayInfo.visit_created_at : $scope.displayInfo.visit_created_at.split(' ');
			$scope.displayInfo.visit_created_at = $scope.displayInfo.visit_created_at == undefined || $scope.displayInfo.visit_created_at == "" ? $scope.displayInfo.visit_created_at : $scope.displayInfo.visit_created_at[0];
			$scope.displayInfo.encounter_id = res.data.encounter_id;
			
      CheckClinicalNotesStatus.save({
          token: $window.sessionStorage.token,
          visit_id: $scope.displayInfo.encounter_id,
          patient_id: $routeParams.patientID
      }, checkClinicalStatusSuccess, checkClinicalStatusFailure);

        
		}
	}
  function checkClinicalStatusSuccess(res){
      console.log(res);
      
      if(res.status == true && res.data.length > 0){
        $scope.doUpdate = true;
        $scope.tid = res.template_id;
        $scope.cid = res.category_id;
        $scope.diagnosis = res.diagnosis == "" ? "" : JSON.parse(res.diagnosis);
        
        getTemplates.get({
            token : $window.sessionStorage.token,
            category_id : res.category_id,
            template_type: 1,
            offset: 10,
            limit: 0
        },getTemplateDropDownSuccess,getTemplateDropDownFailure);
        //return true;
        $scope.templateFields.name = res.template_name;
        $scope.enablePreviewreport = true;
        var filledVal = JSON.parse(res.data);
        var templateCl = JSON.parse(res.template);
        $scope.renderedTemplate = {};
        $scope.renderedTemplate.fields = [];
        var i = 0;
        var selectValuesArray = [];
        console.log(filledVal);
        console.log(templateCl); 
        var afterDiagnosis = {};
        afterDiagnosis.fields = [];

        for (var key in templateCl.fields) {
            if(templateCl.fields[key].displayName == 'Diagnosis' || templateCl.fields[key].name == 'Diagnosis'){

                $scope.getDiagnosis();
                console.log("got diagnosis", i);
                $scope.diagnosisAgaya = true;
                //templateCl.fields[i].type = "hidden";
                //delete templateCl.fields[i];
                templateCl.fields.splice(i, 1);
                
                if(Object.keys(filledVal)[i] == 'Diagnosis'){
                  delete filledVal.Diagnosis;
                }
                //console.log(Object.keys(filledVal)[i], '1', filledVal[Object.keys(filledVal)[i]], templateCl.fields[i].name);
                console.log(templateCl, 'from diagnosis', filledVal);
                //i++;
            }else{
                //console.log(Object.keys(filledVal)[i] == templateCl.fields[i].name, i);
                console.log(Object.keys(filledVal)[i], '1', filledVal[Object.keys(filledVal)[i]], templateCl.fields[i].name);
                  $scope.renderedTemplate.fields.push({
                    "displayName": templateCl.fields[i].displayName,
                    "name": templateCl.fields[i].name,
                    "type": templateCl.fields[i].type == "number" ? "text" : templateCl.fields[i].type,
                    //"value": filledVal[Object.keys(filledVal)[i]] == undefined ? '' : filledVal[Object.keys(filledVal)[i]],
                    "value": Object.keys(filledVal)[i] == templateCl.fields[i].name || Object.keys(filledVal)[i] == templateCl.fields[i].displayName ? filledVal[Object.keys(filledVal)[i]] : '',
                    "validation": templateCl.fields[i].validation
                  });
            }
              //}
          //}
          i++;
        }
        console.log($scope.renderedTemplate);
        $scope.clinicalNotesID = res.clinical_notes_id;
        if($scope.clinicalNotesID != undefined) $scope.selectedRow = true;
        $scope.is_signoff = res.signoff;
        $scope.mySchema = $scope.renderedTemplate;
        $scope.showAccordion = true;
        //$rootScope.loader = "hide";
      }
      $rootScope.loader = "hide";
  }

  function checkClinicalStatusFailure(error){
    console.log(error);
  }

  GetMedicineUnits.get({token: $window.sessionStorage.token}, getMedicineUnitSuccess, getMedicineUnitFailure);
  function getMedicineUnitFailure(error){
    $rootScope.loader = "hide";
    console.log(error);
  }

  function getMedicineUnitSuccess(res){
    if(res.status == true){
      $scope.medicineUnits = res.data;
    }
  }

	function getPatientFailure(error){
		$rootScope.loader = "hide";
    $('#internetError').modal('show');
		console.log(error);
	}

	function getTemplateDropDownSuccess(res){
    console.log('lllll', res, $scope.tid, $scope.cid);
		if(res.status == true){
      $scope.disabledDrop = false;
      $scope.templateDisabled = false;
			$scope.templates = res.data;
      if($scope.doUpdate == true){
          $scope.template = $scope.tid;
          $scope.category = $scope.cid;
          $scope.have_templates = true; // if there are templates in selected category
          setTimeout(function () {
            $('select').not('.select_searchFields,.search-ajax').select2({minimumResultsForSearch: Infinity});
          },2000);
      }
      //$scope.mySchema = JSON.parse(res.data[0].template);
		}
	}

	function getTemplateDropDownFailure(error){
		$rootScope.loader = "hide";
    $('#internetError').modal('show');
		console.log(error);
	}

	// get templates
	$scope.getTemplates = function(tempId){
    $scope.tempId = tempId;
		$rootScope.loader = "show";
		$scope.selectedRow = true;
		//ClinicalProgressNotesFields.get({token: $window.sessionStorage.token, template_id: tempId, template_type: 1}, getTemplatesSuccess, getTemplatesFailure);
    getTemplateData.get({
        token : $window.sessionStorage.token,
        template_id : tempId,
        template_type: 1
    },getTemplateSuccess,getTemplateDataFailure);
		function getTemplateSuccess(res){
      console.log(res, "change temp");
			if(res.status == true){
				$scope.templateFields = res.data;
        $scope.disabledFooterButton = false;
        
        $scope.showAccordion = true;
				$rootScope.loader = "hide";
        $scope.diagnosisAgaya = false;
        //$scope.diagnosis = [];
        if($scope.doUpdate == true){
          $scope.diagnosis = [];
          var templateCl = JSON.parse(res.data.template);
          $scope.ttemmpp = JSON.parse(res.data.template);
          $scope.renderedTemplate = {};
          $scope.renderedTemplate.fields = [];
          var i = 0;
          var selectValuesArray = [];
          console.log("got in");
          $(".chosen-select").val('').trigger("liszt:updated");
          $(".chosen-select").val('').trigger("chosen:updated");
          $('.chosen-select').prop('selected', false).trigger('chosen:updated');
          //$('.chosen-select').chosen();
          for (var key in templateCl.fields) {
                if(templateCl.fields[i].displayName == 'Diagnosis'){
                  $scope.getDiagnosis();
                  console.log("got diagnosis");
                  $scope.lengthError = true;
                  /*console.log('hola!',$scope.diagnosis);
                  $scope.diagnosis = [];
                  console.log('hola!',$scope.diagnosis);*/
                  $scope.diagnosisAgaya = true;
                  //$scope.getDiagnosis();
                  templateCl.fields.splice(i, 1);
                  //delete templateCl.fields[i]; 
                }
            i++;
          }
          delete $scope.mySchema;
          $scope.newTemp = true;
          console.log(templateCl, 'new temp');
          $scope.mySchemaNewTemp = templateCl;
        }else{
          $scope.newTemp = false;
          var templateCl = JSON.parse(res.data.template);
          $scope.renderedTemplate = {};
          $scope.renderedTemplate.fields = [];
          var i = 0;
          var selectValuesArray = [];
          console.log("got in");
          //$('.chosen-select').chosen();
          for (var key in templateCl.fields) {
                if(templateCl.fields[i].displayName == 'Diagnosis'){
                  $scope.getDiagnosis();
                  console.log("got diagnosis");
                  /*console.log('hola!',$scope.diagnosis);
                  $scope.diagnosis = [];

                  console.log('hola!',$scope.diagnosis);*/
                  $scope.diagnosisAgaya = true;
                  //$scope.getDiagnosis();
                  templateCl.fields.splice(i,1);
                  //return false;
                  console.log(templateCl.fields[i]);
                  //delete templateCl.fields[i]; 
                }
            i++;
          }
          $scope.mySchema = templateCl;
          //$scope.mySchema = JSON.parse(res.data.template);
        }
			}
		}

		function getTemplateDataFailure(error){
			$rootScope.loader = "hide";
      $('#internetError').modal('show');
			console.log(error);
		}
	}
	/*
		[{ "field_id": "1", "value": "test" }, { "field_id": "2", "value": "test" }]
	*/

  $scope.buildTempDataUpdate = {};
  $scope.buildTempDataUpdate.fields = [];
	$scope.saveClinicalNotes = function(data, updateTemp){
		$rootScope.loader = "show";
    console.log(data, $scope.diagnosis, updateTemp); //return true;
    if($scope.clinicalNotesID == undefined){
		  SetClinicalProgressNotes.save({token: $window.sessionStorage.token, value:data, patient_id: $routeParams.patientID, visit_id: $scope.displayInfo.encounter_id, template_id: $scope.tempId, diagnosis: $scope.diagnosis == undefined || $scope.diagnosis.length == 0 ? 0 : "["+$scope.diagnosis+"]" }, saveClinicalSuccess, saveClinicalFailure);
    }else {
        /*for(var l = 0; l < $scope.ttemmpp.fields.length; l++){
          $scope.buildTempDataUpdate.fields.push({
            "displayName": $scope.ttemmpp.fields[l].displayName,
            "name": $scope.ttemmpp.fields[l].name,
            "type": $scope.ttemmpp.fields[l].type,
            //"value": filledVal[Object.keys(filledVal)[i]] == undefined ? '' : filledVal[Object.keys(filledVal)[i]],
            "value": Object.keys(updateTemp)[l] == $scope.ttemmpp.fields[l].name ? updateTemp[Object.keys(updateTemp)[l]] : '',
            "validation": $scope.ttemmpp.fields[l].validation
          });
          console.log(Object.keys(updateTemp)[l] == $scope.ttemmpp.fields[l].name, updateTemp[Object.keys(updateTemp)[l]]);
        }
        console.log($scope.buildTempDataUpdate.fields);
        return true;*/
          var uniqueNames = [];
          $.each($scope.diagnosis, function(i, el){
              if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
          });
          console.log(uniqueNames);
        UpdatePatientClinicalNotes.save({
          token: $window.sessionStorage.token,
          clinical_notes_id: $scope.clinicalNotesID,
          patient_id: $scope.displayInfo.id,
          visit_id: $scope.displayInfo.encounter_id,
          template_id: $scope.tempId == undefined ? $scope.tid : $scope.tempId,
          value: $scope.newTemp == true ? updateTemp : data,
          diagnosis: $scope.diagnosis == undefined || $scope.diagnosis.length == 0 ? 0 : "["+uniqueNames+"]"
        }, updateClinicalNotesSuccess, updateClinicalNotesFailure);
    }

      function updateClinicalNotesSuccess(res){
        $rootScope.loader = "hide";
        if(res.status == true){
          $scope.template = $scope.tid
          $('#updatesuccessModal').modal('show');
          CheckClinicalNotesStatus.save({
            token: $window.sessionStorage.token,
            visit_id: $scope.displayInfo.encounter_id,
            patient_id: $routeParams.patientID
          }, checkClinicalStatusSuccess, checkClinicalStatusFailure);

        }
      }
      function updateClinicalNotesFailure(error){
        console.log(error);
      }

		function saveClinicalSuccess(res){
			$rootScope.loader = "hide";
			if(res.status == true){
        $scope.enablePreviewreport = true;
        $scope.clinicalNotesID = res.clinical_notes_id;
        $('#successModal').modal('show');
        CheckClinicalNotesStatus.save({
            token: $window.sessionStorage.token,
            visit_id: $scope.displayInfo.encounter_id,
            patient_id: $routeParams.patientID
        }, checkClinicalStatusSuccess, checkClinicalStatusFailure);
			}else if(res.status == false){
        $('#erorModal').modal('show');
      }
		}

		function saveClinicalFailure(error){
			$rootScope.loader = "hide";
      $('#internetError').modal('show');
			console.log(error);
		}
	}

		/*PRISCRIPITON*/
    $scope.addMedication = function (checkEdit) {
       var AddMedications = {
           medication: $scope.MedicationData.medication,
           medicationName:  $(".medicationNeme option:selected").text(),
           sig: $scope.MedicationData.sig,
           dispense: $scope.MedicationData.dispense,
           reffills: $scope.MedicationData.reffills,
           pharmacy: $scope.MedicationData.pharmacy,
           note_of_pharmacy: $scope.MedicationData.note_of_pharmacy,
       }
       console.log(AddMedications);
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
       $rootScope.loader = 'show';
       PatienPrescription.save(addPrescrptnPop, PrescriptionSuccessPop, PrescriptionFailurePop)
    }

    function PrescriptionSuccessPop(res) {
      $rootScope.loader = 'hide';
       if (res.status == true) {
           $('#addmedication').modal('hide');
           $scope.medicationsDataPush = []; 
            
       }else if(res.status == false){
        $('#addmedication').modal('hide');
          $('#statusModal').modal('show');
       }
    }

    function PrescriptionFailurePop(res) {
      $('#internetError').modal('show');
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
      }
    }

        /*$scope.addSIG = function (sigData) {
            $scope.MedicationData.sig = sigData.dose == undefined ? '' : sigData.dose + " " + sigData.unit == undefined ? '' : sigData.unit + " " + sigData.route  == undefined ? '' : sigData.route + " for " + sigData.frequency + " " + sigData.direction + " " + sigData.duration;
            console.log($scope.MedicationData.sig);
        }*/

        GetAllMedications.get({
            token: $window.sessionStorage.token
        }, getAllMedicationsSuccess, getAllMedicationsFailure);
        $scope.allMedications = [];
        $scope.allPharmacies = [];

        function getAllMedicationsSuccess(res){
            if(res.status == true){
                $scope.allMedications = res.data;
            }
        }

        function getAllMedicationsFailure(error){
          $('#internetError').modal('show');
            console.log(error);
        }

        DropDownData.get({
            token: $window.sessionStorage.token
        }, getpharmacySuccess, getPharmacyFailure);
        GetAllWardsDropDown.get({
          token: $window.sessionStorage.token
        }, getwardSuccess, getWardFailure);

        function getwardSuccess(res){
            if(res.status == true){
                $scope.allwards = res.data;
            }
        }

        function getWardFailure(error){
          $('#internetError').modal('show');
            console.log(error);
        }

        function getpharmacySuccess(res){
            if(res.status == true){
                $scope.dropDownDATA = res.data;
                $scope.allPharmacies = res.data.pharmacy;
            }
        }

        function getPharmacyFailure(error){
          $('#internetError').modal('show');
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
                admit_date: $scope.displayInfo.visit_created_at,
                start_time: CO.time,
                department_id: CO.department,
                ward_id: CO.ward,
                bed_id: $scope.bedNumber
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
          $('#internetError').modal('show');
          console.log(res)
        }

        DropDownData.get({token: $window.sessionStorage.token, patient_id: $window.sessionStorage.patient_id}, dropDownSuccess, dropDownFailed);
        function dropDownSuccess(res){
            if(res.status == true){
              console.log(res);
                $scope.headerEncountersDropdownData = res.data;
            }
        }
        function dropDownFailed(error){
            console.log(error);
        }

        $scope.addReferral = function(referalData){
          console.log(referalData);
          ReferralPatient.save({
            token: $window.sessionStorage.token,
            referal_type: referalData.type,
            external_referal_email: referalData.externalReferral == undefined ? '' : referalData.externalReferral,
            doctor_id: referalData.doctorID,
            provisional_diagnosis: referalData.diagnosis,
            reason_referal: referalData.reason,
            history: referalData.history,
            investigations: referalData.investigation,
            refered_file: '',//referalData.token,
            patient_id: $scope.displayInfo.id,
            visit_id: $scope.displayInfo.encounter_id
          }, addReferralSuccess, addReferralFailure);
        }

        function addReferralSuccess(res){
          console.log(res);
          if(res.status == true){
            $scope.referral = {};
            $scope.referral.type = "internal";
            $scope.externalDoctor = false;
            $('#referral').modal('hide');
            $('#successmodal').modal('show');
          }
        }

        function addReferralFailure(error){
          console.log(error);
        }

        $scope.uploadFiles = function (files, errFiles, ref) {
            $scope.files = files;
            $scope.errFiles = errFiles;
            var i = 1;
            $scope.referFileName = [];
            angular.forEach(files, function (file) {
              $scope.referFileName.push(file.name);
                if(ref != undefined){
                    console.log(ref);
                    file.upload = Upload.upload({
                        url: serverPath + "add_referal_attachments",
                        method: 'POST',
                        data: {attachment: file, patient_id: $scope.displayInfo.id, visit_id: $scope.displayInfo.encounter_id}
                    });
                }else{
                    file.upload = Upload.upload({
                        url: serverPath + "add_clinical_notes_attachments",
                        method: 'POST',
                        data: {attachment: file, patient_id: $scope.displayInfo.id}
                    });
                }

                file.upload.then(function (response) {
                    //$timeout(function () {
                        file.result = response.data;
                        console.log(response);
                        if(ref == undefined) $('#fileUploadedSuccess').modal('show');
                        else $scope.refAttachment = response.data.message;
                        if(files.length == i){
                            //console.log($scope.PI.file);
                            $scope.saveAndClose = false;
                        }
                        i++;
                    //});
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            });
        }

        $scope.checkType = function(type){
          console.log($scope.referral.type);
          if(type == "external"){
            $scope.externalDoctor = true;
          }else{
            $scope.externalDoctor = false;
          }
        }

        $scope.openPreviewReport = function(){
          ClinicalReport.save({
            token: $window.sessionStorage.token,
            patient_clinical_notes_id: $scope.clinicalNotesID
          }, previewRepostSuccess, previewReportFailure);
        }

        function previewRepostSuccess(res){
          //$scope.previewReport = res.data;
          $('.showPdf').html("<iframe class='abc' src="+res.data+"></iframe>");
          console.log(res);
        }

        function previewReportFailure(error){
          console.log(error);
        }

        $scope.wardSelected = function(wid){
          GetBedsByWard.get({
            token: $window.sessionStorage.token,
            ward_id: wid
          }, getBedsWardSuccess, getBedsWardFailure);
          function getBedsWardSuccess(res){
            if(res.status == true){
              $scope.noOFBeds = res.data;
            }
          }
          function getBedsWardFailure(error){
            console.log(error);
            $('#internetError').modal('show');
          }
        }

        $scope.bedSelected = function(bedID){
          $scope.bedNumber = bedID;
        }

        $scope.signOFF = function(){
          SignOffClinicalProgress.save({
            token: $window.sessionStorage.token,
            patient_clinical_notes_id: $scope.clinicalNotesID
          }, signOffSuccess, signOffFailure);
        }

        function signOffSuccess(res){
          console.log(res);
          if(res.status == true){
            $scope.is_signoff = res.is_signoff;
            $('#signOffSuccess').modal('show');
          }
        }
        function signOffFailure(error){
          console.log(error);
        }

    $scope.getDiagnosis = function(){
      GetDiagnosisList.save({
        token: $window.sessionStorage.token
      }, getAllDiagnosisSuccess, getAllDiagnosisFailure);
    }

    function getAllDiagnosisSuccess(res){
      console.log(res, 'dis');
      if(res.status == true){
        $scope.allDiagnosis = res.data;
        
        $.each($scope.allDiagnosis, function(key, value) {   
          $('.chosen-select').append($("<option></option>").attr("value",value.id).text(value.name));
        })
        $(".chosen-select").css('display', "block");
        $scope.diagnosis_id = 1;
        if($scope.doUpdate == true){
          console.log('in or out');
          $(".chosen-select").val($scope.diagnosis); 
          $('.default,.chosen-container').hide();
        }else{
          if($scope.lengthError == true) $('.chosen-select').chosen();
        }
        $('.default,.chosen-container').hide();
        setTimeout(function () {
          $('select').not('.select_searchFields,.search-ajax').select2({minimumResultsForSearch: Infinity});
        },1000);
      }
    }
    function getAllDiagnosisFailure(error){
      console.log(error);
    }
    DropDownData.get({ // Get all data for dropdown
        token: $window.sessionStorage.token
    }, DropDownDataSuccess, DropDownDataFailure);
    function DropDownDataSuccess(res) { // on success
        if (res.status == true) {
            $scope.labs = res.data.labs; // retreiving only lab data
        }
    }
    function DropDownDataFailure(error) { // on failure
        $('#internetError').modal('show');
        console.log(error);
    }
    $scope.addTest = function (){ // adding test for order
        $scope.lab_tests.push({ 'lab_test' : $scope.Order.lab_test.id , 'priority' : $scope.Order.priority}); // update lab test object with new test
        $scope.testAdded = true;
        $scope.lab_tests_td.push({'name' : $scope.Order.lab_test.name, 'cost':$scope.Order.lab_test.cost, 'priority' : $scope.Order.priority}); // updating new test row for order
        $scope.lab_test_total = parseFloat($scope.lab_test_total) + parseFloat($scope.Order.lab_test.cost);
        $scope.Order.priority = undefined; // unsetting priority dropdown
        $scope.Order.lab_test = undefined; // unsetting test dropdown
        $('#s2id_priority .select2-chosen').text('Select Priority'); // changing place holder back to its original one
        $('#s2id_lab_test .select2-chosen').text('Select Lab Test'); // changing place holder back to its original one
    };
    $scope.activeDropdown = true;
    $scope.activeRDropdown = true;
    $scope.updateLabTests = function (labID){ // Updating Lab Test Dropdown on select of lab
      
        GetLabTests.get({ // Getting all lab tests according to lab id
            token: $window.sessionStorage.token,
            lab: labID
        }, GetLabTestsSuccess, GetLabTestsFailure);
         function GetLabTestsSuccess(res) { // on success
          $scope.activeDropdown = false;
             if (res.status == true) {
                 $scope.labTests = res.data;
             }
         }
         function GetLabTestsFailure(error) { // on failure
            $('#internetError').modal('show');
             console.log(error);
         }
    };
    $scope.date = new Date(); // date property for current date
    $scope.lab_tests = []; // lab tests property
    $scope.lab_tests_td = []; // lab tests row data
    $scope.lab_test_total = 0; // lab tests total cost
    $scope.createOrder = function (Order) { // creating order
        $scope.hideLoader = 'show';
        $scope.OrderBtn = true; // disabling submit button until request is complete
        addOrder.save({ // sending data over addOrder factory which will create new order
            token: $window.sessionStorage.token,
            patient_id: $scope.displayInfo.id,
            lab: $scope.Order.selected_lab == undefined ? $scope.ordersLab2 : $scope.Order.selected_lab,
            lab_test: JSON.stringify($scope.lab_tests),
            clinical_information: $scope.Order.clinical_information == undefined ? '' : $scope.Order.clinical_information,
            visit_id: $scope.displayInfo.encounter_id,
            diagnosis: $scope.Order.diagnosis == undefined ? '' : $scope.Order.diagnosis,
            notes: $scope.Order.notes
        }, OrderSuccess, OrderFailure);
    };
    $scope.createROrder = function (Order) { // creating order
        $scope.hideLoader = 'show';
        $scope.OrderBtn = true; // disabling submit button until request is complete
        addOrder.save({ // sending data over addOrder factory which will create new order
            token: $window.sessionStorage.token,
            patient_id: $scope.displayInfo.id,
            lab: $scope.Order.selected_labName,
            lab_test: JSON.stringify($scope.lab_tests),
            clinical_information: $scope.Order.clinical_information == undefined ? '' : $scope.Order.clinical_information,
            visit_id: $scope.displayInfo.encounter_id,
            diagnosis: $scope.Order.diagnosis == undefined ? '' : $scope.Order.diagnosis,
            notes: $scope.Order.notes
        }, OrderSuccess, OrderFailure);
    };
    function OrderSuccess(res) {
        if (res.status == true) {
            $scope.hideLoader = 'hide';
            $scope.message = true;
            $scope.OrderBtn = false;
            $scope.errorMessage = res.message;
            $scope.messageType = 'alert-success';
            $scope.errorSymbol = 'fa fa-check';
            $timeout(function(){
                $scope.ordersLab2 = $scope.Order.selected_lab;
                $scope.Order = {}; // resetting order object
                $scope.lab_tests = []; // resetting lab tests object
                $scope.lab_tests_td = []; // clearing all test rows
                $scope.lab_test_total = 0; // setting total cost of tests to 0
                $scope.submitted = false;
                $('#s2id_autogen9 .select2-chosen').text('Select Patient'); // changing place holder back to its original one
                $('#s2id_autogen3 .select2-chosen').text('Select Lab'); // changing place holder back to its original one
                $('#neworder').modal('hide');
                $('#radiology').modal('hide');
                $scope.message = false;
            },500);
        } else {
            $scope.hideLoader = "hide";
            $scope.OrderBtn = false;
            $scope.message = true;
            $scope.messageType = "alert-danger";
            $scope.errorMessage = res.message;
            $scope.errorSymbol = "fa fa-times";
        }
    }
    $(".select-bed-dropdown").hide();
    $(".ward-button").on('click', function(){
      $(".select-bed-dropdown").toggle();
    });
    function OrderFailure(error) {
        $('#internetError').modal('show');
        console.log(error);
    }
    GetAllPatients.get({ // Getting all patients
        token: $window.sessionStorage.token
    }, GetAllPatientsSuccess, GetAllPatientsFailure);
    function GetAllPatientsSuccess(res) { // on success
        $rootScope.loader = "hide";
        if (res.status == true) {
            $scope.patients = res.data;
        }
    }
    function GetAllPatientsFailure(error) { // on failure
        $('#internetError').modal('show');
        console.log(error);
    }
    $scope.addRTest = function (){ // adding test for order
        $scope.lab_tests.push({ 'lab_test' : $scope.Order.lab_test.id , 'priority' : $scope.Order.priority}); // update lab test object with new test
        $scope.testAdded = true;
        $scope.lab_tests_td.push({'name' : $scope.Order.lab_test.name, 'cost':$scope.Order.lab_test.cost, 'priority' : $scope.Order.priority}); // updating new test row for order
        $scope.lab_test_total = parseFloat($scope.lab_test_total) + parseFloat($scope.Order.lab_test.cost);
        $scope.Order.priority = undefined; // unsetting priority dropdown
        $scope.Order.lab_test = undefined; // unsetting test dropdown
        $('#s2id_priority .select2-chosen').text('Select Priority'); // changing place holder back to its original one
        $('#s2id_lab_test .select2-chosen').text('Select Lab Test'); // changing place holder back to its original one
    };
    GetLabTests.get({ // Getting all lab tests according to lab id
        token: $window.sessionStorage.token,
        lab: 2
    }, GetLabTestsSuccess, GetLabTestsFailure);
     function GetLabTestsSuccess(res) { // on success
         if (res.status == true) {
             $scope.labTestsR = res.data;
         }
     }
     function GetLabTestsFailure(error) { // on failure
        $('#internetError').modal('show');
         console.log(error);
     }

     $scope.emptyRTest = function(){
      $scope.lab_tests_td = [];
      $scope.Order.selected_labName = "Radiology";
      $scope.lab_test_total = 00;
     }
     $scope.emptyLabTest = function(){
      $scope.lab_tests_td = [];
      $scope.lab_test_total = 00;
      //$scope.Order.selected_labName = "Radiology";
     }
}]);