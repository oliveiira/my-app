<?php

error_reporting(E_ALL);
date_default_timezone_set('America/Sao_Paulo');

$key = 'myappkey';
$issued_at = time();
$expiration_time = $issued_at + (60 * 60);
$issuer = 'http://localhost/backend/';
