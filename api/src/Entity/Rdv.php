<?php

namespace App\Entity;
use JsonSerializable;

class Rdv implements JsonSerializable 
{
    private int $id;
    private string $date;
    private int $user_id;
    private int $bien_id;
    private string $status;
    private string $email;
    
    /**
     * Get the value of id
     */ 
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Get the value of date
     */ 
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Set the value of date
     *
     * @return  self
     */ 
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get the value of user_id
     */ 
    public function getUser_id()
    {
        return $this->user_id;
    }

    /**
     * Set the value of user_id
     *
     * @return  self
     */ 
    public function setUser_id($user_id)
    {
        $this->user_id = $user_id;

        return $this;
    }

    /**
     * Get the value of bien_id
     */ 
    public function getBien_id()
    {
        return $this->bien_id;
    }

    /**
     * Set the value of bien_id
     *
     * @return  self
     */ 
    public function setBien_id($bien_id)
    {
        $this->bien_id = $bien_id;

        return $this;
    }

    /**
     * Get the value of status
     */ 
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set the value of status
     *
     * @return  self
     */ 
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }
    
    public function jsonSerialize(): mixed{
        return [
            "id" => $this->getId(),
            "date" => $this->getDate(),
            "bien_id" => $this->getBien_id(),
            "user_id" => $this->getUser_id(),
            "status" => $this->getStatus()
        ];
    }
}