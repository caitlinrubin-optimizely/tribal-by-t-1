import React from 'react';
import { Input } from 'optimizely-oui';
import { connect } from 'react-redux'

import { updatePassword, confirmPassword } from 'actions/setupActions';

import logo from 'theme/logo.png';

import './style.scss';

const PasswordStep = (props) => {
  const updatePasswordHandler = (e) => {
    props.updatePassword(e.target.value);
  };

  const confirmPasswordHandler = (e) => {
    props.confirmPassword(e.target.value);
  };

  return (
    <div className="password-step">
      <h1 className="password-step__heading">First Things First</h1>
      <p className="password-step__paragraph">
        In order to run administrative tasks, we&rsquo;ll need your system
        password. In the field below, please provide the password that you would
        use to log into your Optimizely workstation.
      </p>
      <div className="password-step__input-container">
        <Input
          label="System Password"
          testSection="input"
          type="password"
          placeholder="System Password"
          isRequired={true}
          onChange={updatePasswordHandler}
          value={props.setup.password}
        />
      </div>
      <div className="password-step__input-container">
        <Input
          label="Confirm System Password"
          testSection="input"
          type="password"
          placeholder="Confirm System Password"
          isRequired={true}
          onChange={confirmPasswordHandler}
        />
      </div>
    </div>
  );
}

const mapStateToProps = ({ setup }) => {
  return {
    setup,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePassword: updatePassword(dispatch),
    confirmPassword: confirmPassword(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordStep);
