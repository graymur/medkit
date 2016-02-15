import React from 'react';

import ListFilterItem from './ListFilterItem.jsx';

import store from '../../../store.js';

import classNames from 'classnames';
import $ from 'jquery';
import dv from '../../../util/dv.js';

export default class Filter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listActive: false
        }
    }

    componentDidMount() {
        $('BODY').on('click', event => {
            if (!$(event.target).closest('.list-filter').length) {
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

    onChange(type, event) {
        store.dispatch({
            type: 'LIST_FILTER_CHANGE',
            filterType: type,
            value: parseInt($(event.target).val())
        });
    }

    getTypesOptions() {
        return this.props.products.reduce((curry, element) => { // выбираем уникальные типы препаратов из списка
            element.types.forEach(el => {
                if (curry.indexOf(el) === -1) {
                    curry.push(el);
                }
            });

            return curry;
        }, []).map(typeId => { // формируем массив вида [[id, title], [id, title]...]
            return [typeId, this.props.productsTypes[typeId].title];
        }).sort((a, b) => { // сортируем массив по алфавиту
            return a[1] > b[1] ? 1 : -1;
        });
    }

    getClientsOptions() {
        return this.props.products.reduce((curry, element) => { // выбираем уникальные типы препаратов из списка
            element.clients.forEach(el => {
                if (curry.indexOf(el) === -1) {
                    curry.push(el);
                }
            });

            return curry;
        }, []).map(clientId => { // формируем массив вида [[id, title], [id, title]...]
            return [clientId, this.props.clients[clientId].title];
        }).sort((a, b) => { // сортируем массив по алфавиту
            return a[1] > b[1] ? 1 : -1;
        });
    }

    render() {
        let toggleClasses = {
            'list-filter-toggle': true,
            '_active': this.state.listActive
        };

        let listClass = {
            'list-filter-wr': true,
            '_active': this.state.listActive
        };

        return (
            <div className="list-filter">
                <div className={classNames(toggleClasses)} onClick={this.toggleList.bind(this)}>Фильтр</div>
                <div className={classNames(listClass)}>
                    <ListFilterItem title="Назначение" all="Все препараты" options={this.getTypesOptions()} onChange={this.onChange.bind(this, 'types')}/>
                    <ListFilterItem title="Группа людей" all="Все группы" options={this.getClientsOptions()} onChange={this.onChange.bind(this, 'clients')}/>
                </div>
            </div>
        );
    }
}