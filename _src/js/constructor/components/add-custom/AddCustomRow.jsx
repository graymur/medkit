import React from 'react';

import classNames from 'classnames';
import $ from 'jquery';
import objectAssignDeep from 'object-assign-deep';

import dv from '../../util/dv.js';

export default class AddCustomRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //focused: false,
            inputFocused: false,
            descriptionFocused: false,
            descriptionActive: false,
            title: this.props.title,
            description: this.props.description
        };

        /**
         * Нужно для отмены назначения $('BODY').on('click')
         */
        this.closeOnOuterClickBinded = this.closeOnOuterClick.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState(objectAssignDeep({}, this.state, props));
    }

    componentDidMount() {
        this.container = $(this.refs.container);
        $('BODY').on('click', this.closeOnOuterClickBinded);
    }

    componentWillUnmount() {
        $('BODY').off('click', this.closeOnOuterClickBinded);
    }

    closeOnOuterClick(event) {
        if (!$(event.target).closest(this.refs.container).length) {
            this.setState(objectAssignDeep({}, this.state, {
                descriptionActive: false
            }));
        }
    }

    inputFocus() {
        this.setState(objectAssignDeep({}, this.state, {
            inputFocused: true
        }));
    }

    inputBlur() {
        this.setState(objectAssignDeep({}, this.state, {
            inputFocused: false
        }));
    }

    descriptionFocus() {
        this.setState(objectAssignDeep({}, this.state, {
            descriptionFocused: true
        }));
    }

    descriptionBlur() {
        this.setState(objectAssignDeep({}, this.state, {
            descriptionFocused: false
        }));
    }

    toggleDescription() {
        this.setState(objectAssignDeep({}, this.state, {
            descriptionActive: !this.state.descriptionActive
        }));
    }

    handleChange (event) {
        this.setState(objectAssignDeep(this.state, {
            [event.target.name]: event.target.value
        }));

        this.props.onUpdate(this.props.index, this.state);
    }

    render() {
        let rowClasses = classNames({
            'add-custom-row': true,
            '_focus': this.state.inputFocused || this.state.descriptionActive || this.state.descriptionFocused
        });

        let descriptionClass = classNames({
            'add-custom-description-wr': true,
            //'_active': this.state.descriptionActive
            '_active': this.state.descriptionFocused || this.state.inputFocused
        });

        let toggleClasses = classNames({
            'add-custom-description-toggle': true,
            '_active': this.state.descriptionActive && this.state.description.length === 0,
            '_filled': this.state.description.length > 0
        });

        return (
            <li className={rowClasses} ref="container">
                <input name="title" className="add-custom-input" ref="title" onFocus={this.inputFocus.bind(this)} onBlur={this.inputBlur.bind(this)} value={this.state.title} onChange={this.handleChange.bind(this)}/>
                <span className={toggleClasses} onClick={this.toggleDescription.bind(this)}></span>
                <div className={descriptionClass}>
                    <textarea onFocus={this.descriptionFocus.bind(this)} onBlur={this.descriptionBlur.bind(this)} name="description" ref="description" placeholder="При необходимости, введите необходимую для вас информацию о препарате" value={this.state.description} onChange={this.handleChange.bind(this)}></textarea>
                </div>
            </li>
        );
    }
}