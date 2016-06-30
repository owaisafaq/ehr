var AppEHR = angular.module('AppEHR');

AppEHR.controller('billing', ['$scope', '$rootScope','$window','$routeParams','GetAllBills','GetAllInvoices','GetPatientInfo','InvoiecStatus','ProcessPayment', function($scope, $rootScope,$window,$routeParams,GetAllBills,GetAllInvoices,GetPatientInfo,InvoiecStatus,ProcessPayment){
	$rootScope.pageTitle = "EHR - Billing";
	$scope.BillListings={};
	$scope.selectedPatient = {};
	$scope.AmountPaid = {};

	//Get Bills
	GetAllBills.get({
		token: $window.sessionStorage.token,
	}, GetAllBillsSuccess, GetAllBillsFailure);

	function GetAllBillsSuccess(res) {
		console.log(res);
		if (res.status == true) {
			$scope.BillListings = res.data;
			console.log($scope.BillListings)
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


				

/*

				GetAllInvoices.get({
					token: $window.sessionStorage.token,
				}, GetAllInvoicesSuccess, GetAllInvoicesFailure);



				$('#radio-2').prop("checked", true);
*/



			}
		}
		function PaymentFailure(error) {
			$rootScope.loader = "show";
			console.log(error);
		}




	};


//Send Invoice
	$scope.SendInvoice=function(sendData,pid,pname){

		/*console.log("Amount: "+AmountPaid.amount_paid);
		console.log("Invoice:"+invoice_id);*/
		console.log(sendData);

	};


	$scope.SelectedPatient = function(patient_id){

		console.log(patient_id);
		$scope.patient_id = patient_id;
		//$scope.invoice_id = invoice_id;

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











}]);