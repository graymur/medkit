import React from 'react';
import classNames from 'classnames';
import dv from '../../../util/dv.js';

export default class CheckboxWr extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: Boolean(this.props.userValue) || Boolean(this.props.defaultValue) || false
        };
    }

    componentDidMount() {
        this.onChange(this.state.checked);
    }

    toggleActive(event) {
        event.preventDefault();

        this.setState(previousState => {
            previousState.checked = !previousState.checked;
            return previousState;
        });

        setTimeout(() => {
            this.onChange(this.state.checked);
        }, 0);
    }

    onChange(checked) {
        this.props.onChange(checked ? 1 : 0);
    }

    render() {
        let classes = {
            'filter-controls-item': true,
            '_checkbox': true,
            '_checked': this.state.checked
        };

        return (
            <div className={classNames(classes)} onClick={this.toggleActive.bind(this)}>
                {this.props.title}
            </div>
        );
    }
}