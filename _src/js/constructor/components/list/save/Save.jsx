import React from 'react';
import EmailForm from './EmailForm.jsx';
import dv from '../../../util/dv.js';
import objectAssignDeep from 'object-assign-deep';
import classNames from 'classnames';

import Modal from 'react-modal';
import modalStyles from '../../../util/modal-styles.js';

export default class Save extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            popupActive: false,
            emailFormActive: false
        }
    }

    componentDidMount() { }

    togglePopup() {
        this.setState(objectAssignDeep({}, this.state, { popupActive: !this.state.popupActive }));
    }

    toggleEmailForm() {
        this.setState(objectAssignDeep({}, this.state, { emailFormActive: !this.state.emailFormActive }));
    }

    render() {
        let optionsClasses = classNames({
            'save-popup-options': true,
            '_inactive': this.state.emailFormActive
        });

        let emailFormClasses = classNames({
            'save-popup-email': true,
            '_active': this.state.emailFormActive
        });

        return (
            <div className="save">
                <span className="save-toggle" onClick={this.togglePopup.bind(this)}>Сохранить список</span>
                <Modal isOpen={this.state.popupActive} onRequestClose={this.togglePopup.bind(this)} style={modalStyles}>
                    <div className="save-popup">
                        <span className="save-popup-close" onClick={this.togglePopup.bind(this)}></span>
                        <header className="save-popup-top">
                            <div className={emailFormClasses}>
                                <EmailForm currentProducts={this.props.currentProducts} toggleEmailForm={this.toggleEmailForm.bind(this)}/>
                            </div>
                            <div className={optionsClasses}>
                                <form method="post" target="_blank" action={this.context.saveFormAction}>
                                    <input type="hidden" name="dump" value={JSON.stringify(this.props.currentProducts)}/>
                                    <button type="submit" name="pdf" className="save-popup-options-item _pdf">Сохранить PDF</button>
                                </form>
                                <form method="post" target="_blank" action={this.context.saveFormAction}>
                                    <input type="hidden" name="dump" value={JSON.stringify(this.props.currentProducts)}/>
                                    <button type="submit" name="print" className="save-popup-options-item _print">Распечатать</button>
                                </form>
                                <button type="submit" name="email" className="save-popup-options-item _email" onClick={this.toggleEmailForm.bind(this)}>Отправить на почту</button>
                            </div>
                        </header>
                        <footer className="save-popup-links">
                            <span className="save-popup-links-title">Сайты, на которых можно собрать препараты по списку и купить</span>
                            {this.context.saveLinks.map((link, i) => <a href={link.link} key={i} target="_blank" className="save-popup-links-item"><img src={link.image}/></a>)}
                        </footer>
                    </div>
                </Modal>
            </div>
        );
    }
}

Save.contextTypes = {
    saveLinks: React.PropTypes.array,
    saveFormAction: React.PropTypes.string
};
