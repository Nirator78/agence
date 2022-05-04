<?php

namespace App\Model;

use Core\Model\DefaultModel;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

/**
 * @method User[] findAll()
 */
final class UserModel extends DefaultModel
{
    protected string $table = "user";
    protected string $entity = "User";
    
    private $default = [
        //"id",
        "nom" => "",
        "prenom" => "",
        "email" => "",
        "tel" => "",
        "role" => "",
        "password" => "",
    ];

    /**
     * Ajoute un user a la database
     * 
     * @param array $user
     * @return ?int
     */
    public function saveUser(array $user): ?int
    {
        $newUser = $user + $this->default;

        $stmt = "INSERT INTO $this->table (nom,prenom,email,tel,role,password) VALUES (:nom,:prenom,:email,:tel,:role,:password)";
        $prepare = $this->pdo->prepare($stmt);

        if ($prepare->execute($newUser)) {
            // récupéré l'id du dernier ajout a la bdd
            return $this->pdo->lastInsertId($this->table);
        } else {
            $this->jsonResponse("Erreur lors de l'insersion d'un user", 400);
        }
    }

    public function connectUser(array $identifiant)
    {
        $email = $identifiant["email"];
        $password = $identifiant["password"];

        $stmt = "SELECT * FROM $this->table WHERE email = '$email' AND password= '$password'";

        $query = $this->pdo->query($stmt, \PDO::FETCH_CLASS, "App\Entity\\$this->entity");
        $userFind = $query->fetch(); 

        if ($userFind) {
            $key = 'example_key';
            
            $token = JWT::encode((array) $userFind, $key, 'HS256');
            // $decoded = JWT::decode($jwt, new Key($key, 'HS256'));

            return [
                "user" => $userFind,
                "token" => $token
            ];
        } else {
            return [
                "message" => "Erreur lors de la connexion",
                "code" => 400,
            ];
        }
    }
}