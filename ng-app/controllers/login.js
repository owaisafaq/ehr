var AppEHR = angular.module('AppEHR');

AppEHR.controller('loginController', ['$scope', '$window', 'AUTH', function($scope, $window, AUTH){
	$scope.pageTitle = "EHR - Login";
	$window.sessionStorage.clear();
	$scope.class = "hide";
	$scope.errorMessage = '';
	$scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
	$scope.login = function (email, password){
		console.log(email);
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
					$window.location.href = '#/patient-registration';
				}else{
					console.log(res);
					$scope.errorMessage = errorMessages.authFailed;
				}
			}
			function authFailed(error){
				console.log(error);
				$scope.errorMessage = "";
			}
			
		}else if(email == undefined){
			$scope.errorMessage = "Invalid email";
		}else{
			$scope.errorMessage = errorMessages.fieldRequired;
		}
	};
}]);