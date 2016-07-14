var AppEHR = angular.module('AppEHR');

AppEHR.controller('pharmacyView', ['$scope', '$rootScope', 'PatienPrescription', '$window', 'GetPrescription', '$routeParams', 'PatienPrescriptionUpdate', 'GetPatientInfo', function ($scope, $rootScope, PatienPrescription, $window, GetPrescription, $routeParams, PatienPrescriptionUpdate, GetPatientInfo) {
        $rootScope.pageTitle = "EHR - Pharmacy VIew";
        $scope.PrescriptionView = [];
        $scope.medicationsDataPush = [];
        $scope.PrescriptionViewsCopy = [];
        $scope.medicationDropDowns = medicationDropDowns;
        $scope.pharmacyDataDropDown = pharmacyDataDropDown;
        $scope.MedicationData = {}
        $scope.Prescription = {}
        $scope.showUpdate = false;
        $scope.prescriptionID = $routeParams.prescriptionID;

        $scope.MedicationData = {}
        $scope.buildInstructionObject = buildInstructionObject;
        $scope.buildInstructions = {};
        $rootScope.loader = 'show';
        $scope.encounterID = $routeParams.encounterID;
        $scope.patientID = $routeParams.patientID;
        $scope.displayInfo = {};
        console.log($scope.prescriptionID);
        GetPrescription.get({
            token: $window.sessionStorage.token,
            precription_id: $scope.prescriptionID
        }, prescriptionSuccess, prescriptionFailure);

        function prescriptionSuccess(res) {
            if(res.status == true){
                console.log(res);
                $scope.PrescriptionViews = res.data;
                $scope.Prescription.notes = res.notes;
                $rootScope.loader = 'hide';
            }
        }
        function prescriptionFailure(res) {
            console.log(res)
        }

        GetPatientInfo.get({token: $window.sessionStorage.token, patient_id: $routeParams.patientID}, patientInfoSuccess, patientInfoFailure);

        function patientInfoSuccess(res) {
            if (res.status == true) {
                $scope.buttonDisabled = true;
                $scope.displayInfo.first_name = res.data.first_name;
                $scope.displayInfo.middle_name = res.data.middle_name;
                $scope.displayInfo.last_name = res.data.last_name;
                $scope.displayInfo.patient_id = res.data.id;
                $scope.displayInfo.age = res.data.age;
                $scope.displayInfo.sex = res.data.sex;
                $scope.displayInfo.marital_status = res.data.marital_status;
                $scope.patientInfo = true;
            }
        }

        function patientInfoFailure(error) {
            console.log(error);
        }

        $scope.updateDispense = function () {
            $('.editable_table .editDispensed').removeAttr('disabled')
        }
        $scope.updatePharmacy = function () {
            console.log($scope.PrescriptionViews)
            $rootScope.loader = "show";
            angular.copy($scope.PrescriptionViews, $scope.PrescriptionViewsCopy)
                // $scope.PrescriptionViews.token = $window.sessionStorage.token;
                // console.log($scope.prescriptionPharmacyNotes)
            for (var i = 0; i < $scope.PrescriptionViews.length; i++) {
                $scope.PrescriptionViewsCopy[i].note_of_pharmacy = $scope.prescriptionPharmacyNotes;
                $scope.PrescriptionViewsCopy[i].cost = $scope.PrescriptionViews[i].cost * $scope.PrescriptionViews[i].total_dispensed;
                delete $scope.PrescriptionViewsCopy[i].patient_id;
                delete $scope.PrescriptionViewsCopy[i].created_at;
                delete $scope.PrescriptionViewsCopy[i].notes;
                delete $scope.PrescriptionViewsCopy[i].total_dispensed;
                delete $scope.PrescriptionViewsCopy[i].balance;
                delete $scope.PrescriptionViewsCopy[i].cost;
            }

            var addPrescrptn = {
                patient_id: $scope.patientID,
                precription_id: $scope.prescriptionID,
                prescription: JSON.stringify($scope.PrescriptionViewsCopy),
                token: $window.sessionStorage.token,
                visit_id: $routeParams.encounterID
            }
            //console.log($scope.PrescriptionViews)
                //            $scope.PrescriptionViews.notes = $scope.PrescriptionViews.prescriptionPharmacyNotes == undefined ? '' : $scope.PrescriptionViews.prescriptionPharmacyNotes;
            console.log(addPrescrptn)
            PatienPrescriptionUpdate.save(addPrescrptn, PrescriptionSuccess, PrescriptionFailure)
        }

        $scope.calculateBalance = function (dispense, totalDispense, index) {
            if (totalDispense != undefined) {
                $scope.PrescriptionViews[index].balance = parseInt(dispense) + parseInt(totalDispense);
            }
            if (totalDispense == '') {
                $scope.PrescriptionViews[index].balance = '';
            }
        }
        $scope.addMedication = function (checkEdit) {
            var AddMedications = {
                medication: $scope.MedicationData.medication,
                sig: $scope.MedicationData.sig,
                dispense: $scope.MedicationData.dispense,
                reffills: $scope.MedicationData.reffills,
                pharmacy: $scope.MedicationData.pharmacy,
                note_of_pharmacy: $scope.MedicationData.note_of_pharmacy,
            }
            $scope.note = $scope.MedicationData.note_of_pharmacy;
            if (angular.equals({}, AddMedications) == false) {
                $scope.medicationsDataPush.push(AddMedications);
                $scope.MedicationData.sig = "";
                $scope.MedicationData.dispense = "";
                $scope.MedicationData.reffills = "";
                $scope.MedicationData.note_of_pharmacy = "";
                $scope.MedicationData.medication = "";
                $scope.MedicationData.pharmacy = "";
                $("#addmedication select").select2("val", "");
                if (checkEdit == 1) {
                    $scope.showUpdate = false;
                }
            }
        }
        $scope.editMedication = function (index) {
            $scope.MedicationData = $scope.medicationsDataPush[index];
            setTimeout(function () {
                $('#addmedication select').trigger('change');
            }, 100)
            $scope.medicationsDataPush.splice(index, 1);
            console.log($scope.medicationsDataPush)
            $scope.showUpdate = true;
        }
        $scope.savePharmacyPopUp = function () {
            for (var i = 0; i < $scope.medicationsDataPush.length; i++) {
                delete $scope.medicationsDataPush[i].$$hashKey
                delete $scope.medicationsDataPush[i].note_of_pharmacy
            }
            var addPrescrptnPop = {
                patient_id: $scope.patientID,
                prescription: JSON.stringify($scope.medicationsDataPush),
                note_for_pharmacy: $scope.note,
                token: $window.sessionStorage.token,
                visit_id: $routeParams.encounterID
            }
            console.log(addPrescrptnPop)
            PatienPrescription.save(addPrescrptnPop, PrescriptionSuccessPop, PrescriptionFailurePop)
        }
        function PrescriptionSuccessPop(res) {
            console.log(res)
            if (res.status == true) {
                $('#addmedication').modal('hide');
                $scope.medicationsDataPush = [];
                GetPrescription.get({
                    token: $window.sessionStorage.token,
                    patient_id: $routeParams.patientID
                }, prescriptionSuccess, prescriptionFailure);
            }
        }
        function PrescriptionFailurePop(res) {
            console.log(res)
        }
        function PrescriptionSuccess(res) {
            console.log(res)
            if (res.status == true) {
                $rootScope.loader = "hide";
                $('.editable_table .editDispensed').attr('disabled', 'disabled');
            }
        }
        function PrescriptionFailure(res) {
            console.log(res)
        }

        function MedicationSuccess(res) {
            if (res.status == true) {

            }
        }
        function MedicationFailure(res) {
            console.log(res)
        }
        /*$scope.addSIG = function (sigData) {
            $scope.MedicationData.sig = sigData.dose + " " + sigData.unit + " " + sigData.route + " for " + sigData.frequency + " " + sigData.direction + " " + sigData.duration;
            console.log($scope.MedicationData.sig);
        }*/
        $scope.addSIG = function (sigData) {
            if(sigData != undefined){
                $scope.MedicationData.sig = sigData.dose == undefined ? '' : sigData.dose + " ";
                $scope.MedicationData.sig += sigData.unit == undefined ? '' : sigData.unit + " ";
                $scope.MedicationData.sig += sigData.route == undefined ? '' : sigData.route;
                $scope.MedicationData.sig += sigData.frequency == undefined ? '' : " for " + sigData.frequency + " ";
                $scope.MedicationData.sig += sigData.direction == undefined ? '' : sigData.direction + " ";
                $scope.MedicationData.sig += sigData.duration == undefined ? '' : sigData.duration;
            }
        }
    }]);
