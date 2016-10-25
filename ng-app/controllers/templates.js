var AppEHR = angular.module('AppEHR');

AppEHR.controller('templates', ['$scope', '$rootScope', 'mySchema', '$window', 'getTemplates' ,'AddTemplate', 'getTemplateCategory', 'AddTemplateCategory','$timeout', 'DeleteTempCategory' , 'DeleteTemplate', 'GetEditTemplate', 'EditTemplate', 'GetLabOrderCategory', 'GetTempCategory', 'UpdateTempCategory', function($scope, $rootScope, mySchema, $window, getTemplates, AddTemplate, getTemplateCategory, AddTemplateCategory,$timeout, DeleteTempCategory, DeleteTemplate, GetEditTemplate, EditTemplate, GetLabOrderCategory, GetTempCategory, UpdateTempCategory){
    $scope.myForm = {
        schema: mySchema
    };
    $scope.EditForm = {
        schema: mySchema
    };
    $rootScope.loader = "show";
    $scope.cat_unique={};
    $scope.catt_unique ={};
    $scope.templateLists = [];

    $rootScope.pageTitle = "EHR - Lab Templates";

    $scope.saveForm = function() {
        $rootScope.hideLoader = 'show';
        //$scope.updateEncounterBtn = true;
        //console.log($scope.displayInfo.patient_id);
        var catName = $.grep($scope.categories, function (categories) {
            return categories.id == $scope.template_cat_id;
        })[0].name;
        var addTemplate={
            token: $window.sessionStorage.token,
            name: $scope.template_name,
            description: $scope.template_description,
            category_id: $scope.template_cat_id,
            template: angular.toJson(mySchema),
            category :catName
        }
        console.log(addTemplate);
        angular.copy(addTemplate,$scope.cat_unique);
        AddTemplate.save(addTemplate, AddTemplateSuccess,AddTemplateFailure);
    }

    function AddTemplateSuccess(res) {
        console.log(res);
        if (res.status == true) {
            $rootScope.loader = "hide";
            $scope.myForm.schema = [];
            $scope.template_name = '';
            $scope.template_cat_id = '';
            $scope.template_description = '';
            $scope.templateLists.push($scope.cat_unique);

            $(".addtemplates").hide();
            $(".main_templates").show();
        }else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        }
    }

    function AddTemplateFailure(error) {
        console.log(error);
        $('#internetError').modal('show');
    }

    $scope.updateTemplate = function() {
        $scope.hideLoader = 'show';
        //$scope.updateEncounterBtn = true;
        //console.log($scope.displayInfo.patient_id);
        /*var catName = $.grep($scope.categories, function (categories) {
            return categories.id == $scope.template_cat_id;
        })[0].name;*/
        //console.log($scope.EditForm.schema);
        var editTemplate = {
            token: $window.sessionStorage.token,
            name: $scope.Edittemplate_name,
            description: $scope.Edittemplate_description,
            category_id: $scope.Edittemplate_cat_id,
            template_id: $scope.templateID,
            template: angular.toJson($scope.EditForm.schema),
            template_type: 1
        }
        console.log(editTemplate);
        //angular.copy(editTemplate,$scope.cat_unique);
        EditTemplate.save(editTemplate, EditTemplateSuccess,EditTemplateFailure);
    }

    $scope.editMyTemplate = function(templateID){
        $scope.templateID = templateID;
        $scope.hideLoader = 'show';
        GetEditTemplate.save({token: $window.sessionStorage.token, template_id: templateID}, getOneTemplateSuccess, getOneTemplateFailure);
    }

    function getOneTemplateSuccess(res) {
        if (res.status == true) {
            $rootScope.loader = "hide";
            console.log(res);
            $(".main_templates").hide();
            $(".editTemplateTab").show();
            $scope.Edittemplate_name = res.data.name;
            $scope.Edittemplate_description = res.data.description;
            $scope.Edittemplate_cat_id = res.data.category_id;
            $scope.EditForm.schema = JSON.parse(res.data.template);
            setTimeout(function () {
                $('select').not('.select_searchFields,.search-ajax').select2({minimumResultsForSearch: Infinity});
            },500);
        }
    }

    function getOneTemplateFailure(error) {
        console.log(error);
        $('#internetError').modal('show');
    }

    function EditTemplateSuccess(res) {
        console.log(res);
        if (res.status == true) {
            $rootScope.loader = "hide";
            $scope.myForm.schema = [];
            $scope.Editemplate_name = '';
            $scope.Edittemplate_cat_id = '';
            $scope.Editemplate_description = '';
            getTemplates.get({
                token: $window.sessionStorage.token,
                template_type: 2
            }, getTemplateSuccess, getTemplateFailure);
            //$scope.templateLists.push($scope.cat_unique);
            $(".editTemplateTab").hide();
            $(".main_templates").show();
        }else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        }
    }

    function EditTemplateFailure(error) {
        console.log(error);
        $('#internetError').modal('show');
    }


    getTemplates.get({
        token: $window.sessionStorage.token,
        template_type: 2
    }, getTemplateSuccess, getTemplateFailure);

    function getTemplateSuccess(res) {
        if (res.status == true) {
            //console.log(res);
            $rootScope.loader = "hide";
            if(res.data.length == 0){
                $('#noRecordFound').modal('show');
                return true;
            }
            console.log(res.data);
            $scope.templateLists = res.data;
        }
    }

    function getTemplateFailure(error) {
        console.log(error);
        $('#internetError').modal('show');
    }

    getTemplateCategory.get({token: $window.sessionStorage.token, template_type: 2}, TemplateCategorySuccess, TemplateCategoryFailed);

    function TemplateCategorySuccess(res) {
        if (res.status == true) {
            $scope.categories = res.data;
        } else {
            console.log(res);
        }
    }

    function TemplateCategoryFailed(error) {
        console.log(error);
        $('#internetError').modal('show');
    }

    $scope.AddCategory = function (category) {
        if (angular.equals({}, category) == false) {
            $scope.hideLoader = 'show';
            //$scope.updateEncounterBtn = true;
            //console.log($scope.displayInfo.patient_id);
            var addCateogry={
                token: $window.sessionStorage.token,
                name: category.cat_name,
                description: category.cat_desc,
                template_type: 2
            }
            //angular.copy(addCateogry,$scope.catt_unique);
            AddTemplateCategory.save(addCateogry, CategorySuccess, CategoryFailure);
        }
    }
    function CategorySuccess(res) {
        console.log(res);
        if (res.status == true) {
            getTemplateCategory.get({token: $window.sessionStorage.token, template_type: 2}, TemplateCategorySuccess, TemplateCategoryFailed);
            $rootScope.loader = "hide";
            //$scope.categories.push($scope.catt_unique);
            console.log($scope.CategoryLists);
            $timeout(function () {
                $('#addcategory').modal('hide');
                $scope.category = [];
                $scope.submitted = false;
            },500);
        }else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        }
    }

    function CategoryFailure(error) {
        console.log(error);
        $('#internetError').modal('show');
    }
    $scope.editCategoryitems = {};
    $scope.openEditModal = function(catID){
        GetTempCategory.get({token: $window.sessionStorage.token, cat_id: catID}, getCategorySuccess, getCategoryFailure);
        function getCategorySuccess(res){
            if(res.status == true){
                console.log(res);
                //$scope.editCategoryitems = res.data;
                $scope.editCategoryitems.cat_name = res.data[0].name;
                $scope.editCategoryitems.cat_desc = res.data[0].description;
                $scope.editCategoryitems.catID = res.data[0].id;
            }
        }
        function getCategoryFailure(error){
            console.log(error);
        }
        $('#editcategory').modal('show');
    }
    $scope.editCategory = function (category) {
            $rootScope.loader = 'show';
            //$scope.updateEncounterBtn = true;
            //console.log($scope.displayInfo.patient_id);
            var addCateogry = {
                token: $window.sessionStorage.token,
                category_name: category.cat_name,
                description: category.cat_desc,
                cat_id: $scope.editCategoryitems.catID
            }
            //angular.copy(addCateogry,$scope.catt_unique);
            UpdateTempCategory.get(addCateogry, EditCategorySuccess, CategoryFailure);
    }
    function EditCategorySuccess(res) {
        console.log(res);
        if (res.status == true) {
            getTemplateCategory.get({token: $window.sessionStorage.token, template_type: 2}, TemplateCategorySuccess, TemplateCategoryFailed);
            $rootScope.loader = "hide";
            //$scope.categories.push($scope.catt_unique);
            console.log($scope.CategoryLists);
            $timeout(function () {
                $('#editcategory').modal('hide');
                $scope.category = [];
                $scope.submitted = false;
            },500);
        }else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        }
    }

    function CategoryFailure(error) {
        console.log(error);
        $('#internetError').modal('show');
    }

    $scope.catDeleted = function (catID) {
        console.log(catID);
        if ( window.confirm("Are you Sure you want to delete?") ) {
            DeleteTempCategory.save({token: $window.sessionStorage.token, category_id: catID}, deleteCategoryInfoSuccess, deleteCategoryInfoFailure);
            function deleteCategoryInfoSuccess(res) {
                if (res.status == true) {
                    $rootScope.loader = "hide";
                    getTemplateCategory.get({token: $window.sessionStorage.token, template_type: 2}, TemplateCategorySuccess, TemplateCategoryFailed);
                }else if(res.error_code == 500){
                    console.log(res);
                    $rootScope.RolesAccess(res.message);
                }else{
                   alert(res.message);
                }
            }
            function deleteCategoryInfoFailure(error) {
                $rootScope.loader = "hide";
                console.log(error);
                $('#internetError').modal('show');
            }
        }
    }

    $scope.templateDeleted = function (tempID) {

        if ( window.confirm("Are you Sure you want to delete?") ) {
            DeleteTemplate.save({token: $window.sessionStorage.token, template_id: tempID}, deleteTemplateInfoSuccess, deleteTemplateInfoFailure);

            function deleteTemplateInfoSuccess(res) {
                if (res.status == true) {
                    $rootScope.loader = "hide";
                    getTemplates.get({
                        token: $window.sessionStorage.token, template_type: 2
                    }, getTemplateSuccess, getTemplateFailure);
                }else if(res.error_code == 500){
                    console.log(res);
                    $rootScope.RolesAccess(res.message);
                }else{
                    alert(res.message);
                }
            }
            function deleteTemplateInfoFailure(error) {
                $rootScope.loader = "hide";
                $('#internetError').modal('show');
                console.log(error);
            }

        }
    }



}]);

AppEHR.value('mySchema', {

});



