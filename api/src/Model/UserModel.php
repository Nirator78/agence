<?php

namespace App\Model;

use Core\Model\DefaultModel;
use App\Security\JwTokenSecurity;

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
        
        $newUser['password'] = password_hash($newUser['password'], PASSWORD_DEFAULT);
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

        $stmt = "SELECT * FROM $this->table WHERE email = '$email'";

        $query = $this->pdo->query($stmt, \PDO::FETCH_CLASS, "App\Entity\\$this->entity");
        $userFind = $query->fetch(); 
        
        if ($userFind && password_verify($password, $userFind->getPassword())) {
            $token = (new JwTokenSecurity)->generateToken($userFind->jsonSerialize());
            return [
                "user" => $userFind,
                "token" => $token
            ];
        } else {
            return [
                "message" => "Cet utilisateur n'est pas inscrit, veuillez vous inscrire", 
                "code" => 400
            ];
        }
    }
}