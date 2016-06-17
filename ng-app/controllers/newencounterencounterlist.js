var AppEHR = angular.module('AppEHR');

AppEHR.controller('newEncounterEncounterListController', ['$scope', '$rootScope', '$routeParams', '$window', 'GetPatientInfo', 'GetAllEncounters', 'CheckOut', 'AddVitals', 'UpdateEncounter', 'DropDownData', '$timeout', 'GetOneEncounter', 'RemoveEncounter', function ($scope, $rootScope, $routeParams, $window, GetPatientInfo, GetAllEncounters, CheckOut, AddVitals, UpdateEncounter, DropDownData, $timeout, GetOneEncounter, RemoveEncounter) {
        $rootScope.pageTitle = "EHR - new Encounter Clinical Documentation Controller";
        $rootScope.loader = "show";
        $scope.allEncounter = [];
        $scope.displayInfo = {};
//        $scope.vital = {};
        //$scope.showStrip = false;
        $scope.buttonDisabled = false;
        $scope.PID = $routeParams.patientID;
        $scope.EID = $routeParams.encounterID;
        $scope.action = $scope.EID;
        $scope.updateEncounterPopUp = false;
        $scope.updateEncounter = {};
        $scope.hideLoader = 'hide';

        GetAllEncounters.get({token: $window.sessionStorage.token}, getPatientEncounters, getPatientEncountersFailure);
        GetPatientInfo.get({token: $window.sessionStorage.token, patient_id: $routeParams.patientID}, patientInfoSuccess, patientInfoFailure);

        function patientInfoSuccess(res) {
            if (res.status == true) {
                $scope.displayInfo.first_name = res.data.first_name;
                $scope.displayInfo.middle_name = res.data.middle_name;
                $scope.displayInfo.last_name = res.data.last_name;
                $scope.displayInfo.patient_id = res.data.id;
                $scope.displayInfo.age = res.data.age;
                $scope.displayInfo.sex = res.data.sex;
                $scope.displayInfo.marital_status = res.data.marital_status;
                //console.log($scope.allEncounter);
            }
        }

        function patientInfoFailure(error) {
            console.log(error);
        }

        function getPatientEncounters(res) {
            if (res.status == true) {
                $rootScope.loader = "hide";
                $scope.allEncounter = res.data;
                //console.log($scope.allEncounter);
            }
            DropDownData.get({token: $window.sessionStorage.token, patient_id: $window.sessionStorage.patient_id}, dropDownSuccess, dropDownFailed);
        }

        function dropDownSuccess(res) {
            if (res.status == true) {
                $scope.encountersDropdownData = res.data;
            }
        }

        function dropDownFailed(error) {
            console.log(error);
        }

        function getPatientEncountersFailure(error) {
            console.log(error);
        }

        $scope.encounterSelected = function (patientID, encounterID) {
            $scope.encounterID = encounterID;
            $rootScope.loader = "show";
            GetPatientInfo.get({token: $window.sessionStorage.token, patient_id: patientID}, getEncountersSuccess, getEncountersFailure);
            function getEncountersSuccess(res) {
                if (res.status == true) {
                    //console.log(res);
                    //$scope.buttonDisabled= true;
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

            function getEncountersFailure(error) {
                $rootScope.loader = "show";
                console.log(error);
            }
        }

        /*if($scope.action == true){
         console.log('here');
         }*/

        $scope.checkout = function (action) {
            $rootScope.loader = "show";
            CheckOut.save({token: $window.sessionStorage.token, status: 'checkout', visit_id: $scope.encounterID == undefined ? action : $scope.encounterID}, addVitalSuccess, addVitalFailure);
        }

        function addVitalSuccess(res) {
            console.log(res);
            if (res.status == true) {
                $rootScope.loader = "hide";
                GetAllEncounters.get({token: $window.sessionStorage.token}, getPatientEncounters, getPatientEncountersFailure);
            }
        }

        function addVitalFailure(error) {
            console.log(error);
        }

        $scope.valueByRadio = function (value) {
            console.log(value);
        }

        $scope.clinicalNote = function () {
            $window.location.href = '#/clinical-documentation-clinic-progress-note';
        }

        $scope.validateVitals = function (vital) {
            if (angular.equals({}, vital) == false) {
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

        function vitalSuccess(res) {
            console.log(res);
            if (res.status == true) {
                $rootScope.loader = "hide";
            }
        }

        function vitalFailure(error) {
            console.log(error);
        }

        $scope.updateEncounters = function () {
            console.log('here');
            $scope.message = false;
            var eid = $scope.encounterID == undefined ? $scope.EID : $scope.encounterID;
            console.log(eid);
            GetOneEncounter.get({token: $window.sessionStorage.token, visit_id: eid}, getOneEncounterSuccess, getOneEncounterFailure);
            $scope.updateEncounterPopUp = true;
        }

        function getOneEncounterSuccess(res) {
            console.log(res);
            if (res.status == true) {
                $scope.updateEncounter.department = res.data.department_id;
                $scope.updateEncounter.class = res.data.encounter_class;
                $scope.updateEncounter.type = res.data.encounter_type;
                $scope.updateEncounter.wts = res.data.whom_to_see;
            }
            setTimeout(function () {
                $('select').not('.select_searchFields,.search-ajax').select2({minimumResultsForSearch: Infinity});
            }, 100)
        }

        function getOneEncounterFailure(error) {
            console.log(error);
        }

        $scope.validateEncounterForm = function (updateData) {
            console.log(updateData);
            if (angular.equals({}, updateData) == false) {
                $scope.hideLoader = 'show';
                $scope.updateEncounterBtn = true;
                console.log($scope.displayInfo.patient_id);
                UpdateEncounter.save({
                    token: $window.sessionStorage.token,
                    patient_id: $scope.displayInfo.patient_id,
                    visit_id: $scope.encounterID == undefined ? $scope.EID : $scope.encounterID,
                    department_id: updateData.department,
                    encounter_class: updateData.class,
                    encounter_type: updateData.type,
                    whom_to_see: updateData.wts
                }, updateEncounterSuccess, updateEncounterFailure);
            }
        }

        function updateEncounterSuccess(res) {
            if (res.status == true) {
                $scope.hideLoader = 'hide';
                $scope.message = true;
                $scope.updateEncounterBtn = false;
                $scope.errorMessage = res.message;
                $scope.messageType = 'alert-success';
                $scope.errorSymbol = 'fa fa-check';
                $timeout(function () {
                    $scope.updateEncounterPopUp = false;
                }, 1500);
                GetAllEncounters.get({token: $window.sessionStorage.token}, getPatientEncounters, getPatientEncountersFailure);
            } else {
                $scope.hideLoader = "hide";
                $scope.updateEncounterBtn = false;
                $scope.message = true;
                $scope.messageType = "alert-danger";
                $scope.errorMessage = res.message;
                $scope.errorSymbol = "fa fa-times";
                $timeout(function () {
                    $scope.message = false;
                }, 2000);
            }
        }

        function updateEncounterFailure(error) {
            console.log(error);
        }

        $scope.closeupdateEncounter = function () {
            $scope.updateEncounterPopUp = false;
        }

        $scope.removeEncounter = function () {
            var dltID = $scope.encounterID == undefined ? $scope.EID : $scope.encounterID;
            console.log(dltID);
            $rootScope.loader = "show";
            RemoveEncounter.get({token: $window.sessionStorage.token, visit_id: dltID}, encounterDeleteSuccess, encounterDeletefailure);
        }

        function encounterDeleteSuccess(res) {
            console.log(res);
            if (res.status == true) {
                GetAllEncounters.get({token: $window.sessionStorage.token}, getPatientEncounters, getPatientEncountersFailure);
                $rootScope.loader = "hide";
            } else {
                $rootScope.loader = "hide";
            }
        }

        function encounterDeletefailure(error) {
            console.log(error);
            $rootScope.loader = "hide";
        }

    }]);