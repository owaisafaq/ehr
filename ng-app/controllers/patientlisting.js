var AppEHR = angular.module('AppEHR');

AppEHR.controller('patientListingController', ['$scope', '$rootScope', 'GetAllPatients', '$window', '$routeParams','GetPatientInfo', function ($scope, $rootScope, GetAllPatients, $window, $routeParams,GetPatientInfo) {
    $rootScope.pageTitle = "EHR - Patient Listing";
    $scope.displayInfo = {};
    GetAllPatients.get({
        token: $window.sessionStorage.token,
        patient_id: $routeParams.patientID
    }, GetAllPatientsSuccess, GetAllPatientsFailure);

    function GetAllPatientsSuccess(res) {
        console.log(res);
        if (res.status == true) {
            $scope.patientLists = res.data;
            console.log($scope.encounters)
        }
    }

    function GetAllPatientsFailure(error) {
        console.log(error);
    }

    $scope.patientSelected = function (patientID) {
        $scope.patientID = patientID;
        $rootScope.loader = "show";
        GetPatientInfo.get({token: $window.sessionStorage.token, patient_id: patientID}, getPatientSuccess, getPatientFailure);
        function getPatientSuccess(res) {
            if (res.status == true) {
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
                //$scope.showStrip = true;
                //$scope.dataStrip = "custom-card";
            }
        }

        function getPatientFailure(error) {
            $rootScope.loader = "show";
            console.log(error);
        }
    }

}]);