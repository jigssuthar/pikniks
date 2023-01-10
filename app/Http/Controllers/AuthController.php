<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator,Redirect,Response;
use Illuminate\Http\Request;
Use App\Models\User;
use Session;
use File;
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
            $public_dir = public_path();
            $js_files = glob($public_dir . '/*.js');
            $updatedJsFiles = [];
            foreach ($js_files as $js_file){
                array_push($updatedJsFiles,str_replace($public_dir.'/', '', $js_file));
            }
            $js_files = $updatedJsFiles;
            session()->flash('messages','Welcome to home page');
            return view('/home',compact('js_files','public_dir'));
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
        $filepath=public_path().'/'.$request->filename;
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
        $filepath=public_path().'/'.$request->file_name;
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
