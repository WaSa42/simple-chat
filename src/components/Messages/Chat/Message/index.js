import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import className from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash';

import './Message.scss';

const Message = ({ content, isHidden, isUser, onHide, picture, sentAt, userName }) => (
  <li className={className('message', { left: !isUser, right: isUser, hidden: isHidden })}>
    <img className="avatar" src={picture} alt="Avatar" />
    <div className="text-wrapper">
      <div className="text">
        <div className="info">
          <span className="mr-2">{userName}</span>
          <time className="d-none d-sm-inline">{moment.unix(sentAt / 1000).format('LLL')}</time>
        </div>
        {content}
        {(onHide && isUser) && (
          <button onClick={onHide} className="btn-hide btn-nale">
            <FontAwesomeIcon icon={isHidden ? faEye : faEyeSlash} />
          </button>
        )}
      </div>
    </div>
  </li>
);

Message.propTypes = {
  content: PropTypes.string.isRequired,
  isHidden: PropTypes.bool,
  isUser: PropTypes.bool.isRequired,
  onHide: PropTypes.func,
  picture: PropTypes.string.isRequired,
  sentAt: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

Message.defaultProps = {
  isHidden: false,
  onHide: null,
};

export default Message;
