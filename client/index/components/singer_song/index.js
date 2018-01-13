import React from 'react';
import {Axios} from 'Public'
import { withRouter } from 'react-router'
import css from './singer_song.scss'

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {},
            songs: {
                list: []
            },
            page: 2
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        // console.log(this.props.match.params.rankid);
        let singerid = this.props.match.params.singerid;
        let {page} = this.state;
        let userAgent = 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Mobile Safari/537.36'
        // TODO 这个Api有浏览器验证 User-Agent未解决
        axios.interceptors.request.use((config) => {
            config.headers.common['User-Agent'] = userAgent;
            return config;
        }, (err) => {
            return Promise.reject(err);
        });

        Axios.post('/api/op', {url: 'http://m.kugou.com/plist/index?json=true'}).then(ret => {
            this.setState({plist: ret.data.plist})
        })
        // Axios.post('/api/op', {url: `http://m.kugou.com/singer/info/?singerid=${singerid}&page=${page}&json=true`}).then(ret => {
        //     // console.log(ret);
        //     this.setState({songs: ret.data.songs, info: ret.data.info})
        // })
    };

    add = (dat) => {
        Axios.post('/api/op', {url: `http://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=${dat.hash}&from=mkugou`}).then(ret => {
            this.props.singer.singer.push(ret.data)
        })
    };

    render() {
        const {songs, info} = this.state
        return <div className={css.list}>
            <div className={css.list_info}>
                {'imgurl' in info ?
                    <img src={info.imgurl.replace('{size}', '400')} alt={info.rankname}/> : null}
            </div>
            <ul>
                {songs.list.map((item, i) => {
                    let style = i%2 ? null : css.li_show;
                    return <li onClick={() => this.add(item, i)} key={i} className={style}>
                        <div className={css.list_name}>{item.filename}</div>
                    </li>
                })}
            </ul>
        </div>;
    }
}

