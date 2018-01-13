import React from 'react';
import {Axios} from 'Public'
import css from './krc.scss'
import Comment from '../comment'

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            krc: [],
            krcSta: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('nowMusic' in this.props && 'nowMusic' in nextProps) {
            if (this.props.nowMusic.singerId !== nextProps.nowMusic.singerId) {
                this.getKrc(nextProps.nowMusic)
            }
        }
    }

    getKrc = (dat) => {
        Axios.post('/api/op', {url: `http://m.kugou.com/app/i/krc.php?cmd=100&keyword=${dat.fileName}&hash=${dat.hash}&timelength=${dat.timeLength*1000}&d=0.5557390969886549`}).then(ret => {
            let krc = ret.data, krcBase = [];
            krc = krc.split('[');
            krc.map(item => {
                if (item) {
                    krcBase.push({
                        tile: item.split(']')[0],
                        txt: item.split(']')[1],
                    })
                }
            });
            this.setState({krc: krcBase})
        })
    };

    changeKrc = () => {
        this.setState({krcSta: !this.state.krcSta})
    };

    render() {
        const {nowMusic, paused} = this.props;
        const {krc, krcSta} = this.state;
        return <div className={css.now_music}>
            <div style={{width: `${krcSta ? '100%' : '0'}`, transform: `scale(${krcSta? 1: 0})`}} className={css.krc}>
                <div className={css.krc_bg}>
                    <img src={'imgUrl' in nowMusic ? nowMusic.imgUrl.replace('{size}', '400') : null} alt=""/>
                </div>
                <div className={css.krc_close}>
                    <i onClick={this.changeKrc} className="iconfont icon-guanbi1"/>
                </div>
                <div className={css.krc_box}>
                    <div className={css.krc_box_info}>
                        <img style={{animation: !paused ? 'rotating 20s linear infinite' : ''}} src={'imgUrl' in nowMusic ? nowMusic.imgUrl.replace('{size}', '400') : null} alt=""/>
                        <div className={css.krc_box_info_oper}>
                            <button>喜欢</button>
                            <button>收藏</button>
                            <button>分享</button>
                        </div>
                    </div>
                    <div className={css.krc_box_txt}>
                        <ul>
                            {krc.map((item, i) => {
                                return <li key={i}>{item.txt}</li>
                            })}
                        </ul>
                    </div>
                </div>
                <Comment/>
            </div>
            <img onClick={this.changeKrc} className={css.now_music_img} src={'imgUrl' in nowMusic ? nowMusic.imgUrl.replace('{size}', '400') : null} alt=""/>
            <div className={css.now_music_info}>
                <p>{nowMusic.songName}</p>
                <span>{nowMusic.singerName}</span>
            </div>
        </div>
    }
}