<?php

namespace App\Controller;

use App\Model\ImageModel;
use Core\Controller\DefaultController;

final class ImageController extends DefaultController {

    private $model;

    public function __construct(){
        $this->model = new ImageModel();
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
        $lastId = $this->model->saveImage($_POST);
        $this->jsonResponse($this->model->find($lastId), 201);
    }
}