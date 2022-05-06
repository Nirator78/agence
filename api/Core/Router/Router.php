<?php
namespace Core\Router;

use App\Security\JwTokenSecurity;

class Router {

    public static function router ()
    {
        if (isset($_SERVER["PATH_INFO"])) {
            $path = explode("/",$_SERVER["PATH_INFO"]);
            if (isset($path[3])) {
                $controllerName = "App\Controller\\".ucfirst($path[3]). "Controller";
                $controller = new $controllerName;
                $securityJwt = new JwTokenSecurity();
                switch ($_SERVER["REQUEST_METHOD"]) {
                    case "GET":
                        if (isset($path[4]) && is_numeric($path[4]) && $securityJwt->tokenNeeded(false)) {
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
                            if(ucfirst($path[3]) == "Rdv"){
                                $controller->save();
                            }else{
                                if($securityJwt->tokenNeeded(true)){
                                    $controller->save();
                                }else{
                                    throw new \Exception("Token manquant", 400);                                    
                                }
                            }
                        }
                        break;
                    case "DELETE":
                        if (isset($path[4]) && is_numeric($path[4]) && $securityJwt->tokenNeeded(true)) {
                            $controller->delete($path[4]);
                        } else {
                            throw new \Exception("Id manquant ou pas de token", 400);
                        }
                        break;
                    case "PUT":
                        parse_str(file_get_contents("php://input"), $_PUT);
                        if (isset($path[4]) && !empty($_PUT) && $securityJwt->tokenNeeded(true)) {
                            $controller->update($path[4], $_PUT);
                        } else {
                            throw new \Exception("Erreur lors de la modification, il manque des informations", 400);
                        }
                        break;
                    case "PATCH":
                        parse_str(file_get_contents("php://input"), $_PATCH);
                        if (isset($path[4]) && !empty($_PATCH) && $securityJwt->tokenNeeded(true)) {
                            $controller->update($path[4], $_PATCH);
                        } else {
                            throw new \Exception("Erreur lors de la modification, il manque des informations", 400);
                        }
                        break;
                }
            }
        } else {
            // TODO: erreur si pas la route
        }
    }
}