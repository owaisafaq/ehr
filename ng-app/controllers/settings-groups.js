var AppEHR = angular.module('AppEHR');

AppEHR.controller('settingsGroups', ['$scope', '$rootScope', '$window', '$routeParams', 'GetAllContexts', 'GetAllRoles', 'deleteRole', 'GetRole', 'addRole', 'editRole', '$timeout', function($scope,$rootScope,$window,$routeParams,GetAllContexts,GetAllRoles,deleteRole,GetRole,addRole,editRole,$timeout){
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
        var id = $('#addRole select[name=role_rights]').val();
        if(id != '') {
            if ($('#addRole .right_chip[data-id="' + id + '"').length < 1) {
                $('#addRole .rights_list .mCSB_container').append('<div class="right_chip" data-id="' + id + '"><span>' + $('#addRole .add-multiple .select2-chosen').html() + '</span><div class="rights_icons"><span class="rights create"><i class="fa fa-plus"></i></span><span class="rights update_icn"><i class="fa fa-edit"></i></span><span class="rights delete_icn"><i class="fa fa-times"></i></span><span class="rights read"><i class="fa fa-eye"></i></span></div></div>');
                $("#addRole .add-multiple").select2('data', null);
            }
            $scope.empty_flag = false;
        }
    });

    $(document).on('click','#editRole .add-role', function () {
        var id = $('#editRole select[name=role_rights]').val();
        if(id != '') {
            if ($('#editRole .right_chip[data-id="' + id + '"').length < 1) {
                $('#editRole .rights_list .mCSB_container').append('<div class="#editRole right_chip" data-id="' + id + '"><span>' + $('#editRole .add-multiple .select2-chosen').html() + '</span><div class="rights_icons"><span class="rights create"><i class="fa fa-plus"></i></span><span class="rights update_icn"><i class="fa fa-edit"></i></span><span class="rights delete_icn"><i class="fa fa-times"></i></span><span class="rights read"><i class="fa fa-eye"></i></span></div></div>');
                $("#editRole .add-multiple").select2('data', null);
            }
            $scope.empty_flag = false;
        }
    });

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
            $scope.editRights = [];
            $('#editRole .rights_list .mCSB_container').html('');
            $scope.editRoleData = res;
            $.each($scope.editRoleData.data,function (i,value) {
                var add_class = '';
                var update_class = '';
                var read_class = '';
                var delete_class = '';
                if(value.add_right == 1) add_class = ' active';
                if(value.update_right == 1) update_class = ' active';
                if(value.delete_right == 1) delete_class = ' active';
                if(value.view_right == 1) read_class = ' active';
                $('#editRole .rights_list .mCSB_container').append('<div class="right_chip" data-id="' + value.context_id + '"><span>' + value.context + '</span><div class="rights_icons"><span class="rights create'+ add_class +'"><i class="fa fa-plus"></i></span><span class="rights update_icn'+ update_class +'"><i class="fa fa-edit"></i></span><span class="rights delete_icn'+ delete_class +'"><i class="fa fa-times"></i></span><span class="rights read'+ read_class +'"><i class="fa fa-eye"></i></span></div></div>');
            });
            $('#editRole').modal('show');
        }
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
                if($(this).find('.create').hasClass('active')) create = '1';
                if($(this).find('.read').hasClass('active')) read = '1';
                if($(this).find('.update_icn').hasClass('active')) update = '1';
                if($(this).find('.delete_icn').hasClass('active')) deletes = '1';
                $scope.rights[i] = {context_id : $(this).data('id'),is_add: create,is_read: read, is_update:update, is_delete:deletes};
            });
        }else{
            //$('.error').html('Please add at least one right');
            //$('.error').show();
        }
        addRole.save({
            token : $window.sessionStorage.token,
            name : roleData.name,
            role_rights: JSON.stringify($scope.rights)
        },addRoleSuccess,addRoleFailure);
    };
    function addRoleSuccess(res){ // on success
        if (res.status == true) {
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
                if($(this).find('.create').hasClass('active')) create = '1';
                if($(this).find('.read').hasClass('active')) read = '1';
                if($(this).find('.update_icn').hasClass('active')) update = '1';
                if($(this).find('.delete_icn').hasClass('active')) deletes = '1';
                $scope.editRights[i] = {context_id : $(this).data('id'),is_add: create,is_read: read, is_update:update, is_delete:deletes};
            });
        }else{
            //$('.error').html('Please add at least one right');
            //$('.error').show();
        }
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
}]);
