var AppEHR = angular.module('AppEHR', [
	'ngRoute'
]);

AppEHR.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix(); 
        $routeProvider.
            when('/', {
                templateUrl: 'views/login.html',
                controller: 'loginController'
            }).
            when('/login', {
                templateUrl: 'views/login.html',
                controller: 'loginController'
            }).
            when('/appointments-calander-view', {
                templateUrl: 'views/main.html',
                controller: 'appointmentsCalenderController'
            }).
            when('/appointments-list', {
                templateUrl: 'views/main.html',
                controller: 'appointmentsListController'
            }).
            when('/clinical-documentation-clinic-progress-note', {
                templateUrl: 'views/main.html',
                controller: 'clinicalDocumentationClinicProgressNote'
            }).
            when('/new-encounter-clinical-documentation', {
                templateUrl: 'views/main.html',
                controller: 'newEncounterClinicalDocumentationController'
            }).
            when('/new-encounter-encounter-list', {
                templateUrl: 'views/main.html',
                controller: 'newEncounterEncounterListController'
            }).
            when('/new-encounter-patient-search', {
                templateUrl: 'views/main.html',
                controller: 'newEncounterPatientSearchController'
            }).
            when('/patient-listing', {
                templateUrl: 'views/main.html',
                controller: 'patientListingController'
            }).
            when('/patient-registration', {
                templateUrl: 'views/main.html',
                controller: 'patientRegistrationController'
            }).
            when('/patient-summary-demographics', {
                templateUrl: 'views/main.html',
                controller: 'patientSummaryDemographicsController'
            }).
            when('/ward-bed-listing', {
                templateUrl: 'views/main.html',
                controller: 'wardBedListingController'
            }).
            when('/wards-bed-occupancy', {
                templateUrl: 'views/main.html',
                controller: 'wardsBedOccupancyController'
            }).
            when('/wards-bed-shematic', {
                templateUrl: 'views/main.html',
                controller: 'wardsBedShematicController'
            }).
            when('/wards-discharge-summary', {
                templateUrl: 'views/main.html',
                controller: 'wardsDischargeSummaryController'
            }).
            otherwise({
                redirectTo: '/error'
            });
    }]);
AppEHR.run(function($rootScope, $location, $window) {
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        if ($window.sessionStorage.email != undefined && $window.sessionStorage.email != 'undefined' && $window.sessionStorage.password != undefined && window.sessionStorage.password != 'undefined') {
            var path = $location.$$path;
            if ((path == "/login" || path == "/") && path != undefined) {
                $location.path("patient-registration");
            }
        }else $location.path("login");
    });
  });