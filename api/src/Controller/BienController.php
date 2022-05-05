<?php

namespace App\Controller;

use App\Model\BienModel;
use Core\Controller\DefaultController;
use OpenApi\Attributes as OA;

final class BienController extends DefaultController {

    private $model;

    public function __construct(){
        $this->model = new BienModel();
    }

    #[OA\Get(path: '/api/v1/bien', tags: ['Bien'])]
    #[OA\Response(response: '200', description: 'The data')]
    public function index():void 
    {
        $this->jsonResponse($this->model->findAll());
    }

    #[OA\Get(path: '/api/v1/bien/:id', tags: ['Bien'])]
    #[OA\Response(response: '200', description: 'The data')]
    public function single(int $id)
    {
        $this->jsonResponse($this->model->find($id));
    }

    #[OA\Post(path: '/api/v1/bien', tags: ['Bien'])]
    #[OA\Response(response: '200', description: 'The data')]
    public function save():void 
    {
        $lastId = $this->model->saveBien($_POST);
        $this->jsonResponse($this->model->find($lastId), 201);
    }
    
    #[OA\Put(path: '/api/v1/bien/:id', tags: ['Bien'])]
    #[OA\Response(response: '200', description: 'The data')]
    public function update (int $id, array $bien): void
    {
        if ($this->model->updateBien(id: $id, bien: $bien)) {
            $this->jsonResponse($this->model->find($id));
        }
    }
    
    #[OA\Delete(path: '/api/v1/bien/:id', tags: ['Bien'])]
    #[OA\Response(response: '200', description: 'The data')]
    public function delete (int $id): void
    {
        if ($this->model->delete($id)) {
            $this->jsonResponse("Bien supprimé avec succés");
        }
    }
}