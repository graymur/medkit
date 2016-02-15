import config from '../../config.js';

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import DeletedList from './DeletedList.jsx';

import $ from 'jquery';
import classNames from 'classnames';
import store from '../../store.js';
import _ from 'underscore';
import { getDeleted, getProducts } from '../../util/store-helpers.js'
import dv from '../../util/dv.js';
import objectAssignDeep from 'object-assign-deep';

export default class Deleted extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            auto: getDeleted().auto,
            user: getDeleted().user,
            listActive: false
        }
    }

    componentDidMount() {
        store.subscribe(() => {
            this.setState({
                auto: getDeleted().auto,
                user: getDeleted().user,
                listActive: this.state.listActive
            });

            if (!this.length()) {
                //dv(this.state);
                //dv(objectAssignDeep({}, this.state, { listActive: false }));
                //this.setState(objectAssignDeep({}, this.state, { listActive: false }));

                this.setState((prevState) => {
                    prevState.listActive = false;
                    return prevState;
                });
            }
        });

        $('BODY').on('click', event => {
            if (!$(event.target).closest('.deleted').length) {
                this.setState((prevState) => {
                    prevState.listActive = false;
                    return prevState;
                });
            }
        });
    }

    toggleList() {
        this.setState((prevState) => {
            prevState.listActive = !prevState.listActive;
            return prevState;
        });
    }

    length() {
        return Object.keys(this.state.auto).length + Object.keys(this.state.user).length;
    }

    restoreItem(item, listType) {
    }

    composeProductsList(ids) {
        return getProducts().filter(product => {
            let retval = false;

            if (product.id in ids) {
                product.quantity = ids[product.id];
                retval = true;
            }

            return retval;
        });
    }

    render() {
        let listClass = {
            'deleted-lists-container': true,
            '_active': this.state.listActive && this.length()
        };

        let user = this.composeProductsList(this.state.user);
        let auto = this.composeProductsList(this.state.auto);

        return (
            <div className="deleted">
                {this.length() ?
                        <div key="deleted-toggle" className="deleted-toggle" onClick={this.toggleList.bind(this)}>
                            Удаленные - <span className="deleted-toggle-value">{this.length()}</span>
                        </div>
                    : ''}
                {this.length() ?
                <div className={classNames(listClass)}>
                    {user.length ? <DeletedList type="user" title="Удаленные вами" class="_user" list={user} restoreItem={this.restoreItem.bind(this)}/> : ''}
                    {auto.length ? <DeletedList type="auto" title="Удаленные автоматически" class="_auto" list={auto} restoreItem={this.restoreItem.bind(this)}/> : ''}
                </div>
                    : ''}
            </div>
        );
    }
}