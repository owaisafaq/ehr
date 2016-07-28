var AppEHR = angular.module('AppEHR');

AppEHR.controller('dashboard', ['$scope', '$rootScope', '$window', 'DashboardCounts', '$ocLazyLoad', '$compile', function($scope, $rootScope, $window, DashboardCounts, $ocLazyLoad, $compile){
	$rootScope.pageTitle = "EHR - Dashboard";
	/*$ocLazyLoad.load("controllers/patientlisting.js").then(function() {
        console.log('loaded!!');
        var el, elToAppend;
        //elToAppend = $compile('<say-hello to="world"></say-hello>')($scope);
        //el = angular.element('#example');
        //el.append(elToAppend);
    }, function(e) {
        console.log('errr');
        console.error(e);
    })*/
    console.log("true baba");
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