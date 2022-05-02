<?php
header("Access-Control-Allow-Origin: *");
use App\Controller\CategorieController;
use App\Controller\ArticleController;

define("ROOT", dirname(__DIR__));
require ROOT . "/vendor/autoload.php";


if (isset($_SERVER["PATH_INFO"])) {
    $path = explode("/",$_SERVER["PATH_INFO"]);
    if (isset($path[3])) {
        $controllerName = "App\Controller\\".ucfirst($path[3]). "Controller";
        $controller = new $controllerName;

        if (isset($path[4]) && is_numeric($path[4])) {
            $controller->single($path[4]);
        } elseif (isset($path[4]) && is_string($path[4])) {
            $method = $path[4];
            $controller->$method();
        } else {
            $controller->index();
        }
    }
} else {

}