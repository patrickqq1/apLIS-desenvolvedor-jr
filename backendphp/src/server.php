<?php

declare(strict_types=1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if (($_SERVER["REQUEST_METHOD"] ?? "GET") === "OPTIONS") {
    http_response_code(204);
    exit;
}

$router = require __DIR__ . "/app.php";
$router->handle($_SERVER["REQUEST_METHOD"] ?? "GET", $_SERVER["REQUEST_URI"] ?? "/");
