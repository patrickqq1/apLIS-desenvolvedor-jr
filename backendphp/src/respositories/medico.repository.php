<?php

declare(strict_types=1);

namespace App\Repositories;

use PDO;

final class MedicoRepository
{
    public function __construct(private readonly PDO $connection)
    {
    }

    public function create(array $medico): array
    {
        $statement = $this->connection->prepare(
            "INSERT INTO medicos (nome, CRM, UFCRM) VALUES (:nome, :crm, :ufcrm)"
        );

        $statement->execute([
            "nome" => $medico["nome"],
            "crm" => $medico["CRM"],
            "ufcrm" => $medico["UFCRM"],
        ]);

        return [
            "id" => (int) $this->connection->lastInsertId(),
            ...$medico,
        ];
    }

    public function findAll(): array
    {
        $statement = $this->connection->query("SELECT id, nome, CRM, UFCRM FROM medicos");
        return $statement->fetchAll();
    }
}
