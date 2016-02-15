<?php

$basePath = realpath(dirname(__FILE__) . '/../../');

if (file_exists('../../../lib/lib_common.php'))
{
    include_once '../../../lib/lib_common.php';
}

function uid()
{
    $string = md5(uniqid(microtime() . rand(1000, 9999), true) . uniqid(microtime() . rand(1000, 9999), true));
    return substr($string, rand(1, 25), 5);
}

$data = array (
    'siteMenu' => array(
        array('link' => '#/1', 'title' => 'Главная'),
        array('link' => '#/2', 'title' => 'Кому и зачем нужна аптечка'),
        array('link' => '#/3', 'title' => 'Как хранить аптечку'),
        array('link' => '#/4', 'title' => 'Советы врачей'),
    ),
    'productsTypes' => require "$basePath/_temp/products-types.php",
    'products' => require "$basePath/_temp/products-2.php",
    'kits' => array(
        1 => array('id' => 1, 'title' => 'Дом', 'recommended' => array(54, 55)),
        2 => array('id' => 2, 'title' => 'Офис', 'recommended' => array()),
//        3 => array('id' => 3, 'title' => 'Отпуск', 'recommended' => array()),
//        4 => array('id' => 4, 'title' => 'Дача', 'recommended' => array()),
//        5 => array('id' => 5, 'title' => 'Активный отдых', 'recommended' => array()),
        6 => array('id' => 6, 'title' => 'Беременная и младенец', 'recommended' => array()),
    ),
    'clients' => array(
        1 => array('id' => 1, 'title' => 'Взрослый'),
        2 => array('id' => 2, 'title' => 'Ребенок (от 2-х до 12 лет)'),
        3 => array('id' => 3, 'title' => 'Младенец (до 2-х лет)'),
        4 => array('id' => 4, 'title' => 'Пенсионер'),
        5 => array('id' => 5, 'title' => 'Беременная'),
    ),
    'controls' => require("$basePath/_temp/filter-controls.php"),
    'filters' => require "$basePath/_temp/filters.php",
    'saveLinks' => array(
        array('link' => 'http://piluli.ru', 'image' => '../img/piluli.ru.png'),
        array('link' => 'http://apteka.ru', 'image' => '../img/apteka.ru.png'),
        array('link' => 'http://apteki.su', 'image' => '../img/apteki.su.png'),
    ),
    'saveFormAction' => '/_html/ajax/save.php'
);

if ($_SERVER['PHP_SELF'] === '/_html/ajax/constructor.json.php')
{
    header('Content-Type: application/json; charset=UTF-8');
}

if (defined('JSON_UNESCAPED_UNICODE'))
{
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
}
else
{
    echo json_encode($data);
}

















//    'kits' =>
//        array (
//            'Для дома' =>
//                array (
//                    0 => 1,
//                    1 => 2,
//                    2 => 3,
//                    3 => 4,
//                    4 => 5,
//                    5 => 6,
//                    6 => 7,
//                    7 => 8,
//                    8 => 9,
//                    9 => 10,
//                    10 => 11,
//                    11 => 12,
//                    12 => 13,
//                    13 => 14,
//                    14 => 15,
//                    15 => 16,
//                    16 => 17,
//                    17 => 18,
//                    18 => 19,
//                    19 => 20,
//                    20 => 21,
//                    21 => 22,
//                    22 => 23,
//                    23 => 24,
//                    24 => 25,
//                    25 => 26,
//                    26 => 27,
//                    27 => 28,
//                    28 => 29,
//                    29 => 30,
//                    30 => 31,
//                    31 => 32,
//                    32 => 33,
//                ),
//            'Для дачи' =>
//                array (
//                    0 => 12,
//                    1 => 10,
//                    2 => 11,
//                    3 => 20,
//                    4 => 18,
//                    5 => 3,
//                    6 => 4,
//                    7 => 9,
//                    8 => 34,
//                    9 => 7,
//                    10 => 35,
//                    11 => 19,
//                    12 => 13,
//                    13 => 15,
//                    14 => 16,
//                    15 => 21,
//                    16 => 17,
//                    17 => 36,
//                    18 => 23,
//                    19 => 24,
//                    20 => 25,
//                    21 => 26,
//                    22 => 27,
//                    23 => 28,
//                    24 => 29,
//                    25 => 30,
//                    26 => 31,
//                    27 => 32,
//                    28 => 33,
//                    29 => 37,
//                    30 => 38,
//                    31 => 39,
//                ),
//            'Для отпуска' =>
//                array (
//                    0 => 11,
//                    1 => 12,
//                    2 => 40,
//                    3 => 20,
//                    4 => 18,
//                    5 => 3,
//                    6 => 4,
//                    7 => 9,
//                    8 => 41,
//                    9 => 42,
//                    10 => 34,
//                    11 => 43,
//                    12 => 35,
//                    13 => 44,
//                    14 => 13,
//                    15 => 15,
//                    16 => 16,
//                    17 => 21,
//                    18 => 17,
//                    19 => 36,
//                    20 => 23,
//                    21 => 24,
//                    22 => 26,
//                    23 => 27,
//                    24 => 28,
//                    25 => 29,
//                    26 => 37,
//                    27 => 32,
//                    28 => 33,
//                    29 => 39,
//                ),
//            'Для активного отдыха/спортсмену' =>
//                array (
//                    0 => 45,
//                    1 => 5,
//                    2 => 46,
//                    3 => 21,
//                    4 => 47,
//                    5 => 48,
//                    6 => 49,
//                    7 => 50,
//                    8 => 51,
//                    9 => 24,
//                    10 => 38,
//                ),
//            'В офис' =>
//                array (
//                    0 => 52,
//                    1 => 12,
//                    2 => 11,
//                    3 => 18,
//                    4 => 20,
//                    5 => 53,
//                    6 => 21,
//                    7 => 17,
//                    8 => 3,
//                    9 => 4,
//                    10 => 9,
//                    11 => 34,
//                    12 => 43,
//                    13 => 35,
//                    14 => 19,
//                    15 => 13,
//                    16 => 15,
//                    17 => 16,
//                    18 => 26,
//                    19 => 27,
//                    20 => 28,
//                    21 => 29,
//                    22 => 37,
//                    23 => 33,
//                ),
//        ),