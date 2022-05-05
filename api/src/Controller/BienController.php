<?php

namespace App\Controller;

use App\Model\BienModel;
use Core\Controller\DefaultController;

final class BienController extends DefaultController {

    private $model;

    public function __construct(){
        $this->model = new BienModel();
    }

    public function index():void 
    {
        $this->jsonResponse($this->model->findAll());
    }

    public function single(int $id)
    {
        $this->jsonResponse($this->model->find($id));
    }

    public function save():void 
    {
        $lastId = $this->model->saveBien($_POST);
        $this->jsonResponse($this->model->find($lastId), 201);
    }

    public function update (int $id, array $bien): void
    {
        if ($this->model->updateBien(id: $id, bien: $bien)) {
            $this->jsonResponse($this->model->find($id));
        }
    }

    public function delete (int $id): void
    {
        if ($this->model->delete($id)) {
            $this->jsonResponse("Bien supprimé avec succés");
        }
    }
}