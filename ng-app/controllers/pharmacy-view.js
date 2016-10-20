var AppEHR = angular.module('AppEHR');

AppEHR.controller('pharmacyView', ['$scope', '$rootScope', 'PatienPrescription', '$window', 'GetPrescription', '$routeParams', 'PatienPrescriptionUpdate', 'GetPatientInfo', 'GetAllMedications', 'DropDownData', 'DeleteMedication', 'AddMedicationInPrescription', 'GetMedicineUnits', 'CheckoutPatient', "GetPrescriptionSupplements", "GetMedications", 'PrescriptionPDF', 'DespensePharmacy', 'QueryMedication', 'DropDownData', 'PharmacyPrescription', function ($scope, $rootScope, PatienPrescription, $window, GetPrescription, $routeParams, PatienPrescriptionUpdate, GetPatientInfo, GetAllMedications, DropDownData, DeleteMedication, AddMedicationInPrescription, GetMedicineUnits, CheckoutPatient, GetPrescriptionSupplements, GetMedications, PrescriptionPDF, DespensePharmacy, QueryMedication, DropDownData, PharmacyPrescription) {
        $rootScope.pageTitle = "EHR - Pharmacy VIew";
        $scope.PrescriptionView = [];
        $scope.medicationsDataPush = [];
        $scope.PrescriptionViewsCopy = [];
        //$scope.medicationDropDowns = medicationDropDowns;
        //$scope.pharmacyDataDropDown = pharmacyDataDropDown;
        $scope.MedicationData = {};
        $scope.Prescription = {};
        $scope.showUpdate = false;
        $scope.prescriptionID = $routeParams.prescriptionID;
        $scope.pharmacyID = $routeParams.pharmacyID;
        $scope.PrescriptionViews = [];
        $scope.AddButtonOnAddMedication = false;

        $scope.MedicationData = {}
        //$scope.buildInstructionObject = buildInstructionObject;
        $scope.buildInstructions = {};
        $rootScope.loader = 'show';
        $scope.dispensePharmacyButton = true;
        
        $scope.patientID = $routeParams.patientID;
        $scope.displayInfo = {};
        $scope.removePrescription = false;
        $scope.medicineUnits = [];
        GetPrescription.get({
            token: $window.sessionStorage.token,
            precription_id: $scope.prescriptionID
        }, prescriptionSuccess, prescriptionFailure);

        function prescriptionSuccess(res) {
            if(res.status == true){
                console.log("all");
                console.log(res);
                $scope.patient_id = res.data.patient_id;
                $scope.PrescriptionViews = res.data;
                $scope.Prescription.notes = res.notes;
                $scope.pharmacyNameID = res.pharmacy_name;
                $scope.pharmacyID = res.pharmacy_id;
                $scope.prescription_data = res.prescription_data;
                $scope.prescription_data.date = res.prescription_data.date;
                $scope.prescription_data.date = $scope.prescription_data.date.split(' ');
                $scope.encounterID = $scope.prescription_data.visit_id;
                $rootScope.loader = 'hide';
                $scope.costArray = [];
                console.log($scope.PrescriptionViews[0]);
                for(var i = 0; $scope.PrescriptionViews.length > i ; i++){
                    $scope.costArray[i] = parseInt($scope.PrescriptionViews[i].dispense) * parseInt($scope.PrescriptionViews[i].total_amount);
                    console.log($scope.costArray[i], $scope.PrescriptionViews[i].dispense, $scope.PrescriptionViews[i].total_amount);
                }
            }
        }
        function prescriptionFailure(res) {
            $('#internetError').modal('show');
            console.log(res)
        }

        GetMedicineUnits.get({token: $window.sessionStorage.token}, getMedicineSuccess, getMedicineFailure);

        function getMedicineSuccess(res) {
            if(res.status == true){
                $scope.medicineUnits = res.data;
            }
        }
        function getMedicineFailure(res) {
            $('#internetError').modal('show');
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
                $scope.EID = res.data.encounter_id;
                $scope.patientInfo = true;
            }
        }

        function patientInfoFailure(error) {
            $('#internetError').modal('show');
            console.log(error);
        }

        $scope.updateDispense = function () {
            $('.editable_table .editDispensed').removeAttr('disabled')
        }
        $scope.updatePharmacy = function () {
            $rootScope.loader = "show";
            console.log($scope.PrescriptionViews);
            angular.copy($scope.PrescriptionViews, $scope.PrescriptionViewsCopy)
                // $scope.PrescriptionViews.token = $window.sessionStorage.token;
                // console.log($scope.prescriptionPharmacyNotes)
            for (var i = 0; i < $scope.PrescriptionViews.length; i++) {
                $scope.PrescriptionViewsCopy[i].note_of_pharmacy = $scope.prescriptionPharmacyNotes;
                $scope.PrescriptionViewsCopy[i].cost = $scope.PrescriptionViews[i].cost * $scope.PrescriptionViews[i].total_dispensed;
                $scope.PrescriptionViewsCopy[i].pharmacy_id = $scope.pharmacyID;
                //$scope.PrescriptionViewsCopy[i].pharmacy = $scope.pharmacyID;
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
                note_for_pharmacy: $scope.Prescription.notes,
                visit_id: $scope.encounterID
            }
            console.log($scope.PrescriptionViewsCopy)
                //            $scope.PrescriptionViews.notes = $scope.PrescriptionViews.prescriptionPharmacyNotes == undefined ? '' : $scope.PrescriptionViews.prescriptionPharmacyNotes;
            console.log(addPrescrptn)
            //PatienPrescriptionUpdate.save(addPrescrptn, PrescriptionSuccess, PrescriptionFailure)
        }

        $scope.calculateBalance = function (dispense, totalDispense, index, costarray) {
            if (totalDispense != undefined) {
                $scope.PrescriptionViews[index].costArray = parseInt(dispense) + parseInt(totalDispense);
            }
            if (totalDispense == '') {
                $scope.PrescriptionViews[index].costArray = '';
            }
        }
        $scope.addMedication = function (checkEdit) {
            var AddMedications = {
                medicationName: $('.getMedicineName option:selected').text(),
                pharmacyName:  $scope.pharmacyNameID,
                medication: $scope.MedicationData.medication,
                sig: $scope.MedicationData.sig,
                dispense: $scope.MedicationData.dispense,
                reffills: $scope.MedicationData.reffills,
                pharmacy: $scope.pharmacyID,
                note_of_pharmacy: $scope.MedicationData.note_of_pharmacy,
            }
            //$scope.AddButtonOnAddMedication = true;
            console.log(AddMedications); //return true;
            $scope.note = $scope.MedicationData.note_of_pharmacy;
            if(AddMedications.medication != undefined && AddMedications.medication != '' && AddMedications.sig != undefined && AddMedications.sig != '' && AddMedications.dispense != undefined && AddMedications.dispense != '' && AddMedications.reffills != undefined && AddMedications.reffills != '' && AddMedications.pharmacy != '' /*&& AddMedications.note_of_pharmacy != undefined && AddMedications.note_of_pharmacy != ''*/){
                //if (angular.equals({}, AddMedications) == false) {
                    console.log('IN');
                    $scope.medicationsDataPush.push(AddMedications);
                    $scope.MedicationData.sig = "";
                    $scope.MedicationData.dispense = "";
                    $scope.MedicationData.reffills = "";
                    $scope.MedicationData.note_of_pharmacy = "";
                    $scope.MedicationData.medication = "";
                    //$scope.MedicationData.pharmacy = "";
                    $("#addmedication select").select2("val", "");
                    if (checkEdit == 1) {
                        $scope.showUpdate = false;
                    }
                //}
            }
        }
        $scope.editMedication = function (index) {
            $scope.MedicationData = $scope.medicationsDataPush[index];
            setTimeout(function () {
                $('#addmedication select').trigger('change');
            }, 100)
            $scope.pharmacyNameID = 
            $scope.medicationsDataPush.splice(index, 1);
            console.log($scope.medicationsDataPush);
            $scope.showUpdate = true;
        }
        $scope.savePharmacyPopUp = function () {
            $rootScope.loader = "show";
            for (var i = 0; i < $scope.medicationsDataPush.length; i++) {
                delete $scope.medicationsDataPush[i].$$hashKey
                delete $scope.medicationsDataPush[i].note_of_pharmacy
            }
            var addPrescrptnPop = {
                patient_id: $scope.patientID,
                prescription: JSON.stringify($scope.medicationsDataPush),
                //note_for_pharmacy: $scope.note,
                token: $window.sessionStorage.token,
                prescription_id: $scope.prescriptionID
            }
            console.log(addPrescrptnPop);
            AddMedicationInPrescription.save(addPrescrptnPop, PrescriptionSuccessPop, PrescriptionFailurePop)
        }

        function PrescriptionSuccessPop(res) {
            console.log(res, "popup response")
            if (res.status == true) {
                $('#addmedication').modal('hide');
                $scope.medicationsDataPush = [];
                GetPrescription.get({
                    token: $window.sessionStorage.token,
                    precription_id: $scope.prescriptionID
                }, prescriptionSuccess, prescriptionFailure);
            }
        }
        function PrescriptionFailurePop(res) {
            console.log("res");
            console.log(res);
            $('#internetError').modal('show');
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
            $('#internetError').modal('show');
        }

        function MedicationSuccess(res) {
            if (res.status == true) {

            }
        }
        function MedicationFailure(res) {
            console.log(res)
            $('#internetError').modal('show');
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

        GetAllMedications.get({
            token: $window.sessionStorage.token,
            patient_id: $scope.patientID
        }, getAllMedicationsSuccess, getAllMedicationsFailure);
        $scope.allMedications = [];
        $scope.allPharmacies = [];
        function getAllMedicationsSuccess(res){
            console.log(11112);
            console.log(res);
            if(res.status == true){
                $scope.allMedications = res.data;
            }
        }
        function getAllMedicationsFailure(error){
            console.log(error);
            $('#internetError').modal('show');
        }

        DropDownData.get({
            token: $window.sessionStorage.token
        }, getpharmacySuccess, getPharmacyFailure);

        function getpharmacySuccess(res){
            if(res.status == true){
                console.log(1);
                console.log(res);
                $scope.allPharmacies = res.data.pharmacy;
            }
        }

        function getPharmacyFailure(error){
            console.log(error);
            $('#internetError').modal('show');
        }

        $scope.selectedMedication = function(id, index){
            $scope.medicationID = id;
            $scope.removePrescription = true;
            $scope.presQueries.encounter = $scope.PrescriptionViews[index].visit_id;
            $scope.presQueries.prescriptionID = $scope.PrescriptionViews[index].prescription_id;
            //$scope.presQueries.doctor = $scope.PrescriptionViews[index].visit_id;
            console.log(id, $scope.presQueries);
            $scope.dispensePharmacyButton = false;
        }

        $scope.removePrescriptions = function(){
            $rootScope.loader = "show";
            DeleteMedication.get({
                token: $window.sessionStorage.token,
                prescribe_medication_id: $scope.medicationID
            }, deleteMedicationSuccess, deleteMedicationFailure);

            function deleteMedicationSuccess(res){
                if(res.status == true){
                    $scope.removePrescription = false;
                    $rootScope.loader = "hide";
                    console.log(res);
                    GetPrescription.get({
                        token: $window.sessionStorage.token,
                        precription_id: $scope.prescriptionID
                    }, prescriptionSuccess, prescriptionFailure);
                }
            }
            function deleteMedicationFailure(error){
                console.log(error);
                $('#internetError').modal('show');
            }
        }

        $scope.printprescription = function(){
            window.print();
        }

        $scope.CO = {};
        $scope.checkout = function (dataToBeAdded){
            $scope.message = false;
            $rootScope.loader = "show";
            CheckoutPatient.save({
                token: $window.sessionStorage.token, 
                patient_id: $scope.patientID,
                visit_id: $scope.EID,
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
            $('#internetError').modal('show');
        }
        GetPrescriptionSupplements.save({token: $window.sessionStorage.token}, getSupplementSuccess, getSupplementFailure);
        function getSupplementSuccess(res) {
            console.log(res, "supp")
           $scope.getSupp = res.data;
        }
        function getSupplementFailure(res) {
            console.log(res);
            $('#internetError').modal('show');
        }
        GetMedications.save({token: $window.sessionStorage.token}, getMediSuccess, getMediFailure);
        function getMediSuccess(res) {
            console.log(res, "drugs")
           $scope.getDrugs = res.data;
        }
        function getMediFailure(res) {
            console.log(res);
            $('#internetError').modal('show');
        }

            PrescriptionPDF.get({token: $window.sessionStorage.token, prescription_id: $scope.prescriptionID}, presSuccess, pressFailure);

        function presSuccess(res){
            if(res.status == true){
                console.log(res, 'lll');
                $('.showPdf').html("<iframe class='abc' src="+res.data+"></iframe>");
            }
        }
        function pressFailure(){
            
        }

        $scope.despensePharmacyFUn = function(){
            DespensePharmacy.save({token: $window.sessionStorage.token, prescribe_medication_id: $scope.medicationID}, despensePharmacySuccess, getMediFailure);
        }

        function despensePharmacySuccess(res){
            $scope.dispensePharmacyButton = true;
            if(res.status == true){
                console.log(res);
                GetPrescription.get({
                    token: $window.sessionStorage.token,
                    precription_id: $scope.prescriptionID
                }, prescriptionSuccess, prescriptionFailure);
            }
        }
        $scope.dropDownData = [];

        DropDownData.get({token: $window.sessionStorage.token}, dropDownSuccess, dropDownFailed);

        function dropDownSuccess(res) {
            console.log("drodowndata", res);
            if (res.status == true) {
                angular.copy(res.data, $scope.dropDownData);
                /*$.each($scope.dropDownData.relationships, function(key, value) {
                    console.log('autoship_optionKinRelation');
                  $('#autoship_optionKinRelation').append($("<option></option>").attr("value",value.id).text(value.name));
                });*/
            }
        }

        function dropDownFailed(error) {
            console.log(error);
        }

        $scope.presQuery = function(dataToBeAdded){
            if(dataToBeAdded.doctor != undefined && dataToBeAdded.observation != undefined){
                $rootScope.loader = "show";
                QueryMedication.save({token: $window.sessionStorage.token, prescribe_medication_id: $scope.medicationID, doctor: dataToBeAdded.doctor, observation: dataToBeAdded.observation}, presQuerySuccess, getMediFailure);
            }
        }
        $scope.presQueries = {};
        function presQuerySuccess(res){
            $scope.dispensePharmacyButton = true;
            $rootScope.loader = "hide";
            if(res.status == true){
                $('#prescription-query').modal('hide');
                $('#querySuccess').modal('show');
                GetPrescription.get({
                    token: $window.sessionStorage.token,
                    precription_id: $scope.prescriptionID
                }, prescriptionSuccess, prescriptionFailure);
            }
        }

        PharmacyPrescription.get({token: $window.sessionStorage.token, limit:10, offset:0}, pharmacyNameSuccess, getMediFailure);
        function pharmacyNameSuccess(res){
            //console.log(res.data[0].pharmacy, 'odasdsao');
            if(res.status == true){
                $scope.pharmacyName = res.data[0].pharmacy
            }
        }

}]);
