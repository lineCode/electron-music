import React from 'react';
import axios from 'axios'
import css from './song.scss'
import {Link} from 'react-router-dom'

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plist: {
                list: {
                    info: []
                }
            }
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get('http://m.kugou.com/plist/index?json=true').then(ret => {
            this.setState({plist: ret.data.plist})
        })
    };

    render() {
        const {plist} = this.state
        return <div className={css.list}>
            <ul>
                {plist.list.info.map((item, i) => {
                    return <li key={i}>
                        <div className={css.list_img}>
                            <div className={css.he_ZoomInImg}>
                                <img className={css.he_ZoomInImg_img} src={item.imgurl.replace('{size}', '400')} alt="Image 01"/>
                                <div className={css.he_ZoomInImg_caption}>
                                    <h3 className={css.he_ZoomInImg_caption_h}></h3>
                                    <p className={css.he_ZoomInImg_caption_p}></p>
                                    <Link to={`/song_list/${item.specialid}`} className={css.he_ZoomInImg_caption_a}/>
                                    {/*<a className={css.he_ZoomInImg_caption_a} href="##"></a>*/}
                                </div>
                            </div>
                        </div>
                        <div className={css.list_info}>
                            <div className={css.list_info_txt}>
                                <p>{item.specialname}</p>
                                <span>{item.intro}</span>
                            </div>
                        </div>
                    </li>
                })}
            </ul>
        </div>;
    }
}