var AppEHR = angular.module('AppEHR');

AppEHR.controller('labOrderListing', ['$scope', '$rootScope', 'GetAllLabOrders', '$window', '$routeParams','getLabOrderInfo','cancelLabOrder', '$timeout', function ($scope, $rootScope, GetAllLabOrders, $window, $routeParams,getLabOrderInfo,cancelLabOrder, $timeout) {
	$rootScope.pageTitle = "EHR - Lab Order Listing";
    $scope.action = "";
	GetAllLabOrders.get({
		token: $window.sessionStorage.token
	}, GetAllLabOrdersSuccess, GetAllLabOrdersFailure);

	function GetAllLabOrdersSuccess(res) {
		if (res.status == true) {
			$scope.labOrders = res.data;
		}
	}

	function GetAllLabOrdersFailure(error) {
		console.log(error);
	}
    $scope.labSelected = function (orderID) {
        console.log(orderID);
        $scope.orderID = orderID;
        $scope.selectedOrder = {};
        $rootScope.loader = "show";
        getLabOrderInfo.get({token: $window.sessionStorage.token, order_id: orderID}, getLabOrderInfoSuccess, getLabOrderInfoFailure);
        function getLabOrderInfoSuccess(res) {
            if (res.status == true) {
                $rootScope.loader = "hide";
                $scope.orderSelected = true;
                $scope.selectedOrder = res.data;
                console.log($scope.selectedOrder);
            }
        }
        function getLabOrderInfoFailure(error) {
            $rootScope.loader = "show";
            console.log(error);
        }
    };

    $scope.validateCancelOrderForm = function (cancelOrder) {
        console.log(cancelOrder);
        if (angular.equals({}, cancelOrder) == false) {
            $scope.hideLoader = 'show';
            $scope.cancleOrderBtn = true;
            console.log($scope.selectedOrder.id);
            cancelLabOrder.save({
                token: $window.sessionStorage.token,
                order_id: $scope.selectedOrder.id,
                order_status: 'Cancelled',
                reason: cancelOrder.reason,
                notes: cancelOrder.note
            }, cancelLabOrderSuccess, cancelLabOrderFailure);
        }
    };

    function cancelLabOrderSuccess(res) {
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
        } else {
            $scope.hideLoader = "hide";
            $scope.cancleOrderBtn = false;
            $scope.message = true;
            $scope.messageType = "alert-danger";
            $scope.errorMessage = res.message;
            $scope.errorSymbol = "fa fa-times";
        }
    }

    function cancelLabOrderFailure(error) {
        console.log(error);
    }
}]);