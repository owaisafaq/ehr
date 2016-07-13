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


class OtherController extends Controller
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
    public function get_pharmacies(Request $request)
        {

            $limit = $request->input('limit');
            $offset = $request->input('offset');

            if ($limit > 0 || $offset > 0) {

                $pharmacies = DB::table('pharmacy')
                    ->select(DB::raw('*'))
                    ->where('status', 1)
                    ->skip($offset)->take($limit)
                    ->get();

                $count = DB::table('pharmacy')
                    ->select(DB::raw('*'))
                    ->where('status', 1)
                    ->count();

            } else {

                $pharmacies = DB::table('pharmacy')
                    ->select(DB::raw('*'))
                    ->where('status', 1)
                    ->get();

                $count = count($pharmacies);
            }
            return response()->json(['status' => true, 'data' => $pharmacies, 'count' => $count]);
        }
    public function get_single_pharmacy(Request $request){
        $id = $request->input('pharmacy_id');
        $pharmacies = DB::table('pharmacy')
            ->select(DB::raw('*'))
            ->where('status', 1)
            ->where('id', $id)
            ->get();

        return response()->json(['status' => true, 'data' => $pharmacies]);
    }
    public function create_pharmacy(Request $request){


        $name = $request->input('name');
        $contact_person = $request->input('contact_person');
        $city = $request->input('city');
        $state = $request->input('state');
        $country = $request->input('country');
        $address_1 = $request->input('address_1');
        $address_2 = $request->input('address_2');
        $email = $request->input('email');
        $work_phone = $request->input('work_phone');
        $post_code = $request->input('post_code');

        $id = DB::table('pharmacy')->insertGetId(
            [
                'name'=>$name,
                'contact_person'=>$contact_person,
                'city'=>$city,
                'state'=>$state,
                'country'=>$country,
                'address_1'=>$address_1,
                'address_2'=>$address_2,
                'email'=>$email,
                'work_phone'=>$work_phone,
                'post_code'=>$post_code,
                'created_at'=>date("Y-m-d  H:i:s")
            ]
        );
        if($id){
            return response()->json(['status' => true, 'message' => "Pharmacy Added Successfully", 'pharmacy_id'=>$id], 200);
        }else{
            return response()->json(['status' => false, 'message' => "Error!"], 404);
        }
    }
    public function update_pharmacy(Request $request){
        $id = $request->input('pharmacy_id');
        $name = $request->input('name');
        $contact_person = $request->input('contact_person');
        $city = $request->input('city');
        $state = $request->input('state');
        $country = $request->input('country');
        $address_1 = $request->input('address_1');
        $address_2 = $request->input('address_2');
        $email = $request->input('email');
        $work_phone = $request->input('work_phone');
        $post_code = $request->input('post_code');

        $count = DB::table('pharmacy')->where('id', $id)->update(
            [
                'name'=>$name,
                'contact_person'=>$contact_person,
                'city'=>$city,
                'state'=>$state,
                'country'=>$country,
                'address_1'=>$address_1,
                'address_2'=>$address_2,
                'email'=>$email,
                'work_phone'=>$work_phone,
                'post_code'=>$post_code,
                'updated_at'=>date("Y-m-d  H:i:s")
            ]
        );
        if($count){
            return response()->json(['status' => true, 'message' => "Pharmacy Updated Successfully"], 200);
        }else{
            return response()->json(['status' => false, 'message' => "Error!"], 404);
        }
    }
    public function delete_pharmacy(Request $request){
        $id = $request->input('pharmacy_id');
        $count = DB::table('pharmacy')->where('id', $id)->update(['status'=>0]);
        if($count){
            return response()->json(['status' => true, 'message' => "Pharmacy Deleted Successfully"], 200);
        }else{
            return response()->json(['status' => false, 'message' => "Error!"], 404);
        }
    }
}

