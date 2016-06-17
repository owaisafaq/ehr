var AppEHR = angular.module('AppEHR');

AppEHR.controller('patientListingController', ['$scope', '$rootScope', 'GetAllPatients','$window', '$routeParams',function ($scope, $rootScope, GetAllPatients,$window,$routeParams) {
        $rootScope.pageTitle = "EHR - Patient Listing";
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

    }]);