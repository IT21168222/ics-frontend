import React, { Component } from 'react';
import { localeData } from '../../../reducers/localization';

import * as userAction  from '../../../actions/user';
import * as c  from '../../../utils/constants';

import AppHeader from '../../AppHeader';
import Add from "grommet/components/icons/base/Add";
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Edit from "grommet/components/icons/base/Edit";
import Footer from 'grommet/components/Footer';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
//import HelpIcon from 'grommet/components/icons/base/Help';
import Layer from 'grommet/components/Layer';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Section from 'grommet/components/Section';
import Select from 'grommet/components/Select';
import Spinning from 'grommet/components/icons/Spinning';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Trash from "grommet/components/icons/base/Trash";
import View from "grommet/components/icons/base/View";


class User extends Component {
  
  constructor () {
    super();
    this.state = {
      fetching: false,
      adding: false,
      viewing: false,
      editing: false,
      users: [],
      errors: [],
      user: {},
      roles: [c.ROLE_ADMIN,c.ROLE_PURCHASE,c.ROLE_STORE,c.ROLE_USER]
    };
    this.localeData = localeData();
    this.getUsers = userAction.getUsers.bind(this);
    this.addUser = userAction.addUser.bind(this);
    this.updateUser = userAction.updateUser.bind(this);
    this.removeUser = userAction.removeUser.bind(this);
  }

  componentWillMount () {
    console.log('componentWillMount');
    this.getUsers();
  }

  _onChangeInput ( event ) {
    var user = this.state.user;
    user[event.target.getAttribute('name')] = event.target.value;
    this.setState({user: user});
  }

  _onRoleFilter (event) {
    console.log('_onRoleFilter');
    const user = this.state.user;
    user.role = event.value;
    this.setState({user: user});
  }

  _onAddClick () {
    console.log('_onAddClick');
    const user = this.state.user;
    user.role = 'Select Role';
    this.setState({adding: true, user: user});
  }

  _onRemoveClick (url) {
    this.removeUser(url);
  }

  _onViewClick (index) {
    console.log('_onViewClick');
    const users = this.state.users;
    this.setState({viewing: true, user: users[index]});
  }

  _onEditClick (index) {
    console.log('_onEditClick');
    const users = this.state.users;
    this.setState({editing: true, user: users[index]});
  }

  _onCloseLayer (layer) {
    console.log('_onCloseLayer');
    if( layer == 'add')
      this.setState({adding: false, user: {}});
    else if (layer == 'view')
      this.setState({viewing: false, user: {}});
    else if (layer == 'edit')
      this.setState({editing: false, user: {}});
  }

  render() {
    let { fetching, adding, viewing, editing, users, user, errors, roles } = this.state;
    const loading = fetching ? (<Spinning />) : null;
    const userItems = users.map((user, index)=>{
      return (
        <TableRow key={index}  >
          <td >{user.name}</td>
          <td >{user.role}</td>
          <td style={{textAlign: 'right', padding: 0}}>
            <Button icon={<View />} onClick={this._onViewClick.bind(this,index)} />
            <Button icon={<Edit />} onClick={this._onEditClick.bind(this,index)} />
            <Button icon={<Trash />} onClick={this._onRemoveClick.bind(this,user._links.self.href)} />
          </td>
        </TableRow>
      );
    });

    const layerAdd = (
      <Layer hidden={!adding} onClose={this._onCloseLayer.bind(this, 'add')}  closer={true} align="center">
        <Form>
          <Header><Heading tag="h3" strong={true}>Add New User</Heading></Header>
          <FormFields>
            <FormField label="User Name" error={errors[0]}>
              <input type="text" name="name" value={user.name} onChange={this._onChangeInput.bind(this)} />
            </FormField>
            <FormField label="Email" error={errors[2]}>
              <input type="email" name="email" value={user.email} onChange={this._onChangeInput.bind(this)} />
            </FormField>
            <FormField label="Mobile Number" error={errors[3]}>
              <input type="text" name="mobile" value={user.mobile} onChange={this._onChangeInput.bind(this)} />
            </FormField>
            <FormField>
              <Select options={roles} value={user.role} onChange={this._onRoleFilter.bind(this)}/>
            </FormField>
          </FormFields>
          <Footer pad={{"vertical": "medium"}} >
            <Button label="Add" primary={true}  onClick={this.addUser} />
          </Footer>
        </Form>
      </Layer>
    );

    const layerView = (
      <Layer hidden={!viewing}  onClose={this._onCloseLayer.bind(this, 'view')}  closer={true} align="center">
        <Box size="medium"  pad={{vertical: 'none', horizontal:'small'}}>
          <Header><Heading tag="h3" strong={true} >User Details</Heading></Header>
          <List>
            <ListItem justify="between" pad={{vertical:'small',horizontal:'small'}} >
              <span> User Name </span>
              <span className="secondary">{user.name}</span>
            </ListItem>
            <ListItem justify="between" pad={{vertical:'small',horizontal:'small'}} >
              <span> Email Id </span>
              <span className="secondary">{user.email}</span>
            </ListItem>
            <ListItem justify="between" pad={{vertical:'small',horizontal:'small'}} >
              <span> Mobile </span>
              <span className="secondary">{user.mobile}</span>
            </ListItem>
            <ListItem justify="between" pad={{vertical:'small',horizontal:'small'}} >
              <span> Role </span>
              <span className="secondary">{user.role}</span>
            </ListItem>
          </List>
        </Box>
        <Box pad={{vertical: 'medium', horizontal:'small'}} />
      </Layer>
    );

    const layerEdit = (
      <Layer hidden={!editing} onClose={this._onCloseLayer.bind(this, 'edit')}  closer={true} align="center">
        <Form>
          <Header><Heading tag="h3" strong={true}>Update User Details</Heading></Header>
          <FormFields >
            <FormField label="User Name" error={errors[0]}>
              <input type="text" name="name" value={user.name} onChange={this._onChangeInput.bind(this)} />
            </FormField>
            <FormField label="Email" error={errors[1]}>
              <input type="email" name="email" value={user.email} onChange={this._onChangeInput.bind(this)} />
            </FormField>
            <FormField label="Mobile Number" error={errors[2]}>
              <input type="text" name="mobile" value={user.mobile} onChange={this._onChangeInput.bind(this)} />
            </FormField>
            <FormField>
              <Select options={roles} name="role" value={user.role} onChange={this._onRoleFilter.bind(this)}/>
            </FormField>
          </FormFields>
          <Footer pad={{"vertical": "medium"}} >
            <Button label="Update" primary={true}  onClick={this.updateUser} />
          </Footer>
        </Form>
      </Layer>
    );

    return (
      <Box>
        <AppHeader page={this.localeData.label_user}/>
        <Section direction="column" size="xxlarge" pad={{vertical: 'large', horizontal:'small'}}>
          <Box size="large" alignSelf="center" >
            <Table>
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Role</th>
                  <th style={{textAlign: 'right'}}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {userItems}
              </tbody>
            </Table>
          </Box>
          <Box size="xsmall" alignSelf="center" pad={{horizontal:'medium'}}>{loading}</Box>
          <Box size="small" alignSelf="center" pad={{vertical:'large'}}>
            <Button icon={<Add />} label="Add User" primary={true} a11yTitle="Add item" onClick={this._onAddClick.bind(this)}/>
          </Box>
        </Section>
        {layerAdd}
        {layerView}
        {layerEdit}
      </Box>
    );
  }
}

export default User;
