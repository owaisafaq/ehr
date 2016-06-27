var AppEHR = angular.module('AppEHR');

AppEHR.controller('patientListingController', ['$scope', '$rootScope', 'GetAllPatients', '$window', '$routeParams', 'GetPatientInfo', function ($scope, $rootScope, GetAllPatients, $window, $routeParams, GetPatientInfo) {
        $scope.action = '';
        $rootScope.pageTitle = "EHR - Patient Listing";
        $scope.displayInfo = {};
        GetAllPatients.get({
            token: $window.sessionStorage.token,
            offset: 1,
            limit: 15,
        }, GetAllPatientsSuccess, GetAllPatientsFailure);

        function GetAllPatientsSuccess(res) {
            if (res.status == true) {
                $scope.patientLists = res.data;
            }
        }

        function GetAllPatientsFailure(error) {
            console.log(error);
        }

        $scope.patientSelected = function (patientID) {
            $scope.patientID = patientID;
            console.log("there")
            $rootScope.loader = "show";
            GetPatientInfo.get({token: $window.sessionStorage.token, patient_id: patientID}, getPatientSuccess, getPatientFailure);
            function getPatientSuccess(res) {
                console.log(patientID)
                if (res.status == true) {
                    console.log(res.data)
                    $rootScope.loader = "hide";
                    $scope.disabledEncounterButton = false;
                    $scope.patientInfo = true;
                    $scope.displayInfo.first_name = res.data.first_name;
                    $scope.displayInfo.middle_name = res.data.middle_name;
                    $scope.displayInfo.last_name = res.data.last_name;
                    $scope.displayInfo.patient_id = res.data.id;
                    $scope.displayInfo.age = res.data.age;
                    $scope.displayInfo.sex = res.data.sex;
                    $scope.displayInfo.marital_status = res.data.marital_status;
                    $scope.displayInfo.date_of_birth = res.data.date_of_birth;
                    $scope.showIdCard = true
                    //$scope.showStrip = true;
                    //$scope.dataStrip = "custom-card";
                }
            }

            function getPatientFailure(error) {
                console.log("there")
                console.log(patientID)
                $rootScope.loader = "show";
                console.log(error);
            }
        }
    }]);