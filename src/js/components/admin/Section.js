import React, { Component } from 'react';
import { localeData } from '../../reducers/localization';

import AppHeader from '../AppHeader';
import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';

class Sections extends Component {
  
  constructor () {
    super();
  }

  componentWillMount () {
    this.setState({localeData: localeData()});
  }

  render() {
    return (
      <Box>
        <AppHeader page={this.state.localeData.label_section}/>
        <Section>
          <h1>Section Navigation page</h1>
        </Section>
      </Box>
    );
  }
}

export default Sections;
