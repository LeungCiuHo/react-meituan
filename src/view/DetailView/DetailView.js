import React, {Component, Fragment} from 'react'
import {withRouter} from 'react-router-dom'
import {Icon, Flex, Button, WhiteSpace, ListView} from 'antd-mobile'
import NavigationBar from '../../widget/NavigationBar'
import api, {groupPurchaseDetailWithId} from '../../api'
import {green} from '../../tool/color'
import './DetailView.css'
import ListItem from '../../widget/ListItem/ListItem'

const publicPath = process.env.PUBLIC_URL

class DetailView extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })
        this.state = {
            terms: [],
            rdplocs: [],
            ds,
            loading: false,
        }
    }

    componentDidUpdate(prevProps) {
        //                            /demo/123         /demo
        console.log(prevProps.history.action)
        const locationChanged = this.props.location !== prevProps.location
        if (locationChanged) {
            this.setState({loading: true})
            console.log('路由发生改变')
            let {match} = this.props
            let p1 = this.getGroupDetailData(match.params.id)
            let p2 = this.getRecommendWithId(match.params.id)
            Promise.all([p1, p2]).then(() => {
                this.setState({loading: false})
                console.log(this.lv, 'lv -37')
                if (this.lv && prevProps.history.action !== 'POP') {
                    this.lv.scrollTo(0, 0)
                }
            })
        }
    }


    componentDidMount() {
        this.setState({loading: true})
        let {match} = this.props
        let p1 = this.getGroupDetailData(match.params.id)
        let p2 = this.getRecommendWithId(match.params.id)
        Promise.all([p1, p2]).then(() => {
            this.setState({loading: false})
        })
    }

    getGroupDetailData(id) {
        return new Promise((resolve, reject) => {
            const url = groupPurchaseDetailWithId(id)
            fetch(url).then(response => {
                // this.setState({isLoading: false})
                // fetch.请求response属性无法访问
                // response.text  和 .json 分别是解析文本和json数据,返回一个promise对象.需要在该方法后使用then获取解析的数据
                return response.json()
            }).then(json => {
                let data = json.data[0]
                console.log(data)
                this.setState({terms: data.terms, rdplocs: data.rdplocs})
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    }

    getRecommendWithId(id) {
        /*
        const url = recommendUrlWithId(id)
        fetch(url).then(response => {
            return response.json()
        }).then(json => {
            let data = json.data[0]
            console.log('recommend', data)
        });
        */
        return new Promise((resolve, reject) => {
            fetch(api.recommend).then(response => {
                response.json().then(myJson => {
                    this.refreshData(myJson.data)
                    resolve()
                })
            }).catch(error => {
                this.setState({isLoading: false})
                reject(error)
            });
        })

    }

    refreshData(dataSource) {
        let data = dataSource.map(item => ({
            img: item.imgurl,
            title: item.mname,
            desc: `[${item.range}]${item.mtitle}`,
            price: item.price,
            oldPrice: item.value,
            solds: item.solds,
            id: item.id
        }))
        this.setState({
            isLoading: false,
            ds: this.state.ds.cloneWithRows(data)
        })
    }

    renderNav() {
        const {history} = this.props
        return (
            <NavigationBar
                style={{position: 'fixed', top: 0, left: 0, width: '100vw', zIndex: 100, backgroundColor: green}}
                leftContent={<Icon type="left" size="md" color="#fff"/>}
                navContent={<div style={{color: '#fff'}}>团购详情</div>}
                onLeftClick={() => history.go(-1)}
            />
        )
    }

    renderHeader() {
        const {location} = this.props
        const {img, title, desc, price, oldPrice, solds} = location.state.info
        return (
            <div className="detail-header-wrapper">
                <div className="detail-header">
                    <img alt="商家照片" className="auto-img" src={img.replace('w.h', '720.0')}/>
                    <Flex className="detail-desc" direction="column" justify="end" align="start">
                        <div className="detail-title">{title}</div>
                        <div className="detail-range">{desc.split(']')[1]}</div>
                    </Flex>
                </div>
                <Flex className="detail-price-wrapper">
                    <Flex.Item className="detail-price">
                        {price}<span>元</span><span className="old-price">门市价:{oldPrice}元</span>
                    </Flex.Item>
                    <Button style={{
                        backgroundColor: "#ff9900", color: "#fff", width: "130px", height: "40px", lineHeight: '40px'
                    }} activeStyle={{backgroundColor: "#ea8900"}}>立即购买</Button>
                </Flex>
                <Flex wrap="wrap" className="agree-wrapper">
                    <div className="agree color-ok">
                        <img alt="随时退" src={`${publicPath}/image/gmw.webp`}/>
                        支持随时退款
                    </div>
                    <div className="agree color-ok">
                        <img alt="过期退" src={`${publicPath}/image/h3f.webp`}/>
                        支持过期自动退
                    </div>
                    <div className="agree">
                        <img alt="售" src={`${publicPath}/image/tabbar/my.webp`}/>
                        已售{solds}
                    </div>
                </Flex>
                <WhiteSpace size="lg"/>
            </div>
        )
    }

    renderNotice() {
        const {terms} = this.state
        return (
            terms.length > 0 && <div className="notice-wrapper item-wrapper">
                <div className="group-header">购买须知</div>
                <div className="notice-desc">
                    {terms.map(item => (
                        <Fragment key={item.title}>
                            <div className="notice-title">
                                {item.title}
                            </div>
                            {item.content.length > 1 ? item.content.map((c, i) => <li className="notice-content"
                                                                                      key={i}>{c}</li>) :
                                <div className="notice-content">{item.content[0]}</div>}
                        </Fragment>
                    ))}
                </div>
            </div>
        )
    }

    renderSellerPosition() {
        const {rdplocs} = this.state
        return (rdplocs.length > 0 && (
            <div className="position-wrapper item-wrapper">
                <div className="group-header">
                    商家信息
                </div>
                <Flex className="position-item">
                    <Flex.Item className="position-left">
                        <div className="position-icon">
                            <img alt="位置" src={`${publicPath}/image/j2x.webp`}/>
                        </div>
                        <div className="position-desc">
                            <div className="position-name">{rdplocs[0].name}</div>
                            <div className="position-addr">{rdplocs[0].addr}</div>
                        </div>
                    </Flex.Item>
                    <div className="position-phone">
                        <img alt="点我联系商家" src={`${publicPath}/image/guu.webp`}/>
                    </div>
                </Flex>
                <div className="group-detail">
                    查看全部{rdplocs.length}家适用分店
                    <Icon type="right"/>
                </div>
            </div>

        ))
    }

    renderListHeader() {
        return (
            <div>
                <div>
                    {this.renderHeader()}
                </div>
                {this.renderNav()}
                {this.renderNotice()}
                <WhiteSpace size="lg"/>
                {this.renderSellerPosition()}
                <WhiteSpace size="lg"/>
            </div>
        )
    }

    renderRow(info) {
        const RouterItem = withRouter(({history}) => <ListItem info={info}
                                                               onPress={() => history.push(`/detail/${info.id}`, {info})}/>)
        return <RouterItem/>
    }

    render() {
        const {ds, loading} = this.state
        return (loading ? <div style={{paddingTop: '44px', height: '100%', backgroundColor: '#fff'}}>正在加载...</div> :
            <ListView
                ref={el => this.lv = el}
                dataSource={ds}
                pageSize={5}
                renderHeader={() => this.renderListHeader()}
                renderRow={this.renderRow}
                scrollRenderAheadDistance={300}
                onScroll={() => console.log('scroll')}
                useBodyScroll
            />)
    }
}

export default DetailView