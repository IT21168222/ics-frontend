import axios from "axios";

import {PRODUCT_CONSTANTS as c} from  '../utils/constants';

export function addProduct (url,product) {
  console.log('addProduct');

  return function (dispatch) {
    console.log(product);
    axios.post(url, JSON.stringify(product), {headers: {'Content-Type':'application/json'}})
    .then((response) => {
      console.log(response);
      if (response.status == 201) {
        dispatch({type: c.PRODUCT_ADD_SUCCESS, payload: {product: response.data}});
      }
    }).catch( (err) => {
      console.log(err);
      dispatch({type: c.PRODUCT_ADD_FAIL});
    });
  };
}

export function updateProduct (url,product) {
  console.log('updateProduct');
  return function (dispatch) {
    console.log(product);
    axios.put(url, JSON.stringify(product),{headers: {'Content-Type':'application/json'}})
    .then((response) => {
      console.log(response);
      if (response.status == 200) {
        dispatch({type: c.PRODUCT_EDIT_SUCCESS, payload: {product: response.data}});
      }
    }).catch( (err) => {
      console.log(err);
      dispatch({type: c.PRODUCT_EDIT_FAIL});
    });
  };
}

export function removeProduct (product) {
  console.log('removeProduct');
  return function (dispatch) {
    console.log(product);

    axios.delete(product._links.self.href)
    .then((response) => {
      console.log(response);
      dispatch({type: c.PRODUCT_REMOVE_SUCCESS, payload: {product: product}});
    }).catch( (err) => {
      console.log(err);
      dispatch({type: c.PRODUCT_REMOVE_FAIL});
    });
  };
}

