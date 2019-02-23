import React from 'react';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import { translate } from 'react-i18next';

import API from '../../API';
import { messageListSchema } from '../../schemas/message';
import { addMessages, addSentMessage } from '../../actions/messages';

import Chat from './Chat';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isFetching: false, isSending: false };
  }

  componentWillMount() {
    this.fetchMessages();

    // In real case, we need to subscribe here to a WebSocket
    // const { channelId } = this.props;
    // subscribeMessages({ id: channelId }, (update) => { /* Update sate */ });
  }

  async componentWillUnmount() {
    // And unsubscribe here to a WebSocket
    // const { channelId } = this.props;
    // await client.unsubscribe(`/channel/${channelId}/messages`, null);

    await false;
  }

  sendMessage(input) {
    const { dispatch, credentials } = this.props;
    const { isSending } = this.state;

    const body = { content: input.message, user: credentials };

    if (!isSending) {
      API.message.create(body, {
        onRequest: () => this.setState({ isSending: true }),
        onSuccess: (response) => {
          dispatch(addSentMessage(response));
          this.setState({ isSending: false });
        },
        onError: () => {
          this.setState({ isSending: false });
          this.showError();
        },
      });
    }
  }

  fetchMessages(limit = 10, skip = 0) {
    const { i18n, dispatch } = this.props;
    const { isFetching } = this.state;

    const params = { limit, skip, language: i18n.language };

    if (!isFetching) {
      API.message.find(params, {
        onRequest: () => this.setState({ isFetching: true }),
        onSuccess: (response) => {
          dispatch(addMessages(response));
          this.setState({ isFetching: false });
        },
        onError: () => {
          this.setState({ isFetching: false });
          this.showError();
        },
      });
    }
  }

  showError() {
    const { t } = this.props;
    swal(t('request:error.title'), t('request:error.notPrecise'), 'error');
  }

  render() {
    const { credentials, messages, data } = this.props;
    const { isFetching, isSending } = this.state;

    return (
      <section id="messages">
        <div className="container">
          <Chat
            isFetching={isFetching}
            isSending={isSending}
            messages={messages}
            onFetchMore={() => this.fetchMessages(10, data.skip + 10)}
            onSubmit={values => this.sendMessage(values)}
            remainMessages={messages.length < data.totalMessages}
            totalMessages={data.totalMessages}
            userId={credentials._id}
          />
        </div>
      </section>
    );
  }
}

Messages.propTypes = {
  credentials: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    totalMessages: PropTypes.number.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  i18n: PropTypes.shape({ language: PropTypes.string }),
  messages: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
  })),
  t: PropTypes.func.isRequired,
};

Messages.defaultProps = {
  i18n: { language: 'en' },
  messages: [],
};

export default translate()(connect(
  state => ({
    credentials: state.credentials,
    data: state.messages,
    messages: denormalize(state.messages.ids, messageListSchema, state.entities),
  }),
  dispatch => ({ dispatch }),
)(Messages));
