<?php

namespace Core\Traits;

trait JsonTrait {
    protected function jsonResponse (mixed $data, int $code = 200):void
    {
        header("content-type: application/json");
        http_response_code($code);
        echo json_encode($data);
    }
}