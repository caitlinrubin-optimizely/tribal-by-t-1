import React from 'react';

import logo from 'theme/logo.png';

import './style.scss';

const WelcomeStep = () => (
  <div className="welcome-step">
    <img className="welcome-step__logo" src={`static/${logo}`} />
    <h1 className="welcome-step__heading">Welcome to Optimizely</h1>
    <p className="welcome-step__paragraph">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ligula
      lacus, elementum ac ipsum vel, iaculis malesuada orci. Sed a lacinia
      ipsum, eu tincidunt magna. Aenean ac nulla ligula. Aliquam scelerisque,
      dui sed viverra luctus, felis nulla tempus purus, a condimentum est urna
      nec est. Sed placerat nunc nec lectus auctor, ullamcorper scelerisque
      sapien finibus.
    </p>
  </div>
);

export default WelcomeStep;
