<?php

namespace App\Http\Controllers;

use Illuminate\Http\Exception\HttpResponseException;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Http\Response as IlluminateResponse;

use DB;


class ApiController extends Controller
{


    public function __construct()
    {

        header('Access-Control-Allow-Origin: *');


    }


    protected function checkToken($token, $user_id)
    {

        $user_from_token = JWTAuth::authenticate($token)->id;
        if ($user_id != $user_from_token) {

            return false;
        }
        return true;
    }



    public function register_patient(Request $request)
    {

        $first_name = $request->input('first_name');

        $middle_name = $request->input('middle_name');

        $last_name = $request->input('last_name');

        $date_of_birth = $request->input('date_of_birth');

        $age = $request->input('age');

        $sex = $request->input('sex');

        $martial_status = $request->input('martial_status');

        $religion = $request->input('religion');

        $father_firstname = $request->input('father_firstname');

        $father_middlename = $request->input('father_middlename');

        $father_lastname = $request->input('father_lastname');

        $mother_firstname = $request->input('mother_firstname');

        $mother_middlename = $request->input('mother_middlename');

        $mother_lastname = $request->input('mother_lastname');

        $refered_name = $request->input('refered_name');

        $refered_email = $request->input('refered_email');

        $refered_phone = $request->input('refered_phone');

        $patient_unit_number = $request->input('patient_unit_number');

        $identity_type = $request->input('identity_type');

        $identity_number = $request->input('identity_number');

        $patient_state = $request->input('patient_state');

        $patient_local_goverment_area = $request->input('patient_local_goverment_area');

        $tribe = $request->input('tribe');

        $nationality = $request->input('nationality');

        $blood_group = $request->input('blood_group');

        $hospital_plan= $request->input('hospital_plan');

        $occupation= $request->input('occupation');



        DB::table('patient_profile')->insert(
            ['patient_id' => $patient_id,
                'first_name' => $first_name,
                'middle_name' => $middle_name,
                'last_name' => $last_name,
                'date_of_birth' => $date_of_birth,
                'age' => $age,
                'sex' => $sex,
                'martial_status' => $martial_status,
                'religion' => $religion,
                'father_firstname' => $father_firstname,
                'father_middlename' => $father_middlename,
                'father_lastname' => $father_lastname,
                'mother_firstname' => $mother_firstname,
                'mother_middlename' => $mother_middlename,
                'mother_lastname' => $mother_lastname,
                'refered_name' => $refered_name,
                'refered_email' => $refered_email,
                'refered_phone' => $refered_phone,
                'patient_unit_number' => $patient_unit_number,
                'identity_type' => $identity_type,
                'identity_number' => $identity_number,
                'state' => $patient_state,
                'local_goverment_area' => $patient_local_goverment_area,
                'tribe' => $tribe,
                'language' => $patient_unit_number,
                'nationality' => $nationality,
                'blood_group' => $blood_group,
                'hospital_plan' => $hospital_plan,
                'occcupation' => $occupation,
                'created_at' => $currentdatetime

            ]
        );


        $patient_id = DB::getPdo()->lastInsertId();


        $address_type = $request->input('address_type');

        $phone_number = $request->input('phone_number');

        $mobile_number = $request->input('mobile_number');

        $house_number = $request->input('house_number');

        $street = $request->input('street');

        $city = $request->input('city');

        $state = $request->input('state');

        $country = $request->input('country');

        $local_goverment_area = $request->input('local_goverment_area');

        $postal_code = $request->input('postal_code');


        DB::table('patient_address')->insert(
            ['patient_id' => $patient_id,
                'address_type' => $address_type,
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



        $employer_name = $request->input('employer_name');

        $employer_phone_number = $request->input('employer_phone_number');

        $employer_mobile_number= $request->input('employer_mobile_number');

        $employer_email = $request->input('employer_email');

        $employer_house_number= $request->input('employer_house_number');

        $employer_street= $request->input('employer_street');

        $employer_city= $request->input('employer_city');

        $employer_state= $request->input('employer_state');

        $employer_country= $request->input('employer_country');

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



        $patient_plan_id = $request->input('patient_plan_id');

        $hmo= $request->input('hmo');

        $policies= $request->input('policies');

        $insurance_id = $request->input('insurance_id');

        $principal= $request->input('principal');

        $depandent = $request->input('depandent');

        $principal_id= $request->input('principal_id');

        $depandent_id = $request->input('depandent_id');

        $principal_relationship = $request->input('principal_relationship');

        $dependant_relationship = $request->input('dependant_relationship');

        $description = $request->input('description');


        DB::table('patient_plan')->insert(
            ['patient_id' => $patient_id,
                'patient_plan_id' => $patient_plan_id,
                'hmo' => $hmo,
                'policies' => $policies,
                'insurance_id' => $insurance_id,
                'principal' => $principal,
                'depandent' => $depandent,
                'principal_id' => $principal_id,
                'depandent_id' => $depandent_id,
                'principal_relationship' => $principal_relationship,
                'dependant_relationship' => $dependant_relationship,
                'description' => $description,
                'created_at' => $currentdatetime

            ]
        );





        return response()->json(['status' => true, 'message' => 'Patient Registered Successfully']);


    }

    public function register_user(Request $request)
    {


        $username = $request->input('name');

        $email = $request->input('email');

        $password = $request->input('password');

        $password_user = md5($password);

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
                'email' => $email,
                'password' => $password_user,
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

    public function user_login(Request $request)
    {


        $email_address = $request->input('email');

        $password = $request->input('password');

        $password_user = md5($password);

        $user = DB::table('users')
            ->select(DB::raw('id as source_id,email,name,role_id'))
            ->where('email', $email_address)
            ->where('password', $password_user)
            ->get();

        if (count($user) == 1) {

            $users = DB::table('users')
                ->select(DB::raw('id'))
                ->where('email', $email_address)
                ->where('password', $password_user)
                ->get();

            $token = JWTAuth::fromUser($users[0]);

            return response()->json(['status' => true, 'data' => $user[0], 'token' => $token]);

        } else {

            return response()->json(['status' => false, 'message' => 'invalid user']);

        }


    }

    public function add_visit(Request $request){


        $user_id = $request->input('source_id');

        $patient_id = $request->input('patient_id');

        $department_id= $request->input('department_id');

        $encounter_class = $request->input('encounter_class');

        $encounter_type = $request->input('encounter_type');

        $whom_to_see = $request->input('whom_to_see');

        $decscribe_whom_to_see = $request->input('decscribe_whom_to_see');

        $token = $request->input('token');


        $currentdatetime = date("Y-m-d  H:i:s");


        DB::table('visits')->insert(
            ['patient_id' => $patient_id,
                'department_id' => $department_id,
                'encounter_class' => $encounter_class,
                'encounter_type' => $encounter_type,
                'whom_to_see' => $whom_to_see,
                'decscribe_whom_to_see' => $decscribe_whom_to_see,
                'created_at' => $currentdatetime

            ]
        );



        return response()->json(['status' => true, 'message'=>'Visit added successfully']);

    }


    public function get_countries(){


        $countries = DB::table('countries')
            ->select(DB::raw('id,name'))
            ->get();

        return response()->json(['status' => true, 'data'=>$countries]);

    }



    public function get_states(Request $request){


        $country_id = $request->input('country_id');

        $states = DB::table('states')
            ->select(DB::raw('id,name'))
            ->where('country_id',$country_id)
            ->get();

        return response()->json(['status' => true, 'data'=>$states]);

    }


    public function get_cities(Request $request){


        $state_id = $request->input('state_id');

        $cities = DB::table('cities')
            ->select(DB::raw('id,name'))
            ->where('state_id',$state_id)
            ->get();

        return response()->json(['status' => true, 'data'=>$cities]);

    }

    public function get_local_goverment_area(Request $request){


        $state_id = $request->input('state_id');

        $local_goverment_area = DB::table('local_goverment_area')
              ->select(DB::raw('id,name'))
              ->where('state_id',$state_id)
              ->get();

          return response()->json(['status' => true, 'data'=>$local_goverment_area]);



    }



    public function get_dropdowndata(Request $request){

        $religion = DB::table('religion')
              ->select(DB::raw('id,name'))
              ->get();

        $maritial_status = DB::table('maritial_status')
              ->select(DB::raw('id,name'))
              ->get();

        $nationality = DB::table('nationality')
              ->select(DB::raw('id,name'))
              ->get();

        $bloodgroup = DB::table('blood_group')
              ->select(DB::raw('id,name'))
              ->get();


        $data = array(
            "religion" =>  $religion,
            "maritial_status" => $maritial_status,
            "nationality" => $nationality,
            "blood_group" => $bloodgroup,
        );

        return response()->json(['status' => true, 'data'=>$data]);


    }
}