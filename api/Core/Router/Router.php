<?php
namespace Core\Router;

class Router {

    public static function router ()
    {
        if (isset($_SERVER["PATH_INFO"])) {
            $path = explode("/",$_SERVER["PATH_INFO"]);
            if (isset($path[3])) {
                $controllerName = "App\Controller\\".ucfirst($path[3]). "Controller";
                $controller = new $controllerName;
                
                switch ($_SERVER["REQUEST_METHOD"]) {
                    case "GET":
                        if (isset($path[4]) && is_numeric($path[4])) {
                            $controller->single($path[4]);
                        } else {
                            $controller->index();
                        }
                        break;
                    case "POST":
                        if(isset($path[4]) && is_string($path[4])) 
                        {
                            $method = $path[4];
                            $controller->$method();
                        }else{
                            $controller->save();
                        }
                        break;
                    case "DELETE":
                        if (isset($path[4]) && is_numeric($path[4])) {
                            $controller->delete($path[4]);
                        } else {
                            throw new \Exception("Id manquant", 400);
                        }
                        break;
                    case "PUT":
                        if (isset($path[4]) && is_numeric($path[4])) {
                            $controller->update($path[4]);
                        } else {
                            throw new \Exception("Id manquant", 400);
                        }
                        break;
                    case "PATCH":
                        if (isset($path[4]) && is_numeric($path[4])) {
                            $controller->update($path[4]);
                        } else {
                            throw new \Exception("Id manquant", 400);
                        }
                        break;
                }
            }
        } else {
            // TODO: erreur si pas la route
        }
    }
}