<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $dt = Carbon::now();
        $dateNow = $dt->toDateTimeString();

        DB::table('users')->insert([
            'user_name' => str_random(10),
            'date_of_birth' => $dateNow,
            'email_address' => str_random(10).'@gmail.com',
            'phone_number' => str_random(10),
            'password' => bcrypt('secret'),
            'latitude' => '12.12',
            'longitude' => '129.12',
            'device_token' => str_random(16)

        ]);


    }
}
