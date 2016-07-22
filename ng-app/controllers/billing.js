var AppEHR = angular.module('AppEHR');

AppEHR.controller('billing', ['$scope', '$rootScope','$window','$routeParams','$location','GetAllBills','GetAllInvoices','GetPatientInfo','InvoiecStatus','ProcessPayment','InvoiceData','GetBillInvoices','SendEmail', function($scope, $rootScope,$window,$routeParams,$location,GetAllBills,GetAllInvoices,GetPatientInfo,InvoiecStatus,ProcessPayment,InvoiceData,GetBillInvoices,SendEmail){
	$rootScope.pageTitle = "EHR - Billing";
	$scope.BillListings={};
	$scope.selectedPatient = {};
	$scope.AmountPaid = {};

	if($routeParams.patientID != undefined){
		$scope.patientID = $routeParams.patientID;
		$scope.search_all_bill = $scope.patientID;
	}

	//Get Bills
	GetAllBills.get({
		token: $window.sessionStorage.token,
	}, GetAllBillsSuccess, GetAllBillsFailure);

	function GetAllBillsSuccess(res) {
		if (res.status == true) {
			if(res.data.length == 0){
				$('#noResultFound').modal('show');
				return true;
			}
			$scope.BillListings = res.data;
		}
	}

	function GetAllBillsFailure(error) {
		console.log(error);
	}

	//Get All Invoices

	GetAllInvoices.get({
		token: $window.sessionStorage.token,
	}, GetAllInvoicesSuccess, GetAllInvoicesFailure);

	function GetAllInvoicesSuccess(res) {
		console.log(res);
		if (res.status == true) {
			$scope.InvoiceListings = res.data;
			console.log($scope.InvoiceListings)
		}
	}

	function GetAllInvoicesFailure(error) {
		console.log(error);
	}
	$scope.SelectedPatientWithInvoice = function(patient_id,invoice_id){

		console.log(patient_id);
		$scope.patient_id = patient_id;
		$scope.invoice_id = invoice_id;

		$rootScope.loader = "show";
		GetPatientInfo.get({token: $window.sessionStorage.token, patient_id: patient_id}, getPatientInfoSuccess, getPatientInfoFailure);
		function getPatientInfoSuccess(res) {
			if (res.status == true) {
				$rootScope.loader = "hide";
				$scope.selectedPatient = res.data;
				console.log($scope.selectedPatient);
				$(".billing").show();

			}
		}
		function getPatientInfoFailure(error) {
			$rootScope.loader = "show";
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



			}
		}
		function InvoiecStatusFailure(error) {
			$rootScope.loader = "show";
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
			$rootScope.loader = "show";
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
			console.log(error);
		}







	};
	
	
	
//View bill Invoice
	$scope.ViewBillInvoices=function(bill_id){

		/*console.log("Amount: "+AmountPaid.amount_paid);
		console.log("Invoice:"+invoice_id);*/
		console.log(bill_id);

		if(bill_id=null){

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
			console.log(error);
		}

		


	};


	$scope.SelectedPatient = function(patient_id,bill_id){

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
				$scope.selectedPatient = res.data;
				console.log($scope.selectedPatient);
				//$(".billing").show();

				$scope.patientInfo = true;

			}
		}

		function getPatientInfoFailure(error) {
			$rootScope.loader = "show";
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


				}
			}

			function getInvoiceFailure(error) {
				$rootScope.loader = "show";
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
		console.log(error);
	}










}]);
