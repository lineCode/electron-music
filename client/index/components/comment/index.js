import React from 'react';
import css from './comment.scss'

export default class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className={css.comment}>
            this comment
        </div>;
    }
}