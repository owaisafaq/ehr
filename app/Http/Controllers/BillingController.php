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
    public function get_all_bills()
    {
        $bills = DB::table('billing')
            ->leftJoin('visits', 'visits.id', '=', 'billing.encounter_id')
            ->leftJoin('patients', 'patients.id', '=', 'billing.patient_id')
            ->leftJoin('hospital_plan', 'hospital_plan.id', '=', 'patients.hospital_plan')
            ->where('billing.status', 1)->get();
        if ($bills) {
            return response()->json(['status' => true, 'message' => 'Bills found', 'data' => $bills]);

        } else {
            return response()->json(['status' => false, 'message' => 'Bills not found']);
        }
    }

    public function get_all_invoices()
    {
        $bills = DB::table('invoice')
            ->select('invoice.*', 'hospital_plan.id as plan_id', 'hospital_plan.name as plan_name')
            ->leftJoin('patients', 'patients.id', '=', 'invoice.patient_id')
            ->leftJoin('hospital_plan', 'hospital_plan.id', '=', 'patients.plan_id')
            ->where('invoice.status', 1)->get();
        if ($bills) {
            return response()->json(['status' => true, 'message' => 'Invoices found', 'data' => $bills]);

        } else {
            return response()->json(['status' => false, 'message' => 'Bills not found']);
        }
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
                    ['due' => $invoice_amount, 'invoice_status' => $status]);

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
}