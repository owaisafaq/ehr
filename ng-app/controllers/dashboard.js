var AppEHR = angular.module('AppEHR');

AppEHR.controller('dashboard', ['$scope', '$rootScope', '$window', 'DashboardCounts', function($scope, $rootScope, $window, DashboardCounts){
	$rootScope.pageTitle = "EHR - Dashboard";
	$rootScope.loader = "show";
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
}]);