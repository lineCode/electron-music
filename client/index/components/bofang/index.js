import React from 'react';
import axios from 'axios'
import css from './bofang.scss'
import Krc from '../krc'

let timeoutflag = null, timeoutVolume = null;
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
            menuShowSta: true,
            volume: 1,
            volumeShowSta: false,
            volumeShowStaTwo: false,
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
        this.musicList = musicList
    }

    componentWillReceiveProps(props) {
        // console.log(props.player.isplay);
        if (props.player.isplay) {
            this.refs.music.play();
        } else {
            this.refs.music.pause();
        }
    }

    componentDidMount() {
        this.play(undefined, 1);

        this.refs.music.addEventListener("progress", (e) => {
            console.log('progress', e);
            // this.setState({
            //     buffered: e.target.buffered.end(e.target.buffered.length - 1)
            // });
        }, true);

        this.refs.music.addEventListener("durationchange", e => {
            console.log('durationchange', e);
            // this.setState({
            //     duration: e.target.duration
            // });
        }, true)

        this.refs.music.addEventListener("timeupdate", e => {
            console.log('timeupdate', e);
            this.init()

            // if (self.mouseState.press || self.state.playbuttonIcon == 'play') {
            //     return;
            // }
            // this.setState({
            //     currentTime: e.target.currentTime
            // });
            //
            // const { playcontent } = this.props;
            //
            // let i = playcontent.currentLyric + 1;
            // if (i < playcontent.lyric.lyric.length && playcontent.lyric.lyric[i].time < e.target.currentTime) {
            //     this.props.actions.setlyric(i);
            // }
        }, true)

        this.refs.music.addEventListener("canplay", e => {
            console.log('canplay', e);
            // if (this.autoplay) {
            //     self.props.actions.play();
            //     this.autoplay = false;
            //     this.setState({
            //         state: 'get',
            //     });
            // }
        }, true)

        this.refs.music.addEventListener("ended", e => {
            console.log('ended', e);
            // self.props.actions.nextSong();
        }, true)

        this.refs.music.addEventListener("seeked", e => {
            console.log('seeked', e);
            // const { playcontent } = this.props;
            // console.logg('seekset', e.target.currentTime, this.getCurrentLyric(
            //     0,
            //     playcontent.lyric.lyric.length - 1,
            //     e.target.currentTime,
            //     playcontent.lyric.lyric
            // ));
            // self.props.actions.setlyric(this.getCurrentLyric(
            //     0,
            //     playcontent.lyric.lyric.length - 1,
            //     e.target.currentTime,
            //     playcontent.lyric.lyric
            // ));
        }, true);

        Electron.ipcRenderer.on('playorpause', event => {
            console.log('dadas');
        });

        // setInterval(this.init, 1000);
        let _this = this;
        window.onkeydown = function (event) {
            let e = event || window.event || arguments.callee.caller.arguments[0];
            console.log(e.keyCode);
            if (e && e.keyCode === 32) {
                _this.play()
            }
            if (e && e.keyCode === 37 && e.ctrlKey) {
                _this.play(-1)
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

    play = (i, tp) => {
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
            this.music.paused = true;
        }
        if (!this.music.src) {
            // TODO: 出现播放类型再添加判断
            this.refs.music.src = this.musicList[0].url;
            this.music.src = this.musicList[0].url;
            nowMusic = this.musicList[0];
            musicIndex = 0;
            this.music.paused = true;
        }
        if (this.music.paused) {
            this.music.paused = false;
            setTimeout(() => {
                if (!tp) {
                    this.refs.music.play()
                }
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

    changeVolume = (i) => {
        let volume = this.refs.music.volume;
        if (i >= -0.1) {
            volume = parseFloat(volume);
            volume += i;
            volume > 1 ? volume = 1.0 : null;
            volume < 0 ? volume = 0.0 : null;
            this.refs.music.volume = volume;
            this.music.volume = volume;
            this.state.volume = volume
        } else {
            if (this.music.volume > 0) {
                this.refs.music.volume = 0.0;
                this.music.volume = 0.0
            } else {
                this.refs.music.volume = this.state.volume;
                this.music.volume = this.state.volume
            }
        }
        this.setState({...this.state, volume: volume, volumeShowSta: true}, () => {
            if(timeoutVolume !== null){
                clearTimeout(timeoutVolume);
            }
            timeoutVolume = setTimeout(() => {
                if (!this.state.volumeShowStaTwo) {
                    this.setState({volumeShowSta: false})
                }
            }, 500)
        });
    };

    // 声音显示
    changeVolumeShow = (type, sta) => {
        if (type) {
            if(!sta){
                if(timeoutVolume !== null){
                    clearTimeout(timeoutVolume);
                }
                timeoutVolume = setTimeout(() => {
                    this.setState({volumeShowStaTwo: sta, volumeShowSta: sta})
                }, 500)
            }else{
                this.setState({volumeShowStaTwo: sta, volumeShowSta: sta})
            }
        }else{
            if (sta) {
                this.setState({volumeShowSta: sta})
            }else{
                if(timeoutVolume !== null){
                    clearTimeout(timeoutVolume);
                }
                timeoutVolume = setTimeout(() => {
                    if (!this.state.volumeShowStaTwo) {
                        this.setState({volumeShowSta: sta})
                    }
                }, 500)
            }
        }
    };

    // 拖动声音
    volumeBar = (e) => {
        let _this = this;
        let vNum = _this.music.volume;

        let oevent = e || event;
        let top = oevent.clientY;
        vNum = (document.documentElement.clientHeight - top - 64)/60;
        vNum < 0 ? vNum = 0.0 : null;
        vNum > 1 ? vNum = 1 : null;
        _this.music.volume = vNum;
        _this.state.volume = vNum;
        _this.refs.music.volume = vNum;
        _this.setState({..._this.state});

        document.onmousemove = function (ev) {
            let oevent = ev || event;
            let top = oevent.clientY;
            vNum = (document.documentElement.clientHeight - top - 64)/60;
            vNum < 0 ? vNum = 0.0 : null;
            vNum > 1 ? vNum = 1 : null;
            _this.music.volume = vNum;
            _this.state.volume = vNum;
            _this.refs.music.volume = vNum;
            _this.setState({..._this.state});
        };
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };

    render() {
        const {listSta, nowMusic, playType, playTypeMessageSta, volumeShowSta} = this.state;
        let {duration, currentTime, paused, volume} = this.music;
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
                            {/*<img onMouseDown={this.down} src="./build/img/22.png" alt=""/>*/}
                        </div>
                    </div>
                    <div className={css.progress_times}>{this.formatTime(duration)}</div>
                    <audio ref="music" src={nowMusic.url}/>
                </div>
                <div className={css.operation}>
                    <i onClick={() => this.play(-1)} className="iconfont icon-life"/>
                    <i onClick={this.play} className={paused !== false ? `iconfont icon-bofang ${css.operation_play}` : `iconfont icon-zanting ${css.operation_play}`}/>
                    <i onClick={() => this.play(1)} className="iconfont icon-right"/>
                    <i onClick={this.changePlayTpye} className={playTypeIcon}/>
                    <i className={`iconfont icon-xihuanfill ${css.operation_like}`}/>
                    <i style={{color: '#F44336'}} className="iconfont icon-xihuanfill"/>
                    <i onMouseMove={() => this.changeVolumeShow(0, true)} onMouseLeave={() => this.changeVolumeShow(0, false)} onClick={this.changeVolume} className={volume !== 0 ? 'iconfont icon-shengyin' : 'iconfont icon-jingyin1'}/>
                    <i onClick={this.list} className="iconfont icon-liebiao1"/>
                    {playTypeMessageSta ?
                        <div className={css.play_type_message}>{playTypeMessage}</div> : null}
                    {volumeShowSta ?
                        <div onMouseMove={() => this.changeVolumeShow(1, true)} onMouseLeave={() => this.changeVolumeShow(1, false)} className={css.volume_box}>
                            <div onMouseDown={this.volumeBar} className={css.volume_show}>
                                <div style={{height: `${volume*100}%`}} className={css.volume_show_bar}/>
                            </div>
                        </div> : null}
                    {listSta ?
                        <div className={css.list}>
                            <span>播放列表</span>
                            <ul>
                                {this.musicList.map((item, i) => {
                                    let style = i%2 ? css.li_show : null;
                                    let style1 = (nowMusic.singerId === item.singerId) ? css.list_active : null;
                                    return <li onClick={() => this.open(item, i)} key={i} className={`${style} ${style1}`}>
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