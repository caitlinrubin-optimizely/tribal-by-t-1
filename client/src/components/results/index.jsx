import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { BlockList, Badge } from 'optimizely-oui';
import { connect } from 'react-redux';

import SlackMessage from 'components/slackMessage';

import './style.scss';

const Results = (props) => {
  const questionItems = props.results.map((result) => {
    const answers = result.answers.map(answer => (
      <div className="results__answer" key={answer}>
        <SlackMessage>{answer}</SlackMessage>
      </div>
    ));

    return (
      <BlockList.Category key={result.content}>
        <BlockList.Item>
          <div className="results__question">
            <SlackMessage>{result.content}</SlackMessage>
          </div>
          {answers}
          <Badge color="primary">
            Relevance: { Math.round(_.clamp(result.score * 100, 0, 100)) }&#37;
          </Badge>
          <Badge color="draft">
            Source: Slack
          </Badge>
        </BlockList.Item>
      </BlockList.Category>
    );
  });

  return props.results.length > 0 && (
    <div className="results">
      <BlockList hasBorder>
        <BlockList.Category header="Results &amp; Answers">
          {questionItems}
        </BlockList.Category>
      </BlockList>
    </div>
  );
};

Results.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,
      answers: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
};

Results.defaultProps = {
  results: [],
};

const mapStateToProps = ({ search }) => {
  return {
    results: search.results,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
