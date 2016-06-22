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


    public function get_all_lab_orders(Request $request)
    {


        $orders = DB::table('lab_orders')
            ->select(DB::raw('lab_orders.id,lab_orders.patient_id,patients.first_name as patient_name,lab_orders.priority,lab_orders.order_status,labs.name as lab_name,patients.age,patients.marital_status,patients.sex,maritial_status.name as marital_status'))
            ->leftJoin('patients', 'lab_orders.patient_id', '=', 'patients.id')
            ->leftJoin('labs', 'labs.id', '=', 'lab_orders.lab')
            ->leftJoin('lab_tests', 'lab_tests.id', '=', 'lab_orders.lab_test')
            ->leftJoin('maritial_status', 'maritial_status.id', '=', 'patients.marital_status')
            ->where('lab_orders.status', 1)
            ->get();


        foreach ($orders as $lab_orders) {

            $lab_orders->ordered_by = 'Dr Smith';
            $lab_orders->handled_by = 'James';
            $lab_orders->test_name = 'Blood Test';


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

        $orders = DB::table('lab_orders')
            ->select(DB::raw('lab_orders.id,lab_orders.patient_id,patients.first_name as patient_name,lab_orders.priority,lab_orders.order_status,labs.name as lab_name,patients.age,patients.marital_status,patients.sex,maritial_status.name as marital_status'))
            ->leftJoin('patients', 'lab_orders.patient_id', '=', 'patients.id')
            ->leftJoin('labs', 'labs.id', '=', 'lab_orders.lab')
            ->leftJoin('lab_tests', 'lab_tests.id', '=', 'lab_orders.lab_test')
            ->leftJoin('maritial_status', 'maritial_status.id', '=', 'patients.marital_status')
            ->where('lab_orders.status', 1)
            ->where('lab_orders.id', $order_id)
            ->first();

            if ($orders->sex == 1) {

                $orders->gender = 'male';
            } else {

                $orders->gender = 'female';
            }




        return response()->json(['status' => true, 'data' => $orders]);


    }

    public function add_lab_order(Request $request)
    {


        $patient_id = $request->input('patient_id');

        $lab = $request->input('lab');

        $lab_test = $request->input('lab_test');

        $priority = $request->input('priority');

        $sample = $request->input('sample');

        $clinical_information = $request->input('clinical_information');

        $diagnosis = $request->input('diagnosis');

        $notes = $request->input('notes');

        $order_status = $request->input('order_status');

        $currentdatetime = date("Y-m-d  H:i:s");


        DB::table('lab_orders')->insert(
            ['patient_id' => $patient_id,
                'lab' => $lab,
                'lab_test' => $lab_test,
                'priority' => $priority,
                'sample' => $sample,
                'clinical_information' => $clinical_information,
                'diagnosis' => $diagnosis,
                'notes' => $notes,
                'order_status' => $order_status,
                'created_at' => $currentdatetime

            ]
        );


        return response()->json(['status' => true, 'message' => 'Lab Orders Added Successfully']);

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


    public function update_order(Request $request)
    {


        $order_id = $request->input('order_id');
        $order_status = $request->input('order_status');

        $currentdatetime = date("Y-m-d  H:i:s");

        DB::table('lab_orders')
            ->where('id', $order_id)
            ->update(array('order_status' => $order_status, 'updated_at' => $currentdatetime));


        return response()->json(['status' => true, 'message' => 'Lab Orders Updated Successfully']);


    }


}
