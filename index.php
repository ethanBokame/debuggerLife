<?php 
require "vendor/autoload.php";
$router = new AltoRouter();

// map homepage
$router->map('GET', '/debugger_life/', function() {
    require 'desktop-template-php/explorer.php';
});


$match = $router->match();

// var_dump($match["target"]);

// call closure or throw 404 status
if( is_array($match) && is_callable( $match['target'] ) ) {
	call_user_func_array( $match['target'], $match['params'] );
} else {
	// no route was matched
	header( $_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
}



// var_dump($_SERVER['REQUEST_URI']);

?>