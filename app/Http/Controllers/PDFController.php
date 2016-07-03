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
                    array_push($arr, ['value'=> $v,'field' =>$temp]);
                }
            }
        }
//    print_r($arr);
//    print_r($template_values);
//    print_r($template);
//    print_r($template);
//    echo $template->fields[0]->displayName;
//
        $data = ['data'=>$arr];


        $view =  app()->make('view')->make('report_pdf', $data)->render();
//        return $view;
//    return $view;

        $file_archive = '/var/www/html/ehr/public/patient_archive/report_pdf';
        $pdf = PDF::loadHTML($view);
        // return $pdf->stream($file_archive);

        $path = base_path().'/public/patient_archive/report_pdf';

        $pdf->save($path);

        $file_archive = url('/').'/patient_archive/report_pdf';

        return response()->json(['status' => true, 'data'=> $file_archive]);

      //  return $pdf->download('report_pdf');


    }
}