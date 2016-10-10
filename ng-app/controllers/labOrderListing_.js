var AppEHR = angular.module('AppEHR');
// Lab Order Listing Controller
AppEHR.controller('labOrderListing', ['$scope', '$rootScope', 'GetAllLabOrders', '$window', '$routeParams','getLabOrderInfo','cancelLabOrder', '$timeout', '$location', 'GetAllPatients', 'DropDownData', 'GetLabTests','addOrder', 'LabOrdersByPatient', function ($scope, $rootScope, GetAllLabOrders, $window, $routeParams,getLabOrderInfo,cancelLabOrder, $timeout, $location, GetAllPatients, DropDownData, GetLabTests, addOrder, LabOrdersByPatient) {
	$rootScope.pageTitle = "EHR - Lab Order Listing";
    $scope.action = "";
    $rootScope.loader = "show";
    $scope.testAdded = false;
    $scope.itemsPerPage = 15;
    $scope.searchLab = $routeParams.patientID == undefined ? '' : $routeParams.patientID;
    if($routeParams.patientID != undefined){
        LabOrdersByPatient.get({
            token: $window.sessionStorage.token,
            patient_id: $routeParams.patientID,
            limit: $scope.itemsPerPage, offset: 0
        }, GetAllLabOrdersSuccess, GetAllLabOrdersFailure);
    }else{
    	GetAllLabOrders.get({ // Getting all lab orders
    		token: $window.sessionStorage.token,
            limit: $scope.itemsPerPage, offset: 0
    	}, GetAllLabOrdersSuccess, GetAllLabOrdersFailure);
    }
	function GetAllLabOrdersSuccess(res) { // on success GetAllLabOrders
        console.log(res);
		if (res.status == true) {
            $scope.labOrderCount = res.count;
            console.log($scope.labOrderCount);
            $rootScope.loader = "hide";
            if(res.data.length == 0){
                console.log(11);
                $('#noRecordFound').modal('show');
                return false;
            }
			$scope.labOrders = res.data;

		}
	}
	function GetAllLabOrdersFailure(error) { // on failure GetAllLabOrders
        $('#internetError').modal('show');
		console.log(error);
	}

    $scope.labSelected = function (orderID) { // For Selection of Lab
        $scope.orderID = orderID;
        $scope.selectedOrder = {};
        $rootScope.loader = "show";
        getLabOrderInfo.get({token: $window.sessionStorage.token, order_id: orderID}, getLabOrderInfoSuccess, getLabOrderInfoFailure);
        function getLabOrderInfoSuccess(res) { // on success
            if (res.status == true) {
                $rootScope.loader = "hide";
                $scope.orderSelected = true;
                $scope.selectedOrder = res.data;
            }
        }
        function getLabOrderInfoFailure(error) { // on failure
            $rootScope.loader = "hide";
            $('#internetError').modal('show');
            console.log(error);
        }
    };

    $scope.validateCancelOrderForm = function (cancelOrder) { // Cancel Order
        if (angular.equals({}, cancelOrder) == false) {
            $scope.hideLoader = 'show';
            $scope.cancleOrderBtn = true;
            cancelLabOrder.save({ // sending data over cancelLabOrder factory
                token: $window.sessionStorage.token,
                order_id: $scope.selectedOrder.id,
                order_status: 'Cancelled',
                reason: cancelOrder.reason,
                notes: cancelOrder.note
            }, cancelLabOrderSuccess, cancelLabOrderFailure);
        }
    };
    function cancelLabOrderSuccess(res) { // on success
        $rootScope.loader = "hide";
        if (res.status == true) {
            $scope.hideLoader = 'hide';
            $scope.message = true;
            $scope.cancleOrderBtn = false;
            $scope.errorMessage = res.message;
            $scope.messageType = 'alert-success';
            $scope.errorSymbol = 'fa fa-check';
            $timeout(function(){
                $('#cancelOrder').modal('hide');
            },500);
            if($routeParams.patientID != undefined){
                LabOrdersByPatient.get({
                    token: $window.sessionStorage.token,
                    patient_id: $routeParams.patientID,
                    limit: $scope.itemsPerPage, offset: 0
                }, GetAllLabOrdersSuccess, GetAllLabOrdersFailure);
            }else{
                GetAllLabOrders.get({ // Getting all lab orders
                    token: $window.sessionStorage.token,
                    limit: $scope.itemsPerPage, offset: 0
                }, GetAllLabOrdersSuccess, GetAllLabOrdersFailure);
            }
        } else {
            $scope.hideLoader = "hide";
            $scope.cancleOrderBtn = false;
            $scope.message = true;
            $scope.messageType = "alert-danger";
            $scope.errorMessage = res.message;
            $scope.errorSymbol = "fa fa-times";
        }
    }
    function cancelLabOrderFailure(error) { // on failure
        $('#internetError').modal('show');
        console.log(error);
    }

    $scope.search = function(item){ // search data by patient name or partient id
        if($scope.searchLab == undefined){
            return true;
        }else{
            if(item.patient_id.toLowerCase().indexOf($scope.searchLab.toLowerCase()) != -1 || item.patient_name.toLowerCase().indexOf($scope.searchLab.toLowerCase()) != -1){
                return true;
            }
        }
    };

    GetAllPatients.get({ // Getting all patients
        token: $window.sessionStorage.token
    }, GetAllPatientsSuccess, GetAllPatientsFailure);
    function GetAllPatientsSuccess(res) { // on success
        $rootScope.loader = "hide";
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

    $scope.date = new Date(); // date property for current date

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
    $scope.createOrder = function (Order) { // creating order
        $scope.hideLoader = 'show';
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
        if (res.status == true) {
            $scope.hideLoader = 'hide';
            $scope.message = true;
            $scope.OrderBtn = false;
            $scope.errorMessage = res.message;
            $scope.messageType = 'alert-success';
            $scope.errorSymbol = 'fa fa-check';
            $timeout(function(){
                $scope.Order = {}; // resetting order object
                $scope.lab_tests = []; // resetting lab tests object
                $scope.lab_tests_td = []; // clearing all test rows
                $scope.lab_test_total = 0; // setting total cost of tests to 0
                $scope.submitted = false;
                $('#s2id_autogen9 .select2-chosen').text('Select Patient'); // changing place holder back to its original one
                $('#s2id_autogen3 .select2-chosen').text('Select Lab'); // changing place holder back to its original one
                $('#neworder').modal('hide');
                $scope.message = false;
            },500);
            GetAllLabOrders.get({ // Getting all lab orders
                token: $window.sessionStorage.token
            }, GetAllLabOrdersSuccess, GetAllLabOrdersFailure);
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

    $scope.addformsubmission = function(){
        if($scope.submitted == true && $scope.addForm.$invalid == true ){
            return true;
        }
        return false;
    };

    $scope.curPage = 0;
    $scope.pageSize = 15;
    $scope.numberOfPages = function() {
      return Math.ceil($scope.labOrderCount / $scope.pageSize);
    };

    $scope.paginationNext = function(pageSize, curPage){
        $rootScope.loader = "show";
        console.log(pageSize * curPage);
        if($routeParams.patientID != undefined){
            LabOrdersByPatient.get({
                token: $window.sessionStorage.token,
                patient_id: $routeParams.patientID,
                offset: (pageSize * curPage), limit: $scope.itemsPerPage
            }, GetAllLabOrdersSuccess, GetAllLabOrdersFailure);
        }else{
            GetAllLabOrders.get({ // Getting all lab orders
                token: $window.sessionStorage.token,
                offset: (pageSize * curPage), limit: $scope.itemsPerPage
            }, GetAllLabOrdersSuccess, GetAllLabOrdersFailure);
        }
    }

    $scope.paginationPrev = function(pageSize, curPage){
        $rootScope.loader = "show";
        console.log(pageSize * curPage);
        if($routeParams.patientID != undefined){
            LabOrdersByPatient.get({
                token: $window.sessionStorage.token,
                patient_id: $routeParams.patientID,
                offset: (pageSize * curPage), limit: $scope.itemsPerPage
            }, GetAllLabOrdersSuccess, GetAllLabOrdersFailure);
        }else{
            GetAllLabOrders.get({ // Getting all lab orders
                token: $window.sessionStorage.token,
                offset: (pageSize * curPage), limit: $scope.itemsPerPage
            }, GetAllLabOrdersSuccess, GetAllLabOrdersFailure);
        }
    }

    $scope.go = function ( path ) { // method for routing on button click
        $location.path( path + '/' + $scope.selectedOrder.id);
    };

    
}]);
