import addCustom from './helpers/add-custom.js';
import changeKit from './helpers/change-kit.js';
import listFilterChange from './helpers/list-filter-change.js';

import calculateProducts from './helpers/calculate-products.js';
import _ from 'underscore';
import objectAssignDeep from 'object-assign-deep';

import dv from './../util/dv.js';

const defaultState = {
    currentProducts: [], // товары в аптечке
    mainSliderValues: {}, // значения слайдеров из первого фильтра, влияют на остальные слайдеры
    deleted: { // удаленный товары
        auto: {}, // пользователем
        user: {} // автоматически
    },
    userQuantities: {}, // кол-ва товаров, установленные пользователем
    listFilterValues: {}, // значения фильтров списка
    hiddenProducts: [], // товары, скрытые фильтром
    addedRecommended: [], // товары, возвращенные пользователем из удаленных,
    customProducts: []
};

const defaultAction = {};

export default function reducer(state = defaultState, action = defaultAction) {
    let newState, recalculateProducts = false;

    switch(action.type) {

    /**
     * устанавливаем полное дерево данных, полученное либо из локального хранилища, либо с сервера
     */
        case 'SET_STATE':

            newState = objectAssignDeep({}, state, action.data);

            if (!newState.activeKit) {
                newState.activeKit = Object.keys(newState.kits)[0];
                //newState.activeKit = 2;
            }

            break;

    /**
     * смена типа аптечки через меню
     */
        case 'CHANGE_KIT':

            if (state.kits[action.number]) {

                newState = changeKit(state, action);

                //newState = objectAssignDeep({}, state, { activeKit: action.number });
                //
                //newState.currentProducts = [];
                //newState.mainSliderValues = {};
                //newState.deleted = {
                //    auto: {},
                //    user: {}
                //};
                //newState.userQuantities = {};
                //newState.listFilterValues = {};
                //newState.hiddenProducts = [];
                //newState.addedRecommended = [];
                //newState.customProducts = [];

                state.currentProducts = [];

                recalculateProducts = true;
            }

            break;

    /**
     * устанавливаем значение слайдера из первого фильтра, от которого будут зависеть остальные слайдеры
     * для этого же типа людей в последующих фильтрах
     */
        case 'SET_MAIN_RANGE_VALUE':

            newState = objectAssignDeep({}, state);

            action.clients.forEach(client => {
                newState.mainSliderValues[client] = action.value;
            });

            break;

    /**
     * изменено значение контрола
     */
        case 'CONTROL_CHANGES':

            newState = objectAssignDeep({}, state);

            newState.controls[action.control.id].userValue = action.value;

            recalculateProducts = true;

            break;

        case 'QUANTITY_CHANGED':

            newState = objectAssignDeep({}, state);

            if (action.quantity === 0) {
                delete newState.userQuantities[action.product.id];
            } else {
                newState.userQuantities[action.product.id] = action.quantity;
            }

            recalculateProducts = true;

            break;

        case 'PRODUCT_DELETED':

            newState = objectAssignDeep({}, state);

            if (action.product.recommended) {
                newState.addedRecommended = newState.addedRecommended.filter(id => id !== action.product.id);
                delete newState.userQuantities[action.product.id];
            } else {
                newState.deleted[action.listType][action.product.id] = action.product.quantity;
            }

            recalculateProducts = true;

            break;

        case 'DELETED_RESTORED':

            newState = objectAssignDeep({}, state);

            newState.userQuantities[action.product.id] = action.product.userQuantity || action.product.originalQuantity;

            delete newState.deleted[action.listType][action.product.id];

            recalculateProducts = true;

            break;

    /**
     * изменено значение фильтра списка
     * каждый фильтр соответствует массиву значений полю товара: state.currentProducts[filterType] = [],
     * например, фильтр "types" соответствует полю state.currentProducts.types = [int, int, int ...]
     */
        case 'LIST_FILTER_CHANGE':

            //newState = objectAssignDeep({}, state);
            //
            //let listFilterValues = newState.listFilterValues;
            //let hiddenProducts = newState.hiddenProducts;
            //
            //// обновляем значения фильтров
            //if (action.value) {
            //    listFilterValues[action.filterType] = action.value;
            //} else {
            //    delete listFilterValues[action.filterType];
            //}
            //
            //// обновляем переменную hiddenProducts, в которой хранятся id скрытых товаров
            //newState.hiddenProducts = state.currentProducts.reduce((curry, el) => {
            //    // массив, хранящий true/false для каждого фильтра
            //    let condition = [];
            //
            //    // проходим по всем фильтрам, проверяем, соответствует ли товар каждому из них
            //    // если соотвествует, добавляем в condition true, если не соответствует - false
            //    for (let filterType in listFilterValues) {
            //        if (filterType in el) {
            //            condition.push(el[filterType].indexOf(listFilterValues[filterType]) > -1);
            //        } else {
            //            condition.push(false);
            //        }
            //    }
            //
            //    // если в conditions есть хотя бы один false - товар не соответствует фильтру,
            //    // добавляем его id в hiddenProducts
            //    if (condition.indexOf(false) !== -1) {
            //        if (hiddenProducts.indexOf(el.id) === -1) {
            //            hiddenProducts.push(el.id);
            //        }
            //        // если conditions содержит только true, убираем id товара из hiddenProducts, если оно там есть
            //    } else {
            //        hiddenProducts = hiddenProducts.filter(function (hiddenId) {
            //            return hiddenId != el.id;
            //        });
            //    }
            //
            //    return hiddenProducts;
            //}, hiddenProducts);

            newState = listFilterChange(state, action);

            recalculateProducts = true;

            break;

        case 'ADD_CUSTOM':

            newState = addCustom(state, action);

            //newState = objectAssignDeep({}, state);
            //
            //action.products.forEach(product => {
            //    // do not add empty products
            //    if (product.title.length === 0) return false;
            //
            //    product.custom = true;
            //
            //    if (!product.id) {
            //        product.id = generateId();
            //    }
            //
            //    if (!product.originalQuantity) {
            //        product.originalQuantity = 1;
            //    }
            //
            //    product.types = [];
            //    product.clients = [];
            //
            //    newState.products.push(product);
            //    newState.customProducts.push(product.id);
            //});

            recalculateProducts = true;

            break;

        case 'ADD_RECOMMENDED':

            newState = objectAssignDeep({}, state);

            if (newState.addedRecommended.indexOf(action.product.id) === -1) {
                newState.userQuantities[action.product.id] = 1;
                newState.addedRecommended.push(action.product.id);

                recalculateProducts = true;
            }

            break;

        default:

            newState = objectAssignDeep({}, state);

            break;
    }

    // пересчитываем список товаров
    if (recalculateProducts) {
        newState.currentProducts = calculateProducts(newState);

        // синхронизируем список удаленных автоматически
        newState.currentProducts.forEach(product => {
            delete newState.deleted.auto[product.id];
        });

        // синхронизируем newState.userQuantities
        newState.currentProducts.forEach(product => {
            delete newState.deleted.auto[product.id];

            if (!newState.userQuantities[product.id]) return ;

            if (newState.userQuantities[product.id] === product.originalQuantity) {
                delete newState.userQuantities[product.id];
            }
        });

        // товары, удаленные автоматически
        let diff = _.difference(state.currentProducts, newState.currentProducts);

        if (diff.length) {
            diff.forEach(product => {
                if (typeof newState.deleted.user[product.id] === 'undefined' && !product.recommended) {
                    newState.deleted.auto[product.id] = product.quantity;
                }
            });
        }
    }

    return newState;
}
