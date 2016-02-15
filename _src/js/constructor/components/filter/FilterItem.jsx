import React from 'react';
import ReactDOM from 'react-dom';

import classNames from 'classnames';
import $ from 'jquery';

import FilterControl from './FilterControl.jsx';
import Checkbox from './controls/Checkbox.jsx';
import Slider from './controls/Slider.jsx';

import objectAssignDeep from 'object-assign-deep';
import store from './../../store.js';
import dv from '../../util/dv.js';

export default class FilterItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            element: props.element,
            active: props.active || false
            //active: true
        }
    }

    componentDidMount() {
        this.contentElement = $(this.refs.content);

        // если элемент активен при загрузке - показываем контент
        if (this.state.active) {
            this.contentElement.show();
        }
    }

    toggleActive(event) {
        event.preventDefault();

        this.setState(previousState => {
            if (previousState.active) {
                this.contentElement.slideUp(400);
            } else {
                this.contentElement.slideDown(400);
            }

            previousState.active = !previousState.active;
            return previousState;
        });
    }

    onChange(control, value) {
        // set limits to peoples number sliders if this is the slider in the first filter
        if (this.props.main) {
            switch (control.type) {
                case 'range':

                    store.dispatch({
                        type: 'SET_MAIN_RANGE_VALUE',
                        clients: control.clients,
                        control,
                        value
                    });

                break;
            }
        }

        store.dispatch({
            type: 'CONTROL_CHANGES',
            products: control.products,
            value,
            control
        });
    }

    render() {
        let classes = {
            'filter-item': true,
            '_active': this.state.active
        };

        let content = '';

        // рендерим дочерние элементы
        if (typeof this.state.element.children !== 'undefined') {
            content = this.state.element.children.map((child, i) => {
                return <FilterItem key={i + '.' + this.props.activeKit} element={child} controls={this.props.controls} activeKit={this.props.activeKit} />;
            });
        // если дочерних элементов нет, рендерим контролы
        } else if (typeof this.state.element.controls !== 'undefined') {
            let controls = this.state.element.controls.map((control, i) => {
                control = objectAssignDeep({}, control, this.props.controls[control.id]);
                //let value = this.props.values ? this.props.values[control.id] : undefined; // это значение используется после перезагрузки страницы
                return <FilterControl key={i + '.' + this.props.activeKit} onChange={this.onChange.bind(this, control)} control={control} main={this.props.main} />;
            });

            content = <div className="filter-item-controls">{controls}</div>;
        }

        return (
            <div className={classNames(classes)}>
                <a href="" className="filter-item-title" onClick={this.toggleActive.bind(this)}><span>{this.state.element.title}</span></a>
                <div className="filter-item-content" ref="content">
                    {content}
                </div>
            </div>
        );
    }
}