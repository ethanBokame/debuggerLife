<!DOCTYPE html>
<html lang="fr">
<head>
    
    <meta charset="UTF-8">
    <!--Zoom-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!--Base-->
    <?php 
    $base = $_SERVER["HTTP_HOST"] == "localhost" ? "http://localhost/debugger_life/" : '/';
    ?>
    <base href="<?= $base ?>">
    
    <!--Icon-->
    <link rel="shortcut icon" href="image/feather-pen.png" type="../image/x-icon">
    
    <!--Css-->
    <link rel="stylesheet" href="css/style.css?v=1">
    
    <!--Javascript-->
    <script src="js/script.js?v=1" defer></script>
    
    <!--tippy.js-->
    <script src="https://unpkg.com/@popperjs/core@2/dist/umd/popper.min.js"></script>
    <script src="https://unpkg.com/tippy.js@6/dist/tippy-bundle.umd.js"></script>

    <!--hightlight.js-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/php.min.js"></script>
    <script>hljs.highlightAll();</script>
    
    <!--font-->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Itim&display=swap" rel="stylesheet">
    
    <!--Titre-->
    <title>debuggerLife</title>
    
</head>