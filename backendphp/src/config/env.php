<?php

declare(strict_types=1);

namespace App\Config;

final class Env
{
    public static function load(): array
    {
        return [
            "DB_HOST" => getenv("DB_HOST") ?: "127.0.0.1",
            "DB_PORT" => getenv("DB_PORT") ?: "3306",
            "DB_NAME" => getenv("DB_NAME") ?: "aplis",
            "DB_USER" => getenv("DB_USER") ?: "root",
            "DB_PASSWORD" => getenv("DB_PASSWORD") ?: "",
        ];
    }
}
