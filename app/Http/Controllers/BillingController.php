<?php
namespace App\Http\Controllers;

use Illuminate\Http\Exception\HttpResponseException;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Http\Response as IlluminateResponse;
use Illuminate\Support\Facades\File;
use DB;

class BillingController extends Controller
{
    public function __construct(Request $request)
    {

        header('Access-Control-Allow-Origin: *');
        date_default_timezone_set("Africa/Lagos");

    }
    public function get_all_bills()
    {
        $bills = DB::table('billing')
            ->leftJoin('visits', 'visits.id', '=', 'billing.encounter_id')
            ->leftJoin('patients', 'patients.id', '=', 'billing.patient_id')
            ->leftJoin('hospital_plan', 'hospital_plan.id', '=', 'patients.hospital_plan')
            ->where('billing.status', 1)
            ->where('patients.status', 1)
            ->get();
        if ($bills) {
            return response()->json(['status' => true, 'message' => 'Bills found', 'data' => $bills]);

        } else {
            return response()->json(['status' => true, 'message' => 'Bills not found','data' => $bills]);
        }
    }

    public function get_all_invoices()
    {
        $bills = DB::table('invoice')
            ->select('invoice.*', 'hospital_plan.id as plan_id', 'hospital_plan.name as plan_name','patients.first_name','patients.middle_name','patients.last_name')
            ->leftJoin('patients', 'patients.id', '=', 'invoice.patient_id')
            ->leftJoin('hospital_plan', 'hospital_plan.id', '=', 'patients.plan_id')
            ->where('invoice.status', 1)
            ->where('patients.status', 1)
            ->get();

            return response()->json(['status' => true, 'message' => 'Invoices found', 'data' => $bills]);


    }

    public function update_invoice(Request $request)
    {

        $invoice_id = $request->input('invoice_id');

        $due = $request->input('amount_paid');

        $currentdatetime = date("Y-m-d  H:i:s");

        $amount = DB::table('invoice')
            ->select('due')
            ->where('status', 1)
            ->where('id', $invoice_id)
            ->first();

        $invoice_amount = $amount->due;


        if ($due == 0) {

            $status = 'pending';

            DB::table('invoice')
                ->where('id', $invoice_id)
                ->update(
                    ['due' => $invoice_amount, 'invoice_status' => $status,'updated_at'=>$currentdatetime]);

            return response()->json(['status' => true, 'message' => 'Invoice Updated successfully']);

        }

        $total_amount = $invoice_amount - $due;

        if ($total_amount > 0) {

            DB::table('invoice')
                ->where('id', $invoice_id)
                ->update(
                    ['due' => $total_amount,
                        'invoice_status' => 'draft']);

            return response()->json(['status' => true, 'message' => 'Invoice Updated successfully']);


        } else {
            DB::table('invoice')
                ->where('id', $invoice_id)
                ->update(
                    ['due' => $total_amount,
                        'invoice_status' => 'paid']);

            return response()->json(['status' => true, 'message' => 'Invoice Updated successfully']);


        }


    }

    public function get_invoice_data(Request $request)
    {

        $invoice_id = $request->input('invoice_id');

        $data = DB::table('invoice')
            ->leftJoin('patients', 'invoice.patient_id', '=', 'patients.id')
            ->leftJoin('patient_address', 'patient_address.patient_id', '=', 'patients.id')
            ->select(DB::raw('patients.id as patient_id,patients.first_name,patients.middle_name,patients.last_name,patients.age,patient_address.house_number,patient_address.street,invoice.id as invoice_id,invoice.created_at as invoice_date,invoice.due,invoice.amount,invoice.invoice_status,patients.sex,invoice.description as purpose'))
            ->where('invoice.status', 1)
            ->where('patients.status', 1)
            ->where('invoice.id', $invoice_id)
            ->groupby('patients.id')
            ->first();


        if ($data->sex == 1) {

            $data->gender = 'Male';
        } else {
            $data->gender = 'FeMale';

        }


        $data->provider = 'Doctor James';

        return response()->json(['status' => true, 'data' => $data]);

    }


    public function get_invoice_status(Request $request)
    {

        $invoice_id = $request->input('invoice_id');

        $data = DB::table('invoice')
            ->select(DB::raw('invoice_status'))
            ->where('invoice.status', 1)
            ->where('invoice.id', $invoice_id)
            ->first();


        return response()->json(['status' => true, 'data' => $data]);

    }


    public function get_billing_data(Request $request)
    {


        $bill_id = $request->input('bill_id');

        $data = DB::table('billing')
            ->leftJoin('patients', 'billing.patient_id', '=', 'patients.id')
            ->select(DB::raw('patients.id as patient_id,patients.first_name,patients.middle_name,patients.last_name,patients.age,billing.id as recipent_no,billing.created_at as date'))
            ->where('billing.status', 1)
            ->where('patients.status', 1)
            ->where('billing.id', $bill_id)
            ->first();


        $bill_invoices = DB::table('invoice')
            ->select(DB::raw('*'))
            ->where('status', 1)
            ->where('bill_id', $bill_id)
            ->get();


        $data->invoices = $bill_invoices;

        return response()->json(['status' => true, 'data' => $data]);


    }

    public function delete_invoice(Request $request){

        $invoice_id = $request->input('invoice_id');

        DB::table('invoice')
                ->where('id', $invoice_id)
                ->update(
                    ['status' => 0]);

            return response()->json(['status' => true, 'message' => 'Invoice Deleted successfully']);


    }

    public function get_bill_invoices(Request $request){


        $bill_id = $request->input('bill_id');

        $bills = DB::table('invoice')
            ->select('invoice.*', 'hospital_plan.id as plan_id', 'hospital_plan.name as plan_name','patients.first_name','patients.middle_name','patients.last_name')
            ->leftJoin('patients', 'patients.id', '=', 'invoice.patient_id')
            ->leftJoin('hospital_plan', 'hospital_plan.id', '=', 'patients.plan_id')
            ->where('invoice.status', 1)
            ->where('patients.status', 1)
            ->where('invoice.bill_id', $bill_id)
            ->get();

            return response()->json(['status' => true, 'message' => 'Invoices found', 'data' => $bills]);



    }

    public function add_billing_category(Request $request){

        $name = $request->input('name');
        $description = $request->input('description');

        DB::table('billing_category')
            ->insert(
                ['name' => $name,'description'=>$description,'created_at'=>date("Y-m-d  H:i:s")]);

        return response()->json(['status' => true, 'message' => 'Category Inserted successfully']);

    }
    public function get_billing_category(Request $request){

        $bill_category = DB::table('billing_category')
            ->select(DB::raw('id,name'))
            ->where('status', 1)
            ->get();

        return response()->json(['status' => true, 'data'=>$bill_category]);

    }
    public function add_billing_code(Request $request){
        $code = $request->input('code');
        $description = $request->input('description');
        $charge = $request->input('charge');
        $category_id= $request->input('category_id');
        $tax= $request->input('tax');

        DB::table('billing_codes')
            ->insert(
                ['code' => $code,'description'=>$description,'charge'=>$charge,'category'=>$category_id,'tax'=>$tax,'created_at'=>date("Y-m-d  H:i:s")]);

        return response()->json(['status' => true, 'message' => 'Billing Code Inserted successfully']);

    }

    public function get_all_billing_codes(Request $request){

          $bill_codes = DB::table('billing_codes')
              ->leftJoin('billing_category', 'billing_codes.category', '=','billing_category.id' )
              ->select(DB::raw('billing_codes.id,billing_codes.code,billing_codes.description,billing_codes.charge,billing_category.name as category'))
              ->where('billing_codes.status', 1)
              ->get();

          return response()->json(['status' => true, 'data'=>$bill_codes]);

      }

    public function get_billing_code(Request $request){

          $bill_code = DB::table('billing_codes')
              ->leftJoin('billing_category', 'billing_codes.category', '=','billing_category.id' )
              ->select(DB::raw('billing_codes.id,billing_codes.code,billing_codes.description,billing_codes.charge,billing_category.name as category,billing_codes.category as category_id'))
              ->where('billing_codes.status', 1)
              ->first();

          return response()->json(['status' => true, 'data'=>$bill_code]);

      }

    public function update_billing_code(Request $request){
         $billing_code_id = $request->input('billing_code_id');
         $code = $request->input('code');
         $description = $request->input('description');
         $charge = $request->input('charge');
         $category_id= $request->input('category_id');
         $tax= $request->input('tax');

         DB::table('billing_codes')
             ->where('id',$billing_code_id)
             ->update(
                 ['code' => $code,'description'=>$description,'charge'=>$charge,'category'=>$category_id,'tax'=>$tax,'updated_at'=>date("Y-m-d  H:i:s")]);

         return response()->json(['status' => true, 'message' => 'Billing Code Updated successfully']);

     }

    public function delete_billing_code(Request $request){
           $billing_code_id = $request->input('billing_code_id');

           DB::table('billing_codes')
               ->where('id',$billing_code_id)
               ->update(
                   ['status'=>0,'updated_at'=>date("Y-m-d  H:i:s")]);

           return response()->json(['status' => true, 'message' => 'Billing Code Deleted successfully']);

       }

    public function add_tax_rates(Request $request){
        $name = $request->input('name');
        $rate = $request->input('rate');
        DB::table('tax_rates')
            ->insert(
                ['name' => $name, 'rate' => $rate, 'created_at' => date("Y-m-d  H:i:s")]);

        return response()->json(['status' => true, 'message' => 'Tax Rates Added successfully']);


    }

    public function list_tax_rates(Request $request){

        $tax_rates = DB::table('tax_rates')
            ->select(DB::raw('name,rate'))
            ->where('status', 1)
            ->get();

        return response()->json(['status' => true, 'data' => $tax_rates]);

    }
    public function delete_tax_rate(Request $request){
        $tax_rate_id= $request->input('tax_rate_id');
        DB::table('tax_rates')
            ->where('id',$tax_rate_id)
            ->update(
                    ['status'=>0,'updated_at' => date("Y-m-d  H:i:s")]);

            return response()->json(['status' => true, 'message' => 'Tax Rate Deleted successfully']);

    }
}