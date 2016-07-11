var AppEHR = angular.module('AppEHR', [
    'ngRoute', 'ngResource',
    'ngTouch', 'ui.grid', 'ui.grid.pagination', 'ngFileUpload', 'angular.filter', 'ui.bootstrap', 'fg', 'ngSanitize', 'markdown'
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
                    templateUrl: 'views/appointments-calender-view.html',
                    controller: 'appointmentsCalenderController'
                }).
                when('/appointments-list', {
                    templateUrl: 'views/ppointments-list.html',
                    controller: 'appointmentsListController'
                }).
                when('/clinical-documentation-clinic-progress-note/:patientID', {
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
                when('/lab-order-tests/:orderID', {
                    templateUrl: 'views/lab-order-tests.html',
                    controller: 'labOrderTests'
                }).
                when('/lab-order-history', {
                    templateUrl: 'views/lab-order-history.html',
                    controller: 'labOrderHistory'
                }).
                when('/lab-order-reporting', {
                    templateUrl: 'views/lab-order-reporting.html',
                    controller: 'labOrderReporting'
                }).
                when('/lab-test-report/:testID', {
                    templateUrl: 'views/lab-test-report.html',
                    controller: 'labTestReport'
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
                when('/inventory', {
                    templateUrl: 'views/inventory.html',
                    controller: 'Inventory'
                }).
                when('/pharmacy', {
                    templateUrl: 'views/pharmacy.html',
                    controller: 'pharmacy'
                }).
                when('/pharmacy-prescription', {
                    templateUrl: 'views/pharmacy-prescription.html',
                    controller: 'pharmacyPrescription'
                }).
                when('/settings-temp', {
                    templateUrl: 'views/settings-temp.html',
                    controller: 'settings-temp'
                }).
                when('/settings', {
                    templateUrl: 'views/settings.html',
                    controller: 'settings'
                }).
                when('/billing', {
                    templateUrl: 'views/billing.html',
                    controller: 'billing'
                }).
                when('/pharmacy-view/:patientID/:encounterID', {
                    templateUrl: 'views/pharmacy-view.html',
                    controller: 'pharmacyView'
                }).
                when('/billing-invoice-print/:invoiceID', {
                    templateUrl: 'views/billing-invoice-print.html',
                    controller: 'billing-invoice-print'
                }).
                when('/billing-codes', {
                    templateUrl: 'views/billing-codes.html',
                    controller: 'billing-codes'
                }).
                when('/templates', {
                    templateUrl: 'views/template.html',
                    controller: 'templates'
                }).
                otherwise({
                    redirectTo: '/error'
                });

    }]);
AppEHR.run(function ($rootScope, $location, $window) {
    if (sessionStorage.length == 0) {
        console.log(1111111111111111);
//            var path = $location.$$path;
//            if ((path == "/login" || path == "/") && path != undefined) {
//                $location.path("patient-registration/");
//            }
//        } else {
        $location.path("login");
    }
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
        console.log("here")
        console.log(localStorage.getItem('sessionStorage'))







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
        // transfers sessionStorage from one tab to another
        var sessionStorage_transfer = function (event) {
            console.log("working")
            console.log(sessionStorage)
            if (!event) {
                event = window.event;
            } // ie suq
            if (!event.newValue)
                return;          // do nothing if no value to work with
            if (event.key == 'getSessionStorage') {
                console.log("working if")
                // another tab asked for the sessionStorage -> send it
                localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
                // the other tab should now have it, so we're done with it.
                localStorage.removeItem('sessionStorage');  // <- could do short timeout as well.
            } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
                console.log("working else")
                // another tab sent data <- get it
                var data = JSON.parse(event.newValue);
                for (var key in data) {
                    sessionStorage.setItem(key, data[key]);
                }

                if (sessionStorage.email != undefined && sessionStorage.email != 'undefined' && sessionStorage.token != undefined && sessionStorage.token != 'undefined' && sessionStorage.role_id != undefined && sessionStorage.role_id != 'undefined') {
                    var path = $location.$$path;
                    if ((path == "/login" || path == "/") && path != undefined) {
                        $location.path("patient-registration/");
                    }
                } else {
                    $location.path("login");
                }


            }
        }
        // listen for changes to localStorage
        if (window.addEventListener) {
            console.log("working 1")
            console.log(sessionStorage)
            window.addEventListener("storage", sessionStorage_transfer, false);
        } else {
            console.log("working 1 else")
            window.attachEvent("onstorage", sessionStorage_transfer);
        }
        // Ask other tabs for session storage (this is ONLY to trigger event)
        if (!sessionStorage.length) {
            console.log("working 2")
            console.log(sessionStorage)
            localStorage.setItem('getSessionStorage', 'foobar');
            localStorage.removeItem('getSessionStorage', 'foobar');
        }


        $('.select-date').datepicker({autoclose: true, todayHighlight: true, format: 'yyyy-mm-dd'});
        $('select').not('.select_searchFields,.search-ajax').select2({minimumResultsForSearch: Infinity});
        $('.select_searchFields').select2();
        $(".maskPhone").inputmask("99-9999999");
        $(".maskMobile").inputmask("99999999999");
        $('.timepicker').timepicker();
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
    $rootScope.html = '<script src="assets/js/libs/bootstrap/bootstrap.min.js"></script><script src="assets/js/libs/spin.js/spin.min.js"></script><script src="assets/js/libs/autosize/jquery.autosize.min.js"></script><script src="assets/js/libs/nanoscroller/jquery.nanoscroller.min.js"></script><script src="assets/js/core/source/App.js"></script><script src="assets/js/core/source/AppNavigation.js"></script><script src="assets/js/core/source/AppOffcanvas.js"></script><script src="assets/js/core/source/AppCard.js"></script><script src="assets/js/core/source/AppForm.js"></script><script src="assets/js/core/source/AppNavSearch.js"></script><script src="assets/js/core/source/AppVendor.js"></script><script src="assets/js/libs/bootstrap-datepicker/bootstrap-datepicker.js"></script><script src="assets/js/core/demo/Demo.js"></script><script src="assets/js/core/source/script.js" type="text/javascript"></script><script src="assets/js/libs/select2/select2.min.js" type="text/javascript"></script><script src="assets/js/libs/inputmask/jquery.inputmask.bundle.min.js"></script><script src="assets/js/libs/bootstrap-timepicker/bootstrap-timepicker.js" type="text/javascript"></script>';

});
AppEHR.filter('capitalize', function () {
    return function (input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});
