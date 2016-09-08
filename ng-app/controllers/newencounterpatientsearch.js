var AppEHR = angular.module('AppEHR');

AppEHR.controller('newEncounterPatientSearchController', ['$scope', '$rootScope', '$window', 'AddEncounter', '$timeout', 'GetVisits', '$rootScope', 'GetPatientInfo', 'DropDownData', '$http', 'GetAllPatients', 'GetLabTests', 'addOrder', 'GetAllLabOrders', 'CheckoutPatient', function($scope, $rootScope, $window, AddEncounter, $timeout, GetVisits, $rootScope, GetPatientInfo, DropDownData, $http, GetAllPatients, GetLabTests, addOrder, GetAllLabOrders, CheckoutPatient){
	$rootScope.pageTitle = "EHR - New Encounter Patient Search";
	$scope.addEncounter = {};
	$scope.allEncounters = [];
	$scope.displayInfo = {};
	$scope.closePopUp = true;
	$scope.patientInfo = false;
	$scope.hideLoader = "hide";
	$scope.disabledEncounterButton = true;
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
		$scope.PID = string;
		$scope.Order.patient_id = string;
		setTimeout(function () {
            $('select').not('.search-ajax').select2({minimumResultsForSearch: Infinity});
        }, 2000)
		
		$rootScope.loader = "show";
		
		GetPatientInfo.get({token: $window.sessionStorage.token, patient_id: string}, getPatientSuccess, getPatientFailure);
		function getPatientSuccess(res){
			if(res.status == true){
				console.log(res);
				$scope.disabledEncounterButton = false;
				$scope.patientInfo = true;
				$rootScope.loader = "hide";
				$scope.displayInfo.first_name = res.data.first_name;
				$scope.displayInfo.patient_id = res.data.id;
				$scope.displayInfo.age = res.data.age;
				$scope.displayInfo.sex = res.data.sex;
				$scope.displayInfo.marital_status = res.data.marital_status;
				$scope.EID = res.data.encounter_id;
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
    $scope.gridOptions = {
	    enableFiltering: false,
	    onRegisterApi: function(gridApi){
	      $scope.gridApi = gridApi;
	      $scope.gridApi.grid.registerRowsProcessor( $scope.singleFilter, 200 );
	    },columnDefs: [
		    { field: 'PATIENT ID' },
		    { field: 'FULL NAME'}
		]
	};

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

	function getPatientSuccess(res){
		$scope.patientInfo = true;
		$rootScope.loader = "hide";
		if(res.status == true){
			$scope.displayInfo.first_name = res.data.first_name;
			$scope.displayInfo.patient_id = res.data.id;
			$scope.displayInfo.age = res.data.age;
			$scope.displayInfo.gender = res.data.sex;
			$scope.displayInfo.marital_status = res.data.marital_status;
		}
	}

	function getPatientFailure(error){
		$('#internetError').modal('show');
		console.log(error);
	}

	$scope.openCreateEncounter = function(){
		$scope.message = false;
		$scope.closePopUp = false;
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
				encounter_class: addEncounter.class,
				encounter_type: addEncounter.type,
				whom_to_see: addEncounter.wts,
				decscribe_whom_to_see : addEncounter.describeWTS
			}, encounterSuccess, encounterFailed);
		}else{
			console.log(0);
		}
	}

	$scope.closeAddEncounter = function(){
		$scope.closePopUp = true;
	}

	function encounterSuccess(res){
		console.log(res);
		if(res.status == true){
			$scope.addEncounterBtn = false;
			$scope.hideLoader = "hide";
			$scope.messageType = "alert-success";
			$scope.errorMessage = res.message;
			$scope.errorSymbol = "fa fa-check";// 
			$scope.message = true;
			$timeout(function(){$scope.closePopUp = true; $window.location.href = '#/new-encounter-encounter-list/'+res.visit_id+'/' + $scope.search}, 1000);
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
            patient_id: $scope.Order.patient_id,
            lab: $scope.Order.selected_lab,
            lab_test: JSON.stringify($scope.lab_tests),
            clinical_information: $scope.Order.clinical_information,
            diagnosis: $scope.Order.diagnosis,
            notes: $scope.Order.notes
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
                $window.location.href = "#/lab-order-listing/" + $scope.search;
            },500);
            $scope.orderSelected = false;
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
    $scope.CO = {};
    $scope.checkout = function (dataToBeAdded){
    	console.log(dataToBeAdded);
    	CheckoutPatient.save({
    		token: $window.sessionStorage.token, 
    		patient_id: $scope.PID,
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
    		$scope.hideLoader = "hide";
			$scope.messageType = "alert-success";
			$scope.errorMessage = res.message;
			$scope.errorSymbol = "fa fa-check";// 
			$scope.message = true;
			setTimeout(function() {$('#simpleModal1').modal('hide');}, 1000);
			
    	}
    }

    function checkoutFailure(error){
    	$('#internetError').modal('show');
    	console.log(error);
    }

    $scope.goToEncounter = function(){
    	$window.location.href = "#/new-encounter-encounter-list/" + $scope.EID + '/' + $scope.search;
    }
}]);