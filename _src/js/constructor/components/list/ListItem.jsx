import React from 'react';

import pluralize from '../../util/pluralize.js';
import format from '../../util/format-number.js';
import dv from '../../util/dv.js';
import classNames from 'classnames';
import objectAssignDeep from 'object-assign-deep';

import Modal from 'react-modal';
import modalStyles from '../../util/modal-styles.js';

export default class ListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            instructionOpen: false
        }
    }

    // TODO: refactor
    changeQuantity(delta) {
        this.props.changeQuantity(this.props.quantity + delta);
    }

    toggleInstruction(event) {
        if (event) {
            event.preventDefault();
        }

        this.setState(objectAssignDeep({}, this.state, { instructionOpen: !this.state.instructionOpen }));
    }

    restoreQuantity() {
        this.props.changeQuantity(this.props.originalQuantity);
    }

    render() {
        let sum = this.props.price * this.props.quantity;

        let itemClasses = {
            'list-item': true,
            '_hidden': typeof this.props.hidden !== 'undefined' && this.props.hidden,
            '_custom': typeof this.props.custom !== 'undefined' && this.props.custom
        };

        let plusClasses = {
            'list-item-controls-change': true,
            '_plus': true,
            '_active': this.props.quantity < 99
        };

        let minusClasses = {
            'list-item-controls-change': true,
            '_minus': true,
            '_active': this.props.quantity > 1
        };

        return (
            <div className={classNames(itemClasses)}>
                <div className="list-item-left">
                    <div className="list-item-number">{this.props.number}.</div>
                    <h4 className="list-item-title">{this.props.title}</h4>
                    {!isNaN(sum) ?
                    <div className="list-item-price">
                        <span className="list-item-price-tilde">〜</span>
                        <span className="list-item-price-value">{format(sum)}</span>
                        <span className="list-item-price-title">{pluralize(sum, 'рубль', 'рубля', 'рублей')}</span>
                    </div>
                    : '' }
                    <h6 className="list-item-subtitle">{this.props.subtitle}</h6>
                    {this.props.originalQuantity !== this.props.quantity && !this.props.custom && !this.props.recommended ?
                        <div className="list-item-original-q">
                            Рекомендуемое количество - <span className="list-item-original-q-value">{this.props.originalQuantity}</span> |
                            <span className="list-item-original-q-toggle" onClick={this.restoreQuantity.bind(this)}>Применить</span>
                        </div>
                        : ''}
                    {this.props.custom ?
                        <div className="list-item-custom">
                            Препарат добавлен вами
                        </div>
                        : ''}
                    {this.props.recommended ?
                        <div className="list-item-custom">
                            Рекомендованный препарат
                        </div>
                        : ''}
                    <div className="list-item-description">{this.props.description}</div>
                    {this.props.instruction ?
                        <div>
                            <a href="" onClick={this.toggleInstruction.bind(this)} className="list-item-instruction">Инструкция</a>
                            <Modal isOpen={this.state.instructionOpen} onRequestClose={this.toggleInstruction.bind(this)} style={modalStyles}>
                                <div className="popup">
                                    <span className="save-popup-close" onClick={this.toggleInstruction.bind(this)}></span>
                                    <div className="popup-content">
                                        <div className="list-item-instruction-text">
                                            <h5 className="list-item-instruction-text-title">Инструкция</h5>
                                            {this.props.instruction}
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                        : '' }
                </div>
                <div className="list-item-right">
                    {this.props.images ?
                    <figure className="list-item-image">
                        <img src={this.props.images[0]}/>
                    </figure>
                        : <div className="list-item-right-spacer"></div> }
                    <div className="list-item-controls">
                        <span className="list-item-controls-delete" onClick={this.props.remove}></span>
                        <span className={classNames(minusClasses)} onClick={this.changeQuantity.bind(this, -1)}></span>
                        <div className="list-item-quantity">{this.props.quantity}</div>
                        <span className={classNames(plusClasses)} onClick={this.changeQuantity.bind(this, 1)}></span>
                    </div>
                </div>
            </div>
        );
    }
}