import React from 'react';

const jsTag = /\\n\<script.*<\/script>\\n/gi;

class TweetItem extends React.Component {
    componentDidMount() {
        if (window.twttr && !this.props.disabled) {
            window.twttr.widgets.load(this.dom);
        }
    }
    render() {
        let content = '';

        // strip out the Twitter JS tags
        content = this.props.html.replace(jsTag, '');

        return (
            <li
                className="tweet-item"
                dangerouslySetInnerHTML={{__html: content}}
                ref={(li) => {
                    this.dom = li;
                }} />
        );
    }
}

const TweetList = (props) => {
    const items = props.data.map((tweet) => (
        <TweetItem key={tweet.url} html={tweet.html} disabled={props.data.length > 150} />
    ));

    return (
        <ul
            className="tweet-list">
            {items}
        </ul>
    );
}

export default TweetList;
