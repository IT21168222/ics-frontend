import {SUB_CATEGORY_CONSTANTS as c} from "../utils/constants";

const initialState = {
  fetching: false,
  adding: false,
  editing: false,
  subCategories:[]
};

const handlers = {
  
  [c.SUB_CATEGORY_FETCH_PROGRESS]: (_, action) => ({fetching: true}),
  [c.SUB_CATEGORY_FETCH_SUCCESS]: (_, action) => ({loaded: true, fetching: false, subCategories: action.payload.subCategories}),
  [c.SUB_CATEGORY_FETCH_FAIL]: (_, action) => ({fetching: false}),
  [c.SUB_CATEGORY_ADD_FORM_TOGGLE]: (_, action) => ({adding: action.payload.adding}),
  [c.SUB_CATEGORY_ADD_SUCCESS]: (_, action) => {
    let subCategories = _.subCategories;
    subCategories.push(action.payload.category);
    return ({adding: false, subCategories: subCategories});
  },
  [c.SUB_CATEGORY_ADD_FAIL]: (_, action) => ({adding: false}),
  [c.SUB_CATEGORY_EDIT_FORM_TOGGLE]: (_, action) => ({editing: action.payload.editing}),
  [c.SUB_CATEGORY_EDIT_SUCCESS]: (_, action) => {
    let subCategories = _.subCategories;
    let i = subCategories.findIndex(e=> e.id == action.payload.category.id);
    subCategories[i] = action.payload.category;
    return ({editing: false, subCategories: subCategories});
  },
  [c.SUB_CATEGORY_EDIT_FAIL]: (_, action) => ({editing: false}),
  [c.SUB_CATEGORY_REMOVE_SUCCESS]: (_, action) => {
    let subCategories = _.subCategories.filter((c)=>{
      return c.id != action.payload.category.id;
    });
    return ({subCategories: subCategories});
  }
};

export default function category (state = initialState, action) {
  let handler = handlers[action.type];
  if( !handler ) return state;
  return { ...state, ...handler(state, action) };
}
