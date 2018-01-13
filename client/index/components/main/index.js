import React from 'react';
import {Axios} from 'Public'
import {Link} from 'react-router-dom'
import css from './main.scss'
import BannerAnim, {Element} from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import 'rc-banner-anim/assets/index.css';
const BgElement = Element.BgElement;
import {connect} from 'react-redux';
import playAction from '../../actions/playAction'

@connect(state => {
    return {...state}
}, playAction)
export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            banner: [],
            songs: []
        };

    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        Axios.post('/api/op', {url: 'http://m.kugou.com/?json=true'}).then(ret => {
            this.setState({banner: ret.data.banner, songs: ret.data.data})
        })
    };

    add = (dat) => {
        Axios.post('/api/op', {url: `http://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=${dat.hash}&from=mkugou`}).then(ret => {
            this.props.addSinger(ret.data);
            this.props.play()
        })
    };

    render() {
        const {banner, songs} = this.state;
        return <div>
            {banner.length ? <BannerAnim type="grid" autoPlay prefixCls="banner-user"
                                         style={{width: '800px', margin: '10px auto 0', minHeight: '320px', zIndex: 0}}>
                {banner.map((item, i) => {
                    return <Element prefixCls="banner-user-elem" key={i}>
                        <BgElement key={i} style={{textAlign: 'center'}}>
                            <Link key={i} to={'specialid' in item.extra ? `/song_list/${item.extra.specialid}` : ''} className={css.he_ZoomInImg_caption_a}>
                                <img key={i} style={{width: '720px'}} src={item.imgurl} alt={item.title}
                                     title={item.title}/>
                            </Link>
                        </BgElement>
                        <TweenOne style={{
                            bottom: 0,
                            backgroundColor: 'rgba(255, 255, 255, .3)',
                            width: '720px',
                            margin: '-24px auto 0',
                            textAlign: 'center',
                            color: '#fff'
                        }} animation={{y: 30, opacity: 0, type: 'from'}}>
                            {item.title}
                        </TweenOne>
                    </Element>
                })}
            </BannerAnim> : null}
            <div className={css.list}>
                <ul>
                    {songs.map((item, i) => {
                        let style = i % 2 ? null : css.li_show;
                        return <li onClick={() => this.add(item, i)} key={i} className={style}>
                            <div>{item.filename}</div>
                        </li>
                    })}
                </ul>
            </div>
        </div>;
    }
}