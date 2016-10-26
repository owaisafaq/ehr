var AppEHR = angular.module('AppEHR');

AppEHR.controller('labTestReport', ['$scope', '$rootScope', '$routeParams', '$window', 'getTemplateCategories', 'getTemplates', 'getLabTestInfo', 'getTemplateData','saveTemplateValues', '$timeout', 'getLabOrderInfo', 'Upload', 'CheckoutPatient', 'UpdateLabTestValues', 'CheckLabOrderStatus', 'Dosignoff', 'orderReport', 'DropDownData', 'GetAllWardsDropDown', 'GetBedsByWard', function($scope, $rootScope, $routeParams, $window, getTemplateCategories, getTemplates, getLabTestInfo, getTemplateData, saveTemplateValues, $timeout, getLabOrderInfo, Upload, CheckoutPatient, UpdateLabTestValues, CheckLabOrderStatus, Dosignoff, orderReport, DropDownData, GetAllWardsDropDown, GetBedsByWard){
    $rootScope.loader = "show";
	$rootScope.pageTitle = "EHR - Lab Order Reporting";
    $scope.labordertestid = $rootScope.lab_order_test_id || $routeParams.labtestid;
    //console.log($rootScope.lab_order_test_id , $routeParams.labtestid, $scope.labordertestid);
    $scope.selectedTemplate = {};
    $scope.myFormData = {}; // Something to store the input at.
    $scope.mySchema = {}; // Expose the schema on the scope.
    $scope.mySchemaNewTemp = {}; // Expose the schema on the scope.
    $scope.myFormDataNewTemp = {}; // Something to store the input at.
    getLabTestInfo.get({ // Getting All Information about Test
        token : $window.sessionStorage.token,
        lab_test_id : $routeParams.testID
    },getLabOrderInfoSuccess, getLabOrderInfoFailure);
    //getLabOrderInfo.get({token: $window.sessionStorage.token, order_id: $routeParams.orderID}, getLabOrderInfoSuccess, getLabOrderInfoFailure);

    function getLabOrderInfoSuccess(res){ // on success
        $scope.labTest = res.data;
        console.log(res.data,'fyrt');
        if($scope.labTest.created_at != undefined || $scope.labTest.created_at != ''){
            /*$scope.date = new Date();
            var month = new Array();
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";*/
            var dateAndTime = $scope.labTest.created_at.split(' ');
            //var date = dateAndTime[0].split('-');
            //var day = date[2]; var month1 = date[1]; var year = date[0];
            //$scope.labTest.created_at =  month[parseInt(month1)] + " " + day + ", " + year;
            $scope.labTest.created_at = dateAndTime[0];
            $scope.labTestTime = dateAndTime[1];
        }else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        }
        $scope.template_id = res.template_id;
        
        $scope.visit_id = res.data.visit_id;
        CheckLabOrderStatus.save({
            token: $window.sessionStorage.token,
            lab_order_test_id: $scope.labordertestid
        }, checkClinicalStatusSuccess, checkClinicalStatusFailure);
    }

    function checkClinicalStatusSuccess(res){
        console.log(res, res.category_id, res.template_id);
      if(res.status == true && res.data.length > 0){
        getTemplates.get({
            token : $window.sessionStorage.token,
            category_id : res.category_id,
            template_type: res.template_id
        },getTemplatesSuccess,getTemplatesFailure);
        $scope.tid = res.template_id;
        $scope.cid = res.category_id;
        $scope.templateID = res.template_id;

        $scope.doUpdate = true;
        $rootScope.loader = "hide";
        
        $scope.templateSelected = true;
        $scope.selectedTemplate.name = res.template_name;
        $scope.template_id = res.template_id;
        $scope.enablePreviewreport = true;
        //console.log("value temp", res.template);
        var filledVal = JSON.parse(res.data);
        var templateCl = JSON.parse(res.template);
        //var CheckingTemplate = JSON.parse($scope.CheckingTemplate);
        $scope.renderedTemplate = {};
        $scope.renderedTemplate.fields = [];
        //console.log("real temp", JSON.parse(res.template));
        var i = 0;
        console.log(filledVal);
        console.log(templateCl);//return true;
        /*for (var key=0; key<templateCl.fields.length; key++) {
          //if (filledVal.hasOwnProperty(key)) {
            console.log(templateCl.fields[key].name, filledVal);
            //console.log(filledVal);
            if(templateCl.fields[key].name == Object.keys(filledVal)[key]){
                var abc = templateCl.fields[key].name;
                //console.log(Object.keys(filledVal)[0]);
                //console.log(templateCl.fields[key].type, filledVal);
                templateCl.fields[key].value = filledVal.Description == undefined ? '' : filledVal.Description;
            }
          //}
          i++;
        }*/
        for (var key in templateCl.fields) {
          console.log(Object.keys(filledVal)[i], '1', filledVal[Object.keys(filledVal)[i]], templateCl.fields[i].name);
          //if (filledVal.hasOwnProperty(key)) {
            //if(key == CheckingTemplate.fields[i].name){
              //console.log(key + " -> " + filledVal[key]);
              //console.log(templateCl.fields[i].displayName);
              $scope.renderedTemplate.fields.push({
                "displayName": templateCl.fields[i].displayName,
                "name": templateCl.fields[i].name,
                "type": templateCl.fields[i].type == "number" ? "text" : templateCl.fields[i].type,
                "value": Object.keys(filledVal)[i] == templateCl.fields[i].name ? filledVal[Object.keys(filledVal)[i]] : '',
                "validation": templateCl.fields[i].validation
              });
            //}
          //}
          i++;
        }

        console.log($scope.renderedTemplate, 'generated'); //return true;
        $scope.clinicalNotesID = res.clinical_notes_id;
        if($scope.clinicalNotesID != undefined) $scope.selectedRow = true;
        $scope.is_signoff = res.signoff;
        $scope.mySchema = $scope.renderedTemplate;//$scope.renderedTemplate;
        $scope.showAccordion = true;
        //console.log($scope.labordertestid,'p');
        orderReport.save({
            lab_test_id: $scope.labordertestid, //    will place there orderID/21 api is in progress
            token: $window.sessionStorage.token
        }, orderReportSuccess, orderReportFailure);
      }
      $scope.is_signoff = res.signoff;
      $rootScope.loader = "hide";
    }

    function checkClinicalStatusFailure(error){
        console.log(error);
    }

    function getLabOrderInfoFailure(error){ // on failure
        $('#internetError').modal('show');
        console.log(error);
    }

    getTemplateCategories.get({ // Getting all templates
        token : $window.sessionStorage.token
    },getTemplateCategoriesSuccess,getTemplateCategoriesFailure);
    function getTemplateCategoriesSuccess(res){ // on success
        if(res.status == true){
            $scope.templateCategories = res.data;
        }
    }
    function getTemplateCategoriesFailure(error){ // on failure
        $('#internetError').modal('show');
        console.log(error);
    }

    $scope.getCategoriesTemplates = function (categoryID){ // get Templates from Categories
        getTemplates.get({
            token : $window.sessionStorage.token,
            category_id : categoryID,
            template_type: 2
        },getTemplatesSuccess,getTemplatesFailure);
    };
    function getTemplatesSuccess(res){ // on success
        $scope.CheckingTemplate = res.data.template;
        $scope.templates = res.data;
        console.log(res.data, 'templatesdorpdown');
        $scope.have_templates = true;
        if($scope.doUpdate == true){
            $scope.templateID = $scope.tid;
            $scope.templateCategory = $scope.cid;
            $scope.have_templates = true; // if there are templates in selected category
            setTimeout(function () {
                $('select').not('.select_searchFields,.search-ajax').select2({minimumResultsForSearch: Infinity});
            },1000);
        }
    }
    function getTemplatesFailure(error){ // on failure
        $('#internetError').modal('show');
        console.log(error)
    }

    $scope.getTemplateData = function (templateID){ // get form fields of selected template
        console.log(templateID);
        getTemplateData.get({
            token : $window.sessionStorage.token,
            template_id : templateID,
            template_type: 2
        },getTemplateDataSuccess,getTemplateDataFailure);
        $scope.templateSelected = true;
    };
    function getTemplateDataSuccess(res){ // on success
        console.log(res);
        $scope.selectedTemplate = res.data;
        
        if($scope.doUpdate == true){
            $scope.mySchemaNewTemp = JSON.parse(res.data.template);
            $scope.newTemp = true;
            $scope.templateID = $scope.tid;
            $scope.templateCategory = $scope.cid;
            $scope.have_templates = true; // if there are templates in selected category
            setTimeout(function () {
                $('select').not('.select_searchFields,.search-ajax').select2({minimumResultsForSearch: Infinity});
            },1000);
        }else{
            $scope.newTemp = false;
            $scope.mySchema = JSON.parse(res.data.template);
        }
    }
    function getTemplateDataFailure(error){ // on failure
        $('#internetError').modal('show');
        console.log(error);
    }

    $scope.SaveTemplateValues = function (addData, updateData){ // Saving Template Values
        $scope.hideLoader = 'show';
        console.log(JSON.stringify(addData), (updateData), $scope.newTemp); //return true;
        if($scope.doUpdate == true){
            console.log('update', $scope.labTest.lab_order_id, $scope.labordertestid, $scope.template_id);
            UpdateLabTestValues.save({
                token : $window.sessionStorage.token,
                lab_order_id : $scope.labTest.lab_order_id, 
                lab_test_id : $scope.labordertestid,// lab_order_test_id
                lab_test_values: $scope.newTemp == true ? updateData : JSON.stringify(addData),
                template_id: $scope.template_id
            }, saveTemplateValuesSuccess, saveTemplateValuesFailure);
        }else{
            saveTemplateValues.save({ // sending data over saveTemplateValues factories
                token : $window.sessionStorage.token,
                lab_order_id : $scope.labTest.lab_order_id,
                lab_test_id : $scope.labordertestid,// lab_order_test_id
                lab_test_values: addData,
                template_id: $scope.selectedTemplate.id
            },saveTemplateValuesSuccess,saveTemplateValuesFailure)
        }
    };
    function saveTemplateValuesSuccess(res){ // on success
        if (res.status == true) {
            $scope.hideLoader = 'hide';
            $scope.message = true;
            $scope.cancleOrderBtn = false;
            $scope.errorMessage = res.message;
            $scope.messageType = 'alert-success';
            $scope.errorSymbol = 'fa fa-check';
            if($scope.doUpdate != true) $scope.myFormData = {};
            $timeout(function(){
                $scope.message = false;
                $scope.errorMessage = "";
            },1500);
            CheckLabOrderStatus.save({
                  token: $window.sessionStorage.token,
                  lab_order_test_id: $scope.labordertestid
            }, checkClinicalStatusSuccess, checkClinicalStatusFailure);
        }else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        } else {
            $scope.hideLoader = "hide";
            $scope.cancleOrderBtn = false;
            $scope.message = true;
            $scope.messageType = "alert-danger";
            $scope.errorMessage = res.message;
            $scope.errorSymbol = "fa fa-times";
        }
    }
    function saveTemplateValuesFailure(error){ // on failure
        $('#internetError').modal('show');
        console.log(error);
    }

    $scope.uploadFiles = function (files, errFiles, ref) {
        $scope.files = files;
        $scope.errFiles = errFiles;
        var i = 1;
        angular.forEach(files, function (file) {
                file.upload = Upload.upload({
                    url: serverPath + "add_lab_order_attachments",
                    method: 'POST',
                    data: {attachment: file, patient_id: $scope.labTest.patient_id}
                });
            file.upload.then(function (response) {
                //$timeout(function () {
                    file.result = response.data;
                    console.log(response);
                    if(ref == undefined) $('#fileUploadedSuccess').modal('show');
                    else $scope.refAttachment = response.data.message;
                    if(files.length == i){
                        //console.log($scope.PI.file);
                        $scope.saveAndClose = false;
                    }
                    i++;
                //});
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
                else if(res.error_code == 500){
                    console.log(res);
                    $rootScope.RolesAccess(res.message);
                }
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        });
    }
    DropDownData.get({
        token: $window.sessionStorage.token
    }, getpharmacySuccess, getPharmacyFailure);

    function getpharmacySuccess(res){
        if(res.status == true){
            $scope.dropDownDATA = res.data;
        }
    }

    function getPharmacyFailure(error){
      $('#internetError').modal('show');
        console.log(error);
    }
    GetAllWardsDropDown.get({
          token: $window.sessionStorage.token
        }, getwardSuccess, getWardFailure);

        function getwardSuccess(res){
            if(res.status == true){
                $scope.allwards = res.data;
            }
        }

        function getWardFailure(error){
          $('#internetError').modal('show');
            console.log(error);
        }

    $scope.checkoutPatient = function (CO) {
        $scope.message = false;
        var CheckoutDetails = {
            token: $window.sessionStorage.token,
            visit_id: $scope.visit_id,
            patient_id: $scope.labTest.patient_id,
            reason: $('input:radio[name="checkoutpatient"]:checked').val(),
            notes: $('.checkout_patient_tab_con > div.active textarea').val() == undefined ? '' : $('.checkout_patient_tab_con > div.active textarea').val(),
            pick_date: CO.date,
            pick_time: CO.time,
            admit_date: '2016-08-08',//$scope.displayInfo.visit_created_at,
            start_time: CO.time,
            department_id: CO.department,
            ward_id: CO.ward,
            bed_id: $scope.bedNumber
        }
        console.log(CheckoutDetails);
        $rootScope.loader = "show";
        CheckoutPatient.save(CheckoutDetails, checkoutSuccess, checkoutSuccessFailure);
    }
    function checkoutSuccess(res) {
        if(res.status == true){
            $rootScope.loader = "hide";
            $scope.messageType = "alert-success";
            $scope.errorMessage = res.message;
            $scope.errorSymbol = "fa fa-check";// 
            $scope.message = true;
            setTimeout(function() {$('#checkout').modal('hide');}, 1000);

            $('.checkout_patient_tab_con > div.active textarea').val('');
            $('input:radio[name="checkoutpatient"]').prop("checked", false);
            $('input:radio[name="checkoutpatient"]').eq(0).trigger("click");
            $scope.buttonDisabled = false;
            $('.counter_pop').addClass('ng-hide');
            $scope.buttonDisabled = false;
            $scope.patientInfo = false;
        }else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        }
    }
    function  checkoutSuccessFailure(res) {
      $('#internetError').modal('show');
      console.log(res)
    }
    $scope.wardSelected = function(wid){
        GetBedsByWard.get({
            token: $window.sessionStorage.token,
            ward_id: wid
        }, getBedsWardSuccess, getBedsWardFailure);
        function getBedsWardSuccess(res){
            if(res.status == true){
                $scope.noOFBeds = res.data;
            }
        }
        function getBedsWardFailure(error){
            console.log(error);
            $('#internetError').modal('show');
        }
    }
    $(".select-bed-dropdown").hide();
    $(".ward-button").on('click', function(){
        $(".select-bed-dropdown").toggle();
    });
    $scope.bedSelected = function(bedID){
        console.log(bedID);
        $scope.bedNumber = bedID;
    }

    $scope.doSignOff = function(){
        $rootScope.loader = "show";
        console.log($scope.labordertestid);
        Dosignoff.save({
            lab_test_id: $scope.signoffId, //    will place there orderID api is in progress
            token: $window.sessionStorage.token
        }, signoffSuccess, signoffFailure);
    }
    function signoffSuccess(res){
        if(res.status == true){
            console.log(res);
            $rootScope.loader = "hide";
            $scope.is_signoff = 1;
            $("#successSignoff").modal('show');
        }else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        }
    }
    function signoffFailure(res){
        console.log(res.data)
    }

        
        
        function orderReportSuccess(res){
             console.log(res, "report")
            if (res.status == true) {
                $scope.labtestid = res.lab_test_id;
                $('.showPdf').html("<iframe src="+res.data+"></iframe>");
                $scope.signoffStatus = res.is_signup;
                $scope.signoffId = res.lab_test_id;
            }
        }
        function orderReportFailure(res){
            console.log(res);
        }
}]);