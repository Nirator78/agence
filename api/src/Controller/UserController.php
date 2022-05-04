<?php

namespace App\Controller;

use App\Model\UserModel;
use Core\Controller\DefaultController;

final class UserController extends DefaultController {

    private $model;

    public function __construct(){
        $this->model = new UserModel();
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
        $lastId = $this->model->saveUser($_POST);
        $this->jsonResponse($this->model->find($lastId), 201);
    }

    public function login():void 
    {
        $this->jsonResponse($this->model->connectUser($_POST));
    }
}