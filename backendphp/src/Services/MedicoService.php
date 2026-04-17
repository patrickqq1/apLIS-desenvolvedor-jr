<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Medico;
use App\Repositories\MedicoRepository;

final class MedicoService
{
    public function __construct(private readonly MedicoRepository $medicoRepository)
    {
    }

    public function create(array $medico): array
    {
        $validatedMedico = Medico::validate($medico);
        return $this->medicoRepository->create($validatedMedico);
    }

    public function findAll(): array
    {
        return $this->medicoRepository->findAll();
    }
}
