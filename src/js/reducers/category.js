import {CATEGORY_CONSTANTS as c} from "../utils/constants";

const initialState = {
  loaded: false,
  fetching: false,
  adding: false,
  editing: false,
  categories:[]
};

const handlers = {
  
  [c.CATEGORY_FETCH_PROGRESS]: (_, action) => ({fetching: true}),
  [c.CATEGORY_FETCH_SUCCESS]: (_, action) => ({loaded: true, fetching: false, categories: action.payload.categories}),
  [c.CATEGORY_FETCH_FAIL]: (_, action) => ({fetching: false}),
  [c.CATEGORY_ADD_PROGRESS]: (_, action) => ({adding: true}),
  [c.CATEGORY_ADD_SUCCESS]: (_, action) => {
    let categories = _.categories;
    categories.push(action.payload.category);
    return ({adding: false, categories: categories});
  },
  [c.CATEGORY_ADD_FAIL]: (_, action) => ({adding: false}),
  [c.CATEGORY_EDIT_PROGRESS]: (_, action) => ({editing: true}),
  [c.CATEGORY_EDIT_SUCCESS]: (_, action) => {
    let categories = _.categories;
    let i = categories.findIndex(e=> e.id == action.payload.category.id);
    categories[i] = action.payload.category;
    return ({editing: false, categories: categories});
  },
  [c.CATEGORY_EDIT_FAIL]: (_, action) => ({editing: false}),
  [c.CATEGORY_REMOVE_SUCCESS]: (_, action) => {
    let categories = _.categories.filter((c)=>{
      return c.id != action.payload.category.id;
    });
    return ({categories: categories});
  }
};

export default function category (state = initialState, action) {
  let handler = handlers[action.type];
  if( !handler ) return state;
  return { ...state, ...handler(state, action) };
}
