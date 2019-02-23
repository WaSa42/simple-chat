import React from 'react';
import PropTypes from 'prop-types';
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
    return (
      <div id="app">
        <ToastContainer />
        <Layout>
          <Messages />
        </Layout>
      </div>
    );
  }
}

App.propTypes = { i18n: PropTypes.shape({ language: PropTypes.string }) };
App.defaultProps = { i18n: { language: 'en' } };

export default translate()(App);
