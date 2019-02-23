import React from 'react';
import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';
import isEmpty from 'lodash/isEmpty';
import { translate } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import './Chat.scss';
import Message from './Message';

const $ = window.jQuery;

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: props.inputValue, wasAtBottom: false };
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentWillReceiveProps(nextProps) {
    const { inputValue } = this.props;
    if (nextProps.inputValue !== inputValue) { this.setState({ content: nextProps.inputValue }); }

    const element = $(this.messages);
    this.setState({ wasAtBottom: element[0].scrollHeight - element.scrollTop() === element.outerHeight() });
  }

  componentDidUpdate() {
    const { wasAtBottom } = this.state;
    if (wasAtBottom) {
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({/* behavior: 'smooth' */});
  }

  handleFetchMore(e) {
    e.preventDefault();
    const { isFetching, onFetchMore } = this.props;

    if (!isFetching) {
      onFetchMore();
    }

    return false;
  }

  handleSubmit(e) {
    e.preventDefault();
    const { isSending, onSubmit } = this.props;
    const { content } = this.state;

    if (!isSending && !isEmpty(content)) {
      onSubmit({ message: content });
      this.setState({ content: '' });
    }

    return false;
  }

  renderMessages() {
    const { messages, userId } = this.props;

    return orderBy(messages, ['sentAt'], ['asc']).map(message => (
      <Message
        {...message}
        isUser={message.user._id === userId}
        key={message._id}
        picture={message.user.profile.picture}
        sentAt={message.sentAt}
        userName={message.user.userName}
      />
    ));
  }

  render() {
    const { children, isFetching, isSending, remainMessages, t, totalMessages } = this.props;
    const { content } = this.state;

    return (
      <div id="chat" className="chat">
        <div className="chat-window">
          <ul className="messages pt-3" ref={(el) => { this.messages = el; }}>
            {totalMessages > 10 && (
              <li className="fetch-more text-center mb-3">
                <button
                  className="btn btn-link"
                  disabled={!remainMessages || isFetching}
                  onClick={e => this.handleFetchMore(e)}
                  onKeyPress={e => this.handleFetchMore(e)}
                >
                  {isFetching && <FontAwesomeIcon icon={faSpinner} spin={isFetching} />}
                  <span className="ml-2">
                    {t(`component:Chat.${remainMessages ? 'fetchMore' : 'noMoreMessages'}`)}
                  </span>
                </button>
              </li>
            )}
            {this.renderMessages()}
            <div ref={(el) => { this.messagesEnd = el; }} />
          </ul>
          {children}
          <form
            className="bottom-wrapper clearfix"
            onSubmit={e => this.handleSubmit(e)}
          >
            <div className="input-group">
              <input
                autoComplete="off"
                className="form-control"
                name="content"
                onChange={e => this.setState({ content: e.target.value })}
                placeholder={t('component:Chat.placeholder')}
                value={content}
              />
              <div className="input-group-append">
                <button disabled={isSending} type="submit" className="btn btn-default">
                  <FontAwesomeIcon icon={isSending ? faSpinner : faPaperPlane} spin={isSending} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  children: PropTypes.element,
  isFetching: PropTypes.bool.isRequired,
  isSending: PropTypes.bool.isRequired,
  inputValue: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    sentAt: PropTypes.string.isRequired,
    user: PropTypes.shape({
      profile: PropTypes.shape({ picture: PropTypes.string.isRequired }).isRequired,
      userName: PropTypes.string.isRequired,
    }),
  })),
  onFetchMore: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  remainMessages: PropTypes.bool,
  t: PropTypes.func.isRequired,
  totalMessages: PropTypes.number,
  userId: PropTypes.string.isRequired,
};

Chat.defaultProps = {
  children: null,
  inputValue: '',
  messages: [],
  remainMessages: false,
  totalMessages: 0,
};

export default translate()(Chat);
