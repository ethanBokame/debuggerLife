<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    
    <style>
        
        body {
            display: flex;
            gap: 30px;
        }
        
        .container {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 20px;
            background-color: magenta;
            width: 100px;
        }
        
    </style>
    
</head>

<body>
    
    <?php
    $title_array = ["Introduction à l'économie des ressources naturelles", "Histoire", "Anglais"];
    
    for ($i = 0; $i < count($title_array); $i++) {
    ?>
        <div class="container">
            
            <p class="chapitre">
                <?php echo "chapitre " . $i + 1 ?>
            </p>
            
            <p class="titre">
                <?php echo $title_array[$i] ?>
            </p>
            
        </div>
    <?php
    }
    ?>
    
</body>

</html>