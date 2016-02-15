import React from 'react';
import GeminiScrollbar from 'react-gemini-scrollbar';

import $ from 'jquery';
import classNames from 'classnames';

import store from '../../store.js';
import dv from '../../util/dv.js';

export default class DeletedList extends React.Component {
    constructor(props) {
        super(props);
        this.maxHeight = 200;
    }

    componentDidMount() {
        this.container = $(this.refs.container);
        this.content = $(this.refs.content);
    }

    componentDidUpdate() {
    }

    restore(product) {
        //this.props.restoreItem(item, this.props.type);
        store.dispatch({
            type: 'DELETED_RESTORED',
            listType: this.props.type,
            id: product.id,
            product
        });
    }

    render() {
        let listClass = {
            'deleted-list': true,
            [this.props.class]: true
        };

        /**
         * дурацкий хак нужен для кастомного скроллбара, которому нужна
         * фиксированная высота контейнера
         */
        let itemHeight = 40;
        let containerHeight = this.props.list.length * itemHeight;

        if (containerHeight > this.maxHeight) {
            containerHeight = this.maxHeight;
        }

        let containerStyle = {
            height: containerHeight + 'px'
        };

        return (
            <div className={classNames(listClass)}>
                <div className="deleted-list-title">{this.props.title} <span className="deleted-list-count">{this.props.list.length}</span></div>
                <div className="deleted-list-items" ref="container" style={containerStyle}>
                    <GeminiScrollbar>
                    <div ref="content">
                    {this.props.list.map((item) => {
                        return <div key={item.id} className="deleted-list-item" onClick={this.restore.bind(this, item)}>
                            <span className="deleted-list-item-restore">Вернуть</span>
                            &mdash;
                            <span className="deleted-list-item-title">{item.title}</span>
                        </div>
                    })}
                    </div>
                    </GeminiScrollbar>
                </div>
            </div>
        );
    }
}