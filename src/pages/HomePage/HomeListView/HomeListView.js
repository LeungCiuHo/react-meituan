import React, {Component} from 'react'
/* eslint no-dupe-keys: 0 */
import {ListView} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import HomeMenuView from "../HomeMenuView/HomeMenuView";
import ListItem from '../../../widget/ListItem/ListItem'
import api from '../../../api'
import './HomeListView.css'


const ListWrapper = (props) => (
    <div className="list-wrapper">
        {props.children}
    </div>
)


class HomeListView extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })
        this.state = {
            isLoading: false,
            ds: ds.cloneWithRows([])
        }
        this.getDataFromServer = this.getDataFromServer.bind(this)
    }

    componentDidMount() {
        this.getDataFromServer()
    }

    /*
        async getDataFromServer() {
            let response = await fetch(api.recommend)

        }
    */
    getDataFromServer() {
        this.setState({isLoading: true})
        fetch(api.recommend, {
            method: 'GET',
            mode: 'cors',
            cache: 'default',
            credentials: 'omit', //
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        }).then(response => {
            // this.setState({isLoading: false})
            // fetch.请求response属性无法访问
            // response.text  和 .json 分别是解析文本和json数据,返回一个promise对象.需要在该方法后使用then获取解析的数据
            response.json().then(myJson => {
                console.log(myJson)
                this.refreshData(myJson)
            })
        }).catch(error => {
            this.setState({isLoading: false})
            console.error(error)
        });
    }

    refreshData(dataSource) {
        let data = dataSource.data.map(item => ({
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

    renderRow(info) {
        const RouterItem = withRouter(({history}) => <ListItem info={info}
                                                               onPress={() => history.push(`/detail/${info.id}`,{info})}/>)
        return <RouterItem/>
    }

    render() {
        const {ds, isLoading} = this.state
        return (
            <ListView
                className="home-list-view"
                dataSource={ds}
                pageSize={5}
                renderFooter={() => (<div style={{padding: 30, textAlign: 'center'}}>
                    {isLoading ? 'Loading...' : 'Loaded'}
                </div>)}
                renderHeader={() => <HomeMenuView menuInfo={api.menuInfo}/>}
                renderRow={this.renderRow}
                scrollRenderAheadDistance={300}
                onScroll={() => console.log('scroll')}
                renderBodyComponent={() => <ListWrapper/>}
            />
        );
    }

}

export default HomeListView