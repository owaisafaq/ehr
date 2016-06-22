var AppEHR = angular.module('AppEHR');

AppEHR.controller('labOrderListing', ['$scope', '$rootScope', 'GetAllLabOrders', '$window', '$routeParams','getLabOrderInfo', function ($scope, $rootScope, GetAllLabOrders, $window, $routeParams,getLabOrderInfo) {
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
        $rootScope.loader = "show";
        getLabOrderInfo.get({token: $window.sessionStorage.token, order_id: orderID}, getLabOrderInfoSuccess, getLabOrderInfoFailure);
        function getLabOrderInfoSuccess(res) {
            if (res.status == true) {
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
                //$scope.showStrip = true;
                //$scope.dataStrip = "custom-card";
            }
        }

        function getLabOrderInfoFailure(error) {
            $rootScope.loader = "show";
            console.log(error);
        }
    }
}]);