//import dv from '../../util/dv.js';
import _ from 'underscore';

export default function getActiveControls(state) {
    return getActiveControlsRecur(state.filters[state.activeKit], []);
}

function getActiveControlsRecur(branch, accumulator) {
    branch.forEach(element => {
        if (element.controls) {
            accumulator = accumulator.concat(_.pluck(element.controls, 'id'));
        } else if (element.children) {
            accumulator = getActiveControlsRecur(element.children, accumulator);
        }
    });

    return accumulator;
}