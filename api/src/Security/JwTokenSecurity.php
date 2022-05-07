<?php
namespace App\Security;

use DateInterval;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JwTokenSecurity {

    private const SIGNATURE = "ipssi";
    private const ALGO = "HS256";

    /**
     * Génère un token jwt
     *
     * @param array $payload
     * @return string
     */
    public function generateToken (array $payload = []): string
    {
        $date = new \DateTime();
        $exp = $date->add(new DateInterval("P1D"));

        $defaultPayload = [
            'iss' => "http://localhost:8000",
            'exp' => $exp->getTimestamp()
        ];
        $payload = array_merge($payload, $defaultPayload);

        return JWT::encode($payload, self::SIGNATURE, self::ALGO);
    }

    public function decodeToken (): array
    {
        // On récupère les en-tête de la requête
        $headers = getallheaders();
        // On récupère la clé Authorization de l'en-tête
        $authorization = $headers['Authorization'];
        // On split la chaine pour enlber le Bearer au début
        $authorizationSplited = explode(" ",$authorization);
        // On met le token dans $token
        $token = $authorizationSplited[1];
        // On décrypt les infos dans le token
        $decoded = JWT::decode($token, new Key(self::SIGNATURE, self::ALGO));
        // On renvoie l'utilisateur connecter qui est decrypté
        return (array) $decoded;
    }

    public function tokenNeeded ($need)
    {
        $headers = getallheaders();
        if(isset($headers['Authorization']) && $need){   
            return true;
        }else{
            return false;
        }
    }
}