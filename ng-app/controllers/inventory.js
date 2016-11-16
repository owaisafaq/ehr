var AppEHR = angular.module('AppEHR');
        AppEHR.controller('Inventory', ['$scope', '$rootScope', '$window', '$routeParams', 'GetAllInventory', 'GetAllSuppliers', 'AddCategory', 'GetAllCategories', 'AddSupplier', 'GetSingleSupplier', 'UpdateSuppliers', 'GetSingleCategory', 'GetSingleStock', 'updateCategory', 'DeleteCategory', 'DeleteSupplier', 'AddInventory', 'AddProduct', 'DeleteInventory', 'GetSingleProduct', 'GetAllPharmacies', 'GetReorderLevel', 'updateReorderLevel', 'GetProduct', 'ProductUpdate', 'Countries', 'States', 'City', 'AddMoreStock', '$timeout', 'CategoriesByGroup', function($scope, $rootScope, $window, $routeParams, GetAllInventory, GetAllSuppliers, AddCategory, GetAllCategories, AddSupplier, GetSingleSupplier, UpdateSuppliers, GetSingleCategory, GetSingleStock, updateCategory, DeleteCategory, DeleteSupplier, AddInventory, AddProduct, DeleteInventory, GetSingleProduct, GetAllPharmacies, GetReorderLevel, updateReorderLevel, GetProduct, ProductUpdate, Countries, States, City, AddMoreStock, $timeout, CategoriesByGroup){
        $rootScope.pageTitle = "EHR - Inventory";
        $scope.displayInfo = {};
        $rootScope.loader = "show";
        $scope.cat_unique = {};
        $scope.inventory = {};
        $scope.selectedSupplier = {};
        $scope.limit = 15;
        GetAllInventory.get({
            offset: 0,
            limit: $scope.limit,
            token: $window.sessionStorage.token,
        }, GetAllInventorySuccess, GetAllInventoryFailure);
        function GetAllInventorySuccess(res) {
            $rootScope.loader = "hide";
            if (res.status == true) {
                if (res.data.length == 0){
                $('#noRecordFound').modal('show');
                    return true;
                }
                $scope.InventoryLists = res.data;
                $scope.inventoryCount = res.count;
                console.log($scope.InventoryLists, 'inventory');
            }else if(res.error_code == 500){
                console.log(res);
                $rootScope.RolesAccess(res.message);
            }
        }

        function GetAllInventoryFailure(error) {
        $('#internetError').modal('show');
                console.log(error);
        }

        GetAllSuppliers.get({
            token: $window.sessionStorage.token,
            offset: 0,
            limit: $scope.limit
        }, GetAllSupplierSuccess, GetAllSupplierFailure);
        function GetAllSupplierSuccess(res) {
            if (res.status == true) {
                $scope.SuppplierLists = res.data;
                $scope.supplimentsCount = res.count;
            }
        }

        function GetAllSupplierFailure(error) {
        $('#internetError').modal('show');
                console.log(error);
        }

        // Add Category

        $scope.AddCategory = function (category) {

        if (angular.equals({}, category) == false) {
                $scope.hideLoader = 'show';
                //$scope.updateEncounterBtn = true;
                //console.log($scope.displayInfo.patient_id);
                var addCateogry = {
                token: $window.sessionStorage.token,
                        cat_name: category.cat_name,
                        cat_desc: category.cat_desc,
                        cat_group: category.cat_group,
                }
            angular.copy(addCateogry, $scope.cat_unique);
                AddCategory.save(addCateogry, CategorySuccess, CategoryFailure);
        }
        }

        function CategorySuccess(res) {
            if (res.status == true) {
            $rootScope.loader = "hide";
                    $scope.CategoryLists.push($scope.cat_unique);
                    $timeout(function () {
                    $('#addCategory').modal('hide');
                    }, 500);
            }else if(res.error_code == 500){
                console.log(res);
                $rootScope.RolesAccess(res.message);
            }
        }

        function CategoryFailure(error) {
        $('#internetError').modal('show');
                console.log(error);
        }


        // Get Categories


//Get Pharmacies


        GetAllPharmacies.get({
        token: $window.sessionStorage.token

        }, GetAllPharmaciesSuccess, GetAllPharmaciesFailure);
                function GetAllPharmaciesSuccess(res) {
                if (res.status == true) {
                $scope.PharmacyLists = res.data;
                        console.log($scope.PharmacyLists)
                }
                }

        function GetAllPharmaciesFailure(error) {
        $('#internetError').modal('show');
                console.log(error);
        }





// Add Supplier
        $scope.AddSupplier1 = function (supplier) {
        if (angular.equals({}, category) == false) {
        $scope.hideLoader = 'show';
                //$scope.updateEncounterBtn = true;
                //console.log($scope.displayInfo.patient_id);
                var addSupplier = {
                token: $window.sessionStorage.token,
                        name:supplier.sname,
                        contact_person:supplier.contact_person,
                        city:supplier.city,
                        state:supplier.state,
                        country:supplier.country,
                        address_1:supplier.address_1,
                        address_2:supplier.address_2,
                        email:supplier.email,
                        work_phone:supplier.wphone,
                        mobile:supplier.mobile,
                        website:supplier.website,
                        post_code:supplier.post_code

                }
        AddSupplier.save(addSupplier, SupplierSuccess, SupplierFailure);
        }
        }

        function SupplierSuccess(res) {
        if (res.status == true) {
        $rootScope.loader = "hide";
                $timeout(function () {
                $('#addSupplier').modal('hide');
                }, 500);
                GetAllSuppliers.get({
                token: $window.sessionStorage.token

                }, GetAllSupplierSuccess, GetAllSupplierFailure);
        }else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        }
        }

        function SupplierFailure(error) {
        $('#internetError').modal('show');
                console.log(error);
        }

        $scope.inventory.group = undefined;
                $scope.groupchange = function(){
                if ($scope.inventory.group == "Documents") {
                $scope.inventory.quantity = '';
                        console.log('document');
                } else if ($scope.inventory.group == "Others"){
                $scope.inventory.quantity = '';
                        $scope.inventory.strength = '';
                }
                }
// Add Inventory
        $scope.AddInventory = function (inventory) {
            if (inventory.product_name != undefined && inventory.reorder_level != undefined && inventory.order_quantity != undefined && inventory.quantity != undefined && inventory.price != undefined && inventory.pharmacy_id != undefined) {
            $rootScope.loader = 'show';
                
            var val = inventory.price;
            var myString = val.substr(val.indexOf(".") + 1)
            if(myString == ""){
                val = val + "00"
            }
                
                var addInventory = {
                token: $window.sessionStorage.token,
                        pharmacy_id:inventory.pharmacy_id == undefined ? '' :inventory.pharmacy_id,
                        manufacturer_id:inventory.manufacturer_id == undefined ? '' :inventory.manufacturer_id,
                        supplier_id:inventory.supp_id == undefined ? '' :inventory.supp_id,
                        received_date:inventory.recvd_date == undefined ? '' :inventory.recvd_date,
                        batch_no:inventory.batch_number == undefined ? '' :inventory.batch_number,
                        ref_no	:inventory.ref_no == undefined ? '' :inventory.ref_no,
                        expiry	:inventory.expiry_date == undefined ? '' :inventory.expiry_date,
                        quantity:inventory.quantity == undefined ? '' :inventory.quantity,
                        order_quantity:inventory.order_quantity == undefined ? '' :inventory.order_quantity,
                        pack:'pack',
                        dept_id:inventory.group == undefined ? '' :inventory.group,
                        group:inventory.group == undefined ? '' :inventory.group,
                        product_name:inventory.product_name == undefined ? '' :inventory.product_name,
                        trade_name:inventory.trade_name == undefined ? '' :inventory.trade_name,
                        route:inventory.route == undefined ? '' :inventory.route,
                        reorder_level:inventory.reorder_level == undefined ? '' :inventory.reorder_level,
                        cat_id:inventory.cat_id == undefined ? '' :inventory.cat_id,
                        cost_per_item : val,
                        dose_from:inventory.dose_from == undefined ? '' :inventory.dose_from
                }
        if (inventory.group == "Documents"){
        addInventory.strength = '';
        }
        else{
        addInventory.strength = inventory.strength == undefined ? '' :inventory.strength;
        }
        var addProduct = {
        token:$window.sessionStorage.token,
                department_id:inventory.group == undefined ? '' :inventory.group,
                product_name:inventory.product_name == undefined ? '' :inventory.product_name,
                trade_name:inventory.trade_name == undefined ? '' :inventory.trade_name,
                route:inventory.route == undefined ? '' :inventory.route,
                reorder_level:inventory.reorder_level == undefined ? '' :inventory.reorder_level,
                cat_id:inventory.cat_id == undefined ? '' :inventory.cat_id,
                strength:inventory.strength == undefined ? '' :inventory.strength,
                dose_from:inventory.dose_from == undefined ? '' :inventory.dose_from
        }
        console.log(addInventory);
                AddInventory.save(addInventory, AddInventorySuccess, AddInventoryFailure);
        }
        }

        function AddInventorySuccess(res) {
        if (res.status == true) {
        $rootScope.loader = "hide";
                $("#stock_det").hide();
                $(".add-drug-supplements").hide();
                $(".add-drug-others").hide();
                $(".inventory_detail").show();
                $(".inv_header").show();
                $scope.submitted = false;
                $scope.inventory = {};
                $('#errorModal').modal('show');
                $scope.inventoryError = res.message;
                $scope.modalHeader = "Status";
                document.getElementById("addInv").reset();
                GetAllInventory.get({
                    token: $window.sessionStorage.token,
                }, GetAllInventorySuccess, GetAllInventoryFailure);
            }else if(res.error_code == 500){
                console.log(res);
                $rootScope.RolesAccess(res.message);
            } else{
                $rootScope.loader = "hide";
                $('#errorModal').modal('show');
                $scope.inventoryError = res.message;
                $scope.modalHeader = "Error";
            }
        }

        function AddInventoryFailure(error) {
        $('#internetError').modal('show');
                console.log(error);
        }

        /*function AddProductSuccess(res) {
         console.log(res);
         if (res.status == true) {
         $rootScope.loader = "hide";
         console.log("in product now");
         
         
         $("#stock_det").hide();
         $(".add-drug-supplements").hide();
         $(".add-drug-others").hide();
         $(".inventory_detail").show();
         $(".inv_header").show();
         
         
         document.getElementById("addInv").reset();
         
         
         GetAllInventory.get({
         token: $window.sessionStorage.token,
         }, GetAllInventorySuccess, GetAllInventoryFailure);
         
         }
         }
         
         function AddProductFailure(error) {
         console.log(error);
         }
         */



        //Add Stock

        $scope.AddStock = function (stock) {
        console.log($scope.productID);
                console.log(stock);
                if (angular.equals({}, category) == false) {
                    var val = stock.price;
            var myString = val.substr(val.indexOf(".") + 1)
            if(myString == ""){
                val = val + "00"
            }
                    
        $scope.hideLoader = 'show';
                //$scope.updateEncounterBtn = true;
                //console.log($scope.displayInfo.patient_id);
                var addStock = {
                product_id:$scope.productID,
                        pharmacy_id:stock.pharmacy_id,
                        manufacturer_id:stock.manufacturer_id,
                        dept_id:"1",
                        supplier_id:stock.supp_id,
                        received_date:stock.recvd_date,
                        batch_no:stock.batch_number,
                        ref_no:stock.ref_no,
                        expiry:stock.expiry_date,
                        quantity:stock.quantity,
                        order_quantity:"",
                        cost_per_item:val,
                        pack:stock.pack,
                        token:$window.sessionStorage.token,
                }
        AddMoreStock.get(addStock, AddStockSuccess, AddStockFailure);
        }
        };
                function AddStockSuccess(res) {
                if (res.status == true) {

                GetSingleStock.get({token: $window.sessionStorage.token, product_id: $scope.productID}, getStockInfoSuccess, getStockInfoFailure);
                        function getStockInfoSuccess(res) {
                        if (res.status == true) {
                        //console.log(res);
                        $rootScope.loader = "hide";
                                //$scope.SupplierSelected = true;
                                $scope.selectedStocks = res.data;
                                console.log($scope.selectedStocks);
                                $(".inventory_detail").hide();
                                $(".add_stock").hide();
                                $("#stock_det").show();
                        }
                        }
                function getStockInfoFailure(error) {
                $rootScope.loader = "hide";
                        $('#internetError').modal('show');
                        console.log(error);
                }


                }else if(res.error_code == 500){
                    console.log(res);
                    $rootScope.RolesAccess(res.message);
                }
                }

        function AddStockFailure(error) {

        console.log(error);
        }
        //Add stock





//// Update Category
        $scope.UpdateCategory = function (category) {

        if (angular.equals({}, category) == false) {
        $scope.hideLoader = 'show';
                console.log(category);
                var CategoryUpdate = {
                token: $window.sessionStorage.token,
                        cat_id:category.id,
                        cat_name:category.cat_name,
                        cat_desc:category.cat_desc,
                        cat_group:category.cat_group


                }
        console.log(updateCategory);
                updateCategory.save(CategoryUpdate, UpdateCategorySuccess, UpdateCategoryFailure);
        }
        }



//// Update Invenbtory
        $scope.EditInventory = function (editInv) {

        if (angular.equals({}, category) == false) {
        $scope.hideLoader = 'show';
                console.log(editInv);
                /*var CategoryUpdate={
                 token: $window.sessionStorage.token,
                 cat_id:category.id,
                 cat_name:category.cat_name,
                 cat_desc:category.cat_desc,
                 cat_group:category.cat_group
                 
                 
                 }
                 console.log(updateCategory);
                 updateCategory.save(CategoryUpdate, UpdateCategorySuccess, UpdateCategoryFailure);*/

        }
        }

        function UpdateCategorySuccess(res) {
            console.log(res);
                    console.log(res);
                    if (res.status == true) {
            $rootScope.loader = "hide";
                    $timeout(function () {
                    $('#editCategory').modal('hide');
                    }, 500);
                    GetAllCategories.get({
                    token: $window.sessionStorage.token

                    }, GetAllCategoriesSuccess, GetAllCategoriesFailure);
            }else if(res.error_code == 500){
                console.log(res);
                $rootScope.RolesAccess(res.message);
            }
        }

        function UpdateCategoryFailure(error) {
        $('#internetError').modal('show');
                console.log(error);
        }




//// Update Supplier
        $scope.UpdateSupplier = function (supplier) {

        if (angular.equals({}, category) == false) {
        $scope.hideLoader = 'show';
                //$scope.updateEncounterBtn = true;
                //console.log($scope.displayInfo.patient_id);
                var updateSupplier = {
                token: $window.sessionStorage.token,
                        supplier_id:supplier.id,
                        name:supplier.name,
                        contact_person:supplier.contact_person,
                        city:supplier.city,
                        state:supplier.state,
                        country:supplier.country,
                        address_1:supplier.address_1,
                        address_2:supplier.address_2,
                        email:supplier.email,
                        work_phone:supplier.work_phone,
                        mobile:supplier.mobile,
                        website:supplier.website,
                        post_code:supplier.post_code

                }
        console.log(updateSupplier);
                UpdateSuppliers.save(updateSupplier, UpdateSupplierSuccess, UpdateSupplierFailure);
        }
        }

        function UpdateSupplierSuccess(res) {
        console.log(res);
            if (res.status == true) {
                $rootScope.loader = "hide";
                $timeout(function () {
                $('#editSupplier').modal('hide');
                }, 500);
                GetAllSuppliers.get({
                token: $window.sessionStorage.token

                }, GetAllSupplierSuccess, GetAllSupplierFailure);
            }else if(res.error_code == 500){
                console.log(res);
                $rootScope.RolesAccess(res.message);
            }
        }

        function UpdateSupplierFailure(error) {
        $('#internetError').modal('show');
                console.log(error);
        }




        //Delete Supplier



        $scope.SupplierDeleted = function (supplierID) {
        console.log(supplierID);
                $scope.supplierID = supplierID;
                $rootScope.loader = "show";
                DeleteSupplier.save({token: $window.sessionStorage.token, supplier_id: supplierID}, deleteSupplierInfoSuccess, deleteSupplierInfoFailure);
                function deleteSupplierInfoSuccess(res) {
                if (res.status == true) {
                $rootScope.loader = "hide";
                        console.log("Deleted");
                        GetAllSuppliers.get({
                        token: $window.sessionStorage.token

                        }, GetAllSupplierSuccess, GetAllSupplierFailure);
                }else if(res.error_code == 500){
                    console.log(res);
                    $rootScope.RolesAccess(res.message);
                }
                }
        function deleteSupplierInfoFailure(error) {
        $rootScope.loader = "hide";
                $('#internetError').modal('show');
                console.log(error);
        }
        };
                //Delete Inventory



                $scope.DeleteInventory = function (stockID) {
                console.log(stockID);
                        $scope.stockID = stockID;
                        $rootScope.loader = "show";
                        DeleteInventory.save({token: $window.sessionStorage.token, product_id: stockID}, deleteStockInfoSuccess, deleteStockInfoFailure);
                        function deleteStockInfoSuccess(res) {
                            if (res.status == true) {
                            $rootScope.loader = "hide";
                                    console.log("Deleted");
                                    GetAllInventory.get({
                                        token: $window.sessionStorage.token,
                                    }, GetAllInventorySuccess, GetAllInventoryFailure);
                            }else if(res.error_code == 500){
                                console.log(res);
                                $rootScope.RolesAccess(res.message);
                            }
                        }
                function deleteStockInfoFailure(error) {
                $rootScope.loader = "hide";
                        $('#internetError').modal('show');
                        console.log(error);
                }
                };
// Get Single Category
                $scope.catSelected = function (catID) {
                console.log(catID);
                        $scope.catID = catID;
                        $scope.selectedCategory = {};
                        $rootScope.loader = "show";
                        GetSingleCategory.get({token: $window.sessionStorage.token, cat_id: catID}, getCategoryInfoSuccess, getCategoryInfoFailure);
                        function getCategoryInfoSuccess(res) {
                            if (res.status == true) {
                            $rootScope.loader = "hide";
                                    $scope.selectedCategory = res.data;
                                    console.log($scope.selectedCategory);
                                    $('#editCategory').modal('show');
                            }else if(res.error_code == 500){
                                console.log(res);
                                $rootScope.RolesAccess(res.message);
                            }
                        }
                function getCategoryInfoFailure(error) {
                $rootScope.loader = "hide";
                        $('#internetError').modal('show');
                        console.log(error);
                }
                };
                //Delete Category



                $scope.catDeleted = function (catID) {
                console.log(catID);
                        $scope.catID = catID;
                        $rootScope.loader = "show";
                        DeleteCategory.save({token: $window.sessionStorage.token, cat_id: catID}, deleteCategoryInfoSuccess, deleteCategoryInfoFailure);
                        function deleteCategoryInfoSuccess(res) {
                            if (res.status == true) {
                            $rootScope.loader = "hide";
                                    console.log("Deleted");
                                    GetAllCategories.get({
                                    token: $window.sessionStorage.token

                                    }, GetAllCategoriesSuccess, GetAllCategoriesFailure);
                            }else if(res.error_code == 500){
                                console.log(res);
                                $rootScope.RolesAccess(res.message);
                            }
                        }
                function deleteCategoryInfoFailure(error) {
                $rootScope.loader = "hide";
                        $('#internetError').modal('show');
                        console.log(error);
                }
                };
//Get Single Supplier

                $scope.SupplierSelected = function (supplierID) {
                console.log(supplierID);
                        $scope.supplierID = supplierID;
                        $rootScope.loader = "show";
                        GetSingleSupplier.get({token: $window.sessionStorage.token, supplier_id: supplierID}, getSupplierInfoSuccess, getSupplierInfoFailure);
                        function getSupplierInfoSuccess(res) {
                            if (res.status == true) {
                            //console.log(res);
                            $rootScope.loader = "hide";
                                    //$scope.SupplierSelected = true;
                                    $scope.selectedSupplier = res.data;
                                    console.log($scope.selectedSupplier);
                                    $('#editSupplier').modal('show');
                            }else if(res.error_code == 500){
                                console.log(res);
                                $rootScope.RolesAccess(res.message);
                            }
                        }
                function getSupplierInfoFailure(error) {
                $rootScope.loader = "hide";
                        $('#internetError').modal('show');
                        console.log(error);
                }
                };
                $scope.StockSelected = function (productID) {
                console.log(productID);
                        $scope.productID = productID;
                        $rootScope.loader = "show";
                        GetSingleStock.get({token: $window.sessionStorage.token, product_id: productID}, getStockInfoSuccess, getStockInfoFailure);
                        function getStockInfoSuccess(res) {
                        if (res.status == true) {
                        //console.log(res);
                        $rootScope.loader = "hide";
                                //$scope.SupplierSelected = true;
                                $scope.selectedStocks = res.data;
                                console.log($scope.selectedStocks);
                                $(".inventory_detail").hide();
                                $("#stock_det").show();
                        }
                        }
                function getStockInfoFailure(error) {
                $rootScope.loader = "hide";
                        $('#internetError').modal('show');
                        console.log(error);
                }
                };
                $scope.productDetail = function (productID) {
                    console.log(productID);
                    $scope.productID = productID;
                    $(".inventory_detail").hide();
                    $(".inventPagination").hide();
                    $(".inv_header").hide();
                    $("#stock_det").hide();
                    $(".add-drug-supplements").hide();
                    $(".edit_prod").show();
                    $rootScope.loader = "show";
                    GetProduct.get({token: $window.sessionStorage.token, product_id: productID}, getProductInfoSuccess, getProductInfoFailure);
                    function getProductInfoSuccess(res) {
                        if (res.status == true) {
                            //console.log(res);
                            $rootScope.loader = "hide";
                            $scope.catByGroup();
                            //$scope.SupplierSelected = true;
                            setTimeout(function () {
                                $('select').not('.select_searchFields,.search-ajax').select2({minimumResultsForSearch: Infinity});
                            },100);
                            $scope.editinventory = res.data;
                            console.log($scope.editinventory);
                            /*$(".inventory_detail").hide();
                             $("#stock_det").show();*/
                        }
                    }
                    function getProductInfoFailure(error) {
                        $rootScope.loader = "hide";
                        $('#internetError').modal('show');
                        console.log(error);
                    }
                };
// Get Product ReorderLevel


                $scope.StockSelectedReorder = function (productID) {
                console.log(productID);
                        $scope.productID = productID;
                        //$rootScope.loader = "show";



                        GetReorderLevel.get({token: $window.sessionStorage.token, product_id: productID}, getReorderInfoSuccess, getReorderInfoFailure);
                        function getReorderInfoSuccess(res) {
                        if (res.status == true) {
                        //console.log(res);
                        $rootScope.loader = "hide";
                                //$scope.SupplierSelected = true;
                                $scope.selectedReorderProduct = res.data;
                                console.log($scope.selectedReorderProduct);
                                $('#update_reorder').modal('show');
                                /*$(".inventory_detail").hide();
                                 $("#stock_det").show();*/


                        }
                        }
                function getReorderInfoFailure(error) {
                $rootScope.loader = "hide";
                        $('#internetError').modal('show');
                        console.log(error);
                }
                };
// Update Product ReorderLevel


                $scope.UpdateReorder = function (selectedInvnetory, productID) {
                console.log(productID);
                        var ReorderUpdate = {
                        token: $window.sessionStorage.token,
                                product_id:productID,
                                reorder_level:selectedInvnetory.reorder_level
                        }
                console.log(ReorderUpdate);
                        updateReorderLevel.save(ReorderUpdate, ReorderUpdateSuccess, ReorderUpdateFailure);
                        function ReorderUpdateSuccess(res) {
                            console.log(res);
                            console.log(res);
                            if (res.status == true) {
                                $rootScope.loader = "hide";
                                $timeout(function () {
                                $('#update_reorder').modal('hide');
                                }, 500);
                                GetAllInventory.get({
                                token: $window.sessionStorage.token,
                                }, GetAllInventorySuccess, GetAllInventoryFailure);
                            }else if(res.error_code == 500){
                                console.log(res);
                                $rootScope.RolesAccess(res.message);
                            }
                        }

                function ReorderUpdateFailure(error) {
                $('#internetError').modal('show');
                        console.log(error);
                }
                };
// Update Product


                $scope.EditProduct = function (editinventory) {
                console.log(editinventory);
                        var updateProduct = {
                        token:$window.sessionStorage.token,
                                product_id:editinventory.id,
                                description:editinventory.description,
                                group:editinventory.group,
                                department_id:editinventory.department_id,
                                product_name:editinventory.name,
                                trade_name:editinventory.trade_name,
                                route:editinventory.route,
                                reorder_level:editinventory.reorder_level,
                                cat_id:editinventory.cat_id,
                                strength:editinventory.strength,
                                dose_from:editinventory.dose_from


                        }
                console.log(updateProduct);
                        ProductUpdate.save(updateProduct, ProductUpdateSuccess, ProductUpdateFailure);
                        function ProductUpdateSuccess(res) {

                                console.log(res);
                            if (res.status == true) {
                                 $rootScope.loader = "hide";
                                $(".inventory_detail").show();
                                $(".inv_header").show();
                                //$("#stock_det").hide();
                                //$(".add-drug-supplements").hide();
                                $(".edit_prod").hide();
                                GetAllInventory.get({
                                token: $window.sessionStorage.token,
                                }, GetAllInventorySuccess, GetAllInventoryFailure);
                            }else if(res.error_code == 500){
                                console.log(res);
                                $rootScope.RolesAccess(res.message);
                            }
                        }

                function ProductUpdateFailure(error) {
                $('#internetError').modal('show');
                        console.log(error);
                }

                };
                Countries.get({
                token: $window.sessionStorage.token,
                }, GetAllCountriesSuccess, GetAllCountriesFailure);
                function GetAllCountriesSuccess(res) {
                if (res.status == true) {

                $scope.Countries = res.data;
                        console.log($scope.Countries);
                }
                }
        function GetAllCountriesFailure(error) {
        //$rootScope.loader = "show";
        $('#internetError').modal('show');
                console.log(error);
        }



        $scope.getStatesfromCountry = function(country_id){

        console.log(country_id);
                States.get({
                token: $window.sessionStorage.token, country_id:country_id,
                }, GetAllStatesSuccess, GetAllStatesFailure);
                function GetAllStatesSuccess(res) {
                if (res.status == true) {

                $scope.States = res.data;
                        console.log($scope.States);
                }
                }
        function GetAllStatesFailure(error) {
        //$rootScope.loader = "show";
        $('#internetError').modal('show');
                console.log(error);
        }



        };
                $scope.getCitiesfromStates = function(state_id){

                console.log(state_id);
                        City.get({
                        token: $window.sessionStorage.token, state_id:state_id,
                        }, GetAllCitiesSuccess, GetAllCitiesFailure);
                        function GetAllCitiesSuccess(res) {
                        if (res.status == true) {

                        $scope.Cities = res.data;
                                console.log($scope.Cities);
                        }
                        }
                function GetAllCitiesFailure(error) {
                //$rootScope.loader = "show";
                $('#internetError').modal('show');
                        console.log(error);
                }



                };
                GetAllCategories.get({
                    group : 'Drugs',
                    offset: 0,
                    limit: $scope.limit,
                    token: $window.sessionStorage.token
                }, GetAllCategoriesSuccess, GetAllCategoriesFailure);
                function GetAllCategoriesSuccess(res) {
                if (res.status == true) {
                    $scope.CategoryLists = res.data;
                    $scope.catCount = res.count;
                }
                }

        function GetAllCategoriesFailure(error) {
        $('#internetError').modal('show');
                console.log(error);
        }

        $('#group_select').on('change', function (){
        GetAllCategories.get({
        group : $('#group_select option:selected').text(),
                token: $window.sessionStorage.token

        }, GetAllCategoriesSuccess, GetAllCategoriesFailure);
                function GetAllCategoriesSuccess(res) {
                if (res.status == true) {
                $scope.CategoryLists = res.data;
                }
                }

        function GetAllCategoriesFailure(error) {
        $('#internetError').modal('show');
                console.log(error);
        }
        })

        $scope.curPage = 0;
        $scope.pageSize = 15;
        $scope.numberOfPages = function() {
            return Math.ceil($scope.inventoryCount / $scope.pageSize);
        };

        $scope.paginationNext = function(pageSize, curPage){
            $rootScope.loader = "show";
            GetAllInventory.get({
                token: $window.sessionStorage.token,
                offset: (pageSize * curPage), limit: $scope.limit
            }, GetAllInventorySuccess, GetAllInventoryFailure);
        }

        $scope.paginationPrev = function(pageSize, curPage){
            $rootScope.loader = "show";
            GetAllInventory.get({
                token: $window.sessionStorage.token,
                offset: (pageSize - 1) * curPage, limit: $scope.limit
            }, GetAllInventorySuccess, GetAllInventoryFailure);
            
        }

        $scope.curPageSupplements = 0;
        $scope.pageSizeSupplements = 15;
        $scope.numberOfPagesInvoices = function() {
          return Math.ceil($scope.supplimentsCount / $scope.pageSize);
        };

        $scope.paginationNextS = function(pageSize, curPage){
            $rootScope.loader = "show";
            GetAllSuppliers.get({
                token: $window.sessionStorage.token,
                offset: (pageSize * curPage), limit: $scope.limit
            }, GetAllSupplierSuccess, GetAllSupplierFailure);
        }

        $scope.paginationPrevS = function(pageSize, curPage){
            $rootScope.loader = "show";
            GetAllSuppliers.get({
                token: $window.sessionStorage.token,
                offset: (pageSize * curPage), limit: $scope.limit
            }, GetAllSupplierSuccess, GetAllSupplierFailure);
        }

        $scope.curPageCat = 0;
        $scope.pageSizeCat = 15;
        $scope.numberOfPagesCat = function() {
          return Math.ceil($scope.catCount / $scope.pageSize);
        };

        $scope.paginationNextC = function(pageSize, curPage){
            $rootScope.loader = "show";
            GetAllCategories.get({
                group : 'Drugs',
                offset: (pageSize * curPage), limit: $scope.limit,
                token: $window.sessionStorage.token
            }, GetAllCategoriesSuccess, GetAllCategoriesFailure);
        }

        $scope.paginationPrevC = function(pageSize, curPage){
            $rootScope.loader = "show";
            GetAllCategories.get({
                group : 'Drugs',
                offset: (pageSize * curPage), limit: $scope.limit,
                token: $window.sessionStorage.token
            }, GetAllCategoriesSuccess, GetAllCategoriesFailure);
        }

        $scope.catByGroup = function(group){
            CategoriesByGroup.get({
                token: $window.sessionStorage.token,
                group: group == undefined ? "Drugs" : group
            }, catByGroupSuccess, GetAllCategoriesFailure);
        }

        function catByGroupSuccess(res){
            if(res.status == true){
                $scope.catByGroupData = res.data;
            }
        }
}]);