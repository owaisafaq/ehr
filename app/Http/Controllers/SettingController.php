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
            ->where('id',$lab_test_id)
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

    public function add_update_hospital(Request $request){

        $is_update= $request->input('is_update');
        $name = $request->input('name');
        $address = $request->input('address');
        $type= $request->input('type');
        $city= $request->input('city');
        $registration_number = $request->input('registration_number');
        $state = $request->input('state');
        $category = $request->input('category');
        $country= $request->input('country');
        $number_of_departments = $request->input('number_of_departments');
        $phone= $request->input('phone');
        $date_registration= $request->input('date_registration');
        $email= $request->input('email');
        $number_beds = $request->input('number_beds');
        $website = $request->input('website');
        $name_proprietor = $request->input('name_proprietor');
        $accredation_lab= $request->input('accredation_lab');
        $accredation_pharmacy= $request->input('accredation_pharmacy');
        $accredation_others= $request->input('accredation_others');
        $image= $request->input('image');
        $image_name= $request->input('image_name');

        if ($is_update == 0) {

            DB::table('hospital')
                ->insert([
                    'name' => $name,
                    'image' => $image,
                    'image_name' => $image_name,
                    'address' => $address,
                    'type' => $type,
                    'city' => $city,
                    'registration_number' => $registration_number,
                    'state' => $state,
                    'category' => $category,
                    'country' => $country,
                    'number_of_departments' => $number_of_departments,
                    'phone' => $phone,
                    'date_registration' => $date_registration,
                    'email' => $email,
                    'number_beds' => $number_beds,
                    'website' => $website,
                    'name_proprietor' => $name_proprietor,
                    'accredation_lab' => $accredation_lab,
                    'accredation_pharmacy' => $accredation_pharmacy,
                    'accredation_others' => $accredation_others,
                    'created_at' => date("Y-m-d  H:i:s")]);

            return response()->json(['status' => true, 'message' => 'Hospital Added successfully']);

        }else{

            DB::table('hospital')
                ->where('id',1)
                ->update([
                    'name' => $name,
                    'image' => $image,
                    'image_name' => $image_name,
                    'address' => $address,
                    'type' => $type,
                    'city' => $city,
                    'registration_number' => $registration_number,
                    'state' => $state,
                    'category' => $category,
                    'country' => $country,
                    'number_of_departments' => $number_of_departments,
                    'phone' => $phone,
                    'date_registration' => $date_registration,
                    'email' => $email,
                    'number_beds' => $number_beds,
                    'website' => $website,
                    'name_proprietor' => $name_proprietor,
                    'accredation_lab' => $accredation_lab,
                    'accredation_pharmacy' => $accredation_pharmacy,
                    'accredation_others' => $accredation_others,
                    'updated_at' => date("Y-m-d  H:i:s")]);

            return response()->json(['status' => true, 'message' => 'Hospital Updated successfully']);


        }
    }

    public function get_hospital_profile(Request $request){

        $logo_image = url('/').'/uploaded_images/';

        $data = DB::table('hospital')
               ->leftJoin('countries', 'countries.id', '=', 'hospital.country')
               ->leftJoin('states', 'states.id', '=', 'hospital.state')
               ->select(DB::raw('hospital.*,states.name as state,states.id as state_id,countries.id as country_id,countries.name as country,states.name as state'))
               ->where('hospital.id',1)
               ->where('hospital.status', 1)
               ->first();

        if (empty($data)) {
            $is_update = 0;
        } else {
            $is_update = 1;
        }

        return response()->json(['status'=>true,'data'=>$data,'is_update'=>$is_update,'path'=>$logo_image]);

    }

    public function upload_hospital_image(Request $request)
       {
           $image = $request->file('hospital_image');
           $destinationPath = base_path() . '/public/uploaded_images';
           $original_name = $image->getClientOriginalName();

           $extension = $image->getClientOriginalExtension(); // getting image extension
           $fileName = rand() . time() . '.' . $extension; // renameing image
           if (!$image->isValid()) {
               return response()->json(['status' => false, 'message' => 'Invalid image']);
           }

           $image->move($destinationPath, $fileName);

    /*       DB::table('hospital')
                    ->where('id',1)
                    ->update(['image'=> $fileName,'updated_at'=> date("Y-m-d  H:i:s")]);*/

           return response()->json(['status' => true, 'message' => "Patient Image Uploaded Successfully", "image" => $fileName,'image_name'=> $original_name]);


       }

       public function optupload_hospital_image(Request $request)
       {

           return response()->json(['status' => true, 'message' => 'hello']);

       }


    public function add_department(Request $request)
      {
          $name = $request->input('name');
          $description = $request->input('description');

          DB::table('departments')
              ->insert(['name' => $name,'description'=>$description,'created_at'=> date("Y-m-d  H:i:s")]);

          return response()->json(['status' => true, 'message' => 'Department Added successfully']);

      }

      public function get_departments(Request $request)
      {
          $limit = $request->input('limit');
          $offset = $request->input('offset');

          if ($limit > 0 || $offset > 0) {

              $departments= DB::table('departments')
                  ->select(DB::raw('*'))
                  ->where('status', 1)
                  ->skip($offset)->take($limit)
                  ->get();

              $count = DB::table('departments')
                  ->select(DB::raw('*'))
                  ->where('status', 1)
                  ->count();
          } else {

              $departments = DB::table('departments')
                  ->select(DB::raw('*'))
                  ->where('status', 1)
                  ->get();
              $count = count($departments);
          }

          return response()->json(['status' => true, 'data' => $departments, 'count' => $count]);

      }

      public function get_department(Request $request)
      {
          $department_id= $request->input('department_id');

          $department= DB::table('departments')
              ->select(DB::raw('*'))
              ->where('id', $department_id)
              ->where('status',1)
              ->first();

          return response()->json(['status' => true, 'data' => $department]);

      }

      public function update_department(Request $request)
      {
          $department_id = $request->input('department_id');
          $name = $request->input('name');
          $description = $request->input('description');

          DB::table('departments')
              ->where('id',$department_id)
              ->update(['name' => $name,'description'=>$description,'updated_at'=> date("Y-m-d  H:i:s")]);

          return response()->json(['status' => true, 'message' => 'Department updated successfully']);

      }

      public function delete_department(Request $request)
       {
           $department_id = $request->input('department_id');

           DB::table('departments')
               ->where('id',$department_id)
               ->update(['status'=> 0,'updated_at'=> date("Y-m-d  H:i:s")]);

           return response()->json(['status' => true, 'message' => 'Department deleted successfully']);

       }


    public function get_all_contexts()
    {
        $contexts = DB::table('contexts')
            ->select(DB::raw('id,name'))
            ->where('status',1)
            ->get();

        return response()->json(['status' => true, 'data' => $contexts]);

    }

    public function add_role_group(Request $request){

        $name= $request->input('name');
        $role_rights = $request->input('role_rights');

        DB::table('roles')->insert(['name'=> $name,'created_at'=> date("Y-m-d  H:i:s")]);

        $role_id = DB::getPdo()->lastInsertId();

        $rights = json_decode($role_rights);


        foreach ($rights as $right) {
            DB::table('role_rights')->insert(
                ['role_id'=>$role_id,
                    'context_id' => $right->context_id,
                    'add_right' => $right->is_add,
                    'update_right' => $right->is_update,
                    'delete_right' => $right->is_delete,
                    'view_right' => $right->is_read,
                    'created_at' => date("Y-m-d  H:i:s")
                ]
            );
        }

        return response()->json(['status'=> true,'message'=> 'New Role Group Created Successfully']);


    }

    public function get_roles(Request $request)
    {
        $roles = DB::table('roles')
            ->select(DB::raw('id,name'))
            ->where('status', 1)
            ->get();

        return response()->json(['status' => true, 'data' => $roles]);
    }

}