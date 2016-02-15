import objectAssignDeep from 'object-assign-deep';

export default function changeKit(state, action) {
    let newState = objectAssignDeep({}, state, { activeKit: action.number });

    newState.currentProducts = [];
    newState.mainSliderValues = {};
    newState.deleted = {
        auto: {},
        user: {}
    };

    newState.userQuantities = {};
    newState.listFilterValues = {};
    newState.hiddenProducts = [];
    newState.addedRecommended = [];
    newState.customProducts = [];

    return newState;
}