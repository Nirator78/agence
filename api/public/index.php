<?php

use Core\Router\Router;
use App\Security\ApiKeySecurity;

define('ROOT', dirname(__DIR__));
require ROOT ."/vendor/autoload.php";

// header("Access-Control-Allow-Origin: http://127.0.0.1:5501");
// Indique quels clients peuvent se connecter à l'api
header("Access-Control-Allow-Origin: *");
// Indique les headers autorisés par l'api
header("Access-Control-Allow-Headers: content-type, token, Authorization");
// Indique les request methods autorisées par l'api
header("Access-Control-Allow-Methods: GET, PATCH, OPTIONS, POST, PUT, DELETE");
// Indique le temps d'existence max de ces données. Cette information va être utilisée pour le cache
header('Access-Control-Max-Age:1728000');

if (ApiKeySecurity::verifyApiKey()) {
    require ROOT ."/Core/Router/Router.php";
    Router::router();
}