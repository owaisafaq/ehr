var AppEHR = angular.module('AppEHR');

AppEHR.controller('pharmacyView', ['$scope', '$rootScope', 'PatienPrescription', '$window', 'GetAllPrescription', function ($scope, $rootScope, PatienPrescription, $window, GetAllPrescription) {
        $rootScope.pageTitle = "EHR - Pharmacy VIew";
        $scope.PrescriptionView = [];
        $scope.medicationsDataPush = [];
        $scope.Prescription = {}
        GetAllPrescription.get({
            token: $window.sessionStorage.token,
            patient_id: 1
        }, prescriptionSuccess, prescriptionFailure);

        function prescriptionSuccess(res) {
            $scope.PrescriptionViews = res.data;
            console.log(res)
            $scope.Prescription.notes = res.notes;
        }
        function prescriptionFailure() {
            console.log(res)
        }
        $scope.updateDispense = function () {
            $('.editable_table .editDispensed').removeAttr('disabled')
        }
        $scope.savePharmacy = function () {
            console.log($scope.PrescriptionViews)
            $scope.PrescriptionViews.token = $window.sessionStorage.token;
            $scope.PrescriptionViews.notes = $scope.PrescriptionViews.prescriptionPharmacyNotes == undefined ? '' : $scope.PrescriptionViews.prescriptionPharmacyNotes;
            console.log($scope.PrescriptionViews)
            PatienPrescription.save($scope.PrescriptionViews, PrescriptionSuccess, PrescriptionFailure)
        }
        $scope.calculateBalance = function (dispense, totalDispense, index) {
            console.log(totalDispense)
            if (totalDispense != undefined) {
                $scope.PrescriptionViews[index].balance = parseInt(dispense) + parseInt(totalDispense);
            }
            if (totalDispense == '') {
                $scope.PrescriptionViews[index].balance = '';
            }
        }
        $scope.addMedication = function (MedicationData) {
            $scope.AddMedication = {
                medication: MedicationData.medicationDropDown,
                sig: MedicationData.sig,
                dispense: MedicationData.dispense,
                refills: MedicationData.refills,
                pharmacy: MedicationData.pharmacy,
                note_of_pharmacy: MedicationData.pharmacyNote,
                token: $window.sessionStorage.token,
                patient_id: $window.sessionStorage.patient_id,
            }
            $scope.medicationsDataPush.push($scope.AddMedication);
            console.log($scope.medicationsDataPush)
            $scope.MedicationData.sig = "";
            $scope.MedicationData.dispense = "";
            $scope.MedicationData.refills = "";
            $scope.MedicationData.pharmacyNote = "";
            $("#addmedication select").select2("val", "");
            //PatienPrescription.save($scope.medicationsDataPush, MedicationSuccess, MedicationFailure)
        }
        function PrescriptionSuccess(res) {
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
    }]);