<?php
namespace App\Model;

use App\Entity\Client;
use Core\Model\DefaultModel;

class ClientModel extends DefaultModel {

    protected string $table = "client";
    protected string $entity = "Client";

    /**
     * Enregistre un nouveau client
     *
     * @param array $client
     * @return integer|false
     */
    public function saveClient (array $client): int|false
    {
        $stmt= "INSERT INTO $this->table (company, apikey) 
                VALUES (:company, :apikey)";
        $prepare = $this->pdo->prepare($stmt);
        if ($prepare->execute($client)) {
            return $this->pdo->lastInsertId($this->table);
        }
        return false;
    }

    public function findByApikey ($apikey): Client|false
    {
        $stmt = "SELECT * FROM $this->table WHERE apikey = '$apikey'";

        $query = $this->pdo->query($stmt, \PDO::FETCH_CLASS, "App\Entity\\$this->entity");
        return $query->fetch();
    }

}