<!DOCTYPE html>
<html lang="ru">
	<head>
		<title></title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	</head>
	<body>
        <ul>
        <? foreach (glob('./*.php') as $file) { ?>
            <? if (basename($file) === 'index.php') continue; ?>
            <li><a href="<?=basename($file)?>"><?=basename($file)?></a></li>
        <? } ?>
        </ul>
	</body>
</html>
