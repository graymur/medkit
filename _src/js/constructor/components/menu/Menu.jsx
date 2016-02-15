import React from 'react';
import _ from 'underscore';
import classNames from 'classnames';
import MenuItem from './MenuItem.jsx';
import dv from '../../util/dv.js';
import store from '../../store.js';

export default class Constructor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            siteMenuActive: false
        };
    }

    componentDidMount() {
    }

    changeKit(number) {
        store.dispatch({
            type: 'CHANGE_KIT',
            number: number
        });
    }

    toggleSiteMenu(event) {
        event.preventDefault();

        this.setState(previousState => {
            previousState.siteMenuActive = !previousState.siteMenuActive;
            return previousState;
        });
    }

    render() {

        let siteMenuClasses = {
            'site-menu': true,
            '_active': this.state.siteMenuActive
        };

        let siteMenuToggleClasses = {
            'site-menu-toggle': true,
            '_active': this.state.siteMenuActive
        };

        return (
            <div className="menu">
                <a href="#" className={classNames(siteMenuToggleClasses)} onClick={this.toggleSiteMenu.bind(this)}><i></i></a>
                <nav className={classNames(siteMenuClasses)}>
                    {this.props.siteMenu.map((item, i) => {
                        return <a className="site-menu-item" key={i} href={item.link}>{item.title}</a>;
                    })}
                </nav>
                <nav className="menu-links">
                    <span className="menu-links-hint">Тип аптечки:</span>
                    {_.map(this.props.items, (item, id) => {
                        return <MenuItem key={id} {...item} active={Number(id)===Number(this.props.activeKit)} changeKit={this.changeKit.bind(this, Number(id))}/>
                    })}
                </nav>
            </div>
        );
    }
}