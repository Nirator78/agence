<?php
namespace App\Entity;

use JsonSerializable;

class Client implements JsonSerializable {

    private int $id;

    private string $company;

    private string $apikey;

    /**
     * Get the value of id
     *
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * Get the value of company
     *
     * @return string
     */
    public function getCompany(): string
    {
        return $this->company;
    }

    /**
     * Set the value of company
     *
     * @param string $company
     *
     * @return self
     */
    public function setCompany(string $company): self
    {
        $this->company = $company;

        return $this;
    }

    /**
     * Get the value of apikey
     *
     * @return string
     */
    public function getApikey(): string
    {
        return $this->apikey;
    }

    /**
     * Set the value of apikey
     *
     * @param string $apikey
     *
     * @return self
     */
    public function setApikey(string $apikey): self
    {
        $this->apikey = $apikey;

        return $this;
    }

    public function jsonSerialize(): mixed
    {
        return [
            "apikey" => $this->getApikey()
        ];
    }
}