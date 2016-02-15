import React from 'react';
import ReactDOM from 'react-dom';

import classNames from 'classnames';
import $ from 'jquery';

import Checkbox from './controls/Checkbox.jsx';
import Slider from './controls/Slider.jsx';

import store from '../../store.js';
import dv from '../../util/dv.js';

export default class FilterControl extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            max: this.props.control.max || 0,
            control: this.props.control
        };
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            if (this.props.main || this.props.control.type !== 'range') return ;

            /**
             * Если текущий контрол - не главный, проверяем, не изменилось ли значение главного контрола
             * для соответствующего типа пациентов, если изменилось - устанавливаем максимум текущему контролу
             * равным значению главного контрола
             */
            let newMax = store.getState().mainSliderValues[this.props.control.clients[0]];

            if (newMax === this.state.max) return ;

            this.setState(prevState => {
                prevState.max = newMax;
                prevState.control.max = newMax;

                return prevState;
            });

            if (newMax === 0) {
                setTimeout(() => {
                    this.props.onChange(0);
                }, 0);
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        let retval;

        switch (this.state.control.type) {
            case 'range':
                if (this.state.max === 0) {
                    retval = <div></div>;
                } else if (this.state.max === 1) {
                    retval = <Checkbox onChange={this.props.onChange} {...this.state.control} />;
                } else {
                    retval = <Slider onChange={this.props.onChange} {...this.state.control} main={this.props.main} />;
                }

                break;

            case 'checkbox':
            default:
                retval = <Checkbox onChange={this.props.onChange} {...this.state.control}/>;
                break;
        }

        return retval;
    }
}