var AppEHR = angular.module('AppEHR');

AppEHR.controller('dashboard', ['$scope', '$rootScope', '$window', 'DashboardCounts', function($scope, $rootScope, $window, DashboardCounts){
	$rootScope.pageTitle = "EHR - Dashboard";
	DashboardCounts.get({token: $window.sessionStorage.token}, dashboardSuccess, dashboardFailure);
	function dashboardSuccess(res){
		if(res.status == true){
			console.log(res);
			$scope.counts = res.data;
		}
	}

	function dashboardFailure(error){
		console.log(error);
	}
}]);