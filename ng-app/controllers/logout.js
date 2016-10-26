var AppEHR = angular.module('AppEHR');

AppEHR.controller('logoutController', ['$scope', '$window', 'AUTH', '$rootScope', function($scope, $window, AUTH, $rootScope){
	$scope.pageTitle = "EHR - Login";
	$window.sessionStorage.clear();
	$rootScope.class = "hide";
	$scope.errorMessage = '';
	$scope.login = function (email, password){
		$scope.preLoader = true;
		$scope.loginButton = true;
		if(email != undefined && password != undefined){
			AUTH.get({}, {email: email, password: password}, authSuccess, authFailed);
			function authSuccess(res){
				if(res.status == true){
					$scope.errorMessage = '';
					$window.sessionStorage.email = res.data.email;
					$window.sessionStorage.name = res.data.name;
					$window.sessionStorage.role_id = res.data.role_id;
					$window.sessionStorage.source_id = res.data.source_id;
					$window.sessionStorage.token = res.token;
					$scope.preLoader = false;
					$window.sessionStorage.roles = JSON.stringify(res.roles);
					$rootScope.ROLES = JSON.parse($window.sessionStorage.roles);
					console.log($window.sessionStorage.roles);
					console.log($rootScope.ROLES);
					$window.location.href = '#/dashboard';
				}else{
					$scope.preLoader = false;
					$scope.loginButton = false;
					$scope.errorMessage = errorMessages.authFailed;
				}
			}
			function authFailed(error){
				$scope.errorMessage = "Internet Connection Lost";
				$scope.loginButton = false;
				$scope.preLoader = false;
				//$('#internetError').modal('show');
			}
		}else if(email == undefined){
			$scope.preLoader = false;
			$scope.loginButton = false;
			$scope.errorMessage = "Invalid email";
		}else{
			$scope.preLoader = false;
			$scope.loginButton = false;
			$scope.errorMessage = errorMessages.fieldRequired;
		}
	};
}]);