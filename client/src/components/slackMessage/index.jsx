import React from 'react';
import PropTypes from 'prop-types';

const SlackMessage = (props) => {
  const tagRegex = /<(.*?)>/g;
  const markup = props.children.split(tagRegex).map((segment) => {
    let url = segment;
    let displayText = segment;
    if (segment.startsWith('http')) {
      if (segment.indexOf('\u007C') > -1) {
        const splitSegment = segment.split('\u007C');
        url = splitSegment[0];
        displayText = splitSegment[1];
      }
      return <a href={url} key={segment}>{displayText}</a>
    } else if(segment.startsWith('@U')) {
      const strippedSegment = segment.substring(2);
      if (strippedSegment.indexOf('\u007C') > -1) {
        const splitSegment = strippedSegment.split('\u007C');
        url = splitSegment[0];
        displayText = splitSegment[1];
      }
    }
    return segment;
  });

  return (
    <span>{markup}</span>
  );
}

SlackMessage.propTypes = {
  children: PropTypes.string,
}

SlackMessage.defaultProps = {
  children: '',
};

export default SlackMessage;
