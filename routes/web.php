<?php
use Illuminate\Support\Facades\Input;

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', [AuthController::class, 'dashboard']);

 Route::post('/save', 'App\Http\Controllers\HomeController@save');

 Route::get('login', [AuthController::class, 'index']);
 Route::Post('/process_login', [AuthController::class, 'process_login']);
 Route::get('/home', [AuthController::class, 'dashboard']);
 Route::get('/logout', [AuthController::class, 'logout']);
 Route::post('/save-file', [AuthController::class, 'saveFile'])->name('save-file');
 Route::get('/load-file', [AuthController::class, 'loadFile'])->name('load-file');

