import React from 'react';
import axios from 'axios'
import css from './search.scss'

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            page: 1,
            pagesize: 30
        }
    }

    componentDidMount() {
        let _this = this;
        window.onkeydown = function (event) {
            let e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode === 13) {
                _this.search()
            }
        }
    }

    search = () => {
        const {search, page, pagesize} = this.state;
        axios.get(`http://mobilecdn.kugou.com/api/v3/search/song?format=jsonp&keyword=${search}&page=${page}&pagesize=${pagesize}&showtype=1&callback=kgJSONP994450206`).then(ret => {
            console.log(ret);
        })
    };

    change = (e) => {
        console.log(e);
        this.setState({search: e.target.value})
    };

    render() {
        const {search} = this.state;
        return <div className={css.search}>
            <input value={search} onChange={this.change} type="text" placeholder="搜索你的喜好"/>
            <i onClick={this.search} className="iconfont icon-sousuo"/>
            <div/>
            <i className={`iconfont icon-yuan ${css.yuan}`}/>
        </div>
    }
}