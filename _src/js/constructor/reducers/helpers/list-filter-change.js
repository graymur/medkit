import objectAssignDeep from 'object-assign-deep';

export default function listFilterChange(state, action) {
    let newState = objectAssignDeep({}, state);

    let listFilterValues = newState.listFilterValues;
    let hiddenProducts = newState.hiddenProducts;

    // обновляем значения фильтров
    if (action.value) {
        listFilterValues[action.filterType] = action.value;
    } else {
        delete listFilterValues[action.filterType];
    }

    // обновляем переменную hiddenProducts, в которой хранятся id скрытых товаров
    newState.hiddenProducts = state.currentProducts.reduce((curry, el) => {
        // массив, хранящий true/false для каждого фильтра
        let condition = [];

        // проходим по всем фильтрам, проверяем, соответствует ли товар каждому из них
        // если соотвествует, добавляем в condition true, если не соответствует - false
        for (let filterType in listFilterValues) {
            if (filterType in el) {
                condition.push(el[filterType].indexOf(listFilterValues[filterType]) > -1);
            } else {
                condition.push(false);
            }
        }

        // если в conditions есть хотя бы один false - товар не соответствует фильтру,
        // добавляем его id в hiddenProducts
        if (condition.indexOf(false) !== -1) {
            if (hiddenProducts.indexOf(el.id) === -1) {
                hiddenProducts.push(el.id);
            }
            // если conditions содержит только true, убираем id товара из hiddenProducts, если оно там есть
        } else {
            hiddenProducts = hiddenProducts.filter(function (hiddenId) {
                return hiddenId != el.id;
            });
        }

        return hiddenProducts;
    }, hiddenProducts);

    return newState;
}