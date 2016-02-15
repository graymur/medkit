import React from 'react';
import classNames from 'classnames';
import dv from '../../util/dv.js';

export default class MenuItem extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    onClick(event) {
        event.preventDefault();
        this.props.changeKit();
    }

    render() {
        let classes = {
            'menu-links-item': true,
            '_active': this.props.active
        };

        return (
            <a href="" className={classNames(classes)} onClick={this.onClick.bind(this)}>{this.props.title}</a>
        );
    }
}