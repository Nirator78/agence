<?php
namespace App\Controller;

use Core\Controller\DefaultController;
use App\Model\ClientModel;
use OpenApi\Attributes as OA;

class ClientController extends DefaultController {

    public function __construct()
    {
        $this->model = new ClientModel;
    }

    /**
     * Génère une apikey pour un nouveau client
     *
     * @param array $client
     * @return void
     */
    #[OA\Post(path: '/api/v1/client', tags: ['Client'])]
    #[OA\Response(response: '200', description: 'The data')]
    public function save (array $client): void
    {
        // Génère l'apikey
        $apikey = md5(uniqid());
        $client['apikey'] = $apikey;
        // Stocke le client
        $lastId = $this->model->saveClient($client);
        // Retourne l'apikey
        $this->jsonResponse($this->model->find($lastId));
    }
}