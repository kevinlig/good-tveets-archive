import React from 'react';
import Axios from 'axios';
import moment from 'moment';

import DataQuality from './DataQuality';
import TweetList from './TweetList';
import RemovedTweets from './RemovedTweets';

export default class Detail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            title: '',
            tweets: [],
            quality: 0,
            missing: 0,
            lost: 0
        };
    }

    componentDidMount() {
        this.loadStory(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            // URL changed
            this.loadStory(this.props.match.params.id);
        }
    }

    loadStory(id) {
        Axios.request({
            url: `data/stories/${id}.json`,
            method: 'get'
        })
        .then((res) => {
            this.parseStory(res.data);
        })
        .catch((err) => {
            this.setState({
                loaded: true,
                title: 'Invalid story'
            });
        });
    }

    parseStory(data) {
        const total = data.tweets.length + data.missing.length + data.lost.length;
        const quality = data.tweets.length / total;

        this.setState({
            title: data.meta.title,
            date: moment.unix(data.meta.date).format('MMMM D, YYYY'),
            tweets: data.tweets,
            quality: quality,
            missing: data.missing.length,
            lost: data.lost
        });
    }

    render() {
        let removed = null;
        if (this.state.lost.length > 0) {
            removed = <RemovedTweets lost={this.state.lost} />;
        }

        return (
            <div className="detail-page">
                 <div className="site-header">
                    <div className="title">
                        {this.state.title}
                    </div>
                    <div className="date">
                        {this.state.date}
                    </div>
                </div>

                <div className="page-content">
                    <DataQuality {...this.state} />
                    <TweetList data={this.state.tweets} />
                    {removed}
                </div>
            </div>
        );
    }
}