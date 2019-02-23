import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { ToastContainer } from 'react-toastify';

import moment from 'moment';
import 'moment/locale/fr';
import 'moment/locale/en-gb';

import numeral from 'numeral';
import 'numeral/locales/fr';
import 'numeral/locales/en-gb';

import { localeTo } from '../../helpers/locales';

import './App.css';

import Layout from '../Layout';
import Messages from '../Messages';
import Welcome from '../Welcome';

class App extends React.Component {
  componentDidMount() {
    const { i18n } = this.props;
    moment.locale(localeTo(i18n.language, 'moment'));
    numeral.locale(localeTo(i18n.language, 'moment'));
  }

  componentDidUpdate(prevProps) {
    const { i18n } = this.props;
    if (prevProps.i18n.language !== i18n.language) {
      moment.locale(localeTo(i18n.language, 'moment'));
      numeral.locale(localeTo(i18n.language, 'moment'));
    }
  }

  render() {
    const { credentials } = this.props;

    return (
      <div id="app">
        <ToastContainer />
        {!credentials.userName ? <Welcome /> : (
          <div className="hasUserName">
            <Layout>
              <Messages />
            </Layout>
          </div>
        )}
      </div>
    );
  }
}

App.propTypes = {
  credentials: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    userName: PropTypes.string,
  }).isRequired,
  i18n: PropTypes.shape({ language: PropTypes.string }),
};
App.defaultProps = {
  i18n: { language: 'en' },
};

export default translate()(connect(
  state => ({ credentials: state.credentials }),
  dispatch => ({ dispatch }),
)(App));
