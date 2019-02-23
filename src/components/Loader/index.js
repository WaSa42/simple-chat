import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import './Loader.css';

const Loader = () => (
  <div className="loader">
    <FontAwesomeIcon icon={faCircleNotch} spin />
  </div>
);

export default Loader;
