import React, {Component} from 'react'
import {NavBar} from 'antd-mobile';

class NavigationBar extends Component {
    render() {
        let {navContent, ...rest} = this.props
        return (
            <div>
                <NavBar
                    mode="light"
                    {...rest}
                >
                    {navContent}
                </NavBar>
            </div>
        );
    }
}

export default NavigationBar