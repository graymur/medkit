import objectAssignDeep from 'object-assign-deep';
import generateId from '../../util/generate-id.js';

export default function addCustom(state, action) {
    let newState = objectAssignDeep({}, state);

    action.products.forEach(product => {
        // do not add empty products
        if (product.title.length === 0) return false;

        product.custom = true;

        if (!product.id) {
            product.id = generateId();
        }

        if (!product.originalQuantity) {
            product.originalQuantity = 1;
        }

        product.types = [];
        product.clients = [];

        newState.products.push(product);
        newState.customProducts.push(product.id);
    });

    return newState;
}