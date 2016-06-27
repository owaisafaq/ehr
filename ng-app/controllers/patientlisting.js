var AppEHR = angular.module('AppEHR');

AppEHR.controller('patientListingController', ['$scope', '$rootScope', 'GetAllPatients', '$window', '$routeParams', 'GetPatientInfo', function ($scope, $rootScope, GetAllPatients, $window, $routeParams, GetPatientInfo) {
        $scope.action = '';
        $rootScope.pageTitle = "EHR - Patient Listing";
        $scope.displayInfo = {};
        $scope.patientLists = [];
        $rootScope.loader = "show";
        $scope.itemsPerPage = 15;
        $scope.offset = 1;
        $scope.currentPage = 0;
        $scope.items = [];
        GetAllPatients.get({
            token: $window.sessionStorage.token,
            offset: $scope.offset,
            limit: $scope.itemsPerPage
        }, GetAllPatientsSuccess, GetAllPatientsFailure);

        function GetAllPatientsSuccess(res) {
            $rootScope.loader = "hide";
            if (res.status == true) {
                $scope.patientLists = res.data;
                console.log(res.count);
                $scope.numOfData = res.count;
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
                    $scope.displayInfo.date_of_birth = res.data.date_of_birth;
                    $scope.showIdCard = true;
                    //$scope.showStrip = true;
                    //$scope.dataStrip = "custom-card";
                }
            }

            function getPatientFailure(error) {
                $rootScope.loader = "show";
                console.log(error);
            }
        }

        $scope.currentPage = 1;
        $scope.numPerPage = 15;
        $scope.maxSize = 5;
        

          /*for (var i=0; i<$scope.patientLists.length; i++) {
            $scope.patientLists.push({ id: i, first_name: "name "+ i, last_name: "description " + i });
          }*/

        $scope.range = function() {
            var rangeSize = 5;
            var ret = [];
            var start;

            start = $scope.currentPage;
            if ( start > $scope.pageCount()-rangeSize ) {
              start = $scope.pageCount()-rangeSize+1;
            }

            for (var i=start; i<start+rangeSize; i++) {
              ret.push(i);
            }
            return ret;
        };

        $scope.prevPage = function() {
            if ($scope.currentPage > 0) {
                console.log(true)
                $rootScope.loader = "show";
                $scope.currentPage--;
                GetAllPatients.get({
                    token: $window.sessionStorage.token,
                    offset: $scope.offset - 15,
                    limit: $scope.itemsPerPage
                }, GetAllPatientsSuccess, GetAllPatientsFailure);
            }
        };

          $scope.prevPageDisabled = function() {
            return $scope.currentPage === 0 ? "disabled" : "";
          };

          $scope.pageCount = function() {
            return Math.ceil($scope.numOfData/$scope.itemsPerPage)-1;
          };

          $scope.nextPage = function() {
            if ($scope.currentPage < $scope.pageCount()) {
              $scope.currentPage++;
              $rootScope.loader = "show";
              console.log(true)
                GetAllPatients.get({
                    token: $window.sessionStorage.token,
                    offset: $scope.offset + 15,
                    limit: $scope.itemsPerPage
                }, GetAllPatientsSuccess, GetAllPatientsFailure);
            }
          };

          $scope.nextPageDisabled = function() {
            return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
          };

          $scope.setPage = function(n) {
            $scope.currentPage = n;
          };

        
        
    }]);