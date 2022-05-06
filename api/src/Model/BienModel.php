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
        "status" => "en_ligne",
        "user_id" => 0,
    ];

    /**
     * Find all bien avec filtre
     */
    public function findAllBien(): array
    {
        try {
            $sql = "SELECT * FROM $this->table WHERE status='en_ligne'";

            if(isset($_GET["type_achat"]) && is_string($_GET["type_achat"])){
                $sql = $sql." AND type_achat='".$_GET["type_achat"]."'";
            }
            if(isset($_GET["type_bien"]) && is_string($_GET["type_bien"])){
                $sql = $sql." AND type_bien='".$_GET["type_bien"]."'";
            }
            if(isset($_GET["nbPiece"]) && is_numeric($_GET["nbPiece"])){
                $sql = $sql." AND nbPiece=".$_GET["nbPiece"];
            }
            if(isset($_GET["superficieMin"]) && is_numeric($_GET["superficieMin"])){
                $sql = $sql." AND superficie>=".$_GET["superficieMin"];
            }
            if(isset($_GET["superficieMax"]) && is_numeric($_GET["superficieMax"])){
                $sql = $sql." AND superficie<=".$_GET["superficieMax"];
            }
            if(isset($_GET["prixMin"]) && is_numeric($_GET["prixMin"])){
                $sql = $sql." AND prix>=".$_GET["prixMin"];
            }
            if(isset($_GET["prixMax"]) && is_numeric($_GET["prixMax"])){
                $sql = $sql." AND prix<=".$_GET["prixMax"];
            }
            if(isset($_GET["user"]) && is_numeric($_GET["user"])){
                $sql = $sql." AND user_id=".$_GET["user"];
            }

            if(isset($_GET['limit']) && is_numeric($_GET['limit'])){
                $sql = $sql." LIMIT ".$_GET['limit'].";";
            }else{
                $sql = $sql.";";
            }
            $query = $this->pdo->query($sql, \PDO::FETCH_CLASS, "App\Entity\\$this->entity");

            return $query->fetchAll();
        } catch (\PDOException $e) {
            // s'il y a une erreur, on retourne le message avec un code d'erreur adapté
            //header("content-type: application/json");
            // ici le code 400
            //http_response_code(400);
            //echo json_encode($e->getMessage());
            $this->jsonResponse($e->getMessage(), 400);
        }
    }

    /**
     * Ajoute un bien a la database
     * 
     * @param array $bien
     * @return ?int
     */
    public function saveBien(array $bien): ?int
    {
        $newBien = $bien + $this->default;

        $stmt = "INSERT INTO $this->table (titre,description,type_achat,type_bien,prix,superficie,nbPiece,piscine,balcon,terrasse,cheminee,status,user_id) VALUES (:titre,:description,:type_achat,:type_bien,:prix,:superficie,:nbPiece,:piscine,:balcon,:terrasse,:cheminee,:status,:user_id)";
        $prepare = $this->pdo->prepare($stmt);

        if ($prepare->execute($newBien)) {
            // récupéré l'id du dernier ajout a la bdd
            return $this->pdo->lastInsertId($this->table);
        } else {
            $this->jsonResponse("Erreur lors de l'insersion d'un bien", 400);
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
        unset($updatedBien["images"]);
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
            cheminee = :cheminee,
            status = :status,
            user_id = :user_id
            WHERE id = :id
        ";
        $prepare = $this->pdo->prepare($stmt);
        return $prepare->execute($updatedBien);
    }
}