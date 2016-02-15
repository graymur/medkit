<?php

$basePath = realpath(dirname(__FILE__) . '/../');

if (file_exists('../../lib/lib_common.php'))
{
    include_once '../../lib/lib_common.php';
}

function uid()
{
    $string = md5(uniqid(microtime() . rand(1000, 9999), true) . uniqid(microtime() . rand(1000, 9999), true));
    return substr($string, rand(1, 25), 5);
}

$deleted = new stdClass();
$deleted->auto = new stdClass();
$deleted->user = new stdClass();

$data = array (
    'activeKit' =>  1,
    'currentProducts' => [],
    'mainSliderValues' => new stdClass(),
    'deleted' => $deleted,
    'userQuantities' => new stdClass(),
    'listFilterValues' =>  new stdClass(),
    'hiddenProducts' => [],
    'customProducts' => [],
    'addedRecommended' => [],
    'siteMenu' => array(
        array('link' => '#/1', 'title' => 'Ссылка 1'),
        array('link' => '#/2', 'title' => 'Ссылка 2'),
        array('link' => '#/3', 'title' => 'Ссылка 3'),
        array('link' => '#/4', 'title' => 'Ссылка 4'),
        array('link' => '#/5', 'title' => 'Ссылка 5'),
    ),
    'productsTypes' => require "$basePath/_temp/products-types.php",
    'products' => require "$basePath/_temp/products-2.php",
    'kits' => array(
        1 => 'Дом',
        2 => 'Офис',
        3 => 'Отпуск',
        4 => 'Дача',
        5 => 'Активный отдых',
        6 => 'Беременная и младенец',
    ),
    'clients' => array(
        1 => array('id' => 1, 'title' => 'Взрослый'),
        4 => array('id' => 4, 'title' => 'Пенсионер'),
        2 => array('id' => 2, 'title' => 'Ребенок (от 2-х до 12 лет)'),
        3 => array('id' => 3, 'title' => 'Младенец (до 2-х лет)'),
    ),
    'controls' => require("$basePath/_temp/filter-controls.php"),
    'filters' => require "$basePath/_temp/filters.php"
);

echo '<pre>';
echo "export default function getTestState () {
    return " . json_encode($data, JSON_UNESCAPED_UNICODE) . "
};";
echo '</pre>';
