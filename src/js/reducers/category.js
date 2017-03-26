import {CATEGORY_CONSTANTS as c, SUB_CATEGORY_CONSTANTS as sc} from "../utils/constants";

const initialState = {
  loaded: false,
  fetching: false,
  adding: false,
  editing: false,
  categories:[],
  filter: {},
  sort: 'category:asc',
  toggleStatus: true
};

const handlers = {
  
  [c.CATEGORY_FETCH_PROGRESS]: (_, action) => ({fetching: true}),
  [c.CATEGORY_FETCH_SUCCESS]: (_, action) => ({loaded: true, fetching: false,toggleStatus: !_.toggleStatus, categories: action.payload.categories}),
  [c.CATEGORY_FETCH_FAIL]: (_, action) => ({fetching: false}),
  [c.CATEGORY_ADD_FORM_TOGGLE]: (_, action) => ({adding: action.payload.adding}),
  [c.CATEGORY_ADD_SUCCESS]: (_, action) => {
    let categories = _.categories;
    console.log('check');
    categories.push(action.payload.category);
    return ({adding: false,toggleStatus: !_.toggleStatus, categories: categories});
  },
  [c.CATEGORY_ADD_FAIL]: (_, action) => ({adding: false}),
  [c.CATEGORY_EDIT_FORM_TOGGLE]: (_, action) => ({editing: action.payload.editing}),
  [c.CATEGORY_EDIT_SUCCESS]: (_, action) => {
    let categories = _.categories;
    let i = categories.findIndex(e=> e.id == action.payload.category.id);
    categories[i] = action.payload.category;
    return ({editing: false,toggleStatus: !_.toggleStatus, categories: categories});
  },
  [c.CATEGORY_EDIT_FAIL]: (_, action) => ({editing: false}),
  [c.CATEGORY_REMOVE_SUCCESS]: (_, action) => {
    let categories = _.categories.filter((c)=>{
      return c.id != action.payload.category.id;
    });
    return ({toggleStatus: !_.toggleStatus,categories: categories});
  },
  [c.CATEGORY_FILTER]: (_, action) => ({filter: action.payload.filter, toggleStatus: !_.toggleStatus}),
  [c.CATEGORY_SORT]: (_, action) => ({sort: action.payload.sort, toggleStatus: !_.toggleStatus}),
////////////////////////////////////////////////////////////////////////////////////////////////////////////
  [sc.SUB_CATEGORY_ADD_FORM_TOGGLE]: (_, action) => ({adding: action.payload.adding}),
  [sc.SUB_CATEGORY_ADD_SUCCESS]: (_, action) => {
    const subCategory = action.payload.subCategory;
    let categories = _.categories;
    let i = categories.findIndex(c=> c._links.self.href === subCategory._links.category.href);
    let category = categories[i];
    category.subCategoryList.push(subCategory);
    categories[i] = category;
    return ({adding: false, toggleStatus: !_.toggleStatus, categories: categories});
  },
  [sc.SUB_CATEGORY_ADD_FAIL]: (_, action) => ({adding: false}),
  [sc.SUB_CATEGORY_EDIT_FORM_TOGGLE]: (_, action) => ({editing: action.payload.editing}),
  [sc.SUB_CATEGORY_EDIT_SUCCESS]: (_, action) => {
    const subCategory = action.payload.subCategory;
    //console.log(subCategory);
    let categories = _.categories;
    let i = categories.findIndex(c=> c._links.self.href === subCategory._links.category.href);
    let category = categories[i];
    //console.log(category.subCategoryList);
    let j = category.subCategoryList.findIndex(sc => sc.id === subCategory.id);
    category.subCategoryList[j] = subCategory;
    categories[i] = category;
    return ({editing: false,toggleStatus: !_.toggleStatus, categories: categories});
  },
  [sc.SUB_CATEGORY_EDIT_FAIL]: (_, action) => ({editing: false}),
  [sc.SUB_CATEGORY_REMOVE_SUCCESS]: (_, action) => {
    const subCategory = action.payload.subCategory;
    let categories = _.categories;
    let i = categories.findIndex(c=> c._links.self.href === subCategory._links.category.href);
    let category = categories[i];
    category.subCategoryList = category.subCategoryList.filter(sc => sc.id != subCategory.id);
    categories[i] = category;
    return ({toggleStatus: !_.toggleStatus,categories: categories});
  }
};

export default function category (state = initialState, action) {
  let handler = handlers[action.type];
  if( !handler ) return state;
  return { ...state, ...handler(state, action) };
}
