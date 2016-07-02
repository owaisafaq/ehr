var AppEHR = angular.module('AppEHR');
AppEHR.controller('patientSummaryDemographicsController', ['$scope', '$rootScope', 'PatientDemographics', '$window', '$routeParams', 'GetEncountersByPatients', 'AddVitals', 'GetPatientMedications', 'GetVitalsInfo', 'GetSupplements', 'GetAllergies', 'UpdateAllergies', 'RemoveAllergy', 'GetResourcesByFolderArchives', 'ListFolderArchives', 'EditFolderArchives', 'DeleteFolderArchives', 'RemoveArchives', 'Upload', 'SaveFiles', '$timeout', 'DropDownData', 'ADDSupplements', 'ADDAllergy', 'AddFolderArchives', 'PatienPrescription', function ($scope, $rootScope, PatientDemographics, $window, $routeParams, GetEncountersByPatients, AddVitals, GetPatientMedications, GetVitalsInfo, GetSupplements, GetAllergies, UpdateAllergies, RemoveAllergy, GetResourcesByFolderArchives, ListFolderArchives, EditFolderArchives, DeleteFolderArchives, RemoveArchives, Upload, SaveFiles, $timeout, DropDownData, ADDSupplements, ADDAllergy, AddFolderArchives, PatienPrescription) {
        $rootScope.pageTitle = "EHR - Patient Summary Demographics";
        $scope.vital = {};
        $scope.PI = {};
//        $scope.allergyUpdate = {};
        $rootScope.loader = "show";
        $scope.allergie = {};
        $scope.dropDownInfo = dropDownInfo;
        $scope.edit = [];
        $scope.addSupplement = {};
        $scope.frequencies = frequencies;
        $scope.intakeTypes = intakeTypes;
        $scope.immunizations = immunizations;

        $scope.supplementData = [];

        $scope.visitcurrentPage = 1;
        $scope.visitnumPerPage = 15;
        $scope.visitmaxSize = 5;

        $scope.vitalscurrentPage = 1;
        $scope.vitalsnumPerPage = 15;
        $scope.vitalsmaxSize = 5;

        $scope.medicationscurrentPage = 1;
        $scope.medicationnumPerPage = 15;
        $scope.medicationmaxSize = 5;

        $scope.suplimentscurrentPage = 1;
        $scope.suplimentsnumPerPage = 15;
        $scope.suplimentsmaxSize = 5;

        $scope.allergycurrentPage = 1;
        $scope.allergynumPerPage = 15;
        $scope.allergysmaxSize = 5;
        $scope.PID = $routeParams.patientID

        $scope.medicationDropDowns = medicationDropDowns;
        $scope.pharmacyDataDropDown = pharmacyDataDropDown;

        $scope.medicationsDataPush = [];


        PatientDemographics.get({
            token: $window.sessionStorage.token,
            patient_id: $routeParams.patientID
        }, getPatientInfoSuccess, getPatientInfoFailure);
        function getPatientInfoSuccess(res) {
            console.log(res)
            if (res.status == true) {
                var dob = new Date(res.data.date_of_birth);
                var dobArr = dob.toDateString().split(' ');
                $scope.PI.date_of_birth = dobArr[1] + ' ' + dobArr[2] + ' ' + dobArr[3];
                $scope.PI.first_name = res.data.first_name;
                $scope.PI.middle_name = res.data.middle_name;
                $scope.PI.last_name = res.data.last_name;
                $scope.PI.patient_id = res.data.id;
                $scope.PI.age = res.data.age;
                $scope.PI.sex = res.data.sex;
                $scope.PI.gender = res.data.gender;
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
                GetPatientMedications.get({
                    token: $window.sessionStorage.token,
                    patient_id: $routeParams.patientID
                }, getPatientMedicationSuccess, getPatientMedicationFailure);
            }
            $rootScope.loader = "hide";
        }

        function getPatientInfoFailure(error) {
            alert('Invalid Patient ID');
            console.log(error);
        }

        function getPatientMedicationSuccess(res) {
            if (res.status == true) {
                $scope.medications = res.data;
            }
        }

        function getPatientMedicationFailure(error) {

            console.log(error);
        }

        $scope.validateVitals = function (vital) {
            if (angular.equals({}, vital) == false) {
                if ($('form[name=vitalForm]').find('.error').length == 0) {
                    $rootScope.loader = "show";
                    var vitalField = {
                        patient_id: $routeParams.patientID,
                        systolic_mm_hg: $scope.vital.systolic == undefined ? '' : $scope.vital.systolic,
                        diastolic_mm_hg: $scope.vital.diastolic == undefined ? '' : $scope.vital.diastolic,
                        pulse: $scope.vital.pulse == undefined ? '' : $scope.vital.pulse,
                        respiratory_rate: $scope.vital.respiratoryRate == undefined ? '' : $scope.vital.respiratoryRate,
                        temperature_c: $scope.vital.temperaturec == undefined ? '' : $scope.vital.temperaturec,
                        temperature_f: $scope.vital.temperaturef == undefined ? '' : $scope.vital.temperaturef,
                        bmi_result: $scope.vital.result == undefined ? '' : $scope.vital.result,
                        bmi_weight: $scope.vital.weight == undefined ? '' : $scope.vital.weight,
                        notes: $scope.vital.notes == undefined ? '' : $scope.vital.notes,
                        bmi_height: $scope.vital.height == undefined ? '' : $scope.vital.height,
                        token: $window.sessionStorage.token,
                    }
                    AddVitals.save(vitalField, vitalSuccess, vitalFailure);
                }
            }
        }

        function vitalSuccess(res) {
            if (res.status == true) {
                GetVitalsInfo.get({
                    token: $window.sessionStorage.token,
                    patient_id: $routeParams.patientID
                }, getVitalInfoSuccess, getVitalInfoFailure);
                $scope.vital.systolic = '';
                $scope.vital.diastolic = '';
                $scope.vital.pulse = '';
                $scope.vital.respiratoryRate = '';
                $scope.vital.temperaturec = '';
                $scope.vital.temperaturef = '';
                $scope.vital.result = '';
                $scope.vital.weight = '';
                $scope.vital.notes = '';
                $scope.vital.height = '';
            }
        }

        function vitalFailure(error) {
            console.log(error);
        }

        GetVitalsInfo.get({
            token: $window.sessionStorage.token,
            patient_id: $routeParams.patientID
        }, getVitalInfoSuccess, getVitalInfoFailure);
        function getVitalInfoSuccess(res) {
            if (res.status == true) {
                $rootScope.loader = "hide";
                $('#vital-signs').modal('hide');
                $scope.vitals = res.data;
                $scope.visitnumOfData = res.data.length;

            }
        }

        function getVitalInfoFailure(error) {
            console.log(error);
        }

        $scope.clinicalNote = function () {
            $window.location.href = '#/clinical-documentation-clinic-progress-note/' + $routeParams.patientID;
        }

        GetSupplements.get({
            token: $window.sessionStorage.token,
            patient_id: $routeParams.patientID
        }, GetSupplementsSuccess, GetSupplementsFailure);
        function GetSupplementsSuccess(res) {
            console.log(res);
            if (res.status == true) {
                $scope.supplements = res.data;
            }
        }

        function GetSupplementsFailure(error) {
            console.log(error);
        }


        GetAllergies.get({
            token: $window.sessionStorage.token,
            patient_id: $routeParams.patientID
        }, GetAllergiesSuccess, GetAllergiesFailure);
        function GetAllergiesSuccess(res) {
            if (res.status == true) {
//                $scope.allergies = 
                $scope.allergies = res.data;
//                $scope.allergy_status = {
//                    "value": res.data.allergy_status,
//                    "values": ["Service 1", "Service 2", "Service 3", "Service 4"]
//                };
//                $scope.allergie.allergy_status == res.data.allergy_status;
//                console.log(res.data)
            }
        }

        function GetAllergiesFailure(error) {
            console.log(error);
        }

        GetEncountersByPatients.get({
            token: $window.sessionStorage.token,
            patient_id: $routeParams.patientID
        }, GetEncountersByPatientsSuccess, GetEncountersByPatientsFailure);
        function GetEncountersByPatientsSuccess(res) {
            if (res.status == true) {
                $scope.encounters = res.data;
//                console.log('GetEncountersByPatientsSuccess')
//                console.log($scope.encounters)
            }
        }

        function GetEncountersByPatientsFailure(error) {
            console.log(error);
        }


        $scope.editAllergies = function (index) {
//            $scope.edit = true;
            console.log($scope.edit[index])
            $scope.edit[index] = true;
        }
        $scope.saveAllergies = function (ED, index) {
            var AllergyData = {
                patient_id: $routeParams.patientID,
                allergy_id: ED.id,
                allergy_type: ED.allergy_type == undefined ? '' : ED.allergy_type,
                allergies: ED.allergies == undefined ? '' : ED.allergies,
                severity: ED.severity == undefined ? '' : ED.severity,
                observed_on: ED.observed_on == undefined ? '' : ED.observed_on,
                allergy_status: ED.allergy_status == undefined ? '' : ED.allergy_status,
                reaction: ED.reactions == undefined ? '' : ED.reactions,
                token: $window.sessionStorage.token,
            }
            UpdateAllergies.save(AllergyData, allergySuccess, allergyFailure);
            console.log(index)
            $scope.edit[index] = false;
        }
        function allergySuccess(res) {
            if (res.status == true) {
                $rootScope.loader = "hide";
            }
        }
        function allergyFailure(error) {
            console.log(error);
        }
        $scope.GetTempcVal = function () {
            $scope.vital.temperaturef = ($scope.vital.temperaturec - 32) * (5 / 9);
        }
        $scope.GetTempfVal = function () {
            $scope.vital.temperaturec = ($scope.vital.temperaturef * (9 / 5)) + 32

        }
        $scope.parseFloat = function (val) {
            return isNaN(parseFloat(val)) ? 0 : parseFloat(val);
        }
        $scope.Calculatebmi = function () {
            $scope.vital.result = ($scope.vital.weight) / (($scope.vital.height / 100) * ($scope.vital.height / 100));
            console.log("aasdas")
        }
        $scope.removeAllergy = function (ED) {
            console.log("thre")
            $scope.removeAllergyData = {
                patient_id: $routeParams.patientID,
                allergy_id: ED.id,
                token: $window.sessionStorage.token
            }

        }
        $scope.doDelete = function () {
            console.log("Oo")
            RemoveAllergy.save($scope.removeAllergyData, allergySuccess, allergyFailure);
            GetAllergies.get({
                token: $window.sessionStorage.token,
                patient_id: $routeParams.patientID
            }, GetAllergiesSuccess, GetAllergiesFailure);
        }

        /*ARCHIVE*/

        function archiveSuccess(res) {
            if (res.status == true) {
                $scope.archives = res.data;
                console.log(res.data);
            }
        }

        function archiveFailure(error) {
            console.log(error);
        }

        $scope.getFileDetails = function (e) {
            $scope.files = [];

            $scope.$apply(function () {

                // STORE THE FILE OBJECT IN AN ARRAY.
                for (var i = 0; i < e.files.length; i++) {
                    $scope.files.push(e.files[i])
                }

            });
        };
        $scope.files = [];
        $scope.saveAndClose = true;
        $scope.patient_archive = [];
        $scope.uploadFiles = function (files, errFiles) {
            $scope.files = files;
            $scope.errFiles = errFiles;
            var i = 1;
            angular.forEach(files, function (file) {
                file.upload = Upload.upload({
                    url: serverPath + "add_patient_archive",
                    method: 'POST',
                    data: {patient_archive: file, patient_id: $routeParams.patientID, follow_up_parent_id: $scope.followupParentId}
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                        console.log(response);
                        if (files.length == i) {
                            console.log(i);
                            $scope.saveAndClose = false;
                        }
                        i++;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                    console.log($scope.errorMsg);
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });

            });
        }

        $scope.listAfterUploaded = function () {
            GetResourcesByFolderArchives.get({token: $window.sessionStorage.token, patient_id: $routeParams.patientID, followup_parent_id: $scope.followupParentId}, nestedFolderSuccess, nestedFolderFailure);
            ListFolderArchives.get({token: $window.sessionStorage.token, patient_id: $routeParams.patientID, followup_parent_id: $scope.followupParentId}, listFolderSuccess, listFolderFailure);
        }

        $scope.folderArea = false;
        $scope.fileTypes = "application/pdf";
        $scope.selectType = function (types) {
            $scope.fileTypes = types;
        }

        $scope.deleteArchive = function () {
            var removeId = $('.file_uploads .active').data('id');
            if (removeId != undefined) {
                $scope.removeItemId = removeId;
                if ($('.file_uploads .active').parent('.folder_create_con').length > 0) { // folder
                    DeleteFolderArchives.get({token: $window.sessionStorage.token, /*$window.sessionStorage.patient_id*/ resource_id: removeId}, deleteFolderSuccess, deleteFolderFailure);
                } else {
                    $rootScope.loader = 'show';
                    console.log(removeId);
                    RemoveArchives.get({token: $window.sessionStorage.token, patient_id: $routeParams.patientID, patient_fie_id: removeId}, removeArchiveSuccess, removeArchiveFailure);
                }
            }
        }

        function removeArchiveSuccess(res) {
            if (res.status == true) {
                //$scope.followupParentId = $scope.removeItemId;
                $rootScope.loader = 'hide';
                $('.archive_buttons .edit,.archive_buttons .delete').css('display', 'none')
                //GetArchives.get({token: $window.sessionStorage.token, patient_id: '1' /*$window.sessionStorage.patient_id*/}, archiveSuccess, archiveFailure);
                GetResourcesByFolderArchives.get({token: $window.sessionStorage.token, patient_id: $routeParams.patientID, followup_parent_id: $scope.followupParentId}, nestedFolderSuccess, nestedFolderFailure);

                ListFolderArchives.get({token: $window.sessionStorage.token, patient_id: $routeParams.patientID, followup_parent_id: $scope.followupParentId}, listFolderSuccess, listFolderFailure);
            }
        }

        function removeArchiveFailure(error) {
            console.log(error);
            $rootScope.loader == 'hide'
        }

        function deleteFolderSuccess(res) {
            if (res.status == true) {
                $rootScope.loader = 'hide';
                $('.archive_buttons .edit,.archive_buttons .delete').css('display', 'none')
                GetResourcesByFolderArchives.get({token: $window.sessionStorage.token, patient_id: $routeParams.patientID, followup_parent_id: $scope.followupParentId}, nestedFolderSuccess, nestedFolderFailure);
                ListFolderArchives.get({token: $window.sessionStorage.token, patient_id: $routeParams.patientID, followup_parent_id: $scope.followupParentId}, listFolderSuccess, listFolderFailure);
            }
        }

        function deleteFolderFailure(error) {
            console.log(error);
            $rootScope.loader == 'hide'
        }

        // edit archive
        $scope.editArchive = function () {
            var filename = $('.file_uploads .active').data('filename');
            var fileid = $('.file_uploads .active').data('id');
            $rootScope.loader = 'show';
            if (fileid != undefined) {
                EditArchives.save({token: $window.sessionStorage.token, patient_id: $routeParams.patientID, file_name: filename, file_id: fileid}, editArchiveSuccess, editArchiveFailure);
            }
        }

        function editArchiveSuccess(res) {
            if (res.status == true) {
                $rootScope.loader = 'hide';
                GetArchives.get({token: $window.sessionStorage.token, patient_id: $routeParams.patientID}, archiveSuccess, archiveFailure);
            }
        }
        // to edit folder or filename
        $scope.saveArchive = function () {
            var fileid = $('.file_uploads .active').data('id');
            var filename = $('.file_uploads .active').find('input[type=text]').val();
            if ($('.file_uploads .active').parent('.folder_create_con').length > 0) { // folder
                //var filename = $('.file_uploads .active').data('filename');
                $rootScope.loader = 'show';
                EditFolderArchives.save({token: $window.sessionStorage.token, patient_id: $routeParams.patientID, resource_id: fileid, name: filename}, saveFolderNameSuccess, editArchiveFailure);
            } else {
                $rootScope.loader = 'show';
                EditArchives.save({token: $window.sessionStorage.token, patient_id: $routeParams.patientID, file_name: filename, file_id: fileid}, saveFileNameSuccess, editFileArchiveFailure);
            }
        }

        function saveFolderNameSuccess(res) {
            if (res.status == true) {
                $('.archive_buttons .edit,.archive_buttons .delete').css('display', 'none')
                ListFolderArchives.get({token: $window.sessionStorage.token, patient_id: $routeParams.patientID, followup_parent_id: '0'}, listFolderSuccess, listFolderFailure);
            }
        }

        function editArchiveFailure(error) {
            console.log(error);
            $rootScope.loader == 'hide'
        }

        function saveFileNameSuccess(res) {
            if (res.status == true) {
                GetResourcesByFolderArchives.get({token: $window.sessionStorage.token, patient_id: $routeParams.patientID, followup_parent_id: '0'}, nestedFolderSuccess, nestedFolderFailure);
            }
        }
        function editFileArchiveFailure(error) {
            console.log(error);
            $rootScope.loader == 'hide'
        }

        $scope.showPDF = function (link) {
            $window.open(link, '_blank');
        }

        $scope.followupParentId = '0';
        GetResourcesByFolderArchives.get({token: $window.sessionStorage.token, patient_id: $routeParams.patientID, followup_parent_id: $scope.followupParentId}, nestedFolderSuccess, nestedFolderFailure);
        function nestedFolderSuccess(res) {
            if (res.status == true) {
                console.log(res.data);
                $scope.backButtonArchive = false;
                //$scope.foldersArchive = [];
                $scope.archives = [];
                $scope.archives = res.data;
                $rootScope.loader = 'hide';
            }
        }

        function nestedFolderFailure(error) {
            console.log(error);
        }

        $scope.disabledEditButton = true;
        $scope.backButtonArchive = true;
        $scope.folderParentId = '0';

        ListFolderArchives.get({token: $window.sessionStorage.token, patient_id: $routeParams.patientID, followup_parent_id: $scope.followupParentId}, listFolderSuccess, listFolderFailure);
        /*function listFolderSuccess(res) {
         console.log(res);
         console.log("there aasd");
         if (res.status == true) {
         $rootScope.foldersArchive = [];
         $rootScope.foldersArchive = res.data;
         }
         }
         function listFolderFailure(error) {
         console.log(error);
         }*/

        function listFolderSuccess(res) {
            if (res.status == true) {
                $scope.foldersArchive = [];
                console.log(res.data);
                $scope.foldersArchive = res.data;
                $rootScope.loader = 'hide';
            }
        }
        function listFolderFailure(error) {
            console.log(error);
        }
        $scope.backLinkID = '0';
        // Open folder when double click
        $scope.openFolder = function () {
            var folderId = $('.file_uploads .active').data('id');
            if ($scope.backLinkID == '0') {
                $scope.backLinkID = $scope.followupParentId;
                console.log($scope.backLinkID + "--");
            } else {
                console.log('not zero');
                $scope.backLinkID = $scope.followupParentId;
                console.log($scope.backLinkID);
            }
            $scope.followupParentId = folderId;
            //console.log("folderifd"+folderId);
            if (folderId != undefined) {
                $scope.foldersArchive = [];
                $scope.archives = [];
                $rootScope.loader = 'show';
                $scope.backButtonArchive = true;
                GetResourcesByFolderArchives.get({token: $window.sessionStorage.token, patient_id: $routeParams.patientID, followup_parent_id: folderId}, nestedFolderSuccess, nestedFolderFailure);
                ListFolderArchives.get({token: $window.sessionStorage.token, patient_id: $routeParams.patientID, followup_parent_id: folderId}, listFolderSuccess, listFolderFailure);
                //GetArchives.get({token: $window.sessionStorage.token, patient_id: '1' /*$window.sessionStorage.patient_id*/}, archiveSuccess, archiveFailure);
            }
        }

        function nestedFolderSuccess(res) {
            if (res.status == true) {
                $scope.backButtonArchive = false;
                //$scope.foldersArchive = [];
                $scope.archives = [];
                $scope.archives = res.data;
                $rootScope.loader = 'hide';
            }
        }

        function nestedFolderFailure(error) {
            console.log(error);
        }

        $scope.backButton = function () {
            console.log($scope.followupParentId);
            if ($scope.backLinkID == '0') {
                $scope.followupParentId = $scope.backLinkID;
                console.log($scope.followupParentId + "--followupParentId");
            }
            GetResourcesByFolderArchives.get({token: $window.sessionStorage.token, patient_id: $routeParams.patientID, followup_parent_id: $scope.backLinkID}, nestedFolderSuccess, nestedFolderFailure);

            ListFolderArchives.get({token: $window.sessionStorage.token, patient_id: $routeParams.patientID, followup_parent_id: $scope.backLinkID}, listFolderSuccess, listFolderFailure);
        }

        $scope.folderBtn = function () {
            console.log($scope.followupParentId);
            if ($scope.folderName != undefined && $scope.folderName != '') {
                $rootScope.loader = 'show';
                AddFolderArchives.save({token: $window.sessionStorage.token, patient_id: $routeParams.patientID, name: $scope.folderName, followup_parent_id: $scope.followupParentId}, folderCreatedSuccess, folderCreatedFailure);
            }
        }

        function folderCreatedSuccess(res) {
            if (res.status == true) {
                console.log(res);
                $scope.saveAndClose = false;
                $scope.folderName = '';
                $scope.archiveSuccessMessage = res.message;
                $rootScope.loader = 'hide';
                GetResourcesByFolderArchives.get({token: $window.sessionStorage.token, patient_id: $routeParams.patientID, followup_parent_id: $scope.backLinkID}, nestedFolderSuccess, nestedFolderFailure);
                ListFolderArchives.get({token: $window.sessionStorage.token, patient_id: $routeParams.patientID, followup_parent_id: $scope.backLinkID}, listFolderSuccess, listFolderFailure);
            }
        }

        function folderCreatedFailure(error) {
            console.log(error);
        }
        $scope.addSupplements = function (dataToBeAdded) {
            if (angular.equals({}, dataToBeAdded) == false) {
                console.log(dataToBeAdded.status);
                ADDSupplements.save({
                    token: $window.sessionStorage.token,
                    patient_id: $routeParams.patientID,
                    supplements: dataToBeAdded.supplementName,
                    manufacturer: dataToBeAdded.manufacturer,
                    dosage: dataToBeAdded.dosage1 + " " + dataToBeAdded.dosage2,
                    frequency: dataToBeAdded.frequency,
                    intake: dataToBeAdded.intake,
                    from_date: dataToBeAdded.fromdate,
                    medicine_status: dataToBeAdded.status == false ? 'Inactive' : 'Active',
                    to_date: dataToBeAdded.todate
                }, addSupplementsSuccess, addSupplementsFailure);
            }
        }

        function addSupplementsSuccess(res) {
            console.log(res);
            if (res.status == true) {
                $scope.addSupplement = {};
                $('#addsuplemets').modal('hide');
                GetSupplements.get({
                    token: $window.sessionStorage.token,
                    patient_id: $routeParams.patientID
                }, GetSupplementsSuccess, GetSupplementsFailure);
            }
        }

        function addSupplementsFailure(error) {
            console.log(error);
        }

        $scope.addAllergy = function (dataToBeAdded) {
            if (angular.equals({}, dataToBeAdded) == false) {
                console.log(dataToBeAdded)
                $scope.addallergyData = {
                    token: $window.sessionStorage.token,
                    patient_id: $routeParams.patientID,
                    allergy_type: dataToBeAdded.allergyType,
                    allergies: dataToBeAdded.allergy,
                    severity: dataToBeAdded.severity,
                    observed_on: dataToBeAdded.observed_on,
                    allergy_status: dataToBeAdded.status,
                    reaction: dataToBeAdded.reaction,
                }
                ADDAllergy.save($scope.addallergyData, addAllergySuccess, addAllergyFailure);
                console.log($scope.addallergyData)
            }
        }

        function addAllergySuccess(res) {
            console.log(res);
            if (res.status == true) {
                $scope.addAllergy = {};
                $('#addallergies').modal('hide');
                GetAllergies.get({
                    token: $window.sessionStorage.token,
                    patient_id: $routeParams.patientID
                }, GetAllergiesSuccess, GetAllergiesFailure);
            }
        }

        function addAllergyFailure(error) {
            console.log(error);
        }

        $scope.addImmunizations = function (name) {
            if (name != undefined) {
                $scope.immunizations.push({id: immunizations.length + 1, name: name});
                $scope.immunizationName = undefined;
            }
        }

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
                visit_id: 1
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
