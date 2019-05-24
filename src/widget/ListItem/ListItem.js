import React, {Component} from 'react'
import './listItem.css'

class ListItem extends Component {
    render() {
        let {info, onPress} = this.props
        let img = info.img.replace('w.h', '180.0')
        return (
            <div className="list-item" onClick={onPress}>
                <div className="list-item-image">
                    <img className="auto-img" src={img} alt="商家照片"/>
                </div>
                <div className="list-item-desc">
                    <h3 className="list-item-title">{info.title}</h3>
                    <div className="list-item-range">{info.desc}</div>
                    <div className="list-item-price">
                        {info.price}<span>元</span><span className="old-price">门市价:{info.oldPrice}元</span>
                    </div>
                    <div className="list-item-solds">已售{info.solds}</div>
                </div>
            </div>
        )
    }
}

export default ListItem