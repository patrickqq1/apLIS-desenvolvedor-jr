<?php

declare(strict_types=1);

require_once __DIR__ . "/../vendor/autoload.php";

/* 
O PSR-4 obriga que o namespace e a estrutura de pastas sejam correspondentes.
Por nomear as pastas e arquivo sem se atentar a isso a api php foi submetida totalmente quebrada.
*/ 
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
