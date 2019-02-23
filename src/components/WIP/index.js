import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';

import packageJSON from '../../../package.json';

class WIP extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isClosed: false };
  }

  close() {
    this.setState({ isClosed: true });
  }

  render() {
    const { t } = this.props;
    const { isClosed } = this.state;

    return !isClosed && (
      <div className="alert alert-warning alert-dismissible fade show" role="alert">
        <strong className="mr-2">{t('component:WIP.strong')}</strong>
        {t('component:WIP.text')}
        <a href={packageJSON.repository} className="alert-link ml-2">
          <FontAwesomeIcon icon={faGithub} className="mr-2" />
          {t('component:WIP.src')}
        </a>
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={this.close.bind(this)}
          onKeyPress={this.close.bind(this)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
}

WIP.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate()(WIP);
