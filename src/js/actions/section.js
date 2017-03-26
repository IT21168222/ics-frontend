import axios from "axios";

import {SECTION_CONSTANTS as c} from  '../utils/constants';

export function getSections () {
  console.log("getSections()");

  return function (dispatch) {
    dispatch({type:c.SECTION_FETCH_PROGRESS});

    axios.get(window.serviceHost + '/sections')
    .then((response) => {
      if (response.status == 200 && response.data._embedded) {
        dispatch({type: c.SECTION_FETCH_SUCCESS, payload: {sections: response.data._embedded.sectionList}});
      }
    }).catch( (err) => {
      console.log(err); 
      dispatch({type: c.SECTION_FETCH_FAIL});
    });
  };
}

export function addSection (section) {
  console.log('addSection');

  return function (dispatch) {
    console.log(section);
    axios.post(window.serviceHost + '/sections', JSON.stringify(section), {headers: {'Content-Type':'application/json'}})
    .then((response) => {
      console.log(response);
      if (response.status == 201) {
        dispatch({type: c.SECTION_ADD_SUCCESS, payload: {section: response.data}});
      }
    }).catch( (err) => {
      console.log(err);
      dispatch({type: c.SECTION_ADD_FAIL});
    });
  };
}

export function updateSection (section) {
  console.log('updateSection');
  return function (dispatch) {
    console.log(section);
    axios.put(section._links.self.href, JSON.stringify(section),{headers: {'Content-Type':'application/json'}})
    .then((response) => {
      console.log(response);
      if (response.status == 200) {
        dispatch({type: c.SECTION_EDIT_SUCCESS, payload: {section: response.data}});
      }
    }).catch( (err) => {
      console.log(err);
      dispatch({type: c.SECTION_EDIT_FAIL});
    });
  };
}

export function removeSection (section) {
  console.log('removeSection');
  return function (dispatch) {
    console.log(section);

    axios.delete(section._links.self.href)
    .then((response) => {
      console.log(response);
      dispatch({type: c.SECTION_REMOVE_SUCCESS, payload: {section: section}});
    }).catch( (err) => {
      console.log(err);
      dispatch({type: c.SECTION_REMOVE_FAIL});
    });
  };
}

