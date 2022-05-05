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
        "role" => "user",
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


    /**
     * Modifie un bien de la database
     * 
     * @param int $id
     * @param array $bien
     * @return ?int
     */
    public function updateBien(int $id, array $bien): bool
    {
        $bienInBdd = $this->find($id);

        $updatedBien = $bien + $bienInBdd->jsonSerialize();
        
        $stmt = "
            UPDATE $this->table SET
            titre = :titre,
            description = :description,
            type_achat = :type_achat,
            type_bien = :type_bien,
            prix = :prix,
            superficie = :superficie,
            nbPiece = :nbPiece,
            piscine = :piscine,
            balcon = :balcon,
            terrasse = :terrasse,
            cheminee = :cheminee
            WHERE id = :id
        ";
        $prepare = $this->pdo->prepare($stmt);
        return $prepare->execute($updatedBien);
    }
}