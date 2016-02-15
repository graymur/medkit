import store from '../store.js';

let state = store.getState();

store.subscribe(() => {
    state = store.getState();
});

export function getProducts() {
    return state.products || [];
}

export function getCurrentProducts() {
    return state.currentProducts || [];
}

export function getActiveKit() {
    return state.activeKit;
}

export function getDeleted() {
    return state.deleted;
}
