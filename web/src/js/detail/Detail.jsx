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
            loaded: true,
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

        let notice = null;
        if (this.props.match.params.id === 'good-tveets') {
            notice = (
                <div className="notice">
                    <div className="notice-header">
                        Important Note
                    </div>
                    Storify reused an internal identifier when recording this story. As a result, 11 of 12 stories with this identifier were overwritten by each other. The last available version of this story is presented below, which may or may not be the story published on the above date.
                </div>
            );
        }

        let loading = null;
        if (!this.state.loaded) {
            loading = (
                <div className="loading">
                    Loading...
                </div>
            );
        }

        return (
            <div className="detail-page">
                 <div className="site-header">
                    <div className="home">
                        <a
                            className="home-link"
                            href="#/">
                            Home
                        </a>
                    </div>
                    <div className="title">
                        {this.state.title}
                    </div>
                    <div className="date">
                        {this.state.date}
                    </div>
                </div>

                <div className="page-content">
                    {notice}
                    <DataQuality {...this.state} />
                    {loading}
                    <TweetList data={this.state.tweets} />
                    {removed}
                </div>
            </div>
        );
    }
}