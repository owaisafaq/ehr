var AppEHR = angular.module('AppEHR');
// Lab Order Tests Listing
AppEHR.controller('labOrderTests', ['$scope', '$rootScope','$window', '$routeParams','getLabOrderInfo','getLabTestInfo','$timeout', function ($scope, $rootScope, $window, $routeParams, getLabOrderInfo,getLabTestInfo, $timeout) {
	$rootScope.pageTitle = "EHR - Lab Order Test";
    $scope.action = "";
    getLabOrderInfo.get({ // Getting all tests along with order info
        token: $window.sessionStorage.token,
        order_id: $routeParams.orderID},
        getLabOrderInfoSuccess, getLabOrderInfoFailure);
    function getLabOrderInfoSuccess(res) { // on success
        if (res.status == true) {
            $rootScope.loader = "hide";
            $scope.orderSelected = true;
            $scope.selectedOrder = res.data;
        }
    }
    function getLabOrderInfoFailure(error) { // on failure
        $rootScope.loader = "show";
        console.log(error);
    }

    $scope.testSelected = function (testID){ // For Selection of test
        console.log(testID);
        $scope.testID = testID;
        $scope.selectedTest = {};
        $rootScope.loader = "show";
        getLabTestInfo.get({
            token: $window.sessionStorage.token,
            lab_test_id: testID
        }, getLabTestInfoSuccess, getLabTestInfoFailure);
        function getLabTestInfoSuccess(res) { // on success
            if (res.status == true) {
                $rootScope.loader = "hide";
                $scope.testIsSelected = true;
                $scope.selectedTest = res.data;
            }
        }
        function getLabTestInfoFailure(error) { // on failure
            $rootScope.loader = "show";
            console.log(error);
        }
    }

    $scope.search = function(item){ // search data by test name or test priority
        if($scope.searchTest == undefined){
            return true;
        }else{
            if(item.priority.toLowerCase().indexOf($scope.searchTest.toLowerCase()) != -1 || item.test_name.toLowerCase().indexOf($scope.searchTest.toLowerCase()) != -1){
                return true;
            }
        }
    };

}]);