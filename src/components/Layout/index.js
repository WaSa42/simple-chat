import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { translate } from 'react-i18next';

import './Layout.css';
import MainHeader from '../MainHeader';
import Loader from '../Loader';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { contentCanBeLoaded: false };
  }

  render() {
    const { children, i18n, t } = this.props;
    const { contentCanBeLoaded } = this.state;
    return (
      <div id="layout">
        <Helmet>
          <title>{t('project.title')}</title>
          <meta name="robots" content="all" />
          <meta name="language" content={i18n.language} />
        </Helmet>
        <MainHeader onMount={() => this.setState({ contentCanBeLoaded: true })} />
        <main id="page" className="content-wrapper">
          {contentCanBeLoaded ? children : <Loader />}
        </main>
      </div>
    );
  }
}

Layout.propTypes = {
  i18n: PropTypes.shape({ language: PropTypes.string }).isRequired,
  t: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default translate()(Layout);
