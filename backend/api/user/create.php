<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Max-Age: 3600');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

include_once '../config/database.php';
include_once '../objects/user.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$data = json_decode(file_get_contents('php://input'));

include_once '../config/core.php';
include_once '../../vendor/firebase/php-jwt/src/BeforeValidException.php';
include_once '../../vendor/firebase/php-jwt/src/ExpiredException.php';
include_once '../../vendor/firebase/php-jwt/src/SignatureInvalidException.php';
include_once '../../vendor/firebase/php-jwt/src/JWT.php';
use \Firebase\JWT\JWT;

if(!empty($data->firstname) && !empty($data->lastname) && !empty($data->email) && !empty($data->password) && !empty($data->avatar)) {
    $user->firstname = $data->firstname;
    $user->lastname = $data->lastname;
    $user->email = $data->email;
    $user->password = $data->password;
    $user->avatar = $data->avatar;

    $token = array(
        'iat' => $issued_at,
        'exp' => $expiration_time,
        'iss' => $issuer,
        'data' => array(
            'id' => $user->id,
            'firstname' => $user->firstname,
            'lastname' => $user->lastname,
            'email' => $user->email
        )
    );

    if($user->create()) {
        http_response_code(201);

        $jwt = JWT::encode($token, $key);

        echo json_encode(array('message' => 'User was created.', 'token' => $jwt, 'avatar' => $user->avatar));
    } else {
        http_response_code(503);

        echo json_encode(array('message' => 'Unable to create user.'));
    }
} else {
    http_response_code(400);

    echo json_encode(array('message' => 'Unable to create user. Data is incomplete.'));
}
