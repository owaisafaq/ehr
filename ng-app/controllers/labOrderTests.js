var AppEHR = angular.module('AppEHR');

AppEHR.controller('labOrderTests', ['$scope', '$rootScope','$window', '$routeParams','getLabOrderInfo','$timeout', function ($scope, $rootScope, $window, $routeParams, getLabOrderInfo, $timeout) {
	$rootScope.pageTitle = "EHR - Lab Order Test";
    $scope.action = "";
    getLabOrderInfo.get({token: $window.sessionStorage.token, order_id: $routeParams.orderID}, getLabOrderInfoSuccess, getLabOrderInfoFailure);
    function getLabOrderInfoSuccess(res) { // on success
        console.log(res);
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

}]);