import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux'
import { Button } from 'optimizely-oui';

import { goToNextStep } from 'actions/setupActions';

import Stepper from 'components/stepper';

import './style.scss';

const Wizard = (props) => {
  const currentStep = props.children[props.setup.step];
  const stepInfo = props.children.map((step, i) => {
    return {
      text: step.props.title,
      active: props.setup.step === i,
      complete: props.setup.step > i,
    };
  });

  const buttonClickHandler = () => {
    if (props.setup.step < stepInfo.length) {
      props.goToNextStep();
    }
  }

  return (
    <div className="wizard">
      <div className="wizard__current-step">
        {currentStep}
      </div>
      <div className="wizard__footer">
        <div className="wizard__footer__stepper-container">
          <Stepper steps={stepInfo} />
        </div>
        <div className="wizard__footer__button-container">
          <Button
            isDisabled={props.setup.locked}
            onClick={buttonClickHandler}
            style='highlight'>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = ({ setup }) => {
  return { setup }
}

const mapDispatchToProps = (dispatch) => {
  return {
    goToNextStep: goToNextStep(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wizard);
