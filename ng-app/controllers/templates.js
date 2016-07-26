var AppEHR = angular.module('AppEHR');

/*
AppEHR.controller('templates', ['$scope', '$rootScope', function($scope, $rootScope){

    console.log('sadsadasdsad');
    $rootScope.pageTitle = "EHR - Settings";


}]);*/


AppEHR.controller('templates', ['$scope', '$rootScope', 'mySchema', '$window', 'getTemplates' ,'AddTemplate', 'getTemplateCategory', 'AddTemplateCategory','$timeout', 'DeleteTempCategory' , 'DeleteTemplate', function($scope, $rootScope, mySchema, $window, getTemplates, AddTemplate, getTemplateCategory, AddTemplateCategory,$timeout, DeleteTempCategory, DeleteTemplate){
    $scope.myForm = {
        schema: mySchema
    };
    $scope.cat_unique={};
    $scope.catt_unique ={};
    $rootScope.pageTitle = "EHR - Inventory";

    $scope.saveForm = function() {


        $scope.hideLoader = 'show';
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

        angular.copy(addTemplate,$scope.cat_unique);
        AddTemplate.save(addTemplate, AddTemplateSuccess,AddTemplateFailure);

    }

    function AddTemplateSuccess(res) {
        console.log(res);
        if (res.status == true) {
            $rootScope.loader = "hide";

            $scope.templateLists.push($scope.cat_unique);

            $(".addtemplates").hide();
            $(".main_templates").show();


        }
    }

    function AddTemplateFailure(error) {
        console.log(error);
    }


    getTemplates.get({
        token: $window.sessionStorage.token
    }, getTemplateSuccess, getTemplateFailure);

    function getTemplateSuccess(res) {
        if (res.status == true) {
            if(res.data.length == 0){
                $('#noRecordFound').modal('show');
                return true;
            }
            $scope.templateLists = res.data;
        }
    }

    function getTemplateFailure(error) {
        console.log(error);
    }

    getTemplateCategory.get({token: $window.sessionStorage.token}, TemplateCategorySuccess, TemplateCategoryFailed);

    function TemplateCategorySuccess(res) {
        if (res.status == true) {
            $scope.categories = res.data;
        } else {
            console.log(res);
        }
    }

    function TemplateCategoryFailed(error) {
        console.log(error);
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

            }
            angular.copy(addCateogry,$scope.catt_unique);
            AddTemplateCategory.save(addCateogry, CategorySuccess, CategoryFailure);


        }
    }



    function CategorySuccess(res) {
        console.log(res);
        if (res.status == true) {
            $rootScope.loader = "hide";
            $scope.categories.push($scope.catt_unique);
            console.log($scope.CategoryLists);
            $timeout(function () {
                $('#addcategory').modal('hide');
            },500);
        }
    }

    function CategoryFailure(error) {
        console.log(error);
    }



    $scope.catDeleted = function (catID) {
        console.log(catID);
        if ( window.confirm("Are you Sure you want to delete?") ) {
            DeleteTempCategory.save({token: $window.sessionStorage.token, category_id: catID}, deleteCategoryInfoSuccess, deleteCategoryInfoFailure);

            function deleteCategoryInfoSuccess(res) {
                if (res.status == true) {
                    $rootScope.loader = "hide";
                    getTemplateCategory.get({token: $window.sessionStorage.token}, TemplateCategorySuccess, TemplateCategoryFailed);



                }else{
                   alert(res.message);
                }
            }
            function deleteCategoryInfoFailure(error) {
                $rootScope.loader = "show";
                console.log(error);
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
                        token: $window.sessionStorage.token
                    }, getTemplateSuccess, getTemplateFailure);



                }else{
                    alert(res.message);
                }
            }
            function deleteTemplateInfoFailure(error) {
                $rootScope.loader = "show";
                console.log(error);
            }

        }
    }



}]);

AppEHR.value('mySchema', {

});



