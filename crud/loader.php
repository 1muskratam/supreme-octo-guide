<?php
    $db = mysqli_connect('localhost','root','','dance');
    if($db == null){
        echo "Вы не подключились";
    }
    $name = $_POST["name"];
    $number = $_POST["number"];
    $email = $_POST["email"];
    $price = $_POST["price"];
    $teacher = $_POST["teacher"];
    $table = mysqli_query($db,"SELECT * FROM `users`");
    $table = mysqli_fetch_all($table);
    if($table == NULL) mysqli_query($db, "ALTER TABLE `users` AUTO_INCREMENT = 0;");
    if($name != NULL && $number != NULL && $email != NULL){
        mysqli_query($db,"INSERT INTO `users`(`name`,`number`,`email`,`teacher`,`price`) VALUES ('$name','$number','$email','$teacher','$price')"); 
    }
    header('location: ../index.php');
?>
