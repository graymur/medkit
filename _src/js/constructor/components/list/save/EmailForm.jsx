import React from 'react';
import dv from '../../../util/dv.js';
import objectAssignDeep from 'object-assign-deep';
import classNames from 'classnames';
import $ from 'jquery';

export default class EmailForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            valid: false,
            invalid: false,
            email: '',
            success: false
        }
    }

    componentDidMount() { }

    handleChange(event) {
        this.state[event.target.name] = event.target.value;
        this.setState(objectAssignDeep(this.state, {
            email: event.target.value,
            valid: /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm.test(event.target.value)
        }));
    }

    /**
     * TODO: полностью переделать
     * @param event
     */
    onSubmit(event) {
        event.preventDefault();

        if (!this.state.valid) {
            this.setState(objectAssignDeep(this.state, { invalid: true }));
        } else {
            //store.dispatch
            $.ajax({
                type: 'post',
                url: this.context.saveFormAction,
                data: {
                    type: 'email',
                    email: this.state.email,
                    dump: this.refs.dump.value
                }
            }).then(data => {
                this.toggleSuccess();
                this.setState(objectAssignDeep(this.state, { email: '', valid: false, invalid: false }));
            }).fail(() => { });
        }
    }

    toggleSuccess() {
        this.setState(objectAssignDeep(this.state, { success: !this.state.success }));
    }

    back() {
        this.toggleSuccess();
        this.props.toggleEmailForm();
    }

    render() {
        let containerClasses = classNames({
            'save-popup-email-wr': true,
            '_success': this.state.success
        });

        let inputClasses = classNames({
            'save-popup-email-input': true,
            '_valid': this.state.valid,
            '_invalid': this.state.invalid && !this.state.valid
        });

        return (
            <div className={containerClasses}>
                <section className="save-popup-email-success">
                    <h5 className="save-popup-email-success-title">Список препаратов вашей аптечки успешно отправлен вам на почту!</h5>
                    <span className="save-popup-email-success-back" onClick={this.back.bind(this)}>Вернуться к вариантам</span>
                    <span className="save-popup-email-success-close" onClick={this.toggleSuccess.bind(this)}>Закрыть</span>
                </section>
                <form className="save-popup-email-form" method="post" target="_blank" action={this.context.saveFormAction} onSubmit={this.onSubmit.bind(this)}>
                    <input type="hidden" name="dump" ref="dump" value={JSON.stringify(this.props.currentProducts)}/>
                    <input className={inputClasses} ref="email" name="email" placeholder="Введите ваш email" value={this.state.email} onChange={this.handleChange.bind(this)}/>
                    <button type="submit" className="save-popup-email-submit">Отправить</button>
                    <span className="save-popup-email-cancel" onClick={this.props.toggleEmailForm}>Отмена</span>
                </form>
            </div>
        );
    }
}

EmailForm.contextTypes = {
    saveFormAction: React.PropTypes.string
};

/**
 * Так было бы правильнее, но не хочется гонять данные туда-сюда только для того,
 * чтобы показать сообщение об отправке
 */

//store.dispatch(sendEmail({
//    type: 'email',
//    email: this.state.email,
//    dump: this.refs.dump.value
//}));
//
//function sendEmail(data) {
//    return function (dispatch) {
//        return $.ajax({
//            type: 'post',
//            url: this.context.saveFormAction,
//            data: data
//        }).then(data => {
//            store.dispatch({
//                type: 'EMAIL_SUCCESS'
//            });
//        }).fail(() => {
//            store.dispatch({
//                type: 'EMAIL_FAIL'
//            });
//        });
//    };
//}