<!DOCTYPE html>
<html lang="ru">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta charset="UTF-8">
    <title>Штада аптечка</title>
    <link rel="stylesheet" href="../css/constructor.css?<?=filemtime('../css/constructor.css')?>">
    <?/*<link rel="stylesheet" href="../css/constructor.css?<?=filemtime('../css/constructor.css')?>">*/?>
    <script src="../js/modernizr.js?<?=filemtime('../js/modernizr.js')?>"></script>
    <meta name="viewport" content="width=1024">
</head>
<body>
<div id="constructor" class="constructor" data-url="./_html/ajax/constructor.json.php"></div>
<script>window.data = <? include 'ajax/constructor.json.php' ?>;</script>
<!--<script src="../js/ie11.js"></script>-->
<?/*<script src="../js/constructor.js?<?=filemtime('../js/constructor.js')?>"></script>*/?>
<script src="../js/constructor.js?<?=md5(microtime())?>"></script>
</body>

</html>