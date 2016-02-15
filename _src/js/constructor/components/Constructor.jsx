import React from 'react';
import Menu from './menu/Menu.jsx';
import Filter from './filter/Filter.jsx';
import List from './list/List.jsx';
import dv from '../util/dv.js';
import store from '../store.js';
import objectAssignDeep from 'object-assign-deep';
import classNames from 'classnames';

export default class Constructor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeKit: this.props.activeKit,
            overlayActive: false
        };
    }

    getChildContext() {
        return {
            saveLinks: this.props.saveLinks,
            saveFormAction: this.props.saveFormAction
        };
    }

    componentDidMount() {
        store.subscribe(() => {
            let activeKit = store.getState().activeKit;

            if (activeKit != this.state.activeKit) {
                this.setState(objectAssignDeep({}, this.state, { activeKit }));
            }
        });
    }

    render() {

        let overlayClasses = classNames({
            'overlay': true,
            '_active': this.state.overlayActive
        });

        return (
            <div className="constructor-wr">
                <Menu siteMenu={this.props.siteMenu} items={this.props.kits} activeKit={this.state.activeKit}/>
                <Filter controls={this.props.controls} filters={this.props.filters} activeKit={this.state.activeKit} clients={this.props.clients}/>
                <List
                    products={this.props.products}
                    deleted={this.props.deleted}
                    kits={this.props.kits}
                    activeKit={this.state.activeKit}
                    productsTypes={this.props.productsTypes}
                    clients={this.props.clients}
                    addedRecommended={this.props.addedRecommended}/>
            </div>
        );
    }
}

Constructor.childContextTypes = {
    saveLinks: React.PropTypes.array,
    saveFormAction: React.PropTypes.string
};
