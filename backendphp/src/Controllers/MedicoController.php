<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Services\MedicoService;
use InvalidArgumentException;
use Throwable;

final class MedicoController
{
    public function __construct(private readonly MedicoService $medicoService)
    {
    }

    public function index(): void
    {
        $this->sendJson($this->medicoService->findAll(), 200);
    }

    public function store(array $payload): void
    {
        try {
            $this->medicoService->create($payload);
            $this->sendJson(["message" => "Médico criado com sucesso"], 201);
        } catch (InvalidArgumentException $exception) {
            $this->sendJson(["error" => $exception->getMessage()], 422);
        } catch (Throwable $exception) {
            $this->sendJson(["error" => "Erro interno ao criar médico."], 500);
        }
    }

    private function sendJson(array $data, int $statusCode): void
    {
        http_response_code($statusCode);
        header("Content-Type: application/json; charset=utf-8");
        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }
}
