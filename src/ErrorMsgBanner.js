import { Message } from 'semantic-ui-react';

export const ErrorMsgBanner = () => {
  return (
    <Message negative>
      <Message.Header>We're sorry this happened</Message.Header>
      <p>Please try again in a few minutes</p>
    </Message>
  );
};
