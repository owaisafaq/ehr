var AppEHR = angular.module('AppEHR');

AppEHR.controller('dashboard', ['$scope', '$rootScope', '$window', 'DashboardCounts', 'GetTodayAppointments', 'GetTodayEncounters', function($scope, $rootScope, $window, DashboardCounts, GetTodayAppointments, GetTodayEncounters){
	$rootScope.pageTitle = "EHR - Dashboard";
	$rootScope.loader = "show";
	$scope.appointments = [];
	$scope.itemsPerPage = 5;
	$scope.date = new Date();
	var month = new Array();
	month[0] = "January";
	month[1] = "February";
	month[2] = "March";
	month[3] = "April";
	month[4] = "May";
	month[5] = "June";
	month[6] = "July";
	month[7] = "August";
	month[8] = "September";
	month[9] = "October";
	month[10] = "November";
	month[11] = "December";
	$scope.month = month[$scope.date.getMonth()];
	$scope.date = $scope.date.getDate() + " " + month[$scope.date.getMonth()] + " " + $scope.date.getFullYear();
	console.log($scope.date);
	DashboardCounts.get({token: $window.sessionStorage.token}, dashboardSuccess, dashboardFailure);
	function dashboardSuccess(res){
		$rootScope.loader = "hide";
		if(res.status == true){
			console.log(res);
			$scope.counts = res.data;
		}
	}

	function dashboardFailure(error){
		$rootScope.loader = "hide";
		$('#internetError').modal('show');
		console.log(error);
	}
	GetTodayAppointments.get({
		token: $window.sessionStorage.token,
		offset: 0, 
		limit: $scope.itemsPerPage
	}, todayAppointmentsSuccess, dashboardFailure);
	function todayAppointmentsSuccess(res){
		$rootScope.loader = "hide";
		if(res.status == true){
			console.log(res, 'appointment');
			$scope.appointments = res.data;
			$scope.appointmentCount = res.count;
		}
	}
	$scope.curPage = 0;
    $scope.pageSize = 15;
    $scope.numberOfPages = function() {
      return Math.ceil($scope.appointmentCount / $scope.pageSize);
    };

    $scope.paginationNext = function(pageSize, curPage){
        $rootScope.loader = "show";
        GetTodayAppointments.get({
            token: $window.sessionStorage.token,
            offset: (pageSize * curPage), limit: $scope.itemsPerPage
        }, todayAppointmentsSuccess, dashboardFailure);
    }

    $scope.paginationPrev = function(pageSize, curPage){
        $rootScope.loader = "show";
        GetTodayAppointments.get({
            token: $window.sessionStorage.token,
            offset: (pageSize * curPage), limit: $scope.itemsPerPage
        }, todayAppointmentsSuccess, dashboardFailure);
    }
	// Encoutners
    GetTodayEncounters.get({
		token: $window.sessionStorage.token,
		offset: 0, 
		limit: $scope.itemsPerPage
	}, todayEncountersSuccess, dashboardFailure);
	function todayEncountersSuccess(res){
		$rootScope.loader = "hide";
		if(res.status == true){
			console.log(res, "encounte");
			$scope.encounters = res.data;
			$scope.EncounterCount = res.count;
		}
	}
	$scope.EcurPage = 0;
    $scope.EpageSize = 15;
    $scope.enumberOfPages = function() {
      return Math.ceil($scope.EncounterCount / $scope.EpageSize);
    };

    $scope.paginationNext = function(pageSize, curPage){
        $rootScope.loader = "show";
        GetTodayEncounters.get({
            token: $window.sessionStorage.token,
            offset: (pageSize * curPage), limit: $scope.itemsPerPage
        }, todayEncountersSuccess, dashboardFailure);
    }

    $scope.paginationPrev = function(pageSize, curPage){
        $rootScope.loader = "show";
        GetTodayAppointments.get({
            token: $window.sessionStorage.token,
            offset: (pageSize * curPage), limit: $scope.itemsPerPage
        }, todayEncountersSuccess, dashboardFailure);
    }

    /*$scope.splitEncounterDate = function(dateTime){
    	if(dateTime == undefined || dateTime == '') return true;
    	dateTime = dateTime.split(' ');
    	return dateTime[1];
    }*/
}]);