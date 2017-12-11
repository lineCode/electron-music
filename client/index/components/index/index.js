import React from 'react';
import css from './index.scss'
import {Route, Redirect, HashRouter as Router, Switch as RouterSwitch} from 'react-router-dom'
import {connect} from 'react-redux';
import Bundle from '../../bundle';

import HeadController from 'bundle-loader?lazy&name=head!../head'
import MenuController from 'bundle-loader?lazy&name=menu!../menu'
import BofangController from 'bundle-loader?lazy&name=bofang!../bofang'
import FzfController from 'bundle-loader?lazy&name=fzf!../fzf'
import ListController from 'bundle-loader?lazy&name=list!../list'
import MainController from 'bundle-loader?lazy&name=main!../main'
import MvController from 'bundle-loader?lazy&name=mv!../mv'
import MySongController from 'bundle-loader?lazy&name=my_song!../my_song'
import PalyListController from 'bundle-loader?lazy&name=paly_list!../paly_list'
import SingerController from 'bundle-loader?lazy&name=singer!../singer'
import SingerSongController from 'bundle-loader?lazy&name=singer_song!../singer_song'
import SongController from 'bundle-loader?lazy&name=song!../song'
import SongListController from 'bundle-loader?lazy&name=song_list!../song_list'
import ListInfoController from 'bundle-loader?lazy&name=list_info!../list_info'

const Head = (props) => <Bundle load={HeadController}>{(A) => <A {...props}/>}</Bundle>;
const Menu = (props) => <Bundle load={MenuController}>{(A) => <A {...props}/>}</Bundle>;
const Bofang = (props) => <Bundle load={BofangController}>{(A) => <A {...props}/>}</Bundle>;
const Fzf = (props) => <Bundle load={FzfController}>{(A) => <A {...props}/>}</Bundle>;
const List = (props) => <Bundle load={ListController}>{(A) => <A {...props}/>}</Bundle>;
const Main = (props) => <Bundle load={MainController}>{(A) => <A {...props}/>}</Bundle>;
const Mv = (props) => <Bundle load={MvController}>{(A) => <A {...props}/>}</Bundle>;
const MySong = (props) => <Bundle load={MySongController}>{(A) => <A {...props}/>}</Bundle>;
const PalyList = (props) => <Bundle load={PalyListController}>{(A) => <A {...props}/>}</Bundle>;
const Singer = (props) => <Bundle load={SingerController}>{(A) => <A {...props}/>}</Bundle>;
const SingerSong = (props) => <Bundle load={SingerSongController}>{(A) => <A {...props}/>}</Bundle>;
const Song = (props) => <Bundle load={SongController}>{(A) => <A {...props}/>}</Bundle>;
const SongList = (props) => <Bundle load={SongListController}>{(A) => <A {...props}/>}</Bundle>;
const ListInfo = (props) => <Bundle load={ListInfoController}>{(A) => <A {...props}/>}</Bundle>;

import userAction from '../../actions/userAction'

@connect(state => {
    return {...state}
}, userAction)
export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuShowSta: true
        }
    }

    close = () => {
        this.setState({menuShowSta: !this.state.menuShowSta})

        // console.log(this.props);

        this.props.login()
    };

    render() {

        const {menuShowSta} = this.state;
        return <Router>
            <div className={css.box}>
                <div className={css.content}>
                    <Head menuShowSta={menuShowSta} close={this.close} {...this.props}/>
                    <div className={css.details}>
                        <Menu menuShowSta={menuShowSta}/>
                        <div style={{width: menuShowSta ? 'calc(100% - 200px)' : '100%'}} className={css.info}>
                            <RouterSwitch>
                                <Route path="/" component={Main} exact/>
                                <Route path="/list" component={List}/>
                                <Route path="/list_info/:rankid" component={ListInfo}/>
                                <Route path="/mv" component={Mv}/>
                                <Route path="/my_song" component={MySong}/>
                                <Route path="/paly_list" component={PalyList}/>
                                <Route path="/singer" component={Singer}/>
                                <Route path="/singer_song/:singerid" component={SingerSong}/>
                                <Route path="/song" component={Song}/>
                                <Route path="/song_list/:specialid" component={SongList}/>
                                <Route path="/404" component={Fzf}/>
                                <Redirect to="/404"/>
                            </RouterSwitch>
                        </div>
                    </div>
                </div>
                <Bofang {...this.props}/>
            </div>
        </Router>
    }
}