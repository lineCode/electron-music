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

let timeoutflag = null;
export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlIndex: 0,
            musicIndex: 0,
            progressSta: true,
            listSta: false,
            nowMusic: {},
            playType: 0,
            playTypeMessageSta: false,
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
        let distanceX = 238;
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
            if(_this.music.src) {
                _this.refs.music.currentTime = _this.music.currentTime;
                _this.setState({progressSta: true});
            }
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

    // 改变播放循序
    changePlayTpye = () => {
        let playType = this.state.playType;
        playType += 1;
        playType > 2 ? playType = 0 : null;
        this.setState({playType: playType, playTypeMessageSta: true}, () => {
            if(timeoutflag !== null){
                clearTimeout(timeoutflag);
            }
            timeoutflag = setTimeout(() => {
                this.setState({playTypeMessageSta: false})
            }, 2000)
        })
    };

    render() {
        const {urlIndex, listSta, nowMusic, playType, playTypeMessageSta} = this.state;
        let {duration, currentTime, paused, buffered} = this.music;
        if (isNaN(duration)) {
            duration = 0
        }
        if (isNaN(currentTime)) {
            currentTime = 0
        }
        let playTypeIcon = '', playTypeMessage = '';
        switch (playType) {
            case 0:
                playTypeIcon = 'iconfont icon-yinpinliebiaoxunhuan';
                playTypeMessage = '顺序播放';
                break;
            case 1:
                playTypeIcon = 'iconfont icon-qiatong-suijibofang';
                playTypeMessage = '随机播放';
                break;
            default:
                playTypeIcon = 'iconfont icon-yinpindanquxunhuan';
                playTypeMessage = '单曲循环';
                break;
        }
        let currentTimes = currentTime / duration * 100;
        return <div className={css.box}>
            <div className={css.content}>
                <div className={css.menu}>
                    <div className={css.title}>
                        <h1>吉姆餐厅</h1>
                        <i className="iconfont icon-shouqi"/>
                    </div>
                    <div className={css.head}>
                        <div className={css.head_title}>
                            <div className={css.head_title_operation}>
                                <i className="iconfont icon-xiangzuo"/>
                            </div>
                            <div className={css.head_title_txt}>
                                <span>音乐推荐</span>
                            </div>
                        </div>
                        <div className={css.head_operation}>
                            <i className="iconfont icon-zuixiaohua"/>
                            <i className="iconfont icon-zuidahua"/>
                            <i className="iconfont icon-guanbi"/>
                        </div>
                    </div>

                </div>
                <div className={css.details}>
                    <div className={css.details_menu}>
                        <div className={css.search}>
                            <input type="text" placeholder="搜索你的喜好"/>
                            <i className="iconfont icon-sousuo"/>
                            <div></div>
                            <i className={`iconfont icon-yuan ${css.yuan}`}/>
                        </div>
                        <div className={css.division}></div>
                        <div className={css.menu_list}>
                            <ul>
                                {menu.map((item, i) => {
                                    let active = (i === urlIndex) ? css.menu_active : null;
                                    return <li onClick={() => this.go(i)} className={active} key={i}><Link
                                        to={item.url}><i className={item.icon}/>{item.val}</Link></li>
                                })}
                            </ul>
                        </div>
                        <div className={css.user}>
                            <img className={css.user_head} src="./build/img/head.png" alt=""/>
                            <div className={css.user_info}>
                                <p>听歌的小孩</p>
                                <span>274635143@qq.com</span>
                            </div>
                            <i className="iconfont icon-shezhi"/>
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
                                <i onMouseDown={this.down} className="iconfont icon-yuan"/>
                                {/*<img onMouseDown={this.down} src="./build/img/22.png" alt=""/>*/}
                            </div>
                        </div>
                        <div className={css.progress_times}>{this.formatTime(duration)}</div>
                        <audio ref="music" src={nowMusic.url}></audio>
                    </div>
                    <div className={css.operation}>
                        <i onClick={() => this.play(-1)} className="iconfont icon-life"/>
                        <i onClick={this.play} className={paused !== false ? `iconfont icon-bofang ${css.operation_play}` : `iconfont icon-zanting ${css.operation_play}`}/>
                        <i onClick={() => this.play(1)} className="iconfont icon-right"/>
                        <i onClick={this.changePlayTpye} className={playTypeIcon}/>
                        <i className={`iconfont icon-xihuanfill ${css.operation_like}`}/>
                        <i style={{color: '#F44336'}} className="iconfont icon-xihuanfill"/>
                        <i className="iconfont icon-shengyin"/>
                        <i onClick={this.list} className="iconfont icon-liebiao1"/>
                        {playTypeMessageSta ?
                            <div className={css.play_type_message}>{playTypeMessage}</div> : null}
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