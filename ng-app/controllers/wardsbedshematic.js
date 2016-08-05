var AppEHR = angular.module('AppEHR');

AppEHR.controller('wardsBedShematicController', ['$scope', '$rootScope', '$window', '$routeParams', 'WardOccupancy', function($scope, $rootScope, $window, $routeParams, WardOccupancy){
	$rootScope.pageTitle = "EHR - Wards Bed Schematic";
	$scope.allBedOccupancy = [];
    $scope.itemsPerPage = 15;
    $scope.wardID = $routeParams.wardID;
    $rootScope.loader = "show";
	WardOccupancy.get({
		token: $window.sessionStorage.token,
		ward_id: $routeParams.wardID,
		offset: 0,
		limit: $scope.itemsPerPage
	}, bedOccupancySuccess, bedOccupancyFailure);

	function bedOccupancySuccess(res){
		$rootScope.loader = "hide";
		if(res.status == true){
			$scope.allBedOccupancy = res.data;
			$scope.bedCount = res.count;
		}
	}

	function bedOccupancyFailure(error){
		console.log(error);
        $('#internetError').modal('show');
	}

	$scope.curPage = 0;
    $scope.pageSize = 15;
    $scope.numberOfPages = function() {
      return Math.ceil($scope.bedCount / $scope.pageSize);
    };

    $scope.paginationNext = function(pageSize, curPage){
        $rootScope.loader = "show";
        WardOccupancy.get({
            token: $window.sessionStorage.token,
            ward_id: $routeParams.wardID,
            offset: (pageSize * curPage), limit: $scope.itemsPerPage
        }, bedOccupancySuccess, bedOccupancyFailure);
    }

    $scope.paginationPrev = function(pageSize, curPage){
        $rootScope.loader = "show";
        WardOccupancy.get({
            token: $window.sessionStorage.token,
            ward_id: $routeParams.wardID,
            offset: (pageSize * curPage), limit: $scope.itemsPerPage
        }, bedOccupancySuccess, bedOccupancyFailure);
    }

}]);