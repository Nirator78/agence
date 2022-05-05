<?php

namespace App\Model;

use Core\Model\DefaultModel;

/**
 * @method Rdv[] findAll()
 */
final class RdvModel extends DefaultModel
{
    protected string $table = "rdv";
    protected string $entity = "Rdv";
    
    private $default = [
        //"id",
        "date" => "",
        "user_id" => "",
        "rdv_id" => "",
        "status" => "",
        "email" => "",
        "nom" => "",
        "prenom" => "",
        "tel" => "",
    ];

    /**
     * Ajoute un rdv a la database
     * 
     * @param array $rdv
     * @return ?int
     */
    public function saveRdv(array $rdv): ?int
    {
        $newRdv = $rdv + $this->default;

        $stmt = "INSERT INTO $this->table (date,user_id,bien_id,status,email,nom,prenom,tel) VALUES (:date,:user_id,:bien_id,:status,:email,:nom,:prenom,:tel)";
        $prepare = $this->pdo->prepare($stmt);

        if ($prepare->execute($newRdv)) {
            // récupéré l'id du dernier ajout a la bdd
            return $this->pdo->lastInsertId($this->table);
        } else {
            $this->jsonResponse("Erreur lors de l'insersion d'un rdv", 400);
        }
    }

    /**
     * Modifie un rdv de la database
     * 
     * @param int $id
     * @param array $rdv
     * @return ?int
     */
    public function updateRdv(int $id, array $rdv): bool
    {
        $rdvInBdd = $this->find($id);

        $updatedRdv = $rdv + $rdvInBdd->jsonSerialize();
        
        $stmt = "
            UPDATE $this->table SET
            date = :date,
            user_id = :user_id,
            bien_id = :bien_id,
            status = :status,
            email = :email,
            nom = :nom,
            prenom = :prenom,
            tel = :tel
            WHERE id = :id
        ";
        $prepare = $this->pdo->prepare($stmt);
        return $prepare->execute($updatedRdv);
    }
}