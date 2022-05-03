<?php

namespace App\Model;

use Core\Model\DefaultModel;

/**
 * @method Bien[] findAll()
 */
final class BienModel extends DefaultModel
{
    protected string $table = "bien";
    protected string $entity = "Bien";
    
    private $default = [
        //"id",
        "titre" => "",
        "description" => "",
        "type_achat" => "",
        "type_bien" => "",
        "prix" => 0,
        "superficie" => 0,
        "nbPiece" => 0,
        "piscine" => false,
        "balcon" => false,
        "terrasse" => false,
        "cheminee" => false,
    ];

    /**
     * Ajoute un bien a la database
     * 
     * @param array $bien
     * @return ?int
     */
    public function saveBien(array $bien): ?int
    {
        $newBien = $bien + $this->default;

        $stmt = "INSERT INTO $this->table (titre,description,type_achat,type_bien,prix,superficie,nbPiece,piscine,balcon,terrasse,cheminee) VALUES (:titre,:description,:type_achat,:type_bien,:prix,:superficie,:nbPiece,:piscine,:balcon,:terrasse,:cheminee)";
        $prepare = $this->pdo->prepare($stmt);

        if ($prepare->execute($newBien)) {
            // récupéré l'id du dernier ajout a la bdd
            return $this->pdo->lastInsertId($this->table);
        } else {
            $this->jsonResponse("Erreur lors de l'insersion d'un bien", 400);
        }
    }
}