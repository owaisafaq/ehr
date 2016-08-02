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

class PDFController extends Controller
{
    public function get_lab_test_pdf(Request $request)
    {
        $arr = array();
        $id = $request->input('lab_test_id');

        $db = DB::table('patient_lab_test_values')
            ->select('template_values','template')
            ->leftJoin('templates','templates.id','=','patient_lab_test_values.template_id')
            ->where('lab_test', $id)->first();

       $template_values = json_decode($db->template_values);
        $template = json_decode($db->template);
        foreach ($template->fields as $temp){
            foreach ($template_values as $k => $v){
                if($temp->name == $k){
                    array_push($arr, ['value'=> $v,'field' =>$temp,]);
                }
            }
        }
        $logo_image = url('/') . '/uploaded_images/';


        //    print_r($arr);
        //    print_r($template_values);
        //    print_r($template);
        //    print_r($template);
        //    echo $template->fields[0]->displayName;


        // All The Patient info is here just uncomment it when required

/*        $patient = DB::table('patient_lab_test_values')
             ->select(DB::raw('patients.id,CONCAT(patients.first_name," ",patients.last_name) AS patient_name,CONCAT("' . $logo_image . '",patients.patient_image) as patient_image,patients.age,patients.date_of_birth,maritial_status.name as marital_status,(CASE WHEN (sex = 1) THEN "Male" ELSE "Female" END) as gender'))
             ->leftJoin('lab_orders', 'lab_orders.id', '=', 'patient_lab_test_values.lab_order_id')
             ->leftJoin('patients', 'patients.id', '=', 'lab_orders.patient_id')
             ->leftJoin('maritial_status', 'patients.marital_status', '=', 'maritial_status.id')
             ->where('lab_test', $id)->first();

       array_push($arr,['patient'=>$patient]);*/

        $data = ['data'=>$arr];

        $view =  app()->make('view')->make('report_pdf', $data)->render();
//    return $view;
//    return $view;

        $pdf = PDF::loadHTML($view);
        // return $pdf->stream($file_archive);

        $path = base_path().'/public/patient_archive/report.pdf';

        $pdf->save($path);

        $file_archive = url('/').'/patient_archive/report.pdf';

        echo json_encode(array(
            'status' => true,
            'data' => $file_archive,

        ), JSON_UNESCAPED_SLASHES);

    }


    public function send_invoice_email(Request $request){



        $invoice_id = $request->input('invoice_id');
        $email_address = $request->input('email_address');

        $data = ['name'=>'foo'];

        $view =  app()->make('view')->make('invoice_pdf', $data)->render();
        
        $pdf = PDF::loadHTML($view);

        $path = base_path().'/public/patient_archive/invoice.pdf';


        $pdf->save($path);

        $message = "Invoice Data";

              $mail = new PHPMailer(true); // notice the \  you have to use root namespace here
              try {
                  $mail->isSMTP(); // tell to use smtp
                  $mail->CharSet = "utf-8"; // set charset to utf8
                  $mail->SMTPAuth = true;  // use smpt auth
                  $mail->SMTPSecure = "tls"; // or ssl
                  $mail->Host = "smtp.gmail.com";
                  $mail->Port = `587`; // most likely something different for you. This is the mailtrap.io port i use for testing.
                  $mail->Username = "aploskhan@gmail.com";
                  $mail->Password = "Aplos@221";
                  $mail->setFrom('smovaishassan12@hotmail.com');
                  $mail->AddAttachment($path);
                  $mail->Subject = "Message From Ehr";
                  $mail->MsgHTML($message);
                  $mail->addAddress($email_address);
                  $mail->send();

               } catch (phpmailerException $e) {
                  dd($e);
               } catch (Exception $e) {
                              dd($e);
               }


        return response()->json(['status' => true, 'message' => 'Email Send Successfully']);


    }
}