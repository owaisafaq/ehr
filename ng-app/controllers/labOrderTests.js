var AppEHR = angular.module('AppEHR');

AppEHR.controller('labOrderTest', ['$scope', '$rootScope', 'GetAllLabOrders', '$window', '$routeParams','getLabOrderInfo','cancelLabOrder', '$timeout', '$location', function ($scope, $rootScope, GetAllLabOrders, $window, $routeParams,getLabOrderInfo,cancelLabOrder, $timeout, $location) {
	$rootScope.pageTitle = "EHR - Lab Order Test";
    $scope.action = "";

    $scope.search = function(item){
        if($scope.searchLab == undefined){
            return true;
        }else{
            if(item.patient_id.toLowerCase().indexOf($scope.searchLab.toLowerCase()) != -1 || item.patient_name.toLowerCase().indexOf($scope.searchLab.toLowerCase()) != -1){
                return true;
            }
        }
    };

}]);