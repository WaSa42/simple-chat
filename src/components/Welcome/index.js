import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import { updateCredentials } from '../../actions/credentials';
import './Welcome.css';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userName: '' };
  }

  handleChange(e) {
    const userName = e.target.value;
    this.setState({ userName });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { dispatch, credentials } = this.props;
    const { userName } = this.state;

    dispatch(updateCredentials({ ...credentials, userName }));
  }

  render() {
    const { t, credentials } = this.props;
    const { userName } = this.state;

    return !credentials.userName && (
      <div className="welcome">
        <div className="centered">
          <form onSubmit={e => this.handleSubmit(e)}>
            <div className="form-group">
              <label htmlFor="userName">{t('component:Welcome.label')}</label>
              <input
                type="text"
                className="form-control"
                id="userName"
                name="userName"
                aria-describedby="userNameHelp"
                placeholder={t('component:Welcome.placeholder')}
                onChange={e => this.handleChange(e)}
                value={userName}
              />
              <small id="emailHelp" className="form-text text-muted">
                {t('component:Welcome.helpText')}
              </small>
            </div>
            <button type="submit" className="btn btn-primary">{t('component:Welcome.submit')}</button>
          </form>
        </div>
      </div>
    );
  }
}

Welcome.propTypes = {
  credentials: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    userName: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate()(connect(
  state => ({ credentials: state.credentials }),
  dispatch => ({ dispatch }),
)(Welcome));
