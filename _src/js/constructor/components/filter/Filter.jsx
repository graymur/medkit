import React from 'react';
import FilterItem from './FilterItem.jsx';
import GeminiScrollbar from 'react-gemini-scrollbar';

import dv from '../../util/dv.js';

export default class Filter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: props.filters[this.props.activeKit]
        };
    }

    componentDidMount() {
    }

    render() {
        //<GeminiScrollbar>
        return (
            <div className="filter">
                <GeminiScrollbar>
                {this.props.filters[this.props.activeKit].map((element, i) => {
                    return <FilterItem key={i + '.' + this.props.activeKit} element={element} controls={this.props.controls} active={i === 0} main={i === 0} activeKit={this.props.activeKit}/>
                })}
                </GeminiScrollbar>
            </div>
        );
    }
}