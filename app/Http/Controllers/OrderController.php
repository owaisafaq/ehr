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


class OrderController extends Controller
{


    public function __construct(Request $request)
    {

        header('Access-Control-Allow-Origin: *');


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


    public function get_lab_tests(Request $request){


        $lab= $request->input('lab');


        $lab_test = DB::table('lab_tests')
            ->select(DB::raw('*'))
            ->where('lab_tests.status', 1)
            ->where('lab', $lab)
            ->get();

        return response()->json(['status' => true, 'data' => $lab_test]);



    }


    public function get_all_lab_orders(Request $request)
    {

        $orders = DB::table('lab_orders')
            ->select(DB::raw('lab_orders.id,lab_orders.patient_id,patients.first_name as patient_name,lab_orders.order_status,labs.name as lab_name,patients.age,patients.marital_status,patients.sex,maritial_status.name as marital_status'))
            ->leftJoin('patients', 'lab_orders.patient_id', '=', 'patients.id')
            ->leftJoin('labs', 'labs.id', '=', 'lab_orders.lab')
            ->leftJoin('lab_order_tests', 'lab_order_tests.lab_order_id', '=', 'lab_orders.id')
            ->leftJoin('lab_tests', 'lab_tests.id', '=', 'lab_order_tests.lab_test')
            ->leftJoin('maritial_status', 'maritial_status.id', '=', 'patients.marital_status')
            ->where('lab_orders.status', 1)
            ->groupby('lab_orders.id')
            ->get();


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

        return response()->json(['status' => true, 'data' => $orders]);


    }


    public function get_lab_order(Request $request)
    {


        $order_id = $request->input('order_id');

        $orders = DB::table('lab_orders')
            ->select(DB::raw('lab_orders.id,lab_orders.patient_id,patients.first_name as patient_name,lab_orders.order_status,labs.name as lab_name,patients.age,patients.marital_status,patients.sex,maritial_status.name as marital_status'))
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


        $tests = DB::table('lab_tests')
            ->select(DB::raw('lab_tests.id as test_id,lab_tests.name as test_name,lab_tests.cost,priority'))
            ->leftJoin('lab_order_tests', 'lab_order_tests.lab_test', '=', 'lab_tests.id')
            ->where('lab_order_tests.lab_order_id', $orders->id)
            ->get();


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

        $lab = $request->input('lab');

        $lab_tests = html_entity_decode($request->input('lab_test'));

        $lab_test = json_decode($lab_tests);

        $clinical_information = $request->input('clinical_information');

        $diagnosis = $request->input('diagnosis');

        $notes = $request->input('notes');

        $currentdatetime = date("Y-m-d  H:i:s");


        DB::table('lab_orders')->insert(
            ['patient_id' => $patient_id,
                'lab' => $lab,
                'clinical_information' => $clinical_information,
                'diagnosis' => $diagnosis,
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


        $lab_id = $request->input('lab_test');
        $status = $request->input('status');

        $currentdatetime = date("Y-m-d  H:i:s");

        DB::table('lab_tests')
            ->where('id', $lab_id)
            ->update(array('test_status' => $status, 'updated_at' => $currentdatetime));


        return response()->json(['status' => true, 'message' => 'Lab Test Updated Successfully']);


    }


    public function get_lab_test_templates(Request $request)
    {

        $category_id = $request->input('category_id');

        $lab_templates = DB::table('lab_templates')
            ->select(DB::raw('id,name'))
            ->where('status', '1')
            ->where('category', $category_id)
            ->get();


        return response()->json(['status' => true, 'data' => $lab_templates]);
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

        $lab_test_values = html_entity_decode($request->input('lab_test_values'));

        $currentdatetime = date("Y-m-d  H:i:s");

        $lab_test = json_decode($lab_test_values);

        foreach ($lab_test as $report) {


            DB::table('lab_test_values')->insert(
                ['lab_order_id' => $lab_order_id,
                    'lab_test' => $lab_test_id,
                    'field_id' => $report->field_id,
                    'value' => $report->value,
                    'created_at' => $currentdatetime

                ]
            );

        }


        return response()->json(['status' => true, 'message' => 'Lab Report Added Sucessfully']);

    }

    public function get_lab_test_details(Request $request){

        $lab_test_id = $request->input('lab_test_id');

        $lab_test = DB::table('lab_tests')
            ->select(DB::raw('*'))
            ->where('lab_tests.status', 1)
            ->where('lab_tests.id', $lab_test_id)
            ->get();

        return response()->json(['status' => true, 'data' => $lab_test]);



    }


    public function get_lab_template_categories(Request $request){


        $lab_categories = DB::table('template_categories')
            ->select(DB::raw('id,name'))
            ->where('template_categories.status', 1)
            ->get();

        return response()->json(['status' => true, 'data' => $lab_categories]);

    }

}

