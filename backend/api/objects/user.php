<?php

class User {
    private $conn;
    private $table = 'user';

    public $id;
    public $firstname;
    public $lastname;
    public $email;
    public $password;
    public $avatar;

    public function __construct($DB) {
        $this->conn = $DB;
    }

    function read() {
        $query = 'SELECT * FROM '.$this->table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    function readOne() {
        $query = 'SELECT * FROM '.$this->table.' WHERE id = ?';

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->firstname = $row['firstname'];
        $this->lastname = $row['lastname'];
        $this->email = $row['email'];
        $this->password = $row['password'];
        $this->avatar = $row['avatar'];
    }

    function create() {
        $query = 'INSERT INTO '.$this->table.' SET firstname=:firstname, lastname=:lastname, email=:email, password=:password, avatar=:avatar';

        $stmt = $this->conn->prepare($query);

        $this->firstname = htmlspecialchars(strip_tags($this->firstname));
        $this->lastname = htmlspecialchars(strip_tags($this->lastname));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->password = htmlspecialchars(strip_tags($this->password));
        $this->avatar = htmlspecialchars(strip_tags($this->avatar));

        $stmt->bindParam(':firstname', $this->firstname);
        $stmt->bindParam(':lastname', $this->lastname);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':password', $this->password);
        $stmt->bindParam(':avatar', $this->avatar);

        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    function update() {
        $query = 'UPDATE '.$this->table.' SET firstname=:firstname, lastname=:lastname, email=:email, password=:password, avatar=:avatar WHERE id = :id';

        $stmt = $this->conn->prepare($query);

        $this->firstname = htmlspecialchars(strip_tags($this->firstname));
        $this->lastname = htmlspecialchars(strip_tags($this->lastname));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->password = htmlspecialchars(strip_tags($this->password));
        $this->avatar = htmlspecialchars(strip_tags($this->avatar));
        $this->id = htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(':firstname', $this->firstname);
        $stmt->bindParam(':lastname', $this->lastname);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':password', $this->password);
        $stmt->bindParam(':avatar', $this->avatar);
        $stmt->bindParam(':id', $this->id);

        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    function delete() {
        $query = 'DELETE FROM '.$this->table.' WHERE id = ?';

        $stmt = $this->conn->prepare($query);

        $this->id = htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(1, $this->id);

        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    function search($keywords) {
        $query = 'SELECT * FROM '.$this->table.' WHERE firstname LIKE ? OR lastname LIKE ? OR email LIKE ? ORDER BY firstname DESC';

        $stmt = $this->conn->prepare($query);

        $keywords = htmlspecialchars(strip_tags($keywords));
        $keywords = '%{$keywords}%';

        $stmt->bindParam(1, $keywords);
        $stmt->bindParam(2, $keywords);
        $stmt->bindParam(3, $keywords);

        $stmt->execute();

        return $stmt;
    }

    function emailExists() {
        $query = 'SELECT id, firstname, lastname, password, avatar FROM '.$this->table.' WHERE email = ? LIMIT 0, 1';

        $stmt = $this->conn->prepare($query);

        $this->email = htmlspecialchars(strip_tags($this->email));

        $stmt->bindParam(1, $this->email);

        $stmt->execute();

        $rows = $stmt->rowCount();

        if($rows > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $this->id = $row['id'];
            $this->firstname = $row['firstname'];
            $this->lastname = $row['lastname'];
            $this->password = $row['password'];
            $this->avatar = $row['avatar'];

            return true;
        }

        return false;
    }
}
