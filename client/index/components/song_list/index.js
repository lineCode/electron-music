import React from 'react';
import {Axios} from 'Public'
import {connect} from 'react-redux';
import css from './song_list.scss'

import playAction from '../../actions/playAction'

@connect(state => {return {...state}}, playAction)
export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {
                list: {}
            },
            songs: {
                list: {
                    info: []
                }
            }
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        // console.log(this.props.match.params.rankid);
        let specialid = this.props.match.params.specialid;
        Axios.post('/api/op', {url: `http://m.kugou.com/plist/list/${specialid}?json=true`}).then(ret => {
            this.setState({songs: ret.data.list, info: ret.data.info})
        })
    };

    go = (dat) => {
        this.props.router.replace({
            pathname: '/list_info',
            query: {code: dat.rankid}
        })
    };

    add = (dat) => {
        Axios.post('/api/op', {url: `http://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=${dat.hash}&from=mkugou`}).then(ret => {
            this.props.addSinger(ret.data);
            this.props.play()
        })
    };

    render() {
        const {songs, info} = this.state
        // console.log(songs,info);
        return <div className={css.list}>
            <div className={css.list_info}>
                {'imgurl' in info.list ?
                <img src={info.list.imgurl.replace('{size}', '400')} alt={info.rankname}/> : null}
            </div>
            <ul>
                {songs.list.info.map((item, i) => {
                    let style = i%2 ? null : css.li_show;
                    return <li onClick={() => this.add(item, i)} key={i} className={style}>
                        <div className={css.list_name}>{item.filename}</div>
                    </li>
                })}
            </ul>
        </div>;
    }
}

