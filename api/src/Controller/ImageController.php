<?php

namespace App\Controller;

use App\Model\ImageModel;
use Core\Controller\DefaultController;
use OpenApi\Attributes as OA;

final class ImageController extends DefaultController {

    private $model;

    public function __construct(){
        $this->model = new ImageModel();
    }

    #[OA\Get(path: '/api/v1/image', tags: ['Image'])]
    #[OA\Response(response: '200', description: 'The data')]
    public function index():void 
    {
        $this->jsonResponse($this->model->findAll());
    }

    #[OA\Get(path: '/api/v1/image/:id', tags: ['Image'])]
    #[OA\Response(response: '200', description: 'The data')]
    public function single(int $id)
    {
        $this->jsonResponse($this->model->find($id));
    }

    #[OA\Post(path: '/api/v1/image', tags: ['Image'])]
    #[OA\Response(response: '200', description: 'The data')]
    public function save():void 
    {
        $lastId = $this->model->saveImage($_POST);
        $this->jsonResponse($this->model->find($lastId), 201);
    }

    #[OA\Put(path: '/api/v1/image/:id', tags: ['Image'])]
    #[OA\Response(response: '200', description: 'The data')]
    public function update (int $id, array $image): void
    {
        if ($this->model->updateImage(id: $id, image: $image)) {
            $this->jsonResponse($this->model->find($id));
        }
    }

    #[OA\Delete(path: '/api/v1/image/:id', tags: ['Image'])]
    #[OA\Response(response: '200', description: 'The data')]
    public function delete (int $id): void
    {
        if ($this->model->delete($id)) {
            $this->jsonResponse("Image supprimé avec succés");
        }
    }
}