<?php

declare(strict_types=1);

require_once __DIR__ . "/../vendor/autoload.php";

use App\Config\Env;
use App\Controllers\MedicoController;
use App\Database\Connection;
use App\Repositories\MedicoRepository;
use App\Routes\Router;
use App\Services\MedicoService;

$config = Env::load();
$connection = Connection::create($config);
$medicoRepository = new MedicoRepository($connection);
$medicoService = new MedicoService($medicoRepository);
$medicoController = new MedicoController($medicoService);

return new Router($medicoController);
