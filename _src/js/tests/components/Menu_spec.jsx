import React from 'react/addons';
import Menu from '../../constructor/components/menu/Menu.jsx';
import {assert} from 'chai';
import dv from '../../constructor/util/dv.js';

const shallowRenderer = React.addons.TestUtils.createRenderer();

describe('Menu', () => {
    it('renders elements', () => {
        shallowRenderer.render(<Menu items={['item 1', 'item 2', 'item 3']} siteMenu={['item 1', 'item 2', 'item 3']} activeKit={1}/>);

        const component = shallowRenderer.getRenderOutput();

        let siteMenu = component.props.children[1];
        let kitsMenu = component.props.children[2];

        assert.equal(kitsMenu.props.children[1].length, 3);
        assert.equal(siteMenu.props.children.length, 3);
    });
});