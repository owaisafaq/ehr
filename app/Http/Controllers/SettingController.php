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

}