<?php

namespace App\Model;

use Core\Model\DefaultModel;

/**
 * @method User[] findAll()
 */
final class UserModel extends DefaultModel
{
    protected string $table = "user";
    protected string $entity = "User";
}