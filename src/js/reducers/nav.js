import { NAV_ACTIVATE } from "../actions";

const initialState = {
  active: false,
  itemsAdmin:[
    { path: '/', label: 'Home'},
    { path: '/user', label: 'User'},
    { path: '/category', label: 'Category'},
    { path: '/subCategory', label: 'Sub Category'},
    { path: '/section', label: 'Section'},
    { path: '/supplier', label: 'Supplier'},
    { path: '/product', label: 'Product'},
    { path: '/test', label: 'Test Page'}
  ],
  itemsStore:[
     { path: '/', label: 'Home'}
  ],
  itemsPurchase:[
     { path: '/', label: 'Home'}
  ],
  itemsUser:[
     { path: '/', label: 'Home'}
  ]
};

export default function nav ( state = initialState, action) {

  switch ( action.type) {
    case NAV_ACTIVATE : {
      state = {...state, active: action.active};
      break;
    }
  }
  return state;
}
