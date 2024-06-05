<?php
    $db = mysqli_connect('localhost','root','','dance');
    if($db == null){
        echo "Вы не подключились";
    }
    $name = $_POST["name"];
    $number = $_POST["number"];
    $free = mysqli_query($db,"SELECT * FROM `freeLesson`");
    $free = mysqli_fetch_all($free);
    if($free == NULL) mysqli_query($db, "ALTER TABLE `freeLesson` AUTO_INCREMENT = 0;");
    if($name != NULL && $number != NULL){
        mysqli_query($db,"INSERT INTO `freeLesson`(`name`,`number`) VALUES ('$name','$number')"); 
    }
    header('location: ../index.php');
?>
