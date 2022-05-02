<?php

namespace App\Controller;

use App\Model\RdvModel;
use Core\Controller\DefaultController;

final class RdvController extends DefaultController {

    private $model;

    public function __construct(){
        $this->model = new RdvModel();
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
        $lastId = $this->model->saveRdv($_POST);
        $this->jsonResponse($this->model->find($lastId), 201);
    }
}