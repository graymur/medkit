import React from 'react';
import $ from 'jquery';
import slider from 'jquery-ui/slider';
import * as jqueryUITouch from '../../../vendor/jquery.ui.touch-punch.min.js';

import dv from '../../../util/dv.js';

export default class Slider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.userValue || this.props.defaultValue,
            max: this.props.max
        }
    }

    componentDidMount() {
        this.sliderElement = $(this.refs.slider);
        this.backgroundElement = $(this.refs.bg);

        this.sliderElement.slider({
            value: this.state.value,
            min: this.props.min,
            max: this.props.max,
            step: 1,
            change: (event, ui) => {
                this.onThisChange(this.sliderElement.slider('value'));
            }
        });

        this.onThisChange(this.state.value);
    }

    /**
     * Update max value of dependable component
     */
    componentDidUpdate() {
        if (!this.props.main) {
            this.sliderElement.slider('option', 'max', this.props.max);

            if (this.state.value > this.props.max && this.props.max > 0) {
                this.sliderElement.slider('value', this.props.max);
            }
        }

        this.updateBackgroundWidth();
    }

    componentWillUnmount() {
        this.sliderElement.slider('destroy');
    }

    onThisChange(value) {
        this.setState(prevState => {
            prevState.value = value;
            return prevState;
        });

        this.props.onChange(value);
    }

    changeValue(value, event) {
        value = parseInt(this.sliderElement.slider('value')) + value;
        this.sliderElement.slider('value', value);
    }

    updateBackgroundWidth() {
        let percentage = Math.round((this.state.value - this.props.min) / (this.props.max - this.props.min) * 100) - 3;
        this.backgroundElement.css('width', percentage + '%');
    }

    render() {
        return (
            <div className="filter-controls-item _slider">
                <div className="filter-controls-slider-title">
                    {this.props.title}
                    <span className="filter-controls-slider-value">{this.state.value}</span>
                </div>
                <div className="filter-controls-slider-wr">
                    <div className="filter-controls-slider" ref="slider">
                        <div className="filter-controls-slider-bg" ref="bg"></div>
                    </div>
                </div>
                <a className="filter-controls-slider-control _minus" ref="minus" onClick={this.changeValue.bind(this, -1)}/>
                <a className="filter-controls-slider-control _plus" ref="plus" onClick={this.changeValue.bind(this, 1)}/>
                <span className="filter-controls-slider-label _min">{this.props.min}</span>
                <span className="filter-controls-slider-label _max">{this.props.max}</span>
            </div>
        );
    }
};