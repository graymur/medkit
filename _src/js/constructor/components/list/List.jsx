import config from '../../config.js';

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import ListItem from './ListItem.jsx';
import Deleted from '../deleted/Deleted.jsx';
import Footer from './Footer.jsx';
import ListFilter from './filter/ListFilter.jsx';
import Recommended from './recommended/Recommended.jsx';
import GeminiScrollbar from 'react-gemini-scrollbar';

import store from '../../store.js';

import classNames from 'classnames';
import pluralize from '../../util/pluralize.js';
import format from '../../util/format-number.js';
import { getCurrentProducts } from '../../util/store-helpers.js';
import dv from '../../util/dv.js';

import $ from 'jquery';

export default class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentProducts: getCurrentProducts(),
            deleted: [1],
            sum: 0,
            inFront: false,
            addedRecommended: this.props.addedRecommended
        };

        let rerenderTimeout;

        store.subscribe(() => {
            clearTimeout(rerenderTimeout);

            rerenderTimeout = setTimeout(() => {
                this.setState(prevState => {
                    prevState.currentProducts = getCurrentProducts();
                    prevState.sum = this.getTotal(getCurrentProducts());
                    prevState.addedRecommended = store.getState().addedRecommended;
                    return prevState;
                });
            }, 100);
        });

        //this.resizeTriggerInterval = null;
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        //clearInterval(this.resizeTriggerInterval);
    }

    remove(product) {
        if (this.state.currentProducts.length > 0) {
            store.dispatch({
                type: 'PRODUCT_DELETED',
                product: product,
                listType: "user"
            });
        }
    }

    getTotal(products) {
        products = products || this.state.currentProducts || [];

        return products.reduce((sum, product) => {
            let price = product.price || 0;
            return sum + price * product.quantity;
        }, 0);
    }

    getRecommended() {
        let recommendedIds = this.props.kits[this.props.activeKit].recommended || [];

        return recommendedIds.map(id => {
            return this.state.addedRecommended.indexOf(id) === -1 && this.props.products.filter(product => id === product.id)[0];
        }).filter(product => Boolean(product));
    }

    addRecommended(product) {
        store.dispatch({
            type: 'ADD_RECOMMENDED',
            product: product
        });
    }

    changeQuantity(product, value) {
        store.dispatch({
            type: 'QUANTITY_CHANGED',
            product: product,
            quantity: value
        });
    }

    restoreQuantity(product) {}

    /**
     * TODO: refactor
     */
    //setFrontZIndex(value = false) {
    //    this.setState(prevState => {
    //        prevState.inFront = value;
    //        return prevState;
    //    });
    //}

    render() {
        let listClasses = {
            "list": true,
            "_single": this.state.currentProducts.length < 2,
            "_front": this.state.inFront
        };

        let allHidden = this.state.currentProducts.filter(e => !e.hidden).length === 0 && this.state.currentProducts.length;
        let recommended = this.getRecommended();

        //this.resizeTriggerInterval = setInterval(() => {
        //    dv('trigger');
        //    $(this.refs.list).trigger('resize');
        //}, 500);

        return (
            <div className={classNames(listClasses)}>
                {this.state.currentProducts.length ?
                <header className="list-header">
                    <div className="list-header-title">
                        Аптечка «{this.props.kits[this.props.activeKit].title}» – <span className="list-header-length">{this.state.currentProducts.length}</span> {pluralize(this.state.currentProducts.length, 'препарат', 'препарата', 'препаратов')}
                    </div>
                    <Deleted {...this.props.deleted}/>
                    <ListFilter products={this.state.currentProducts} productsTypes={this.props.productsTypes} clients={this.props.clients}/>
                </header>
                : '' }
                    <div className="list-wr" ref="list">
                        <GeminiScrollbar>
                        <ReactCSSTransitionGroup transitionName="list-item" transitionEnterTimeout={config.effectsSpeed} transitionLeaveTimeout={config.effectsSpeed}>
                            {this.state.currentProducts.map((product, i) => {
                                return <ListItem
                                        key={product.id}
                                        number={i + 1}
                                        {...product}
                                        remove={this.remove.bind(this, product)}
                                        changeQuantity={this.changeQuantity.bind(this, product)}
                                        restoreQuantity={this.restoreQuantity.bind(this, product)}/>
                            })}
                        </ReactCSSTransitionGroup>
                        {recommended.length > 0 ? <Recommended recommended={recommended} addRecommended={this.addRecommended.bind(this)}/> : ''}
                        </GeminiScrollbar>
                    </div>
                    {allHidden ? <h4 className="list-all-hidden">Нет препаратов, удовлетворяющих условиям фильтра</h4> : ''}
                {this.state.currentProducts.length ?
                    <Footer sum={this.state.sum} currentProducts={this.state.currentProducts} />
                    : '' }
            </div>
        );
    }
}