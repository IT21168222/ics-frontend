import React, { Component } from 'react';
import { localeData } from '../reducers/localization';

import AppHeader from './AppHeader';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Section from 'grommet/components/Section';
import Table from 'grommet/components/Table';
//import TableRow from 'grommet/components/TableRow';
//import Tiles from 'grommet/components/Tiles';
//import Tile from 'grommet/components/Tile';

import * as userAction  from '../actions/user';

class Test extends Component {
  
  constructor () {
    super();
    this.state = {
      msg: 'Hello message',
      users: ['Md Zahid Raza','Md Taufeeque Alam']
    };
    this.test = userAction.test.bind(this);
  }

  componentWillMount () {
    this.setState({localeData: localeData()});
    this.test('Heloo message');
  }

  _onTest (msg) {
    userAction.test(msg);
  }

  _onClick () {
    console.log('onClick()');
  }

  render() {

    return (
      <Box>
        <AppHeader page={this.state.localeData.label_test}/>
        <Section>
          <h1>Test Navigation page</h1>

          {this.state.msg}

          <Button label='Click' onClick={this._onTest.bind(this,'hello')} />
          <Button label='Label' onClick={this._onClick}  />

          <Box full="horizontal" wrap={true} size='full'>
            <Table style={{overflowX: 'scroll'}}>
              <thead>
                <tr>
                  <th>ABCDEFGHIJKLMNOPQRSTUVWXYZ</th>
                  <th>ABCDEFGHIJKLMNOPQRSTUVWXYZ</th>
                  <th>ABCDEFGHIJKLMNOPQRSTUVWXYZ</th>
                  <th>ABCDEFGHIJKLMNOPQRSTUVWXYZ</th>
                  <th>ABCDEFGHIJKLMNOPQRSTUVWXYZ</th>
                  <th>ABCDEFGHIJKLMNOPQRSTUVWXYZ</th>
                </tr>
              </thead>
            </Table>
          </Box>

        </Section>
      </Box>
    );
  }
}

export default Test;
