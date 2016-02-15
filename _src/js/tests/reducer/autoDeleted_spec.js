import {assert} from 'chai';
import reducer from '../../constructor/reducers/reducer.js';
import dv from '../../constructor/util/dv.js';
import getTestState from '../test-state.js';
import _ from 'underscore';

describe('populate auto deleted products', () => {
    it ('popuplate and restore deleted', () => {
        let state = reducer({}, {
            type: 'SET_STATE',
            data: getTestState()
        });

        let stateAfterFirstChange = reducer(state, {
            type: 'CONTROL_CHANGES',
            value: 1,
            control: {id: 'who-children'}
        });

        assert.equal(stateAfterFirstChange.controls['who-children'].userValue, 1);

        let stateAfterSecondChange = reducer(stateAfterFirstChange, {
            type: 'CONTROL_CHANGES',
            value: 0,
            control: {id: 'who-children'}
        });

        assert.equal(stateAfterSecondChange.controls['who-children'].userValue, 0);
        assert.deepEqual(stateAfterSecondChange.deleted.auto, { 3: 1, 4: 1 });
        
        let stateAfterRestore = reducer(stateAfterSecondChange, {
            type: 'DELETED_RESTORED',
            listType: 'auto',
            id: 3, 
            product: {
                'id': 3,
                'price': 503,
                'clientsNumber': 2,
                'types': [3,4,5],
                'originalQuantity': 1,
                'clients': [2],
                'quantity': 1,
                'hidden': false
            }
        });

        assert.deepEqual(stateAfterRestore.deleted.auto, { 4: 1 });
        assert.deepEqual(stateAfterRestore.deleted.user, {});
        assert.deepEqual(stateAfterRestore.userQuantities, { 3: 1});
        assert.deepEqual(_.pluck(stateAfterRestore.currentProducts, 'id'), [1,2,3]);
    });
});