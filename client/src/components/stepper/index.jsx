import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';

const Stepper = (props) => {
  const steps = props.steps.map((step) => {
    const stepClasses = classNames({
      'steps__item': true,
      'steps__item--complete': step.complete,
      'steps__item--active': step.active,
    });

    return (
      <li className={stepClasses} key={step.text}>
        <div className="steps__dot"></div>
        <div className="steps__label">{step.text}</div>
      </li>
    )
  });

  return (
    <ul className="steps stepper">{steps}</ul>
  )
};

Stepper.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      complete: PropTypes.bool,
      active: PropTypes.bool,
      text: PropTypes.string,
    })
  )
};

Stepper.defaultProps = {
  steps: [],
};

export default Stepper;
