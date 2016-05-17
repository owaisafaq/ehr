var AppEHR = angular.module('AppEHR', [
	'ngRoute'	
]);

AppEHR.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.
            when('/appointments-calander-view', {
                templateUrl: 'views/appointments-calender-view.html',
                controller: 'appointmentsCalenderController'
            }).
            when('/appointments-list', {
                templateUrl: 'views/appointments-list.html',
                controller: 'appointmentsListController'
            }).
            when('/clinical-documentation-clinic-progress-note', {
                templateUrl: 'views/clinical-documentation-clinic-progress-note.html',
                controller: 'clinicalDocumentationClinicProgressNote'
            }).
            when('/patient-information', {
                templateUrl: 'views/patient-info.html',
                controller: 'patientController'
            }).
            when('/patient-listing', {
                templateUrl: 'views/patient-listing.html',
                controller: 'patientListingController'
            }).
            otherwise({
                redirectTo: '/'
            });

    }]);

AppEHR.run(function($rootScope, $location, $window) {
    $rootScope.addItem = "";
    $rootScope.editItem = "";
    $rootScope.controller = "";
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        $rootScope.addItem = "";
        $rootScope.editItem = "";
        $rootScope.controller = "";
        if(next.$$route != undefined){    
            $rootScope.controller = next.$$route.controller + "Edit";
            $rootScope.addItem = "views/" + next.$$route.originalPath.replace("/", "") + ".html";
            $rootScope.editItem = "views/" + next.$$route.originalPath.replace("/", "") + ".html";
        }
    });
  });