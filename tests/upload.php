<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>

    <?php
    if (isset($_FILES["pic"])) {
        print_r($_FILES["pic"]);
        $dir = "../image/debug_picture/";

        $path = $dir . "2_" . $_FILES["pic"]["name"];
    
        echo "Chemin complet: " . $path;
    
        move_uploaded_file($_FILES["pic"]["tmp_name"], $path);
    }

    ?>

    <form action="" method="post" enctype="multipart/form-data">
        <input type="file" name="pic" id="">
        <input type="submit" value="drop">
    </form>
</body>

</html>