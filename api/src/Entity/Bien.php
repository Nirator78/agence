<?php

namespace App\Entity;
use JsonSerializable;

use App\Model\ImageModel;

class Bien implements JsonSerializable 
{
    private int $id;
    private string $titre;
    private string $description;
    private string $type_achat;
    private string $type_bien;
    private int $prix;
    private float $superficie;
    private int $nbPiece;
    private bool $piscine;
    private bool $balcon;
    private bool $terrasse;
    private bool $cheminee;
    private ?int $user_id;

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
     * Get the value of titre
     */ 
    public function getTitre()
    {
        return $this->titre;
    }

    /**
     * Set the value of titre
     *
     * @return  self
     */ 
    public function setTitre($titre)
    {
        $this->titre = $titre;

        return $this;
    }

    /**
     * Get the value of description
     */ 
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set the value of description
     *
     * @return  self
     */ 
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get the value of type_achat
     */ 
    public function getType_achat()
    {
        return $this->type_achat;
    }

    /**
     * Set the value of type_achat
     *
     * @return  self
     */ 
    public function setType_achat($type_achat)
    {
        $this->type_achat = $type_achat;

        return $this;
    }

    /**
     * Get the value of type_bien
     */ 
    public function getType_bien()
    {
        return $this->type_bien;
    }

    /**
     * Set the value of type_bien
     *
     * @return  self
     */ 
    public function setType_bien($type_bien)
    {
        $this->type_bien = $type_bien;

        return $this;
    }

    /**
     * Get the value of prix
     */ 
    public function getPrix()
    {
        return $this->prix;
    }

    /**
     * Set the value of prix
     *
     * @return  self
     */ 
    public function setPrix($prix)
    {
        $this->prix = $prix;

        return $this;
    }

    /**
     * Get the value of superficie
     */ 
    public function getSuperficie()
    {
        return $this->superficie;
    }

    /**
     * Set the value of superficie
     *
     * @return  self
     */ 
    public function setSuperficie($superficie)
    {
        $this->superficie = $superficie;

        return $this;
    }

    /**
     * Get the value of nbPiece
     */ 
    public function getNbPiece()
    {
        return $this->nbPiece;
    }

    /**
     * Set the value of nbPiece
     *
     * @return  self
     */ 
    public function setNbPiece($nbPiece)
    {
        $this->nbPiece = $nbPiece;

        return $this;
    }

    /**
     * Get the value of piscine
     */ 
    public function getPiscine()
    {
        return $this->piscine;
    }

    /**
     * Set the value of piscine
     *
     * @return  self
     */ 
    public function setPiscine($piscine)
    {
        $this->piscine = $piscine;

        return $this;
    }

    /**
     * Get the value of balcon
     */ 
    public function getBalcon()
    {
        return $this->balcon;
    }

    /**
     * Set the value of balcon
     *
     * @return  self
     */ 
    public function setBalcon($balcon)
    {
        $this->balcon = $balcon;

        return $this;
    }

    /**
     * Get the value of terrasse
     */ 
    public function getTerrasse()
    {
        return $this->terrasse;
    }

    /**
     * Set the value of terrasse
     *
     * @return  self
     */ 
    public function setTerrasse($terrasse)
    {
        $this->terrasse = $terrasse;

        return $this;
    }

    /**
     * Get the value of cheminee
     */ 
    public function getCheminee()
    {
        return $this->cheminee;
    }

    /**
     * Set the value of cheminee
     *
     * @return  self
     */ 
    public function setCheminee($cheminee)
    {
        $this->cheminee = $cheminee;

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
    
    public function jsonSerialize(): mixed{
        $imageModel = new ImageModel();

        return [
            "id" => $this->getId(),
            "titre" => $this->getTitre(),
            "description" => $this->getDescription(),
            "type_achat" => $this->getType_achat(),
            "type_bien" => $this->getType_bien(),
            "prix" => $this->getPrix(),
            "superficie" => $this->getSuperficie(),
            "nbPiece" => $this->getNbPiece(),
            "piscine" => $this->getPiscine(),
            "balcon" => $this->getBalcon(),
            "terrasse" => $this->getTerrasse(),
            "cheminee" => $this->getCheminee(),
            "images" => $imageModel->findImageByBien($this->getId()),
            "user_id" => $this->getUser_id()
        ];
    }
}