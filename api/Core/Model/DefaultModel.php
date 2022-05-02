<?php

namespace Core\Model;

use Core\Database\Database;
use Core\Traits\JsonTrait;

class DefaultModel extends Database
{
    protected string $table;
    protected string $entity;

    public function findAll(): array
    {
        try {
            $stmt = "SELECT * FROM $this->table;";
            $query = $this->pdo->query($stmt, \PDO::FETCH_CLASS, "App\Entity\\$this->entity");

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

    public function find (int $id) :object|false
    {
        try {
            $stmt = "SELECT * FROM $this->table WHERE id = $id";
            $query = $this->pdo->query($stmt, \PDO::FETCH_CLASS, "App\Entity\\$this->entity");
            return $query->fetch();
        }
        catch (\PDOException $e) {
            $this->jsonResponse($e->getMessage(), 400);
        }
    }
}