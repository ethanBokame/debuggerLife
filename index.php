<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require 'vendor/autoload.php';

// print_r($_SERVER["REQUEST_URI"]);

$router = new AltoRouter();

$_SESSION["base"] = $_SERVER["HTTP_HOST"] == "localhost" ? '/debugger_life' : '';

// echo $_SERVER["HTTP_HOST"];
// echo "<br>";
// echo $_SERVER["REQUEST_URI"];

$router->setBasePath($_SESSION["base"]);

// Définition ds routes
$router->map('GET | POST', '/', function() {
    require "desktop-template-php/explorer.php";
});

// Page explorer
$router->map('GET | POST', '/explorer', function() {
    require "desktop-template-php/explorer.php";
});

// Page des debugs perso
$router->map('GET | POST', '/mydebug', function() {
    require "desktop-template-php/mydebug.php";
}, 'mydebug');

// Page favoris
$router->map('GET | POST', '/favoris', function() { 
    require "desktop-template-php/favoris.php";
});

// Ajout d'un debug
$router->map('GET | POST', '/add', function() {
    require "desktop-template-php/add.php";
});

// Modification d'un debug
$router->map('GET | POST', '/update-debug/[i:id_post]', function($id_post) {
	$id_post_router = $id_post;
    require "desktop-template-php/modif-debug.php";
});

// Debug singulier
$router->map('GET | POST', '/[*:username]/[i:id_post]', function($username, $id_post) {
    $username_router = $username;
	$id_post_router = $id_post;
    require "desktop-template-php/debug.php";
});

// TEST
$router->map('GET | POST', 'desktop-template-php/infinite-scroll-explorer.php?start_point=0', function() {
    require "desktop-template-php/infinite-scroll-explorer.php?start_point=0";
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