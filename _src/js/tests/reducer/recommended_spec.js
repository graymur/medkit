import {assert} from 'chai';
import reducer from '../../constructor/reducers/reducer.js';
import dv from '../../constructor/util/dv.js';
import getTestState from '../test-state.js';
import _ from 'underscore';

describe('handle recommended products', () => {
    it ('add recommended', () => {
        let state = reducer({}, {
            type: 'SET_STATE',
            data: getTestState()
        });

        let stateAfterAdd = reducer(state, {
            type: 'ADD_RECOMMENDED',
            product: {id: 55 }
        });

        assert.deepEqual(stateAfterAdd.addedRecommended, [55]);

        let product = stateAfterAdd.currentProducts.filter(product => product.id === 55)[0];

        assert.equal(product.id, 55);
        assert.equal(product.recommended, true);
    });

    it ('delete recommended', () => {
        let state = reducer({}, {
            type: 'SET_STATE',
            data: getTestState()
        });

        let stateAfterAdd = reducer(state, {
            type: 'ADD_RECOMMENDED',
            product: { id: 55 }
        });

        let stateAfterDelete = reducer(stateAfterAdd, {
            type: 'PRODUCT_DELETED',
            product : {
                id: 55,
                recommended: true
            },
            listType: 'user'
        });

        assert.equal(stateAfterDelete.addedRecommended.length, 0);
        assert.equal(stateAfterDelete.userQuantities[55], undefined);
        assert.deepEqual(stateAfterDelete.deleted.user, {});
        assert.deepEqual(stateAfterDelete.deleted.auto, {});
    });
});