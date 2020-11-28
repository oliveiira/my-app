<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

include_once '../config/core.php';
include_once '../config/database.php';
include_once '../objects/user.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$keywords=isset($_GET['search']) ? $_GET['search'] : '';

$stmt = $user->search($keywords);
$rows = $stmt->rowCount();

if($rows > 0) {
    $users_arr = array();
    $users_arr['records'] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $user_item = array(
            'id' => $id,
            'firstname' => $firstname,
            'lastname' => $lastname,
            'email' => $email,
            'password' => $password,
            'avatar' => $avatar
        );

        array_push($users_arr['records'], $user_item);
    }

    http_response_code(200);

    echo json_encode($users_arr);
} else {
    http_response_code(404);

    echo json_encode(array('message' => 'No users found.'));
}
