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
use PDF;
use View;
use PHPMailer;

class SettingController extends Controller
{

    public function __construct(Request $request)
    {
        header('Access-Control-Allow-Origin: *');
        date_default_timezone_set("Africa/Lagos");
    }

    public function add_lab(Request $request)
    {
        $name = $request->input('name');
        $code = $request->input('code');
        $description = $request->input('description');

        DB::table('labs')
            ->insert(['name' => $name,'code'=>$code,'description'=>$description,'created_at'=> date("Y-m-d  H:i:s")]);

        return response()->json(['status' => true, 'message' => 'Lab Added successfully']);

    }

    public function get_labs(Request $request)
    {
        $limit = $request->input('limit');
        $offset = $request->input('offset');

        if ($limit > 0 || $offset > 0) {

            $labs = DB::table('labs')
                ->select(DB::raw('*'))
                ->where('status', 1)
                ->skip($offset)->take($limit)
                ->get();

            $count = DB::table('labs')
                ->select(DB::raw('*'))
                ->where('status', 1)
                ->count();
        } else {

            $labs = DB::table('labs')
                ->select(DB::raw('*'))
                ->where('status', 1)
                ->get();
            $count = count($labs);
        }

        return response()->json(['status' => true, 'data' => $labs, 'count' => $count]);

    }

    public function get_lab(Request $request)
    {
        $lab_id = $request->input('lab_id');

        $lab = DB::table('labs')
            ->select(DB::raw('*'))
            ->where('id', $lab_id)
            ->where('status',1)
            ->first();

        return response()->json(['status' => true, 'data' => $lab]);

    }

    public function update_lab(Request $request)
    {
        $lab_id = $request->input('lab_id');
        $name = $request->input('name');
        $code = $request->input('code');
        $description = $request->input('description');

        DB::table('labs')
            ->where('id',$lab_id)
            ->update(['name' => $name,'code'=>$code,'description'=>$description,'updated_at'=> date("Y-m-d  H:i:s")]);

        return response()->json(['status' => true, 'message' => 'lab updated successfully']);

    }

    public function delete_lab(Request $request)
     {
         $lab_id = $request->input('lab_id');

         DB::table('labs')
             ->where('id',$lab_id)
             ->update(['status'=> 0,'updated_at'=> date("Y-m-d  H:i:s")]);

         return response()->json(['status' => true, 'message' => 'lab deleted successfully']);

     }


    public function get_all_lab_tests(Request $request)
    {
        $limit = $request->input('limit');
        $offset = $request->input('offset');

        if ($limit > 0 || $offset > 0) {

            $lab_tests = DB::table('lab_tests')
                ->leftJoin('labs','labs.id','=','lab_tests.lab')
                ->select(DB::raw('lab_tests.*,labs.name as lab'))
                ->where('lab_tests.status', 1)
                ->skip($offset)->take($limit)
                ->get();

            $count = DB::table('lab_tests')
                ->leftJoin('labs','labs.id','=','lab_tests.lab')
                ->select(DB::raw('lab_tests.*,labs.name as lab'))
                ->where('lab_tests.status', 1)
                ->count();

        } else {

            $lab_tests = DB::table('lab_tests')
                ->leftJoin('labs','labs.id','=','lab_tests.lab')
                ->select(DB::raw('lab_tests.*,labs.name as lab'))
                ->where('lab_tests.status', 1)
                ->get();
            $count = count($lab_tests);
        }

        return response()->json(['status' => true, 'data' => $lab_tests, 'count' => $count]);

    }

    public function get_single_test(Request $request)
    {
        $lab_test_id = $request->input('lab_test_id');
        $lab_test = DB::table('lab_tests')
            ->select(DB::raw('*'))
            ->where('id',$lab_test_id)
            ->where('status', 1)
            ->first();
        return response()->json(['status'=>true,'data'=>$lab_test]);
    }

    public function add_lab_test(Request $request)
    {
        $lab_id = $request->input('lab_id');
        $name = $request->input('name');
        $code = $request->input('code');
        $cost = $request->input('cost');
        $description = $request->input('description');

        DB::table('lab_tests')
            ->insert(['lab'=>$lab_id,'name' => $name,'lonic_code'=>$code,'cost'=>$cost,'description'=>$description,'created_at'=> date("Y-m-d  H:i:s")]);

        return response()->json(['status' => true, 'message' => 'Lab Test Added successfully']);

    }

    public function update_lab_test(Request $request)
    {

        $lab_test_id = $request->input('lab_test_id');
        $lab_id = $request->input('lab_id');
        $name = $request->input('name');
        $code = $request->input('code');
        $cost = $request->input('cost');
        $description = $request->input('description');

        DB::table('lab_tests')
            ->id('id',$lab_test_id)
            ->update(['lab'=>$lab_id,'name' => $name,'lonic_code'=>$code,'cost'=>$cost,'description'=>$description,'updated_at'=> date("Y-m-d  H:i:s")]);

        return response()->json(['status' => true, 'message' => 'Lab Test Updated successfully']);

    }

    public function delete_lab_test(Request $request)
      {
          $lab_test_id = $request->input('lab_test_id');


          DB::table('lab_tests')
              ->where('id',$lab_test_id)
              ->update(['status'=> 0,'updated_at'=> date("Y-m-d  H:i:s")]);

          return response()->json(['status' => true, 'message' => 'Lab Test Deleted successfully']);

      }

    public function get_all_prodducts(Request $request){

        $data = DB::table('inventory_products')
            ->select(DB::raw('*'))
            ->where( function ($q) {
                $q->where('group','Documents')
                    ->orWhere('group','Others');
                        })
            ->where('status',1)
            ->get();

        return response()->json(['status' => true, 'date' => $data]);

    }

}