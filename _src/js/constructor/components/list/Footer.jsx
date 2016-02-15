import React from 'react';

import AddCustom from './../add-custom/AddCustom.jsx';
import Save from './save/Save.jsx';

import pluralize from '../../util/pluralize.js';
import format from '../../util/format-number.js';
import dv from '../../util/dv.js';

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() { }

    render() {
        return (
            <footer className="list-footer">
                <div className="list-footer-cell">
                    <AddCustom />
                </div>
                <div className="list-footer-cell">
                    <Save currentProducts={this.props.currentProducts}/>
                </div>
                {this.props.sum > 0 ?
                    <div className="list-footer-cell">
                        <div className="list-total">
                            Итого:
                            <span className="list-total-tilde">〜</span>
                            <span className="list-total-value">{format(this.props.sum)}</span>
                            <span className="list-total-title">{pluralize(this.props.sum, 'рубль', 'рубля', 'рублей')}</span>
                            <div className="list-total-hint">
                                Среднерыночная стоимость
                            </div>
                        </div>
                    </div>
                    : ''}
            </footer>
        );
    }
}