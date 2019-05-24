import React, {Component} from 'react'
import {Icon, Button, Badge} from 'antd-mobile'
import NavigationBar from '../../widget/NavigationBar'
import HomeListView from './HomeListView/HomeListView'
import './HomePage.css'

const publicPath = process.env.PUBLIC_URL

class HomePage extends Component {

    navLeft() {
        return (
            <div className="nav-left">
                <div className='icon' style={{
                    background: `url(${publicPath}/image/home/fwm.webp) center center /  100% 100% no-repeat`
                }}/>
                <div className="city-wrapper">
                    <div color="location">
                        <span className="city">广州</span>
                        <Icon type="down" size="xxs"/>
                    </div>
                    <div className="weather">
                        多云 28°
                    </div>
                </div>
            </div>
        )
    }

    navContent() {
        return (
            <div className="nav-title" style={{width: '50vw',}}>
                <Button icon="search" size="small" className="search-normal"
                        activeClassName="search-active">输入商家/品类/商圈</Button>
            </div>)
    }

    navRight() {
        return (
            <Badge dot>
                <Icon key="1" type="ellipsis" color="#000"/>
            </Badge>
        )
    }

    render() {
        return (
            <div style={{position: 'relative'}}>
                <NavigationBar
                    style={{position: 'absolute', top: 0, left: 0, width: '100vw', zIndex: 100}}
                    leftContent={this.navLeft()}
                    navContent={this.navContent()}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={this.navRight()}
                />
                <HomeListView/>
            </div>
        );
    }
}

export default HomePage