<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require 'vendor/autoload.php';

// print_r($_SERVER["REQUEST_URI"]);

$router = new AltoRouter();

// définition de la base
$base = $_SERVER["HTTP_HOST"] == "localhost" ? '/debugger_life' : '';

$router->setBasePath($base);

// Définition ds routes
$router->map('GET', '/', function() {
    require "desktop-template-php/explorer.php";
});

$router->map('GET', '/explorer', function() {
    require "desktop-template-php/explorer.php";
});

$router->map('GET', '/mydebug', function() {
    require "desktop-template-php/mydebug.php";
});

$router->map('GET', '/favoris', function() {
    require "desktop-template-php/favoris.php";
});

$router->map('GET', '/add', function() {
    require "desktop-template-php/add.php";
});

$router->map('GET', '/update-debug/[i:id_post]', function($id_post) {
	// global $id_post_router;
	$id_post_router = $id_post;
    require "desktop-template-php/modif-debug.php";
	// echo $id_post_router;
});

// $router->map('GET', '/contact', 'contact', 'contact');
// $router->map('GET', '/blog/[*:slug]-[i:id]', 'blog/article', 'article');

$match = $router->match();

// call closure or throw 404 status
if( is_array($match) && is_callable( $match['target'] ) ) {
	call_user_func_array( $match['target'], $match['params'] );
} else {
	// no route was matched
	header( $_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
}

?>