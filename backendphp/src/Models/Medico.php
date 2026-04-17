<?php

declare(strict_types=1);

namespace App\Models;

use InvalidArgumentException;

final class Medico
{
    public static function validate(array $data): array
    {
        $required = ["nome", "CRM", "UFCRM"];

        foreach ($required as $field) {
            if (!isset($data[$field]) || trim((string) $data[$field]) === "") {
                throw new InvalidArgumentException("Campo obrigatório ausente: {$field}");
            }
        }

        return [
            "nome" => trim((string) $data["nome"]),
            "CRM" => trim((string) $data["CRM"]),
            "UFCRM" => strtoupper(trim((string) $data["UFCRM"])),
        ];
    }
}
