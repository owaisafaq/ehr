var AppEHR = angular.module('AppEHR', [
    'ngRoute', 'ngResource', 'ngFileUpload', 'angular.filter', 'fg', 'ngSanitize', 'markdown', 'oc.lazyLoad', 'webcam', 'omr.directives'
]);
AppEHR.config(['$httpProvider', '$routeProvider', '$locationProvider', function ($httpProvider, $routeProvider, $locationProvider) {
        $locationProvider.hashPrefix();
        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.options = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};
        $routeProvider.
                when('/', {
                    templateUrl: 'views/login.html',
                    controller: 'loginController',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q, $http) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load (["controllers/login.js"]/*{
                                files: [
                                    "global/factories.js",
                                    "controllers/login.js"
                                ]
                            }*/).then(function() {
                            });
                        }
                    }
                }).
                when('/login', {
                    templateUrl: 'views/login.html',
                    controller: 'loginController',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/login.js").then(function() {
                            });
                        }
                    }
                })
                .when('/logout', {
                    templateUrl: 'views/logout.html',
                    controller: 'logoutController',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/logout.js").then(function() {
                            });
                        }
                    }
                }).
                when('/dashboard', {
                    templateUrl: 'views/dashboard.html',
                    controller: 'dashboard',
                    //templateProvider: function() { return lazyDeferred.promise; },
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/dashboard.js").then(function() {
                            });
                        }
                    }
                }).
                when('/appointments-calander-view', {
                    templateUrl: 'views/appointments-calender-view.html',
                    controller: 'appointmentsCalenderController',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/appointmentscalenderview.js").then(function() {
                            });
                        }
                    }
                }).
                when('/appointments-list', {
                    templateUrl: 'views/appointments-list.html',
                    controller: 'appointmentsListController',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/appointmentslist.js").then(function() {
                            });
                        }
                    }
                }).
                when('/clinical-documentation-clinic-progress-note/:patientID', {
                    templateUrl: 'views/clinical-documentation-clinic-progress-note.html',
                    controller: 'clinicalDocumentationClinicProgressNote',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/clinicaldocumentationclinicprogressnote.js").then(function() {
                                /*return $ocLazyLoad.load ("controllers/labOrderListing.js").then(function() {
                                return    $ocLazyLoad.load ("controllers/radiology.js").then(function() {
                                    });
                                });*/
                            });
                        }
                    }
                }).
                when('/new-encounter-clinical-documentation', {
                    templateUrl: 'views/new-encounter-clinical-documentation.html',
                    controller: 'newEncounterClinicalDocumentationController',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/newencounterclinicaldocumentation.js").then(function() {
                            });
                        }
                    }
                }).
                when('/new-encounter-encounter-list/:encounterID/:patientID', {
                    templateUrl: 'views/new-encounter-encounter-list.html',
                    controller: 'newEncounterEncounterListController',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/newencounterencounterlist.js").then(function() {
                            });
                        }
                    }
                }).
                when('/new-encounter-patient-search', {
                    templateUrl: 'views/new-encounter-patient-search.html',
                    controller: 'newEncounterPatientSearchController',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/newencounterpatientsearch.js").then(function() {
                            });
                        }
                    }
                }).
                when('/patient-listing', {
                    templateUrl: 'views/patient-listing.html',
                    controller: 'patientListingController',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/patientlisting.js").then(function() {
                            });
                        }
                    }
                }).
                when('/patient-registration/', {
                    templateUrl: 'views/patient-registration.html',
                    controller: 'patientRegistrationController',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/patientregistration.js").then(function() {
                            });
                        }
                    }
                }).
                when('/patient-registration-update/:patientID', {
                    templateUrl: 'views/patient-registration.html',
                    controller: 'patientRegistrationController',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/patientregistration.js").then(function() {
                            });
                        }
                    }
                }).
                when('/patient-summary-demographics/:patientID/:encounterID', {
                    templateUrl: 'views/patient-summary-demographics.html',
                    controller: 'patientSummaryDemographicsController',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/patientsummarydemographics.js").then(function() {
                            });
                        }
                    }
                }).
                when('/patient-summary-demographics/:patientID', {
                    templateUrl: 'views/patient-summary-demographics.html',
                    controller: 'patientSummaryDemographicsController',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/patientsummarydemographics.js").then(function() {
                            });
                        }
                    }
                }).
                when('/ward-bed-listing', {
                    templateUrl: 'views/ward-bed-listing.html',
                    controller: 'wardBedListingController',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/wardbedlisting.js").then(function() {
                            });
                        }
                    }
                }).
                when('/wards-bed-occupancy', {
                    templateUrl: 'views/wards-bed-occupancy.html',
                    controller: 'wardsBedOccupancyController',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/wardsbedoccupancy.js").then(function() {
                            });
                        }
                    }
                }).
                when('/wards-bed-shematic/:wardID', {
                    templateUrl: 'views/wards-bed-shematic.html',
                    controller: 'wardsBedShematicController',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/wardsbedshematic.js").then(function() {
                            });
                        }
                    }
                }).
                when('/wards-discharge-summary', {
                    templateUrl: 'views/wards-discharge-summary.html',
                    controller: 'wardsDischargeSummaryController',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/wardsdischargesummary.js").then(function() {
                            });
                        }
                    }
                }).
                when('/lab-order-listing', {
                    templateUrl: 'views/lab-order-listing.html',
                    controller: 'labOrderListing',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/labOrderListing.js").then(function() {
                            });
                        }
                    }
                }).
                when('/lab-order-listing/:patientID/:encounterID', {
                    templateUrl: 'views/lab-order-listing.html',
                    controller: 'labOrderListing',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/labOrderListing.js").then(function() {
                            });
                        }
                    }
                }).
                when('/lab-order-tests/:orderID', {
                    templateUrl: 'views/lab-order-tests.html',
                    controller: 'labOrderTests',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/labOrderTests.js").then(function() {
                            });
                        }
                    }
                }).
                when('/lab-order-history', {
                    templateUrl: 'views/lab-order-history.html',
                    controller: 'labOrderHistory',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/labOrderHistory.js").then(function() {
                            });
                        }
                    }
                }).
                when('/lab-order-reporting', {
                    templateUrl: 'views/lab-order-reporting.html',
                    controller: 'labOrderReporting',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/labOrderReporting.js").then(function() {
                            });
                        }
                    }
                }).
                when('/lab-test-report/:testID/:labtestid', {
                    templateUrl: 'views/lab-test-report.html',
                    controller: 'labTestReport',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/labTestReport.js").then(function() {
                            });
                        }
                    }
                }).
                when('/lab-report-parasitology', {
                    templateUrl: 'views/lab-report-parasitology.html',
                    controller: 'labReportParasitology',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/labReportParasitology.js").then(function() {
                            });
                        }
                    }
                }).
                when('/lab-report-haematology', {
                    templateUrl: 'views/lab-report-haematology.html',
                    controller: 'labReportHaematology',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/labReportHaematology.js").then(function() {
                            });
                        }
                    }
                }).
                when('/lab-report-haematology-lokoja', {
                    templateUrl: 'views/lab-report-haematology-lokoja.html',
                    controller: 'labReportHaematologyLokoja',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/labReportHaematology.js").then(function() {
                            });
                        }
                    }
                }).
                when('/inventory', {
                    templateUrl: 'views/inventory.html',
                    controller: 'Inventory',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/inventory.js").then(function() {
                            });
                        }
                    }
                }).
                when('/pharmacy', {
                    templateUrl: 'views/pharmacy.html',
                    controller: 'pharmacy',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/pharmacy.js").then(function() {
                            });
                        }
                    }
                }).
                when('/pharmacy-prescription/:pharmacyID', {
                    templateUrl: 'views/pharmacy-prescription.html',
                    controller: 'pharmacyPrescription',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/pharmacy-prescription.js").then(function() {
                            });
                        }
                    }
                }).
                when('/settings-temp', {
                    templateUrl: 'views/settings-temp.html',
                    controller: 'settings-temp',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/settings-temp.js").then(function() {
                            });
                        }
                    }
                }).
                when('/settings', {
                    templateUrl: 'views/settings.html',
                    controller: 'settings',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/settings.js").then(function() {
                            });
                        }
                    }
                }).
                when('/billing', {
                    templateUrl: 'views/billing.html',
                    controller: 'billing',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/billing.js").then(function() {
                            });
                        }
                    }
                }).
                when('/billing/:patientID', {
                    templateUrl: 'views/billing.html',
                    controller: 'billing',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/billing.js").then(function() {
                            });
                        }
                    }
                }).
                when('/pharmacy-view/:pharmacyID/:prescriptionID/:patientID', {
                    templateUrl: 'views/pharmacy-view.html',
                    controller: 'pharmacyView',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/pharmacy-view.js").then(function() {
                            });
                        }
                    }
                }).
                when('/billing-invoice-print/:invoiceID', {
                    templateUrl: 'views/billing-invoice-print.html',
                    controller: 'billing-invoice-print',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/billing-invoice-print.js").then(function() {
                            });
                        }
                    }
                }).
                when('/billing-codes', {
                    templateUrl: 'views/billing-codes.html',
                    controller: 'billing-codes',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/billing-codes.js").then(function() {
                            });
                        }
                    }
                }).
                when('/templates', {
                    templateUrl: 'views/template.html',
                    controller: 'templates',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/templates.js").then(function() {
                            });
                        }
                    }
                }).
                when('/clinical-progress-template', {
                    templateUrl: 'views/clinical-progress-template.html',
                    controller: 'clinicalProgressTemplate',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/clinicalprogresstemplate.js").then(function() {
                            });
                        }
                    }
                }).
                when('/patient-pool-area', {
                    templateUrl: 'views/patient-pool-area.html',
                    controller: 'patientPoolArea',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/patientpoolarea.js").then(function() {
                            });
                        }
                    }
                }).
                when('/radiology/:patientID/:encounterID', {
                    templateUrl: 'views/radiology.html',
                    controller: 'radiology',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/radiology.js").then(function() {
                            });
                        }
                    }
                }).
                when('/radiology/:patientID/:encounterID', {
                    templateUrl: 'views/radiology.html',
                    controller: 'radiology',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/radiology.js").then(function() {
                            });
                        }
                    }
                }).when('/settings-tax-rates', {
                    templateUrl: 'views/settings-tax-rates.html',
                    controller: 'settingsTaxRates',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/settings-tax-rates.js").then(function() {
                            });
                        }
                    }
                })
                .when('/settings-facility', {
                    templateUrl: 'views/settings-facility.html',
                    controller: 'settingsFacility',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/settings-facility.js").then(function() {
                            });
                        }
                    }
                })
                        .when('/settings-labs', {
                    templateUrl: 'views/settings-labs.html',
                    controller: 'settingsLabs',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/settings-labs.js").then(function() {
                            });
                        }
                    }
                }).
                        when('/settings-groups', {
                    templateUrl: 'views/settings-groups.html',
                    controller: 'settingsGroups',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/settings-groups.js").then(function() {
                            });
                        }
                    }
                }).
                        when('/settings-users', {
                    templateUrl: 'views/settings-users.html',
                    controller: 'settingsUsers',
                    resolve: {
                        load: function($templateCache, $ocLazyLoad, $q) {
                            lazyDeferred = $q.defer();
                            return $ocLazyLoad.load ("controllers/settings-users.js").then(function() {
                            });
                        }
                    }
                }).
                otherwise({
                    redirectTo: '/dashboard'
                });
        /*$locationProvider.html5Mode({
          enabled: true,
          requireBase: false
        });*/
    }]);
AppEHR.run(function ($rootScope, $location, $window, AddEncounter, DropDownData, $timeout, $routeParams) {
    $rootScope.pageTitle = "EHR";
    if (sessionStorage.length == 0) {
        //console.log(1111111111111111);
        //            var path = $location.$$path;
        //            if ((path == "/login" || path == "/") && path != undefined) {
        //                $location.path("patient-registration/");
        //            }
        //        } else {
        $location.path("login");
    }
    if($window.sessionStorage.roles != undefined)
        $rootScope.ROLES = JSON.parse($window.sessionStorage.roles);
        console.log($rootScope.ROLES);
    $rootScope.RolesAccess = function(msg){
        if(!$('#rolesAccess').hasClass('in')){
            $rootScope.rolesAccessMsg = msg;
            $('#rolesAccess').modal('show');
        }
    }

    //$rootScope.SelectedPatientAfterSearch = false;
    $rootScope.encounterHeaderSearchBar = true;
    $rootScope.headerPatientSearch = serverPath;
    $('#autocomplete2').on('input', function(){
        var input = $('#autocomplete2').val();
        if(input != undefined || input != ''){
            if(input.length == 0){
                $('.headerWithSwitchingImages').addClass('ng-hide');
                $('.headerWithSwitchingImages1').removeClass('ng-hide');
            }else{
                $.ajax({
                    url: $('#autocomplete2').data('source'),
                    dataType: "json",
                    type: "POST",
                    delay: 500,
                    minLength: 2,
                    data: {name: input},
                    success: function (patients) {
                        //if(patients.status == true){
                            $("#autocomplete2").autocomplete({
                                source: function (request, response) {
                                    if(patients.status == true){
                                        response($.map(patients.data, function (value, key) {
                                            return {
                                                label: value.first_name == "" || value.first_name == undefined ? "No patient found" : value.first_name + " " + value.last_name,
                                                value: value.patient_id == "" ? '0' : value.patient_id
                                            }
                                        }));
                                        patients.data = [];
                                    }else{
                                        //patients.data = [];
                                        response({label:"No Patient Found"});
                                        /*$( "#autocomplete2" ).autocomplete( "close" );
                                        response($.map(patients.data, function (value, key) {
                                            return {
                                                label: "No patient found",
                                                value: ''
                                            }
                                        }));*/
                                        patients.data = [];
                                    }
                                },
                                select: function(event, ui) {
                                    if(ui.item.value.length > 8){
                                        console.log("itsmine");
                                        $('#autocomplete2').val('');
                                    }else{
                                        $('#autocomplete2').val(ui.item.label);
                                        var selectId = ui.item.value;
                                        console.log(ui.item.value, ui.item.label);
                                       //$rootScope.searchPatientForEncounterModal = ui.item.value +" - "+ ui.item.label;
                                        $("#findPatientEncounterHeader").val(ui.item.value +" - "+ ui.item.label);
                                        //$rootScope.HEADERSEARCHPATIENTID = selectId;
                                        getter(selectId);
                                        $('.headerWithSwitchingImages').removeClass('ng-hide');
                                        $('.headerWithSwitchingImages').removeClass('hide');
                                        $('.headerleftOptions').removeClass('ng-hide');
                                    }
                                    //window.location.href = "#/patient-summary-demographics/"+selectId;
                                    return false;
                                }
                            });
                        //}
                    }
                });
            }
        }
    });
    function getter(value){
        $rootScope.HEADERSEARCHPATIENTID = value;
    }
    $rootScope.medicalHistoryheaderBar = function(){
        $('.create_counter_header').addClass('hide');
        $('#autocomplete2').val('');
        $('.headerWithSwitchingImages').addClass('hide');
        $('.headerWithSwitchingImages1').removeClass('hide');
        $window.location.href = "#/patient-summary-demographics/"+$rootScope.HEADERSEARCHPATIENTID;
    }
    $rootScope.billingheaderBar = function(){
        $('.create_counter_header').addClass('hide');
        $('#autocomplete2').val('');
        $('.headerWithSwitchingImages').addClass('hide');
        $('.headerWithSwitchingImages1').removeClass('hide');
        $window.location.href = "#/billing/"+$rootScope.HEADERSEARCHPATIENTID;
    }
    
    $rootScope.encounterHeaderBar = function(){
        //console.log('ookok');

        $rootScope.headerHideLoader = "hide";
        $rootScope.encounterHeaderSearchBar = false;
        $('.headerEncounter').removeClass('hide');
        $('.headerEncounter').removeClass('ng-hide');
        $('.headerEncounter').removeClass('show');
        $('.headerEncounter > .counter_pop').css('display', "block");
        //$('.create_counter_header').addClass('show');
        DropDownData.get({token: $window.sessionStorage.token, patient_id: $window.sessionStorage.patient_id}, dropDownSuccess, dropDownFailed);
        function dropDownSuccess(res){
            if(res.status == true){
                $rootScope.headerEncountersDropdownData = res.data;
                //console.log($rootScope.headerEncountersDropdownData);
            }
        }
        function dropDownFailed(error){
            console.log(error);
        }
    }
    $rootScope.dismissHeaderEncounterModal = function(){
        $('.headerEncounter').addClass('hide');
        $('.headerEncounter > .counter_pop').css('display', "none");
        $('.headerWithSwitchingImages').addClass('hide');
        //$rootScope.encounterHeaderSearchBar = true;
    }
    $('#findPatientEncounterHeader').on('input', function(){
        var input = $('#findPatientEncounterHeader').val();
        if(input != undefined || input != ''){
            if(input.length == 0){
                $('.headerWithSwitchingImages').addClass('ng-hide');
                $('.headerWithSwitchingImages1').removeClass('ng-hide');
            }else{
                $.ajax({
                    url: serverPath + "search_patient_without_encounters",
                    dataType: "json",
                    type: "POST",
                    delay: 500,
                    minLength: 2,
                    data: {name: input, token: $window.sessionStorage.token},
                    success: function (patients) {
                        $("#findPatientEncounterHeader").autocomplete({
                            source: function (request, response) {
                                if(patients.status == true){
                                    response($.map(patients.data, function (value, key) {
                                        return {
                                            label: value.first_name == "" || value.first_name == undefined ? "No patient found" : value.patient_id + " - " + value.first_name + " " + value.last_name,
                                            value: value.patient_id == "" ? '0' : value.patient_id
                                        }
                                    }));
                                    patients.data = [];
                                }else{
                                    response({label:"No Patient Found"});
                                    patients.data = [];
                                }
                            },
                            select: function(event, ui) {
                                $('#findPatientEncounterHeader').val(ui.item.label);
                                console.log(ui.item.label);
                                $scope.addEncounter.appointmentSearch = ui.item.label;
                                $scope.selectedPatientIDForEncounter = $scope.addEncounter.appointmentSearch.split(' - ');
                                $scope.addEncounter.selectedPatientID = $scope.selectedPatientIDForEncounter[0];
                                return false;
                            }
                        });
                    }
                });
            }
        }
    });
    $rootScope.headerEncounterAdd = function(addEncounter){
        $rootScope.headerHideLoader = "show";
        $rootScope.addEncounter = {};
        $rootScope.headerSubmitted = false;
        AddEncounter.save({
            token: $window.sessionStorage.token, 
            patient_id: $rootScope.HEADERSEARCHPATIENTID,
            department_id: addEncounter.department,
            encounter_class: addEncounter.class == undefined ? '' : addEncounter.class,
            encounter_type: addEncounter.type == undefined ? '' : addEncounter.type,
            reason_of_visit: addEncounter.describeWTS == undefined ? '' : addEncounter.describeWTS,
            whom_to_see: addEncounter.wts == undefined ? '' : addEncounter.wts,
            decscribe_whom_to_see : addEncounter.describeWTS == undefined ? '' : addEncounter.describeWTS
        }, encounterSuccess, encounterFailed);
        function encounterSuccess(res){
            if(res.status == true){
                //console.log(res);
                $rootScope.headerHideLoader = "hide";
                $rootScope.headerMessageType = "alert-success";
                $rootScope.headerErrorMessage = res.message;
                $rootScope.headerErrorSymbol = "fa fa-check";// 
                $rootScope.headerMessage = true;
                $rootScope.headerSubmitted = false;
                //$rootScope.secondOptionsEnable = true;
                $('.headerWithSwitchingImages').addClass('hide');
                //$('.headerWithSwitchingImages').addClass('show');
                $('#autocomplete2').val('');
                //$window.location.href = "#/new-encounter-encounter-list/"+res.visit_id+"/"+$rootScope.HEADERSEARCHPATIENTID;
                $timeout(function(){
                    $rootScope.headerMessage = false;
                    //$rootScope.secondOptionsEnable = true;
                    $rootScope.encounterHeaderSearchBar = true;
                    $('.create_counter_header').addClass('hide');
                    $('.headerEncounter').removeClass('hide');
                    $('.headerEncounter').removeClass('ng-hide');
                    $('.headerEncounter > .counter_pop').css('display', "none");
                }, 2000);
                //console.log($rootScope.secondOptionsEnable, "----");
                //$rootScope.secondOptionsEnable = true;
            }else if(res.error_code == 500){
                console.log(res);
                $rootScope.RolesAccess(res.message);
            }else{
                $rootScope.headerHideLoader = "hide";
                $rootScope.headerMessageType = "alert-danger";
                $rootScope.headerErrorMessage = res.message;
                $rootScope.headerErrorSymbol = "fa fa-times";//
                $rootScope.headerMessage = true;
                $timeout(function () {
                    $rootScope.headerMessage = false;
                }, 2000);
            }
        }
        function encounterFailed(error){
            console.log(error);
        }
    }

    $rootScope.internetError = function(){
        $rootScope.loader = "show";
        location.reload();
        //$location.path($location.$$path);
        //$window.location.href = "#"+$location.$$path
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
        if ($window.sessionStorage.email != undefined && $window.sessionStorage.email != 'undefined' && $window.sessionStorage.token != undefined && window.sessionStorage.token != 'undefined' && $window.sessionStorage.role_id != undefined && window.sessionStorage.role_id != 'undefined') {
            var path = $location.$$path;
            //console.log($rootScope.ROLES, 'path');
            if ((path == "/login" || path == "/") && path != undefined) {
                $location.path("dashboard");
            }/*else if(path.slice(0, -9) == "/patient-summary-demographics" && $rootScope.ROLES.Patient_records_Summary == undefined){
                $rootScope.RolesAccess('No Role Assigned to the User');
                $location.path("dashboard");
            }*/
        } else $location.path("login");
        //console.log("here")
        //console.log(localStorage.getItem('sessionStorage'))
        $rootScope.PI = {};
    });
    $rootScope.loadView = function (object) {
        $('.create_counter_header').addClass('hide');
        $window.location.href = '#/patient-listing/';
    }
    $rootScope.logout = function () {
        $window.sessionStorage.clear();
        $window.location.href = '#/login';
    }
    
    $rootScope.loader = "";
    
    $rootScope.$on('$viewContentLoaded', function () {
        $rootScope.mainLoader = "hide";
            $(".scrollbar").mCustomScrollbar();
            $(".scroll-container").mCustomScrollbar();
        // transfers sessionStorage from one tab to another
        var sessionStorage_transfer = function (event) {
            //console.log("working")
            //console.log(sessionStorage)
            if (!event) {
                event = window.event;
            } // ie suq
            if (!event.newValue)
                return;          // do nothing if no value to work with
            if (event.key == 'getSessionStorage') {
                //console.log("working if")
                // another tab asked for the sessionStorage -> send it
                localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
                // the other tab should now have it, so we're done with it.
                localStorage.removeItem('sessionStorage');  // <- could do short timeout as well.
            } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
                //console.log("working else")
                // another tab sent data <- get it
                var data = JSON.parse(event.newValue);
                for (var key in data) {
                    sessionStorage.setItem(key, data[key]);
                }

                if (sessionStorage.email != undefined && sessionStorage.email != 'undefined' && sessionStorage.token != undefined && sessionStorage.token != 'undefined' && sessionStorage.role_id != undefined && sessionStorage.role_id != 'undefined') {
                    var path = $location.$$path;
                    if ((path == "/login" || path == "/") && path != undefined) {
                        $location.path("dashboard");
                    }
                } else {
                    $location.path("login");
                }


            }
        }
        // listen for changes to localStorage
        if (window.addEventListener) {
            //console.log("working 1")
            //console.log(sessionStorage)
            window.addEventListener("storage", sessionStorage_transfer, false);
        } else {
            //console.log("working 1 else")
            window.attachEvent("onstorage", sessionStorage_transfer);
        }
        // Ask other tabs for session storage (this is ONLY to trigger event)
        if (!sessionStorage.length) {
            //console.log("working 2")
            //console.log(sessionStorage)
            localStorage.setItem('getSessionStorage', 'foobar');
            localStorage.removeItem('getSessionStorage', 'foobar');
        }
        setTimeout(function (){$('.select2-input').attr("placeholder", "Type Here");},5000)

        var date = new Date();
        date.setDate(date.getDate()-1);
        $('.select-dateAge').datepicker({autoclose: true, todayHighlight: true, format: 'dd-mm-yyyy', endDate: date});
        $('.select-date').datepicker({autoclose: true, todayHighlight: true, format: 'yyyy-mm-dd'});
        $('select').not('.select_searchFields,.search-ajax,.chosen-select, #autoship_option').select2({minimumResultsForSearch: Infinity});
        $('.select_searchFields').select2();
        $(".infoNationality").select2('data', {id: '97', text: 'Nigarian'});
        $(".addressCountry").select2('data', {id: '97', text: 'Nigeria'});
        $(".kinCountry").select2('data', {id: '97', text: 'Nigeria'});
        $(".employerCountry").select2('data', {id: '97', text: 'Nigeria'});
        $(".maskPhone").inputmask("99-9999999");
        $(".maskMobile").inputmask("99999999999");
//        $(".maskCost").inputmask({mask: "9999.99", numericInput: true,placeholder:" ", rightAlignNumerics: false,maxlength: false,greedy:false});
        $(".maskCost").inputmask({mask:"9{1,8}.99",placeholder:" ", rightAlignNumerics: true});
        $('.timepicker').timepicker();
        $(".search-ajax").select2({
            placeholder: 'Select Patient',
            ajax: {
                url: serverPath+"search_patient",
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
                            //console.log(item);
                            myResults.push({
                                'id': item.id,
                                'text': item.first_name + " " + item.last_name
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
        
        $(".search-ajax-appointment").select2({
            placeholder: 'Select Patient',
            ajax: {
                url: serverPath+"search_patient",
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
                            //console.log(item);
                            myResults.push({
                                'id': item.id,
                                'text': 'P'+item.patient_id + " "+ item.first_name + " " + item.last_name
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

        $(".search-ajax-receipt").select2({
            placeholder: '',
            ajax: {
                url: serverPath+"search_patient_bill",
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
                            //console.log(item);
                            myResults.push({
                                'id': item.receipt_id,
                                'text': item.receipt_id + " "+ item.patient_name
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
        
        $(".encounter-search-bar, .get-patient-search-bar").select2({
            placeholder: 'Search Patient',
            ajax: {
                url: serverPath+"search_patient",
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
                                'text': item.first_name + " " + item.last_name
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
    $rootScope.html = '<script src="assets/js/libs/jquery-ui/jquery-ui.min.js"></script><script src="assets/js/libs/bootstrap/bootstrap.min.js"></script><script src="assets/js/libs/spin.js/spin.min.js"></script><script src="assets/js/libs/autosize/jquery.autosize.min.js"></script><script src="assets/js/libs/nanoscroller/jquery.nanoscroller.min.js"></script><script src="assets/js/core/source/App.js"></script><script src="assets/js/core/source/AppNavigation.js"></script><script src="assets/js/core/source/AppOffcanvas.js"></script><script src="assets/js/core/source/AppCard.js"></script><script src="assets/js/core/source/AppForm.js"></script><script src="assets/js/core/source/AppNavSearch.js"></script><script src="assets/js/core/source/AppVendor.js"></script><script src="assets/js/libs/bootstrap-datepicker/bootstrap-datepicker.js"></script><script src="assets/js/core/source/script.js" type="text/javascript"></script><script src="assets/js/libs/select2/select2.min.js" type="text/javascript"></script><script src="assets/js/libs/inputmask/jquery.inputmask.bundle.min.js"></script><script src="assets/js/libs/bootstrap-timepicker/bootstrap-timepicker.js" type="text/javascript"></script><script src="assets/js/core/demo/Demo.js"></script><script src="assets/js/libs/moment/moment.min.js"></script><script src="assets/js/libs/fullcalendar/fullcalendar.min.js"></script><script src="assets/js/core/demo/DemoCalendar.js"></script>';
        // <script src="assets/js/core/demo/Demo.js"></script>
        // <script src="assets/js/libs/moment/moment.min.js"></script>
        // <script src="assets/js/libs/fullcalendar/fullcalendar.min.js"></script>
        // <script src="assets/js/core/demo/DemoCalendar.js"></script>
    // on change
    $rootScope.getSearchPatientForHeader = function(string){
        console.log(string);
        $rootScope.loader = "show";
        //$window.location.href = "#/patient-summary-demographics/"+string;
        $location.path("patient-summary-demographics/"+string);
        
    }
});
AppEHR.filter('capitalize', function () {
    return function (input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});
