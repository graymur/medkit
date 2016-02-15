import React from 'react';

import pluralize from '../../../util/pluralize.js';
import format from '../../../util/format-number.js';
import dv from '../../../util/dv.js';

export default class Recommended extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    onAdd(product) {
        this.props.addRecommended(product);
    }

    render() {
        return (
            <section className="recommended">
                <h3 className="recommended-title">Рекомендуем задуматься</h3>
                {this.props.recommended.map(product =>
                <div className="recommended-item" key={'r' + product.id}>
                    {product.images ?
                        <figure className="recommended-item-image">
                            <img src={product.images[0]}/>
                        </figure>
                        : '' }
                    <div className="recommended-item-info">
                        <h4 className="recommended-item-title">{product.title}</h4>
                        <h6 className="recommended-item-subtitle">{product.subtitle}</h6>
                        {!isNaN(product.price) ?
                            <div className="recommended-item-price">от <span className="recommended-item-price-value">{format(product.price)}</span> {pluralize(product.price, 'рубль', 'рубля', 'рублей')}</div>
                            : '' }
                        <span className="recommended-item-add" onClick={this.onAdd.bind(this, product)}>Добавить в аптечку</span>
                    </div>
                    <div className="recommended-item-description">{product.description}</div>
                </div>
                )}
            </section>
        );
    }
}