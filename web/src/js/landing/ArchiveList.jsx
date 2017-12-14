import React from 'react';
import orderBy from 'lodash/orderBy';

const StoryList = (props) => {
    const orderedList = orderBy(props.stories, ['originalDate'], ['desc']);
    const list = orderedList.map((story) => {
        let title = story.title;
        if (story.id === 'good-tveets') {
            title = `${story.title} [OVERWRITTEN ARCHIVE]`;
        }

        return (
            <li
                className="story-item"
                key={`${story.id}${story.date}`}>
                <div className="story-title">
                    <a href={`#/${story.id}`}>
                        {title}
                    </a>
                </div>
                <div className="story-date">
                    {story.date}
                </div>
            </li>
        );
    });

    return (
        <div className="month-group">
            <div className="month">
                {props.month}
            </div>
            <ul className="story-list">
                {list}
            </ul>
        </div>
    )
};

const YearGroup = (props) => {
    const months = Object.keys(props.data).map((month) => (
        <StoryList key={month} stories={props.data[month]} month={month} />
    ));
    return (
        <div className="year-group">
            <div className="year">
                {props.year}
            </div>
            {months}
        </div>
    );
};

const ArchiveList = (props) => {
    const years = Object.keys(props.stories).reverse().map((year) => (
        <YearGroup key={year} year={year} data={props.stories[year]} />
    ));

    return (
        <div className="archive-list">
            {years}
        </div>
    );
}

export default ArchiveList;
