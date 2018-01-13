import React from 'react';
import css from './bofang.scss'
import Krc from '../krc'
// var Electron = require("electron");
export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progressSta: true,              // 拖动进度状态
            listSta: false,                 // 播放列表显示状态
            playType: 0,                    // 播放歌曲循环类型 0,1,2
            playTypeMessageSta: false,      // 播放歌曲循环类型改变提示框状态
            volume: 1,                      // 音量
            volumeShowSta: false,           // 音量框状态1
            volumeShowStaTwo: false,        // 音量框状态2
            duration: 0,                    // 歌曲总时长
            currentTime: 0,                 // 歌曲播放时长
            dragCurrentTime: 0,             // 拖动歌曲位置时长
        };
        this.timeoutflag = null;            // 播放歌曲循环类型改变后提示框关闭的延时容器
    }

    // 监控播放状态
    componentWillReceiveProps(nextProps) {
        setTimeout(() => {
            if (nextProps.player.isplay) {
                if (nextProps.singer.singer.length) {
                    this.refs.music.play();
                } else {
                    alert('没有歌曲，请添加喜欢的歌曲在播放列表');
                    this.props.pause()
                }
            } else {
                this.refs.music.pause();
            }
        }, 0)
    }

    componentDidMount() {
        // 初始化
        this.init();
        // electron监控初始化
        this.electron();
        // 按键初始化
        this.onKeyDown()
    }

    // 初始化
    init = () => {
        this.refs.music.addEventListener("progress", (e) => {
            // console.log('progress', e);
        }, true);

        this.refs.music.addEventListener("durationchange", e => {
            // console.log('durationchange', e);
        }, true);

        this.refs.music.addEventListener("timeupdate", e => {
            this.setState({
                duration: e.target.duration,
                currentTime: e.target.currentTime
            });
        }, true);

        this.refs.music.addEventListener("canplay", e => {
            // console.log('canplay', e);
        }, true);

        this.refs.music.addEventListener("ended", e => {
            // console.log('ended', e);
            this.next(true)
        }, true);

        this.refs.music.addEventListener("seeked", e => {
            // console.log('ended', e);
        }, true);
    };

    // 接收外部指令
    electron = () => {
        // Electron.ipcRenderer.on('playorpause', event => {
        //     console.log('playorpause');
        // });
    };

    // 全局按键
    onKeyDown = () => {
        let _this = this;
        window.onkeydown = function (event) {
            let e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode === 32) {
                _this.play()
            }
            if (e && e.keyCode === 37 && e.ctrlKey) {
                _this.play()
            }
            if (e && e.keyCode === 38 && e.ctrlKey) {
                _this.changeVolume(0.1)
            }
            if (e && e.keyCode === 39 && e.ctrlKey) {
                _this.play(1)
            }
            if (e && e.keyCode === 40 && e.ctrlKey) {
                _this.changeVolume(-0.1)
            }
        }
    };

    // 播放
    play = () => {
        if (this.props.player.isplay) {
            this.props.pause()
        } else {
            this.props.play()
        }
    };

    // 上一首(tp=false)，下一首(tp=true)
    next = (tp) => {
        const {playType} = this.state;
        let {singer, play} = this.props.singer;
        let len = singer.length;
        let hash = play.hash;


        switch (playType) {
            case 0:
                // 顺序
                let index = 0;
                singer.map((item, i) => {
                    if (item.hash === hash) {
                        index = i - 1;
                        if (tp) {
                            index = i + 1;
                        }
                    }
                });
                if (index < 0) {
                    index = len - 1
                }
                if (tp && index >= len) {
                    index = 0
                }
                console.log(singer, index);

                play = {...play, hash: singer[index].hash};
                this.refs.music.currentTime = 1;
                this.props.singer.play = play;
                this.props.play();
                break;
            case 1:
                // 随机
                // TODO: 待算法改进
                let maIndex = Math.floor(Math.random() * len);
                play = {...play, hash: singer[maIndex].hash};
                this.props.singer.play = play;
                this.props.play();
                break;
            default:
                // 单曲
                this.state.currentTime = 0;
                this.refs.music.currentTime = 0;
                this.props.play();
                break;
        }
    };

    // 格式化时间
    formatTime = (t) => {
        t = parseInt(t);
        return `${parseInt(t / 60)}:${t % 60}`;
    };

    // 拖动进度条
    down = (ev) => {
        this.setState({progressSta: false});
        let _this = this;
        let w = document.documentElement.clientWidth - 590;
        // let oevent = ev || event;
        let distanceX = 238;
        document.onmousemove = function (ev) {
            let oevent = ev || event;
            let left = oevent.clientX - distanceX;
            if (left <= 0) {
                left = 0;
            } else if (left >= document.documentElement.clientWidth - 590) {
                left = document.documentElement.clientWidth - 590;
            }
            _this.state.dragCurrentTime = _this.state.duration * left / w;
            _this.setState({..._this.state});
        };
        document.onmouseup = function () {
            _this.refs.music.currentTime = _this.state.dragCurrentTime;
            _this.setState({progressSta: true});
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };

    // 展开关闭播放列表
    list = () => {
        this.setState({listSta: !this.state.listSta})
    };

    // 点击农房列表播放
    songClick = (dat) => {
        this.props.singer.play = {...this.props.singer.play, hash: dat.hash};
        this.props.play()
    };

    // 声音
    changeVolume = () => {
        console.log('changeVolume');
    };

    // 声音
    changeVolumeShow = (e) => {
        console.log('changeVolumeShow');
    };

    // 改变播放循序
    changePlayTpye = () => {
        let playType = this.state.playType;
        playType += 1;
        playType > 2 ? playType = 0 : null;
        this.setState({playType: playType, playTypeMessageSta: true}, () => {
            if (this.timeoutflag !== null) {
                clearTimeout(this.timeoutflag);
            }
            this.timeoutflag = setTimeout(() => {
                this.setState({playTypeMessageSta: false})
            }, 2000)
        })
    };

    render() {
        const {singer} = this.props;
        let paused = this.props.player.isplay;
        let url = '', nowMusic = {};
        singer.singer.map(item => {
            if (singer.play.hash === item.hash) {
                url = item.url;
                nowMusic = item
            }
        });
        if (!singer.singer.length) {
            paused = false
        }
        let {
            listSta, playType, playTypeMessageSta, volumeShowSta,
            duration, currentTime, dragCurrentTime, progressSta, volume
        } = this.state;

        if (isNaN(duration)) {
            duration = 0
        }
        if (isNaN(currentTime)) {
            currentTime = 0
        }
        if (isNaN(dragCurrentTime)) {
            dragCurrentTime = 0
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
        if (!progressSta) {
            currentTimes = dragCurrentTime / duration * 100;
        }
        return <div className={css.footer}>
            <Krc nowMusic={nowMusic} currentTimes={currentTimes} paused={paused}/>
            <div className={css.control}>
                <div className={css.progress}>
                    <div className={css.progress_time}>{this.formatTime(currentTime)}</div>
                    <div className={css.progress_all}/>
                    <div className={css.progress_start}>
                        <div style={{width: `${currentTimes}%`}} className={css.progress_now}/>
                        <div style={{left: `calc(${currentTimes}% - 10px)`}} ref="currentTimeIcon"
                             className={css.progress_img}>
                            <i onMouseDown={this.down} className="iconfont icon-yuan"/>
                        </div>
                    </div>
                    <div className={css.progress_times}>{this.formatTime(duration)}</div>
                    <audio ref="music" src={url}/>
                </div>
                <div className={css.operation}>
                    <i onClick={() => this.next(false)} className="iconfont icon-life"/>
                    <i onClick={this.play}
                       className={paused === false ? `iconfont icon-bofang ${css.operation_play}` : `iconfont icon-zanting ${css.operation_play}`}/>
                    <i onClick={() => this.next(true)} className="iconfont icon-right"/>
                    <i onClick={this.changePlayTpye} className={playTypeIcon}/>
                    <i className={`iconfont icon-xihuanfill ${css.operation_like}`}/>
                    <i style={{color: '#F44336'}} className="iconfont icon-xihuanfill"/>
                    <i onMouseMove={() => this.changeVolumeShow(0, true)}
                       onMouseLeave={() => this.changeVolumeShow(0, false)} onClick={this.changeVolume}
                       className={volume !== 0 ? 'iconfont icon-shengyin' : 'iconfont icon-jingyin1'}/>
                    <i onClick={this.list} className="iconfont icon-liebiao1"/>
                    {playTypeMessageSta ?
                        <div className={css.play_type_message}>{playTypeMessage}</div> : null}
                    {volumeShowSta ?
                        <div onMouseMove={() => this.changeVolumeShow(1, true)}
                             onMouseLeave={() => this.changeVolumeShow(1, false)} className={css.volume_box}>
                            <div onMouseDown={this.volumeBar} className={css.volume_show}>
                                <div style={{height: `${volume * 100}%`}} className={css.volume_show_bar}/>
                            </div>
                        </div> : null}
                    {listSta ?
                        <div className={css.list}>
                            <span>播放列表</span>
                            <ul>
                                {this.props.singer.singer.map((item, i) => {
                                    let style = i % 2 ? css.li_show : null;
                                    let style1 = (nowMusic.hash === item.hash) ? css.list_active : null;
                                    return <li onClick={() => this.songClick(item, i)} key={i}
                                               className={`${style} ${style1}`}>
                                        <div className={css.list_name}>{item.songName}</div>
                                        <div className={css.list_singer}>{item.singerName}</div>
                                        <div className={css.list_time}>{this.formatTime(item.timeLength)}</div>
                                    </li>
                                })}
                            </ul>
                        </div> : null}
                </div>
            </div>
        </div>
    }
}