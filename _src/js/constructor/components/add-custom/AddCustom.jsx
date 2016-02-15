import React from 'react';

import AddCustomRow from './AddCustomRow.jsx';

import store from '../../store.js';

import classNames from 'classnames';
import objectAssignDeep from 'object-assign-deep';
import dv from '../../util/dv.js';

import Modal from 'react-modal';
import modalStyles from '../../util/modal-styles.js';

export default class AddCustom extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.initialState();
    }

    initialState() {
        return {
            formActive: false,
            products: [{
                title: '',
                description: ''
            }]
        }
    }

    componentDidMount() {
        //this.props.setFrontZIndex(this.state.formActive);
    }

    toggleForm() {
        this.setState(objectAssignDeep({}, this.state, { formActive: !this.state.formActive }));

        //setTimeout(() => {
        //    this.props.setFrontZIndex(this.state.formActive);
        //}, 0);
    }

    add() {
        this.setState(prevState => {
            let newState = objectAssignDeep({}, prevState);

            newState.products.push({
                title: '',
                description: ''
            });

            return newState;
        });
    }

    onRowUpdate(index, childState) {
        let newState = objectAssignDeep({}, this.state);

        newState.products[index] = {
            title: childState.title,
            description: childState.description
        };

        this.setState(newState);
    }

    save() {
        store.dispatch({
            type: 'ADD_CUSTOM',
            products: this.state.products
        });

        this.cancel();
    }

    cancel() {
        this.setState(this.initialState());
    }

    render() {
        return (
            <div className="add-custom">
                <span className="add-custom-toggle" onClick={this.toggleForm.bind(this)}><span className="add-custom-toggle-plus"></span> Добавить свой препарат</span>
                <Modal isOpen={this.state.formActive} onRequestClose={this.toggleForm.bind(this)} style={modalStyles}>
                    <div className="add-custom-form">
                        <h3 className="add-custom-list-title">Наименование препаратов:</h3>
                        <div className="add-custom-list">
                            <ol>
                                {this.state.products.map((element, i) => {
                                    return <AddCustomRow key={i} index={i} {...element} onUpdate={this.onRowUpdate.bind(this)}/>
                                })}
                            </ol>
                            {this.state.products.length < 3 ? <span className="add-custom-list-submit" onClick={this.add.bind(this)}>Добавить ещё</span> : ''}
                        </div>
                        <footer className="add-custom-list-controls">
                            <span className="add-custom-list-controls-item _save" onClick={this.save.bind(this)}>Сохранить</span>
                            <span className="add-custom-list-controls-item _cancel" onClick={this.cancel.bind(this)}>Отмена</span>
                        </footer>
                    </div>
                </Modal>
            </div>
        );
    }
}