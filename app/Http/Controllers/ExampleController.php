<?php

namespace App\Http\Controllers;

class ExampleController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function register_patient(Request $request)
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

        $hospital_plan = $request->input('hospital_plan');

        $occupation = $request->input('occupation');

        $currentdatetime = date("Y-m-d  H:i:s");


        DB::table('patients')->insert(
            ['first_name' => $first_name,
                'middle_name' => $middle_name,
                'last_name' => $last_name,
                'date_of_birth' => $date_of_birth,
                'age' => $age,
                'sex' => $sex,
                'martial_status' => $marital_status,
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
                'blood_group' => $blood_group,
                'created_at' => $currentdatetime
            ]
        );


        $patient_id = DB::getPdo()->lastInsertId();


        $same_as_above = $request->input('same_as_above');

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


        if ($same_as_above == 1) {


            $permanent_city = $request->input('permanent_city');

            $permanent_country = $request->input('permanent_country');

            $permanent_email = $request->input('permanent_email');

            $permanent_housenumber = $request->input('permanent_housenumber');

            $permanent_mobilenumber = $request->input('permanent_mobilenumber');

            $permanent_phonenumber = $request->input('permanent_phonenumber');

            $permanent_postalCode = $request->input('permanent_postalCode');


            DB::table('patient_address')->insert(
                ['patient_id' => $patient_id,
                    'email' => $permanent_email,
                    'address_type' => 'permanent',
                    'phone_number' => $permanent_phonenumber,
                    'mobile_number' => $permanent_mobilenumber,
                    'house_number' => $permanent_housenumber,
                    'street' => '',
                    'city' => $permanent_city,
                    'state' => '',
                    'country' => $country,
                    'local_goverment_area' => '',
                    'postal_code' => $permanent_postalCode,
                    'created_at' => $currentdatetime

                ]
            );


        }


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

        $employer_mobile_number = $request->input('employer_mobile_number');

        $employer_email = $request->input('employer_email');

        $employer_house_number = $request->input('employer_house_number');

        $employer_street = $request->input('employer_street');

        $employer_city = $request->input('employer_city');

        $employer_state = $request->input('employer_state');

        $employer_country = $request->input('employer_country');

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


        return response()->json(['status' => true, 'message' => 'Patient Registered Successfully']);

        exit;


        $patient_plan_id = $request->input('patient_plan_id');

        $hmo = $request->input('hmo');

        $policies = $request->input('policies');

        $insurance_id = $request->input('insurance_id');

        $principal = $request->input('principal');

        $depandent = $request->input('depandent');

        $principal_id = $request->input('principal_id');

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


    }
    
    //
}
