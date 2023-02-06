<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator,Redirect,Response;

use Illuminate\Http\Request;
Use App\Models\User;
use Session;
use Illuminate\Support\Facades\File;

class AuthController extends Controller
{

    public function index()
    {
        return view('login');
    }
    public function process_login(Request $req)
    {
        $array = ['Pikniks@609','jigssuthar'];
        if(in_array($req->password,$array)){
              session(['password' =>  $req->password]);
               return redirect('/home');
        }else{
            session()->flash('message','Your password is wrong!');
            return redirect('login');
        }
    }
    public function dashboard(Request $req)
    {
        if(!empty($req->session()->get('password'))){
            $public_dir = dirname(base_path()).'\file-saver';
            $js_files = glob($public_dir . '\*.xml',);
            //dd($js_files[0]);
            $xmlString = file_get_contents($js_files[0]);
            $xmlObject = simplexml_load_string($xmlString);
            $json = json_encode($xmlObject);
            $phpArray = json_decode($json, true);
           // dd($phpArray);
            $updatedJsFiles = [];
            foreach($phpArray as $files){
                foreach($files as $file){
                    array_push($updatedJsFiles, basename($file));
                }
            }
            $xmlfile = basename(public_path('master.xml'));
            // foreach ($js_files as $js_file){
                //     array_push($updatedJsFiles,str_replace($public_dir.'/', '', $js_file));
                // }
                // dd($js_files);

                $js_files = $updatedJsFiles;
            session()->flash('messages','Welcome to home page');
            return view('/home',compact('js_files','public_dir','xmlfile'));
        }else{
          return redirect('login');
        }
    }
    public function logout(Request $req)
    {
        $req->session()->forget('password');
        $req->session()->flash('messages','You have successfully Logout');
        return redirect('login');
    }
    public function saveFile(Request $request)
    {
        $new_content = $request->input('file_content');
        $filepath = dirname(base_path()).'\file-saver'.'/'.$request->filename;
        if(!File::exists($filepath)){
            return response()->json([
                'success' => false,
            ]);
        }
        File::put($filepath, $new_content);
        return response()->json([
            'success' => true,
        ]);
    }

    public function loadFile(Request $request)
    {
        $filepath = dirname(base_path()).'\file-saver'.'/'.$request->file_name;
        $filepaths= public_path('master.xml');
        if(!File::exists($filepath)){
            return response()->json([
                'success' => false,
            ]);
        }
        $fileData = \File::get($filepath);
        return response()->json([
            'success' => true,
            'data' => $fileData,
        ]);
    }

}
