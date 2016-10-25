var AppEHR = angular.module('AppEHR');
// Lab Order Tests Listing
AppEHR.controller('labOrderTests', ['$scope', '$rootScope','$window', '$routeParams','getLabOrderInfo','getLabTestInfo','updateTestStatus','$timeout','$location', 'Dosignoff', 'orderReport','getInventory','AddMaterialByCat', function ($scope, $rootScope, $window, $routeParams, getLabOrderInfo,getLabTestInfo,updateTestStatus,$timeout,$location, Dosignoff, orderReport,getInventory,AddMaterialByCat) {
    $rootScope.pageTitle = "EHR - Lab Order Test";
    $scope.action = "";
    $scope.allProdByCat = [];
    $scope.addedMaterial = [];
    $scope.addedMaterialDB = [];
    getLabOrderInfo.get({ // Getting all tests along with order info
            token: $window.sessionStorage.token,
            order_id: $routeParams.orderID},
        getLabOrderInfoSuccess, getLabOrderInfoFailure);
    function getLabOrderInfoSuccess(res) { // on success
        console.log(res, "[]");
        if (res.status == true) {
            $rootScope.loader = "hide";
            $scope.signoffStatus = res.data.test[0].signoff;
            $rootScope.lab_order_test_id = res.data.test[0].lab_order_test_id;
            $scope.template_exists = res.data.test[0].template_exists;
            $scope.orderSelected = true;
            $scope.selectedOrder = res.data;
        }else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        }
    }
    function getLabOrderInfoFailure(error) { // on failure
        $rootScope.loader = "hide";
        $('#internetError').modal('show');
        console.log(error);
    }

    $scope.testSelected = function (testID){ // For Selection of test
        $scope.testID = testID;
        $scope.selectedTest = {};
        $rootScope.loader = "show";
        getLabTestInfo.get({
            token: $window.sessionStorage.token,
            lab_test_id: testID
        }, getLabTestInfoSuccess, getLabTestInfoFailure);
        function getLabTestInfoSuccess(res) { // on success
            if (res.status == true) {
                console.log(res, "ipopopo");
                $scope.signoffStatus = res.data.signoff;
                $scope.labtestid = res.data.id;
                $rootScope.loader = "hide";
                $scope.testIsSelected = true;
                $scope.selectedTest = res.data;
                var length = $('#cancelOrder2 .form-wizard-horizontal li').length;
                var width = 0 / (length - 1) * 100;
                if($scope.selectedTest.test_status == 'sample collected'){
                    width = 1 / (length - 1) * 100;
                }else if($scope.selectedTest.test_status == 'in progress'){
                    width = 2 / (length - 1) * 100;
                }else if($scope.selectedTest.test_status == 'result completed'){
                    width = 3 / (length - 1) * 100;
                }else if($scope.selectedTest.test_status == 'signed'){
                    width = 4 / (length - 1) * 100;
                }else if($scope.selectedTest.test_status == 'completed'){
                    width = 5 / (length - 1) * 100;
                }
                $('#cancelOrder2 .form-wizard-horizontal .progress .progress-bar-primary').css('width', width + '%');
                $scope.selectedTest.updated_at = new Date($scope.selectedTest.updated_at); // date property for current date
                orderReport.save({
                    lab_test_id: $scope.labtestid, //    will place there orderID/21 api is in progress
                    token: $window.sessionStorage.token
                }, orderReportSuccess, orderReportFailure);
            }
        }
        function getLabTestInfoFailure(error) { // on failure
            $rootScope.loader = "hide";
            $('#internetError').modal('show');
            console.log(error);
        }
    };

    $scope.search = function(item){ // search data by test name or test priority
        if($scope.searchTest == undefined){
            return true;
        }else{
            if(item.priority.toLowerCase().indexOf($scope.searchTest.toLowerCase()) != -1 || item.test_name.toLowerCase().indexOf($scope.searchTest.toLowerCase()) != -1){
                return true;
            }
        }
    };

    $scope.updateTestForm = function () { // updating Test Form Status
        //if (angular.equals({}, test) == false) {
            
        $scope.startTime = $scope.startTime.split(' ');
        $scope.startTime = $scope.startTime[0];    
        console.log($scope.startTime, $scope.updateDate);
        $scope.hideLoader = 'show';
        $scope.updateTestBtn = true; // disabling submit button until request is complete
        updateTestStatus.save({ // sending data over updateTestStatus factory which will update Test Status
            token: $window.sessionStorage.token,
            lab_test: $scope.selectedTest.id,
            date_time: $scope.updateDate + " " + $scope.startTime,
            status: $('#cancelOrder2 .form-wizard-horizontal li.active .title').data('val')
        }, updateTestStatusSuccess, updateTestStatusFailure);
        $scope.testSelected($scope.selectedTest.id);
        //}
    };

    function updateTestStatusSuccess(res){ // on success
        if (res.status == true) {
            $scope.hideLoader = 'hide';
            $scope.message = true;
            $scope.updateTestBtn = false;
            $scope.errorMessage = res.message;
            $scope.messageType = 'alert-success';
            $scope.errorSymbol = 'fa fa-check';
            $timeout(function(){
                getLabOrderInfo.get({ // Getting all tests along with order info
                        token: $window.sessionStorage.token,
                        order_id: $routeParams.orderID},
                    getLabOrderInfoSuccess, getLabOrderInfoFailure);
                $scope.selectedTest.test_status = $('#cancelOrder2 .form-wizard-horizontal li.active .title').data('val');
                $('#cancelOrder2').modal('hide');
                $scope.message = false;
            },500);
        }else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        } else {
            $scope.hideLoader = "hide";
            $scope.updateTestBtn = false;
            $scope.message = true;
            $scope.messageType = "alert-danger";
            $scope.errorMessage = res.message;
            $scope.errorSymbol = "fa fa-times";
        }
    }
    function updateTestStatusFailure(error){ // on failure
        $('#internetError').modal('show');
        console.log(error);
    }

    $scope.go = function ( path ) { // method for routing on button click
        $location.path( path + '/' + $scope.selectedTest.id + "/" + $scope.labtestid);
    };

    $scope.insertBarcode = function(status){
        if(status == true){
            $scope.visibleImg = true;
        }else{
            $scope.visibleImg = false;
        }
    }

    $scope.doSignOff = function(){
        console.log($scope.labtestid);
        Dosignoff.save({
            lab_test_id: $scope.labtestid, //    will place there orderID api is in progress
            token: $window.sessionStorage.token
        }, signoffSuccess, signoffFailure);
    }
    function signoffSuccess(res){
        if(res.status == true){
            console.log(res);
            $scope.signoffStatus = 1;
            $('#successSignoff').modal('show');
            $('#confirmModal').modal('hide');
        }else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        }
    }
    function signoffFailure(res){
        console.log(res.data)
    }

        
        
        function orderReportSuccess(res){
             console.log(res, "report")
            if (res.status == true) {
                $scope.labtestid = res.lab_test_id;
                $('.showPdf').html("<iframe class='abc' src="+res.data+"></iframe>");
                $scope.signoffStatus = res.is_signup;
                $scope.signoffId = res.lab_test_id;
            }
        }
        function orderReportFailure(res){
            console.log(res);
        }

        $scope.openPrint  = function (){
            window.print();
        }
        getInventory.get({
            token: $window.sessionStorage.token
        }, getInventorySuccess, getInventoryFailure);
        function getInventorySuccess(res){
            $scope.allProdByCat = res.data;
            console.log("success")
        }
        function getInventoryFailure(res){
            console.log(res);
            console.log("error")
        }
        $scope.addMaterial = function (){
            $scope.addedMaterial.push({
                    "material": "" + $scope.prod_cat_name.cat_name + "",
                    "cost": "" + $scope.prod_quantity * $scope.prod_cat_name.cost + "",
                    "quantity": $scope.prod_quantity
                });
                $scope.addedMaterialDB.push({
                    "material": "" + $scope.prod_cat_name.id + "",
                    "cost": "" + $scope.prod_quantity * $scope.prod_cat_name.cost + "",
                    "quantity": $scope.prod_quantity
                });
                $scope.prod_quantity = "";
                $("#selectInventory select").select2("val", "");
                
        }
        $scope.addMaterials = function (){
             AddMaterialByCat.save({
            lab_order_id: $routeParams.orderID,
            material: JSON.stringify($scope.addedMaterialDB),
            token: $window.sessionStorage.token,
        }, addMaterialSuccess, addMaterialFailure);
        }
        function addMaterialSuccess(res){
            
            if(res.status == true){
                console.log(res.message);
            }else if(res.error_code == 500){
                console.log(res);
                $rootScope.RolesAccess(res.message);
            }
//            console.log("success");
        }
        function addMaterialFailure(res){
            console.log(res.data);
            console.log("failure");
        }
}]);