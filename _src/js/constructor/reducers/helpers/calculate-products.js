import _ from 'underscore';
//import objectAssignDeep from 'object-assign-deep';
import calculateAutoProducts from './calculate-auto-products.js';
//import dv from './../../util/dv.js';

export default function calculateProducts(state) {
    let products = [];
    let deleted = _.keys(state.deleted.user);

    products = calculateAutoProducts(products, state);

    // добавляем товары, которые пользователь добавил из рекомендованных
    if (state.addedRecommended && state.addedRecommended.length > 0) {
        state.addedRecommended.forEach(id => {
            let product = findProduct(state.products, id);
            product.recommended = true;
            products.push(product);
        });
    }

    // добавляем товары, удаленные автоматически,
    // но для которых пользователь установил свое кол-во
    _.map(state.userQuantities, (quantity, productId) => {
        let product = findProduct(products, productId);
        if (product) return false;

        product = findProduct(state.products, productId);
        product.originalQuantity = 0;
        products.push(product);
    });

    // добавляем товары, добавленные пользователем
    if (state.customProducts && state.customProducts.length > 0) {
        state.customProducts.forEach(id => {
            let product = findProduct(state.products, id);
            products.push(product);
        });
    }

    // проверяем, нет ли товара в удаленных
    products = products.filter(product => {
        return deleted.indexOf(String(product.id)) === -1;
    });

    products = products.map(product => {
        // проверяем, не установил ли пользователь свое кол-во для этого товара
        if (typeof product.originalQuantity === 'undefined') {
            product.originalQuantity = 1;
        }

        product.quantity = state.userQuantities[product.id] || product.originalQuantity;

        // проверяем, не скрыт ли товар текущим фильтром
        product.hidden = state.hiddenProducts.indexOf(product.id) > -1;

        // failsafe
        if (!product.clients) product.clients = [];

        return product;
    });

    return products;
}

function findProduct(products, id) {
    let filtered = products.filter(products => String(products.id) === String(id));
    return filtered.length ? filtered[0] : false;
}

