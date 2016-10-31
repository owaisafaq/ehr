var AppEHR = angular.module('AppEHR');

AppEHR.controller('patientListingController', ['$scope', '$rootScope', 'GetAllPatients', '$window', '$routeParams', 'GetPatientInfo', 'CheckoutPatient', 'DeletePatient', 'Upload', '$timeout', 'ImportPatient', function ($scope, $rootScope, GetAllPatients, $window, $routeParams, GetPatientInfo, CheckoutPatient, DeletePatient, Upload, $timeout, ImportPatient) {
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
        $scope.disabledSearchBar = true;
        $scope.idCardDisabledBtn = true;
        GetAllPatients.get({
            token: $window.sessionStorage.token,
            offset: $scope.offset, limit: $scope.itemsPerPage
        }, GetAllPatientsSuccess, GetAllPatientsFailure);
        ImportPatient.save({token: $window.sessionStorage.token}, importSuccess, GetAllPatientsFailure);
        function importSuccess(res){
            console.log(res);
            if(res.status == true){
                $scope.importFileURL = res.data;
            }
        }
        $scope.curPage = 0;
        $scope.pageSize = 15;
        $scope.numberOfPages = function() {
            return Math.ceil($scope.patientCount / $scope.pageSize);
        };

        $scope.paginationNext = function(pageSize, curPage){
            $rootScope.loader = "show";
            if($scope.selectBox == true){
                GetAllPatients.get({
                    token: $window.sessionStorage.token,
                    offset: (pageSize * curPage), limit: $scope.selectBoxLimit
                }, GetAllPatientsSuccess, GetAllPatientsFailure);
            }else{
                GetAllPatients.get({
                    token: $window.sessionStorage.token,
                    offset: (pageSize * curPage), limit: $scope.itemsPerPage
                }, GetAllPatientsSuccess, GetAllPatientsFailure);
            }
        }

        $scope.paginationPrev = function(pageSize, curPage){
            $rootScope.loader = "show";
            if($scope.selectBox == true){
                GetAllPatients.get({
                    token: $window.sessionStorage.token,
                    offset: (pageSize - 1) * curPage, limit: $scope.selectBoxLimit
                }, GetAllPatientsSuccess, GetAllPatientsFailure);
            }else{
                GetAllPatients.get({
                    token: $window.sessionStorage.token,
                    offset: (pageSize - 1) * curPage, limit: $scope.itemsPerPage
                }, GetAllPatientsSuccess, GetAllPatientsFailure);
            }
        }
        $scope.samePage = '';
        $scope.goToPage = function(pageSize, num){
            $rootScope.loader = "show";
            GetAllPatients.get({
                token: $window.sessionStorage.token,
                offset: (pageSize * num), limit: $scope.itemsPerPage
            }, GetAllPatientsSuccess, GetAllPatientsFailure);
        }

        $scope.selectBoxValue = function(value){
            $scope.selectBox = true;
            $scope.pageSize = value;
            $scope.selectBoxLimit = value;
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
                if(res.data.length == 0){
                    $('#noRecordFound').modal('show');
                    return true;
                }
                //$('#internetError').modal('show');
                $scope.patientLists = [];
                $scope.patientLists = res.data;
                $scope.patientCount = res.count;
            }else if(res.error_code == 500){
                console.log(res);
                $rootScope.RolesAccess(res.message);
            }

        }

        function GetAllPatientsFailure(error) {
            $('#internetError').modal('show');
            console.log(error);
        }

        $scope.patientSelected = function (patientID) {
            $scope.patientID = patientID;
            $rootScope.loader = "show";
            GetPatientInfo.get({token: $window.sessionStorage.token, patient_id: patientID}, getPatientSuccess, getPatientFailure);
            function getPatientSuccess(res) {
                if (res.status == true) {
                    $scope.hideOptions = false;
                    $scope.idCardDisabledBtn = false;
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
                    $scope.PI.patient_image = res.data.patient_image;
                    $scope.displayInfo.barcode = res.data.barcode;
                    $scope.PI.displayImage = patientImageDirectory + res.data.patient_image;
                    if($scope.displayInfo.encounter_id == undefined || $scope.displayInfo.encounter_id == null){
                        $scope.ifEncounterID = true;
                    }
                    $scope.showIdCard = true;
                    $scope.hospital_plan = res.data.hospital_plan;
                    if($scope.hospital_plan == '1') $scope.hospital_plan = "card-color-1";
                    if($scope.hospital_plan == '2') $scope.hospital_plan = "card-color-2";
                    else $scope.hospital_plan = "card-color-3";
                    //$scope.showStrip = true;
                    //$scope.dataStrip = "custom-card";
                }
            }

            function getPatientFailure(error) {
                $rootScope.loader = "hide";
                $('#internetError').modal('show');
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
                $rootScope.loader = "hide";
                $scope.messageType = "alert-success";
                $scope.errorMessage = res.message;
                $scope.errorSymbol = "fa fa-check";// 
                $scope.message = true;
                setTimeout(function() {$('#simpleModal1').modal('hide');}, 1000);
            }else if(res.error_code == 500){
                $rootScope.RolesAccess(res.message);
            }

        }

        function checkoutFailure(error){
            $('#internetError').modal('show');
            console.log(error);
        }

        $scope.updatePatientButton = function(){
            $window.location.href = "#/patient-registration-update/" + $scope.patientID;
        }

        $scope.deletePatientButton = function(){
            $rootScope.loader = "show";
            DeletePatient.save({
                token: $window.sessionStorage.token,
                patient_id: $scope.patientID
            }, deletePatientSuccess, deletePatientFailure);

            function deletePatientSuccess(res){
                $rootScope.loader = "hide";
                console.log(res,' owais');
                if(res.status ==  true){
                    $scope.hideOptions = true;
                    $scope.patientInfo = false;
                    $('#deleteModal').modal('hide');
                    $scope.errorMessage = res.message;
                    $('#completedModal').modal('show');
                    setTimeout(function() {$('#completedModal').modal('hide');}, 2000);
                    GetAllPatients.get({
                        token: $window.sessionStorage.token,
                        offset: $scope.offset, limit: $scope.itemsPerPage
                    }, GetAllPatientsSuccess, GetAllPatientsFailure);
                }else if(res.error_code == 500){
                    $('#deleteModal').modal('hide');
                    $rootScope.RolesAccess(res.message);
                }
            }

            function deletePatientFailure(error){
                $rootScope.loader = "hide";
                $('#internetError').modal('show');
                console.log(error, 'error');
            }
        }

        $scope.addPatientButton = function(){
            $window.location.href = "#/patient-registration/";
        }

        $scope.findPatient = function(){
            $scope.disabledSearchBar = false;
        }

        $scope.exportPatient = function(){
            
        }

        $scope.uploadFiles = function (files, errFiles) {
            $scope.files = files;
            $scope.errFiles = errFiles;
            var i = 1;
            angular.forEach(files, function (file) {
                //console.log('dp1');
                $scope.imageUploading = false;
                $scope.patientImageProgress = true;
                file.upload = Upload.upload({
                    url: serverPath + "export_patients_data",
                    method: 'POST',
                    data: {patients_data: file}
                });

                file.upload.then(function (response) {
                    $scope.imageUploading = true;
                    $scope.patientImageProgress = false;
                    $timeout(function () {
                        file.result = response.data;
                        //console.log(response);
                        
                        //$scope.PI.imageOrignalName = response.data.name;
                        //$scope.PI.exportModal = response.data.image;
                        if(files.length == i){
                            $scope.saveAndClose = false;
                        }
                        i++;
                    });
                }, function (response) {
                    if (response.status > 0){
                        $scope.errorMsg = response.status + ': ' + response.data;
                    }else if(res.error_code == 500){
                        console.log(res);
                        $rootScope.RolesAccess(res.message);
                    }
                }, function (evt) {
                    $('#exportModal').modal('show');
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
                
            });
        }
}]);