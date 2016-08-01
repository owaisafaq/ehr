var AppEHR = angular.module('AppEHR');
AppEHR.controller('wardsBedOccupancyController', ['$scope', '$rootScope', '$window', '$routeParams', 'BedOccupancy', function ($scope, $rootScope, $window, $routeParams, BedOccupancy) {
    $rootScope.pageTitle = "EHR - Wards Bed Occupacy";
    $scope.allBedOccupancy = [];
    $scope.itemsPerPage = 15;
    BedOccupancy.get({
        token: $window.sessionStorage.token, 
        ward_id: $routeParams.wardID,
        offset: 0,
        limit: $scope.itemsPerPage
    }, bedOccupanySuccess, bedOccupanyFailure);
    function bedOccupanySuccess(res){
        if(res.status == true){
            if(res.data.length == 0){
                $scope.modalHeading = "Result";
                $scope.modalMessage = "No Record Found";
                $('#noResultFound').modal('show');
                return true;
            }
            $scope.allBedOccupancy = res.data;
            $scope.bedCount = res.count;
        }
    }

    function bedOccupanyFailure(error){
        console.log(error);
    }
    $scope.curPage = 0;
    $scope.pageSize = 15;
    $scope.numberOfPages = function() {
      return Math.ceil($scope.bedCount / $scope.pageSize);
    };

    $scope.paginationNext = function(pageSize, curPage){
        $rootScope.loader = "show";
        BedOccupancy.get({
            token: $window.sessionStorage.token,
            offset: (pageSize * curPage), limit: $scope.itemsPerPage
        }, bedOccupanySuccess, bedOccupanyFailure);
    }

    $scope.paginationPrev = function(pageSize, curPage){
        $rootScope.loader = "show";
        BedOccupancy.get({
            token: $window.sessionStorage.token,
            offset: (pageSize * curPage), limit: $scope.itemsPerPage
        }, bedOccupanySuccess, bedOccupanyFailure);
    }
}]);