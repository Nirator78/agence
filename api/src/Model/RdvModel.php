<?php

namespace App\Model;

use Core\Model\DefaultModel;

/**
 * @method Rdv[] findAll()
 */
final class RdvModel extends DefaultModel
{
    protected string $table = "rdv";
    protected string $entity = "Rdv";
}