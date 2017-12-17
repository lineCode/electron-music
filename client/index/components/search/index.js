import React from 'react';
import axios from 'axios'
import {connect} from 'react-redux';
import { withRouter } from 'react-router'
import css from './search.scss'
import playAction from '../../actions/playAction'

@connect(state => {return {...state}}, playAction)
export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {},
            songs: [],
            page: 1,
            pagesize: 30
        }
    }

    componentDidMount() {
        this.getData()
    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.match.params.keyword) {
            this.getData()
        }
    }

    getData = () => {
        // console.log(this.props.match.params.rankid);
        let keyword = this.props.match.params.keyword;
        const {page, pagesize} = this.state;
        axios.get(`http://mobilecdn.kugou.com/api/v3/search/song?format=jsonp&keyword=${keyword}&page=${page}&pagesize=${pagesize}&showtype=1`).then(ret => {
            let data = ret.data;
            data = data.slice(1, data.length-1);
            this.setState({songs: JSON.parse(data).data.info})
        })
    };

    go = (dat) => {
        this.props.router.replace({
            pathname: '/list_info',
            query: {code: dat.rankid}
        })
    };

    add = (dat) => {
        axios.get(`http://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=${dat.hash}&from=mkugou`).then(ret => {
            this.props.addSinger(ret.data);
            this.props.play()
        })
    };

    render() {
        const {songs} = this.state
        return <div className={css.list}>
            {/*<div className={css.list_info}>*/}
                {/*{'imgurl' in info ?*/}
                    {/*<img src={info.imgurl.replace('{size}', '400')} alt={info.rankname}/> : null}*/}
            {/*</div>*/}
            <div className={css.search_page}>
                <input type="text" placeholder="搜索你的喜好"/>
                <button>搜索</button>
            </div>
            <ul>
                {songs.map((item, i) => {
                    let style = i%2 ? null : css.li_show;
                    return <li onClick={() => this.add(item, i)} key={i} className={style}>
                        <div className={css.list_name}>{item.filename}</div>
                    </li>
                })}
            </ul>
        </div>;
    }
}

