<?php

declare(strict_types=1);

namespace App\Database;

use PDO;
use PDOException;
use RuntimeException;

final class Connection
{
    public static function create(array $config): PDO
    {
        $dsn = sprintf(
            "mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4",
            $config["DB_HOST"],
            $config["DB_PORT"],
            $config["DB_NAME"]
        );

        try {
            return new PDO(
                $dsn,
                $config["DB_USER"],
                $config["DB_PASSWORD"],
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                ]
            );
        } catch (PDOException $exception) {
            throw new RuntimeException("Falha ao conectar no banco de dados.", 0, $exception);
        }
    }
}
