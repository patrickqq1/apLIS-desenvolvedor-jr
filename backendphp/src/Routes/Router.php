<?php

declare(strict_types=1);

namespace App\Routes;

use App\Controllers\MedicoController;

final class Router
{
    public function __construct(private readonly MedicoController $medicoController)
    {
    }

    public function handle(string $method, string $uri): void
    {
        $path = parse_url($uri, PHP_URL_PATH) ?? "/";

        if ($path === "/api/v1/medicos" && $method === "GET") {
            $this->medicoController->index();
            return;
        }

        if ($path === "/api/v1/medicos" && $method === "POST") {
            $payload = json_decode(file_get_contents("php://input") ?: "[]", true);
            $this->medicoController->store(is_array($payload) ? $payload : []);
            return;
        }

        http_response_code(404);
        header("Content-Type: application/json; charset=utf-8");
        echo json_encode(["error" => "Rota não encontrada"], JSON_UNESCAPED_UNICODE);
    }
}
