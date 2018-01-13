import React from 'react';
import {Axios} from 'Public'
import css from './list.scss'
import {Link} from 'react-router-dom'

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rank: {
                list: []
            }
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        Axios.post('/api/op', {url: 'http://m.kugou.com/rank/list&json=true'}).then(ret => {
            this.setState({rank: ret.data.rank})
        })
        // Axios.post('/api/op', {url: 'http://m.kugou.com/rank/info/8888&json=true'}).then(ret => {
        //     console.log(ret);
        //     this.setState({songs: ret.data.songs})
        // })
    };

    render() {
        const {rank} = this.state
        return <div className={css.list}>
            <ul>
                {rank.list.map((item, i) => {
                    return <li key={i}>
                        <div className={css.he_ZoomInImg}>
                            <img className={css.he_ZoomInImg_img} src={item.imgurl.replace('{size}', '400')} alt="Image 01"/>
                            <div className={css.he_ZoomInImg_caption}>
                                <h3 className={css.he_ZoomInImg_caption_h}></h3>
                                <p className={css.he_ZoomInImg_caption_p}></p>
                                <Link to={`/list_info/${item.rankid}`} className={css.he_ZoomInImg_caption_a}/>
                                {/*<a className={css.he_ZoomInImg_caption_a} href="##"></a>*/}
                            </div>
                        </div>
                    </li>
                })}
            </ul>
        </div>;
    }
}