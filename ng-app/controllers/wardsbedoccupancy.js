var AppEHR = angular.module('AppEHR');
AppEHR.controller('wardsBedOccupancyController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
        $rootScope.pageTitle = "EHR - Wards Bed Occupacy";
        $scope.columns = [{field: 'sn', width: '4%'}, {field: 'speciality'}, {field: 'ward'}, {field: 'total beds'}, {field: 'available beds'}, {field: 'closed/unavailable'}, {field: 'occupied beds'}, {field: 'patients waiting for beds'}, {field: 'expected discharge'}];
//        $scope.myData = [
//            {
//                "sn": "",
//                "speciality": "Carney",
//                "ward": "Carney",
//                "total beds": "Carney",
//                "available beds": "Carney",
//                "closed/unavailable": "Carney",
//                "occupied beds": "Carney",
//                "patients waiting for beds": "Carney",
//                "expected discharge": "Carney"
//            },
//            {
//                "SN": "",
//                "SPECIALITY": "Karney",
//                "WARD": "Carney",
//                "total beds": "Carney",
//                "available beds": "Carney",
//                "closed/unavailable": "Carney",
//                "occupied beds": "Carney",
//                "patients waiting for beds": "Carney",
//                "expected discharge": "Carney"
//            }
////            {
////                "firstName": "Nancy",
////                "lastName": "Waters",
////                "company": "Fuelton",
////                "abc": "Enormo",
////                "ede": "Enormo",
////                "employed": false
////            }
//        ];
        $scope.gridOptions = {
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25,
            enableVerticalScrollbar: 0,
            enableHorizontalScrollbar: 0,
            columnDefs: $scope.columns,
            enableColumnMenus: false
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
//
//var app = angular.module('app', ['ngTouch', 'ui.grid']);
//
//app.controller('MainCtrl', ['$scope', function ($scope) {
//
//        $scope.myData = [
//            {
//                "firstName": "Cox",
//                "lastName": "Carney",
//                "company": "Enormo",
//                "employed": true
//            },
//            {
//                "firstName": "Lorraine",
//                "lastName": "Wise",
//                "company": "Comveyer",
//                "employed": false
//            },
//            {
//                "firstName": "Nancy",
//                "lastName": "Waters",
//                "company": "Fuelton",
//                "employed": false
//            }
//        ];
//    }]);