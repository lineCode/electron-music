import React from 'react';
import axios from 'axios'
import css from './song_list.scss'

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
        axios.get(`http://m.kugou.com/plist/list/${specialid}?json=true`).then(ret => {
            console.log(ret);
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
        axios.get(`http://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=${dat.hash}&from=mkugou`).then(ret => {
            musicList.push(ret.data)
        })
    };

    render() {
        const {songs, info} = this.state
        console.log(songs,info);
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

