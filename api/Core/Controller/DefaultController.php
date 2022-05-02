<?php
namespace Core\Controller;

use Core\Traits\JsonTrait;

/**
 * @method void jsonResponse(midex $data, int $code = 200)
 */
class DefaultController{
    use JsonTrait;
}