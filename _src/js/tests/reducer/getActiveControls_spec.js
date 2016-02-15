import {assert} from 'chai';
import getActiveControls from '../../constructor/reducers/helpers/get-active-controls.js';
import dv from '../../constructor/util/dv.js';
import getTestState from '../test-state.js';
import _ from 'underscore';

describe('getActiveControls', () => {
    it ('return list of active controls', () => {
        let state = getTestState();

        state.activeKit = 1;
        assert.deepEqual(getActiveControls(state), [ 'who-adults', 'who-children', 'dry-children', 'dry-mother' ]);

        state.activeKit = 2;
        assert.deepEqual(getActiveControls(state), [ 'who-2-adults', 'who-2-pensioners', 'heart-before-2', 'heart-after-2' ]);
    });
});