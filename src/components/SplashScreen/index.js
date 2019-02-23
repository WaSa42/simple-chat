import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import './SplashScreen.css';

const SplashScreen = ({ t, text, translated, children }) => (
  <div className="splashScreen">
    <div className="svg-container">
      {children || <FontAwesomeIcon icon={faCircleNotch} spin />}
      <p className="mt-2">{(text && (translated ? text : t(text))) || t('splashLoading')}</p>
    </div>
  </div>
);

SplashScreen.propTypes = {
  t: PropTypes.func.isRequired,
  text: PropTypes.string,
  children: PropTypes.node,
  translated: PropTypes.bool,
};


SplashScreen.defaultProps = {
  text: null,
  children: null,
  translated: false,
};

export default translate()(SplashScreen);
