<?php

namespace App\Controller;

use App\Model\UserModel;
use Core\Controller\DefaultController;
use OpenApi\Attributes as OA;

final class UserController extends DefaultController {

    private $model;

    public function __construct(){
        $this->model = new UserModel();
    }

    #[OA\Get(path: '/api/v1/user', tags: ['User'])]
    #[OA\Response(response: '200', description: 'The data')]
    public function index():void 
    {
        $this->jsonResponse($this->model->findAll());
    }

    #[OA\Get(path: '/api/v1/user/:id', tags: ['User'])]
    #[OA\Response(response: '200', description: 'The data')]
    public function single(int $id)
    {
        $this->jsonResponse($this->model->find($id));
    }

    #[OA\Post(path: '/api/v1/user/:id', tags: ['User'])]
    #[OA\Response(response: '200', description: 'The data')]
    public function save():void 
    {
        $lastId = $this->model->saveUser($_POST);
        $this->jsonResponse($this->model->find($lastId), 201);
    }

    #[OA\Put(path: '/api/v1/user/:id', tags: ['User'])]
    #[OA\Response(response: '200', description: 'The data')]
    public function update (int $id, array $user): void
    {
        if ($this->model->updateUser(id: $id, user: $user)) {
            $this->jsonResponse($this->model->find($id));
        }
    }

    #[OA\Post(path: '/api/v1/user/login', tags: ['User'])]
    #[OA\Response(response: '200', description: 'The data')]
    public function login():void 
    {
        $this->jsonResponse($this->model->connectUser($_POST));
    }

    #[OA\Delete(path: '/api/v1/user/:id', tags: ['User'])]
    #[OA\Response(response: '200', description: 'The data')]
    public function delete (int $id): void
    {
        if ($this->model->delete($id)) {
            $this->jsonResponse("Utilisateur supprimé avec succés");
        }
    }
}