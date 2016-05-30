var AppEHR = angular.module('AppEHR');
AppEHR.controller('wardsBedOccupancyController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
        $rootScope.pageTitle = "EHR - Wards Bed Occupacy";
        $scope.columns = [{field: 'sn', width: '4%'}, {field: 'speciality'}, {field: 'ward'}, {field: 'total beds'}, {field: 'available beds'}, {field: 'closed/unavailable'}, {field: 'occupied beds'}, {field: 'patients waiting for beds'}, {field: 'expected discharge'}];
        $scope.gridOptions = {
            paginationPageSizes: [20, 50, 75],
            paginationPageSize: 20,
            enableVerticalScrollbar: 0,
            enableHorizontalScrollbar: 0,
            columnDefs: $scope.columns,
            enableColumnMenus: false,
        };
//        $scope.gridOptions.onRegisterApi = function (gridApi) {
//            $scope.gridApi2 = gridApi;
//        }
//        $scope.gridOptions.data = $scope.myData;
        $http.get('data/100.json')
                .success(function (data) {
                    $scope.gridOptions.data = data;
                });
    }]);