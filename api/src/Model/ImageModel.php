<?php

namespace App\Model;

use Core\Model\DefaultModel;

/**
 * @method Image[] findAll()
 */
final class ImageModel extends DefaultModel
{
    protected string $table = "image";
    protected string $entity = "Image";
}