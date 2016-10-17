var AppEHR = angular.module('AppEHR');

AppEHR.controller('billing', ['$scope', '$rootScope','$window','$routeParams','$location','GetAllBills','GetAllInvoices','GetPatientInfo','InvoiecStatus','ProcessPayment','InvoiceData','GetBillInvoices','SendEmail', 'CheckoutPatient', function($scope, $rootScope,$window,$routeParams,$location,GetAllBills,GetAllInvoices,GetPatientInfo,InvoiecStatus,ProcessPayment,InvoiceData,GetBillInvoices,SendEmail, CheckoutPatient){
	$rootScope.pageTitle = "EHR - Billing";
	$scope.BillListings={};
	$scope.selectedPatient = {};
	$scope.AmountPaid = {};
	$scope.dataStrip = "c";
        $scope.disable_tabs = true;
	$rootScope.loader = "show";
	$scope.tabs_sec = 'qqqqq';
        $scope.product_show= 'product';

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
		}
	}

	function GetAllBillsFailure(error) {
		$('#internetError').modal('show');
		console.log(error);
	}

	//Get All Invoices
//        function invoiceByBill(billId){}
	
	$scope.SelectedPatientWithInvoice = function(patient_id,invoice_id){
		$scope.patient_id = patient_id;
		$scope.invoice_id = invoice_id;

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
		}s
                
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
				}, GetAllInvoicesSuccess, GetAllInvoicesFailure);



				/*				$('#radio-2').prop("checked", true);
*/



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

		SendInvoiceEmail.save({token: $window.sessionStorage.token, email_address: sendData, invoice_id:invoice_id}, SendEmailSuccess, SendEmailFailure);



		function SendEmailSuccess(res) {
			console.log(res);
			if (res.status == true) {

				$('#send_invoice').modal('hide');

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
			}
		}

		function GetBillInvoicesFailure(error) {
			$('#internetError').modal('show');
			console.log(error);
		}

		


	};


	$scope.SelectedPatient = function(patient_id,bill_id){
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

	function GetAllInvoicesSuccess(res) {
		console.log(res);
                console.log("catch me here");
		if (res.status == true) {
			$scope.InvoiceListings = res.data;
			console.log($scope.InvoiceListings)
		}
	}

	function GetAllInvoicesFailure(error) {
		$('#internetError').modal('show');
		console.log(error);
	}
	};

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
		if ( window.confirm("Are you Sure you want to delete?") ) {
			deleteInvoice.save({
				token: $window.sessionStorage.token,
				invoice_id: invoice_id
			}, deleteInvoiceSuccess, deleteInvoiceFailure);
		}
	};

	function deleteInvoiceSuccess(res){
		if(res.status == true) {
			GetAllInvoices.get({
				token: $window.sessionStorage.token,
			}, GetAllInvoicesSuccess, GetAllInvoicesFailure);
		}else {
			alert(res.message);
		}
	}
	function deleteInvoiceFailure(error){
		$('#internetError').modal('show');
		console.log(error);
	}

	/*CHECKOUT*/

        $scope.checkout = function (CO) {
        	$rootScope.loader = "show";
            var CheckoutDetails = {
                token: $window.sessionStorage.token,
                visit_id: $scope.EID,
                patient_id: $scope.patient_id,
                reason: $('input:radio[name="checkoutpatient"]:checked').val(),
                notes: $('.checkout_patient_tab_con > div.active textarea').val() == undefined ? '' : $('.checkout_patient_tab_con > div.active textarea').val(),
                pick_date: CO.date,
                pick_time: CO.time,
                admit_date: CO.date,
                start_time: CO.time,
                department_id: CO.date,
                ward_id: CO.date
            }
            CheckoutPatient.save(CheckoutDetails, checkoutSuccess, checkoutSuccessFailure);
        }
        function checkoutSuccess(res) {
            console.log(res)
            $rootScope.loader = "hide";
            $scope.messageType = "alert-success";
            $scope.errorMessage = res.message;
            $scope.errorSymbol = "fa fa-check";// 
            $scope.message = true;
            $('#simpleModal1').modal('hide');
            $('.checkout_patient_tab_con > div.active textarea').val('');
            $('input:radio[name="checkoutpatient"]').prop("checked", false);
            $('input:radio[name="checkoutpatient"]').eq(0).trigger("click");
        }
        function  checkoutSuccessFailure(res) {
        	$('#internetError').modal('show');
            console.log(res)
        }










}]);
