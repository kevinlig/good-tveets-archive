import React from 'react';

const RemovedTweets = (props) => {
    const removed = props.lost.map((url) => (
        <li
            key={url}>
            {url}
        </li>
    ));

    return (
        <div className="removed-tweets">
            The following posts were originally in this story, but have since been deleted or made private:
            <ul className="removed-list">
                {removed}
            </ul>
        </div>
    );
};

export default RemovedTweets;
