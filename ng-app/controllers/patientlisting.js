var AppEHR = angular.module('AppEHR');

AppEHR.controller('patientListingController', ['$scope', '$rootScope', 'GetAllPatients', '$window', '$routeParams', 'GetPatientInfo', 'CheckoutPatient', function ($scope, $rootScope, GetAllPatients, $window, $routeParams, GetPatientInfo, CheckoutPatient) {
        $scope.action = '';
        $rootScope.pageTitle = "EHR - Patient Listing";
        $scope.displayInfo = {};
        $scope.patientLists = [];
        $rootScope.loader = "show";
        $scope.itemsPerPage = 15;
        $scope.offset = 0;
        //$scope.currentPage = 0;
        $scope.items = [];
        $scope.search = {};
        $scope.idCardDisabledBtn = true;
        GetAllPatients.get({
            token: $window.sessionStorage.token,
            offset: $scope.offset, limit: $scope.itemsPerPage
        }, GetAllPatientsSuccess, GetAllPatientsFailure);

        $scope.curPage = 0;
        $scope.pageSize = 15;
        $scope.numberOfPages = function() {
          return Math.ceil($scope.patientCount / $scope.pageSize);
        };

        $scope.paginationNext = function(pageSize, curPage){
            $rootScope.loader = "show";
            console.log(pageSize * curPage);
            GetAllPatients.get({
                token: $window.sessionStorage.token,
                offset: (pageSize * curPage), limit: $scope.itemsPerPage
            }, GetAllPatientsSuccess, GetAllPatientsFailure);
        }

        $scope.paginationPrev = function(pageSize, curPage){
            $rootScope.loader = "show";
            console.log(pageSize * curPage);
            GetAllPatients.get({
                token: $window.sessionStorage.token,
                offset: (pageSize - 1) * curPage, limit: $scope.itemsPerPage
            }, GetAllPatientsSuccess, GetAllPatientsFailure);
        }
        $scope.samePage = '';
        $scope.goToPage = function(pageSize, num){
            console.log($scope.samePage+num);
            $rootScope.loader = "show";
            GetAllPatients.get({
                token: $window.sessionStorage.token,
                offset: (pageSize * num), limit: $scope.itemsPerPage
            }, GetAllPatientsSuccess, GetAllPatientsFailure);
        }

        $scope.selectBoxValue = function(value){
            $rootScope.loader = "show";
            $scope.pageNumber = '';
            GetAllPatients.get({
                token: $window.sessionStorage.token,
                offset: ($scope.pageSize * $scope.curPage), limit: value
            }, GetAllPatientsSuccess, GetAllPatientsFailure);
        }
        $('body').on('keyup', '.enterKey input[type=text]', function (e) {
            if (e.keyCode == 13) {
                if ($(this).val() != "") {
                    $(this).trigger("enterKey");
                    if($scope.pageNumber != undefined && $scope.pageNumber != '' && parseInt($scope.pageNumber) <= $scope.numberOfPages()){
                        GetAllPatients.get({
                            token: $window.sessionStorage.token,
                            offset: ($scope.pageSize * $scope.pageNumber) == $scope.pageSize ? 0 : ($scope.pageSize * $scope.pageNumber), limit: $scope.itemsPerPage
                        }, GetAllPatientsSuccess, GetAllPatientsFailure);
                    }
                }
            }
        });

        function GetAllPatientsSuccess(res) {
            $rootScope.loader = "hide";
            if (res.status == true) {
                $scope.patientLists = [];
                $scope.patientLists = res.data;
                $scope.patientCount = res.count;
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
                    $scope.idCardDisabledBtn = false;
                    console.log(res.data);
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
                    $scope.displayInfo.date_of_birth = res.data.date_of_birth;
                    $scope.displayInfo.encounter_id = res.data.encounter_id;
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

        if ($scope.patientID != undefined) {
            $scope.idCardDisabledBtn = false;
        }

        $scope.currentPage = 1;
        $scope.numPerPage = 15;
        $scope.maxSize = 5;


        /*for (var i=0; i<$scope.patientLists.length; i++) {
         $scope.patientLists.push({ id: i, first_name: "name "+ i, last_name: "description " + i });
         }*/

        $scope.range = function () {
            var rangeSize = 5;
            var ret = [];
            var start;

            start = $scope.currentPage;
            if (start > $scope.pageCount() - rangeSize) {
                start = $scope.pageCount() - rangeSize + 1;
            }

            for (var i = start; i < start + rangeSize; i++) {
                ret.push(i);
            }
            return ret;
        };

        $scope.prevPage = function () {
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

        $scope.prevPageDisabled = function () {
            return $scope.currentPage === 0 ? "disabled" : "";
        };

        $scope.pageCount = function () {
            return Math.ceil($scope.numOfData / $scope.itemsPerPage) - 1;
        };

        $scope.nextPage = function () {
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

        $scope.nextPageDisabled = function () {
            return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
        };

        $scope.setPage = function (n) {
            $scope.currentPage = n;
        };

        $scope.findPatientBy = function () {
            $scope.f = $scope.search1;
            console.log($scope.search1)
        }

        $scope.CO = {};
        $scope.checkout = function (dataToBeAdded){
            $scope.message = false;
            $rootScope.loader = "show";
            CheckoutPatient.save({
                token: $window.sessionStorage.token, 
                patient_id: $scope.patientID,
                visit_id: $scope.displayInfo.encounter_id,
                reason: $('input:radio[name="checkoutpatient"]:checked').val(),
                notes: $('.checkout_patient_tab_con > div.active textarea').val() == undefined ? '' : $('.checkout_patient_tab_con > div.active textarea').val(),
                pick_date: dataToBeAdded.date,
                pick_time: dataToBeAdded.time,
                admit_date: dataToBeAdded.date,
                start_time: dataToBeAdded.time,
                //department_id: dataToBeAdded.ward,
                ward_id: dataToBeAdded.ward,
            }, checkoutSuccess, checkoutFailure);
        }

        function checkoutSuccess(res){
            if(res.status ==  true){
                console.log(res);
                $rootScope.loader = "hide";
                $scope.messageType = "alert-success";
                $scope.errorMessage = res.message;
                $scope.errorSymbol = "fa fa-check";// 
                $scope.message = true;
                setTimeout(function() {$('#simpleModal1').modal('hide');}, 1000);
                
            }
        }

        function checkoutFailure(error){
            console.log(error);
        }


    }]);