var AppEHR = angular.module('AppEHR');

AppEHR.controller('newEncounterPatientSearchController', ['$scope', '$rootScope', '$window', 'AddEncounter', '$timeout', 'GetVisits', '$rootScope', 'GetPatientInfo', 'DropDownData', '$http', 'GetAllPatients', 'GetLabTests', 'addOrder', 'GetAllLabOrders', 'CheckoutPatient', 'GetAllEncounters', 'AddAppointments', 'GetOneEncounter', 'RemoveEncounter', 'UpdateEncounter', 'AddVitals', 'GetAllWardsDropDown', 'GetBedsByWard', 'UpdateVisitRoom', function($scope, $rootScope, $window, AddEncounter, $timeout, GetVisits, $rootScope, GetPatientInfo, DropDownData, $http, GetAllPatients, GetLabTests, addOrder, GetAllLabOrders, CheckoutPatient, GetAllEncounters, AddAppointments, GetOneEncounter, RemoveEncounter, UpdateEncounter, AddVitals, GetAllWardsDropDown, GetBedsByWard, UpdateVisitRoom){
	$rootScope.loader = "show";
	$rootScope.pageTitle = "EHR - New Encounter Patient Search";
	$scope.addEncounter = {};
	$scope.allEncounters = [];
	$scope.displayInfo = {};
	$scope.closePopUp = true;
	$scope.patientInfo = false;
	$scope.hideLoader = "hide";
	$scope.disabledEncounterButton = true;
	$scope.buttonDisabled = true;
	$scope.itemsPerPage = 15;
	$scope.allEncounter = [];
	$scope.appointment = {};
	$scope.priorities = priorities;
	$scope.reason = reason;
	$scope.PatientSearch = serverPath;
	$scope.updateEncounter = {};
	$scope.updateAssignRoom = {};
	//$rootScope.loader = "show";
	//GetVisits.get({token: $window.sessionStorage.token, patient_id: $window.sessionStorage.patient_id}, getVisitsSuccess, getVisitsFailed);
	DropDownData.get({token: $window.sessionStorage.token, patient_id: $window.sessionStorage.patient_id}, dropDownSuccess, dropDownFailed);

	function dropDownSuccess(res){
		if(res.status == true){
			$scope.encountersDropdownData = res.data;
			console.log(res);
		}
	}

	function dropDownFailed(error){
		$('#internetError').modal('show');
		console.log(error);
	}
	$scope.Order = {};
	// on change
	$scope.getSearchPatient = function(string){
		console.log(string);
		//$scope.buttonDisabled = true;
		$scope.gotoencounter = true;
		$scope.action = /*string ||*/ "";
		$scope.PID = string;
		$scope.Order.patient_id = string;
		setTimeout(function () {
            $('select').not('.search-ajax').select2({minimumResultsForSearch: Infinity});
        }, 2000)
		
		$rootScope.loader = "show";
		
		GetPatientInfo.get({token: $window.sessionStorage.token, patient_id: string}, getPatientSuccess, getPatientFailure);
		function getPatientSuccess(res){
			if(res.status == true){
				$scope.action = string// "";
				console.log(1, $scope.allEncounter);
				//console.log(res);
				$scope.disabledEncounterButton = false;
				$scope.patientInfo = true;
				$rootScope.loader = "hide";
				$scope.displayInfo.first_name = res.data.first_name;
				$scope.displayInfo.last_name = res.data.last_name;
				$scope.displayInfo.patient_id = res.data.id;
				$scope.displayInfo.age = res.data.age;
				$scope.displayInfo.sex = res.data.sex;
				$scope.displayInfo.marital_status = res.data.marital_status;
				$scope.EID = res.data.encounter_id;
				$scope.PIDwithName = string + " " + $scope.displayInfo.first_name + " " + $scope.displayInfo.last_name;
				for(var k=0; k < $scope.allEncounter.length; k++){
					if($scope.EID == $scope.allEncounter[k].id){
						$scope.buttonDisabled = true;
						$scope.action = $scope.allEncounter[k].id;
                        console.log($scope.allEncounter[k].id, $scope.EID, "mm");
						//console.log($scope.allEncounter[k], $scope.EID);
					}else if(res.is_visit == 0){
						$scope.action = '';
					}
				}
				$scope.visitStatus = res.is_visit;
				$scope.hospital_plan = res.data.hospital_plan;
				if($scope.hospital_plan == '1') $scope.hospital_plan = "card-color-1";
                if($scope.hospital_plan == '2') $scope.hospital_plan = "card-color-2";
                else $scope.hospital_plan = "card-color-3";
			}
		}

		function getPatientFailure(error){
			$('#internetError').modal('show');
			console.log(error);
		}
	}
	/*$scope.gridOptions = {
        paginationPageSizes: [20, 50, 75],
        paginationPageSize: 20,
        enableVerticalScrollbar: 0,
        enableHorizontalScrollbar: 0,
        columnDefs: $scope.columns,
        enableColumnMenus: false,
    };*/
    /*$scope.gridOptions = {
	    enableFiltering: false,
	    onRegisterApi: function(gridApi){
	      $scope.gridApi = gridApi;
	      $scope.gridApi.grid.registerRowsProcessor( $scope.singleFilter, 200 );
	    },columnDefs: [
		    { field: 'PATIENT ID' },
		    { field: 'FULL NAME'}
		]
	};*/

    $scope.filter = function() {
	    $scope.gridApi.grid.refresh();
	};
	function getVisitsSuccess(res){
		if(res.status == true){
			$scope.allEncounters = res.data;
			$rootScope.loader = "hide";
		}
	}

	function getVisitsFailed(error){
		console.log(error);
	}

	$scope.encounterSelected = function(index){
		$scope.redirectPID = $scope.allEncounters[index].id;
		$rootScope.loader = "show";
		GetPatientInfo.get({token: $window.sessionStorage.token, patient_id: $scope.allEncounters[index].id}, getPatientSuccess, getPatientFailure);
		$scope.displayInfo = $scope.allEncounters[index];
		$scope.dataStrip = "custom-card";
	}

	$scope.encounterSelectedByRadio = function (patientID, encounterID) {
        $scope.encounterID = encounterID;
        $scope.EID = encounterID;
        $rootScope.loader = "show";
        $scope.PID = patientID;

        $scope.createOrderPatientID = patientID;
        GetPatientInfo.get({token: $window.sessionStorage.token, patient_id: patientID}, getEncountersSuccess, getEncountersFailure);
        function getEncountersSuccess(res) {
            if (res.status == true) {
                $scope.buttonDisabled = false;
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
                $scope.hospital_plan = res.data.hospital_plan;
                $scope.visitStatus = res.is_visit;
                $scope.PIDwithName = patientID + " " + $scope.displayInfo.first_name + " " + $scope.displayInfo.last_name;
                if($scope.hospital_plan == '1') $scope.hospital_plan = "card-color-1";
                if($scope.hospital_plan == '2') $scope.hospital_plan = "card-color-2";
                else $scope.hospital_plan = "card-color-3";
                //$scope.showStrip = true;
                //$scope.dataStrip = "custom-card";
            }
        }

        function getEncountersFailure(error) {
            $rootScope.loader = "hide";
            $('#internetError').modal('show');
            console.log(error);
        }
    }

	/*function getPatientSuccess(res){
		$scope.patientInfo = true;
		$rootScope.loader = "hide";
		if(res.status == true){
			$scope.displayInfo.first_name = res.data.first_name;
			$scope.displayInfo.patient_id = res.data.id;
			$scope.displayInfo.age = res.data.age;
			$scope.displayInfo.gender = res.data.sex;
			$scope.displayInfo.marital_status = res.data.marital_status;
		}
	}*/

	function getPatientFailure(error){
		$('#internetError').modal('show');
		console.log(error);
	}

	$scope.openCreateEncounter = function(){
		$scope.message = false;
		$scope.closePopUp = false;
        $('.counter_pop').css({'min-height': 'unset'});
		if(angular.equals({}, $scope.addEncounter) == false){
			$scope.addEncounter = {};
		}		
		/*$scope.addEncounter.department = '';
		$scope.addEncounter.class = '';
		$scope.addEncounter.type = '';
		$scope.addEncounter.wts = '';*/
	}

	$scope.validateEncounterForm = function(addEncounter){
		if(angular.equals({}, addEncounter) == false){
			$scope.hideLoader = "show";
			//$scope.addEncounterBtn = true;
			AddEncounter.save({
				token: $window.sessionStorage.token, 
				patient_id: $scope.displayInfo.patient_id,
				department_id: addEncounter.department,
				encounter_class: addEncounter.class == undefined ? '' : addEncounter.class,
				encounter_type: addEncounter.type,
				whom_to_see: addEncounter.wts,
                reason_of_visit: addEncounter.reason_of_visit == undefined ? '' : addEncounter.reason_of_visit,
				decscribe_whom_to_see : addEncounter.describeWTS
			}, encounterSuccess, encounterFailed);
		}else{
			console.log(0);
		}
	}
	$scope.UpdatevalidateEncounterForm = function (updateData) {
        if (angular.equals({}, updateData) == false) {
            $scope.hideLoader = 'show';
            $scope.updateEncounterBtn = true;
            UpdateEncounter.save({
                token: $window.sessionStorage.token,
                patient_id: $scope.displayInfo.patient_id,
                visit_id: $scope.encounterID == undefined ? $scope.EID : $scope.encounterID,
                department_id: updateData.department,
                encounter_class: updateData.class == undefined ? '' : updateData.class,
                encounter_type: updateData.type,
                whom_to_see: updateData.wts,
                room: updateData.room,
                reason_of_visit: updateData.reason_of_visit == undefined ? '' : updateData.reason_of_visit
            }, updateEncounterSuccess, updateEncounterFailure);
        }
    }
	
    function updateEncounterSuccess(res) {
        if (res.status == true) {
            $scope.hideLoader = 'hide';
            $scope.message = true;
            $scope.buttonDisabled = true;
            $scope.disabledEncounterButton = true;
            $scope.updateEncounterBtn = false;
            $scope.errorMessage = res.message;
            $scope.messageType = 'alert-success';
            $scope.errorSymbol = 'fa fa-check';

            $scope.disabledEncounterButton = true;
            $scope.buttonDisabled = true;
            $timeout(function () {
                $scope.updateEncounterPopUp = false;
            }, 1500);
            GetAllEncounters.get({
		        token: $window.sessionStorage.token,
		        offset: 0,
		        limit: $scope.itemsPerPage
		    }, getPatientEncounters, getPatientEncountersFailure);
            //GetAllEncounters.get({token: $window.sessionStorage.token}, getPatientEncounters, getPatientEncountersFailure);
        }else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
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
        $('#internetError').modal('show');
        console.log(error);
    }

	$scope.closeAddEncounter = function(){
		$scope.closePopUp = true;
		$scope.submitted = false;
	}
	$scope.goToClinicalNotes = function () {
        $window.location.href = "#/clinical-documentation-clinic-progress-note/" + $scope.PID;
    }
	
	$scope.assignRoom = function () {
        UpdateVisitRoom.save({
            token: $window.sessionStorage.token,
            visit_id: $scope.encounterID == undefined ? $scope.EID : $scope.encounterID,
            room: $scope.updateAssignForm.room.$viewValue
        }, updateEncounterSuccess, updateEncounterFailure);
	}

	function encounterSuccess(res){
		console.log(res);
		$scope.hideLoader = "hide";
		if(res.status == true){
			$scope.submitted = false;
            $scope.disabledEncounterButton = true;
			$scope.addEncounterBtn = false;
            $scope.buttonDisabled = true;
			
			$scope.messageType = "alert-success";
			$scope.errorMessage = res.message;
			$scope.errorSymbol = "fa fa-check";// 
			$scope.message = true;
			GetAllEncounters.get({
		        token: $window.sessionStorage.token,
		        offset: 0,
		        limit: $scope.itemsPerPage
		    }, getPatientEncounters, getPatientEncountersFailure);
			$timeout(function(){$scope.closePopUp = true; /*$window.location.href = '#/new-encounter-encounter-list/'+res.visit_id+'/' + $scope.search*/}, 1000);
		}else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        }else{
			$scope.hideLoader = "hide";
			$scope.addEncounterBtn = false;
			$scope.message = true;
			$scope.messageType = "alert-danger";
			$scope.errorMessage = res.message;
			$scope.errorSymbol = "fa fa-times";
			$timeout(function(){$scope.message = false;}, 2000);
		}
	}

	function encounterFailed(error){
		$scope.addEncounterBtn = false;
		$scope.hideLoader = "hide";
		console.log(error);
	}

	GetAllPatients.get({ // Getting all patients
        token: $window.sessionStorage.token
    }, GetAllPatientsSuccess, GetAllPatientsFailure);
    function GetAllPatientsSuccess(res) { // on success
        if (res.status == true) {
            $scope.patients = res.data;
        }
    }
    function GetAllPatientsFailure(error) { // on failure
    	$('#internetError').modal('show');
        console.log(error);
    }

    DropDownData.get({ // Get all data for dropdown
        token: $window.sessionStorage.token
    }, DropDownDataSuccess, DropDownDataFailure);
    function DropDownDataSuccess(res) { // on success
        if (res.status == true) {
            $scope.labs = res.data.labs; // retreiving only lab data
        }
    }
    function DropDownDataFailure(error) { // on failure
    	$('#internetError').modal('show');
        console.log(error);
    }

    $scope.updateLabTests = function (labID){ // Updating Lab Test Dropdown on select of lab
        GetLabTests.get({ // Getting all lab tests according to lab id
            token: $window.sessionStorage.token,
            lab: labID
        }, GetLabTestsSuccess, GetLabTestsFailure);
         function GetLabTestsSuccess(res) { // on success
             if (res.status == true) {
                 $scope.labTests = res.data;
             }
         }
         function GetLabTestsFailure(error) { // on failure
         	$('#internetError').modal('show');
             console.log(error);
         }
    };

    $scope.lab_tests = []; // lab tests property
    $scope.lab_tests_td = []; // lab tests row data
    $scope.lab_test_total = 0; // lab tests total cost
    $scope.addTest = function (){ // adding test for order
        $scope.lab_tests.push({ 'lab_test' : $scope.Order.lab_test.id , 'priority' : $scope.Order.priority}); // update lab test object with new test
        $scope.testAdded = true;
        $scope.lab_tests_td.push({'name' : $scope.Order.lab_test.name, 'cost':$scope.Order.lab_test.cost, 'priority' : $scope.Order.priority}); // updating new test row for order
        $scope.lab_test_total = parseFloat($scope.lab_test_total) + parseFloat($scope.Order.lab_test.cost);
        $scope.Order.priority = undefined; // unsetting priority dropdown
        $scope.Order.lab_test = undefined; // unsetting test dropdown
        $('#s2id_priority .select2-chosen').text('Select Priority'); // changing place holder back to its original one
        $('#s2id_lab_test .select2-chosen').text('Select Lab Test'); // changing place holder back to its original one
    };

    $scope.addformsubmission = function(){
        if($scope.submitted == true && $scope.addForm.$invalid == true ){
            return true;
        }
        return false;
    };

    $scope.createOrder = function (Order) { // creating order
        $rootScope.loader = 'show';
        $scope.OrderBtn = true; // disabling submit button until request is complete
        addOrder.save({ // sending data over addOrder factory which will create new order
            token: $window.sessionStorage.token,
            patient_id: $scope.createOrderPatientID,//$scope.Order.patient_id,
            lab: $scope.Order.selected_lab,
            lab_test: JSON.stringify($scope.lab_tests),
            clinical_information: '',//$scope.Order.clinical_information,
            diagnosis: '',//$scope.Order.diagnosis,
            notes: $scope.Order.notes,
            visit_id: $scope.encounterID
        }, OrderSuccess, OrderFailure);
    };
    function OrderSuccess(res) {
    	console.log(res);
        if (res.status == true) {
            $rootScope.loader = 'hide';
            $scope.message = true;
            $scope.OrderBtn = false;
            $scope.errorMessage = res.message;
            $scope.messageType = 'alert-success';
            $scope.errorSymbol = 'fa fa-check';
            $timeout(function(){
            	$scope.submitted = false;
                $scope.Order = {}; // resetting order object
                $scope.lab_tests = []; // resetting lab tests object
                $scope.lab_tests_td = []; // clearing all test rows
                $scope.lab_test_total = 0; // setting total cost of tests to 0
                $('#s2id_autogen9 .select2-chosen').text('Select Patient'); // changing place holder back to its original one
                $('#s2id_autogen3 .select2-chosen').text('Select Lab'); // changing place holder back to its original one
                $('#neworder').modal('hide');
                $scope.message = false;
                //$window.location.href = "#/lab-order-listing/" + $scope.PID + "/" + $scope.encounterID;
            },500);
            $scope.orderSelected = false;
	}else if(res.error_code == 200){
            console.log(res);
            $scope.errorLabOrder = res.message;
            $('#error200').modal('show');
        }else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        } else {
            $scope.hideLoader = "hide";
            $scope.OrderBtn = false;
            $scope.message = true;
            $scope.messageType = "alert-danger";
            $scope.errorMessage = res.message;
            $scope.errorSymbol = "fa fa-times";
        }
    }
    function OrderFailure(error) {
    	$('#internetError').modal('show');
        console.log(error);
    }

    /*$scope.openCheckOutModal = function(){
    	$('#checkOutModal').modal('show');
    }*/
    GetAllWardsDropDown.get({
		token: $window.sessionStorage.token
	}, wardsDropDownSuccess, wardsDropDownFailure);

	function wardsDropDownSuccess(res){
		$rootScope.loader = "hide";
		if(res.status == true){
			$scope.wardDropdown = res.data;
		}
	}
	function wardsDropDownFailure(error){
		console.log(error);
		$('#internetError').modal('show');
	}
	$scope.wardselect = true;
	$scope.wardSelected = function(wid){
		$scope.wardselect = false;
		console.log(wid);
		GetBedsByWard.get({
			token: $window.sessionStorage.token,
			ward_id: wid
		}, getBedsWardSuccess, getBedsWardFailure);
		function getBedsWardSuccess(res){
			console.log(res);
			if(res.status == true){
				$scope.noOFBeds = res.data;
			}
		}
		function getBedsWardFailure(error){
			console.log(error);
			$('#internetError').modal('show');
		}
	}

	$scope.bedSelected = function(bedID){
		console.log(bedID);
		$scope.CO.bedNumber = bedID;
	}
	var d = new Date();
	$scope.admittedDateYear = d.getFullYear();
	$scope.admittedDateMonth = d.getMonth();
	$scope.admittedDateDay = d.getDay();
	$scope.admittedDate = $scope.admittedDateYear + "-" + $scope.admittedDateMonth + "-" + $scope.admittedDateDay
	console.log($scope.admittedDate);
    $scope.CO = {};
    $scope.checkout = function (dataToBeAdded){
    	console.log(dataToBeAdded);
    	CheckoutPatient.save({
    		token: $window.sessionStorage.token, 
    		patient_id: $scope.PID,
    		visit_id: $scope.encounterID,
    		reason: $('input:radio[name="checkoutpatient"]:checked').val(),
            notes: $('.checkout_patient_tab_con > div.active textarea').val() == undefined ? '' : $('.checkout_patient_tab_con > div.active textarea').val(),
    		pick_date: dataToBeAdded.date == undefined ? dataToBeAdded.discharge : dataToBeAdded.date,
    		pick_time: dataToBeAdded.time == undefined ? '' : dataToBeAdded.time,
    		admit_date: $scope.admittedDate == undefined ? '' : $scope.admittedDate,
    		start_time: dataToBeAdded.time == undefined ? '' : dataToBeAdded.time,
    		department_id: dataToBeAdded.CPN == undefined ? '' : dataToBeAdded.CPN,
    		ward_id: dataToBeAdded.ward == undefined ? '' : dataToBeAdded.ward,
    		bed_id: $scope.CO.bedNumber == undefined ? '' : $scope.CO.bedNumber
    	}, checkoutSuccess, checkoutFailure);
    }

    function checkoutSuccess(res){
    	if(res.status ==  true){
    		console.log(res);
            $scope.disabledEncounterButton = true;
            $scope.buttonDisabled = true;
    		$scope.hideLoader = "hide";
			$scope.messageType = "alert-success";
			$scope.errorMessage = res.message;
			$scope.errorSymbol = "fa fa-check";// 
			$scope.message = true;
			$scope.buttonDisabled = false;
            $scope.disabledEncounterButton = true;
            $scope.buttonDisabled = true;
			setTimeout(function() {$('#checkout').modal('hide'); $scope.message = false;}, 1000);
			GetAllEncounters.get({
		        token: $window.sessionStorage.token,
		        offset: 0,
		        limit: $scope.itemsPerPage
		    }, getPatientEncounters, getPatientEncountersFailure);
    	}else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        }
    }

    function checkoutFailure(error){
    	$('#internetError').modal('show');
    	console.log(error);
    }
    $scope.showBed = false;
    $scope.showbedFlag = false;
    $scope.showbeds = function(){
    	if($scope.showbedFlag == false){
    		$scope.showBed = true;
    		$scope.showbedFlag = true;
    	}else{
    		$scope.showBed = false;
    		$scope.showbedFlag = false;
    	}
    }

    $scope.goToEncounter = function(){
    	//$window.location.href = "#/new-encounter-encounter-list/" + $scope.EID + '/' + $scope.search;
    }

    GetAllEncounters.get({
        token: $window.sessionStorage.token,
        offset: 0,
        limit: $scope.itemsPerPage
    }, getPatientEncounters, getPatientEncountersFailure);

    function getPatientEncounters(res) {
        if (res.status == true) {
            $rootScope.loader = "hide";
            if(res.data.length == 0){
                $scope.allEncounter = [];
                $('#noRecordFound').modal('show');
                return true;
            }
            $scope.allEncounter = res.data;
            $scope.allEncounterCount = res.count;
            for(var i=0; i<$scope.allEncounter.length; i++){
            	if($scope.allEncounter[i].id == $scope.EID){
            		$scope.buttonDisabled = false;
            	}
            }
            console.log($scope.allEncounter);
        }else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        }
        //DropDownData.get({token: $window.sessionStorage.token, patient_id: $window.sessionStorage.patient_id}, dropDownSuccess, dropDownFailed);
    }
    function getPatientEncountersFailure(error) {
        $('#internetError').modal('show');
        console.log(error);
    }

    $scope.curPage = 0;
    $scope.pageSize = 15;
    $scope.numberOfPages = function() {
      return Math.ceil($scope.allEncounterCount / $scope.pageSize);
    };

    $scope.paginationNext = function(pageSize, curPage){
        $rootScope.loader = "show";
        console.log(pageSize * curPage);
        GetAllEncounters.get({
            token: $window.sessionStorage.token,
            token: $window.sessionStorage.token,
            offset: (pageSize * curPage), limit: $scope.itemsPerPage
        }, getPatientEncounters, getPatientEncountersFailure);
    }

    $scope.paginationPrev = function(pageSize, curPage){
        $rootScope.loader = "show";
        console.log(pageSize * curPage);
        GetAllEncounters.get({
            token: $window.sessionStorage.token,
            token: $window.sessionStorage.token,
            offset: (pageSize * curPage), limit: $scope.itemsPerPage
        }, getPatientEncounters, getPatientEncountersFailure);
    }

    $scope.createAppointments = function(dataToBeAdded){
    	console.log(dataToBeAdded);
        if(dataToBeAdded.department != undefined && dataToBeAdded.otherReason != undefined && dataToBeAdded.date != undefined && dataToBeAdded.startTime != undefined && dataToBeAdded.doctor != undefined){
        	$scope.disabledButton = "true";
        	$rootScope.loader = "show";
        	AddAppointments.save({
        		token: $window.sessionStorage.token,
        		patient_id: $scope.createOrderPatientID,
        		//visit_id: $scope.encounterID,
        		department: dataToBeAdded.department == undefined ? '' : dataToBeAdded.department,
        		reason: dataToBeAdded.reason == undefined ? '' : dataToBeAdded.reason,
        		date: dataToBeAdded.date == undefined ? '' : dataToBeAdded.date,
        		start_time: dataToBeAdded.startTime == undefined ? '' : dataToBeAdded.startTime,
        		notes: dataToBeAdded.notes == undefined ? '' : dataToBeAdded.notes,
        		doctor: dataToBeAdded.doctor == undefined ? '' : dataToBeAdded.doctor,
        		other_reason: dataToBeAdded.otherReason == undefined ? '' : dataToBeAdded.otherReason,
        		//end_time: dataToBeAdded.endTime,
        		priority: dataToBeAdded.priority == undefined ? '' : dataToBeAdded.priority
        	}, createAppointmentSuccess, createAppointmentFailure);

        	function createAppointmentSuccess(res){
        		if(res.status == true){
        			$rootScope.loader = "hide";
        			$scope.modalHeading = "Successful";
        			$scope.modalMessage = "New Appointment Created";
        			$('#noResultFound').modal('show');
        			$('#createAppointment').modal('hide');
        			$scope.appointment = {};
        			$scope.submitted = false;
        		}else if(res.error_code == 500){
	                console.log(res);
	                $rootScope.RolesAccess(res.message);
	            }
        	}
        	function createAppointmentFailure(error){
                $rootScope.loader = "hide";
                $('#internetError').modal('show');
        		console.log(error);
        	}
        }
    }
    $('#findPatient').on('input', function(){
        var input = $('#findPatient').val();
        console.log("jajajajajja");
        if(input != undefined || input != ''){
            if(input.length == 0){
                $('.headerWithSwitchingImages').addClass('ng-hide');
                $('.headerWithSwitchingImages1').removeClass('ng-hide');
            }else{
                $.ajax({
                    url: $('#findPatient').data('source'),
                    dataType: "json",
                    type: "POST",
                    delay: 500,
                    minLength: 2,
                    data: {name: input},
                    success: function (patients) {
                        $("#findPatient").autocomplete({
                            source: function (request, response) {
                                if(patients.status == true){
                                    response($.map(patients.data, function (value, key) {
                                        return {
                                            label: value.first_name == "" || value.first_name == undefined ? "No patient found" : value.id + " - " + value.first_name + " " + value.last_name,
                                            value: value.id == "" ? '0' : value.id
                                        }
                                    }));
                                    patients.data = [];
                                }else{
                                    response({label:"No Patient Found"});
                                    patients.data = [];
                                }
                            },
                            select: function(event, ui) {
                                $('#findPatient').val(ui.item.label);
                                console.log(ui.item.label);
                                $scope.appointment.appointmentSearch = ui.item.label;
                                $scope.selectedPatientID = $scope.appointment.appointmentSearch.split(' - ');
                                $scope.appointment.selectedPatientID = $scope.selectedPatientID[0];
                                return false;
                            }
                        });
                    }
                });
            }
        }
    });
    $scope.addformsubmission = function(){
        if($scope.submitted == true && $scope.myFormAdd.$invalid == true ){
            return true;
        }
        return false;
    };
    $scope.updateEncounters = function () {
        $scope.visit_id = '';
        $scope.department_id = '';
        $scope.encounter_class = '';
        $scope.encounter_type = '';
        $scope.whom_to_see = '';
        console.log('here');
        $scope.message = false;
        var eid = $scope.encounterID == undefined ? $scope.EID : $scope.encounterID;
        console.log(eid);
        GetOneEncounter.get({token: $window.sessionStorage.token, visit_id: eid}, getOneEncounterSuccess, getOneEncounterFailure);
        $('.counter_pop').css({'min-height': 'unset'});
        $scope.updateEncounterPopUp = true;
    }

    $scope.closeupdateEncounter = function () {
        $scope.updateEncounterPopUp = false;
    }

    function getOneEncounterSuccess(res) {
        if (res.status == true) {
            console.log(res.data, "reason");
            $scope.updateEncounter.department = res.data.department_id;
            $scope.updateEncounter.class = res.data.encounter_class;
            $scope.updateEncounter.type = res.data.encounter_type;
            $scope.updateEncounter.wts = res.data.whom_to_see;
            $scope.updateEncounter.reason_of_visit = res.data.reason_of_visit;
            $scope.updateEncounter.room = res.data.room_id;
        }
        setTimeout(function () {
            $('select').not('.select_searchFields,.search-ajax').select2({minimumResultsForSearch: Infinity});
        }, 100)
    }

    function getOneEncounterFailure(error) {
        $('#internetError').modal('show');
        console.log(error);
    }
    $scope.removeEncounter = function () {
        $scope.buttonDisabled = false;
        var dltID = $scope.encounterID == undefined ? $scope.EID : $scope.encounterID;
        $rootScope.loader = "show";
        $scope.buttonDisabled = false;
        $scope.patientInfo = false;
$scope.disabledEncounterButton = true;
        $scope.buttonDisabled = true;
        RemoveEncounter.get({token: $window.sessionStorage.token, visit_id: dltID}, encounterDeleteSuccess, encounterDeletefailure);
    }

    function encounterDeleteSuccess(res) {
        console.log(res);
        $rootScope.loader = "hide";
        if (res.status == true) {
            GetAllEncounters.get({
		        token: $window.sessionStorage.token,
		        offset: 0,
		        limit: $scope.itemsPerPage
		    }, getPatientEncounters, getPatientEncountersFailure);
            
        }else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        } else {
            $rootScope.loader = "hide";
        }
    }

    function encounterDeletefailure(error) {
        console.log(error);
        $rootScope.loader = "hide";
        $('#internetError').modal('show');
    }
    $scope.validateVitals = function (vital) {
        if (angular.equals({}, vital) == false) {
            if ($('form[name=vitalForm]').find('.error').length == 0) {
                $rootScope.loader = "show";
                var vitalField = {
                    visit_id: $scope.EID == undefined ? $scope.encounterID : $scope.EID,
                    patient_id: $scope.PID,
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
                AddVitals.save(vitalField, vitalSuccess, vitalFailure);
            }
        }
    }

        function vitalSuccess(res) {
            console.log(res);
            if (res.status == true) {
            	//$scope.buttonDisabled = false;
            	//$scope.action = undefined;
                /*$scope.disabledEncounterButton = true;
                $scope.buttonDisabled = true;*/
                $('#vital-signs').modal('hide');
                $rootScope.loader = "hide";
                $scope.vital.systolic = '';
                $scope.vital.diastolic = '';
                $scope.vital.pulse = '';
                $scope.vital.respiratoryRate = '';
                $scope.vital.temperaturec = '';
                $scope.vital.temperaturef = '';
                $scope.vital.result = '';
                $scope.vital.weight = '';
                $scope.vital.notes = '';
                $scope.vital.height = '';
            }else if(res.error_code == 500){
                console.log(res);
                $rootScope.RolesAccess(res.message);
            }
        }

        function vitalFailure(error) {
            $('#internetError').modal('show');
            console.log(error);
        }
        $scope.Calculatebmi = function () {
        	if($scope.vital.weight != undefined && $scope.vital.height != undefined){
	            $scope.vital.result = ($scope.vital.weight) / (($scope.vital.height / 100) * ($scope.vital.height / 100));
	            $scope.vital.result = parseFloat($scope.vital.result).toFixed(2);
	            console.log("aasdas");
	        }
        }
        $scope.GetTempcVal = function () {
            $scope.vital.temperaturef = ($scope.vital.temperaturec - 32) * (5 / 9);
            $scope.vital.temperaturef = parseFloat($scope.vital.temperaturef).toFixed(2);
            console.log($scope.vital.temperaturef);
            if($('#tempc').val() == ''){
        		$scope.vital.temperaturef = '';
        	}
        }
        $scope.GetTempfVal = function () {

            $scope.vital.temperaturec = ($scope.vital.temperaturec * (9 / 5)) + 32
            $scope.vital.temperaturec = parseFloat($scope.vital.temperaturec).toFixed(2);
            if($('#tempf').val() == ''){
        		$scope.vital.temperaturec = '';
        	}
        }
        $scope.parseFloat = function (val) {
            return isNaN(parseFloat(val)) ? 0 : parseFloat(val);
        }
        

		$scope.search = function(item){ 
	        if($scope.listsearch == undefined){
	            return true;
	        }else{
	            if(item.last_name.toLowerCase().indexOf($scope.listsearch.toLowerCase()) != -1 || item.first_name.toLowerCase().indexOf($scope.listsearch.toLowerCase()) != -1){
	                return true;
	            }
	        }
	    };

}]);