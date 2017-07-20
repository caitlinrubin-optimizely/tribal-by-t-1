import React from 'react';
import { Input } from 'optimizely-oui';
import { connect } from 'react-redux'

import { getLoadingProgress } from 'actions/setupActions';

import logo from 'theme/logo.png';

import './style.scss';

const InstallationStep = (props) => (
  <div className="installation-step">
    <h1 className="installation-step__heading">Preparing Your Environment</h1>
    <div className="installation-step__loader-container">
      <ul className="progress-dots">
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
);

const mapStateToProps = ({ setup }) => {
  return {
    setup,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getLoadingProgress: getLoadingProgress(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstallationStep);
