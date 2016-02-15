import {assert} from 'chai';
import reducer from '../../constructor/reducers/reducer.js';
import getTestState from '../test-state.js';
import dv from '../../constructor/util/dv.js';

describe('reducer', () => {

    it ('add custom products to list', () => {
        let initialState = reducer({}, {
            type: 'SET_STATE',
            data: getTestState()
        });

        let action = {
            type: 'ADD_CUSTOM',
            products: [{
                id: 'one-id',
                title: 'one title',
                description: 'one description'
            },{
                id: 'two-id',
                title: 'two title',
                description: 'two description'
            },{
                id: 'three-id',
                title: 'three title',
                description: 'three description'
            }]
        };

        let stateAfterAdd = reducer(initialState, action);

        assert.deepEqual(stateAfterAdd.customProducts, ['one-id', 'two-id', 'three-id']);
        assert.equal(stateAfterAdd.products.length, initialState.products.length + action.products.length);
        assert.equal(stateAfterAdd.currentProducts.length, 5);
    });

    it ('skip empty products', () => {
        let initialState = reducer({}, {
            type: 'SET_STATE',
            data: getTestState()
        });

        let action = {
            type: 'ADD_CUSTOM',
            products: [{
                id: 'one-id',
                title: 'one title',
                description: 'one description'
            },{
                title: '',
                description: ''
            },{
                title: '',
                description: 'three description'
            }]
        };

        let stateAfterAdd = reducer(initialState, action);

        assert.deepEqual(stateAfterAdd.customProducts, ['one-id']);
        assert.equal(stateAfterAdd.products.length, initialState.products.length + 1);
        assert.equal(stateAfterAdd.currentProducts.length, 3);
    });
});