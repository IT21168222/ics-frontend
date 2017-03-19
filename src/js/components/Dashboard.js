import React, {Component} from 'react';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';

class Dashboard extends Component {
  constructor () {
    super();
  }

  render () {
    return (
      <Box>
        <h1>Welcome to Inventory Control System Application</h1>
      </Box>
    );
  }
}

Dashboard.contextTypes = {
  router: React.PropTypes.object.isRequired
};

let select = (store) => {
  return { nav: store.nav};
};

export default connect(select)(Dashboard);
