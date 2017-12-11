import React from 'react';
import css from './head.scss'

export default class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    close = () => {
        Electron.ipcRenderer.send('hideapp');
    };

    render() {
        const {menuShowSta} = this.props;
        return <div className={css.menu}>
            <div className={css.title}>
                <h1>吉姆餐厅</h1>
                <i onClick={this.props.close} className={menuShowSta ? 'iconfont icon-shouqi' : 'iconfont icon-shouqi1'}/>
            </div>
            <div className={css.head}>
                <div className={css.head_title}>
                    <div className={css.head_title_operation}>
                        <i onClick={() => {window.history.back()}} className="iconfont icon-xiangzuo"/>
                    </div>
                    <div className={css.head_title_txt}>
                        <span>音乐推荐</span>
                    </div>
                </div>
                <div className={css.head_operation}>
                    <i className="iconfont icon-zuixiaohua"/>
                    <i className="iconfont icon-zuidahua"/>
                    <i onClick={this.close} className="iconfont icon-guanbi"/>
                </div>
            </div>
        </div>
    }
}