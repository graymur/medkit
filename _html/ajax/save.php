<?php

$products = json_decode($_POST['dump']);

if (@$_POST['type'] == 'email')
{
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(array('success' => true));
}
else
{
    header('Content-Type: text/html; charset=UTF-8');

    echo '<pre>';
    print_r($products);
    echo '</pre>';
}