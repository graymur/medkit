import {assert} from 'chai';
import calculateAutoProducts from '../../constructor/reducers/helpers/calculate-auto-products.js';
import dv from '../../constructor/util/dv.js';
import getTestState from '../test-state.js';
import _ from 'underscore';

describe('calculateAutoProducts', () => {
    it ('calculate', () => {
        let state = getTestState();

        var products = calculateAutoProducts([], state);
        assert.deepEqual(_.pluck(products, 'id'), [1,2]);
    });

    it ('calculate', () => {
        let state = getTestState();

        state.controls['who-adults'].userValue = 5;
        state.controls['who-children'].userValue = 1;

        var products = calculateAutoProducts([], state);

        assert.deepEqual(_.pluck(products, 'id'), [1,2,3,4]);
        assert.equal(products[0].originalQuantity, 2);
        assert.equal(products[2].originalQuantity, 1);
    });

    it ('calculate', () => {
        let state = getTestState();
        state.activeKit = 2;

        var products = calculateAutoProducts([], state);

        assert.deepEqual(_.pluck(products, 'id'), [10,11]);
    });

    it ('calculate', () => {
        let state = getTestState();
        state.activeKit = 2;

        state.controls['who-2-pensioners'].userValue = 1;

        var products = calculateAutoProducts([], state);

        assert.deepEqual(_.pluck(products, 'id'), [10,11,12,13]);
    });

    it ('calculate', () => {
        let state = getTestState();
        state.activeKit = 2;

        state.controls['heart-before-2'].userValue = 1;

        state.controls['who-2-adults'].userValue = 10;
        state.mainSliderValues[1] = 10;

        var products = calculateAutoProducts([], state);

        assert.deepEqual(_.pluck(products, 'id'), [10,11,14,15]);

        assert.equal(products[0].originalQuantity, 4);
        assert.equal(products[1].originalQuantity, 5);
        assert.equal(products[2].originalQuantity, 2);
        assert.equal(products[3].originalQuantity, 2);
    });

    it ('calculate', () => {
        let state = getTestState();
        state.activeKit = 2;

        state.controls['heart-before-2'].userValue = 1;

        state.controls['who-2-adults'].userValue = 10;
        state.mainSliderValues[1] = 10;

        state.controls['who-2-pensioners'].userValue = 5;
        state.mainSliderValues[4] = 5;

        var products = calculateAutoProducts([], state);

        assert.deepEqual(_.pluck(products, 'id'), [10,11,12,13,14,15]);

        assert.equal(products[0].originalQuantity, 4);
        assert.equal(products[1].originalQuantity, 5);
        assert.equal(products[2].originalQuantity, 3);
        assert.equal(products[3].originalQuantity, 2);
        assert.equal(products[4].originalQuantity, 3);
        assert.equal(products[5].originalQuantity, 3);
    });
});