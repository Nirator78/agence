<?php

namespace App\Model;

use Core\Model\DefaultModel;

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
}