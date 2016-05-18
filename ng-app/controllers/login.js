var AppEHR = angular.module('AppEHR');

AppEHR.controller('loginController', ['$scope', '$window', function($scope, $window){
	$scope.pageTitle = "EHR - Login";
	$window.sessionStorage.clear();
	
	$scope.login = function (email, password){
		console.log(email + "-" + password);
		if(email != undefined && password != undefined){
			console.log("Login");
			$scope.errorMessage = '';
			$window.sessionStorage.email = email;
			$window.sessionStorage.password = password;
			console.log($window.sessionStorage.password);
			$window.location.href = '#/patient-registration';
		}else{
			$scope.errorMessage = "Email or Password is invalid";
		}
	};
}]);