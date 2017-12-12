import React from 'react';
import axios from 'axios'
import {connect} from 'react-redux';
import { withRouter } from 'react-router'
import css from './list_info.scss'
import playAction from '../../actions/playAction'

@connect(state => {return {...state}}, playAction)
export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {},
            songs: {
                list: []
            }
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        // console.log(this.props.match.params.rankid);
        let rankid = this.props.match.params.rankid;
        axios.get(`http://m.kugou.com/rank/info/${rankid}&json=true`).then(ret => {
            // console.log(ret);
            this.setState({songs: ret.data.songs, info: ret.data.info})
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

