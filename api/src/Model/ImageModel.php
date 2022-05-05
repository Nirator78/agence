<?php

namespace App\Model;

use Core\Model\DefaultModel;

/**
 * @method Image[] findAll()
 */
final class ImageModel extends DefaultModel
{
    protected string $table = "image";
    protected string $entity = "Image";
    
    private $default = [
        //"id",
        "url" => "",
        "bien_id" => "",
    ];

    /**
     * Ajoute un image a la database
     * 
     * @param array $image
     * @return ?int
     */
    public function saveImage(array $image): ?int
    {
        $newImage = $image + $this->default;

        $stmt = "INSERT INTO $this->table (url,bien_id) VALUES (:url,:bien_id)";
        $prepare = $this->pdo->prepare($stmt);

        if ($prepare->execute($newImage)) {
            // récupéré l'id du dernier ajout a la bdd
            return $this->pdo->lastInsertId($this->table);
        } else {
            $this->jsonResponse("Erreur lors de l'insersion d'un image", 400);
        }
    }

    public function findImageByBien(int $bien_id) {
        try {
            $stmt = "SELECT url FROM $this->table WHERE bien_id = $bien_id";
            $query = $this->pdo->query($stmt, \PDO::FETCH_CLASS, "App\Entity\\$this->entity");
            return $query->fetchAll();
        }
        catch (\PDOException $e) {
            $this->jsonResponse($e->getMessage(), 400);
        }
    }
}