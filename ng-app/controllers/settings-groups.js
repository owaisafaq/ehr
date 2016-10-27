var AppEHR = angular.module('AppEHR');

AppEHR.controller('settingsGroups', ['$scope', '$rootScope', '$window', '$routeParams', 'GetAllContexts', 'GetAllRoles', 'deleteRole', 'GetRole', 'addRole', 'editRole', '$timeout', 'GetAllLabs', function($scope,$rootScope,$window,$routeParams,GetAllContexts,GetAllRoles,deleteRole,GetRole,addRole,editRole,$timeout, GetAllLabs){
	$rootScope.pageTitle = "EHR - Groups";
    $rootScope.loader = "show";
    $scope.itemsPerPage = 15;
    $scope.curPage = 0;
    $scope.curTestPage = 0;
    $scope.pageSize = 15;
    $scope.rights = [];
    $scope.editRights = [];
    $scope.empty_flag = true;
    $scope.submitted = false;
    $(".rights_list").mCustomScrollbar();
    $(document).on('click','#addRole .add-role', function () {
        var template_id = 0;
        if($scope.templateFlag == true){
            var rightsArray = $('#addRole .add-multiple option:selected').attr('availablerights');
            rightsArray = rightsArray.split(',');
            template_id = $('#addRole select[name=templateID]').val();
            var id = $('#addRole select[name=role_rights]').val();
            console.log('id n temp');
            if(id != '' && template_id != '') {
                console.log($('#addRole .right_chip[data-id="' + id + '"').length < 1 && $('#addRole .right_chip[data-template-id="' + template_id + '"').length < 1);
                if ($('#addRole .right_chip[data-id="' + id + '"').length < 1 && $('#addRole .right_chip[data-template-id="' + template_id + '"').length < 1) {
                    $('#addRole .rights_list .mCSB_container').append('<div class="right_chip" data-template-id="' + template_id + '" data-id="' + id + '"><span>' + $('#addRole .add-multiple .select2-chosen').html() + " - " + $('#addRole .add-multiple_labName .select2-chosen').html() + '</span>' + get_context_rights(rightsArray) + '</div>');
                    $("#addRole .add-multiple").select2('data', null);
                    $("#addRole .add-multiple_labName").select2('data', null);
                    $scope.submitted = false;
                    $scope.empty_flag = false;
                    //$scope.templateFlag = false;
                    //$scope.labTypeFlag = false; labTypes templateID
                }else if($('#addRole .right_chip[data-id="' + id + '"').length >= 1 && $('#addRole .right_chip[data-template-id="' + template_id + '"').length < 1){
                    console.log('nhi aya');
                    $('#addRole .rights_list .mCSB_container').append('<div class="right_chip" data-template-id="' + template_id + '" data-id="' + id + '"><span>' + $('#addRole .add-multiple .select2-chosen').html() + " - " + $('#addRole .add-multiple_labName .select2-chosen').html() + '</span><div class="rights_icons"><span class="rights create"><i class="fa fa-plus"></i></span><span class="rights update_icn"><i class="fa fa-edit"></i></span><span class="rights delete_icn"><i class="fa fa-times"></i></span><input type="hidden" name="type[]" ng-value="roleData.type"/><span class="rights read"><i class="fa fa-eye"></i></span></div></div>');
                    $("#addRole .add-multiple").select2('data', null);
                    $("#addRole .add-multiple_labName").select2('data', null);
                    $scope.submitted = false;
                    $scope.empty_flag = false;
                }else{
                    console.log('else');
                }
            }
        }else if($scope.labTypeFlag == true){
            template_id = $('#addRole select[name=labID]').val();
            var id = $('#addRole select[name=role_rights]').val();
            console.log('labTypeFlag id n temp');
            if(id != '' && template_id != '') {
                var rightsArray = $('#addRole .add-multiple option:selected').attr('availablerights');
                rightsArray = rightsArray.split(',');
                console.log($('#addRole .right_chip[data-id="' + id + '"').length , $('#addRole .right_chip[data-lab-id="' + template_id + '"').length);
                if (($('#addRole .right_chip[data-id="' + id + '"').length == 0 && $('#addRole .right_chip[data-lab-id="' + template_id + '"').length == 0) || ($('#addRole .right_chip[data-id="' + id + '"').length == 0 && $('#addRole .right_chip[data-lab-id="' + template_id + '"').length >= 1) || ($('#addRole .right_chip[data-id="' + id + '"').length >= 1 && $('#addRole .right_chip[data-lab-id="' + template_id + '"').length == 0)) {
                    $('#addRole .rights_list .mCSB_container').append('<div class="right_chip" data-lab-id="' + template_id + '" data-id="' + id + '"><span>' + $('#addRole .add-multiple .select2-chosen').html() + " - " + $('#addRole .add-multiple_tempName .select2-chosen').html() + '</span>' + get_context_rights(rightsArray) +'</div>');
                    $("#addRole .add-multiple").select2('data', null);
                    $("#addRole .add-multiple_tempName").select2('data', null);
                    $scope.submitted = false;
                    $scope.empty_flag = false;
                    //$scope.templateFlag = false;
                    //$scope.labTypeFlag = false; labTypes labID
                }/*else if($('#addRole .right_chip[data-id="' + id + '"').length >= 1 && $('#addRole .right_chip[data-lab-id="' + template_id + '"').length <= 1){
                    console.log('labTypeFlag nhi aya',template_id);
                    $('#addRole .rights_list .mCSB_container').append('<div class="right_chip" data-lab-id="' + template_id + '" data-id="' + id + '"><span>' + $('#addRole .add-multiple .select2-chosen').html() + " - " + $('#addRole .add-multiple_tempName .select2-chosen').html() + '</span>'+ get_context_rights(rightsArray) +'</div>');
                    $("#addRole .add-multiple").select2('data', null);
                    $("#addRole .add-multiple_tempName").select2('data', null);
                    $scope.submitted = false;
                    $scope.empty_flag = false;
                }else if($('#addRole .right_chip[data-id="' + id + '"').length == 0 && $('#addRole .right_chip[data-lab-id="' + template_id + '"').length < 1){
                    console.log('else');
                    $('#addRole .rights_list .mCSB_container').append('<div class="right_chip" data-lab-id="' + template_id + '" data-id="' + id + '"><span>' + $('#addRole .add-multiple .select2-chosen').html() + " - " + $('#addRole .add-multiple_tempName .select2-chosen').html() + '</span>'+ get_context_rights(rightsArray) +'</div>');
                    $("#addRole .add-multiple").select2('data', null);
                    $("#addRole .add-multiple_tempName").select2('data', null);
                    $scope.submitted = false;
                    $scope.empty_flag = false;
                }*/
            }
        }else{
            var id = $('#addRole select[name=role_rights]').val();
            if(id != '') {
                console.log('id');
                if ($('#addRole .right_chip[data-id="' + id + '"').length < 1) {
                    console.log('id nested');
                    var rightsArray = $('#addRole .add-multiple option:selected').attr('availablerights');
                    rightsArray = rightsArray.split(',');
                    $('#addRole .rights_list .mCSB_container').append('<div class="right_chip" data-template-id="' + template_id + '" data-id="' + id + '"><span>' + $('#addRole .add-multiple .select2-chosen').html() + '</span>' + get_context_rights(rightsArray) + '</div>');
                    $("#addRole .add-multiple").select2('data', null);
                    //$scope.templateFlag = false;
                    //$scope.labTypeFlag = false; labTypes templateID
                }
               // $scope.labTypeFlag = false;
                $scope.empty_flag = false;
            }
        }
    });

    $(document).on('click','#editRole .add-role', function () {
        var template_id = 0;
        if($scope.EtemplateFlag == true){
            template_id = $('#editRole select[name=templateID]').val();
            var id = $('#editRole select[name=role_rights]').val();
            console.log('id n temp');
            if(id != '' && template_id != '') {
                var rightsArray = $('#editRole .add-multiple option:selected').attr('availablerights');
                rightsArray = rightsArray.split(',');
                console.log($('#editRole .right_chip[data-id="' + id + '"').length , $('#editRole .right_chip[data-template-id="' + template_id + '"').length);
                if ($('#editRole .right_chip[data-id="' + id + '"').length < 1 && $('#editRole .right_chip[data-template-id="' + template_id + '"').length < 1) {
                    $('#editRole .rights_list .mCSB_container').append('<div class="right_chip" data-template-id="' + template_id + '" data-id="' + id + '"><span>' + $('#editRole .add-multiple .select2-chosen').html() + " - " + $('#editRole .add-multiple_ElabName .select2-chosen').html() + '</span>'+ get_context_rights(rightsArray) +'</div>');
                    $("#editRole .add-multiple").select2('data', null);
                    $("#editRole .add-multiple_ElabName").select2('data', null);
                    $scope.submitted = false;
                    $scope.empty_flag = false;
                    //$scope.templateFlag = false;
                    //$scope.labTypeFlag = false; labTypes templateID
                }else if($('#editRole .right_chip[data-id="' + id + '"').length >= 1 && $('#editRole .right_chip[data-template-id="' + template_id + '"').length < 1){
                    console.log('nhi aya');
                    $('#editRole .rights_list .mCSB_container').append('<div class="right_chip" data-template-id="' + template_id + '" data-id="' + id + '"><span>' + $('#editRole .add-multiple .select2-chosen').html() + " - " + $('#editRole .add-multiple_ElabName .select2-chosen').html() + '</span>'+ get_context_rights(rightsArray) +'</div>');
                    $("#editRole .add-multiple").select2('data', null);
                    $("#editRole .add-multiple_ElabName").select2('data', null);
                    $scope.submitted = false;
                    $scope.empty_flag = false;
                }else{
                    console.log('else');
                }
            }
        }else{
            var id = $('#editRole select[name=role_rights]').val();
            if(id != '') {
                var rightsArray = $('#editRole .add-multiple option:selected').attr('availablerights');
                rightsArray = rightsArray.split(',');
                if ($('#editRole .right_chip[data-id="' + id + '"').length < 1) {
                    $('#editRole .rights_list .mCSB_container').append('<div class="#editRole right_chip" data-id="' + id + '"><span>' + $('#editRole .add-multiple .select2-chosen').html() + '</span>'+ get_context_rights(rightsArray) +'</div>');
                    $("#editRole .add-multiple").select2('data', null);
                }
                //$scope.labTypeFlag = true;
                $scope.empty_flag = false;
            }
        }
    });

    function get_context_rights(available_rights){
        console.log(available_rights);
        var html = '<div class="rights_icons">';
        if(available_rights[0] == 'add' || available_rights[1] == 'add' || available_rights[2] == 'add' || available_rights[3] == 'add'){
            html+='<span class="rights create"><i class="fa fa-plus"></i></span>';
        }
        if(available_rights[1] == 'update' || available_rights[0] == 'update' || available_rights[2] == 'update' || available_rights[3] == 'update'){
            html+= '<span class="rights update_icn"><i class="fa fa-edit"></i></span>';
        }
        if(available_rights[1] == 'delete' || available_rights[0] == 'delete' || available_rights[2] == 'delete' || available_rights[3] == 'delete'){
            html+= '<span class="rights delete_icn"><i class="fa fa-times"></i></span>';
        }
        if(available_rights[3] == 'view' || available_rights[0] == 'view' || available_rights[2] == 'view' || available_rights[1] == 'view'){
            html+= '<span class="rights read"><i class="fa fa-eye"></i></span></div>';;
        }
        return html;
    }

    $(document).on('click','.rights_icons > span',function () {
        $(this).toggleClass('active');
    });

    GetAllContexts.get({
        token: $window.sessionStorage.token,
        offset: 0, limit: 0
    }, GetAllContextsSuccess, GetAllContextsFailure);
    function GetAllContextsSuccess(res) {
        $rootScope.loader = "hide";
        if (res.status == true) {
            if(res.data.length == 0){
                $('#noResultFound').modal('show');
            }
            $scope.Contexts = res.data;
        }
    }
    function GetAllContextsFailure(error) {
        $('#internetError').modal('show');
        console.log(error);
    }

    GetAllRoles.get({
        token: $window.sessionStorage.token,
        offset: 0, limit: $scope.itemsPerPage
    }, GetAllRolesSuccess, GetAllRolesFailure);
    function GetAllRolesSuccess(res) {
        $rootScope.loader = "hide";
        if (res.status == true) {
            if(res.data.length == 0){
                $('#noResultFound').modal('show');
            }
            $scope.Roles = res.data;
            $scope.rolesCount = res.count;
        }else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        }
    }
    function GetAllRolesFailure(error) {
        $('#internetError').modal('show');
        console.log(error);
    }

    $scope.numberOfPages = function() {
        return Math.ceil($scope.rolesCount / $scope.pageSize);
    };

    $scope.paginationNext = function(pageSize, curPage){
        $rootScope.loader = "show";
        GetAllRoles.get({
            token: $window.sessionStorage.token,
            offset: (pageSize * curPage), limit: $scope.itemsPerPage
        }, GetAllRolesSuccess, GetAllRolesFailure);
    };

    $scope.paginationPrev = function(pageSize, curPage){
        $rootScope.loader = "show";
        GetAllRoles.get({
            token: $window.sessionStorage.token,
            offset: (pageSize - 1) * curPage, limit: $scope.itemsPerPage
        }, GetAllRolesSuccess, GetAllRolesFailure);
    };

    $scope.confirmRemoveRole = function(id){
        $scope.deleteRoleId = id;
        $('#confirmation').modal('show');
    };
    $scope.removeRole = function(){
        $rootScope.loader = "show";
        deleteRole.get({
            token: $window.sessionStorage.token,
            role_id : $scope.deleteRoleId
        }, deleteRoleSuccess, deleteRoleFailure)
    };

    function deleteRoleSuccess(res){
        if(res.status == true){
            $scope.deleteLabId = 0;
            $('#confirmation').modal('hide');
            GetAllRoles.get({
                token: $window.sessionStorage.token,
                offset: 0, limit: 0
            }, GetAllRolesSuccess, GetAllRolesFailure);
        }else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        }
    }

    function deleteRoleFailure(error){
        console.log(error);
        $('#confirmation').modal('hide');
        $('#internetError').modal('show');
    }

    $scope.roleDetail = function(id){
        GetRole.get({
            token: $window.sessionStorage.token,
            role_id : id
        }, GetRoleSuccess, GetRoleFailure);
    };
    function GetRoleSuccess(res) {
        $rootScope.loader = "hide";
        if (res.status == true) {
            console.log(res);
            $scope.editRights = [];
            $('#editRole .rights_list .mCSB_container').html('');
            $scope.editRoleData = res;
            $.each($scope.editRoleData.data,function (i,value) {
                var available_rights = value.available_rights.split(',');
                var add_class = '';
                var update_class = '';
                var read_class = '';
                var delete_class = '';
                if(value.add_right == 1) add_class = ' active';
                if(value.update_right == 1) update_class = ' active';
                if(value.delete_right == 1) delete_class = ' active';
                if(value.view_right == 1) read_class = ' active';
                $('#editRole .rights_list .mCSB_container').append('<div class="right_chip" data-id="' + value.context_id + '" data-template-id="' + value.type + '"><span>' + value.context + " " + value.role_type + '</span>' + get_context_rightsUpdate(available_rights, read_class, delete_class, update_class, add_class) + '</div>');
            });
            //$scope.labTypeFlag = true;
            $('#editRole').modal('show');
        }
    }
    function get_context_rightsUpdate(available_rights, read_class, delete_class, update_class, add_class){
        console.log(available_rights);
        var html = '<div class="rights_icons">';
        if(available_rights[0] == 'add' || available_rights[1] == 'add' || available_rights[2] == 'add' || available_rights[3] == 'add'){
            html+='<span class="rights create'+ add_class +'"><i class="fa fa-plus"></i></span>';
        }
        if(available_rights[1] == 'update' || available_rights[0] == 'update' || available_rights[2] == 'update' || available_rights[3] == 'update'){
            html+= '<span class="rights update_icn'+ update_class +'"><i class="fa fa-edit"></i></span>';
        }
        if(available_rights[1] == 'delete' || available_rights[0] == 'delete' || available_rights[2] == 'delete' || available_rights[3] == 'delete'){
            html+= '<span class="rights delete_icn'+ delete_class +'"><i class="fa fa-times"></i></span>';
        }
        if(available_rights[3] == 'view' || available_rights[0] == 'view' || available_rights[2] == 'view' || available_rights[1] == 'view'){
            html+= '<span class="rights read'+ read_class +'"><i class="fa fa-eye"></i></span>';
        }
        return html;
    }
    function GetRoleFailure(error) {
        $('#internetError').modal('show');
        console.log(error);
    }

    $scope.createRole = function (roleData){
        if($("#addRole .right_chip").length > 0) {
            //$('.error').hide();
            $("#addRole .right_chip").each(function (i) {
                var create = '0';
                var read = '0';
                var update = '0';
                var deletes = '0';
                var Addtype = 0;
                if($(this).find('.create').hasClass('active')) create = '1';
                if($(this).find('.read').hasClass('active')) read = '1';
                if($(this).find('.update_icn').hasClass('active')) update = '1';
                if($(this).find('.delete_icn').hasClass('active')) deletes = '1';
                if($(this).data('template-id') == 0 && $(this).data('lab-id') == 0){
                    Addtype = 0;
                }else if($(this).data('template-id') != 0 && $(this).data('template-id') != undefined){
                    Addtype = $(this).data('template-id');
                    console.log("templateid", Addtype);
                }else if($(this).data('lab-id') != 0 && $(this).data('lab-id') != undefined){
                    Addtype = $(this).data('lab-id');
                    //console.log("labid", Addtype);
                }
                console.log(Addtype, $(this).data('template-id'), $(this).data('lab-id'));
                $scope.rights[i] = {context_id : $(this).data('id'),is_add: create,is_read: read, is_update:update, is_delete:deletes, type: Addtype};
                //$scope.roleData.type == undefined || $scope.roleData.type == '' ? 0 : $scope.roleData.type
            });
        }else{
            //$('.error').html('Please add at least one right');
            //$('.error').show();
        } console.log($scope.rights); //return false;
        addRole.save({
            token : $window.sessionStorage.token,
            name : roleData.name,
            role_rights: JSON.stringify($scope.rights)
        },addRoleSuccess,addRoleFailure);
    };
    function addRoleSuccess(res){ // on success
        if (res.status == true) {
            $scope.labTypeFlag = false;$scope.templateFlag = false;
            $scope.hideLoader = 'hide';
            $scope.message = true;
            $scope.addRoleBtn = false;
            $scope.errorMessage = res.message;
            $scope.messageType = 'alert-success';
            $scope.errorSymbol = 'fa fa-check';
            $scope.roleData = {};
            $scope.rights = [];
            $scope.submitted = false;
            $timeout(function(){
                $scope.message = false;
                $('#addRole').modal('hide');
                $('#addRole .rights_list .mCSB_container').html('');
                $scope.errorMessage = "";
            },1500);
            GetAllRoles.get({
                token: $window.sessionStorage.token,
                offset: 0, limit: 0
            }, GetAllRolesSuccess, GetAllRolesFailure);
        }else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        } else {
            $scope.hideLoader = "hide";
            $scope.addRoleBtn = false;
            $scope.message = true;
            $scope.messageType = "alert-danger";
            $scope.errorMessage = res.message;
            $scope.errorSymbol = "fa fa-times";
        }
    }
    function addRoleFailure(error){ // on failure
        console.log(error);
        $('#internetError').modal('show');
    }

    $scope.updateRole = function(editRoleData){
        $rootScope.loader = "show";
        if($("#editRole .right_chip").length > 0) {
            //$('.error').hide();
            $scope.empty_flag = false;
            $("#editRole .right_chip").each(function (i) {
                var create = '0';
                var read = '0';
                var update = '0';
                var deletes = '0';
                var Addtype = 0;
                if($(this).data('template-id') == 0 && $(this).data('lab-id') == 0){
                    Addtype = 0;
                }else if($(this).data('template-id') != 0 && $(this).data('template-id') != undefined){
                    Addtype = $(this).data('template-id');
                    console.log("templateid", Addtype);
                }else if($(this).data('lab-id') != 0 && $(this).data('lab-id') != undefined){
                    Addtype = $(this).data('lab-id');
                    //console.log("labid", Addtype);
                }
                if($(this).find('.create').hasClass('active')) create = '1';
                if($(this).find('.read').hasClass('active')) read = '1';
                if($(this).find('.update_icn').hasClass('active')) update = '1';
                if($(this).find('.delete_icn').hasClass('active')) deletes = '1';
                $scope.editRights[i] = {context_id : $(this).data('id'),is_add: create,is_read: read, is_update:update, is_delete:deletes, type: Addtype};
            });
        }else{
            //$('.error').html('Please add at least one right');
            //$('.error').show();
        }console.log($scope.editRights); //return false;
        editRole.save({
            token : $window.sessionStorage.token,
            role_id : editRoleData.role_id,
            name : editRoleData.name,
            role_rights : JSON.stringify($scope.editRights)
        },editRoleSuccess,editRoleFailure);
    };

    function editRoleSuccess(res){ // on success
        if (res.status == true) {
            $rootScope.loader = 'hide';
            $scope.message = true;
            $scope.updateRoleBtn = false;
            $scope.errorMessage = res.message;
            $scope.messageType = 'alert-success';
            $scope.errorSymbol = 'fa fa-check';
            GetAllRoles.get({
                token: $window.sessionStorage.token,
                offset: 0, limit: 0
            }, GetAllRolesSuccess, GetAllRolesFailure);
            $timeout(function(){
                $scope.message = false;
                $scope.submitted = false;
                $('#editRole').modal('hide');
                $('#editRole .rights_list .mCSB_container').html('');
                $scope.errorMessage = "";
                $scope.editRoleData = {};
                $scope.editRights = [];
            },1500);
        }else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        } else {
            $rootScope.loader = "hide";
            $scope.updateRoleBtn = false;
            $scope.message = true;
            $scope.messageType = "alert-danger";
            $scope.errorMessage = res.message;
            $scope.errorSymbol = "fa fa-times";
        }
    }
    function editRoleFailure(error){ // on failure
        console.log(error);
        $('#internetError').modal('show');
    }

    GetAllLabs.get({
        token: $window.sessionStorage.token,
        offset: 0, limit: 0
    }, GetLabsSuccess, GetLabsFailure);

    function GetLabsSuccess(res) {
        $rootScope.loader = "hide";
        if (res.status == true) {
            if(res.data.length == 0){
            }
            $scope.Labs = res.data;
        }
    }
    function GetLabsFailure(error) {
        $('#internetError').modal('show');
        console.log(error);
    }
    //$scope.templateFlag = false;
    $scope.contextOnChange = function(id, rights){
        $scope.rightsByDropdown = rights;
        console.log($scope.rightsByDropdown);
        if(id == 31){
            $scope.templateFlag = true;
            $scope.labTypeFlag = false;
            console.log('goal');
        }else if(id == 7 || id == 11 || id == 9){
            $scope.labTypeFlag = true;
            $scope.templateFlag = false;
        }else{
            $scope.roleData.type = undefined;
            $scope.templateFlag = false;
            $scope.labTypeFlag = false;
        }
    }

    $scope.EditcontextOnChange = function(id, rights){
        console.log(id)
        $scope.rightsByDropdown = rights;
        if(id == 31){
            $scope.EtemplateFlag = true;
            $scope.ElabTypeFlag = false;
            console.log('goal');
        }else if(id == 7 || id == 11 || id == 9){
            $scope.ElabTypeFlag = true;
            $scope.EtemplateFlag = false;
        }else{
            //$scope.roleData.type = undefined;
            $scope.EtemplateFlag = false;
            $scope.ElabTypeFlag = false;
        }
    }
}]);
