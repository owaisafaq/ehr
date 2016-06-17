var AppEHR = angular.module('AppEHR');

AppEHR.controller('patientSummaryDemographicsController', ['$scope', '$rootScope', 'PatientDemographics', '$window', '$routeParams', 'GetEncountersByPatients', 'AddVitals', 'GetPatientMedications', 'GetVitalsInfo', 'GetSupplements', 'GetAllergies', function ($scope, $rootScope, PatientDemographics, $window, $routeParams, GetEncountersByPatients, AddVitals, GetPatientMedications, GetVitalsInfo, GetSupplements, GetAllergies) {
        $rootScope.pageTitle = "EHR - Patient Summary Demographics";
//        $scope.vital = {};
        $scope.PI = {};
        $rootScope.loader = "show";
        PatientDemographics.get({
            token: $window.sessionStorage.token,
            patient_id: $routeParams.patientID
        }, getPatientInfoSuccess, getPatientInfoFailure);
        console.log($routeParams.patientID);
        function getPatientInfoSuccess(res) {
            console.log(res.data);
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
            console.log(res.data);
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
                    console.log(vitalField);
//                console.log($routeParams.patientID)
                    AddVitals.save(vitalField, vitalSuccess, vitalFailure);
                }
            }
        }

        function vitalSuccess(res) {
            console.log(res);
            if (res.status == true) {
                $rootScope.loader = "hide";
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
            console.log(res);
            if (res.status == true) {
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
            console.log(res);
            if (res.status == true) {
                $scope.allergies = res.data;
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
            console.log(res);
            if (res.status == true) {
                $scope.encounters = res.data;
                console.log('GetEncountersByPatientsSuccess')
                console.log($scope.encounters)
            }
        }

        function GetEncountersByPatientsFailure(error) {
            console.log(error);
        }
    }]);