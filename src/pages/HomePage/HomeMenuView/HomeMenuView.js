import React, {Component} from 'react'
import {Grid, WhiteSpace} from 'antd-mobile'
import {green} from '../../../tool/color'
import './HomeMenuView.css'

class HomeMenuView extends Component {
    render() {
        const {menuInfo} = this.props
        return (
            <div>
                <WhiteSpace size="lg"/>
                <Grid
                    className="home-grid"
                    data={menuInfo}
                    columnNum={5}
                    hasLine={false}
                    isCarousel={true}
                    carouselMaxRow={2}
                    itemStyle={{height: '77px'}}
                    dotStyle={{margin: '0 12px'}}
                    dotActiveStyle={{margin: '0 12px', backgroundColor: green}}
                />
                <WhiteSpace size="lg"/>
            </div>
        );
    }
}

export default HomeMenuView