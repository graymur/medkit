import 'babel-es6-polyfill/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import store from './store.js';
import storage from './util/storage.js';
import Constructor from './components/Constructor.jsx';
import * as ie from './util/ie.js';

(function () {
    if (storage && storage.getItem('data')) {
        return Promise.resolve(JSON.parse(storage.getItem('data')));
    } else if (typeof window.data !== 'undefined') {
        return Promise.resolve(window.data);
    } else if ($('[data-url]').length) {
        return (new Promise(function (resolve, reject) {
            $.ajax({url: $('[data-url]').data('url')}).then(resolve, reject);
        }));
    } else {
        return Promise.reject();
    }
})().then(data => {
    store.dispatch({ type: 'SET_STATE', data });

    store.subscribe(() => {
        if (storage) {
            // try/catch to fix Safari on iPad: http://stackoverflow.com/a/14555361/1240240
            try {
                storage.setItem('data', JSON.stringify(store.getState()));
            } catch (error) {

            }
        }
    });

    ReactDOM.render(
        <Constructor {...store.getState()}/>,
        document.getElementById('constructor')
    );
})
.catch(error => {
    console.error(error);
        alert(error.toString());

    ReactDOM.render(
        <h1 className="fatal-error">Что-то пошло не так :(</h1>,
        document.getElementById('constructor')
    );
});
