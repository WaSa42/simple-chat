import React from 'react';
import renderer from 'react-test-renderer';

import messages from '../../../__mocks__/messages';
import Chat from './index';

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate HoC receive the t function as a prop
  translate: () => (Component) => {
    const HoCResponse = Component;
    HoCResponse.defaultProps = { ...Component.defaultProps, t: k => k };
    return HoCResponse;
  },
}));

it('renders correctly', () => {
  const tree = renderer.create(<Chat
    isFetching={false}
    isSending={false}
    messages={messages.fr}
    onFetchMore={() => console.log('onFetchMore')}
    onSubmit={values => console.log('onSubmit', values)}
    remainMessages={false}
    totalMessages={messages.fr.length}
    userId="randomlyGeneratedMessageId1"
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
