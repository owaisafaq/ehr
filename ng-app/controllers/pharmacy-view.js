var AppEHR = angular.module('AppEHR');

AppEHR.controller('pharmacyView', ['$scope', '$rootScope', 'PatienPrescription', '$window', 'GetAllPrescription', '$routeParams', 'PatienPrescriptionUpdate', function ($scope, $rootScope, PatienPrescription, $window, GetAllPrescription, $routeParams, PatienPrescriptionUpdate) {
        $rootScope.pageTitle = "EHR - Pharmacy VIew";
        $scope.PrescriptionView = [];
        $scope.medicationsDataPush = [];
        $scope.PrescriptionViewsCopy = [];
        $scope.medicationDropDowns = medicationDropDowns;
        $scope.pharmacyDataDropDown = pharmacyDataDropDown;
        $scope.MedicationData = {}
        $scope.Prescription = {}
        $scope.showUpdate = false;

        $scope.MedicationData = {}
        $scope.buildInstructionObject = buildInstructionObject;
        $scope.buildInstructions = {};
        GetAllPrescription.get({
            token: $window.sessionStorage.token,
            patient_id: 1
        }, prescriptionSuccess, prescriptionFailure);

        function prescriptionSuccess(res) {
            $scope.PrescriptionViews = res.data;
            console.log($scope.PrescriptionViews)
            $scope.Prescription.notes = res.notes;
        }
        function prescriptionFailure(res) {
            console.log(res)
        }
        $scope.updateDispense = function () {
            $('.editable_table .editDispensed').removeAttr('disabled')
        }
        $scope.updatePharmacy = function () {
            console.log($scope.PrescriptionViews)
            angular.copy($scope.PrescriptionViews, $scope.PrescriptionViewsCopy)
//            $scope.PrescriptionViews.token = $window.sessionStorage.token;
            //console.log($scope.prescriptionPharmacyNotes)
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
                patient_id: $routeParams.patientID,
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
            }
            var addPrescrptnPop = {
                patient_id: $routeParams.patientID,
                prescription: JSON.stringify($scope.medicationsDataPush),
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
                GetAllPrescription.get({
                    token: $window.sessionStorage.token,
                    patient_id: 1
                }, prescriptionSuccess, prescriptionFailure);
            }
        }
        function PrescriptionFailurePop(res) {
            console.log(res)
        }
        function PrescriptionSuccess(res) {
            console.log(res)
            if (res.status == true) {
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
        $scope.addSIG = function (sigData) {
            $scope.MedicationData.sig = sigData.dose + " " + sigData.unit + " " + sigData.route + " for " + sigData.frequency + " " + sigData.direction + " " + sigData.duration;
            console.log($scope.MedicationData.sig);
        }
    }]);
