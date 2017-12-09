import React from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import css from './singer.scss'

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            singerMap: {
                singers: {
                    list: {
                        info: []
                    }
                }
            },
            typeMap: [],
            typeIndex: 0
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData() {
        axios.get('http://m.kugou.com/singer/class?json=true').then(ret => {
            let typeMap = ret.data.list;
            this.setState({typeMap: typeMap});
            this.getSinger(typeMap[0].classid)
        })
    }

    getSinger = (code) => {
        axios.get(`http://m.kugou.com/singer/list/${code}?json=true`).then(ret => {
            this.setState({singerMap: ret.data})
        })
    };

    check = (dat, i) => {
        this.state.typeIndex = i;
        this.getSinger(dat.classid)
    };

    render() {
        const {singerMap, typeMap, typeIndex} = this.state;
        return <div className={css.singer}>
            <div className={css.type}>
                <ul>
                    {typeMap.map((item, i) => {
                        let style = i === typeIndex ? css.type_active : null;
                        return <li onClick={() => this.check(item, i)} className={style} key={i}>{item.classname}</li>
                    })}
                </ul>
            </div>
            <div className={css.singer_division}/>
            <div className={css.singer_list}>
                <ul>
                    {singerMap.singers.list.info.map((item, i) => {
                        return <li key={i}>
                            <div className={css.he_ZoomInImg}>
                                <img className={css.he_ZoomInImg_img} src={item.imgurl.replace('{size}', '400')} alt="Image 01"/>
                                <div className={css.he_ZoomInImg_caption}>
                                    {/*<h3 className={css.he_ZoomInImg_caption_h}>{item.singername}</h3>*/}
                                    <p className={css.he_ZoomInImg_caption_p}>{singerMap.classname}</p>
                                    <Link to={`/singer_song/${item.singerid}`} className={css.he_ZoomInImg_caption_a}/>
                                    {/*<a className={css.he_ZoomInImg_caption_a} href="##"></a>*/}
                                </div>
                            </div>
                            <div className={css.singer_list_name}>{item.singername}</div>
                        </li>
                    })}
                </ul>
            </div>
        </div>;
    }
}