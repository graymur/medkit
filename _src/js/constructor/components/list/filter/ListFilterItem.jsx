import React from 'react';

import dv from '../../../util/dv.js';

export default class ListFilterItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="list-filter-item">
                <h6 className="list-filter-item-title">{this.props.title}</h6>
                <select className="list-filter-item-select" onChange={this.props.onChange}>
                    <option>{this.props.all}</option>
                    {this.props.options.map(el => {
                        return <option key={el[0]} value={el[0]}>{el[1]}</option>
                    })}
                </select>
            </div>
        );
    }
}
