import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

import './MainHeader.css';
import Languages from '../Languages';

class MainHeader extends React.Component {
  componentDidMount() {
    const { onMount } = this.props;
    if (onMount) { onMount(); }
  }

  render() {
    const { t } = this.props;

    return (
      <header id="main-header">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container position-relative">
            <span className="navbar-brand mb-0 h1 d-none d-md-inline">
              {t('project.title')}
            </span>
            <span className="my-2 ml-2 ml-sm-0 mr-2 mr-sm-3">
              <Languages />
            </span>
            <p id="title-dom" className="navbar-text mr-auto" />
            <div id="side-action-dom" />
          </div>
        </nav>
      </header>
    );
  }
}

MainHeader.propTypes = {
  onMount: PropTypes.func,
  t: PropTypes.func.isRequired,
};

MainHeader.defaultProps = {
  onMount: () => false,
};

export default translate()(MainHeader);
