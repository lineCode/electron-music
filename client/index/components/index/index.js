import React from 'react';
import css from './index.scss'
import {Route, Redirect, Switch as RouterSwitch, Link} from 'react-router-dom'
import Bundle from '../../bundle';
import {menu} from '../../config'

import FzfController from 'bundle-loader?lazy&name=fzf!../fzf'
import ListController from 'bundle-loader?lazy&name=list!../list'
import MainController from 'bundle-loader?lazy&name=main!../main'
import MvController from 'bundle-loader?lazy&name=mv!../mv'
import MySongController from 'bundle-loader?lazy&name=my_song!../my_song'
import PalyListController from 'bundle-loader?lazy&name=paly_list!../paly_list'
import SingerController from 'bundle-loader?lazy&name=singer!../singer'
import SongController from 'bundle-loader?lazy&name=song!../song'

const Fzf = (props) => <Bundle load={FzfController}>{(A) => <A {...props}/>}</Bundle>;
const List = (props) => <Bundle load={ListController}>{(A) => <A {...props}/>}</Bundle>;
const Main = (props) => <Bundle load={MainController}>{(A) => <A {...props}/>}</Bundle>;
const Mv = (props) => <Bundle load={MvController}>{(A) => <A {...props}/>}</Bundle>;
const MySong = (props) => <Bundle load={MySongController}>{(A) => <A {...props}/>}</Bundle>;
const PalyList = (props) => <Bundle load={PalyListController}>{(A) => <A {...props}/>}</Bundle>;
const Singer = (props) => <Bundle load={SingerController}>{(A) => <A {...props}/>}</Bundle>;
const Song = (props) => <Bundle load={SongController}>{(A) => <A {...props}/>}</Bundle>;

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlIndex: 0,
            musicIndex: 0,
            progressSta: true,
            listSta: false,
            nowMusic: {},
        };
        this.music = {
            duration: 0,
            currentTime: 0,
            paused: true, // 播放状态
            volume: 1,
            src: '',
            ended: false,
            buffered: 1
        };
        this.musicList = [
            {id: 1, name: '我的小宝贝', singer: '夏天', time: '3:12', url: './build/music/1.mp3'},
            {id: 2, name: '白山茶', singer: '陈雪凝', time: '4:14', url: './build/music/2.mp3'},
            {id: 3, name: '白山茶', singer: '陈雪凝', time: '4:14', url: './build/music/1.mp3'},
        ];
    }

    componentDidMount() {
        setInterval(this.init, 1000)
    }

    init = () => {
        const {progressSta} = this.state;
        this.music = {
            duration: this.refs.music.duration,
            currentTime: progressSta ? this.refs.music.currentTime : this.music.currentTime,
            paused: this.refs.music.paused,
            volume: this.refs.music.volume,
            src: this.refs.music.currentSrc,
            ended: this.refs.music.ended,
            buffered: this.refs.music.buffered
        };
        this.setState(this.state);
        if (this.music.ended) {
            this.play(1)
        }
    };

    go = (i) => {
        this.setState({urlIndex: i})
    };

    play = (i) => {
        let nowMusic = this.state.nowMusic;
        let musicIndex = this.state.musicIndex;
        if (i === 1 || i === -1) {
            // TODO: 出现播放类型再添加判断
            let index = musicIndex+i;
            index < 0 ? index = this.musicList.length-1 : null;
            index > this.musicList.length-1 ? index = 0 : null;
            this.refs.music.src = this.musicList[index].url;
            this.music.src = this.musicList[index].url;
            nowMusic = this.musicList[index];
            musicIndex = index;
            this.music.paused = true
        }
        if (!this.music.src) {
            // TODO: 出现播放类型再添加判断
            this.refs.music.src = this.musicList[0].url;
            this.music.src = this.musicList[0].url;
            nowMusic = this.musicList[0]
            musicIndex = 0;
            this.music.paused = true
        }
        if (this.music.paused) {
            this.music.paused = false
            setTimeout(() => {
                this.refs.music.play();
            }, 0)
        } else {
            this.refs.music.pause();
            this.music.paused = true
        }
        this.setState({...this.state, nowMusic: nowMusic, musicIndex: musicIndex});
    };

    formatTime = (t) => {
        t = parseInt(t);
        return `${parseInt(t / 60)}:${t % 60}`;
    };

    down = (ev) => {
        this.setState({progressSta: false});
        let _this = this;
        let w = document.documentElement.clientWidth - 590;
        let oevent = ev || event;
        let distanceX = 234;
        document.onmousemove = function (ev) {
            let oevent = ev || event;
            let left = oevent.clientX - distanceX;
            if (left <= 0) {
                left = 0;
            } else if (left >= document.documentElement.clientWidth - 590) {
                left = document.documentElement.clientWidth - 590;
            }
            _this.music.currentTime = _this.music.duration * left / w;
            _this.setState({..._this.state});
        };
        document.onmouseup = function () {
            _this.refs.music.currentTime = _this.music.currentTime;
            _this.setState({progressSta: true});
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };

    list = () => {
        this.setState({listSta: !this.state.listSta})
    };

    open = (dat, i) => {
        this.refs.music.src = dat.url;
        this.setState({nowMusic: dat, musicIndex: i}, () => this.refs.music.play());
    };

    render() {
        const {urlIndex, listSta, nowMusic} = this.state;
        let {duration, currentTime, paused} = this.music;
        if (isNaN(duration)) {
            duration = 0
        }
        let currentTimes = currentTime / duration * 100;
        return <div className={css.box}>
            <div className={css.content}>
                <div className={css.menu}>
                    <div className={css.title}>
                        <h1>吉姆餐厅</h1>
                        <img src="./build/img/24.png" alt=""/>
                    </div>
                    <div className={css.search}>
                        <input type="text" placeholder="搜索你的喜好"/>
                        <img src="./build/img/6.png" alt=""/>
                        <div></div>
                        <img src="./build/img/22.png" alt=""/>
                    </div>
                    <div className={css.menu_list}>
                        <ul>
                            {menu.map((item, i) => {
                                let active = (i === urlIndex) ? css.menu_active : null;
                                return <li onClick={() => this.go(i)} className={active} key={i}><Link
                                    to={item.url}><img src={item.icon}/>{item.val}</Link></li>
                            })}
                        </ul>
                    </div>
                    <div className={css.user}>
                        <img className={css.user_head} src="./build/img/head.png" alt=""/>
                        <div className={css.user_info}>
                            <p>听歌的小孩</p>
                            <span>274635143@qq.com</span>
                        </div>
                        <img className={css.user_seting} src="./build/img/14.png" alt=""/>
                    </div>
                </div>
                <div className={css.details}>
                    <div className={css.head}>
                        <div className={css.head_title}>
                            <div className={css.head_title_operation}>
                                <img src="./build/img/25.png" alt=""/>
                                <img src="./build/img/25_1.png" alt=""/>
                            </div>
                            <div className={css.head_title_txt}>
                                <span>音乐推荐</span>
                            </div>
                        </div>
                        <div className={css.head_operation}>
                            <img src="./build/img/26.png" alt=""/>
                            <img className={css.max} src="./build/img/27.png" alt=""/>
                            <img src="./build/img/28.png" alt=""/>
                        </div>
                    </div>
                    <div className={css.info}>
                        <RouterSwitch>
                            <Route path="/" component={Main} exact/>
                            <Route path="/list" component={List} exact/>
                            <Route path="/mv" component={Mv} exact/>
                            <Route path="/my_song" component={MySong} exact/>
                            <Route path="/paly_list" component={PalyList} exact/>
                            <Route path="/singer" component={Singer} exact/>
                            <Route path="/song" component={Song} exact/>
                            <Route path="/404" component={Fzf} exact/>
                            <Redirect to="/404"/>
                        </RouterSwitch>
                    </div>
                </div>
            </div>
            <div className={css.footer}>
                <div className={css.now_music}>
                    <img className={css.now_music_img} src="./build/img/now.png" alt=""/>
                    <div className={css.now_music_info}>
                        <p>{nowMusic.name}</p>
                        <span>{nowMusic.singer}</span>
                    </div>
                </div>
                <div className={css.control}>
                    <div className={css.progress}>
                        <div className={css.progress_time}>{this.formatTime(currentTime)}</div>
                        <div className={css.progress_all}></div>
                        <div className={css.progress_start}>
                            <div style={{width: `${currentTimes}%`}} className={css.progress_now}></div>
                            <div style={{left: `calc(${currentTimes}% - 10px)`}} ref="currentTimeIcon"
                                 className={css.progress_img}>
                                <img onMouseDown={this.down} src="./build/img/22.png" alt=""/>
                            </div>
                        </div>
                        <div className={css.progress_times}>{this.formatTime(duration)}</div>
                        <audio ref="music" src={nowMusic.url}></audio>
                    </div>
                    <div className={css.operation}>
                        <img onClick={() => this.play(-1)} className={css.operation_left} src="./build/img/16.png" alt=""/>
                        <img onClick={this.play} className={css.operation_play} src={paused !== false ? './build/img/29.png' : './build/img/18.png'} alt=""/>
                        <img onClick={() => this.play(1)} className={css.operation_right} src="./build/img/17.png" alt=""/>
                        <img className={css.operation_type} src="./build/img/15.png" alt=""/>
                        <img className={css.operation_like} src="./build/img/20.png" alt=""/>
                        <img className={css.operation_voice} src="./build/img/19.png" alt=""/>
                        <img onClick={this.list} className={css.operation_catalog} src="./build/img/21.png" alt=""/>
                        {listSta ?
                        <div className={css.list}>
                            <span>播放列表</span>
                            <ul>
                                {this.musicList.map((item, i) => {
                                    let style = i%2 ? css.li_show : null;
                                    let style1 = (nowMusic.id === item.id) ? css.list_active : null;
                                    return <li onClick={() => this.open(item, i)} key={i} className={`${style} ${style1}`}>
                                        <div className={css.list_name}>{item.name}</div>
                                        <div className={css.list_singer}>{item.singer}</div>
                                        <div className={css.list_time}>{item.time}</div>
                                    </li>
                                })}
                            </ul>
                        </div> : null}
                    </div>
                </div>
            </div>
        </div>
    }
}