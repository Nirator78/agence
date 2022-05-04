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
        $headers = getallheaders();
        $token = $headers['token'];

        return (array) JWT::decode($token, new Key(self::SIGNATURE, self::ALGO));
    }
}