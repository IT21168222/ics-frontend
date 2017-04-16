import axios from "axios";
import {getHeaders} from  '../utils/restUtil';
import { USER_CONSTANTS as u } from '../utils/constants';


axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.status == 401) {
    sessionStorage.session = false;
  }
  return Promise.reject(error);
});

export function authenticate (username, password) {
  console.log('authenticate');

  return function (dispatch) {

    const config = {
      method: 'post',
      url: "http://localhost:8000/oauth/token",
      //url: "http://zahidraza.in/andon-system/oauth/token",
      headers: {'Authorization': 'Basic ' + btoa('client:secret')},
      params: {
        grant_type: 'password',
        username: username,
        password: password
      }
    };

    axios(config)
    .then((response) => {
      if (response.status == 200) {
        dispatch({type: u.USER_AUTH_SUCCESS, payload: {username, data: response.data}});
      }else{
        console.log(response);
      }

    }).catch( (err) => {
      console.log(err);
      dispatch({type: c.USER_AUTH_FAIL});
    });
  };
  
}

export function changePassword (credential) {

}
 
export function getUsers () {
  console.log("getUsers()");
  this.setState({fetching: true});

  axios.get(window.serviceHost + '/users', {headers: getHeaders()})
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
  console.log(user);
  this.setState({adding: true});
  axios.post(window.serviceHost + '/users', JSON.stringify(user), {headers: getHeaders()})
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

  console.log(user);
  this.setState({editing: true});
  axios.put(user._links.self.href, JSON.stringify(user),{headers: getHeaders()})
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
  axios.delete(url, {headers: getHeaders()})
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
