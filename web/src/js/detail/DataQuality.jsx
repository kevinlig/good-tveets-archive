import React from 'react';

const DataQuality = (props) => {
    let qualityLabel = 'Unknown';
    let qualityClass = 'unknown';
    if (props.quality <= 0.6 && props.quality > 0) {
        qualityLabel = 'Poor';
        qualityClass = 'poor';
    }
    else if (props.quality > 0.6 && props.quality <= 0.85) {
        qualityLabel = 'Degraded';
        qualityClass = 'degraded';
    }
    else if (props.quality > 0.85) {
        qualityLabel = 'Good';
        qualityClass = 'good';
    }

    const total = props.tweets.length + props.missing + props.lost.length;
    let explanation = `Out of ${total} post`;
    if (total !== 1) {
        explanation += 's';
    }
    if (props.lost.length !== 1) {
        explanation += `, there were ${props.lost.length} Twitter posts that were deleted or made private at the time of archiving`;
    }
    else {
        explanation += `, there was ${props.lost.length} Twitter post that was deleted or made private at the time of archiving`;
    }
    explanation += ` and ${props.missing} post`;
    if (props.missing !== 1) {
        explanation += 's';
    }
    explanation += ` that could not be archived for technical reasons.`;

    if (props.quality === 0) {
        explanation = '';
    }

    return (
        <div className="quality-container">
            <div className="quality-header">
                Data Quality
            </div>
            <div className={`quality-badge ${qualityClass}`}>
                {qualityLabel}
            </div>
            <div className="quality-explanation">
                {explanation}
            </div>
        </div>
    );
};

export default DataQuality;
