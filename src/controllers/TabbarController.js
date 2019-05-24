import React, {Component} from 'react'
import {TabBar} from 'antd-mobile';
import HomePage from '../pages/HomePage'
import DiscoverPage from '../pages/DiscoverPage'
import OrderPage from '../pages/OrderPage'
import MyPage from '../pages/MyPage'
import {green, gray} from '../tool/color'

const publicPath = process.env.PUBLIC_URL

class TabbarController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'homeTab',
            hidden: false
        };
    }
    render() {
        return (
            <div style={{
                position: 'fixed',
                height: '100%',
                width: '100%',
                top: 0
            }}>
                <TabBar
                    unselectedTintColor={gray}
                    tintColor={green}
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                    <TabBar.Item
                        title="首页"
                        key="home"
                        icon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: `url(${publicPath}/image/tabbar/home.webp) center center /  21px 21px no-repeat`
                        }}
                        />
                        }
                        selectedIcon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(../image/tabbar/home_s.webp) center center /  21px 21px no-repeat'
                        }}
                        />
                        }
                        selected={this.state.selectedTab === 'homeTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'homeTab',
                            });
                        }}
                        data-seed="logId"
                    >
                        <HomePage/>
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: `url(${publicPath}/image/tabbar/discover.webp) center center /  21px 21px no-repeat`
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(../image/tabbar/discover_s.webp) center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        title="发现"
                        key="discover"
                        selected={this.state.selectedTab === 'discoverTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'discoverTab',
                            });
                        }}
                        data-seed="logId1"
                    >
                        <DiscoverPage/>
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: `url(${publicPath}/image/tabbar/order.webp) center center /  21px 21px no-repeat`
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: `url(../image/tabbar/order_s.webp) center center /  21px 21px no-repeat`
                            }}
                            />
                        }
                        title="订单"
                        key="order"
                        selected={this.state.selectedTab === 'orderTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'orderTab',
                            });
                        }}
                    >
                        <OrderPage/>
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: `url(${publicPath}/image/tabbar/my.webp) center center /  21px 21px no-repeat`
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: `url(../image/tabbar/my_s.webp) center center /  21px 21px no-repeat`
                            }}
                            />
                        }
                        title="我的"
                        key="my"
                        selected={this.state.selectedTab === 'myTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'myTab',
                            });
                        }}
                    >
                        <MyPage/>
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}

export default TabbarController