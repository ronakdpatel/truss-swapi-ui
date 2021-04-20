import { Dimmer, Loader } from 'semantic-ui-react';

export const BusyIndicator = () => {
  return (
    <Dimmer active inverted>
      <Loader size="massive" inverted>
        Loading
      </Loader>
    </Dimmer>
  );
};
