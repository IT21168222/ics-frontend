import Category from "./components/admin/Category";
import Dashboard from "./components/Dashboard";
import Main from "./components/Main";
import Product from "./components/admin/Product";
import Section from "./components/admin/Section";
import SubCategory from "./components/admin/SubCategory";
import Supplier from "./components/admin/Supplier";
import User from "./components/admin/User";
import Test from "./components/Test";

export default {
  path: '/',
  component: Main,
  indexRoute: {component: Dashboard},
  childRoutes: [
    { path: 'category', component: Category},
    { path: 'product', component: Product},
    { path: 'section', component: Section},
    { path: 'subCategory', component: SubCategory},
    { path: 'supplier', component: Supplier},
    { path: 'user', component: User},
    { path: 'test', component: Test}
  ]
};
