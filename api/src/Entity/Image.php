<?php

namespace App\Entity;
use JsonSerializable;

class Image implements JsonSerializable 
{
    private int $id;
    
    private string $url;

    private int $bien_id;

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
     * Get the value of url
     */ 
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * Set the value of url
     *
     * @return  self
     */ 
    public function setUrl($url)
    {
        $this->url = $url;

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
    
    public function jsonSerialize(): mixed{
        return [
            "id" => $this->getId(),
            "url" => $this->getUrl(),
            "bien_id" => $this->getBien_id()
        ];
    }
}