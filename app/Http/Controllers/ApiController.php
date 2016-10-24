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


class ApiController extends Controller
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


    public function search_patient(Request $request)
    {
        $name = $request->input('name');
        $patients = DB::table('patients')
            ->select(DB::raw('id,first_name,last_name'))
            ->where( function ($q) use ($name) {
                $q->where('first_name','LIKE',"$name%")
                    ->orWhere('id','LIKE',"$name%");
                        })
            //->where('hospital_plan',1)
            ->where('status',1)
            ->get();

        foreach ($patients as $patient) {
            $patient->patient_id = str_pad($patient->id, 7, '0', STR_PAD_LEFT);
        }

        if (empty($patients)) {
            $patient = array(
                "id" => '0',
                "first_name" => "",
                "last_name" => "",
                );
            return response()->json(['status' => false, 'data' => $patient]);
        } else {
            return response()->json(['status' => true, 'data' => $patients]);
        }
    }


    public function search_doctor(Request $request)
    {
        $name = $request->input('name');

        $doctors = DB::table('doctors')
            ->select(DB::raw('id,name'))
            ->where(function ($q) use ($name) {
                $q->where('first_name', 'LIKE', "$name%")
                    ->orWhere('id', 'LIKE', "%$name%");
            })
            ->where('status', 1)
            ->get();

        if (empty($doctors)) {
            $doctors = array(
                "id" => '0',
                "name" => ""
            );
            return response()->json(['status' => false, 'data' => $doctors]);

        } else {
            return response()->json(['status' => true, 'data' => $doctors]);
        }

    }

    public function search_department(Request $request)
     {
         $name = $request->input('name');

         $departments = DB::table('departments')
             ->select(DB::raw('id,name'))
             ->where(function ($q) use ($name) {
                 $q->where('first_name', 'LIKE', "$name%")
                     ->orWhere('id', 'LIKE', "%$name%");
             })
             ->where('status', 1)
             ->get();

         if (empty($departments)) {
             $departments = array(
                 "id" => '0',
                 "name" => ""
             );
             return response()->json(['status' => false, 'data' => $departments]);

         } else {
             return response()->json(['status' => true, 'data' => $departments]);
         }

     }


    public function add_patient(Request $request)
    {
        $first_name = $request->input('first_name');

        $middle_name = $request->input('middle_name');

        $last_name = $request->input('last_name');

        $date_of_birth = $request->input('date_of_birth');

        $age = $request->input('age');

        $sex = $request->input('sex');

        $marital_status = $request->input('marital_status');

        $religion = $request->input('religion');

        $father_firstname = $request->input('father_firstname');

        $father_middlename = $request->input('father_middlename');

        $father_lastname = $request->input('father_lastname');

        $mother_firstname = $request->input('mother_firstname');

        $mother_middlename = $request->input('mother_middlename');

        $mother_lastname = $request->input('mother_lastname');

        $refered_name = $request->input('refered_name');

        $patient_unit_number = $request->input('patient_unit_number');

        $identity_type = $request->input('identity_type');

        $identity_number = $request->input('identity_number');

        $patient_state = $request->input('patient_state');

        $patient_local_goverment_area = $request->input('patient_local_goverment_area');

        $tribe = $request->input('tribe');

        $nationality = $request->input('nationality');

        $blood_group = $request->input('blood_group');

        $language = $request->input('language');

        $currentdatetime = date("Y-m-d  H:i:s");

        $patient_id = $request->input('patient_id');

        $fileName = $request->input('patient_image');
        $image_name = $request->input('image_name');


        if (isset($patient_id)) {

            DB::table('patients')
                ->where('id', $patient_id)
                ->update(array('first_name' => $first_name,
                    'middle_name' => $middle_name,
                    'last_name' => $last_name,
                    'date_of_birth' => $date_of_birth,
                    'age' => $age,
                    'sex' => $sex,
                    'patient_image' => $fileName,
                    'image_name' => $image_name,
                    'marital_status' => $marital_status,
                    'religion' => $religion,
                    'father_firstname' => $father_firstname,
                    'father_middlename' => $father_middlename,
                    'father_lastname' => $father_lastname,
                    'mother_firstname' => $mother_firstname,
                    'mother_middlename' => $mother_middlename,
                    'mother_lastname' => $mother_lastname,
                    'refered_name' => $refered_name,
                    'patient_unit_number' => $patient_unit_number,
                    'identity_type' => $identity_type,
                    'identity_number' => $identity_number,
                    'state' => $patient_state,
                    'local_goverment_area' => $patient_local_goverment_area,
                    'tribe' => $tribe,
                    'nationality' => $nationality,
                    'language' => $language,
                    'blood_group' => $blood_group,
                    'updated_at' => $currentdatetime));


            return response()->json(['status' => true, 'message' => "Patient updated successfully", "patient_id" => $patient_id]);


        } else {

            DB::table('patients')->insert(
                ['first_name' => $first_name,
                    'middle_name' => $middle_name,
                    'last_name' => $last_name,
                    'date_of_birth' => $date_of_birth,
                    'age' => $age,
                    'sex' => $sex,
                    'patient_image' => $fileName,
                    'image_name' => $image_name,
                   // 'plan_id' => 1,
                    'marital_status' => $marital_status,
                    'religion' => $religion,
                    'father_firstname' => $father_firstname,
                    'father_middlename' => $father_middlename,
                    'father_lastname' => $father_lastname,
                    'mother_firstname' => $mother_firstname,
                    'mother_middlename' => $mother_middlename,
                    'mother_lastname' => $mother_lastname,
                    'refered_name' => $refered_name,
                    'patient_unit_number' => $patient_unit_number,
                    'identity_type' => $identity_type,
                    'identity_number' => $identity_number,
                    'state' => $patient_state,
                    'local_goverment_area' => $patient_local_goverment_area,
                    'tribe' => $tribe,
                    'nationality' => $nationality,
                    'language' => $language,
                    'blood_group' => $blood_group,
                    'created_at' => $currentdatetime
                ]
            );


            $patient_id = DB::getPdo()->lastInsertId();


            return response()->json(['status' => true, 'message' => "Patient registered successfully", "patient_id" => $patient_id]);

        }


    }

    public function upload_patient_image(Request $request)
    {
        $image = $request->file('patient_image');
        $destinationPath = base_path() . '/public/uploaded_images';
        $original_name = $image->getClientOriginalName();

        $extension = $image->getClientOriginalExtension(); // getting image extension
        $fileName = rand() . time() . '.' . $extension; // renameing image
        if (!$image->isValid()) {
            return response()->json(['status' => false, 'message' => 'Invalid image']);
        }

        $image->move($destinationPath, $fileName);

        return response()->json(['status' => true, 'message' => "Patient Image Uploaded Successfully", "image" => $fileName,'name'=> $original_name]);


    }

    public function optupload_patient_image(Request $request)
    {

        return response()->json(['status' => true, 'message' => 'hello']);

    }


    public function delete_patient(Request $request)
    {
        $patient_id = $request->input('patient_id');

        $currentdatetime = date("Y-m-d  H:i:s");


        DB::table('patients')
            ->where('id', $patient_id)
            ->update(
                ['status' => 0,
                    'updated_at' => $currentdatetime
                ]
            );


        return response()->json(['status' => true, 'message' => "Patient Deleted successfully"]);

    }


    public function add_patient_address(Request $request)
    {
        $patient_id = $request->input('patient_id');

        $same_as_above = $request->input('same_as_above');

        $status = $same_as_above === 'true' ? true : false;

        $email = $request->input('email');

        $phone_number = $request->input('phone_number');

        $mobile_number = $request->input('mobile_number');

        $house_number = $request->input('house_number');

        $street = $request->input('street');

        $city = $request->input('city');

        $state = $request->input('state');

        $country = $request->input('country');

        $local_goverment_area = $request->input('local_goverment_area');

        $postal_code = $request->input('postal_code');

        $currentdatetime = date("Y-m-d  H:i:s");

        DB::table('patient_address')->where('patient_id', '=', $patient_id)->delete();


        DB::table('patient_address')->insert(
            ['patient_id' => $patient_id,
                'email' => $email,
                'address_type' => 'contact',
                'phone_number' => $phone_number,
                'mobile_number' => $mobile_number,
                'house_number' => $house_number,
                'street' => $street,
                'city' => $city,
                'state' => $state,
                'country' => $country,
                'local_goverment_area' => $local_goverment_area,
                'postal_code' => $postal_code,
                'created_at' => $currentdatetime
            ]
        );


        $address_id = DB::getPdo()->lastInsertId();

        if ($status == false) {


            $permanent_city = $request->input('permanent_city');

            $permanent_state = $request->input('permanent_state');

            $permanent_street = $request->input('permanent_street');

            $permanent_country = $request->input('permanent_country');

            $permanent_email = $request->input('permanent_email');

            $permanent_housenumber = $request->input('permanent_housenumber');

            $permanent_mobilenumber = $request->input('permanent_mobilenumber');

            $permanent_phonenumber = $request->input('permanent_phonenumber');

            $permanent_postalCode = $request->input('permanent_postalCode');

            $permanent_local_goverment_area = $request->input('permanent_local_');


            DB::table('patient_address')->insert(
                ['patient_id' => $patient_id,
                    'email' => $permanent_email,
                    'address_type' => 'permanent',
                    'phone_number' => $permanent_phonenumber,
                    'mobile_number' => $permanent_mobilenumber,
                    'house_number' => $permanent_housenumber,
                    'street' => $permanent_street,
                    'city' => $permanent_city,
                    'state' => $permanent_state,
                    'country' => $permanent_country,
                    'local_goverment_area' => 0,
                    'postal_code' => $permanent_postalCode,
                    'created_at' => $currentdatetime
                ]
            );


            $address_id = DB::getPdo()->lastInsertId();

        }


        return response()->json(['status' => true, 'message' => "Patient address registered successfully", "address_id" => $address_id]);


    }


    public function add_patient_kin(Request $request)
    {
        $patient_id = $request->input('patient_id');

        $kin_fullname = $request->input('kin_fullname');

        $kin_middlename = $request->input('kin_middlename');

        $kin_lastname = $request->input('kin_lastname');

        $kin_relationship = $request->input('kin_relationship');

        $others = $request->input('others');

        $kin_phone_number = $request->input('kin_phone_number');

        $kin_mobile_number = $request->input('kin_mobile_number');

        $kin_email = $request->input('kin_email');

        $kin_house_number = $request->input('kin_house_number');

        $kin_street = $request->input('kin_street');

        $kin_city = $request->input('kin_city');

        $kin_state = $request->input('kin_state');

        $kin_country = $request->input('kin_country');

        $kin_postal_code = $request->input('kin_postal_code');

        $currentdatetime = date("Y-m-d  H:i:s");

        $kin_id = $request->input('kin_id');


        if (isset($kin_id)) {


            DB::table('patient_kin')
                ->where('id', $kin_id)
                ->update(
                    ['patient_id' => $patient_id,
                        'fullname' => $kin_fullname,
                        'middlename' => $kin_middlename,
                        'lastname' => $kin_lastname,
                        'relationship' => $kin_relationship,
                        'others' => $others,
                        'phone_number' => $kin_phone_number,
                        'mobile_number' => $kin_mobile_number,
                        'email' => $kin_email,
                        'house_number' => $kin_house_number,
                        'street' => $kin_street,
                        'city' => $kin_city,
                        'state' => $kin_state,
                        'country' => $kin_country,
                        'postal_code' => $kin_postal_code,
                        'updated_at' => $currentdatetime
                    ]
                );


            return response()->json(['status' => true, 'message' => "Patient kin updated successfully", "patient_id" => $patient_id, "kin_id" => $kin_id]);


        } else {

            DB::table('patient_kin')->insert(
                ['patient_id' => $patient_id,
                    'fullname' => $kin_fullname,
                    'middlename' => $kin_middlename,
                    'lastname' => $kin_lastname,
                    'relationship' => $kin_relationship,
                    'others' => $others,
                    'phone_number' => $kin_phone_number,
                    'mobile_number' => $kin_mobile_number,
                    'email' => $kin_email,
                    'house_number' => $kin_house_number,
                    'street' => $kin_street,
                    'city' => $kin_city,
                    'state' => $kin_state,
                    'country' => $kin_country,
                    'postal_code' => $kin_postal_code,
                    'created_at' => $currentdatetime
                ]
            );


            $kin_id = DB::getPdo()->lastInsertId();

            return response()->json(['status' => true, 'message' => "Patient kin registered successfully", "patient_id" => $patient_id, "kin_id" => $kin_id]);


        }

    }


    public function add_patient_employees(Request $request)
    {
        $patient_id = $request->input('patient_id');

        $employer_name = $request->input('employer_name');

        $employer_phone_number = $request->input('employer_phone_number');

        $employer_mobile_number = $request->input('employer_mobile_number');

        $employer_email = $request->input('employer_email');

        $employer_house_number = $request->input('employer_house_number');

        $employer_street = $request->input('employer_street');

        $employer_city = $request->input('employer_city');

        $employer_state = $request->input('employer_state');

        $employer_country = $request->input('employer_country');

        $employee_id = $request->input('employee_id');

        $currentdatetime = date("Y-m-d  H:i:s");


        if (isset($employee_id)) {


            DB::table('patient_employers')
                ->where('id', $employee_id)
                ->update(
                    ['patient_id' => $patient_id,
                        'name' => $employer_name,
                        'phone_number' => $employer_phone_number,
                        'mobile_number' => $employer_mobile_number,
                        'email' => $employer_email,
                        'house_number' => $employer_house_number,
                        'street' => $employer_street,
                        'city' => $employer_city,
                        'state' => $employer_state,
                        'country' => $employer_country,
                        'updated_at' => $currentdatetime
                    ]
                );


            // $employee_id = DB::getPdo()->lastInsertId();


            return response()->json(['status' => true, 'message' => "Patient Employee updated successfully", "patient_id" => $patient_id, "employee_id" => $employee_id]);


        } else {

            DB::table('patient_employers')->insert(
                ['patient_id' => $patient_id,
                    'name' => $employer_name,
                    'phone_number' => $employer_phone_number,
                    'mobile_number' => $employer_mobile_number,
                    'email' => $employer_email,
                    'house_number' => $employer_house_number,
                    'street' => $employer_street,
                    'city' => $employer_city,
                    'state' => $employer_state,
                    'country' => $employer_country,
                    'created_at' => $currentdatetime
                ]
            );


            $employee_id = DB::getPdo()->lastInsertId();


            return response()->json(['status' => true, 'message' => "Patient Employee registered successfully", "patient_id" => $patient_id, "employee_id" => $employee_id]);

        }

    }

    public function register_user(Request $request)
    {
        $username = $request->input('name');

        $first_name = $request->input('first_name');

        $last_name= $request->input('last_name');

        $telephone_number= $request->input('telephone_number');

        $email = $request->input('email');

       // $password = $request->input('password');

       // $password_user = md5($password);

        $user_role_id = $request->input('role_id');

        $currentdatetime = date("Y-m-d  H:i:s");

        $users = DB::table('users')
            ->select(DB::raw('name'))
            ->where('email', $email)
            ->get();

        if (count($users) > 0) {

            return response()->json(['status' => false, 'message' => "Email Exists Already"]);

            exit;


        }


        DB::table('users')->insert(
            ['name' => $username,
                'first_name' => $first_name,
                'last_name' => $last_name,
                'telephone_number' => $telephone_number,
                'email' => $email,
                'password' => '77eae7aaebf39fd0c8bef84e58b37cfd',
                'role_id' => $user_role_id,
                'created_at' => $currentdatetime
            ]
        );


        $user_id = DB::getPdo()->lastInsertId();


        $user = DB::table('users')
            ->select(DB::raw('name,id'))
            ->where('id', $user_id)
            ->first();

        $token = JWTAuth::fromUser($user);


        return response()->json(['status' => true, 'message' => "User Registered Successfully", 'data' => $user, 'token' => $token]);


    }

    public function update_user(Request $request)
    {
        $user_id = $request->input('user_id');

        $username = $request->input('name');

        $first_name = $request->input('first_name');

        $last_name = $request->input('last_name');

        $telephone_number = $request->input('telephone_number');

        $email = $request->input('email');

        $user_role_id = $request->input('role_id');

        $currentdatetime = date("Y-m-d  H:i:s");

        $users = DB::table('users')
               ->select(DB::raw('name'))
               ->where('email', $email)
               ->get();

        if (count($users) > 1) {
            return response()->json(['status' => false, 'message' => "Email Exists Already"]);
            exit;
        }

        DB::table('users')
            ->where('id',$user_id)
            ->update(
             ['name' => $username,
                 'first_name' => $first_name,
                 'last_name' => $last_name,
                 'telephone_number' => $telephone_number,
                 'email' => $email,
                 'updated_at' => $currentdatetime
             ]
         );

        return response()->json(['status' => true, 'message' => "User Updated Successfully"]);

    }

    public function delete_user(Request $request)
    {
        $user_id = $request->input('user_id');

        DB::table('users')
            ->where('id', $user_id)
            ->update(['status' => 0, 'updated_at' => date("Y-m-d  H:i:s")]);

        return response()->json(['status' => true, 'message' => "User Deleted Successfully"]);
    }

    public function get_all_users(Request $request){

        $limit = $request->input('limit');
        $offset = $request->input('offset');


        if ($limit > 0 || $offset > 0) {

            $users = DB::table('users')
                ->select(DB::raw('id,name,first_name,last_name,telephone_number,email,status'))
                ->where('status', 1)
                ->skip($offset)->take($limit)
                ->get();

            $count = DB::table('users')
                ->select(DB::raw('*'))
                ->where('status', 1)
                ->count();

        } else {
            $users = DB::table('users')
                ->select(DB::raw('id,name,first_name,last_name,telephone_number,email,status'))
                ->where('status', 1)
                ->get();

            $count = DB::table('users')
                ->select(DB::raw('*'))
                ->where('status', 1)
                ->count();
        }

        return response()->json(['status' => true,'data' => $users,'count'=>$count]);

    }

    public function get_user(Request $request)
    {
        $user_id = $request->input('user_id');

        $user = DB::table('users')
            ->select(DB::raw('id,name,first_name,last_name,telephone_number,email,status'))
            ->where('status', 1)
            ->where('id', $user_id)
            ->first();

        return response()->json(['status' => true,'data' => $user]);
    }

    public function user_login(Request $request)
    {
        $email_address = $request->input('email');

        $password = $request->input('password');

        $password_user = md5($password);

        $user = DB::table('users')
            ->select(DB::raw('id as source_id,email,name,role_id'))
            ->where('email', $email_address)
            ->where('password', $password_user)
            ->where('status',1)
            ->get();


        if (count($user) == 1) {

            $users = DB::table('users')
                ->select(DB::raw('id'))
                ->where('email', $email_address)
                ->where('password', $password_user)
                ->get();


            $token = JWTAuth::fromUser($users[0]);

            $user_id = JWTAuth::authenticate($token)->id;

            $user_status = DB::table('users')
                ->select(DB::raw('user_status'))
                ->where('id', $user_id)
                ->first();

            $user_roles = DB::table('users')
                ->Join('roles','users.role_id','=','roles.id')
                ->join('role_rights','roles.id','=','role_rights.role_id')
                ->join('contexts','role_rights.context_id','=','contexts.id')
                ->select(DB::raw('roles.name,contexts.name as context,role_rights.add_right,role_rights.update_right,role_rights.delete_right,role_rights.view_right'))
                ->where('users.id', $user_id)
                ->where('roles.status', 1)
                ->get();

            $obj = new  \stdClass();
            foreach ($user_roles as $roles) {
                $obj->{$roles->context} = $roles;
            }

            if ($user_status->user_status != 'active') {
                return response()->json(['status' => false, 'message' => 'This user is not active']);
            }

            return response()->json(['status' => true, 'data' => $user[0],'token'=> $token, 'roles'=>$obj]);

        } else {

            return response()->json(['status' => false, 'message' => 'invalid user']);

        }


    }

    public function add_visit(Request $request)
    {
        $user_id = $request->input('source_id');

        $patient_id = $request->input('patient_id');

        $department_id = $request->input('department_id');

        $encounter_class = $request->input('encounter_class');

        $encounter_type = $request->input('encounter_type');

        $whom_to_see = $request->input('whom_to_see');

        $decscribe_whom_to_see = $request->input('decscribe_whom_to_see');

        $reason_of_visit = $request->input('reason_of_visit');

        $token = $request->input('token');

        $currentdatetime = date("Y-m-d  H:i:s");


        $visit_count = DB::table('visits')
             ->select(DB::raw('*'))
             ->where('patient_id', $patient_id)
             ->where('visit_status','!=','checkout')
             ->where('status', 1)
             ->count();

        if ($visit_count >= 1) {
            return response()->json(['status' => false, 'message' => 'New Visit can not be created']);
        }

        DB::table('visits')
            ->where('patient_id',$patient_id)
            ->update(['status' => 0,'updated_at' => $currentdatetime]);


        DB::table('visits')->insert(
            ['patient_id' => $patient_id,
                'department_id' => $department_id,
                'encounter_class' => $encounter_class,
                'encounter_type' => $encounter_type,
                'whom_to_see' => $whom_to_see,
                'decscribe_whom_to_see' => $decscribe_whom_to_see,
                'reason_of_visit'=>$reason_of_visit,
                'created_at' => $currentdatetime
            ]
        );


        $visit_id = DB::getPdo()->lastInsertId();

        DB::table('billing')->insert(
                 ['patient_id' => $patient_id,
                     'encounter_id' => $visit_id,
                     'created_at' => $currentdatetime] );


        return response()->json(['status' => true, 'message' => 'Visit added successfully', 'visit_id' => $visit_id]);

    }


    public function update_visit(Request $request)
    {
        $visit_id = $request->input('visit_id');

        $user_id = $request->input('source_id');

        $patient_id = $request->input('patient_id');

        $department_id = $request->input('department_id');

        $encounter_class = $request->input('encounter_class');

        $encounter_type = $request->input('encounter_type');

        $whom_to_see = $request->input('whom_to_see');

        $decscribe_whom_to_see = $request->input('decscribe_whom_to_see');

        $reason_of_visit = $request->input('reason_of_visit');

        $token = $request->input('token');

        $currentdatetime = date("Y-m-d  H:i:s");


        DB::table('visits')
            ->where('id', $visit_id)
            ->update(
                ['patient_id' => $patient_id,
                    'department_id' => $department_id,
                    'encounter_class' => $encounter_class,
                    'encounter_type' => $encounter_type,
                    'whom_to_see' => $whom_to_see,
                    'decscribe_whom_to_see' => $decscribe_whom_to_see,
                     'reason_of_visit'=>$reason_of_visit,
                    'updated_at' => $currentdatetime

                ]
            );

        return response()->json(['status' => true, 'message' => 'Visit Updated successfully']);

    }


    public function get_countries()
    {
        $countries = DB::table('countries')
            ->select(DB::raw('id,name,country_code'))
            ->where('status', 1)
            ->get();

        return response()->json(['status' => true, 'data' => $countries]);

    }


    public function get_states(Request $request)
    {
        $country_id = $request->input('country_id');

        $states = DB::table('states')
            ->select(DB::raw('id,name'))
           // ->where('country_id', $country_id)
            ->where('status', 1)
            ->get();

        return response()->json(['status' => true, 'data' => $states]);

    }


    public function get_cities(Request $request)
    {
        $state_id = $request->input('state_id');

        $cities = DB::table('cities')
            ->select(DB::raw('id,name'))
            ->where('state_id', $state_id)
            ->where('status', 1)
            ->get();

        return response()->json(['status' => true, 'data' => $cities]);

    }

    public function get_local_goverment_area(Request $request)
    {
        $state_id = $request->input('state_id');

        $local_goverment_area = DB::table('local_goverment_area')
            ->select(DB::raw('id,name'))
           // ->where('state_id', $state_id)
            ->where('status', 1)
            ->get();

        return response()->json(['status' => true, 'data' => $local_goverment_area]);


    }


    public function get_dropdowndata(Request $request)
    {
        $religion = DB::table('religion')
            ->select(DB::raw('id,name'))
            ->where('status', 1)
            ->get();

        $maritial_status = DB::table('maritial_status')
            ->select(DB::raw('id,name'))
            ->where('status', 1)
            ->get();

        $nationality = DB::table('countries')
            ->select(DB::raw('id,nationality as name'))
            ->where('status', 1)
            ->get();

        $bloodgroup = DB::table('blood_group')
            ->select(DB::raw('id,name'))
            ->where('status', 1)
            ->get();


        $hospital_plan = DB::table('hospital_plan')
            ->select(DB::raw('id,name'))
            ->where('status', 1)
            ->get();


        $occupation = DB::table('occupation')
            ->select(DB::raw('id,name'))
            ->where('status', 1)
            ->get();

        $departments = DB::table('departments')
            ->select(DB::raw('id,name'))
            ->where('status', 1)
            ->get();

        $doctors = DB::table('doctors')
            ->select(DB::raw('id,name'))
            ->where('status', 1)
            ->get();


        $policies = DB::table('policies')
            ->select(DB::raw('id,name'))
            ->where('status', 1)
            ->get();

        $hmo = DB::table('hmo')
            ->select(DB::raw('id,name'))
            ->where('status', 1)
            ->get();

        $relationships = DB::table('relationships')
            ->select(DB::raw('id,name'))
            ->where('status', 1)
            ->get();

        $language = DB::table('language')
            ->select(DB::raw('id,name'))
            ->where('status', 1)
            ->get();


        $patients = DB::table('patients')
            ->select(DB::raw('id,first_name'))
            ->where('status', 1)
            ->get();


        $categories = DB::table('categories')
            ->select(DB::raw('id,name'))
            ->where('status', 1)
            ->get();

        $retainership = DB::table('retainership')
            ->select(DB::raw('id,name'))
            ->where('status', 1)
            ->get();
        $manufacturers = DB::table('manufacturers')
            ->select(DB::raw('id, name'))
            ->where('status', 1)
            ->get();

        $labs = DB::table('labs')
            ->select(DB::raw('id,name'))
            ->where('status', 1)
            ->where('name','!=','radiology')
            ->get();

        $pharmacy = DB::table('pharmacy')
            ->select(DB::raw('id,name'))
            ->where('status', 1)
            ->get();

        $data = array(
            "religion" => $religion,
            "maritial_status" => $maritial_status,
            "languages" => $language,
            "nationality" => $nationality,
            "blood_group" => $bloodgroup,
            "hospital_plan" => $hospital_plan,
            "occupation" => $occupation,
            "departments" => $departments,
            "doctors" => $doctors,
            "policies" => $policies,
            "hmo" => $hmo,
            "relationships" => $relationships,
            "patients" => $patients,
            "retainership" => $retainership,
            "categories" => $categories,
            "doctors" => $doctors,
            "labs" => $labs,
            "manufacturer" => $manufacturers,
            "pharmacy" => $pharmacy

        );

        return response()->json(['status' => true, 'data' => $data]);


    }


    public function get_patient_vitals(Request $request)
    {
        $data = DB::table('medical_record_fields')
            ->select(DB::raw('id,category,name'))
            ->where('status', 1)
            ->get();

        return response()->json(['status' => true, 'data' => $data]);

    }

    public function test_upload(Request $request)
    {

        if ($request->file('patient_image')) {

            if ($request->file('patient_image')->isValid()) {

                $destinationPath = base_path() . '/public/uploaded_images'; // upload path
                $extension = $request->file('patient_image')->getClientOriginalExtension(); // getting image extension
                $fileName = time() . '.' . $extension; // renameing image

                $request->file('patient_image')->move($destinationPath, $fileName); // uploading file to given path

            }

        }


    }


    public function add_patient_plan(Request $request)
    {
        $patient_id = $request->input('patient_id');

        $plan_id = $request->input('plan_id');

        $is_pricipal = $request->input('is_principal');

        $is_dependant = $request->input('is_dependant');

        $currentdatetime = date("Y-m-d  H:i:s");

        $patient_plan_id = $request->input('patient_plan_id');

        if ($patient_plan_id > 0) {

            DB::table('plan_details')->where('id', '=', $patient_plan_id)->delete();

        }


        if ($plan_id == 1 || $plan_id == 4) {

            DB::table('patients')
                ->where('id', $patient_id)
                ->update(array('hospital_plan' => $plan_id, 'updated_at' => $currentdatetime));

            return response()->json(['status' => true, 'message' => 'Patient Plan added successfully']);

        } else {

            if ($plan_id == 2) {

                $hmo = $request->input('hmo');

                $policies = $request->input('policies');

                $insurance_id = $request->input('insurance_id');

                $description = $request->input('description');


                DB::table('patients')
                    ->where('id', $patient_id)
                    ->update(array('hospital_plan' => $plan_id, 'updated_at' => $currentdatetime));


                DB::table('plan_details')->insert(
                    ['plan_id' => $plan_id,
                        'patient_id' => $patient_id,
                        'is_principal' => $is_pricipal,
                        'is_dependant' => $is_dependant,
                        'hmo' => $hmo,
                        'policies' => $policies,
                        'insurance_id' => $insurance_id,
                        'description' => $description,
                        'created_at' => $currentdatetime
                    ]
                );


                $plan_detail_id = DB::getPdo()->lastInsertId();

                if ($is_dependant == 1) {

                    $principal_patient_id = $request->input('principal_patient_id');

                    $relationship = $request->input('relationship');

                    DB::table('patient_dependants')->insert(
                        ['plan_detail_id' => $plan_detail_id,
                            'principal_id' => $principal_patient_id,
                            'dependant_id' => $patient_id,
                            'relationship' => $relationship,
                            'created_at' => $currentdatetime
                        ]
                    );
                }


                if ($is_pricipal == 1) {

                    $dependents = $request->input('dependents');

                    $patient_dependents = json_decode($dependents);


                    foreach ($patient_dependents as $dependent) {

                        DB::table('patient_dependants')->insert(
                            ['plan_detail_id' => $plan_detail_id,
                                'principal_id' => $patient_id,
                                'dependant_id' => $dependent->dependent_id,
                                'relationship' => $dependent->relationship,
                                'created_at' => $currentdatetime
                            ]
                        );

                    }


                }

                return response()->json(['status' => true, 'message' => 'Patient Plan added successfully']);


            }

            if ($plan_id == 3) {

                $retainership = $request->input('retainership');

                $category = $request->input('category');

                $notes = $request->input('notes');


                DB::table('patients')
                    ->where('id', $patient_id)
                    ->update(array('hospital_plan' => $plan_id, 'updated_at' => $currentdatetime));


                DB::table('plan_details')->insert(
                    ['plan_id' => $plan_id,
                        'patient_id' => $patient_id,
                        'is_principal' => $is_pricipal,
                        'is_dependant' => $is_dependant,
                        'retainership' => $retainership,
                        'category' => $category,
                        'notes' => $notes,
                        'created_at' => $currentdatetime
                    ]
                );


                $plan_detail_id = DB::getPdo()->lastInsertId();

                if ($is_dependant == 1) {

                    $principal_patient_id = $request->input('principal_patient_id');

                    $relationship = $request->input('relationship');

                    DB::table('patient_dependants')->insert(
                        ['plan_detail_id' => $plan_detail_id,
                            'principal_id' => $principal_patient_id,
                            'dependant_id' => $patient_id,
                            'relationship' => $relationship,
                            'created_at' => $currentdatetime
                        ]
                    );
                }


                if ($is_pricipal == 1) {

                    $dependents = $request->input('dependents');

                    $patient_dependents = json_decode($dependents);

                    foreach ($patient_dependents as $dependent) {

                        DB::table('patient_dependants')->insert(
                            ['plan_detail_id' => $plan_detail_id,
                                'principal_id' => $patient_id,
                                'dependant_id' => $dependent->dependent_id,
                                'relationship' => $dependent->relationship,
                                'created_at' => $currentdatetime

                            ]
                        );

                    }


                }

                return response()->json(['status' => true, 'message' => 'Patient Plan added successfully']);

            }

        }

    }

    public function optadd_patient_archive(Request $request)
    {
        return response()->json(['status' => true, 'message' => 'hello']);
    }

    public function add_patient_archive(Request $request)
    {
        $archive = $request->file('patient_archive');
        $destinationPath = base_path() . '/public/patient_archive';
        $original_name = $archive->getClientOriginalName();

        $extension = $archive->getClientOriginalExtension(); // getting image extension
        $fileName = rand() . time() . '.' . $extension; // renameing image
        if (!$archive->isValid()) {
            return response()->json(['status' => false, 'message' => 'Invalid File']);
        }

        $archive->move($destinationPath, $fileName);
        $patient_id = $request->input('patient_id');
        $currentdatetime = date("Y-m-d  H:i:s");
        $folder_id = $request->input('follow_up_parent_id');


        DB::table('resources')->insert(
            ['patient_id' => $patient_id,
                'type' => 'file',
                'name' => $original_name,
                'followup_parent_id' => $folder_id,
                'file' => $fileName,
                'file_name' => $original_name,
                'created_at' => $currentdatetime
            ]
        );


        return response()->json(['status' => true, 'message' => 'Files Uploaded']);


    }


    public function update_patient_archive(Request $request)
    {
        $patient_id = $request->input('patient_id');

        $currentdatetime = date("Y-m-d  H:i:s");

        $patient_file_id = $request->input('file_id');

        $file_name = $request->input('file_name');


        DB::table('resources')
            ->where('id', $patient_file_id)
            ->update(
                ['file_name' => $file_name,
                    'updated_at' => $currentdatetime
                ]
            );


        return response()->json(['status' => true, 'message' => 'Patient Archive updated successfully']);


    }


    public function get_patient(Request $request)
    {
        $patient_id = $request->input('patient_id');
        $logo_image = url('/') . '/uploaded_images/';

        $patients = DB::table('patients')
            ->select('patients.*', 'visits.id as encounter_id', 'visits.created_at as visit_created_at', 'visits.visit_status', 'maritial_status.name as marital_status','visits.status as encounter_status')
            ->leftJoin('visits', 'patients.id', '=', 'visits.patient_id')
            ->leftJoin('maritial_status', 'patients.marital_status', '=', 'maritial_status.id')
            ->where('patients.id', $patient_id)
            //->where('visit_status','!=' ,'checkout')
            //->where('encounter_status','1')
            ->orderby('visits.id','desc')
            ->get();

        foreach ($patients as $patient) {
            $patient->barcode = "http://demoz.online/php-barcode-master/barcode.php?text=$patient->id";
            $patient->encounter_id = str_pad($patient->encounter_id, 8, '0', STR_PAD_LEFT);
            $patient->id = str_pad($patient->id, 7, '0', STR_PAD_LEFT);
        }

        $is_visit = 1;

        if ($patients[0]->sex == 1) {

            $patients[0]->sex = 'male';

        } else {

            $patients[0]->sex = 'female';
        }

        if($patients[0]->encounter_status != '1'){
            $is_visit = 0;
            return response()->json(['status' => true, 'data' => $patients[0], 'is_visit' => $is_visit]);
        }


        if ($patients[0]->visit_status == 'null' || $patients[0]->visit_status == 'checkout') {
            $is_visit = 0;
            return response()->json(['status' => true, 'data' => $patients[0], 'is_visit' => $is_visit]);
        }
        return response()->json(['status' => true, 'data' => $patients[0],'is_visit'=> $is_visit,'visit_id'=>$patients[0]->encounter_id]);
    }


    public function get_visits()
    {
        $visits = DB::table('visits')
            ->leftJoin('patients', 'patients.id', '=', 'visits.patient_id')
            ->select(DB::raw('patients.id,first_name,middle_name,last_name'))
            ->where('first_name', '!=', 'null')
            ->where('visits.status', 1)
            ->where('patients.status', 1)
            ->get();


        return response()->json(['status' => true, 'data' => $visits]);
    }


    public function get_patient_all_data(Request $request)
    {
        $patient_id = $request->input('patient_id');

        $patient_info = DB::table('patients')
            ->select(DB::raw('*'))
            ->where('id', $patient_id)
            ->where('status', 1)
            ->first();

        $patient_address = DB::table('patient_address')
            ->select(DB::raw('*'))
            ->where('patient_id', $patient_id)
            ->where('status', 1)
            ->get();


        $patient_kin = DB::table('patient_kin')
            ->select(DB::raw('*'))
            ->where('patient_id', $patient_id)
            ->where('status', 1)
            ->first();

        $patient_employers = DB::table('patient_employers')
            ->select(DB::raw('*'))
            ->where('patient_id', $patient_id)
            ->where('status', 1)
            ->first();


        $patient_plan = DB::table('hospital_plan')
            ->leftJoin('patients', 'patients.hospital_plan', '=', 'hospital_plan.id')
            ->leftJoin('plan_details', 'plan_details.patient_id', '=', 'patients.id')
            ->leftJoin('hmo', 'hmo.id', '=', 'plan_details.hmo')
           // ->leftJoin('policies', 'policies.id', '=', 'plan_details.policies')
            //->leftJoin('categories', 'categories.id', '=', 'plan_details.category')
            //->leftJoin('retainership', 'plan_details.retainership', '=', 'retainership.id')
            ->select(DB::raw('hospital_plan.name,plan_details.is_principal,plan_details.id as patient_plan_id,plan_details.is_dependant,hospital_plan.id as plan_id,hmo.name as hmo,hmo.id as hmo_id,plan_details.category,plan_details.retainership,policies,plan_details.insurance_id,plan_details.description,plan_details.notes'))
            ->where('patients.status', 1)
            ->where('patients.id',$patient_id)
           // ->where('plan_details.patient_id', $patient_id)
           // ->where('plan_details.status', 1)
            ->orderby('plan_details.id','desc')
            ->first();


        if ($patient_plan->name != 'self' || $patient_plan != 'null' || $patient_plan->name != 'FHSS' ) {

            if ($patient_plan->is_principal == 1) {

                $dependents = DB::table('patient_dependants')
                    ->leftJoin('patients', 'patients.id', '=', 'patient_dependants.dependant_id')
                    ->leftJoin('relationships', 'patient_dependants.relationship', '=', 'relationships.id')
                    ->select(DB::raw('patient_dependants.plan_detail_id,patient_dependants.dependant_id,patient_dependants.relationship,patients.first_name,patients.middle_name,patients.last_name,relationships.name as dependent_relationship'))
                    ->where('patient_dependants.status', 1)
                    ->where('plan_detail_id', $patient_plan->patient_plan_id)
                    ->where('patient_dependants.principal_id', $patient_id)
                    ->get();

                $patient_plan->dependents = $dependents;
            }

            if ($patient_plan->is_dependant == 1) {

                $principal = DB::table('patient_dependants')
                    ->leftJoin('patients', 'patients.id', '=', 'patient_dependants.principal_id')
                    ->leftJoin('relationships', 'patient_dependants.relationship', '=', 'relationships.id')
                    ->select(DB::raw('patient_dependants.plan_detail_id,patient_dependants.dependant_id,patient_dependants.relationship,patients.first_name,patients.middle_name,patients.last_name,relationships.name as dependent_relationship'))
                    ->where('patient_dependants.status', 1)
                    ->where('plan_detail_id', $patient_plan->patient_plan_id)
                    ->where('patient_dependants.dependant_id', $patient_id)
                    ->first();

                $patient_plan->principal = $principal;
            }

        }

        $patient_valid = 0;

        if(!empty($patient_info)){

            $patient_valid =1;
        }

        $data = array(
            "patient_info" => $patient_info,
            "patient_address" => $patient_address,
            "patient_kin" => $patient_kin,
            "patient_employeer" => $patient_employers,
            "hospital_plan" => $patient_plan
        );

        return response()->json(['status' => true, 'data' => $data,'is_valid'=>$patient_valid]);


    }


    public function add_patient_vitals(Request $request)
    {
        $visit_id = $request->input('visit_id');

        $patient_id = $request->input('patient_id');

        $systolic_mm_hg = $request->input('systolic_mm_hg');

        $diastolic_mm_hg = $request->input('diastolic_mm_hg');

        $pulse = $request->input('pulse');

        $respiratory_rate = $request->input('respiratory_rate');

        $temperature_c = $request->input('temperature_c');

        $temperature_f = $request->input('temperature_f');

        $bmi_result = $request->input('bmi_result');

        $bmi_weight = $request->input('bmi_weight');

        $bmi_height = $request->input('bmi_height');

        $notes = $request->input('notes');

        $currentdatetime = date("Y-m-d  H:i:s");


        DB::table('patient_vitals')->insert(
            ['patient_id' => $patient_id,
                'visit_id' => $visit_id,
                'systolic_mm_hg' => $systolic_mm_hg,
                'diastolic_mm_hg' => $diastolic_mm_hg,
                'pulse' => $pulse,
                'respiratory_rate' => $respiratory_rate,
                'temperature_c' => $temperature_c,
                'temperature_f' => $temperature_f,
                'bmi_result' => $bmi_result,
                'bmi_weight' => $bmi_weight,
                'bmi_height' => $bmi_height,
                'notes' => $notes,
                'created_at' => $currentdatetime
            ]
        );

        DB::table('visits')
            ->where('id', $visit_id)
            ->update(['visit_status' => 'triage', 'updated_at' => date("Y-m-d  H:i:s")]);

        return response()->json(['status' => true, 'message' => 'Patient Vitals Added Successfully']);

    }

    public function get_patient_visit_history(Request $request)
    {
        $patient_id = $request->input('patient_id');

        $limit = $request->input('limit');
        $offset = $request->input('offset');


        if ($limit > 0 || $offset > 0) {

            $visit_history = DB::table('visits')
                ->leftJoin('doctors', 'doctors.id', '=', 'visits.whom_to_see')
                ->leftJoin('departments', 'departments.id', '=', 'visits.department_id')
                ->leftJoin('patients', 'patients.id', '=', 'visits.patient_id')
                ->select(DB::raw('visits.id,visits.patient_id,patients.first_name,patients.middle_name,patients.last_name,visits.encounter_class,visits.encounter_type,visits.whom_to_see,visits.decscribe_whom_to_see,doctors.name,departments.name as faculty,visits.created_at,patients.status,visits.reason_of_visit'))
                ->orderby('visits.id', 'desc')
                ->where('visits.patient_id', '!=', 'null')
              //  ->where('visits.patient_id', $patient_id)
                ->where('visits.visit_status', '!=', 'checkout')
                ->where('visits.status', '1')
                ->where('patients.status', '1')
                ->skip($offset)->take($limit)
                ->get();

            $count = DB::table('visits')
                ->leftJoin('doctors', 'doctors.id', '=', 'visits.whom_to_see')
                ->leftJoin('departments', 'departments.id', '=', 'visits.department_id')
                ->leftJoin('patients', 'patients.id', '=', 'visits.patient_id')
                ->select(DB::raw('visits.id,visits.patient_id,patients.first_name,patients.middle_name,patients.last_name,visits.encounter_class,visits.encounter_type,visits.whom_to_see,visits.decscribe_whom_to_see,doctors.name,departments.name as faculty,visits.created_at,patients.status,visits.reason_of_visit'))
                ->orderby('visits.id', 'desc')
                ->where('visits.patient_id', '!=', 'null')
              //  ->where('visits.patient_id', $patient_id)
                ->where('visits.visit_status', '!=', 'checkout')
                ->where('visits.status', '1')
                ->where('visits.status', '1')
                ->where('patients.status', '1')
                ->count();

        } else {

            $visit_history = DB::table('visits')
                ->leftJoin('doctors', 'doctors.id', '=', 'visits.whom_to_see')
                ->leftJoin('departments', 'departments.id', '=', 'visits.department_id')
                ->leftJoin('patients', 'patients.id', '=', 'visits.patient_id')
                ->select(DB::raw('visits.id,visits.patient_id,patients.first_name,patients.middle_name,patients.last_name,visits.encounter_class,visits.encounter_type,visits.whom_to_see,visits.decscribe_whom_to_see,doctors.name,departments.name as faculty,visits.created_at,patients.status,visits.reason_of_visit'))
                ->orderby('visits.id', 'desc')
                ->where('visits.patient_id', '!=', 'null')
              //  ->where('visits.patient_id', $patient_id)
                ->where('visits.visit_status', '!=', 'checkout')
                ->where('visits.status', '1')
                ->where('patients.status', '1')
                ->skip($offset)->take($limit)
                ->get();

            $count = count($visit_history);

        }


        foreach ($visit_history as $history) {

            $history->id = str_pad($history->id, 8, '0', STR_PAD_LEFT);
            $history->patient_id = str_pad($history->patient_id, 7, '0', STR_PAD_LEFT);
        }

        return response()->json(['status' => true, 'data' => $visit_history, 'count' => $count]);


    }


    public function get_patient_vital_history(Request $request)
    {
        $patient_id = $request->input('patient_id');

        $limit = $request->input('limit');
        $offset = $request->input('offset');


        if ($limit > 0 || $offset > 0) {

            $data = DB::table('patient_vitals')
                ->select(DB::raw('*'))
                ->where('patient_id', $patient_id)
                ->where('status', '1')
                ->skip($offset)->take($limit)
                ->get();


            $count = DB::table('patient_vitals')
                ->select(DB::raw('*'))
                ->where('patient_id', $patient_id)
                ->where('status', '1')
                ->count();

        } else {

            $data = DB::table('patient_vitals')
                ->select(DB::raw('*'))
                ->where('patient_id', $patient_id)
                ->where('status', '1')
                ->get();

            $count = count($data);
        }


        foreach ($data as $vital_data) {
            $vital_data->visit_id = str_pad($vital_data->visit_id, 8, '0', STR_PAD_LEFT);
        }


        return response()->json(['status' => true, 'data' => $data, 'count' => $count]);

    }


    public function update_visit_status(Request $request)
    {
        $visit_id = $request->input('visit_id');

        $status = $request->input('status');

        $currentdatetime = date("Y-m-d  H:i:s");


        DB::table('visits')
            ->where('id', $visit_id)
            ->update(array('visit_status' => $status, 'updated_at' => $currentdatetime));


        return response()->json(['status' => true, 'message' => 'visit updated successfully']);
    }


    public function get_patient_demographics(Request $request)
    {
        $patient_id = $request->input('patient_id');

        $logo_image = url('/') . '/uploaded_images/';

        $demographics = DB::table('patients')
            ->leftJoin('patient_address', 'patient_address.patient_id', '=', 'patients.id')
            ->leftJoin('patient_kin', 'patient_kin.patient_id', '=', 'patients.id')
            ->leftJoin('religion', 'religion.id', '=', 'patients.religion')
            ->leftJoin('maritial_status', 'maritial_status.id', '=', 'patients.marital_status')
            ->leftJoin('hospital_plan', 'hospital_plan.id', '=', 'patients.hospital_plan')
            ->leftJoin('blood_group', 'blood_group.id', '=', 'patients.blood_group')
            ->select(DB::raw('patients.id,patients.patient_image,patients.first_name,patients.middle_name,patients.last_name,patients.date_of_birth,patients.sex,patients.age,religion.name as religion,maritial_status.name as marital_status,hospital_plan.name as hospital_plan,patient_unit_number,patient_address.mobile_number,patient_address.email,patient_kin.fullname as next_to_kin,patient_address.house_number,patient_address.street,blood_group.name as blood_group'))
            ->where('patients.id', $patient_id)
            // ->where('patient_address.address_type', 'contact')
            ->where('patients.status', 1)
            ->first();


        if ($demographics->sex == 1) {
            $demographics->gender = 'Male';
        } else {
            $demographics->gender = 'Female';
        }


        $demographics->id = str_pad($demographics->id, 7, '0', STR_PAD_LEFT);

        $visit = DB::table('visits')
            ->select(DB::raw('id,visit_status'))
            ->where('patient_id',$patient_id)
            ->where('status', 1)
            ->orderby('id','desc')
            ->first();

        if(empty($visit)){
            $demographics->patient_status='Active';
            $is_visit = 0;
            return response()->json(['status' => true, 'data' => $demographics,'is_visit'=>$is_visit]);
        }
        if($visit->visit_status=='checkout'){

            $reason = DB::table('patient_checkout')
                ->select(DB::raw('reason'))
                ->where('visit_id', $visit->id)
                ->first();

            if($reason->reason =='Dead'){
                $demographics->patient_status='Deceased';
            }else{
                $demographics->patient_status='Active';
            }

            $is_visit = 0;
            return response()->json(['status' => true, 'data' => $demographics,'is_visit'=>$is_visit]);
        }
        if($visit->visit_status !='checkout'){
            $demographics->patient_status='Active';
            $is_visit = 1;
            return response()->json(['status' => true, 'data' => $demographics,'is_visit'=>$is_visit,'visit_id'=>$visit->id ]);
        }


    }


    public function remove_visit(Request $request)
    {
        $visit_id = $request->input('visit_id');

        $currentdatetime = date("Y-m-d  H:i:s");


        DB::table('visits')
            ->where('id', $visit_id)
            ->update(array('status' => 0, 'updated_at' => $currentdatetime));


        return response()->json(['status' => true, 'message' => 'visit removed successfully']);

    }


    public function visit_details(Request $request)
    {
        $visit_id = $request->input('visit_id');

        $visit_details = DB::table('visits')
            ->leftJoin('doctors', 'doctors.id', '=', 'visits.whom_to_see')
            ->leftJoin('departments', 'departments.id', '=', 'visits.department_id')
            ->leftJoin('patients', 'patients.id', '=', 'visits.patient_id')
            ->select(DB::raw('visits.id,visits.patient_id,patients.first_name,patients.middle_name,patients.last_name,visits.encounter_class,visits.encounter_type,visits.whom_to_see,visits.decscribe_whom_to_see,doctors.name,departments.name as faculty,departments.id as department_id,visits.created_at,visits.reason_of_visit'))
            ->where('visits.patient_id', '!=', 'null')
            ->where('visits.visit_status', '!=', 'checkout')
            ->where('visits.status', '1')
            ->where('patients.status', '1')
            ->where('visits.id', $visit_id)
            ->first();


        return response()->json(['status' => true, 'data' => $visit_details]);


    }


    public function patient_archives(Request $request)
    {
        $patient_id = $request->input('patient_id');

        $file_archive = url('/') . '/patient_archive/';

        $patient_archives = DB::table('resources')
            ->select(DB::raw('id,patient_id,file,CONCAT("' . $file_archive . '",file) as file,file_name,created_at'))
            ->where('patient_id', $patient_id)
            ->where('status', 1)
            ->get();

        return response()->json(['status' => true, 'data' => $patient_archives]);

    }

    public function list_resources(Request $request)
    {
        $patient_id = $request->input('patient_id');

        $followup_parent_id = $request->input('followup_parent_id');

        $file_archive = url('/') . '/patient_archive/';

        $patient_archives = DB::table('resources')
            ->select(DB::raw('id,patient_id,followup_parent_id,file,CONCAT("' . $file_archive . '",file) as file,file_name,created_at'))
            ->where('patient_id', $patient_id)
            ->where('followup_parent_id', $followup_parent_id)
            ->where('type', 'file')
            ->where('status', 1)
            ->get();


        return response()->json(['status' => true, 'data' => $patient_archives, 'parent_id' => $followup_parent_id]);
    }


    public function list_resources_back(Request $request)
    {
        $patient_id = $request->input('patient_id');

        $followup_parent_id = $request->input('followup_parent_id');

        $file_archive = url('/') . '/patient_archive/';

        $followup = DB::table('resources')
            ->select(DB::raw('followup_parent_id'))
            ->where('patient_id', $patient_id)
            ->where('id', $followup_parent_id)
            ->where('status', 1)
            ->first();

        if ($followup_parent_id == 0) {

            $followup_id = 0;

        } else {

            $followup_id = $followup->followup_parent_id;

        }

        $patient_archives = DB::table('resources')
            ->select(DB::raw('id,patient_id,followup_parent_id,file,CONCAT("' . $file_archive . '",file) as file,file_name,created_at'))
            ->where('patient_id', $patient_id)
            ->where('followup_parent_id', $followup_id)
            ->where('status', 1)
            ->where('type', 'file')
            ->get();

        return response()->json(['status' => true, 'data' => $patient_archives, 'parent_id' => $followup_id]);
    }


    public function list_patient_resources(Request $request)
    {
        $patient_id = $request->input('patient_id');
        $followup_parent_id = $request->input('followup_parent_id');

        $file_archive = url('/') . '/patient_archive/';

        $resources = DB::table('resources')
            ->select(DB::raw('id,patient_id,name,type,followup_parent_id,file_name,created_at'))
            ->where('patient_id', $patient_id)
            ->where('followup_parent_id', $followup_parent_id)
            ->where('type', 'folder')
            ->where('status', 1)
            ->get();
        if (count($resources) > 0) {
            return response()->json(['status' => true, 'data' => $resources, 'parent_id' => $followup_parent_id]);
        } else {
            return response()->json(['status' => true, 'data' => $resources, 'parent_id' => $followup_parent_id]);
        }


    }


    public function list_patient_resources_back(Request $request)
    {
        $patient_id = $request->input('patient_id');
        $followup_parent_id = $request->input('followup_parent_id');


        $file_archive = url('/') . '/patient_archive/';


        $followup = DB::table('resources')
            ->select(DB::raw('followup_parent_id'))
            ->where('patient_id', $patient_id)
            ->where('id', $followup_parent_id)
            ->where('status', 1)
            ->first();


        if ($followup_parent_id == 0) {

            $followup_id = 0;

        } else {

            $followup_id = $followup->followup_parent_id;

        }


        $resources = DB::table('resources')
            ->select(DB::raw('id,patient_id,name,type,followup_parent_id,file_name,created_at'))
            ->where('patient_id', $patient_id)
            ->where('followup_parent_id', $followup_id)
            ->where('status', 1)
            ->where('type', 'folder')
            ->get();


        if (count($resources) > 0) {
            return response()->json(['status' => true, 'data' => $resources, 'parent_id' => $followup_id]);
        } else {
            return response()->json(['status' => true, 'data' => $resources, 'parent_id' => $followup_id]);
        }

    }

    public function update_patient_resources(Request $request)
    {
        $resource_id = $request->input('resource_id');

        $name = $request->input('name');

        $currentdatetime = date("Y-m-d  H:i:s");

        DB::table('resources')
            ->where('id', $resource_id)
            ->update(array('name' => $name, 'updated_at' => $currentdatetime));


        return response()->json(['status' => true, 'message' => 'Folder updated successfully']);


    }


    public function delete_patient_resources(Request $request)
    {
        $resource_id = $request->input('resource_id');

        $currentdatetime = date("Y-m-d  H:i:s");

        DB::table('resources')
            ->where('id', $resource_id)
            ->update(array('status' => 0, 'updated_at' => $currentdatetime));


        return response()->json(['status' => true, 'message' => 'Folder removed successfully']);

    }


    public function remove_patient_archive(Request $request)
    {
        $patient_file_id = $request->input('patient_fie_id');

        $currentdatetime = date("Y-m-d  H:i:s");

        DB::table('resources')
            ->where('id', $patient_file_id)
            ->update(array('status' => 0, 'updated_at' => $currentdatetime));


        return response()->json(['status' => true, 'message' => 'Patient file removed successfully']);


    }


    public function patient_medications(Request $request)
    {
        $patient_id = $request->input('patient_id');

        $limit = $request->input('limit');
        $offset = $request->input('offset');

        if ($limit > 0 || $offset > 0) {

            /*            $patient_medications = DB::table('medication_shedule')
                            ->leftJoin('patient_prescription', 'patient_prescription.medication', '=', 'medication_shedule.id')
                            ->leftJoin('visits', 'medication_shedule.patient_id', '=', 'visits.patient_id')
                            ->select(DB::raw('medication_shedule.id as prescription,visits.id as encounter_id, prescriptions,to_date,from_date,medication_status as status'))
                            ->where('medication_shedule.patient_id', $patient_id)
                            ->where('medication_shedule.status', 1)
                            ->skip($offset)->take($limit)
                            ->get();*/

            $patient_medications = DB::table('patient_prescription')
                ->select(DB::raw('id as prescription,created_at as prescription_date,prescription_status,visit_id'))
                ->where('patient_prescription.patient_id', $patient_id)
                ->where('status', 1)
                ->skip($offset)->take($limit)
                ->get();


            /*            $count = DB::table('medication_shedule')
                            ->leftJoin('patient_prescription', 'patient_prescription.medication', '=', 'medication_shedule.id')
                            ->select(DB::raw('medication_shedule.id,prescriptions,to_date,from_date,medication_status as status'))
                            ->where('medication_shedule.patient_id', $patient_id)
                            ->where('medication_shedule.status', 1)
                            ->count();*/

            $count = DB::table('patient_prescription')
                ->select(DB::raw('id as prescription,created_at as prescription_date,prescription_status,visit_id'))
                ->where('patient_prescription.patient_id', $patient_id)
                ->where('status', 1)
                ->count();

        } else {

            /*            $patient_medications = DB::table('medication_shedule')
                            ->leftJoin('patient_prescription', 'patient_prescription.medication', '=', 'medication_shedule.id')
                            ->leftJoin('visits', 'medication_shedule.patient_id', '=', 'visits.patient_id')
                            ->select(DB::raw('medication_shedule.id as prescription,,prescriptions,to_date,from_date,medication_status as status'))
                            ->where('medication_shedule.patient_id', $patient_id)
                            ->where('medication_shedule.status', 1)
                            ->get();*/

            $patient_medications = DB::table('patient_prescription')
                ->select(DB::raw('id as prescription,created_at as prescription_date,prescription_status,visit_id'))
                ->where('patient_prescription.patient_id', $patient_id)
                ->where('status', 1)
                ->get();

            $count = count($patient_medications);

        }


        foreach ($patient_medications as $medication) {
            $medication->visit_id = str_pad($medication->visit_id, 8, '0', STR_PAD_LEFT);
        }

        return response()->json(['status' => true, 'data' => $patient_medications, 'count' => $count]);

    }


    public function add_patient_medications(Request $request)
    {
        $patient_id = $request->input('patient_id');

        $prescriptions = $request->input('prescriptions');

        $to_date = $request->input('to_date');

        $from_date = $request->input('from_date');

        $medication_status = $request->input('medication_status');

        $currentdatetime = date("Y-m-d  H:i:s");


        DB::table('medication_shedule')->insert(
            ['patient_id' => $patient_id,
                'prescriptions' => $prescriptions,
                'to_date' => $to_date,
                'from_date' => $from_date,
                'medication_status' => $medication_status,
                'created_at' => $currentdatetime
            ]
        );


        return response()->json(['status' => true, 'message' => 'Patient Medication Added Successfully']);


    }

    public function patient_supplements(Request $request)
    {
        $patient_id = $request->input('patient_id');
        $limit = $request->input('limit');
        $offset = $request->input('offset');

        if ($limit > 0 || $offset > 0) {

            $patient_supplements = DB::table('medicines')
                ->leftJoin('inventory_products', 'inventory_products.id', '=', 'medicines.supplements')
                ->select(DB::raw('medicines.id,visit_id,medicines.supplements as supplement_id,inventory_products.name as supplement,dosage,frequency,intake,from_date,to_date,medicine_status'))
                ->where('medicines.patient_id', $patient_id)
                ->where('medicines.status', '1')
                ->skip($offset)->take($limit)
                ->get();

            $count = DB::table('medicines')
                ->leftJoin('inventory_products', 'inventory_products.id', '=', 'medicines.supplements')
                ->select(DB::raw('medicines.id,visit_id,medicines.supplements as supplement_id,inventory_products.name as supplement,dosage,frequency,intake,from_date,to_date,medicine_status'))
                ->where('medicines.patient_id', $patient_id)
                ->where('medicines.status', '1')
                ->count();


        } else {

            $patient_supplements = DB::table('medicines')
                ->leftJoin('inventory_products', 'inventory_products.id', '=', 'medicines.supplements')
                ->select(DB::raw('medicines.id,visit_id,medicines.supplements as supplement_id,inventory_products.name as supplement,dosage,frequency,intake,from_date,to_date,medicine_status'))
                ->where('medicines.patient_id', $patient_id)
                ->where('medicines.status', '1')
                ->get();

            $count = count($patient_supplements);

        }


        foreach ($patient_supplements as $supplement) {
            $supplement->visit_id = str_pad($supplement->visit_id, 8, '0', STR_PAD_LEFT);
        }

        return response()->json(['status' => true, 'data' => $patient_supplements, 'count' => $count]);

    }


    public function add_patient_supplements(Request $request)
    {
        $patient_id = $request->input('patient_id');

        $visit_id = $request->input('visit_id');

        $supplements = $request->input('supplements');

        $manufacturer = $request->input('manufacturer');

        $dosage = $request->input('dosage');

        $frequency = $request->input('frequency');

        $intake = $request->input('intake');

        $from_date = $request->input('from_date');

        $medicine_status = $request->input('medicine_status');

        $to_date = $request->input('to_date');

        $currentdatetime = date("Y-m-d  H:i:s");


        DB::table('visits')
            ->where('id', $visit_id)
            ->update(['visit_status' => 'physician', 'updated_at' => date("Y-m-d  H:i:s")]);


        DB::table('medicines')->insert(
            ['patient_id' => $patient_id,
                'visit_id' =>$visit_id,
                'supplements' => $supplements,
                'dosage' => $dosage,
                'frequency' => $frequency,
                'intake' => $intake,
               // 'manufacturer' => $manufacturer,
                'from_date' => $from_date,
                'medicine_status' => $medicine_status,
                'to_date' => $to_date,
                'created_at' => $currentdatetime
            ]
        );


        return response()->json(['status' => true, 'message' => 'Patient Supplemnts Added Successfully']);


    }


    public function patient_allergies(Request $request)
    {
        $patient_id = $request->input('patient_id');

        $limit = $request->input('limit');
        $offset = $request->input('offset');

        if ($limit > 0 || $offset > 0) {

            $patient_allergies = DB::table('patient_allergies')
                ->select(DB::raw('*'))
                ->where('patient_id', $patient_id)
                ->where('status', 1)
                ->skip($offset)->take($limit)
                ->get();

            $count = DB::table('patient_allergies')
                ->select(DB::raw('*'))
                ->where('patient_id', $patient_id)
                ->where('status', 1)
                ->count();

        } else {

            $patient_allergies = DB::table('patient_allergies')
                ->select(DB::raw('*'))
                ->where('patient_id', $patient_id)
                ->where('status', 1)
                ->get();

            $count = count($patient_allergies);

        }

        foreach ($patient_allergies as $allergies) {
            $allergies->visit_id = str_pad($allergies->visit_id, 8, '0', STR_PAD_LEFT);
        }

        return response()->json(['status' => true, 'data' => $patient_allergies, 'count' => $count]);

    }


    public function update_patient_allergies(Request $request)
    {
        $patient_id = $request->input('patient_id');
        $allergy_id = $request->input('allergy_id');
        $allergy_type = $request->input('allergy_type');
        $allergies = $request->input('allergies');
        $severity = $request->input('severity');
        $observed_on = $request->input('observed_on');
        $allergy_status = $request->input('allergy_status');
        $reaction = $request->input('reaction');

        $currentdatetime = date("Y-m-d  H:i:s");


        DB::table('patient_allergies')
            ->where('patient_id', $patient_id)
            ->where('id', $allergy_id)
            ->update(array('allergy_type' => $allergy_type, 'allergies' => $allergies, 'observed_on' => $observed_on, 'severity' => $severity, 'allergy_status' => $allergy_status, 'reactions' => $reaction, 'updated_at' => $currentdatetime));


        return response()->json(['status' => true, 'message' => 'Patient Allergies updated successfully']);


    }

    public function add_patient_allergies(Request $request)
    {
        $patient_id = $request->input('patient_id');
        $visit_id = $request->input('visit_id');
        $allergy_type = $request->input('allergy_type');
        $allergies = $request->input('allergies');
        $severity = $request->input('severity');
        $observed_on = $request->input('observed_on');
        $allergy_status = $request->input('allergy_status');
        $reaction = $request->input('reaction');

        $currentdatetime = date("Y-m-d  H:i:s");


        DB::table('visits')
            ->where('id', $visit_id)
            ->update(['visit_status' => 'triage', 'updated_at' => date("Y-m-d  H:i:s")]);


        DB::table('patient_allergies')->insert([
            'patient_id' => $patient_id,
            'visit_id' => $visit_id,
            'allergy_type' => $allergy_type,
            'allergies' => $allergies,
            'observed_on' => $observed_on,
            'severity' => $severity,
            'allergy_status' => $allergy_status,
            'reactions' => $reaction,
            'created_at' => $currentdatetime]);


        return response()->json(['status' => true, 'message' => 'Patient Allergies updated successfully']);


    }


    public function delete_patient_allergies(Request $request)
    {
        $allergy_id = $request->input('allergy_id');
        $patient_id = $request->input('patient_id');
        $currentdatetime = date("Y-m-d  H:i:s");


        DB::table('patient_allergies')
            ->where('id', $allergy_id)
            ->where('patient_id', $patient_id)
            ->update(array('status' => 0, 'updated_at' => $currentdatetime));


        return response()->json(['status' => true, 'message' => 'Patient Allergies Deleted successfully']);


    }


    public function patient_visit_list(Request $request)
    {
        $patient_id = $request->input('patient_id');
        $limit = $request->input('limit');
        $offset = $request->input('offset');


        if ($limit > 0 || $offset > 0) {


            $visits = DB::table('visits')
                ->select(DB::raw('patient_clinical_notes.id as clinical_notes_id, visits.id,visits.created_at,visits.encounter_type,doctors.name,visits.decscribe_whom_to_see,patients.first_name,patients.middle_name,patients.last_name,visits.reason_of_visit'))
                ->leftJoin('doctors', 'doctors.id', '=', 'visits.whom_to_see')
                ->leftJoin('patients', 'patients.id', '=', 'visits.patient_id')
                ->leftJoin("patient_clinical_notes",   DB::raw("TRIM(LEADING 0 FROM visits.id)"), '=', 'patient_clinical_notes.visit_id')
                ->where('visits.patient_id', $patient_id)
                ->skip($offset)->take($limit)
                ->get();


            $count = DB::table('visits')
                ->select(DB::raw('visits.id,visits.created_at,visits.encounter_type,doctors.name,visits.decscribe_whom_to_see,patients.first_name,patients.middle_name,patients.last_name,visits.reason_of_visit'))
                ->leftJoin('doctors', 'doctors.id', '=', 'visits.whom_to_see')
                ->leftJoin('patients', 'patients.id', '=', 'visits.patient_id')
                ->where('visits.patient_id', $patient_id)->count();

        } else {

            $visits = DB::table('visits')
                ->select(DB::raw('patient_clinical_notes.id as clinical_notes_id,visits.id,visits.created_at,visits.encounter_type,doctors.name,visits.decscribe_whom_to_see,patients.first_name,patients.middle_name,patients.last_name,visits.reason_of_visit'))
                ->leftJoin('doctors', 'doctors.id', '=', 'visits.whom_to_see')
                ->leftJoin('patients', 'patients.id', '=', 'visits.patient_id')
                ->leftJoin("patient_clinical_notes",   DB::raw("TRIM(LEADING 0 FROM visits.id)"), '=', 'patient_clinical_notes.visit_id')
                ->where('visits.patient_id', $patient_id)
                ->get();

            $count = count($visits);

        }

        foreach ($visits as $visit) {

            $visit->id = str_pad($visit->id, 8, '0', STR_PAD_LEFT);
            $visit->report = '';
            $visit->diagosis = '';
        }

        return response()->json(['status' => true, 'data' => $visits, 'count' => $count]);

    }


    public function get_all_patients(Request $request)
    {
        $limit = $request->input('limit');
        $offset = $request->input('offset');

        if ($limit > 0 || $offset > 0) {

            $patients = DB::table('patients')
                ->leftJoin('patient_address', 'patient_address.patient_id', '=', 'patients.id')
                ->select(DB::raw('patients.id,patients.first_name,patients.middle_name,patients.last_name,patient_address.phone_number,date_of_birth'))
                ->where('patients.status', 1)
                ->skip($offset)->take($limit)
                ->get();

            $count = DB::table('patients')
                ->where('status',1)
                ->count();

        } else {

            $patients = DB::table('patients')
                ->leftJoin('patient_address', 'patient_address.patient_id', '=', 'patients.id')
                ->select(DB::raw('patients.id,patients.first_name,patients.middle_name,patients.last_name,patient_address.phone_number,date_of_birth'))
                ->where('patients.status', 1)
                ->get();

            $count = DB::table('patients')
                ->where('status',1)
                ->count();

        }
        foreach($patients as $patient){

            $patient->id = str_pad($patient->id, 7, '0', STR_PAD_LEFT);
        }

        return response()->json(['status' => true, 'count' => $count, 'data' => $patients]);

    }


    public function get_single_appointment(Request $request)
    {
        $appointment_id = $request->input('appointment_id');
        $appointment = DB::table('appointments')
                ->select(DB::raw('appointments.id,appointments.department_id,appointments.doctor_id,appointments.patient_id,patients.first_name,patients.middle_name,patients.last_name,doctors.name as doctor,departments.name as department,appointments.reason,appointments.other_reasons,pick_date,start_time,priority,appointment_status,appointments.notes'))
                ->leftJoin('patients', 'appointments.patient_id', '=', 'patients.id')
                ->leftJoin('doctors', 'appointments.doctor_id', '=', 'doctors.id')
                ->leftJoin('departments', 'appointments.department_id', '=', 'departments.id')
                ->where('appointments.status', 1)
                ->where('appointments.id', $appointment_id)
                ->first();

        /*    if(!empty($appointment)) {
            $appointment->appointment_status = '';
        }*/
        return response()->json(['status' => true, 'data' => $appointment]);

    }


    public function get_patient_appointments(Request $request)
       {
           $patient_id = $request->input('patient_id');
           $limit = $request->input('limit');
           $offset = $request->input('offset');
           if ($limit > 0 || $offset > 0) {
               $appointments = DB::table('appointments')
                   ->select(DB::raw('appointments.id,appointments.patient_id,patients.first_name,patients.middle_name,patients.last_name,doctors.name as doctor,departments.name as department,appointments.reason,appointments.other_reasons,pick_date,appointment_status,start_time'))
                   ->leftJoin('patients', 'appointments.patient_id', '=', 'patients.id')
                   ->leftJoin('doctors', 'appointments.doctor_id', '=', 'doctors.id')
                   ->leftJoin('departments', 'appointments.department_id', '=', 'departments.id')
                   ->where('appointments.status', 1)
                   ->where('patients.status', 1)
                   ->orderby('appointments.created_at','desc')
                   ->skip($offset)->take($limit)
                   //->where('appointments.patient_id', $patient_id)
                   ->get();
               $count = DB::table('appointments')
                   ->select(DB::raw('appointments.id,appointments.patient_id,patients.first_name,patients.middle_name,patients.last_name,doctors.name as doctor,departments.name as department,appointments.reason,appointments.other_reasons,pick_date,appointment_status,start_time'))
                   ->leftJoin('patients', 'appointments.patient_id', '=', 'patients.id')
                   ->leftJoin('doctors', 'appointments.doctor_id', '=', 'doctors.id')
                   ->leftJoin('departments', 'appointments.department_id', '=', 'departments.id')
                   ->where('appointments.status', 1)
                   ->where('patients.status', 1)
                   ->orderby('appointments.created_at', 'desc')
                   ->count();
           }else{
               $appointments = DB::table('appointments')
                   ->select(DB::raw('appointments.id,appointments.patient_id,patients.first_name,patients.middle_name,patients.last_name,doctors.name as doctor,departments.name as department,appointments.reason,appointments.other_reasons,pick_date,appointment_status,start_time'))
                   ->leftJoin('patients', 'appointments.patient_id', '=', 'patients.id')
                   ->leftJoin('doctors', 'appointments.doctor_id', '=', 'doctors.id')
                   ->leftJoin('departments', 'appointments.department_id', '=', 'departments.id')
                   ->where('appointments.status', 1)
                   ->where('patients.status', 1)
                   ->orderby('appointments.created_at','desc')
                   ->get();
               $count = DB::table('appointments')
                     ->select(DB::raw('appointments.id,appointments.patient_id,patients.first_name,patients.middle_name,patients.last_name,doctors.name as doctor,departments.name as department,appointments.reason,appointments.other_reasons,pick_date,appointment_status,start_time'))
                     ->leftJoin('patients', 'appointments.patient_id', '=', 'patients.id')
                     ->leftJoin('doctors', 'appointments.doctor_id', '=', 'doctors.id')
                     ->leftJoin('departments', 'appointments.department_id', '=', 'departments.id')
                     ->where('appointments.status', 1)
                     ->where('patients.status', 1)
                     ->orderby('appointments.created_at', 'desc')
                     ->count();

           }

           foreach ($appointments as $appointment) {

               $appointment->patient_id = str_pad($appointment->patient_id, 7, '0', STR_PAD_LEFT);
               //  $appointment->appointment_status = '';
           }

           return response()->json(['status' => true, 'data' => $appointments,'count'=>$count]);
       }


    public function add_patient_appointments(Request $request)
    {
        $patient_id = $request->input('patient_id');

        $visit_id = $request->input('visit_id');

        $department_id = $request->input('department');

        $reason = $request->input('reason');

        $date = $request->input('date');

        $start_time = $request->input('start_time');

        $notes = $request->input('notes');

        $doctor = $request->input('doctor');

        $other_reason = $request->input('other_reason');

        $end_time = $request->input('end_time');

        $priority = $request->input('priority');

        $currentdatetime = date("Y-m-d  H:i:s");


        DB::table('appointments')->insert(
            ['patient_id' => $patient_id,
                'department_id' => $department_id,
                'reason' => $reason,
                'pick_date' => $date,
                'start_time' => $start_time,
                'notes' => $notes,
                'doctor_id' => $doctor,
                'other_reasons' => $other_reason,
               // 'end_time' => $end_time,
                'priority' => $priority,
                'appointment_status' => 'pending',
                'created_at' => $currentdatetime
            ]
        );


        return response()->json(['status' => true, 'message' => 'Appointment Created Successfully']);


    }


    public function update_patient_appointments(Request $request)
    {
        $appointment_id = $request->input('appointment_id');

        $patient_id = $request->input('patient_id');

        $department_id = $request->input('department');

        $reason = $request->input('reason');

        $date = $request->input('date');

        $start_time = $request->input('start_time');

        $notes = $request->input('notes');

        $doctor = $request->input('doctor');

        $other_reason = $request->input('other_reason');

        $end_time = $request->input('end_time');

        $priority = $request->input('priority');

        $currentdatetime = date("Y-m-d  H:i:s");


        DB::table('appointments')
            ->where('id', $appointment_id)
            ->update(
                ['patient_id' => $patient_id,
                    'department_id' => $department_id,
                    'reason' => $reason,
                    'pick_date' => $date,
                    'start_time' => $start_time,
                    'notes' => $notes,
                    'doctor_id' => $doctor,
                    'other_reasons' => $other_reason,
                   // 'end_time' => $end_time,
                    'priority' => $priority,
                    'updated_at' => $currentdatetime
                ]
            );


        return response()->json(['status' => true, 'message' => 'Appointment Updated Successfully']);


    }


    public function delete_patient_appointments(Request $request)
    {
        $appointment_id = $request->input('appointment_id');

        $currentdatetime = date("Y-m-d  H:i:s");


        DB::table('appointments')
            ->where('id', $appointment_id)
            ->update(
                ['status' => 0, 'updated_at' => $currentdatetime]
            );


        return response()->json(['status' => true, 'message' => 'Appointment Deleted Successfully']);


    }

    public function add_resources(Request $request)
    {
        $patient_id = $request->input('patient_id');

        $followup_parent_id = $request->input('followup_parent_id');

        $name = $request->input('name');

        $currentdatetime = date("Y-m-d  H:i:s");


        DB::table('resources')->insert(
            ['patient_id' => $patient_id,
                'name' => $name,
                'followup_parent_id' => $followup_parent_id,
                'type' => 'folder',
                'created_at' => $currentdatetime
            ]
        );


        return response()->json(['status' => true, 'message' => 'Folder Added Successfully']);


    }


    public function clinical_progress_note_templates(Request $request)
    {
        $category_id = $request->input('category_id');
        $template_type  = $request->input('template_type');

        $templates = DB::table('templates')
            ->leftJoin('template_categories', 'template_categories.id', '=', 'templates.category_id')
            ->leftJoin('template_types', 'template_types.id', '=', 'template_categories.template_type')
            ->select(DB::raw('templates.id,templates.name,templates.description,template_categories.name as category,templates.template'))
            ->where('templates.status', 1)
            ->where('template_categories.template_type', $template_type)
            ->where('templates.category_id', $category_id)
            ->get();

        return response()->json(['status' => true, 'data' => $templates]);

    }


    public function clinical_progress_note_fields(Request $request)
    {

        $template_id = $request->input('template_id');

        $fields = DB::table('clinical_note_questions')
            ->select(DB::raw('id,name,category'))
            ->where('template', $template_id)
            ->where('status', 1)
            ->get();


        return response()->json(['status' => true, 'data' => $fields]);

    }


    public function add_patient_clinical_notes(Request $request)
    {
        $patient_id = $request->input('patient_id');

        $visit_id = $request->input('visit_id');

        $template_id = $request->input('template_id');

        $value = $request->input('value');

        $diagnosis = $request->input('diagnosis');

        $currentdatetime = date("Y-m-d  H:i:s");

        $data = DB::table('patient_clinical_notes')
            ->select(DB::raw('*'))
            ->where('visit_id', $visit_id)
            ->first();

        if (!empty($data)) {
            return response()->json(['status' => false, 'message' => 'This Encounter already contains clinical information']);
        }

        DB::table('visits')
            ->where('id', $visit_id)
            ->update(['visit_status' => 'physician', 'updated_at' => date("Y-m-d  H:i:s")]);


        DB::table('patient_clinical_notes')->insert(
            ['patient_id' => $patient_id,
                'visit_id' => $visit_id,
                'template_id' => $template_id,
                'value' => $value,
                'diagnosis' => $diagnosis,
                'created_at' => $currentdatetime
            ]
        );

        $id = DB::getPdo()->lastInsertId();

        return response()->json(['status' => true,'message' => 'Clinical Notes Added Successfully']);
    }


    public function update_patient_clinical_notes(Request $request)
    {
        $clinical_notes_id = $request->input('clinical_notes_id');

        $patient_id = $request->input('patient_id');

        $visit_id = $request->input('visit_id');

        $template_id = $request->input('template_id');

        $value = $request->input('value');

        $diagnosis = $request->input('diagnosis');

        $currentdatetime = date("Y-m-d  H:i:s");

        DB::table('patient_clinical_notes')
            ->where('id',$clinical_notes_id)
            ->update(
            ['patient_id' => $patient_id,
                'visit_id' => $visit_id,
                'template_id' => $template_id,
                'value' => $value,
                'diagnosis' => $diagnosis,
                'updated_at' => $currentdatetime
            ]
        );

        return response()->json(['status' => true,'message' => 'Clinical Notes Updated Successfully']);
    }

    public function opt_add_clinical_notes_attachments(Request $request)
    {
        return response()->json(['status' => true, 'message' => 'success']);
    }

    public function add_clinical_notes_attachments(Request $request){

        $archive = $request->file('attachment');
        $destinationPath = base_path() . '/public/patient_archive';
        $original_name = $archive->getClientOriginalName();

        $extension = $archive->getClientOriginalExtension(); // getting image extension
        $fileName = rand() . time() . '.' . $extension; // renameing image
        if (!$archive->isValid()) {
            return response()->json(['status' => false, 'message' => 'Invalid File']);
        }

        $archive->move($destinationPath, $fileName);
        $patient_id = $request->input('patient_id');
        $currentdatetime = date("Y-m-d  H:i:s");

        DB::table('resources')->insert(
            ['patient_id' => $patient_id,
                'type' => 'file',
                'name' => $original_name,
                'followup_parent_id' => 0,
                'file' => $fileName,
                'file_name' => $original_name,
                'created_at' => $currentdatetime
            ]
        );

        return response()->json(['status' => true, 'message' => 'Attachments Uploaded']);

    }

    public function opt_add_referal_attachments(Request $request)
    {
        return response()->json(['status' => true, 'message' => 'success']);
    }


    public function add_lab_order_attachments(Request $request){

        $archive = $request->file('attachment');
        $destinationPath = base_path() . '/public/patient_archive';
        $original_name = $archive->getClientOriginalName();

        $extension = $archive->getClientOriginalExtension(); // getting image extension
        $fileName = rand() . time() . '.' . $extension; // renameing image
        if (!$archive->isValid()) {
            return response()->json(['status' => false, 'message' => 'Invalid File']);
        }

        $archive->move($destinationPath, $fileName);
        $patient_id = $request->input('patient_id');
        $currentdatetime = date("Y-m-d  H:i:s");

        DB::table('resources')->insert(
            ['patient_id' => $patient_id,
                'type' => 'file',
                'name' => $original_name,
                'followup_parent_id' => 0,
                'file' => $fileName,
                'file_name' => $original_name,
                'created_at' => $currentdatetime
            ]
        );

        return response()->json(['status' => true, 'message' => 'Attachments Uploaded']);

    }

    public function opt_add_lab_order_attachments(Request $request)
    {
        return response()->json(['status' => true, 'message' => 'success']);
    }


    public function add_referal_attachments(Request $request)
    {
        $archive = $request->file('attachment');
        $destinationPath = base_path() . '/public/refered_patient_files';
        $original_name = $archive->getClientOriginalName();

        $extension = $archive->getClientOriginalExtension(); // getting image extension
        $fileName = rand() . time() . '.' . $extension; // renameing image
        if (!$archive->isValid()) {
            return response()->json(['status' => false, 'message' => 'Invalid File']);
        }

        $archive->move($destinationPath, $fileName);
        $patient_id = $request->input('patient_id');
        $visit_id = $request->input('visit_id');
        $currentdatetime = date("Y-m-d  H:i:s");

        DB::table('patient_referels')
            ->where('patient_id', $patient_id)
            ->where('visit_id', $visit_id)
            ->update(['attachment'=> $fileName] );

        return response()->json(['status' => true, 'message' => 'Attachments Uploaded']);

    }

    public function checkout_patient(Request $request)
    {
        $patient_id = $request->input('patient_id');

        $visit_id = $request->input('visit_id');

        $reason = $request->input('reason');

        $notes = $request->input('notes');

        $currentdatetime = date("Y-m-d  H:i:s");


        DB::table('visits')
            ->where('id', $visit_id)
            ->update(
                ['visit_status' => 'checkout',
                    'updated_at' => $currentdatetime
                ]
            );

        DB::table('patient_checkout')->insert(
            ['visit_id' => $visit_id,
                'reason' => $reason,
                'notes' => $notes,
                'created_at' => $currentdatetime
            ]
        );

        $checkout = DB::getPdo()->lastInsertId();


        if ($reason == 'Follow up') {

            $pick_date = $request->input('pick_date');
            $pick_time = $request->input('pick_time');

            DB::table('patient_followup')->insert(
                ['checkout_id' => $checkout,
                    'patient_id' => $patient_id,
                    'pick_date' => $pick_date,
                    'pick_time' => $pick_time,
                    'created_at' => $currentdatetime
                ]
            );
        }

        if ($reason == 'admitPatient') {

            $admit_date = $request->input('admit_date');
            $start_time = $request->input('start_time');
            $department_id = $request->input('department_id');
            $ward_id = $request->input('ward_id');
            $bed_id = $request->input('bed_id');


            DB::table('patients_admitted')->insert(
                ['checkout_id' => $checkout,
                    'patient_id' => $patient_id,
                    'department_id' => $department_id,
                    'ward_id' => $ward_id,
                    'admit_date' => $admit_date,
                    'start_time' => $start_time,
                    'created_at' => $currentdatetime
                ]
            );


            $bed_number = DB::table('wards')
                ->select(DB::raw('available_beds,number_of_beds_occupied'))
                ->where('wards.status', 1)
                ->where('wards.id', $ward_id)
                ->first();

            $available_beds = $bed_number->available_beds - 1;
            $beds_occupied = $bed_number->number_of_beds_occupied + 1;

            DB::table('wards')
                ->where('id', $ward_id)
                ->update(
                    ['available_beds' => $available_beds, 'number_of_beds_occupied' => $beds_occupied, 'updated_at' => date("Y-m-d  H:i:s")]
                );

            DB::table('beds')
                ->where('id', $bed_id)
                ->update(
                    ['bed_status' => 'occupied', 'patient_id' => $patient_id, 'ward_id' => $ward_id, 'updated_at' => date("Y-m-d  H:i:s")]
                );


        }


        return response()->json(['status' => true, 'message' => "Patient Checkout Successfully"]);


    }


    public function add_patient_referel(Request $request)
    {
        $patient_id = $request->input('patient_id');

        $visit_id = $request->input('visit_id');

       // $department_id = $request->input('department_id');

        $doctor_id = $request->input('doctor_id');

        $provisional_diagnosis = $request->input('provisional_diagnosis');

        $reason_referal = $request->input('reason_referal');

        $history = $request->input('history');

        $investigations = $request->input('investigations');

        $referal_type = $request->input('referal_type');

        $allergies = $request->input('allergies');

        $medication_list = $request->input('medication_list');

        $medicines = $request->input('medicines');

        $currentdatetime = date("Y-m-d  H:i:s");

        DB::table('visits')
            ->where('id', $visit_id)
            ->update(
                ['visit_status' => 'checkout',
                    'updated_at' => $currentdatetime
                ]
            );

 /*       if ($request->file('refered_file')) {
            if ($request->file('refered_file')->isValid()) {
                $destinationPath = base_path() . '/public/refered_patient_files'; // upload path
                $extension = $request->file('refered_file')->getClientOriginalExtension(); // getting image extension
                $fileName = time() . '.' . $extension; // renameing image

                $request->file('refered_file')->move($destinationPath, $fileName); // uploading file to given path
            } else {
                $fileName = '';
            }

        } else {
            $fileName = '';
        }*/

        if($referal_type == 'internal'){
            $external_referal_email = '';
        }else{
            $external_referal_email = $request->input('external_referal_email');
        }

        DB::table('patient_referels')->insert(
            [   'referal_type'=>$referal_type,
                'patient_id' => $patient_id,
                'visit_id' => $visit_id,
                'doctor' => $doctor_id,
                'provisional_diagnosis' => $provisional_diagnosis,
                'reason_referal' => $reason_referal,
                'history' => $history,
                'investigations' => $investigations,
                'external_referal_email' => $external_referal_email,
                'created_at' => $currentdatetime
            ]
        );

        return response()->json(['status' => true, 'message' => "Patient Referel Added Successfully"]);
    }

    public function add_manufacturer(Request $request)
    {
        $name = $request->input('manufacturer_name');

        $id = DB::table('manufacturers')->insertGetId([
            'name' => $name
        ]);
        return response()->json(['status' => true, 'message' => "Patient Referel Added Successfully", 'manufacturers_id' => $id]);
    }


    public function get_frequency(Request $request)
    {
        $frequency = DB::table('frequency')
            ->select(DB::raw('id,name'))
            ->where('status', 1)
            ->get();

        return response()->json(['status' => true, 'data' => $frequency]);

    }

    public function get_intake(Request $request)
    {
        $intake = DB::table('intake')
            ->select(DB::raw('id,name'))
            ->where('status', 1)
            ->get();

        return response()->json(['status' => true, 'data' => $intake]);

    }


    public function get_templates(Request $request)
    {
        $category_id = $request->input('category_id');
        $template_type  = $request->input('template_type');

        $templates = DB::table('templates')
            ->leftJoin('template_categories', 'template_categories.id', '=', 'templates.category_id')
            ->leftJoin('template_types', 'template_types.id', '=', 'template_categories.template_type')
            ->select(DB::raw('templates.id,templates.name,templates.description,template_categories.name as category,templates.template'))
            ->where('templates.status', 1)
            ->where('template_categories.template_type', $template_type)
             ->where('templates.category_id', $category_id)
            ->get();

        return response()->json(['status' => true, 'data' => $templates]);

    }


    public function delete_template(Request $request)
    {
        $template_id = $request->input('template_id');

        $currentdatetime = date("Y-m-d  H:i:s");


        $templates = DB::table('patient_lab_test_values')
            ->select(DB::raw('id'))
            ->where('template_id', $template_id)
            ->get();

        if (count($templates) > 0) {

            return response()->json(['status' => false, 'message' => 'This Template is used by various Orders']);

        }

        DB::table('templates')
            ->where('id', $template_id)
            ->update(
                ['status' => 0,
                    'updated_at' => $currentdatetime
                ]
            );
        return response()->json(['status' => true, 'message' => 'Template Deleted Successfully']);

    }

    public function add_template(Request $request)
    {
        $name = $request->input('name');
        $category_id = $request->input('category_id');
        $description = $request->input('description');
        $template = $request->input('template');

        $currentdatetime = date("Y-m-d  H:i:s");

        DB::table('templates')
            ->insert(
                ['name' => $name,
                    'category_id' => $category_id,
                    'description' => $description,
                    'template' => $template,
                    'created_at' => $currentdatetime
                ]
            );
        return response()->json(['status' => true, 'message' => 'Template Added Successfully']);

    }


    public function edit_template(Request $request)
    {
        $template_id = $request->input('template_id');
        $name = $request->input('name');
        $category_id = $request->input('category_id');
        $description = $request->input('description');
        $template = $request->input('template');

        $currentdatetime = date("Y-m-d  H:i:s");

        DB::table('templates')
            ->where('id',$template_id)
            ->update(
                ['name' => $name,
                    'category_id' => $category_id,
                    'description' => $description,
                    'template' => $template,
                    'updated_at' => $currentdatetime
                ]
            );
        return response()->json(['status' => true, 'message' => 'Template Updated Successfully Successfully']);

    }


    public function get_templates_categories(Request $request)
    {
        $template_type = $request->input('template_type');

        $categories = DB::table('template_categories')
            ->select(DB::raw('id,name,description'))
            ->where('template_type',1)
            ->where('status', 1)
            ->get();

        return response()->json(['status' => true, 'data' => $categories]);

    }


    public function get_template_category(Request $request)
     {
         $id = $request->input('cat_id');
         $category = DB::table('template_categories')
             ->select(DB::raw('id,name,description'))
             ->where('template_categories.id', $id)
             ->where('template_categories.status', 1)
             ->first();

         return response()->json(['status' => true, 'data' => $category]);
     }

    public function update_template_category(Request $request)
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



    public function get_template(Request $request){

        $template_id= $request->input('template_id');

        $template = DB::table('templates')
            ->leftJoin('template_categories','templates.category_id', '=', 'template_categories.id')
            ->select(DB::raw('templates.id,templates.name,template_categories.name as category,templates.category_id,templates.description,templates.template'))
            ->where('templates.id',$template_id)
            ->where('templates.status', 1)
            ->first();

        return response()->json(['status' => true, 'data' => $template]);

    }


    public function delete_template_category(Request $request)
    {
        $category_id = $request->input('category_id');

        $currentdatetime = date("Y-m-d  H:i:s");

        $templates = DB::table('templates')
            ->select(DB::raw('id'))
            ->where('category_id', $category_id)
            ->get();

        if (count($templates) > 0) {
            return response()->json(['status' => false, 'message' => 'This Category is used by various templates']);
        }

        DB::table('template_categories')
            ->where('id', $category_id)
            ->update(
                ['status' => 0, 'updated_at' => $currentdatetime]
            );
        return response()->json(['status' => true, 'message' => 'Category Deleted Successfully']);

    }


    public function add_template_category(Request $request)
    {
        $name = $request->input('name');
        $description = $request->input('description');
        $template_type = $request->input('template_type');

        $currentdatetime = date("Y-m-d  H:i:s");

        DB::table('template_categories')
            ->insert(
                ['template_type'=> $template_type,
                    'name' => $name,
                    'description' => $description,
                    'created_at' => $currentdatetime
                ]
            );
        return response()->json(['status' => true, 'message' => 'Category Added Successfully']);
    }


    public function get_patient_plan(Request $request)
    {

        $patient_id = $request->input('patient_id');

        $patient_plan = DB::table('hospital_plan')
            ->leftJoin('plan_details', 'plan_details.plan_id', '=', 'hospital_plan.id')
            ->leftJoin('patients', 'patients.hospital_plan', '=', 'hospital_plan.id')
            ->select(DB::raw('hospital_plan.name,plan_details.is_principal,plan_details.is_dependant'))
            ->where('patients.status', 1)
            ->where('patients.id', $patient_id)
            ->get();

        return response()->json(['status' => true, 'data' => $patient_plan]);


    }

    public function add_patient_prescription(Request $request)
    {
        $patient_id = $request->input('patient_id');

        $visit_id = $request->input('visit_id');

        $prescription = html_entity_decode($request->input('prescription'));

        $patient_prescriptions = json_decode($prescription);

        $note_for_pharmacy = $request->input('note_for_pharmacy');

        $currentdatetime = date("Y-m-d  H:i:s");


        $count = DB::table('patient_prescription')
                  ->select(DB::raw('*'))
                  ->where('visit_id', $visit_id)
                  ->count();

        if($count>0){
            return response()->json(['status' => false, 'message' => 'Prescrpition with this encounter already added']);
        }

        DB::table('patient_prescription')
            ->insert(
                ['visit_id' => $visit_id,
                    'patient_id' => $patient_id,
                    'prescription_status' => 'in progress',
                    'created_at' => $currentdatetime
                ]
            );


        $prescription_id = DB::getPdo()->lastInsertId();

        DB::table('visits')
            ->where('id', $visit_id)
            ->update(['visit_status' => 'physician', 'updated_at' => date("Y-m-d  H:i:s")]);


        foreach ($patient_prescriptions as $patient_prescription) {

            DB::table('patient_prescription_medicine')
                ->insert(
                    ['prescription_id' => $prescription_id,
                        'medication' => $patient_prescription->medication,
                        'supplements' => 1,
                        'sig' => $patient_prescription->sig,
                        'dispense' => $patient_prescription->dispense,
                        'reffills' => $patient_prescription->reffills,
                        'pharmacy' => $patient_prescription->pharmacy,
                        'created_at' => $currentdatetime
                    ]
                );

        }

        DB::table('prescription_notes')
            ->insert(
                ['prescription_id' => $prescription_id,
                    'note_for_pharmacy' => $note_for_pharmacy,
                    'created_at' => $currentdatetime
                ]
            );


        $bill = DB::table('billing')
            ->select(DB::raw('id'))
            ->where('encounter_id',$visit_id)
            ->where('status', 1)
            ->first();

        if (!empty($bill)) {

            $bill_id = $bill->id;

            DB::table('invoice')
                ->insert(
                    ['patient_id'=>$patient_id,
                        'bill_id'=>$bill_id,
                        'description'=>'This invoice is generated for patient prescription',
                        'amount'=> 50,
                        'due'=> 50,
                        'invoice_status'=>'pending',
                        'created_at' =>$currentdatetime
                    ]
                );

        }

        return response()->json(['status' => true, 'message' => 'Prescrpition Added Successfully']);


    }

    public function update_patient_prescription(Request $request)
    {

        $prescribe_medication_id = $request->input('prescribe_medication_id');
        $prescription_id = $request->input('precription_id');
        $note_for_pharmacy = $request->input('note_for_pharmacy');

        $prescription = html_entity_decode($request->input('prescription'));

        $patient_prescriptions = json_decode($prescription);
        $currentdatetime = date("Y-m-d  H:i:s");

    /*    $pharmacy = DB::table('patient_prescription_medicine')
            ->select('pharmacy')
            ->where('prescription_id',$prescription_id)->first();

        $pharmacy = $pharmacy->pharmacy;*/

        DB::table('patient_prescription_medicine')->where('prescription_id', $prescription_id)->delete();

        foreach ($patient_prescriptions as $patient_prescription) {

            DB::table('patient_prescription_medicine')
                ->insert(
                    ['prescription_id' => $prescription_id,
                        'medication' => $patient_prescription->medication,
                        'sig' => $patient_prescription->sig,
                        'dispense' => $patient_prescription->dispense,
                        'total_dispense' => $patient_prescription->total_dispense,
                        'reffills' => $patient_prescription->reffills,
                        'pharmacy' => $patient_prescription->pharmacy_id,
                        'amount' => $patient_prescription->amount,
                        'created_at' => $currentdatetime
                    ]
                );

        }

        DB::table('prescription_notes')->where('prescription_id','=', $prescription_id)->delete();

        DB::table('prescription_notes')
            ->insert(
                ['prescription_id' => $prescription_id,
                    'note_for_pharmacy' => $note_for_pharmacy,
                    'created_at' => $currentdatetime
                ]
            );

        return response()->json(['status' => true, 'message' => 'Prescrpition Updated Successfully']);


    }


    public function add_prescription_medication(Request $request)
    {
        $prescription_id = $request->input('prescription_id');
        $prescription = html_entity_decode($request->input('prescription'));
        $patient_prescriptions = json_decode($prescription);
        $currentdatetime = date("Y-m-d  H:i:s");


        foreach ($patient_prescriptions as $patient_prescription) {

            DB::table('patient_prescription_medicine')
                ->insert(
                    ['prescription_id' => $prescription_id,
                        'medication' => $patient_prescription->medication,
                        'sig' => $patient_prescription->sig,
                        'dispense' => $patient_prescription->dispense,
                        'reffills' => $patient_prescription->reffills,
                        'pharmacy' => $patient_prescription->pharmacy,
                        'created_at' => $currentdatetime
                    ]
                );

        }

        return response()->json(['status' => true, 'message' => 'Prescrpition Added Successfully']);

    }

    public function get_all_prescription(Request $request)
    {
        $patient_id = $request->input('patient_id');

        $prescriptions = DB::table('patient_prescription')
            ->leftJoin('patient_prescription_medicine', 'patient_prescription_medicine.prescription_id', '=', 'patient_prescription.id')
            ->select(DB::raw('patient_prescription.id,patient_prescription.patient_id,patient_prescription_medicine.medication,patient_prescription_medicine.sig,patient_prescription_medicine.dispense,patient_prescription_medicine.reffills,patient_prescription_medicine.pharmacy,patient_prescription.created_at,patient_prescription.total_amount as cost,patient_prescription.due'))
            ->where('patient_prescription.status', 1)
            ->where('patient_prescription.patient_id', $patient_id)
            ->get();


        $prescription_notes = DB::table('patient_prescription')
            ->leftJoin('prescription_notes', 'prescription_notes.prescription_id', '=', 'patient_prescription.id')
            ->select(DB::raw('note_for_pharmacy'))
            ->where('patient_prescription.status', 1)
            ->where('patient_prescription.patient_id', $patient_id)
            ->first();

        return response()->json(['status' => true, 'data' => $prescriptions, 'notes' => $prescription_notes->note_for_pharmacy]);


    }


    public function get_prescription_list(Request $request)
    {
        $limit = $request->input('limit');
        $offset = $request->input('offset');
        $pharmacy_id = $request->input('pharmacy_id');

        $prescriptions = DB::table('patient_prescription')
            ->leftJoin('patient_prescription_medicine', 'patient_prescription.id', '=', 'patient_prescription_medicine.prescription_id')
            ->leftJoin('patients', 'patients.id', '=', 'patient_prescription.patient_id')
            ->leftJoin('hospital_plan', 'hospital_plan.id', '=', 'patients.hospital_plan')
            ->select(DB::raw('patient_prescription.id,patient_prescription.patient_id,patients.first_name,patients.last_name,patient_prescription.visit_id,hospital_plan.name as patient_plan,patient_prescription.total_amount,patient_prescription.paid,patient_prescription.prescription_status'))
            ->where('patient_prescription.status', 1)
            ->where('patient_prescription_medicine.pharmacy', $pharmacy_id)
            ->skip($offset)->take($limit)
            ->get();


        $count = DB::table('patient_prescription')
            ->leftJoin('patient_prescription_medicine', 'patient_prescription.id', '=', 'patient_prescription_medicine.prescription_id')
            ->leftJoin('patients', 'patients.id', '=', 'patient_prescription.patient_id')
            ->leftJoin('hospital_plan', 'hospital_plan.id', '=', 'patients.hospital_plan')
            ->select(DB::raw('patient_prescription.id,patient_prescription.patient_id,patients.first_name,patients.last_name,patient_prescription.visit_id,hospital_plan.name as patient_plan,patient_prescription.total_amount,patient_prescription.paid,patient_prescription.prescription_status'))
            ->where('patient_prescription.status', 1)
            ->where('patient_prescription_medicine.pharmacy', $pharmacy_id)
            ->count();


        if ($offset == 0 && $limit == 0) {

            $prescriptions = DB::table('patient_prescription')
                ->leftJoin('patient_prescription_medicine', 'patient_prescription.id', '=', 'patient_prescription_medicine.prescription_id')
                ->leftJoin('patients', 'patients.id', '=', 'patient_prescription.patient_id')
                ->leftJoin('hospital_plan', 'hospital_plan.id', '=', 'patients.hospital_plan')
                ->select(DB::raw('patient_prescription.id,patient_prescription.patient_id,patients.first_name,patients.last_name,patient_prescription.visit_id,hospital_plan.name as patient_plan,patient_prescription.total_amount,patient_prescription.paid,patient_prescription.prescription_status'))
                ->where('patient_prescription.status', 1)
                ->where('patient_prescription_medicine.pharmacy', $pharmacy_id)
                ->skip($offset)->take($limit)
                ->get();

            $count = count($prescriptions);

        }

        foreach ($prescriptions as $prescription) {
            $prescription->visit_id = str_pad($prescription->visit_id, 8, '0', STR_PAD_LEFT);
            $prescription->patient_id = str_pad($prescription->patient_id, 7, '0', STR_PAD_LEFT);

            $pharmacy  = DB::table('pharmacy')
                       ->select(DB::raw('id,name'))
                       ->where('id', $pharmacy_id)
                       //->where('status', 1)
                       ->first();

             $prescription->pharmacy = $pharmacy->name;

        }

        return response()->json(['status' => true, 'data' => $prescriptions, 'count' => $count]);

    }


    public function get_prescription(Request $request)
    {
        $prescription_id = $request->input('precription_id');
        $prescriptions = DB::table('patient_prescription')
            ->leftJoin('patient_prescription_medicine', 'patient_prescription_medicine.prescription_id', '=', 'patient_prescription.id')
            ->select(DB::raw('*,patient_prescription_medicine.id as prescribe_medication_id,medication_status,patient_prescription_medicine.medication as medication_id,patient_prescription_medicine.amount'))
            ->where('patient_prescription.id', $prescription_id)
            ->where('patient_prescription.status', 1)
            ->where('patient_prescription_medicine.status', 1)
            ->get();

        foreach ($prescriptions as $prescription) {

            $medication  = DB::table('inventory_products')
                ->select(DB::raw('id,name'))
                ->where('id', $prescription->medication)
                ->where('status', 1)
                ->first();

            $prescription->medication = $medication->name;

            $pharmacy  = DB::table('pharmacy')
                      ->select(DB::raw('id,name'))
                      ->where('id', $prescription->pharmacy)
                     // ->where('status', 1)
                      ->first();

            $prescription->pharmacy = $pharmacy->name;
            $prescription->pharmacy_id = $pharmacy->id;

        }


        $prescription_notes = DB::table('prescription_notes')
            ->select(DB::raw('note_for_pharmacy'))
            ->where('prescription_notes.status', 1)
            ->where('prescription_notes.prescription_id', $prescription_id)
            ->first();

        $notes = $prescription_notes->note_for_pharmacy;

        $prescription_data = DB::table('patient_prescription')
            ->leftJoin('visits', 'patient_prescription.visit_id', '=', 'visits.id')
            ->leftJoin('doctors', 'doctors.id', '=', 'visits.whom_to_see')
            ->select(DB::raw('patient_prescription.created_at as date,patient_prescription.visit_id,doctors.name as Provider'))
            ->where('patient_prescription.status', 1)
            ->where('patient_prescription.id', $prescription_id)
            ->first();



        return response()->json(['status' => true, 'data' => $prescriptions, 'notes' => $notes, 'prescription_data' => $prescription_data,'pharmacy_name'=>$prescriptions[0]->pharmacy,'pharmacy_id'=>$prescriptions[0]->pharmacy_id]);


    }

    public function dispense_medication(Request $request)
    {
        $prescribe_medication_id = $request->input('prescribe_medication_id');

        DB::table('patient_prescription_medicine')
            ->where('id', $prescribe_medication_id)
            ->update(
                ['medication_status' => 'dispensed', 'updated_at' => date("Y-m-d  H:i:s")]
            );


        return response()->json(['status' => true, 'message' => 'Medication Dispensed Successfully']);


    }

    public function query_medication(Request $request)
       {
           $prescribe_medication_id = $request->input('prescribe_medication_id');

           DB::table('patient_prescription_medicine')
               ->where('id', $prescribe_medication_id)
               ->update(
                   ['medication_status' => 'query', 'updated_at' => date("Y-m-d  H:i:s")]
               );


           return response()->json(['status' => true, 'message' => 'Medication Quried Successfully']);


       }


    public function update_prescription(Request $request)
    {
        $prescribe_medication_id = $request->input('prescribe_medication_id');
        $prescription_id = $request->input('precription_id');
        $medication = $request->input('medication');
        $sig = $request->input('sig');
        $dispense = $request->input('dispense');
        $reffills = $request->input('reffills');
        $pharmacy = $request->input('pharmacy');
        $note_of_pharmacy = $request->input('note_of_pharmacy');
        $currentdatetime = date("Y-m-d  H:i:s");


        DB::table('patient_prescription')
            ->where('id', $prescribe_medication_id)
            ->update(
                ['medication' => $medication,
                    'sig' => $sig,
                    'dispense' => $dispense,
                    'reffills' => $reffills,
                    'pharmacy' => $pharmacy,
                    'updated_at' => $currentdatetime
                ]
            );


        return response()->json(['status' => true, 'message' => 'Prescrpition Updated Successfully']);

    }


    public function get_patient_medications(Request $request)
    {
        $patient_id = $request->input('patient_id');
        $medicines = DB::table('medicines')
            ->select(DB::raw('id,supplements'))
            ->where('status', 1)
            ->where('patient_id', $patient_id)
            ->get();

        return response()->json(['status' => true, 'data' => $medicines]);
    }

    public function check_clinical_notes_status(Request $request)
    {
        $patient_id = $request->input('patient_id');
        $visit_id = $request->input('visit_id');

        $status = DB::table('patient_clinical_notes')
            ->select(DB::raw('id,signoff,value,template_id'))
            ->where('patient_id', $patient_id)
            ->where('visit_id', $visit_id)
            ->first();

        if(empty($status)){
            $signoff = 0;
            return response()->json(['status' => true, 'signoff' => $signoff,'data'=>array()]);
        }
        $signoff = $status->signoff;

        $arr = array();
        $data = DB::table('patient_clinical_notes')
            ->leftJoin('templates', 'templates.id', '=', 'patient_clinical_notes.template_id')
            ->select('patient_clinical_notes.value', 'templates.template','templates.name','templates.category_id','patient_clinical_notes.template_id','patient_clinical_notes.diagnosis')
            ->where('patient_clinical_notes.id', $status->id)->first();


        $template_values = json_decode($data->value);

        $template = json_decode($data->template);



        if (empty((array) $template_values)) {

            foreach ($template->fields as $temp) {
                /*      foreach ($template_values as $k => $v){
                          if($temp->name != $k){
                              array_push($arr,[$temp->name]);
                          }
                      }*/

                $arr[$temp->name] = '';
                //array_push($arr,$temp->name);

            }

            $template_values = json_encode($arr);

            DB::table('patient_clinical_notes')
                     ->where('id',  $status->id)
                     ->update(['value' => $template_values, 'updated_at' => date("Y-m-d  H:i:s")]);

        } else {

            foreach ($template->fields as $temp) {


             //   echo '<pre>';print_r($temp);echo '</pre>';

                foreach ($template_values as $k => $v) {

                   if (ltrim(rtrim($temp->name)) == ltrim(rtrim($k))) {
                       $arr[$temp->name] = "$v";
                       break;
                    }
                    else{
                        $arr[$temp->name] = '';
                       //echo 'WAITING HERE';
                        //break;
                    }
                }

            }

            $template_values = json_encode($arr);

            DB::table('patient_clinical_notes')
                ->where('id', $status->id)
                ->update(['value' => $template_values, 'updated_at' => date("Y-m-d  H:i:s")]);


        }

        $clinical_notes_new_data = DB::table('patient_clinical_notes')
            ->select('value')
            ->where('id', $status->id)->first();

        return response()->json(['status' => true, 'signoff' => $signoff,'data'=>$clinical_notes_new_data->value,'template'=>$data->template,'clinical_notes_id'=>$status->id,'template_name'=>$data->name,'template_id'=>$data->template_id,'category_id'=>$data->category_id,'doctor'=> 'DR James','test_by'=>'alex','date_of_service'=>'10th May','diagnosis'=>$data->diagnosis]);
    }



    public function get_prescription_medicines(Request $request){
        $data = DB::table('inventory_products')
            ->select(DB::raw('id,name'))
            ->where('group','Drugs')
            ->get();
        return response()->json(['status' => true, 'data' => $data]);
    }
    public function get_prescription_supplements(Request $request){
        $data = DB::table('inventory_products')
            ->select(DB::raw('id,name'))
            ->where('status', 1)
            ->where('group','Supplements')
            ->get();
        return response()->json(['status' => true, 'data' => $data]);
    }

    public function get_inventory_categories(Request $request)
    {
        $data = DB::table('inventory_categories')
            ->select('*')
            ->where('cat_group', '=', 'Others')
            ->orWhere('cat_group', '=', 'Documents')
            ->get();
        return response()->json(['status' => true, 'data' => $data]);
    }
}

