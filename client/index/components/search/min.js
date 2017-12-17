import React from 'react';
import axios from 'axios'
import css from './search.scss'

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
        }
    }

    componentDidMount() {
        this.refs.search.addEventListener("keydown", e => {
            console.log(e);
            if (e && e.keyCode === 13) {
                this.search()
            }
        })
    }

    search = () => {
        const {search} = this.state;
        location.replace(`#/search/${search}?${Math.random()}`);
    };

    change = (e) => {
        console.log(e);
        this.setState({search: e.target.value})
    };

    render() {
        const {search} = this.state;
        return <div className={css.search}>
            <input ref="search" value={search} onChange={this.change} type="text" placeholder="搜索你的喜好"/>
            <i onClick={this.search} className="iconfont icon-sousuo"/>
            <div/>
            <i className={`iconfont icon-yuan ${css.yuan}`}/>
        </div>
    }
}