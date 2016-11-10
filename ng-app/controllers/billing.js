var AppEHR = angular.module('AppEHR');

AppEHR.controller('billing', ['$scope', '$rootScope','$window','$routeParams','$location','GetAllBills','GetAllInvoices','GetPatientInfo','InvoiecStatus','ProcessPayment','InvoiceData','GetBillInvoices','SendEmail', 'CheckoutPatient', 'deleteInvoice', 'AddToBill', 'GetAllBillingCodes', 'GetAllproducts', 'SendEmail', 'GetBillingWithDates', 'DropDownData', 'GetAllWardsDropDown', 'GetBedsByWard', 'AddPatientRegBill', 'WaiveBill', 'WaiveBillInvoice', function($scope, $rootScope,$window,$routeParams,$location,GetAllBills,GetAllInvoices,GetPatientInfo,InvoiecStatus,ProcessPayment,InvoiceData,GetBillInvoices,SendEmail, CheckoutPatient, deleteInvoice, AddToBill, GetAllBillingCodes, GetAllproducts, SendEmail, GetBillingWithDates, DropDownData, GetAllWardsDropDown, GetBedsByWard, AddPatientRegBill, WaiveBill, WaiveBillInvoice){
	$rootScope.pageTitle = "EHR - Billing";
	$scope.BillListings={};
	$scope.selectedPatient = {};
	$scope.AmountPaid = {};
	$scope.dataStrip = "c";
    $scope.disable_tabs = true;
	$rootScope.loader = "show";
	$scope.tabs_sec = 'qqqqq';
    $scope.product_show= 'product';
    $scope.deleteInvoiceButton = true;

	if($routeParams.patientID != undefined){
		$scope.patientID = $routeParams.patientID;
		$scope.search_all_bill = $scope.patientID;
	}

	//Get Bills
	GetAllBills.get({
		token: $window.sessionStorage.token,
	}, GetAllBillsSuccess, GetAllBillsFailure);

	function GetAllBillsSuccess(res) {
		console.log(res);
		if (res.status == true) {
			$rootScope.loader = "hide";
			if(res.data.length == 0){
				$('#noResultFound').modal('show');
				return true;
			}
			$scope.BillListings = res.data;
                        console.log(res.data);
                        console.log("catch me here")
		}else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        }
	}

	function GetAllBillsFailure(error) {
		$('#internetError').modal('show');
		console.log(error);
	}

	//Get All Invoices
//        function invoiceByBill(billId){}
	
	$scope.SelectedPatientWithInvoice = function(patient_id,invoice_id, tAmount, status){

		$scope.patient_id = patient_id;
		$scope.invoice_id = invoice_id;
		$scope.tAmount = tAmount;
		$scope.deleteInvoiceButton = false;
		$scope.invoiceDelete = status;

		$rootScope.loader = "show";
		GetPatientInfo.get({token: $window.sessionStorage.token, patient_id: patient_id}, getPatientInfoSuccess, getPatientInfoFailure);
		function getPatientInfoSuccess(res) {
			if (res.status == true) {
				$rootScope.loader = "hide";
				$scope.tabs_sec = 'tabs-sec';
				$scope.dataStrip = "custom-card";
				$scope.selectedPatient = res.data;
				$(".billing").show();

			}
		}
		function getPatientInfoFailure(error) {
			$rootScope.loader = "hide";
			$('#internetError').modal('show');
			console.log(error);
		}
                
	};


	$scope.prcessingPaymentClick=function(invoice_id) {

		console.log("Invoice:"+invoice_id);


		InvoiecStatus.get({token: $window.sessionStorage.token, invoice_id: invoice_id}, InvoiecStatusSuccess, InvoiecStatusFailure);
		function InvoiecStatusSuccess(res) {
			if (res.status == true) {

				var status = res.data.invoice_status;
				console.log(status);

				var invoice=invoice_id ;

				if(invoice==null){
					return false;
				}


				else{

					if(status=='paid'){
						$("#paid_modal").modal('show');
					}

					else{

						$("#process_payment").modal('show');
					}
				}
			}else if(res.error_code == 500){
                console.log(res);
                $rootScope.RolesAccess(res.message);
            }
		}
		function InvoiecStatusFailure(error) {
			$rootScope.loader = "hide";
			$('#internetError').modal('show');
			console.log(error);
		}








	};

	$scope.ProcessingPayment=function(AmountPaid,invoice_id){

		console.log("Amount: "+AmountPaid.amount_paid);
		console.log("Invoice:"+invoice_id);

		ProcessPayment.get({token: $window.sessionStorage.token, invoice_id: invoice_id, amount_paid:AmountPaid.amount_paid}, PaymentSuccess, PaymentFailure);
		function PaymentSuccess(res) {
			if (res.status == true) {
				$rootScope.loader = "hide";

				$("#process_payment").modal('hide');


				



				GetAllInvoices.get({
					token: $window.sessionStorage.token,
					bill_id : $scope.bill_id
				}, GetAllInvoicesSuccess, GetAllInvoicesFailure);

				GetAllBills.get({
					token: $window.sessionStorage.token,
				}, GetAllBillsSuccess, GetAllBillsFailure);

				/*				$('#radio-2').prop("checked", true);
*/



			}else if(res.error_code == 500){
                console.log(res);
                $rootScope.RolesAccess(res.message);
            }
		}
		function PaymentFailure(error) {
			$rootScope.loader = "hide";
			$('#internetError').modal('show');
			console.log(error);
		}




	};


//Send Invoice Modal
	$scope.SendInvoiceModal=function(invoice_id){

		if(invoice_id==null){
			return false;
		}
		else{

			$('#send_invoice').modal('show');

		}

		/*console.log("Amount: "+AmountPaid.amount_paid);
		console.log("Invoice:"+invoice_id);*/
		//console.log(sendData);

	};

//Send Invoice
	$scope.SendInvoice=function(sendData,invoice_id){

		/*console.log("Amount: "+AmountPaid.amount_paid);
		console.log("Invoice:"+invoice_id);*/


		console.log(sendData)
		console.log(invoice_id)

		SendEmail.get({token: $window.sessionStorage.token, email_address: sendData.email, invoice_id:invoice_id}, SendEmailSuccess, SendEmailFailure);



		function SendEmailSuccess(res) {
			console.log(res);
			if (res.status == true) {

				$('#send_invoice').modal('hide');

			}else if(res.error_code == 500){
                console.log(res);
                $rootScope.RolesAccess(res.message);
            }
		}

		function SendEmailFailure(error) {
			$('#internetError').modal('show');
			console.log(error);
		}







	};
	
	
	
//View bill Invoice
	$scope.ViewBillInvoices=function(bill_id){

		/*console.log("Amount: "+AmountPaid.amount_paid);
		console.log("Invoice:"+invoice_id);*/
		console.log(bill_id);

		if(bill_id==null){

			return false;
		}

		else{

			GetBillInvoices.get({
				token: $window.sessionStorage.token,
				bill_id:bill_id,
			}, GetBillInvoicesSuccess, GetBillInvoicesFailure);
		}



		function GetBillInvoicesSuccess(res) {
			console.log(res);
			if (res.status == true) {
				$scope.InvoiceListings = res.data;
				console.log($scope.InvoiceListings)
				$('.nav-tabs a[href="#invoices"]').tab('show');
			}else if(res.error_code == 500){
                console.log(res);
                $rootScope.RolesAccess(res.message);
            }
		}

		function GetBillInvoicesFailure(error) {
			$('#internetError').modal('show');
			console.log(error);
		}

		


	};


	$scope.SelectedPatient = function(patient_id,bill_id){
		if(patient_id == "" || patient_id == undefined) return true;
        $scope.disable_tabs = false;
		console.log(patient_id);
		console.log(bill_id);
		$scope.bill_id=bill_id;
		$scope.patient_id = patient_id;
		//$scope.invoice_id = invoice_id;

		$rootScope.loader = "show";
		GetPatientInfo.get({
			token: $window.sessionStorage.token,
			patient_id: patient_id
		}, getPatientInfoSuccess, getPatientInfoFailure);
		function getPatientInfoSuccess(res) {
			if (res.status == true) {
				$rootScope.loader = "hide";
				$scope.tabs_sec = 'tabs_sec';
				$scope.dataStrip = "custom-card";
				$scope.selectedPatient = res.data;
				console.log($scope.selectedPatient);
				//$(".billing").show();
				$scope.EID = res.data.encounter_id;
				$scope.hospital_plan = res.data.hospital_plan;
				if($scope.hospital_plan == '1') $scope.hospital_plan = "card-color-1";
                if($scope.hospital_plan == '2') $scope.hospital_plan = "card-color-2";
                else $scope.hospital_plan = "card-color-3";

				$scope.patientInfo = true;

			}
		}

		function getPatientInfoFailure(error) {
			$rootScope.loader = "hide";
			$('#internetError').modal('show');
			console.log(error);
		}
	    GetAllInvoices.get({
			token: $window.sessionStorage.token,
	        bill_id : bill_id
		}, GetAllInvoicesSuccess, GetAllInvoicesFailure);

	
	};
	function GetAllInvoicesSuccess(res) {
		console.log(res);
        console.log("catch me here");
		if (res.status == true) {
			$scope.InvoiceListings = res.data;
			console.log($scope.InvoiceListings)
		}else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        }
	}

	function GetAllInvoicesFailure(error) {
		$('#internetError').modal('show');
		console.log(error);
	}

	$scope.PrintInvoice = function(invoice_id) {

		/*console.log(patient_id);
		 $scope.patient_id = patient_id;
		 //$scope.invoice_id = invoice_id;*/
		var invoice = invoice_id;

		if (invoice == null) {
			return false;
		}
		else {

			$rootScope.loader = "show";
			InvoiceData.get({
				token: $window.sessionStorage.token,
				invoice_id: invoice_id
			}, getInvoiceSuccess, getInvoiceFailure);
			function getInvoiceSuccess(res) {
				if (res.status == true) {
					$rootScope.loader = "hide";
					$scope.selectedInvoice = res.data;
					console.log($scope.selectedInvoice);
					//$(".billing").show();

					$('.invoice_list').hide();
					$('.print_invoice').show();
					$('.custom-tab').hide();
                                        $('.card-head').hide();


				}else if(res.error_code == 500){
	                console.log(res);
	                $rootScope.RolesAccess(res.message);
	            }
			}

			function getInvoiceFailure(error) {
				$rootScope.loader = "hide";
				$('#internetError').modal('show');
				console.log(error);
			}


		}

	};



	$scope.deletingInvoice = function (invoice_id){
		console.log($scope.invoiceDelete);
		if($scope.invoiceDelete == "Paid" || $scope.invoiceDelete == "paid"){
			$('#freeze').modal('show');
			return true;
		}
		$rootScope.loader = "show";
		deleteInvoice.save({
			token: $window.sessionStorage.token,
			invoice_id: invoice_id
		}, deleteInvoiceSuccess, deleteInvoiceFailure);
	};

	function deleteInvoiceSuccess(res){
		$rootScope.loader = "hide";
		$scope.deleteInvoiceButton = true;
		if(res.status == true) {
			$('#deleteConfirm').modal('hide');
			$('#successModal').modal('show');
			GetAllInvoices.get({
				token: $window.sessionStorage.token,
				bill_id : $scope.bill_id
			}, GetAllInvoicesSuccess, GetAllInvoicesFailure);
		}else if(res.error_code == 500){
            console.log(res);
            $rootScope.RolesAccess(res.message);
        }
	}
	function deleteInvoiceFailure(error){
		$('#internetError').modal('show');
		console.log(error);
	}

	/*CHECKOUT*/
		$scope.CO = {};
        $scope.checkout = function (dataToBeAdded) {
        	$rootScope.loader = "show";
        	console.log(dataToBeAdded); //return false;
            CheckoutPatient.save({
	    		token: $window.sessionStorage.token, 
	    		patient_id: $scope.patient_id,
	    		visit_id: $scope.EID,
	    		reason: $('input:radio[name="checkoutpatient"]:checked').val(),
	            notes: $('.checkout_patient_tab_con > div.active textarea').val() == undefined ? '' : $('.checkout_patient_tab_con > div.active textarea').val(),
	    		pick_date: dataToBeAdded.date == undefined ? '' : dataToBeAdded.date,
	    		pick_time: dataToBeAdded.time == undefined ? '' : dataToBeAdded.time,
	    		expected_discharge_date: dataToBeAdded.discharge == undefined ? '' : dataToBeAdded.discharge,
	    		admit_date: $scope.admittedDate == undefined ? '' : $scope.admittedDate,
	    		start_time: dataToBeAdded.time == undefined ? '' : dataToBeAdded.time,
	    		department_id: dataToBeAdded.CPN == undefined ? '' : dataToBeAdded.CPN,
	    		ward_id: dataToBeAdded.ward == undefined ? '' : dataToBeAdded.ward,
	    		bed_id: $scope.CO.bedNumber == undefined ? '' : $scope.CO.bedNumber
	    	}, checkoutSuccess, checkoutSuccessFailure);
        }

	    	
        function checkoutSuccess(res) {
        	if(res.status == true){
	            console.log(res)
	            $rootScope.loader = "hide";
	            $scope.messageType = "alert-success";
	            $scope.errorMessage = res.message;
	            $scope.errorSymbol = "fa fa-check";// 
	            $scope.message = true;
	            //$('#checkout').modal('hide');
	            $('.checkout_patient_tab_con > div.active textarea').val('');
	            $('input:radio[name="checkoutpatient"]').prop("checked", false);
	            $('input:radio[name="checkoutpatient"]').eq(0).trigger("click");
	            setTimeout(function() {$('#checkout').modal('hide');$scope.message = false;}, 1000);
            }else if(res.error_code == 500){
                console.log(res);
                $rootScope.RolesAccess(res.message);
            }
        }
        function  checkoutSuccessFailure(res) {
        	$('#internetError').modal('show');
            console.log(res)
        }
        $scope.addToBillData = {};
        $scope.addToBill = function(dataToBeAdded){
        	$rootScope.loader = "show";
        	AddToBill.save({
        		token: $window.sessionStorage.token,
        		quantity: dataToBeAdded.quantity == undefined ? '' : dataToBeAdded.quantity,
        		bill_id: $scope.bill_id,
        		patient_id: $scope.patient_id,
        		product_id: dataToBeAdded.product == undefined ? '0' : dataToBeAdded.product,
        		service_id: dataToBeAdded.service == undefined ? '0' : dataToBeAdded.service
        	}, addToBillSuccess, checkoutSuccessFailure);
        }

        function addToBillSuccess(res){
        	$rootScope.loader = "hide";
        	if(res.status == true){
        		$('#addToBill').modal('hide');
        		GetAllInvoices.get({
					token: $window.sessionStorage.token,
			        bill_id : $scope.bill_id
				}, GetAllInvoicesSuccess, GetAllInvoicesFailure);
        	}else if(res.error_code == 500){
                console.log(res);
                $rootScope.RolesAccess(res.message);
            }
        }
        GetAllproducts.save({token: $window.sessionStorage.token}, getAllPbillSuccess, checkoutSuccessFailure);
        function getAllPbillSuccess(res){
        	if(res.status == true){
        		console.log(res, 'prodcutsssss');
        		$scope.productsDropdown = res.date;
        	}else if(res.error_code == 500){
                console.log(res);
                $rootScope.RolesAccess(res.message);
            }
        }

        GetAllBillingCodes.get({token: $window.sessionStorage.token, offset: 0, limit:0}, getAllbillSuccess, checkoutSuccessFailure);
        function getAllbillSuccess(res){
        	if(res.status == true){
        		console.log(res, 'billing');
        		$scope.serviceBill = res.data;
        	}else if(res.error_code == 500){
                console.log(res);
                $rootScope.RolesAccess(res.message);
            }
        }

        $scope.calculateAmount = function(tAmount, amountPaid){
        	if(tAmount != 0)
        		$scope.tAmount = tAmount - amountPaid;
        	else $scope.tAmount = 0;
        }

        $scope.dateSearchPeirod = function(periodDate){
        	//console.log(periodDate);
        	$rootScope.loader = "show";
        	GetBillingWithDates.get({token: $window.sessionStorage.token, date: periodDate}, dateSuccess, checkoutSuccessFailure);
        }

        function dateSuccess(res){
        	//console.log(res, 'datebills');
        	$rootScope.loader = "hide";
        	if(res.status == true){
        		$scope.BillListings = res.data;
        	}else if(res.error_code == 500){
                console.log(res);
                $rootScope.RolesAccess(res.message);
            }
        }

        DropDownData.get({token: $window.sessionStorage.token, patient_id: $window.sessionStorage.patient_id}, dropDownSuccess, dropDownFailed);

		function dropDownSuccess(res){
			if(res.status == true){
				$scope.encountersDropdownData = res.data;
				console.log(res);
			}
		}

		function dropDownFailed(error){
			$('#internetError').modal('show');
			console.log(error);
		}

		GetAllWardsDropDown.get({
			token: $window.sessionStorage.token
		}, wardsDropDownSuccess, wardsDropDownFailure);

		function wardsDropDownSuccess(res){
			$rootScope.loader = "hide";
			if(res.status == true){
				$scope.wardDropdown = res.data;
			}
		}
		function wardsDropDownFailure(error){
			console.log(error);
			$('#internetError').modal('show');
		}
		$scope.wardselect = true;
		$scope.wardSelected = function(wid){
			$scope.wardselect = false;
			console.log(wid);
			GetBedsByWard.get({
				token: $window.sessionStorage.token,
				ward_id: wid
			}, getBedsWardSuccess, getBedsWardFailure);
			function getBedsWardSuccess(res){
				console.log(res);
				if(res.status == true){
					$scope.noOFBeds = res.data;
				}
			}
			function getBedsWardFailure(error){
				console.log(error);
				$('#internetError').modal('show');
			}
		}

		$scope.bedSelected = function(bedID){
			console.log(bedID);
			$scope.CO.bedNumber = bedID;
		}
		var d = new Date();
		$scope.admittedDateYear = d.getFullYear();
		$scope.admittedDateMonth = d.getMonth();
		$scope.admittedDateDay = d.getDay();
		$scope.admittedDate = $scope.admittedDateYear + "-" + $scope.admittedDateMonth + "-" + $scope.admittedDateDay;

		$scope.showBed = false;
	    $scope.showbedFlag = false;
	    $scope.showbeds = function(){
	    	if($scope.showbedFlag == false){
	    		$scope.showBed = true;
	    		$scope.showbedFlag = true;
	    	}else{
	    		$scope.showBed = false;
	    		$scope.showbedFlag = false;
	    	}
	    }

	    $scope.patientRegBill = function(patientName){
	    	console.log(patientName);// return true;
	    	AddPatientRegBill.save({
	    		token: $window.sessionStorage.token,
	    		patient_name: patientName
	    	}, addPatientRegBillSuccess,wardsDropDownFailure);
	    	function addPatientRegBillSuccess(res){
				console.log(res, "regbill");
				if(res.status == true){
					$scope.dynamicMsg = "Patient Registration Bill Generated";
					$('#pregbillSuccess').modal('show');
					$('#patientRegBill').modal('hide');
					GetAllBills.get({
						token: $window.sessionStorage.token,
					}, GetAllBillsSuccess, GetAllBillsFailure);
				}
			}
	    }

	    $scope.waiveBill = function(){
	    	console.log($scope.bill_id);// return true;
	    	WaiveBill.save({
	    		token: $window.sessionStorage.token,
	    		bill_id: $scope.bill_id
	    	}, WaiveBillSuccess,wardsDropDownFailure);
	    	function WaiveBillSuccess(res){
				console.log(res, "WaiveBill");
				if(res.status == true){
					$scope.dynamicMsg = "Bill has been Paid";
					$('#pregbillSuccess').modal('show');
					$('#WaiveBill').modal('hide');
					$scope.disable_tabs = true;
					GetAllBills.get({
						token: $window.sessionStorage.token,
					}, GetAllBillsSuccess, GetAllBillsFailure);
				}
			}
	    }

	    $scope.waiveBillInvoice = function(){
	    	console.log($scope.invoice_id); //return true;
	    	WaiveBillInvoice.save({
	    		token: $window.sessionStorage.token,
	    		invoice_id: $scope.invoice_id
	    	}, WaiveBillISuccess,wardsDropDownFailure);
	    	function WaiveBillISuccess(res){
				console.log(res, "WaiveBillInvoice");
				if(res.status == true){
					$scope.dynamicMsg = "Invoice has been Paid";
					$('#pregbillSuccess').modal('show');
					$('#WaiveBillInvoice').modal('hide');
					GetAllInvoices.get({
						token: $window.sessionStorage.token,
				        bill_id : $scope.bill_id
					}, GetAllInvoicesSuccess, GetAllInvoicesFailure);
				}
			}
	    }
        
}]);
