import React from 'react';
import {connect} from 'react-redux';

@connect(state => {
    return {...state}
})
export default class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
        console.log(props.player.isplay);
    }

    render() {
        // console.log(this.props);
        return <div>
            this my_song
        </div>;
    }
}