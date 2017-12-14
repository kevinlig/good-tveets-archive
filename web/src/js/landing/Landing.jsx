import React from 'react';
import Axios from 'axios';
import moment from 'moment';

import ArchiveList from './ArchiveList';

export default class Landing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            stories: []
        };
    }

    componentDidMount() {
        this.loadIndex();
    }

    loadIndex() {
        Axios.request({
            url: 'data/index.json',
            method: 'get'
        })
        .then((res) => {
            this.parseIndex(res.data);
        });
    }

    parseIndex(data) {
        const years = {};

        data.stories.forEach((item) => {
            const date = moment.unix(item.date);
            const year = `${date.year()}`;
            const month = date.format('MMMM');

            const story = {
                id: item.id,
                title: item.title,
                date: date.format('MMMM D, YYYY'),
                originalDate: item.date
            }

            if (years[year]) {
                if (years[year][month]) {
                    years[year][month].push(story);
                }
                else {
                    years[year][month] = [story];
                }
            }
            else {
                years[year] = {
                    [month]: [story]
                };
            }
        });

        this.setState({
            loaded: true,
            stories: years
        });
    }

    render() {
        let output = 'Loading...';

        if (this.state.loaded) {
            output = <ArchiveList stories={this.state.stories} />
        }

        return (
            <div className="landing-page">
                <div className="site-header">
                    <div className="title">
                        Good TVeets Archive
                    </div>
                </div>
                <div className="page-content">
                    <div className="download-container">
                        <div className="download-header">
                            Raw Data Download
                        </div>
                        <div className="download-offer">
                            <a href="https://github.com/kevinlig/good-tveets-archive">Click here</a> to download the raw data archives.
                        </div>
                    </div>

                    <div className="archive-container">
                        {output}
                    </div>
                </div>
            </div>
        );
    }
}