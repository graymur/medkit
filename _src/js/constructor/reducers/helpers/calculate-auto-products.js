import _ from 'underscore';
//import objectAssignDeep from 'object-assign-deep';
import getActiveControls from './get-active-controls.js';
//import dv from './../../util/dv.js';

export default function calculateAutoProducts(products, state) {
    if (!state.controls) return products;

    let productsCount = {}; // всего количество каждого товара { id: кол-во }
    let clientsIdsByProductIds = {}; // люди для каждого товара: { id: [группа1 ... группаN] }
    let activeControls = getActiveControls(state);

    // выбираем только те контролы, которые нужно учесть:
    // 1. входящие в активную аптечку
    // 2. имеющие товары
    // 3. имеющие значение
    let controls = _.filter(state.controls, control => {
        return control.products && (control.defaultValue || control.userValue) && activeControls.indexOf(control.id) > -1;
    });

    controls.forEach(control => {
        if (!control.products || (!control.defaultValue && !control.userValue) || activeControls.indexOf(control.id) === -1) return false;

        // считаем кол-во людей для этого контрола
        let number = control.clients.reduce((sum, clientId) => {
            // по умолчанию кол-во людей = значение контрола
            let quantity = control.userValue || control.defaultValue;

            // если контрол - чекбокс, то ставим кол-во людей = значению главного слайдера,
            // который определяет кол-во людей этого типа, если такого
            // слайдера нет - 0
            if (control.type === 'checkbox') {
                quantity = state.mainSliderValues[clientId] || 0;
            }

            return sum + quantity;
        }, 0);

        control.products.forEach(productId => {
            // заполняем productsCount
            if (!productsCount[productId]) productsCount[productId] = 0;
            productsCount[productId] += number;

            // заполняем clientsIdsByProductIds
            if (!clientsIdsByProductIds[productId]) clientsIdsByProductIds[productId] = [];
            clientsIdsByProductIds[productId] = clientsIdsByProductIds[productId].concat(control.clients);
        });
    });

    let autoProducts = state.products.filter(product => {
        let retval = false;
        let idString = String(product.id);

        if (idString in productsCount) {
            retval = true;

            // устанавливаем кол-во товара: делим кол-во людей, установленных для этого товара, на кол-во людей,
            // на которых рассчитана единица товара
            product.originalQuantity = Math.ceil(productsCount[idString] / product.clientsNumber);
            product.clients = clientsIdsByProductIds[idString];
        }

        return retval;
    });

    return products.concat(autoProducts);
}