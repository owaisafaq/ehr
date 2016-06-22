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

class InventoryAPIController extends Controller
{
    public function get_categories(){
        $categories = DB::table('inventory_categories')->select('status',1)->get();
        if($categories){
            return response()->json(['status' => true, 'message' => "Categories Found.", 'inventory_categories'=>$categories], 200);
        }else{
            return response()->json(['status' => false, 'message' => "Categories not found"], 404);
        }
    }
    public function create_category(Request $request){
        $cat_name = $request->input('cat_name');
        $cat_desc = $request->input('cat_desc');
        $cat_group = $request->input('cat_group');
        $id = DB::table('inventory_categories')->insertGetId(
            ['cat_name' => $cat_name, 'cat_desc' => $cat_desc, 'cat_group'=>$cat_group, 'created_at'=>date("Y-m-d  H:i:s")]
        );

        if($id){
            return response()->json(['status' => true, 'message' => "Category Added Successfully", 'category_id'=>$id], 200);
        }else{
            return response()->json(['status' => false, 'message' => "Error!"], 404);
        }
    }
    public function update_category(Request $request){
        $id = $request->input('cat_id');
        $cat_name = $request->input('cat_name');
        $cat_desc = $request->input('cat_desc');
        $cat_group = $request->input('cat_group');
        $count = DB::table('inventory_categories')->where('id',$id)->update(
            ['cat_name' => $cat_name, 'cat_desc' => $cat_desc, 'cat_group'=>$cat_group, 'updated_at'=>date("Y-m-d  H:i:s")]
        );

        if($count){
            return response()->json(['status' => true, 'message' => "Category Updated Successfully"], 200);
        }else{
            return response()->json(['status' => false, 'message' => "Error!"], 404);
        }
    }
    public function delete_category(Request $request){
        $id = $request->input('cat_id');
        $count = DB::table('inventory_categories')->where('id', $id)->update(['status'=>0]);
        if($count){
            return response()->json(['status' => true, 'message' => "Category Deleted Successfully"], 200);
        }else{
            return response()->json(['status' => false, 'message' => "Error!"], 404);
        }
    }
}
