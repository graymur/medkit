import $ from 'jquery';

let oldIE = window.navigator.userAgent.indexOf('MSIE ');
let newIE = window.navigator.userAgent.indexOf('Trident/');
let msIE = oldIE > -1 || newIE > -1;

if (msIE) {
    $('HTML').addClass('ie');
}