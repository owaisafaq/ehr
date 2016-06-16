var AppEHR = angular.module('AppEHR', [
    'ngRoute', 'ngResource',
    'ngTouch', 'ui.grid', 'ui.grid.pagination', 'ui.grid.pagination', 'ngFileUpload'
]);
AppEHR.config(['$httpProvider', '$routeProvider', '$locationProvider',
    function ($httpProvider, $routeProvider, $locationProvider) {
        $locationProvider.hashPrefix();
        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};
        //$locationProvider.html5Mode(true);
        $routeProvider.
                when('/', {
                    templateUrl: 'views/patient-registration.html',
                    controller: 'loginController'
                }).
                when('/login', {
                    templateUrl: 'views/login.html',
                    controller: 'loginController'
                }).
                when('/appointments-calander-view', {
                    templateUrl: 'views/appointments-calander-view.html',
                    controller: 'appointmentsCalenderController'
                }).
                when('/appointments-list', {
                    templateUrl: 'views/ppointments-list.html',
                    controller: 'appointmentsListController'
                }).
                when('/clinical-documentation-clinic-progress-note', {
                    templateUrl: 'views/clinical-documentation-clinic-progress-note.html',
                    controller: 'clinicalDocumentationClinicProgressNote'
                }).
                when('/new-encounter-clinical-documentation', {
                    templateUrl: 'views/new-encounter-clinical-documentation.html',
                    controller: 'newEncounterClinicalDocumentationController'
                }).
                when('/new-encounter-encounter-list/:encounterID/:patientID', {
                    templateUrl: 'views/new-encounter-encounter-list.html',
                    controller: 'newEncounterEncounterListController'
                }).
                when('/new-encounter-patient-search', {
                    templateUrl: 'views/new-encounter-patient-search.html',
                    controller: 'newEncounterPatientSearchController'
                }).
                when('/patient-listing', {
                    templateUrl: 'views/patient-listing.html',
                    controller: 'patientListingController'
                }).
                when('/patient-registration/', {
                    templateUrl: 'views/patient-registration.html',
                    controller: 'patientRegistrationController'
                }).
                when('/patient-registration-update/:patientID', {
                    templateUrl: 'views/patient-registration.html',
                    controller: 'patientRegistrationController'
                }).
                when('/patient-summary-demographics/:patientID', {
                    templateUrl: 'views/patient-summary-demographics.html',
                    controller: 'patientSummaryDemographicsController'
                }).
                when('/ward-bed-listing', {
                    templateUrl: 'views/ward-bed-listing.html',
                    controller: 'wardBedListingController'
                }).
                when('/wards-bed-occupancy', {
                    templateUrl: 'views/wards-bed-occupancy.html',
                    controller: 'wardsBedOccupancyController'
                }).
                when('/wards-bed-shematic', {
                    templateUrl: 'views/wards-bed-shematic.html',
                    controller: 'wardsBedShematicController'
                }).
                when('/wards-discharge-summary', {
                    templateUrl: 'views/wards-discharge-summary.html',
                    controller: 'wardsDischargeSummaryController'
                }).
                when('/lab-order-listing', {
                    templateUrl: 'views/lab-order-listing.html',
                    controller: 'labOrderListing'
                }).
                when('/lab-order-history', {
                    templateUrl: 'views/lab-order-history.html',
                    controller: 'labOrderHistory'
                }).
                when('/lab-order-reporting', {
                    templateUrl: 'views/lab-order-reporting.html',
                    controller: 'labOrderReporting'
                }).
                when('/lab-report-parasitology', {
                    templateUrl: 'views/lab-report-parasitology.html',
                    controller: 'labReportParasitology'
                }).
                when('/lab-report-haematology', {
                    templateUrl: 'views/lab-report-haematology.html',
                    controller: 'labReportHaematology'
                }).
                when('/lab-report-haematology-lokoja', {
                    templateUrl: 'views/lab-report-haematology-lokoja.html',
                    controller: 'labReportHaematologyLokoja'
                }).
                otherwise({
                    redirectTo: '/error'
                });
    }]);
AppEHR.run(function ($rootScope, $location, $window) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        if ($location.$$path != '/login' && $location.$$path != '/') {
            $rootScope.backgroundImg = "";
            $rootScope.class = "show";
        } else {
            $rootScope.backgroundImg = "wrapper";
            $rootScope.class = "hide";
        }
        $rootScope.userName = $window.sessionStorage.name;
        $rootScope.loginCheck = $location.$$path == '/login' || $location.$$path == '/' ? true : false;
        if ($window.sessionStorage.email != undefined && $window.sessionStorage.email != 'undefined' && $window.sessionStorage.token != undefined && window.sessionStorage.token != 'undefined' && $window.sessionStorage.role_id != undefined && window.sessionStorage.role_id != 'undefined') {
            var path = $location.$$path;
            if ((path == "/login" || path == "/") && path != undefined) {
                $location.path("patient-registration/");
            }
        } else
            $location.path("login");
    });
    $rootScope.loadView = function (object) {
        $window.location.href = '#/patient-registration/';
    }
    $rootScope.logout = function () {
        $window.sessionStorage.clear();
        $window.location.href = '#/login';
    }
    $rootScope.PI = {};
    $rootScope.loader = "";

    $rootScope.$on('$viewContentLoaded', function () {
        $('.select-date').datepicker({autoclose: true, todayHighlight: true, format: 'yyyy-mm-dd'});
        $('select').not('.select_searchFields,.search-ajax').select2({minimumResultsForSearch: Infinity});
        $('.select_searchFields').select2();
        $(".maskPhone").inputmask("99-9999999");
        $(".maskMobile").inputmask("99999999999");
//        var test = sessionStorage.getItem('token');
        $(".search-ajax").select2({
            placeholder: 'Select Patient',
            ajax: {
                url: "http://demoz.online/ehr/public/api/search_patient",
                delay: 250,
                type: "POST",
                data: function (params, page) {
                    return {
                        term: params,
                        name: params
                    };
                },
                results: function (data, page) {
                    var myResults = [];
                    if (data.status == false) {
                        myResults.push({
                            'text': "No Result Found"
                        });
                    }
                    else {
                        $.each(data['data'], function (index, item) {
                            myResults.push({
                                'id': item.id,
                                'text': item.first_name
                            });
                        });
                    }
                    return {
                        results: myResults
                    };
                },
                cache: true
            },
            minimumInputLength: 2,
        });
         $(".encounter-search-bar").select2({
            placeholder: 'Search Patient',
            ajax: {
                url: "http://demoz.online/ehr/public/api/search_patient",
                delay: 250,
                type: "POST",
                data: function (params, page) {
                    return {
                        term: params,
                        name: params
                    };
                },
                results: function (data, page) {
                    var myResults = [];
                    if (data.status == false) {
                        myResults.push({
                            'text': "No Result Found"
                        });
                    }
                    else {
                        $.each(data['data'], function (index, item) {
                            myResults.push({
                                'id': item.id,
                                'text': item.first_name
                            });
                        });
                    }
                    return {
                        results: myResults
                    };
                },
                cache: true
            },
            minimumInputLength: 2,
        });
//        $(document).on('click', '#nhis .add-principal', function () {
//            var id_chip = $("#get_val_principal").val();
//            if (id_chip !== "") {
//                if ($('#nhis .principal_list .chip[data-id="' + id_chip + '"').length == 0) {
//                    $('#nhis .principal_list').append('<div class="chip" data-id="' + id_chip + '">' + $('#s2id_get_val_principal .select2-chosen').html() + '<i class="md-close"></i></div>');
////                    $("#get_val_principal").val(null).trigger("change");
//                    $("#get_val_principal").select2('data', null);
//                    $('#s2id_get_val_principal').addClass('disable-after-1');
//                    $rootScope.do_valid_nhis = false;
//                }
//            }
//        });
//        $(document).on('click', '#nhis .add-dependant', function () {
//            var id_chip = $("#get_val_dependant_nhis").val();
//            if (id_chip !== "") {
//                if ($('#nhis .dependant_list .chip[data-id="' + id_chip + '"').length == 0) {
//                    $('#nhis .dependant_list').append('<div class="chip" data-id="' + id_chip + '">' + $('#s2id_get_val_dependant_nhis .select2-chosen').html() + '<i class="md-close"></i></div>');
////                    $("#get_val_principal").val(null).trigger("change");
//                    $("#get_val_dependant_nhis").select2('data', null);
////                    $('#s2id_get_val_dependant_nhis').addClass('disable-after-1');
//                }
//            }
//            else{
//                $rootScope.valid_relationship = false;
//            }
//        });
       

//        $(document).on('click', '#relationship .add-principal', function () {
//            var id_chip = $("#get_val_principal_retainer").val();
//            if (id_chip !== "") {
//                if ($('#relationship .chip[data-id="' + id_chip + '"').length == 0) {
//                    $('#relationship .principal_list').append('<div class="chip" data-id="' + id_chip + '">' + $('#s2id_get_val_principal_retainer .select2-chosen').html() + '<i class="md-close"></i></div>');
////                    $("#get_val_principal").val(null).trigger("change");
//                    $("#get_val_principal_retainer").select2('data', null);
//                    $('#s2id_get_val_principal_retainer').addClass('disable-after-1');
//                    $rootScope.do_valid = false;
//                }
//            }
//        });

        $('body').on('click', '#nhis .principal_list .chip i', function () {
            $(this).parent('.chip').fadeOut(function () {
                $(this).remove();
                $rootScope.do_valid_nhis = true;
            })
            $('#s2id_get_val_principal').removeClass('disable-after-1');
        })

        $('body').on('click', '#relationship .principal_list .chip i', function () {
            $(this).parent('.chip').fadeOut(function () {
                $(this).remove();
                $rootScope.do_valid = true;
            })
            $('#s2id_get_val_principal_retainer').removeClass('disable-after-1');
        })
        
        $('body').on('click', '.dependant_list .chip i', function () {
            $(this).parent('.chip').parent('div').fadeOut(function () {
                $(this).remove();
            })
            $('#s2id_get_val_principal_retainer').removeClass('disable-after-1');
        })
    });
    //$rootScope.html = '<div ng-include="\'utils/script-file.html\'"></div>';
    $rootScope.html = '<script src="assets/js/libs/bootstrap/bootstrap.min.js"></script><script src="assets/js/libs/spin.js/spin.min.js"></script><script src="assets/js/libs/autosize/jquery.autosize.min.js"></script><script src="assets/js/libs/nanoscroller/jquery.nanoscroller.min.js"></script><script src="assets/js/core/source/App.js"></script><script src="assets/js/core/source/AppNavigation.js"></script><script src="assets/js/core/source/AppOffcanvas.js"></script><script src="assets/js/core/source/AppCard.js"></script><script src="assets/js/core/source/AppForm.js"></script><script src="assets/js/core/source/AppNavSearch.js"></script><script src="assets/js/core/source/AppVendor.js"></script><script src="assets/js/libs/bootstrap-datepicker/bootstrap-datepicker.js"></script><script src="assets/js/core/demo/Demo.js"></script><script src="assets/js/core/source/script.js" type="text/javascript"></script><script src="assets/js/libs/select2/select2.min.js" type="text/javascript"></script><script src="assets/js/libs/inputmask/jquery.inputmask.bundle.min.js"></script>';
    
});
AppEHR.filter('capitalize', function () {
    return function (input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});
