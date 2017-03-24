import axios from "axios";

//import { USER_FETCH_SUCCESS } from '../utils/constants';

export function getUsers () {
  console.log("getUsers()");
  this.setState({fetching: true});

  axios.get(window.serviceHost + '/users')
  .then((response) => {
    if (response.status == 200 && response.data._embedded) {
      this.setState({users: response.data._embedded.userDtoList});
    }
    this.setState({fetching: false});
  }).catch( (err) => {
    console.log(err); 
    this.setState({fetching: false});
  });
}

export function addUser () {
  console.log('addUser');
  const { user } = this.state;
    // let errors = [];
    // let isError = false;
    // console.log(buyer);
    // if (user.name == undefined || user.name == '') {
    //   errors[0] = 'User Name cannot be blank';
    //   isError = true;
    // }
    // if (user.id == undefined || user.id == '') {
    //   errors[1] = 'User Id  cannot be blank';
    //   isError = true;
    // }
    // if (user.email == undefined || user.email == '') {
    //   errors[2] = 'Email Id  cannot be blank';
    //   isError = true;
    // }
    // if (user.mobile == undefined || user.mobile == '') {
    //   errors[3] = 'mobile Number  cannot be blank';
    //   isError = true;
    // }
    // if (role == 'MERCHANT' && buyer == 'Select buyer access') {
    //   errors[4] = 'Select Buyer access';
    //   isError = true;
    // }
    // this.setState({errors: errors});
    // if (isError) return;

  console.log(user);
  this.setState({adding: true});
  axios.post(window.serviceHost + '/users', JSON.stringify(user))
  .then((response) => {
    console.log(response);
    this.setState({adding: false});
    getUsers.bind(this)();
  }).catch( (err) => {
    console.log(err);
    this.setState({adding: false});
  });
}

export function updateUser () {
  console.log('updateUser');
  const { user } = this.state;
  // let errors = [];
  // let isError = false;
  // console.log(buyer);
  // if (user.name == undefined || user.name == '') {
  //   errors[0] = 'User Name cannot be blank';
  //   isError = true;
  // }
  // if (user.id == undefined || user.id == '') {
  //   errors[1] = 'User Id  cannot be blank';
  //   isError = true;
  // }
  // if (user.email == undefined || user.email == '') {
  //   errors[2] = 'Email Id  cannot be blank';
  //   isError = true;
  // }
  // if (user.mobile == undefined || user.mobile == '') {
  //   errors[3] = 'mobile Number  cannot be blank';
  //   isError = true;
  // }
  // if (role == 'MERCHANT' && buyer == 'Select buyer access') {
  //   errors[4] = 'Select Buyer access';
  //   isError = true;
  // }
  // this.setState({errors: errors});
  // if (isError) return;

  console.log(user);
  this.setState({editing: true});
  axios.put(user._links.self.href, JSON.stringify(user),{headers: {'Content-Type':'application/json'}})
  .then((response) => {
    console.log(response);
    this.setState({editing: false});
    getUsers.bind(this)();
  }).catch( (err) => {
    console.log(err);
    this.setState({editing: false});
  });
}

export function removeUser (url) {
  console.log('removeUser');
  axios.delete(url)
  .then((response) => {
    console.log(response);
    getUsers.bind(this)();
  }).catch( (err) => {
    console.log(err);
  });
}

export function test (msg) {
  console.log('test()');
  //console.log('is Mounted: '+this.isMounted());
  console.log(msg);
  console.log(this.state.msg);
  this.setState({msg:msg});
}
