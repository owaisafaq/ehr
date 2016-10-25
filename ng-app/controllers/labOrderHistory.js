var AppEHR = angular.module('AppEHR');
// Lab Order History Controller
AppEHR.controller('labOrderHistory', ['$scope', '$rootScope', '$window', 'GetLabOrdersHistory', 'getLabOrderInfo', function($scope, $rootScope, $window, GetLabOrdersHistory, getLabOrderInfo){
	$rootScope.pageTitle = "EHR - Lab Order History";
    $scope.action = "";
    $rootScope.loader = "show";
	GetLabOrdersHistory.get({ // Getting all lab orders
		token: $window.sessionStorage.token
	}, GetAllLabOrdersSuccess, GetAllLabOrdersFailure);
	function GetAllLabOrdersSuccess(res) { // on success GetAllLabOrders
        console.log(res);
        $rootScope.loader = "hide";
		if (res.status == true) {
            if(res.data.length == 0){
                $('#noRecordFound').modal('show');
                return true;
            }
			$scope.labOrders = res.data;
		}else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
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
    };
    $scope.search = function(item){ // search data by patient name or partient id
        if($scope.searchHistory == undefined){
            return true;
        }else{
            if(item.patient_id.toLowerCase().indexOf($scope.searchHistory.toLowerCase()) != -1 || item.patient_name.toLowerCase().indexOf($scope.searchHistory.toLowerCase()) != -1){
                return true;
            }
        }
    };
}]).filter('cmdate', [
    '$filter', function($filter) {
        return function (input, format) {
            return $filter('date')(new Date(input), format);
        };
    }]);