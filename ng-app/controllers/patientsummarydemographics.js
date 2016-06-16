var AppEHR = angular.module('AppEHR');

AppEHR.controller('patientSummaryDemographicsController', ['$scope', '$rootScope', 'PatientDemographics', '$window', '$routeParams', 'GetEncountersByPatients', 'AddVitals', 'GetPatientMedications', function ($scope, $rootScope, PatientDemographics, $window, $routeParams, GetEncountersByPatients, AddVitals, GetPatientMedications) {
        $rootScope.pageTitle = "EHR - Patient Summary Demographics";
        $scope.vital = {};
        $scope.PI = {};
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
            console.log($scope.vital);
            if (angular.equals({}, vital) == false) {
                $rootScope.loader = "show";
                var vitalField = [
                    {"field_id": "1", "value": $scope.vital.systolic == undefined ? '' : $scope.vital.systolic},
                    {"field_id": "2", "value": $scope.vital.diastolic == undefined ? '' : $scope.vital.diastolic},
                    {"field_id": "3", "value": $scope.vital.pulse == undefined ? '' : $scope.vital.pulse},
                    {"field_id": "4", "value": $scope.vital.respiratoryRate == undefined ? '' : $scope.vital.respiratoryRate},
                    {"field_id": "5", "value": $scope.vital.temperaturec == undefined ? '' : $scope.vital.temperaturec},
                    {"field_id": "6", "value": $scope.vital.temperaturef == undefined ? '' : $scope.vital.temperaturef},
                    {"field_id": "7", "value": $scope.vital.result == undefined ? '' : $scope.vital.result},
                    {"field_id": "8", "value": $scope.vital.weight == undefined ? '' : $scope.vital.weight},
                    {"field_id": "9", "value": $scope.vital.height == undefined ? '' : $scope.vital.height}
                ]
                console.log(JSON.stringify(vitalField));
                console.log($routeParams.patientID)
                AddVitals.save({
                    token: $window.sessionStorage.token,
                    vitals: JSON.stringify(vitalField),
                    notes: $scope.vital.notes == undefined ? '' : $scope.vital.notes,
                    patient_id: $routeParams.patientID
                }, vitalSuccess, vitalFailure);
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
    }]);