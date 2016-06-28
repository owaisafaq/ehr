var AppEHR = angular.module('AppEHR');
AppEHR.controller('patientSummaryDemographicsController', ['$scope', '$rootScope', 'PatientDemographics', '$window', '$routeParams', 'GetEncountersByPatients', 'AddVitals', 'GetPatientMedications', 'GetVitalsInfo', 'GetSupplements', 'GetAllergies', 'UpdateAllergies', 'RemoveAllergy', 'DropDownData', function ($scope, $rootScope, PatientDemographics, $window, $routeParams, GetEncountersByPatients, AddVitals, GetPatientMedications, GetVitalsInfo, GetSupplements, GetAllergies, UpdateAllergies, RemoveAllergy, DropDownData) {
        $rootScope.pageTitle = "EHR - Patient Summary Demographics";
        $scope.vital = {};
        $scope.PI = {};
//        $scope.allergyUpdate = {};
        $rootScope.loader = "show";
        $scope.allergie = {};
        $scope.dropDownInfo = dropDownInfo;
        $scope.edit = [];
        $scope.frequencies = frequencies;
        $scope.intakeTypes = intakeTypes;
        $scope.supplementData = [];
        PatientDemographics.get({
            token: $window.sessionStorage.token,
            patient_id: $routeParams.patientID
        }, getPatientInfoSuccess, getPatientInfoFailure);
        function getPatientInfoSuccess(res) {
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
            }
        }

        function getVitalInfoFailure(error) {
            console.log(error);
        }

        $scope.clinicalNote = function () {
            $window.location.href = '#/clinical-documentation-clinic-progress-note';
        }

        GetSupplements.get({
            token: $window.sessionStorage.token,
            patient_id: $routeParams.patientID
        }, GetSupplementsSuccess, GetSupplementsFailure);
        function GetSupplementsSuccess(res) {
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
            RemoveAllergy.save($scope.removeAllergyData, allergySuccess, allergyFailure);
            GetAllergies.get({
                token: $window.sessionStorage.token,
                patient_id: $routeParams.patientID
            }, GetAllergiesSuccess, GetAllergiesFailure);
//            }
        }
        DropDownData.get({
            token: $window.sessionStorage.token,
            patient_id: $routeParams.patientID
        }, GetManufacturerSuccess, GetManufacturerFailure);
        $scope.saveSupplement = function () {
            console.log($scope.supplementData.manufacturer);

        }
        function GetManufacturerSuccess(res) {
            $scope.manufacturer = res.data.manufacturer;
        }
        function GetManufacturerFailure(error) {
            console.log(error)
        }
    }]);
